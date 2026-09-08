---
title: "Physical AI's Real Bottleneck Isn't the Model, It's Everything Underneath It"
seoTitle: "Physical AI's Bottleneck Sits Below the Model"
description: "Lyte's $165M raise and Discovered Materials' $9M seed both bet the real constraint on physical AI is sensing hardware and chip materials, not the model."
date: 2026-09-07T05:00:00+08:00
draft: false
author: "Clement Chen"
categories: ["deeptech"]
tags: ["robotics funding", "physical AI", "materials science", "sensor hardware", "deeptech venture capital"]
toc: true
related_posts: ["/blog/deeptech/how-early-stage-deeptech-earns-real-validation", "/blog/deeptech/capital-intensive-deeptech-is-starting-to-look-like-infrastructure-finance", "/blog/deeptech/how-to-read-a-deeptech-funding-round"]
---

Two deeptech rounds closed a few weeks apart this August, at wildly different sizes, and neither company would describe itself as making the other's pitch. One says a robot's problem isn't that it can't decide what to do, it's that it can't reliably tell what's in front of it. The other says an AI chip's problem isn't the architecture on the die, it's the material sitting between the transistors that decides how much heat the chip can shed before it throttles. Neither company is trying to build a smarter model. Both are betting the model layer is already ahead of what the physical layer underneath it can support.

<!--more-->

## A robot-perception startup raised $165M on a claim about eyes, not brains

Lyte, founded by former Apple and PrimeSense engineers Alexander Shpunt, Arman Hajati and Yuval Gerson, closed a $165 million Series C on September 2, led by Maverick Silicon, with Fidelity Management & Research (which led its Series B), Atreides Management, Key1 Capital and Ora Global also participating, according to [SiliconANGLE's report on the raise](https://siliconangle.com/2026/09/02/lyte-raises-165m-at-1-6b-valuation-to-bring-accurate-perception-to-robots/). The round pushes Lyte's post-money valuation to $1.6 billion and its total funding to $272 million, up from the roughly $1 billion implied by the $107 million stealth-exit raise it disclosed just eight months earlier, in January.

Lyte designs its own custom silicon, multimodal sensors and spatial software stack "from the transistor up." Its LyteVision system fuses 4D coherent vision (a sensing method that captures depth and motion, not just a flat image), high-resolution imaging and inertial sensing onto a single synchronized timeline, and the company has moved past demoing that stack into shipping it to paying robotics customers in inspection, logistics and manufacturing. CEO Shpunt's framing, quoted in the same report, is blunt: "Physical AI has a sensing problem before it has a model problem."

That's a specific claim, not a slogan, and the $1.6 billion valuation is the market pricing it as credible. A robot's decisions are only as good as what it can actually perceive, and if the perception stack is unreliable, no amount of downstream model sophistication fixes that. Lyte's bet is that owning silicon, sensors and software as one integrated system, rather than assembling a robot out of commodity cameras and a smart model bolted on top, is the more defensible place to sit in the physical AI stack, and investors who've watched the company convert from a stealth roadmap into deployed, revenue-generating hardware since January are paying accordingly.

It also reframes what "reliability" means for a robot working around people. A language model that occasionally hallucinates a wrong answer is an annoyance. A robot arm that occasionally misjudges the distance to a person's hand on a factory floor is a safety incident. That asymmetry is why a vertically integrated perception stack, one where the sensor hardware, the silicon reading it and the software fusing it were all designed together rather than stitched from off-the-shelf parts, commands a premium once a robot moves from a controlled demo into a working warehouse or plant. Commodity components can be good enough for a video; they're a harder sell once the failure mode is physical.

## A materials startup betting the same thing, one layer further down

A few weeks earlier, on August 10, Discovered Materials announced a $9 million seed round led by Lightspeed India Partners, with Y Combinator, Peak XV Partners and angel investors including Paul Graham, Gokul Rajaram and Thariq Shihipar participating, according to [TechCrunch's coverage of the raise](https://techcrunch.com/2026/08/10/discovered-materials-is-playing-ai-whack-a-mole-to-hunt-cooler-chips/). The company, founded by Advaith Sridhar (a materials scientist with a Stanford PhD and eleven years researching semiconductor materials) and Akash Ramdas (an AI engineer from Carnegie Mellon, formerly at Persona AI and Luma Labs), is chasing a much less glamorous bottleneck than Lyte's: the thermally conductive dielectric materials (electrical insulators engineered to still move heat efficiently) that sit inside a chip package and determine how much heat you can pack into a given volume before the whole thing throttles.

Discovered Materials' pipeline uses Anthropic's models inside a custom multi-agent harness to generate candidate material leads, then verifies each one against foundational physics simulation models the company trained itself. Rather than pretraining its own foundation model, it spent its seed capital on that verification layer, treating an existing frontier model as infrastructure to build on top of instead of a problem to solve from scratch. Alongside the funding announcement, the company released hundreds of AI-discovered candidate materials and Material Discovery Bench, which it describes as the first benchmark for evaluating AI agents on real-world semiconductor materials-discovery problems, launched via a Show HN-style post on Hacker News.

Chip heat and power draw, not raw compute, is emerging as one of the harder physical constraints on scaling AI infrastructure, and a $9 million seed betting on an existing LLM as an orchestration layer over physics simulation is a cheap, fast way to attack it compared with training a bespoke model. It's also, structurally, the same wager Lyte is making: the thing gating how far the AI layer above you can go isn't the model, it's a physical property nobody wants to spend a pitch-deck slide on.

## Why the bottleneck keeps showing up below the model layer

Line these two rounds up and a pattern emerges that has nothing to do with either company's specific sector. The model layer gets nearly all the funding headlines and most of the public attention, but the constraint that actually determines whether a physical-AI product ships is usually sitting one or two layers further down, in the part of the stack nobody wants to spend a fundraising deck slide on. Lyte didn't bet on a smarter robot brain. It bet on the eyes. Discovered Materials didn't try to out-build a frontier lab's model. It used one as infrastructure and spent its actual capital on the harder, less visible physics verification work underneath.

That's the useful diagnostic for any hard-tech founder building right now, and it applies just as much to how you finance the company as to what you build. The same discipline about knowing which layer of a stack you actually own also applies to knowing which kind of capital is actually backing you, a distinction that shows up clearly in [three very differently structured deeptech rounds that also closed this week](/blog/deeptech/how-to-read-a-deeptech-funding-round). If your physical-AI pitch leans entirely on your model's capability, both of these rounds are a reminder that sophisticated investors are increasingly pricing the layer beneath the model as the harder, more defensible problem. Know which layer you actually solve before a diligence call forces the distinction, and know whether you're quietly assuming someone else has already solved the layer underneath yours.

Neither Lyte nor Discovered Materials is pitching itself as an AI company in the way that phrase usually gets used. Neither is racing to train a bigger foundation model, chase a benchmark leaderboard, or claim a general-purpose capability. Both are pitching themselves as infrastructure for somebody else's AI system, one selling the sensing layer a robot needs before its model can do anything useful, the other selling the materials science a chip needs before more compute can even be packed into the same box. That's a narrower, less headline-friendly claim than "we built a better model." It's also, on this week's evidence, a more fundable one, and it's worth asking which side of that split your own roadmap actually sits on.

## What to watch next

Two concrete things are worth tracking as both bets play out. Whether Lyte discloses named production customers or design wins beyond the general "inspection, logistics, manufacturing" categories it currently uses, and whether its relationship with Maverick Silicon turns into a disclosed chip-fabrication partnership. And whether any named chipmaker actually licenses one of Discovered Materials' disclosed AI-discovered materials, the real proof point that would sit beyond the benchmark release itself. Both are checkable claims that haven't been checked yet, which is exactly the standard [early-stage deeptech validation](/blog/deeptech/how-early-stage-deeptech-earns-real-validation) should be held to.

---

*Clement Chen is a startup founder, advisor, and investor who writes about deeptech and building companies at [clementchen.co](https://clementchen.co).*
