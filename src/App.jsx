import { useState } from "react";

const COLORS = {
  bg: "#0a0c10",
  surface: "#10141c",
  card: "#141922",
  border: "#1e2736",
  accent: "#00e5ff",
  gold: "#f5a623",
  green: "#00e676",
  purple: "#b388ff",
  red: "#ff5252",
  orange: "#ff9800",
  text: "#e8eaf0",
  muted: "#7a8499",
  uwb: "#00e5ff",
  ble: "#b388ff",
  lora: "#00e676",
  nbiot: "#f5a623",
  cellular: "#ff9800",
};

const techData = [
  {
    id: "uwb",
    name: "UWB",
    full: "Ultra-Wideband",
    color: COLORS.uwb,
    icon: "⬡",
    range: "10–50 m",
    accuracy: "~10 cm",
    power: "High",
    cost: "High",
    latency: "< 1 ms",
    scenario: "Precision indoor",
    use: "Tool tracking on assembly lines, AGV collision avoidance, high-value asset positioning inside facilities",
    badge: "PRECISION",
  },
  {
    id: "ble",
    name: "BLE",
    full: "Bluetooth Low Energy",
    color: COLORS.ble,
    icon: "◈",
    range: "5–100 m",
    accuracy: "1–3 m (AoA)",
    power: "Low",
    cost: "Low",
    latency: "< 100 ms",
    scenario: "Zone indoor / near-yard",
    use: "Warehouse zones, inventory check-ins, personnel badges, equipment in covered yards and docking bays",
    badge: "SCALABLE",
  },
  {
    id: "lora",
    name: "LoRa",
    full: "Long Range (LoRaWAN)",
    color: COLORS.lora,
    icon: "◎",
    range: "Up to 15 km",
    accuracy: "Geofence / zone",
    power: "Ultra-low",
    cost: "Low",
    latency: "Seconds",
    scenario: "Large outdoor / rural",
    use: "Slow-moving outdoor assets, containers in open yards, equipment across distributed sites, battery life > 5 years",
    badge: "LONG LIFE",
  },
  {
    id: "nbiot",
    name: "NB-IoT",
    full: "Narrowband IoT",
    color: COLORS.nbiot,
    icon: "▣",
    range: "National coverage",
    accuracy: "Cell-level / GPS",
    power: "Very low",
    cost: "Low/Mo",
    latency: "Seconds",
    scenario: "Nationwide coverage",
    use: "Assets in transit between facilities, tools at remote job sites, national logistics tracking on cellular infrastructure",
    badge: "COVERAGE",
  },
  {
    id: "cellular",
    name: "4G/5G",
    full: "Cellular",
    color: COLORS.cellular,
    icon: "◉",
    range: "Global",
    accuracy: "GPS + GNSS",
    power: "High",
    cost: "Medium/Mo",
    latency: "< 50 ms",
    scenario: "Real-time transit",
    use: "Fleet vehicles, high-value cargo in motion, real-time delivery ETAs, cross-border shipments with streaming telemetry",
    badge: "REAL-TIME",
  },
];

const zones = [
  { label: "Assembly / Factory Floor", techs: ["uwb"], x: 12, y: 30, w: 18, h: 32 },
  { label: "Warehouse / Covered Yard", techs: ["ble", "uwb"], x: 32, y: 28, w: 20, h: 34 },
  { label: "Outdoor Yard / Staging", techs: ["ble", "lora"], x: 54, y: 26, w: 16, h: 36 },
  { label: "In Transit / Road", techs: ["nbiot", "cellular"], x: 72, y: 22, w: 20, h: 40 },
];

const slides = ["pitch", "architecture", "beagle", "portfolio"];

const slideLabels = {
  pitch: "01 · Business Case",
  architecture: "02 · System Architecture",
  beagle: "03 · The Beagle Gateway",
  portfolio: "04 · Technology Portfolio",
};

function TechBadge({ tech, small }) {
  const t = techData.find((x) => x.id === tech);
  if (!t) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: t.color + "22",
        border: `1px solid ${t.color}55`,
        color: t.color,
        borderRadius: 4,
        padding: small ? "2px 7px" : "4px 10px",
        fontSize: small ? 10 : 11,
        fontFamily: "monospace",
        fontWeight: 700,
        letterSpacing: 1,
        marginRight: 4,
      }}
    >
      {t.icon} {t.name}
    </span>
  );
}

function PitchSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Problem */}
        <div style={{
          background: COLORS.card, border: `1px solid ${COLORS.border}`,
          borderRadius: 12, padding: 24, borderLeft: `3px solid ${COLORS.red}`,
        }}>
          <div style={{ color: COLORS.red, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 12, fontFamily: "monospace" }}>
            ⚠ THE PROBLEM
          </div>
          <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Portuguese manufacturers track assets at the <span style={{ color: COLORS.text }}>facility gate — then lose visibility</span> the moment they enter a building or leave the yard. GPS doesn't work indoors. Wi-Fi only covers some buildings. No single system follows an asset from factory floor to truck to destination.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Lost tools", "Missed SLAs", "Manual counts", "No audit trail"].map(p => (
              <span key={p} style={{ background: COLORS.red + "18", border: `1px solid ${COLORS.red}33`, color: COLORS.red, borderRadius: 4, padding: "3px 10px", fontSize: 11, fontFamily: "monospace" }}>{p}</span>
            ))}
          </div>
        </div>
        {/* Opportunity */}
        <div style={{
          background: COLORS.card, border: `1px solid ${COLORS.border}`,
          borderRadius: 12, padding: 24, borderLeft: `3px solid ${COLORS.green}`,
        }}>
          <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 12, fontFamily: "monospace" }}>
            ◈ THE OPPORTUNITY
          </div>
          <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
            Portugal's IoT market grows at <span style={{ color: COLORS.text }}>13.6% annually</span> with €200M in i4.0 government grants active now. No dominant local player offers a <span style={{ color: COLORS.text }}>true indoor + outdoor hybrid solution.</span> The gap is open.
          </p>
          <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["€200M grants", "No local rival", "13.6% CAGR", "731K workers"].map(p => (
              <span key={p} style={{ background: COLORS.green + "18", border: `1px solid ${COLORS.green}33`, color: COLORS.green, borderRadius: 4, padding: "3px 10px", fontSize: 11, fontFamily: "monospace" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Value Props */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
        <div style={{ color: COLORS.accent, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 20, fontFamily: "monospace" }}>◎ VALUE PROPOSITION</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { icon: "⬡", title: "Seamless Continuity", desc: "One platform. One tag. Full visibility from assembly floor to final destination.", color: COLORS.uwb },
            { icon: "◈", title: "Right Tech, Right Place", desc: "Each radio activates only where it adds value — no waste, no overengineering.", color: COLORS.ble },
            { icon: "◎", title: "EU Funding Ready", desc: "Architecture qualifies for Portuguese i4.0 and PRR digitalization grants.", color: COLORS.green },
            { icon: "▣", title: "Built for Portugal", desc: "Local support, Portuguese integrations, priced for SME reality.", color: COLORS.gold },
          ].map(v => (
            <div key={v.title} style={{ textAlign: "center", padding: "16px 8px" }}>
              <div style={{ fontSize: 28, marginBottom: 10, color: v.color }}>{v.icon}</div>
              <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{v.title}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6 }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Target Markets */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
        <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>◉ TARGET VERTICALS — PORTUGAL</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {[
            { name: "Automotive", note: "Palmela · Setúbal corridor", priority: "HIGH", color: COLORS.uwb },
            { name: "Logistics & 3PL", note: "Lisbon · Sines · Porto", priority: "HIGH", color: COLORS.ble },
            { name: "Construction", note: "Tools & heavy machines", priority: "MED", color: COLORS.lora },
            { name: "Pharma & Food", note: "Traceability compliance", priority: "MED", color: COLORS.green },
            { name: "Port & Maritime", note: "Sines · Leixões · Setúbal", priority: "MED", color: COLORS.gold },
          ].map(v => (
            <div key={v.name} style={{ background: COLORS.surface, borderRadius: 8, padding: 14, border: `1px solid ${COLORS.border}` }}>
              <div style={{ color: v.color, fontSize: 12, fontWeight: 700, marginBottom: 4 }}>{v.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 8 }}>{v.note}</div>
              <span style={{ background: v.color + "22", color: v.color, fontSize: 9, fontFamily: "monospace", padding: "2px 6px", borderRadius: 3, fontWeight: 700 }}>{v.priority}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  const [hoveredZone, setHoveredZone] = useState(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Journey Map */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24 }}>
        <div style={{ color: COLORS.accent, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 20, fontFamily: "monospace" }}>
          ◎ ASSET JOURNEY — TECHNOLOGY HANDOFF MAP
        </div>
        <div style={{ position: "relative", overflowX: "auto" }}>
          {/* Journey flow */}
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 600 }}>
            {[
              {
                zone: "Assembly Floor",
                sub: "Indoor precision",
                techs: ["uwb"],
                icon: "⚙",
                color: COLORS.uwb,
                desc: "Sub-10cm accuracy for tool tracking, machine positioning, order tracing on production lines",
              },
              {
                zone: "Warehouse",
                sub: "Indoor zones",
                techs: ["ble", "uwb"],
                icon: "📦",
                color: COLORS.ble,
                desc: "Zone-level inventory and pallet management; UWB supplements for high-value items",
              },
              {
                zone: "Outdoor Yard",
                sub: "Staging & logistics",
                techs: ["ble", "lora"],
                icon: "🏗",
                color: COLORS.lora,
                desc: "BLE for near-gate accuracy, LoRa for large yard coverage and slow-moving containers",
              },
              {
                zone: "Regional Transit",
                sub: "Cross-facility",
                techs: ["nbiot"],
                icon: "🚛",
                color: COLORS.nbiot,
                desc: "NB-IoT on cellular towers; low power, nationwide coverage for assets in transit between sites",
              },
              {
                zone: "Long-Haul / Export",
                sub: "Real-time streaming",
                techs: ["cellular"],
                icon: "🌍",
                color: COLORS.cellular,
                desc: "4G/5G GNSS streaming for real-time ETAs, cold chain telemetry, cross-border visibility",
              },
            ].map((z, i) => (
              <div key={z.zone} style={{ display: "flex", flex: 1, alignItems: "stretch" }}>
                <div
                  onMouseEnter={() => setHoveredZone(i)}
                  onMouseLeave={() => setHoveredZone(null)}
                  style={{
                    flex: 1,
                    background: hoveredZone === i ? z.color + "18" : COLORS.surface,
                    border: `1px solid ${hoveredZone === i ? z.color + "88" : COLORS.border}`,
                    borderRadius: 8,
                    padding: 16,
                    cursor: "default",
                    transition: "all 0.2s",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div style={{ fontSize: 22, textAlign: "center" }}>{z.icon}</div>
                  <div style={{ color: z.color, fontSize: 12, fontWeight: 700, textAlign: "center" }}>{z.zone}</div>
                  <div style={{ color: COLORS.muted, fontSize: 10, textAlign: "center" }}>{z.sub}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4, justifyContent: "center" }}>
                    {z.techs.map(t => <TechBadge key={t} tech={t} small />)}
                  </div>
                  {hoveredZone === i && (
                    <div style={{ color: COLORS.muted, fontSize: 11, lineHeight: 1.5, textAlign: "center", marginTop: 4 }}>
                      {z.desc}
                    </div>
                  )}
                </div>
                {i < 4 && (
                  <div style={{ display: "flex", alignItems: "center", padding: "0 4px", color: COLORS.muted, fontSize: 16 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ color: COLORS.muted, fontSize: 11, marginTop: 12, fontFamily: "monospace", textAlign: "center" }}>
          ↑ Hover each zone to see technology rationale
        </div>
      </div>

      {/* Layers */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>
            ▣ SYSTEM LAYERS
          </div>
          {[
            { layer: "L4 · Application", desc: "ERP / WMS / MES integrations, dashboards, alerts, SLA reporting", color: COLORS.accent },
            { layer: "L3 · Platform", desc: "Beagle management cloud — rules engine, tech-switching logic, historian", color: COLORS.gold },
            { layer: "L2 · Edge", desc: "Beagle gateway devices — aggregation, local decision, data compression", color: COLORS.green },
            { layer: "L1 · Physical", desc: "Multi-radio tags — UWB + BLE + LoRa + NB-IoT in one device portfolio", color: COLORS.ble },
          ].map(l => (
            <div key={l.layer} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
              <span style={{ color: l.color, fontFamily: "monospace", fontSize: 11, fontWeight: 700, minWidth: 90 }}>{l.layer}</span>
              <span style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.5 }}>{l.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ color: COLORS.purple, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>
            ◈ DATA FLOWS
          </div>
          {[
            { from: "UWB Anchors", to: "Beagle (local)", note: "Raw range/angle data → RTLS engine on-device" },
            { from: "BLE Beacons", to: "Beagle (local)", note: "Zone presence → proximity engine" },
            { from: "LoRa Nodes", to: "LoRaWAN Gateway", note: "Long-range heartbeat → cloud via TTN/private" },
            { from: "NB-IoT Tags", to: "Telco Network", note: "In-transit position → direct to platform" },
            { from: "Beagle", to: "Cloud Platform", note: "Aggregated, filtered events → API / Webhooks" },
          ].map(f => (
            <div key={f.from} style={{ display: "flex", flexDirection: "column", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: COLORS.text, fontSize: 11, fontFamily: "monospace" }}>{f.from}</span>
                <span style={{ color: COLORS.muted, fontSize: 11 }}>→</span>
                <span style={{ color: COLORS.accent, fontSize: 11, fontFamily: "monospace" }}>{f.to}</span>
              </div>
              <div style={{ color: COLORS.muted, fontSize: 11, paddingLeft: 4 }}>{f.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeagleSlide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Header */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.green}44`, borderRadius: 12, padding: 24, borderLeft: `3px solid ${COLORS.green}` }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24 }}>
          <div style={{ fontSize: 52, lineHeight: 1 }}>🐕</div>
          <div>
            <div style={{ color: COLORS.green, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 8, fontFamily: "monospace" }}>THE BEAGLE GATEWAY</div>
            <div style={{ color: COLORS.text, fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
              The Edge Intelligence Core
            </div>
            <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0, maxWidth: 580 }}>
              Named for its instinct to <span style={{ color: COLORS.text }}>sniff, track, and report</span> — the Beagle is a ruggedised edge gateway that simultaneously listens to all radio channels, decides which signals are relevant, and forwards only clean, enriched events upstream. It's the bridge between physical radio infrastructure and the cloud platform.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Hardware Spec */}
        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ color: COLORS.accent, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>⬡ HARDWARE PROFILE</div>
          {[
            { label: "Form factor", value: "DIN-rail or wall-mount, IP54" },
            { label: "Radios", value: "UWB + BLE 5.3 + LoRa 868MHz + NB-IoT" },
            { label: "CPU", value: "ARM Cortex-A55 quad-core, edge AI ready" },
            { label: "Connectivity", value: "Ethernet, Wi-Fi, 4G failover" },
            { label: "Local storage", value: "16 GB flash — offline buffer" },
            { label: "Power", value: "PoE+ / 24V DC / UPS input" },
            { label: "Operating temp", value: "-20°C to +65°C industrial" },
            { label: "Interfaces", value: "MQTT, REST, OPC-UA, Modbus" },
          ].map(r => (
            <div key={r.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}` }}>
              <span style={{ color: COLORS.muted, fontSize: 12 }}>{r.label}</span>
              <span style={{ color: COLORS.text, fontSize: 12, fontFamily: "monospace" }}>{r.value}</span>
            </div>
          ))}
        </div>

        {/* Intelligence */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20, flex: 1 }}>
            <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 14, fontFamily: "monospace" }}>◈ SWITCHING INTELLIGENCE</div>
            {[
              { trigger: "Location zone entry", action: "Activate UWB anchors, sleep LoRa radio", color: COLORS.uwb },
              { trigger: "Zone exit → yard detected", action: "Switch to BLE beacons + LoRa heartbeat", color: COLORS.lora },
              { trigger: "Speed > 20 km/h", action: "Engage NB-IoT or 4G, disable short-range", color: COLORS.nbiot },
              { trigger: "Battery < 20%", action: "Drop to LoRa / NB-IoT only, reduce poll rate", color: COLORS.green },
              { trigger: "No network > 60s", action: "Local buffer to flash, sync on reconnect", color: COLORS.accent },
            ].map(r => (
              <div key={r.trigger} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ color: r.color, fontSize: 10, fontFamily: "monospace", marginTop: 2 }}>IF</span>
                  <span style={{ color: COLORS.muted, fontSize: 11, flex: 1 }}>{r.trigger}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginLeft: 16 }}>
                  <span style={{ color: COLORS.green, fontSize: 10, fontFamily: "monospace", marginTop: 2 }}>→</span>
                  <span style={{ color: COLORS.text, fontSize: 11, flex: 1 }}>{r.action}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deployment Modes */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
        <div style={{ color: COLORS.purple, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>◉ DEPLOYMENT TOPOLOGY</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { name: "Single-site", desc: "1–3 Beagles cover a full SME factory — indoor anchors, yard beacons, and uplink in one box.", techs: ["uwb", "ble"], color: COLORS.uwb },
            { name: "Multi-site", desc: "Each facility has local Beagles. Central cloud aggregates all sites into one unified asset view.", techs: ["ble", "lora", "nbiot"], color: COLORS.lora },
            { name: "Transit-only", desc: "Beagle-Lite as vehicle on-board unit. NB-IoT/4G reporting, syncs to facility network on arrival.", techs: ["nbiot", "cellular"], color: COLORS.cellular },
          ].map(m => (
            <div key={m.name} style={{ background: COLORS.surface, borderRadius: 8, padding: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ color: m.color, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{m.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12, lineHeight: 1.6, marginBottom: 12 }}>{m.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {m.techs.map(t => <TechBadge key={t} tech={t} small />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PortfolioSlide() {
  const [selected, setSelected] = useState(null);
  const active = selected !== null ? techData[selected] : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
        <div style={{ color: COLORS.accent, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 4, fontFamily: "monospace" }}>◎ TECHNOLOGY PORTFOLIO — SELECT RADIO</div>
        <div style={{ color: COLORS.muted, fontSize: 11, marginBottom: 20 }}>Not all radios, all the time. Each technology activates only where it delivers best ROI.</div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {techData.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setSelected(selected === i ? null : i)}
              style={{
                flex: 1,
                minWidth: 100,
                background: selected === i ? t.color + "22" : COLORS.surface,
                border: `2px solid ${selected === i ? t.color : COLORS.border}`,
                borderRadius: 10,
                padding: "16px 12px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.18s",
              }}
            >
              <div style={{ fontSize: 22, marginBottom: 8, color: t.color }}>{t.icon}</div>
              <div style={{ color: t.color, fontSize: 14, fontWeight: 800, fontFamily: "monospace" }}>{t.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 4 }}>{t.scenario}</div>
              <div style={{ marginTop: 8 }}>
                <span style={{ background: t.color + "22", color: t.color, fontSize: 9, fontFamily: "monospace", padding: "2px 7px", borderRadius: 3, fontWeight: 700 }}>{t.badge}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && (
        <div style={{ background: COLORS.card, border: `2px solid ${active.color}55`, borderRadius: 12, padding: 24, transition: "all 0.2s" }}>
          <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap" }}>
            <div style={{ flex: 2, minWidth: 240 }}>
              <div style={{ color: active.color, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 8, fontFamily: "monospace" }}>{active.icon} {active.name} · {active.full}</div>
              <p style={{ color: COLORS.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>{active.use}</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, flex: 2, minWidth: 300 }}>
              {[
                { label: "Range", value: active.range },
                { label: "Accuracy", value: active.accuracy },
                { label: "Power draw", value: active.power },
                { label: "HW cost", value: active.cost },
                { label: "Latency", value: active.latency },
                { label: "Best zone", value: active.scenario },
              ].map(s => (
                <div key={s.label} style={{ background: COLORS.surface, borderRadius: 8, padding: 12, border: `1px solid ${COLORS.border}` }}>
                  <div style={{ color: COLORS.muted, fontSize: 10, marginBottom: 4 }}>{s.label}</div>
                  <div style={{ color: active.color, fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Decision Matrix */}
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 20 }}>
        <div style={{ color: COLORS.gold, fontSize: 10, fontWeight: 700, letterSpacing: 3, marginBottom: 16, fontFamily: "monospace" }}>▣ DECISION MATRIX — WHEN TO USE WHAT</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
            <thead>
              <tr>
                {["Scenario", ...techData.map(t => t.name)].map(h => (
                  <th key={h} style={{ color: COLORS.muted, padding: "8px 12px", textAlign: "left", borderBottom: `1px solid ${COLORS.border}`, fontFamily: "monospace", fontWeight: 600, fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { scenario: "Assembly line tools", uwb: "✦", ble: "○", lora: "—", nbiot: "—", cellular: "—" },
                { scenario: "Warehouse inventory", uwb: "○", ble: "✦", lora: "—", nbiot: "—", cellular: "—" },
                { scenario: "Outdoor container yard", uwb: "—", ble: "○", lora: "✦", nbiot: "○", cellular: "—" },
                { scenario: "Assets in national transit", uwb: "—", ble: "—", lora: "—", nbiot: "✦", cellular: "○" },
                { scenario: "Cold chain / cross-border", uwb: "—", ble: "—", lora: "—", nbiot: "○", cellular: "✦" },
                { scenario: "Low-power multi-year", uwb: "—", ble: "○", lora: "✦", nbiot: "✦", cellular: "—" },
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? "transparent" : COLORS.surface + "88" }}>
                  <td style={{ color: COLORS.text, padding: "9px 12px", borderBottom: `1px solid ${COLORS.border}11` }}>{row.scenario}</td>
                  {["uwb", "ble", "lora", "nbiot", "cellular"].map(k => {
                    const t = techData.find(x => x.id === k);
                    const val = row[k];
                    return (
                      <td key={k} style={{ padding: "9px 12px", textAlign: "center", borderBottom: `1px solid ${COLORS.border}11` }}>
                        <span style={{ color: val === "✦" ? t.color : val === "○" ? t.color + "66" : COLORS.border, fontWeight: val === "✦" ? 800 : 400, fontSize: val === "✦" ? 16 : 14 }}>{val}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ color: COLORS.muted, fontSize: 10, marginTop: 10, fontFamily: "monospace" }}>✦ Primary  ○ Supplemental  — Not applicable</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [slide, setSlide] = useState("pitch");

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif", color: COLORS.text, padding: "24px 20px" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <div style={{ width: 8, height: 32, background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.purple})`, borderRadius: 4 }} />
              <div>
                <div style={{ color: COLORS.muted, fontSize: 10, letterSpacing: 4, fontFamily: "monospace", marginBottom: 2 }}>HYBRID TRACKING SOLUTIONS · PORTUGAL</div>
                <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, color: COLORS.text }}>
                  TrackSphere <span style={{ color: COLORS.accent }}>Hybrid</span>
                </div>
              </div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginLeft: 20, paddingLeft: 12, borderLeft: `2px solid ${COLORS.border}` }}>
              UWB · BLE · LoRa · NB-IoT · Cellular — One platform. Every environment.
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
            {slides.map(s => (
              <button
                key={s}
                onClick={() => setSlide(s)}
                style={{
                  background: slide === s ? COLORS.accent + "18" : "transparent",
                  border: `1px solid ${slide === s ? COLORS.accent : COLORS.border}`,
                  color: slide === s ? COLORS.accent : COLORS.muted,
                  padding: "7px 14px",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontSize: 11,
                  fontFamily: "monospace",
                  fontWeight: slide === s ? 700 : 400,
                  transition: "all 0.15s",
                }}
              >
                {slideLabels[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Title */}
      <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}` }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: COLORS.text }}>{slideLabels[slide].split(" · ")[1]}</h2>
      </div>

      {/* Content */}
      {slide === "pitch" && <PitchSlide />}
      {slide === "architecture" && <ArchitectureSlide />}
      {slide === "beagle" && <BeagleSlide />}
      {slide === "portfolio" && <PortfolioSlide />}
    </div>
  );
}
