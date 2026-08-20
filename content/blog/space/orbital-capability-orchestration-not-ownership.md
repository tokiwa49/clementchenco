---
title: "The Space Industry Is Swapping Satellite Ownership for Orchestration"
seoTitle: "Capability Orchestration Is Beating Satellite Ownership"
description: "Commercial space is shifting from owning satellites to orchestrating shared capability, from RF sensing and imaging networks to debris-tracking partnerships."
date: 2026-08-18T09:00:00+08:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["capability orchestration", "satellite ownership vs orchestration", "commercial space infrastructure", "orbital sensing networks"]
toc: true
related_posts: ["/blog/space/space-companies-assembling-not-inventing", "/blog/space/rideshare-hosted-payloads-access-layer", "/blog/space/reflect-orbital-vleo-validation-gap"]
---

Three unrelated deals landed this week, and if you squint, they're the same deal. A government sensing program moved from evaluation into procurement. A tasking network added dozens of sensors it doesn't own. A debris-tracking company bolted someone else's hardware onto its own software. None of these companies built a bigger constellation. All of them got more capable anyway, by orchestrating capability that already exists rather than buying more hardware.

<!--more-->

That's worth sitting with, because for most of the last decade, the space industry's implicit scoreboard was satellite count. More birds meant more revenue potential, more defensibility, more of a story to tell investors. That logic hasn't disappeared, but it's no longer the only one that matters, and this week's news is a decent snapshot of what's replacing it.

## The NRO just told commercial RF intelligence it's ready for prime time

Start with HawkEye 360. The National Reconnaissance Office (NRO) has awarded the company a new contract under its Commercial Radio Frequency Capabilities Augmentation (CRFCA) program, and the path to get there is the actual story. The effort began in 2022 with six companies holding study contracts, then moved through modeling, simulation, and on-orbit demonstrations before narrowing to operational support, as [SpaceNews reported](https://spacenews.com/nro-to-expand-use-of-hawkeye-360s-satellite-intelligence/). The contract's dollar value wasn't disclosed, and I'd resist the urge to guess at one. What's disclosed, and what matters more, is the shape of the pathway itself.

Government buyers don't typically build multi-year, multi-phase evaluation programs for capabilities they intend to use once. A structure like CRFCA exists because the NRO wants a repeatable way to move commercial sensing from "interesting demo" to "thing we can rely on," and HawkEye 360 is the company that made it through the funnel. That's a different kind of win than a single fat contract. It's evidence that a specific capability, RF intelligence gathered commercially, has cleared a bar that government procurement is willing to reuse for the next vendor that shows up with a comparable pitch.

## HEO doesn't own more satellites. It owns more access.

The clearer illustration of the pattern is HEO's expanded partnership with Planet. HEO has added Planet's SkySat satellites to its non-Earth imaging network, pushing the network's total past 50 in-orbit sensors, according to [Payload Space](https://payloadspace.com/heo-taps-planet-labs-to-expand-its-nei-network/). It's worth being precise about what that figure means: 50-plus sensors is the size of the network HEO can task across, not a fleet HEO owns. HEO plans to install its software on up to 15 SkySats, which is a rollout target, not a completed migration, and the network currently serves U.S. government customers because of licensing constraints, with Planet's Pelican and Dove satellites floated as possible future additions rather than committed ones.

Strip away the caveats and the underlying move is still notable. HEO isn't buying satellites. It's building the software layer that decides which existing satellite, in which orbit, with which sensor, gets tasked for a given request. Planet already had the hardware in orbit. HEO is adding the intelligence that makes a heterogeneous set of spacecraft behave like one coordinated system. That's a genuinely different business than owning and operating a dedicated imaging constellation, and it scales differently too: every new partner HEO signs adds sensors to the network without HEO having to build or launch anything, the same standardize-the-foundation logic showing up in [flight-proven bus architecture elsewhere this week](/blog/space/flight-proven-spacecraft-bus-middle-ground).

We've made a version of this argument before about companies buying their way into capability rather than inventing it from scratch, in [our look at the wave of space-industry mergers and subsidiary structures](/blog/space/space-companies-assembling-not-inventing). HEO's approach is the partnership-flavored cousin of that trend: rather than acquiring a company that owns SkySats, HEO is integrating with one. The instinct behind it is identical. Assembling access to proven hardware is now a faster, cheaper path to capability than building your own version of it.

## Debris tracking is the same story, with sharper stakes

The Neuraspace-Arcsec partnership is a smaller headline but it makes the pattern almost uncomfortably explicit. Neuraspace, based in Portugal, is combining its space-traffic management analytics with star trackers from Belgium's Arcsec, which are designed to detect debris as small as 3 centimeters, according to reporting in the [Payload newsletter](https://pyld.omeclk.com/portal/wts/ue%5EcnFedzjaqnA6jjS2dfrjjmh4zO-o9rCO9Nc). That's a design specification from the partnership announcement, not a confirmed operational result. I'd hold off calling it proven until the capability actually reaches deployment.

The problem it's aimed at is real regardless of how the deployment timeline plays out. Commercial tracking systems generally top out at detecting objects above 10 centimeters, while estimates put the population of untracked fragments smaller than that at roughly 1 million, against roughly 36,500 tracked objects larger than 10 centimeters. Those are estimates, not a census, but the gap between them is the whole reason this partnership exists. No single sensor architecture closes it. What closes it, if anything does, is combining a specialist sensor with specialist software and making the pairing repeatable across missions rather than treating it as a one-off integration project.

That's a governance problem as much as a technical one, and it's one we've written about at length in the context of who's actually accountable for orbital debris removal and tracking as the volume of objects climbs faster than the frameworks meant to manage them do; see [our piece on the disposal and governance gap](/blog/space/space-debris-disposal-governance-gap). Neuraspace and Arcsec aren't solving the governance question. They're demonstrating one piece of the technical answer: complementary components, standardized well enough to combine.

## The catalogue model: what orchestration actually requires

Put the three items together and a thesis emerges that's bigger than any one of them. The next phase of space commercialization won't be won by whoever owns the most satellites. It'll be won by whoever can orchestrate the right capability across the satellites and sensors already in orbit, regardless of who holds title to the hardware.

That's not the same claim as "partnerships are good," which is a platitude nobody needs another editorial about. The specific thing happening here is the emergence of a [catalogue model](https://satelyx.com/catalog): validate a specialist capability, whether that's an RF sensor, an imaging satellite, or a debris-detecting star tracker, prove it works through documented [in-orbit performance](https://satelyx.com/flight-heritage), and then standardize the integration well enough that the combination becomes deployable across missions rather than requiring bespoke engineering every time. HawkEye 360 got there through years of NRO-supervised demonstration. HEO is building it through software that abstracts away which physical satellite is doing the sensing. Neuraspace and Arcsec are attempting it at the component level, pairing hardware and analytics that were built by different companies for a shared outcome.

It's also the logic behind standardizing interfaces across the supply chain so that hosted payloads and [shared missions](https://satelyx.com/shared-missions) don't each require a custom integration effort, a theme our sibling piece on the launch-access side of this shift explores in more depth, see [the launch-access layer becoming its own business](/blog/space/rideshare-hosted-payloads-access-layer). Orchestration and access are two faces of the same underlying shift: capability is becoming something you assemble and reuse, not something you build once and defend.

None of this means standardization flattens every mission into the same shape. It means removing uncertainty that shouldn't have to be re-solved on every contract. A government buyer shouldn't have to re-derisk RF sensing from scratch with the next vendor if the pathway already exists. A tasking network shouldn't need to own a satellite outright just to add its viewing angle to a catalogue. Call it a shift in what counts as a moat, not a retreat from having one.

## What to watch

- **HawkEye 360's contract scope.** Watch for details on the size, value, and any international expansion of the new NRO operational-support agreement, since the terms will say a lot about how far this pathway extends beyond a single vendor.
- **Whether HEO's network reaches beyond SkySat and government customers.** The real test is whether the partnership expands into Planet's Pelican and Dove satellites, or into commercial service offerings, rather than staying confined to its initial scope.
- **Whether Arcsec's 3 cm detection claim reaches operational deployment.** A design specification is not a demonstrated capability. Watch for technical demonstrations that show the debris-detection threshold holding up in practice, not just on a spec sheet.

---

*Satelyx tracks how orbital capability gets validated and made reusable across missions, from sensor networks to shared spacecraft platforms. More at [satelyx.com](https://satelyx.com), and more analysis from [Clement Chen](https://clementchen.co).*
