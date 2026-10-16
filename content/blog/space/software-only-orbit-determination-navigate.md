---
title: "NaviGate Flew Orbit Determination as Pure Software, and That Changes What a Satellite Capability Is"
seoTitle: "Software-Only Orbit Determination: NaviGate's In-Orbit Demo"
description: "NaviGate ran precise orbit determination on a spacecraft's existing computer aboard D-Orbit's ION carrier. What the demo proves, and what it still doesn't."
date: 2026-10-02T09:00:00+08:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["orbit determination", "software-defined satellites", "in-orbit demonstration", "D-Orbit ION", "GNSS"]
toc: true
related_posts: []

status: draft
brief_date: "2026-10-02"
source_brief: "Satelyx Daily Brief — 2026-10-02.md"
---

NaviGate has [completed an in-orbit demonstration of precise orbit determination](https://spacenews.com/navigate-successfully-demonstrates-onboard-precise-orbit-determination-aboard-d-orbits-ion-satellite-carrier/) that ran entirely as software on the existing onboard computer of D-Orbit's ION Satellite Carrier, with no additional hardware added to the spacecraft. That is the part worth sitting with: a capability that has traditionally meant adding a box was flown as a software upload and worked on the computer that was already there.

<!--more-->

## What actually flew

According to SpaceNews, NaviGate's NaviCode Caravel software took raw data from the spacecraft's Global Navigation Satellite System (GNSS) receiver and used it to calculate and predict the spacecraft's position. It ran on the flight computer the carrier already had. The demonstration was delivered through D-Orbit's Software In-Orbit Demonstration service, and it followed ground validation on an engineering model, so this wasn't a first-contact experiment. The software went through a sensible sequence before it ever ran in space.

That sequence deserves credit on its own. Engineering model first, then orbit, on a service built for exactly that handoff, is how you'd want it done.

## Why the "no new payload" part matters

The usual way to prove a space technology is to build a payload, find a ride, and wait. Every one of those steps carries cost and schedule risk that has nothing to do with whether the idea works. A software-only demonstration removes most of it. The test article is code, the platform is a spacecraft already in orbit, and the question being answered is the narrow one: does the algorithm do its job on real flight data and real flight computing?

It isn't only NaviGate heading this way. Satlyt, which [raised $8 million in seed funding](https://payloadspace.com/satlyt-raises-8m-seed-to-expand-its-virtual-odc-network/), injects AI-inference capability into partner satellites either before launch or by in-flight software upload. The company says it has already processed imagery, produced an encrypted downlink-ready output and diagnosed injected software faults in space. I'd treat Satlyt as a supporting data point here rather than a twin of NaviGate: one is a specific navigation function, the other is a compute-and-inference layer, and their commercial logic differs. What they share is the delivery path. Both get a capability onto a satellite without asking the satellite's owner to buy and integrate a new piece of hardware.

## What the demonstration doesn't tell us yet

SpaceNews reports that NaviCode Caravel achieved positioning accuracy as precise as 5.2 centimeters using GPS-only data, with typical results in the decimeter range. That's a real number, and it's a good one. What the reporting doesn't include is how that accuracy compares to existing onboard or ground-based orbit determination, or how much of the flight computer's capacity the software used while hitting it. Those are the comparisons that decide whether this is a convenience or a replacement, and until they're public the honest read is that the architecture is validated more clearly than the performance relative to the alternatives.

There's also the demand question. A successful demo shows the software can run. It doesn't show that satellite operators will pay for onboard orbit determination as a service, or that the approach carries over to spacecraft with different computers and receivers. Whether it becomes a standard offering for hosted payloads and smallsat operators is the thing to watch from here, and nothing in this announcement answers it. A single flight on a single carrier is a proof point, not a market.

## The bigger point: software is a payload

If software can be validated in orbit on an existing computer, then software deserves to be treated as a mission payload in its own right: integrated, tested, flown and logged as something reusable. That means the catalogue of what's been proven in space grows without a new spacecraft for each entry, which should make adding to it cheaper.

That is the logic behind how we think about shared missions at Satelyx. The unit of progress isn't a satellite, it's a capability that has been validated end to end and can be flown again. NaviGate's demo is a clean example of the cheapest possible version of that idea. The open question is how fast the evidence (accuracy comparisons, resource use, repeat flights) catches up with the architecture.

---

Satelyx treats flight-validated software as a reusable mission module, so capabilities like onboard orbit determination can be proven in orbit and repeated. More at satelyx.com, and more analysis from Clement Chen.
