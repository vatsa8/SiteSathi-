// Spot the Hazard scenes
// Each scene is a simple drawing (SVG, 400 × 300 units) plus a list of hazards.
// Each hazard has a tap zone: centre (x, y) and radius r, in the same 400 × 300 units.
// To add a scene, copy one block, draw it, and list its hazards.

(function () {
  // A simple worker figure standing with feet at (x, y).
  function person(x, y, o) {
    o = o || {};
    const c = o.color || '#2563eb';
    const hy = y - 38;  // head centre
    return '<g>' +
      '<line x1="' + x + '" y1="' + (y - 14) + '" x2="' + (x - 6) + '" y2="' + y + '" stroke="#374151" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="' + x + '" y1="' + (y - 14) + '" x2="' + (x + 6) + '" y2="' + y + '" stroke="#374151" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="' + x + '" y1="' + (y - 31) + '" x2="' + x + '" y2="' + (y - 14) + '" stroke="' + c + '" stroke-width="7" stroke-linecap="round"/>' +
      '<line x1="' + x + '" y1="' + (y - 28) + '" x2="' + (x - 10) + '" y2="' + (y - 18) + '" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/>' +
      '<line x1="' + x + '" y1="' + (y - 28) + '" x2="' + (x + 10) + '" y2="' + (y - 18) + '" stroke="' + c + '" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="' + x + '" cy="' + hy + '" r="7" fill="#f2c39b"/>' +
      (o.helmet
        ? '<path d="M' + (x - 9) + ' ' + (hy - 1) + ' a9 9 0 0 1 18 0 z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/><line x1="' + (x - 11) + '" y1="' + (hy - 1) + '" x2="' + (x + 11) + '" y2="' + (hy - 1) + '" stroke="#ca8a04" stroke-width="2"/>'
        : '<path d="M' + (x - 7) + ' ' + (hy - 2) + ' a7 7 0 0 1 14 0 z" fill="#1f2937"/>') +
      '</g>';
  }

  // ── Scene 1: building site ──
  let site = '' +
    '<rect width="400" height="230" fill="#cfe8f5"/>' +
    '<circle cx="372" cy="38" r="16" fill="#fcd34d"/>' +
    '<rect y="230" width="400" height="70" fill="#a8743f"/>' +
    // building behind the scaffold
    '<rect x="22" y="70" width="136" height="160" fill="#d6d3d1"/>';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    site += '<rect x="' + (38 + c * 40) + '" y="' + (108 + r * 40) + '" width="22" height="16" fill="#94a3b8"/>';
  }
  site +=
    // scaffold standards
    '<line x1="40" y1="88" x2="40" y2="230" stroke="#57534e" stroke-width="4"/>' +
    '<line x1="140" y1="88" x2="140" y2="230" stroke="#57534e" stroke-width="4"/>' +
    '<line x1="40" y1="230" x2="140" y2="165" stroke="#78716c" stroke-width="2"/>' +
    // middle platform WITH guardrails
    '<rect x="36" y="165" width="108" height="7" fill="#92400e"/>' +
    '<line x1="40" y1="135" x2="140" y2="135" stroke="#57534e" stroke-width="3"/>' +
    '<line x1="40" y1="150" x2="140" y2="150" stroke="#57534e" stroke-width="3"/>' +
    // top platform with NO guardrail
    '<rect x="36" y="95" width="108" height="7" fill="#92400e"/>' +
    person(115, 95, { helmet: true, color: '#ea580c' }) +
    person(65, 165, { helmet: false, color: '#2563eb' }) +
    // ladder: too flat, does not reach above the platform
    '<line x1="203" y1="230" x2="143" y2="170" stroke="#a16207" stroke-width="3"/>' +
    '<line x1="215" y1="230" x2="155" y2="170" stroke="#a16207" stroke-width="3"/>';
  for (let k = 1; k < 6; k++) {
    const t = k / 6;
    site += '<line x1="' + (203 - 60 * t) + '" y1="' + (230 - 60 * t) + '" x2="' + (215 - 60 * t) + '" y2="' + (230 - 60 * t) + '" stroke="#a16207" stroke-width="2"/>';
  }
  site +=
    // crane jib, rope and suspended load
    '<line x1="150" y1="10" x2="400" y2="10" stroke="#eab308" stroke-width="6"/>' +
    '<line x1="250" y1="10" x2="250" y2="98" stroke="#374151" stroke-width="2"/>' +
    '<path d="M244 98 h12 v5 h-12 z" fill="#374151"/>' +
    '<rect x="222" y="103" width="56" height="26" fill="#6b7280" stroke="#374151"/>' +
    '<line x1="226" y1="112" x2="274" y2="112" stroke="#9ca3af" stroke-width="2"/>' +
    '<line x1="226" y1="120" x2="274" y2="120" stroke="#9ca3af" stroke-width="2"/>' +
    person(250, 230, { helmet: true, color: '#16a34a' }) +
    // spoil heap right at the trench edge
    '<polygon points="278,231 298,200 314,231" fill="#7c4a1e"/>' +
    // open trench, no barricade
    '<rect x="314" y="230" width="72" height="34" fill="#3f2a17"/>' +
    '<rect x="314" y="230" width="72" height="5" fill="#2b1c0f"/>';

  // ── Scene 2: STP / sewer works ──
  let stp = '' +
    '<rect width="400" height="230" fill="#dbeafe"/>' +
    '<g fill="#ffffff" opacity=".9"><circle cx="70" cy="50" r="16"/><circle cx="92" cy="44" r="20"/><circle cx="116" cy="52" r="14"/>' +
    '<circle cx="270" cy="70" r="12"/><circle cx="288" cy="64" r="16"/><circle cx="306" cy="72" r="11"/></g>' +
    '<rect y="230" width="400" height="70" fill="#a8a29e"/>' +
    // pipe from tank to pump house
    '<rect x="164" y="176" width="26" height="8" fill="#64748b"/>' +
    // background tanks
    '<rect x="14" y="140" width="150" height="90" fill="#9ca3af"/>' +
    '<rect x="14" y="140" width="150" height="8" fill="#6b7280"/>' +
    '<text x="89" y="190" font-size="12" text-anchor="middle" fill="#f8fafc" font-family="sans-serif">AERATION TANK</text>' +
    '<rect x="190" y="160" width="120" height="70" fill="#cbd5e1"/>' +
    '<text x="250" y="200" font-size="11" text-anchor="middle" fill="#475569" font-family="sans-serif">PUMP HOUSE</text>' +
    // manhole A: open, cover lying aside, no barricade
    '<ellipse cx="85" cy="246" rx="32" ry="10" fill="#111827" stroke="#6b7280" stroke-width="3"/>' +
    '<ellipse cx="136" cy="266" rx="20" ry="6" fill="#4b5563"/>' +
    // worker without helmet
    person(168, 252, { helmet: false, color: '#ea580c' }) +
    // manhole B: worker climbing in, no tripod, no attendant
    '<ellipse cx="232" cy="252" rx="30" ry="10" fill="#111827" stroke="#6b7280" stroke-width="3"/>' +
    '<line x1="232" y1="221" x2="232" y2="250" stroke="#2563eb" stroke-width="7" stroke-linecap="round"/>' +
    '<line x1="232" y1="226" x2="216" y2="248" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>' +
    '<line x1="232" y1="226" x2="248" y2="248" stroke="#2563eb" stroke-width="4" stroke-linecap="round"/>' +
    '<circle cx="232" cy="213" r="7" fill="#f2c39b"/>' +
    '<path d="M223 212 a9 9 0 0 1 18 0 z" fill="#facc15" stroke="#ca8a04" stroke-width="1"/>' +
    '<path d="M202 252 A30 10 0 0 0 262 252" fill="none" stroke="#6b7280" stroke-width="3"/>' +
    '<rect x="202" y="253" width="60" height="9" fill="#a8a29e"/>' +
    // petrol generator next to it, exhaust drifting to the manhole
    '<rect x="290" y="212" width="42" height="32" rx="4" fill="#facc15" stroke="#a16207" stroke-width="2"/>' +
    '<text x="311" y="233" font-size="10" text-anchor="middle" fill="#713f12" font-family="sans-serif" font-weight="bold">GEN</text>' +
    '<line x1="292" y1="214" x2="286" y2="204" stroke="#374151" stroke-width="3"/>' +
    '<circle cx="280" cy="198" r="5" fill="#9ca3af" opacity=".7"/>' +
    '<circle cx="268" cy="203" r="7" fill="#9ca3af" opacity=".55"/>' +
    '<circle cx="254" cy="212" r="8" fill="#9ca3af" opacity=".4"/>' +
    // worker smoking
    person(370, 252, { helmet: true, color: '#16a34a' }) +
    '<line x1="377" y1="216" x2="386" y2="216" stroke="#f8fafc" stroke-width="2"/>' +
    '<circle cx="387" cy="216" r="1.8" fill="#f97316"/>' +
    '<path d="M388 212 q4 -5 0 -10 q-4 -5 0 -10" fill="none" stroke="#9ca3af" stroke-width="1.5"/>';

  window.HAZARD_SCENES = [
    {
      id: 'site', icon: '🏗️', title: 'Building site', intro: 'A busy morning on a building site. Find all 6 hazards.',
      svg: site,
      hazards: [
        { x: 108, y: 80, r: 30, title: 'No guardrail on the top platform', fix: 'Fit top rail, mid rail and toe board on every working platform.', ref: 'IS 3696 (Part 1); OSHA 1926.451(g)' },
        { x: 65, y: 132, r: 20, title: 'Worker without a helmet', fix: 'Helmet with chin strap at all times on site.', ref: 'IS 2925; BOCW Central Rules 1998' },
        { x: 180, y: 200, r: 24, title: 'Ladder too flat and not extended above the platform', fix: 'Set it at 4:1 (about 75°), tie it off, and extend it about 1 m above the landing.', ref: 'IS 3696 (Part 2); OSHA 1926.1053' },
        { x: 250, y: 180, r: 26, title: 'Worker standing under a suspended load', fix: 'Barricade the lift zone, use tag lines, and keep everyone clear of the load path.', ref: 'General lifting practice' },
        { x: 298, y: 214, r: 18, title: 'Spoil heaped right at the trench edge', fix: 'Keep spoil and materials at least 0.6 m back from the edge.', ref: 'OSHA 1926.651(j)(2)' },
        { x: 348, y: 246, r: 28, title: 'Open trench with no barricade', fix: 'Hard barricade, warning signs and night lighting around every excavation.', ref: 'IS 3764' }
      ]
    },
    {
      id: 'stp', icon: '🕳️', title: 'STP and sewer works', intro: 'Maintenance day at a sewage treatment plant. Find all 5 hazards.',
      svg: stp,
      hazards: [
        { x: 88, y: 246, r: 30, title: 'Open manhole with no barricade', fix: 'Barricade and sign every open manhole, and put the cover back when not working.', ref: 'General site practice' },
        { x: 168, y: 222, r: 20, title: 'Worker without a helmet', fix: 'Helmet with chin strap at all times on site.', ref: 'IS 2925' },
        { x: 232, y: 226, r: 24, title: 'Entering a manhole without tripod, lifeline or attendant', fix: 'Permit, gas test, harness on a tripod winch, and an attendant at the top the whole time.', ref: 'OSHA 29 CFR 1910.146' },
        { x: 308, y: 222, r: 24, title: 'Petrol generator next to the manhole', fix: 'Keep engines well away and downwind. Exhaust carbon monoxide can collect in the manhole.', ref: 'NIOSH CO guidance' },
        { x: 372, y: 216, r: 22, title: 'Smoking near a sewer', fix: 'No smoking or naked flames. Sewers can hold explosive methane.', ref: 'General confined space practice' }
      ]
    }
  ];
})();
