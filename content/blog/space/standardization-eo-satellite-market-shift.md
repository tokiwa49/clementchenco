---
title: "Standardization Is Winning: What the Earth-Observation Boom Says About Where Space Is Headed"
seoTitle: "Standardization Is Winning in the EO Satellite Market"
description: "Novaspace forecasts 6,500+ Earth-observation satellites by 2035, as space shifts value from single satellites to standardized, integrated capability stacks."
date: 2026-08-25T09:10:00+00:00
draft: false
author: "Clement Chen"
categories: ["space"]
tags: ["Earth observation satellites", "satellite standardization", "Novaspace forecast", "space mission integration", "multi-sensor constellations"]
toc: true
related_posts: ["/blog/space/prove-once-deploy-everywhere-flight-evidence", "/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck"]
---

Novaspace put out a number this week worth sitting with: more than 6,500 Earth-observation satellites launching by 2035, generating an estimated $155.9 billion in manufacturing revenue ([SpaceNews](https://spacenews.com/new-novaspace-forecast-6500-eo-satellites-to-launch-by-2035/)). Forecasts like that usually get read as a growth story, and there's plenty of growth in it, but the number itself isn't the interesting part. What's interesting is the framing Novaspace hangs it on: Earth-observation demand is moving from individual sensors toward persistent, interoperable intelligence networks, and buses are becoming standardized while value shifts to payload integration and multi-sensor intelligence layers. That's a claim about where the money goes, not just how many satellites get built, and it happens to match a pattern showing up in a couple of other places in the industry this same week.

<!--more-->

## The "Skyscraper Model" and why the metaphor holds up

Novaspace calls this the "Skyscraper Model," and it's a decent metaphor once you sit with it. A skyscraper's structural frame is largely standardized, the interesting differentiation happens in what goes inside: the tenants, the systems, the fit-out. Apply that to Earth observation and the bus becomes the frame. The payload, and increasingly the multi-sensor combination of payloads, is the tenant.

The forecast backs this up with specifics rather than just vibes. Defense customers, per Novaspace, are prioritizing revisit rate, persistence, and wide-area coverage alongside raw resolution, which is a different buying pattern than the "sharpest single image wins" era of Earth observation. And the report highlights multi-sensor constellations that combine synthetic aperture radar (SAR), optical, and RF payloads rather than betting on one sensing modality. Put those two things together and you get demand for fleets that behave like one system, not demand for the single best satellite. That's exactly the condition under which a standardized bus stops being a compromise and starts being the obvious choice, because the competitive differentiation has already moved somewhere else: to how payloads are integrated, tasked, and fused into a usable intelligence product. It's the same argument we made about deployable power and propulsion subsystems freeing up engineering effort for what actually varies mission to mission, [reusable subsystem modules that don't have to be reinvented for every satellite](/blog/space/power-propulsion-orbital-compute-subsystem-bottleneck), just one layer up the stack.

There's a reason defense demand is pulling the market this direction rather than another resolution war. Revisit rate and persistence are properties of a fleet, not a single satellite. You cannot buy revisit rate from one exquisite spacecraft, you buy it from a constellation that behaves consistently, tasks predictably, and hands data off the same way no matter which satellite actually took the image. Layer SAR, optical, and RF payloads across that same fleet and the requirement gets harder still: three sensing modalities that used to be separate businesses now need to read as one product to the customer. That only works if the bus, the ground contact, and the data pipeline underneath are standardized enough that adding a new payload type doesn't mean rebuilding the whole system around it.

## Mission operations as product, not afterthought

Novaspace's forecast is about the spacecraft and payload side of the shift. A LinkedIn post from CEI Publishing's Space Technology Series, flagged in this week's discussion, makes the same argument from the operations side. As one LinkedIn commenter put it in that thread: "Space missions are becoming systems of systems. The companies that can standardise interfaces, operations and data delivery will move faster than those that optimise each spacecraft as a one-off project." ([CEI Publishing's LinkedIn post](https://www.linkedin.com/posts/cei-publishing-space-technology-series_spacemissionoperations-spacesystems-missionoperations-activity-7495663184306098176-XqZW))

That's a commentary post, not a research report, so treat it as one data point in a pattern rather than a study, but the direction lines up with everything else this week: mission operations, like the bus, is turning into infrastructure that gets standardized and reused, rather than something bespoke to each mission. That's a meaningful shift, because operations has historically been where a lot of one-off engineering hides even after the hardware itself gets standardized.

## Forty years from bespoke to repeatable

The small-satellite community marked its own version of this arc this week. The Small Satellite Conference is celebrating 40 years of collaboration ([SmallSat Conference's anniversary post](https://www.linkedin.com/posts/smallsatconf_smallsat-is-celebrating-40-years-of-collaboration-activity-7497751414253842432-1DkT)), and the framing around that anniversary is worth pulling out on its own: "Forty years of small-satellite collaboration has created the foundation for today's faster iteration cycles. The next step is making the integration and validation pathway as repeatable as the spacecraft components themselves."

That's the honest version of where the field actually is. Small satellites already went through their own standardization wave on the hardware side: buses, form factors, launch interfaces. What hasn't caught up yet, per that framing, is the integration and validation pathway itself: the process of proving a payload or subsystem actually works in orbit before you commit to flying it at scale. That's a slower, messier problem than standardizing a chassis, and it's the same gap we've pointed at when talking about [flight evidence becoming the thing that lets a technology move from one program to the next without starting over](/blog/space/prove-once-deploy-everywhere-flight-evidence). Novaspace's Skyscraper Model and the SmallSat Conference anniversary are describing the same maturation curve from two different ends: one from the manufacturing and revenue side, one from forty years of community practice.

## Infrastructure is standardizing too, not just spacecraft

The same logic shows up further down the stack, in the ground segment and in space traffic management, if you look for it. Leaf Space completed a ground-station installation at Spaceport Nova Scotia this week, extending its network into Canada through a partnership with Maritime Launch Services ([SpaceWatch.Global](https://spacewatch.global/2026/08/leaf-space-completes-ground-station-install-at-spaceport-nova-scotia/)). A single ground station isn't a headline on its own, but it's another instance of the same pattern: ground infrastructure built as a shared, standardized network that any mission can plug into, rather than a bespoke station built for one operator's needs.

Space traffic management (STM) is trending the same direction. Neuraspace and Arcsec are combining AI-driven STM with star-trackers intended to detect debris as small as 3 centimeters ([Payload](https://pyld.omeclk.com/portal/wts/ue%5EcnFedyMaqn9Dj%7C-2dfA4wmh4zO-o9rCO9Nc)), a partnership worth watching to see whether it produces an operational service or stays at the flight-demonstration stage. Either way, it's a partnership aimed at a shared capability rather than an in-house tool built for one constellation, which is the same shift the Skyscraper Model describes for the spacecraft themselves.

## What this means for mission integration

None of this means the individual satellite stops mattering. It means the competitive question changes. If the bus is standardized, if operations and ground segment and even traffic management are increasingly shared infrastructure, then the thing that actually differentiates a mission is how well the payload, the data pipeline, and the validation history come together into something a customer can trust and deploy quickly. That's a mission integration problem before it's a spacecraft-design problem. A standardized bus paired with repeatable payload interfaces isn't a compromise you settle for, it's the setup that makes that kind of differentiation possible in the first place.

That's also the practical test for anyone doing mission integration work: whether validated technologies actually turn into a catalogue of deployable capability packages that a customer can book against [open payload slots](https://satelyx.com/missions/), standardized enough to assemble quickly, specific enough to still solve the problem in front of them. The individual satellites in Novaspace's forecast will not be interchangeable. The frame around them is converging on something close to it, and that's exactly the condition standardized mission integration is built for.

Novaspace's forecast, the mission-operations discussion, and forty years of small-satellite collaboration are three different vantage points on the same shift: from proving you can build one good spacecraft to proving you can repeat the process reliably, at whatever payload combination a customer actually needs. That's the curve the Earth-observation numbers are describing.

---

*Satelyx exists for exactly this shift: a standardized bus and repeatable payload interfaces mean the effort goes into validating new capability, not re-proving the basics on every mission. More at [satelyx.com](https://satelyx.com), and more analysis from [Clement Chen](https://clementchen.co).*
