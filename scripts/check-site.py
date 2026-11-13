#!/usr/bin/env python3
"""Check a Hugo build; optionally compare routes and SEO with a baseline build.

Usage: python3 scripts/check-site.py public --baseline /tmp/site-before
Uses only the Python standard library. Does not make network requests.
"""
import argparse
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit
from xml.etree import ElementTree


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.meta, self.links, self.ids, self.text = {}, [], set(), []
        self.h1 = 0
        self.errors = []
        self.title = False
        self.json = False
        self.json_text = []
        self.redirect = False
        self.feed(path.read_text())

    def handle_starttag(self, tag, pairs):
        attrs = dict(pairs)
        if tag == 'h1':
            self.h1 += 1
        if attrs.get('id'):
            self.ids.add(attrs['id'])
        if tag == 'meta':
            self.meta[attrs.get('name', attrs.get('property'))] = attrs.get('content')
            self.redirect |= attrs.get('http-equiv', '').lower() == 'refresh'
        if tag == 'link' and attrs.get('rel') == 'canonical':
            self.meta['canonical'] = attrs.get('href')
        if tag == 'title':
            self.title = True
            self.meta['title'] = ''
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.json = True
            self.json_text = []
        if tag == 'img' and 'alt' not in attrs:
            self.errors.append('Image missing alt: ' + attrs.get('src', ''))
        for key in ('href', 'src'):
            if attrs.get(key):
                self.links.append(attrs[key])

    def handle_endtag(self, tag):
        if tag == 'title':
            self.title = False
        if tag == 'script' and self.json:
            try:
                json.loads(''.join(self.json_text))
            except ValueError:
                self.errors.append('Invalid JSON-LD')
            self.json = False

    def handle_data(self, value):
        self.text.append(value)
        if self.title:
            self.meta['title'] += value
        if self.json:
            self.json_text.append(value)


def read_build(root):
    return {str(p.relative_to(root)): Page(p) for p in root.rglob('*.html')}


def broken_links(root, pages):
    failures = set()
    for path, page in pages.items():
        for link in page.links:
            url = urlsplit(urljoin('https://clementchen.co/' + path, link))
            if url.scheme not in ('http', 'https') or url.netloc != 'clementchen.co':
                continue
            target = unquote(url.path).lstrip('/') or 'index.html'
            if target.endswith('/'):
                target += 'index.html'
            if not (root / target).exists():
                failures.add((path, link, 'missing file'))
            elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
                failures.add((path, link, 'missing anchor'))
    return failures


parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('build', type=Path)
parser.add_argument('--baseline', type=Path)
args = parser.parse_args()
assert (args.build / 'index.html').exists(), 'Build the site first'
pages = read_build(args.build)
errors = []
for path, page in pages.items():
    if page.redirect:
        continue
    if page.h1 != 1:
        errors.append(f'{path}: expected one h1, got {page.h1}')
    for message in page.errors:
        errors.append(f'{path}: {message}')
    if any(word in ' '.join(page.text) for word in ('placeholder', 'copy to develop', 'Personal example to add')):
        errors.append(f'{path}: unfinished preview copy')

broken = broken_links(args.build, pages)
if args.baseline:
    before = read_build(args.baseline)
    for path in before.keys() - pages.keys():
        errors.append(f'Missing route: {path}')
    for path in before.keys() & pages.keys():
        if before[path].redirect:
            continue
        for field in ('title', 'description', 'canonical', 'og:title', 'og:description'):
            if before[path].meta.get(field) != pages[path].meta.get(field):
                errors.append(f'{path}: changed {field}')
    existing = broken_links(args.baseline, before)
    for issue in sorted(broken & existing):
        print('PRE-EXISTING:', *issue)
    broken -= existing
    for feed in ('index.xml', 'blog/index.xml', 'sitemap.xml'):
        tag = '{http://www.sitemaps.org/schemas/sitemap/0.9}loc' if feed == 'sitemap.xml' else 'guid'
        old = {el.text for el in ElementTree.parse(args.baseline / feed).iter(tag)}
        new = {el.text for el in ElementTree.parse(args.build / feed).iter(tag)}
        if old - new:
            errors.append(f'{feed}: missing entries {sorted(old - new)}')
for issue in sorted(broken):
    errors.append(': '.join(issue))
for error in errors:
    print('FAIL:', error)
print(f'{len(pages)} HTML routes checked; {len(errors)} failures.')
raise SystemExit(bool(errors))
