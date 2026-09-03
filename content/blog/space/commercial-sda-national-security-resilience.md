---
title: "Commercial Space Sensors Are Becoming National-Security Infrastructure"
seoTitle: "Commercial SDA Is Becoming National-Security Infrastructure"
description: "LeoLabs' Scout radar and a NorthStar-Kepler sensor partnership show commercial SDA going operational fast, while a new report says resilience is lagging."
date: 2026-08-28T09:15:00+00:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["space-domain awareness", "LeoLabs", "space weather resilience", "national security space", "orbital compute"]
toc: true
related_posts: ["/blog/space/modular-mission-kits-integration-advantage", "/blog/space/sovereignty-space-localization-strategy"]
---

The U.S. Space Force awarded LeoLabs a $20.68 million Prototype Other Transaction Agreement, a fast-track government contract structure built for rapid prototyping outside standard acquisition rules, for a modified version of its Scout mobile radar, and the deployment timeline is the part worth sitting with. LeoLabs says Scout can be packed into a shipping-container-sized unit, and its first Indo-Pacific deployment began tracking Chinese intelligence, surveillance and reconnaissance satellites and a Chinese spaceplane within hours of activation, [according to Payload Space's report on the Scout award](https://payloadspace.com/leolabs-wins-20-68m-space-force-award-for-scout/). Hours, not months. That is a commercial sensing company operating on a timeline that used to belong exclusively to military systems, and it is not the only sign this week that commercial space-domain awareness, the practice of tracking and characterizing objects in orbit, is being pulled directly into missions that used to be built in-house.

<!--more-->

## A radar in a shipping container, activated in hours

What makes Scout notable is not just that it works, it is what its packaging implies about how the Space Force wants to buy sensing capability now. A shipping-container-sized system is deployable wherever a mobile radar is needed, rather than fixed to a single, purpose-built site years in the making. Getting from activation to tracking specific foreign spacecraft within hours means the sensor and the data pipeline behind it were already mature before the contract was signed. The government was not funding LeoLabs to invent space-domain awareness. It was funding LeoLabs to point an already-proven capability at a new location, fast.

That distinction matters for how to read the contract structure itself. A Prototype Other Transaction Agreement exists specifically to let the government move faster than a traditional acquisition program, and $20.68 million is a rapid-prototyping number, not a program-of-record number. Government buyers are increasingly using commercial sensing systems to field geographically distributed orbital intelligence faster than traditional procurement cycles allow, which only works because the underlying technology is already flight-proven commercial hardware rather than something built from scratch under a defense contract.

## The second track: hosting sensors instead of building a constellation

Canada's NorthStar Earth & Space is taking a different route to the same goal. NorthStar will place space-domain awareness sensors on Kepler Communications spacecraft to expand a real-time monitoring network, a partnership that follows NorthStar's more than C$40 million agreement with the Royal Canadian Air Force and Kepler's own laser-link demonstration for the U.S. Space Development Agency, [as Payload Space detailed in its writeup of the Canadian tie-up](https://payloadspace.com/canadian-companies-partner-on-sda-sat-solution/). Neither company is launching a dedicated tracking constellation. NorthStar gets sensor coverage without building and launching its own spacecraft. Kepler gets a paying tenant for capacity it already operates. National orbital awareness, in other words, is being assembled from interoperable sensors and spacecraft networks rather than one company standing up a single, monolithic system end to end.

That is a meaningfully cheaper way to build national capability, and a meaningfully harder one to secure and audit. A monolithic system has one owner responsible for the whole chain, from sensor to data delivery. A hosted-payload network run by two companies with two different core businesses needs a clear answer for who owns integration, operations and data delivery when something goes wrong, or the efficiency gain from sharing infrastructure turns into a liability the first time accountability actually matters.

## The resilience question nobody's pricing into these deployments yet

None of this proliferation automatically buys resilience, and a new estimate from Mission Space puts a number on the gap. The firm projects solar storms will cause $20.65 billion in economic losses in 2026, rising to $44.27 billion in annualized losses by 2035, with orbital-compute exposure specifically growing from $130 million to $3.26 billion over the same period, [according to Payload Space's coverage of the report](https://payloadspace.com/space-weather-losses-to-double-by-2035-report-finds/). The report ties resilience to redundancy, replication, checkpointing and automatic failover, not to how many sensors or satellites are in orbit.

That distinction cuts directly against the instinct that more nodes automatically means a more resilient network. A shared, geographically distributed radar network and a hosted-payload sensor partnership both add real coverage, and that coverage matters. Neither one, on its own, guarantees that any single asset survives a solar event, or that the network keeps functioning when several assets in the same orbital regime get hit by the same environmental hazard at once. Scout's Indo-Pacific deployment and the NorthStar-Kepler partnership are both proliferation stories. Whether either one is a resilience story depends on engineering choices, thermal and power design, data replication, failover behavior, that don't show up in a press release about a contract award or a sensor-hosting deal.

The Mission Space numbers are also a useful check on how these programs get evaluated after the fact. A contract award or a sensor partnership tends to get judged on whether it launched on time and started delivering data, which Scout clearly did within hours of activation. Almost none of that evaluation asks what happens to the same system during a solar storm large enough to disable several assets in the same orbital shell simultaneously, because that scenario has not happened yet on a scale big enough to force the question. A $44.27 billion annualized loss estimate by 2035 is the kind of number that turns "has not happened yet" into a planning assumption rather than an edge case, at least for anyone pricing risk honestly.

## What this means for mission integration

Put the LeoLabs contract, the NorthStar-Kepler partnership and the Mission Space forecast together and the shape of the problem gets clearer. Government buyers want commercial space-domain awareness capability now, and they are willing to move at commercial speed and structure to get it, which is exactly the kind of demand-led shift we're tracking in [this week's look at modular mission-enabler kits](/blog/space/modular-mission-kits-integration-advantage) and the broader push toward [localized, provably operational sovereign capability](/blog/space/sovereignty-space-localization-strategy). But speed and proliferation are not the same thing as resilience, and the Mission Space numbers say that gap is getting more expensive every year it goes unaddressed.

That is precisely the case for treating in-orbit validation as more than a payload-performance test. A mission architecture that proves fault tolerance, thermal and power behavior, and data-recovery procedures in orbit, not just whether the sensor works, is building the reusable module the next SDA program actually needs: one where mission ownership keeps integration, operations and data delivery under one accountable party, [rather than leaving a customer to assemble a catalogue of capability packages](https://satelyx.com/missions/) with no single party responsible when a solar event hits more than one node in the network at once.

## What to watch

- **Scout's operational track record.** Whether LeoLabs' Indo-Pacific deployment sustains the same detection speed over months, not just in its first hours of activation.
- **The NorthStar-Kepler sensor integration.** Whether the hosted-payload model produces a genuinely real-time monitoring network, and who is accountable for data delivery if either company's infrastructure has an outage.
- **Mission Space's 2035 forecast.** Whether orbital-compute operators and SDA programs start budgeting for redundancy and failover ahead of the projected loss curve, or wait for a costly event to force the investment.

---

*SATELYX builds resilience into validation from the start, testing not just whether a payload works but whether it survives, recovers and keeps delivering data under real orbital conditions. More at [satelyx.com](https://satelyx.com), and more analysis from [Clement Chen](https://clementchen.co).*
