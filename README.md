# TrackSphere Hybrid

> UWB · BLE · LoRa · NB-IoT · Cellular — One platform. Every environment.

**Hypothetical case study — portfolio project.**
This is not a live commercial product. It was conceived as a structured exploration of hybrid asset-tracking architectures: to study how different wireless technologies actually behave across environments, understand their trade-offs at a physical and protocol level, and design a reference system where they coexist intelligently. Each technology involved will live in its own focused sub-repository (see [Planned Submodules](#planned-submodules)).

---

## The Problem

Industrial operations in Portugal — and across Europe — typically lose asset visibility the moment an asset crosses a threshold: GPS stops working indoors, Wi-Fi coverage is patchy, and no single system follows a tool, pallet, or vehicle from factory floor to truck to destination. The result is manual counts, missed SLAs, lost tooling, and no audit trail.

This project models what a purpose-built solution to that problem looks like end-to-end.

---

## The Solution

TrackSphere Hybrid is a reference architecture for continuous asset tracking across the full operational journey — assembly floor, warehouse, outdoor yard, regional transit, and long-haul logistics — using a portfolio of complementary radio technologies activated contextually by a central edge intelligence layer.

The core principle: **the right radio for the right zone, switched automatically, with no gap in coverage.**

---

## System Architecture

### Asset Journey & Technology Handoff

Assets move through zones, each with different physical constraints. The system maps radio technology to zone:

| Zone | Environment | Primary Radio | Supplemental |
|---|---|---|---|
| Assembly Floor | Indoor, precision-critical | UWB | — |
| Warehouse | Indoor, zone-level | BLE (AoA) | UWB (high-value) |
| Outdoor Yard | Open, large-area | LoRa | BLE (near-gate) |
| Regional Transit | Road, national coverage | NB-IoT | — |
| Long-Haul / Export | Cross-border, real-time | 4G/5G + GNSS | NB-IoT |

### System Layers

```
L4 · Application   — ERP / WMS / MES integrations, dashboards, SLA alerts
L3 · Platform      — Beagle cloud: rules engine, switching logic, historian
L2 · Edge          — Beagle gateway: local aggregation, decision, buffering
L1 · Physical      — Multi-radio tags: UWB + BLE + LoRa + NB-IoT
```

### Data Flows

```
UWB Anchors     → Beagle (local)     raw range/angle → RTLS engine on-device
BLE Beacons     → Beagle (local)     zone presence → proximity engine
LoRa Nodes      → LoRaWAN Gateway    long-range heartbeat → cloud via TTN/private
NB-IoT Tags     → Telco Network      in-transit position → direct to platform
Beagle          → Cloud Platform     aggregated, filtered events → API / Webhooks
```

---

## The Beagle Gateway

The Beagle is the edge intelligence core of the system — a ruggedised gateway that listens to all radio channels simultaneously, applies switching logic locally, and forwards only clean, enriched events upstream.

Named for its instinct to sniff, track, and report.

### Hardware Profile

| Parameter | Spec |
|---|---|
| Form factor | DIN-rail or wall-mount, IP54 |
| Radios | UWB + BLE 5.3 + LoRa 868 MHz + NB-IoT |
| CPU | ARM Cortex-A55 quad-core, edge AI ready |
| Connectivity | Ethernet, Wi-Fi, 4G failover |
| Local storage | 16 GB flash — offline buffer |
| Power | PoE+ / 24V DC / UPS input |
| Operating temp | −20 °C to +65 °C industrial |
| Interfaces | MQTT, REST, OPC-UA, Modbus |

### Switching Logic

The Beagle applies rule-based radio switching in real time:

```
IF  location zone entry          →  activate UWB anchors, sleep LoRa
IF  zone exit → yard detected    →  switch to BLE + LoRa heartbeat
IF  speed > 20 km/h              →  engage NB-IoT or 4G, disable short-range
IF  battery < 20%                →  drop to LoRa / NB-IoT only, reduce poll rate
IF  no network > 60 s            →  buffer to local flash, sync on reconnect
```

### Deployment Topologies

- **Single-site** — 1–3 Beagles cover a full SME factory: indoor anchors, yard beacons, uplink
- **Multi-site** — per-facility gateways aggregated into a unified cloud asset view
- **Transit-only** — Beagle-Lite as vehicle OBU; NB-IoT/4G in motion, syncs to facility on arrival

---

## Technology Portfolio

### UWB — Ultra-Wideband `PRECISION`
- **Range:** 10–50 m | **Accuracy:** ~10 cm | **Latency:** < 1 ms
- **Power:** High | **Cost:** High
- Assembly line tool tracking, AGV collision avoidance, high-value asset positioning inside facilities.

### BLE — Bluetooth Low Energy `SCALABLE`
- **Range:** 5–100 m | **Accuracy:** 1–3 m (AoA) | **Latency:** < 100 ms
- **Power:** Low | **Cost:** Low
- Warehouse zones, inventory check-ins, personnel badges, equipment in covered yards and docking bays.

### LoRa — LoRaWAN `LONG LIFE`
- **Range:** up to 15 km | **Accuracy:** geofence / zone | **Latency:** seconds
- **Power:** Ultra-low | **Cost:** Low | **Battery life:** > 5 years
- Slow-moving outdoor assets, containers in open yards, equipment across distributed sites.

### NB-IoT — Narrowband IoT `COVERAGE`
- **Range:** national | **Accuracy:** cell-level / GPS | **Latency:** seconds
- **Power:** Very low | **Cost:** low monthly OPEX
- Assets in transit between facilities, tools at remote job sites, national logistics on cellular infrastructure.

### 4G/5G — Cellular `REAL-TIME`
- **Range:** global | **Accuracy:** GPS + GNSS | **Latency:** < 50 ms
- **Power:** High | **Cost:** medium monthly OPEX
- Fleet vehicles, high-value cargo in motion, real-time delivery ETAs, cross-border cold chain telemetry.

---

## Decision Matrix

| Scenario | UWB | BLE | LoRa | NB-IoT | 4G/5G |
|---|:---:|:---:|:---:|:---:|:---:|
| Assembly line tools | ✦ | ○ | — | — | — |
| Warehouse inventory | ○ | ✦ | — | — | — |
| Outdoor container yard | — | ○ | ✦ | ○ | — |
| Assets in national transit | — | — | — | ✦ | ○ |
| Cold chain / cross-border | — | — | — | ○ | ✦ |
| Low-power multi-year | — | ○ | ✦ | ✦ | — |

`✦ Primary  ○ Supplemental  — Not applicable`

---

## Target Verticals

The system is designed around Portuguese industrial reality, with applicability across the broader EU market:

| Vertical | Geography | Priority |
|---|---|---|
| Automotive | Palmela · Setúbal corridor | HIGH |
| Logistics & 3PL | Lisbon · Sines · Porto | HIGH |
| Construction | Tools & heavy machines, distributed sites | MED |
| Pharma & Food | Traceability and compliance requirements | MED |
| Port & Maritime | Sines · Leixões · Setúbal terminals | MED |

Portugal's industrial IoT market grows at 13.6% annually. €200M in i4.0 and PRR digitalization grants are currently active, and no dominant local player offers a true hybrid indoor/outdoor solution — the gap TrackSphere is designed to fill.

---

## Planned Submodules

This repository is the root of a multi-technology study. Each component will be developed as a standalone **git submodule** — containing firmware, protocol analysis, RF behaviour documentation, and hardware specs specific to that technology:

| Submodule | Focus | Status |
|---|---|---|
| `submodules/uwb-rtls` | UWB ranging, TWR/TDOA algorithms, anchor placement | Planned |
| `submodules/ble-proximity` | BLE AoA, beacon firmware, zone engine | Planned |
| `submodules/lora-tracking` | LoRaWAN protocol stack, power profiling, TTN integration | Planned |
| `submodules/nbiot-transit` | NB-IoT modem firmware, PSM/eDRX tuning, AT command layer | Planned |
| `submodules/cellular-fleet` | 4G/5G GNSS tracking, MQTT telemetry, cold-chain sensors | Planned |
| `submodules/beagle-gateway` | Edge gateway firmware, switching logic, hardware BOM | Planned |

Each submodule will include:
- Protocol and RF behaviour analysis
- Reference firmware / driver code
- Hardware bill of materials (BOM)
- Integration notes for the Beagle gateway

---

## Interactive Architecture Demo

**Live:** [https://a-teresa.github.io/trackSphereHybrid/](https://a-teresa.github.io/trackSphereHybrid/)


An interactive pitch deck is included in this repository as a visual way to navigate the architecture — business case, asset journey map, Beagle gateway spec, and technology decision matrix. It is **not** the system; it is a structured entry point into the concepts before the submodules exist.

### Deploy to GitHub Pages

The project is already configured for one-command deployment.

**1. Push to GitHub:**

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/trackSphereHybrid.git
git push -u origin main
```

**2. Deploy the interactive demo:**

```bash
npm install
npm run deploy
```

This builds the app and pushes it to the `gh-pages` branch automatically.

**3. Enable Pages on GitHub:**

Go to your repo → **Settings** → **Pages** → Source: `Deploy from a branch` → Branch: `gh-pages` / `/ (root)` → **Save**.

The live demo will be available at `https://YOUR_USERNAME.github.io/trackSphereHybrid/` within a minute or two.

**Subsequent updates:** `npm run deploy` — rebuilds and republishes in one step.

### Run locally

```bash
npm install
npm run dev
```

---

## Licence

MIT — free to use, adapt, and build upon.
