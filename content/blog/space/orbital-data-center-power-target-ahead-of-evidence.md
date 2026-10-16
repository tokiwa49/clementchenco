---
title: "Orbital's Data Center Satellite Is Chasing a Power Number the Hardware Hasn't Proven Yet"
seoTitle: "Orbital Data Center: A Power Target Ahead of the Evidence"
description: "Orbital's data-center satellite targets 250 kW to match a full Nvidia Vera Rubin rack by 2028. The Reflex deal is sound; the power number isn't proven."
date: 2026-09-11T10:00:00+08:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["orbital data centers", "Reflex Aerospace", "in-space compute", "satellite power systems", "Orbital-1"]
toc: true
related_posts: ["/blog/space/iris2-multi-prime-contracts-integration-risk/", "/blog/space/trustpoint-production-is-the-real-pnt-test/"]

status: draft
brief_date: "2026-09-11"
source_brief: "Satelyx Daily Brief — 2026-09-11.md"
---

Orbital has picked Reflex Aerospace as the exclusive spacecraft-platform partner for Orbital-1, its planned orbital data-center constellation, and the number attached to the deal is the part worth sitting with: the first satellite is designed around a compute payload with peak power rising from roughly 100 kW to 250 kW, which the company says matches its target for hosting a full Nvidia Vera Rubin rack, [according to Payload](https://payloadspace.com/orbital-partners-with-reflex-aerospace-on-odc-platform/).

<!--more-->

## A sensible partnership wrapped around an aggressive number

Splitting the deal this way is a reasonable move. Reflex supplies a flight-tested bus, the structure, power distribution, attitude control and all the unglamorous spacecraft plumbing that has to work regardless of what payload sits on top, while Orbital concentrates its engineering effort on the one thing that's actually novel about this mission: a compute payload sized to run real GPU workloads in orbit. That's the same modular logic driving a lot of the industry right now, standardize the platform, differentiate the payload, and it's a sound way to avoid rebuilding an entire spacecraft's worth of solved problems just to test one new idea.

The power target is a different matter. Going from roughly 100 kW to 250 kW on a single satellite is not a modest step up, it's a 2.5x jump on a spacecraft that, as of this announcement, hasn't flown at either number yet. For comparison, that 250 kW figure is in the range of the total power generation of the International Space Station, a multi-module structure assembled over more than a decade with radiator arrays the size of the ISS itself. Orbital is targeting something in that power class on what's described as a single satellite bus, on a 2028 timeline, [per the same Payload report](https://payloadspace.com/orbital-partners-with-reflex-aerospace-on-odc-platform/).

## The physics problem nobody skips

Space has no convection. On the ground, a GPU rack pushing hundreds of kilowatts relies on air handlers or liquid cooling loops moving heat into a building's heating, ventilation and air conditioning (HVAC) system. In orbit, every one of those watts has to be radiated away as infrared energy through panels sized specifically for that job, because there's no atmosphere to carry heat off any other way. Rejecting 250 kW of continuous heat through radiators light enough to launch and rigid enough to survive years in orbit is a scale of thermal engineering that no commercial smallsat-class compute platform has demonstrated in flight. That doesn't mean it's impossible. It means the thermal system, not the GPU silicon or the bus itself, is probably the actual long pole in this program, and it's the part of the announcement that got the least attention relative to the headline power number.

This is worth naming plainly rather than glossing over, because the gap between "matches Nvidia's target for a full Vera Rubin rack" and "has demonstrated that power and heat rejection in orbit" is exactly the gap between a marketing-friendly spec and a flown system. Orbital hasn't claimed otherwise. But a reader comparing this to a data center on the ground should understand that the hard part of a terrestrial GPU rack is mostly procurement and power contracts. The hard part of an orbital one is thermodynamics that don't have a ground-based shortcut.

## Why anyone wants compute in orbit at all

Before going further on whether Orbital can hit its power number, it's worth saying why this category exists at all. The underlying demand case is real even if the specific execution is unproven. Earth observation and signals-intelligence satellites generate far more raw data than they can usefully downlink through limited ground-station windows and constrained bandwidth. Processing that data closer to where it's collected, in orbit, rather than shipping raw sensor output to the ground and processing it there, cuts the amount of data that actually needs to come down and can shrink the time between collection and an actionable result. That's the pitch behind orbital compute generally, and it's a reasonable one. It just doesn't automatically mean the specific power and thermal target a given company sets is the right one, or an achievable one on the timeline it's promising.

## What Reflex actually de-risks

None of that is a knock on the Reflex partnership itself, which is the more conservative half of this announcement. By using a bus Reflex has already flight-proven elsewhere, Orbital isn't also trying to prove out spacecraft fundamentals, attitude control, power distribution, communications, at the same time it's trying to prove out a novel compute payload and a power system pushed well past what that bus class has previously carried. That's the right way to sequence risk: hold the platform constant, and put the engineering budget and the schedule risk into the one system that's actually new. It's the same separation of concerns [Aerospacelab, Airbus Defence and Space and Thales Alenia Space are relying on for IRIS²](/blog/space/iris2-multi-prime-contracts-integration-risk/), just applied to a single spacecraft instead of a 330-satellite constellation, and applied to a payload class nobody's flown at this power level yet, rather than a well-understood communications one.

## What to actually watch

The 2028 launch target is a useful marker precisely because it's specific enough to fail against. If Orbital and Reflex are still describing this as a 250 kW target as that date approaches, without having flown a demonstration payload at meaningfully higher power than the current baseline, that's the signal that the thermal and power engineering is the thing slipping, not the compute payload itself. Orbital data centers are a category worth taking seriously, and the demand case for putting compute closer to sensors and away from ground-based power constraints is real. What isn't proven yet is that any single satellite can run at ISS-scale power without an ISS-scale radiator array behind it, and that's the number this whole program will ultimately be judged against, not the deal with Reflex.

---

*Satelyx works the same problem from the platform side, validating power, thermal and payload interfaces on shared missions before a customer bets a program on a number the hardware hasn't proven yet. More at [satelyx.com](https://satelyx.com).*
