---
title: "Orbit Is Getting More Crowded and More Volatile, and Fleet Size Alone Won't Fix That"
seoTitle: "Orbit Resilience: Debris Tracking Meets Solar Storm Risk"
description: "Neuraspace and Arcsec's debris-tracking deal and a Mission Space solar-storm loss projection show why orbital resilience must be designed in, not assumed."
date: 2026-09-01T09:10:00+08:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["space situational awareness", "orbital debris", "space weather", "satellite resilience", "AI space traffic management"]
toc: true
related_posts: ["/blog/space/in-orbit-demonstration-is-still-the-bottleneck", "/blog/space/sovereign-space-moves-from-policy-to-hardware"]
---

Two stories landed this week that, on the surface, have nothing to do with each other. One is about a partnership between a Portuguese space-traffic company and a Belgian sensor maker. The other is an economic-loss projection from a space-weather analytics firm. Read together, they make the same point from two different directions: orbit is getting more crowded and more volatile, and the standard answer, put up more satellites, doesn't automatically buy more resilience.

<!--more-->

## The Part of the Debris Field Nobody Can See

Start with the partnership. [Neuraspace, based in Portugal, has teamed up with Arcsec, a Belgian sensor company, to pair onboard sensing with software-driven space-traffic management](https://pyld.omeclk.com/portal/wts/ue%5EcnFed0kaqnE-joxDdgk3Q2h4zO-o9rCO9Nc). Arcsec's star trackers are designed to detect debris fragments as small as 3 centimeters, which is well below what most ground-based tracking networks can reliably see. The other half of the deal is artificial intelligence (AI): software meant to fuse those onboard observations into something operators can act on, rather than just another feed of raw sensor data.

Why does 3 centimeters matter enough to build a company around it? Because that's roughly where the visibility gap in low Earth orbit sits. [The same reporting cites an estimate of around one million debris fragments below 10 centimeters, against roughly 36,500 objects currently tracked above that threshold](https://pyld.omeclk.com/portal/wts/ue%5EcnFed0kaqnE-joxDdgk3Q2h4zO-o9rCO9Nc). Those numbers are estimates, not a census, but the gap between them is the point: the overwhelming majority of what's up there is smaller than what conventional tracking catalogs. A fragment that size can still disable a spacecraft on impact. It's just invisible to most of the infrastructure built to warn you about it.

That's why the Neuraspace-Arcsec pairing matters beyond the press release. Rather than proposing a bigger radar or a better catalog, it treats distributed onboard sensing, fused through software, as the fix for an incomplete ground picture, instead of one more centralized system trying to see everything from the outside.

There's a reason that distinction matters operationally. A ground-based catalog, however good, gives you a snapshot: a list of known objects and their predicted positions, updated on whatever cadence the tracking network can manage. Onboard sensing paired with AI-driven traffic management gives a spacecraft something closer to local awareness in real time, of the fragments that were never on anyone's list to begin with. Neither replaces the other. But if the untracked population really does outnumber the tracked one by roughly 27 to 1, a mission architecture that depends solely on the catalog is, by construction, only looking at a small slice of what's out there.

## Orbit Isn't Just Crowded, It's Getting More Hostile

The debris problem is a spatial one: too many objects, not enough visibility. The second story this week is environmental, and it points at the same underlying issue from a completely different angle.

[Mission Space, a space-weather analytics firm, estimates that solar storms could generate $20.65 billion in economic losses in 2026, rising to $44.27 billion annually by 2035](https://payloadspace.com/space-weather-losses-to-double-by-2035-report-finds/). Within that, the report projects orbital-compute losses specifically, the kind tied to satellites and space-based processing, growing from $130 million to $3.26 billion over the same period. Those are report projections built on Mission Space's own modeling, not confirmed outcomes, and the brief doesn't detail the methodology behind them. Worth holding that caveat while still taking the direction of travel seriously: as more compute and more infrastructure move into orbit, the report's authors argue, exposure to space-weather events scales with it.

The mitigation the report points to isn't shielding or launching around the problem. It's redundancy, replication, and automated failover: architectural and software choices about how a mission is built to keep operating when something in its environment goes wrong.

The specific split the report draws out is worth sitting with. Total projected losses from solar storms are large across the whole economy, but the orbital-compute slice is where the growth rate stands out: a roughly twenty-five-fold increase from $130 million to $3.26 billion over the same period the report covers. That's consistent with a simple structural fact: more of what used to run in a data center now runs on a satellite, and satellites sit directly in the path of the radiation and charged-particle events a solar storm produces. Ground infrastructure can be hardened, relocated, or backed up across geographies that don't share a weather system. Orbital infrastructure, by definition, shares one.

## More Satellites Isn't the Same as More Resilience

Put the two stories side by side and a pattern shows up that neither one states outright but both are gesturing at from opposite sides.

A growing satellite fleet does not automatically become a more resilient one if every satellite in it shares the same blind spot. Untracked debris under 10 centimeters doesn't care how many spacecraft are up there; it's invisible to most of them in the same way, at the same time. A solar storm doesn't discriminate between operators either. If a fleet's satellites share the same orbital shell, the same hardware generation, and the same lack of onboard sensing or failover logic, then adding more of them just multiplies the exposure instead of diluting it. Redundancy only works as a resilience strategy when the redundant assets don't all fail for the same reason at the same time.

That's the real thread connecting Neuraspace and Arcsec's sensor-plus-software approach to Mission Space's redundancy-and-failover recommendation. Both are arguing, in their own domain, that resilience is something you architect, not something that emerges from scale. A constellation of a hundred satellites with no onboard debris sensing and no automated failover is not more resilient than ten satellites that have both. It's just a bigger target sharing the same weaknesses.

It helps to be precise about what "designed in" actually means here, because it's easy to nod along to the phrase without it changing anything. It means the debris-sensing and traffic-management layer isn't an optional payload added on a later mission revision, it's part of the baseline spacecraft. It means the failover logic for a degraded subsystem during a solar event is written, tested, and onboard before launch, not improvised by a ground team mid-anomaly. And it means the software that handles both of those cases is built to be reusable across missions, so each new spacecraft isn't relearning the same lessons about its own environment from scratch.

## Designing for the Environment You're Actually In

| Figure | Value | Source |
|---|---|---|
| Arcsec star-tracker detection threshold | debris as small as 3 cm | Neuraspace-Arcsec partnership |
| Estimated untracked debris fragments | ~1,000,000 below 10 cm | Neuraspace-Arcsec reporting |
| Tracked objects above 10 cm | ~36,500 | Neuraspace-Arcsec reporting |
| Projected solar-storm losses, 2026 | $20.65 billion | Mission Space report |
| Projected solar-storm losses, 2035 | $44.27 billion/year | Mission Space report |
| Orbital-compute losses, 2026 | $130 million | Mission Space report |
| Orbital-compute losses, 2035 (projected) | $3.26 billion | Mission Space report |

What both stories point to, for anyone designing and operating a mission, is that environmental awareness and failure handling can't be an afterthought bolted on once a spacecraft is already in orbit. They have to be part of the mission architecture from the first design review: what sensing does this spacecraft carry to see the debris environment it's actually flying through, what happens automatically when a solar event degrades a subsystem, and how much of that response has to be scripted by a ground team in real time versus handled onboard.

That's a similar lesson to one we've written about elsewhere this week in the context of [turning proven integration knowledge into repeatable mission templates](/blog/space/in-orbit-demonstration-is-still-the-bottleneck): owning a mission end to end means owning its operational learning loop, and that loop has to include how the spacecraft behaves when its environment turns hostile, not just how it behaves on a good day. A fault-management and recovery procedure that only exists as an emergency improvisation isn't a resilience plan. One that's built into the mission software from the start, and reusable on the next mission, is.

Neither trend is likely to reverse on its own: the debris field will keep filling in, and the sun will keep doing what the sun does. What can change is whether the next generation of missions treats distributed sensing, AI-fused situational awareness, and automated failover as core design requirements, rather than as upgrades bolted on after the first bad week in orbit.

---

*SATELYX builds resilience into mission design and operations from the start, so fleets are architected to handle a crowded, volatile orbital environment rather than just scaled into it. More at [satelyx.com](https://satelyx.com), and more analysis from [Clement Chen](https://clementchen.co).*
