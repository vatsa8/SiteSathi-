// Fire drill scenarios.
// Step types:
//   choice        a decision: options with ok:true on the right one, and `why` for every option
//   extinguisher  pick an extinguisher: `best` (full marks), `ok` (acceptable), `why` per type
//   pass          fight the fire with the chosen extinguisher (Pull, Aim, Squeeze, Sweep) on scene `scene`
//                 `power` < 1 makes the fire harder to put out
//   evacuate      choose an escape route on map `map`
// Drawings are SVG on a 400 × 300 grid.

(function () {
  // Flames drawn around (0, 0) = centre of the fire's base; the app scales them as the fire grows or shrinks.
  const flame =
    '<path d="M-50 0 C-62 -40 -32 -58 -26 -92 C-10 -62 -2 -72 0 -112 C10 -72 26 -62 30 -96 C42 -60 62 -40 50 0 Z" fill="#ef4444"/>' +
    '<path class="flicker" d="M-36 0 C-42 -30 -20 -44 -15 -66 C-5 -46 5 -52 6 -82 C16 -52 30 -36 36 0 Z" fill="#f97316"/>' +
    '<path class="flicker2" d="M-20 0 C-23 -18 -10 -28 -6 -44 C0 -28 8 -30 10 -50 C16 -28 23 -15 20 0 Z" fill="#facc15"/>';

  // Small extinguisher icon. Band colours follow the common European/UK colour coding; in India most
  // extinguishers are all red, so always read the label.
  const BAND = { water: '#dc2626', foam: '#fde68a', co2: '#111827', dcp: '#2563eb' };
  function extIcon(type) {
    return '<svg viewBox="0 0 60 110" class="ext-icon" aria-hidden="true">' +
      '<path d="M30 14 L48 10" stroke="#374151" stroke-width="4" stroke-linecap="round"/>' +
      '<path d="M24 20 Q6 30 8 60" stroke="#111827" stroke-width="3" fill="none"/>' +
      '<rect x="22" y="12" width="16" height="14" rx="3" fill="#374151"/>' +
      '<rect x="15" y="25" width="30" height="80" rx="9" fill="#dc2626"/>' +
      '<rect x="15" y="48" width="30" height="18" fill="' + BAND[type] + '" stroke="#fff" stroke-width="1"/>' +
      '</svg>';
  }

  const EXTINGUISHERS = [
    { id: 'water', name: 'Water', classes: 'Class A: wood, paper, cloth' },
    { id: 'foam', name: 'Foam (AFFF)', classes: 'Class A and B: solids and flammable liquids' },
    { id: 'co2', name: 'CO₂', classes: 'Class B and electrical equipment' },
    { id: 'dcp', name: 'Dry powder (ABC)', classes: 'Class A, B, C and electrical' }
  ];

  // ── Fire scenes for the Pull–Aim–Squeeze–Sweep step ──
  const SCENES = {
    panel: {
      cx: 270, baseY: 248, sx: 1,
      svg:
        '<rect width="400" height="300" fill="#e5e7eb"/>' +
        '<rect y="250" width="400" height="50" fill="#9ca3af"/>' +
        '<rect x="215" y="70" width="110" height="180" fill="#94a3b8" stroke="#475569" stroke-width="3"/>' +
        '<line x1="270" y1="70" x2="270" y2="250" stroke="#475569" stroke-width="2"/>' +
        '<circle cx="240" cy="90" r="4" fill="#22c55e"/><circle cx="254" cy="90" r="4" fill="#ef4444"/>' +
        '<rect x="226" y="104" width="34" height="22" fill="#e2e8f0" stroke="#475569"/>' +
        '<text x="297" y="96" font-size="11" text-anchor="middle" fill="#1e293b" font-family="sans-serif" font-weight="bold">MCC</text>' +
        '<path d="M290 110 l-8 14 h8 l-6 14" stroke="#facc15" stroke-width="3" fill="none"/>' +
        '<rect x="340" y="190" width="50" height="60" rx="6" fill="#64748b"/><circle cx="365" cy="220" r="16" fill="#475569"/>' +
        '<text x="365" y="268" font-size="9" text-anchor="middle" fill="#334155" font-family="sans-serif">PUMP</text>'
    },
    diesel: {
      cx: 262, baseY: 252, sx: 1.4,
      svg:
        '<rect width="400" height="300" fill="#cfe8f5"/>' +
        '<rect y="250" width="400" height="50" fill="#a8a29e"/>' +
        '<rect x="200" y="130" width="170" height="115" rx="6" fill="#65a30d" stroke="#365314" stroke-width="3"/>' +
        '<text x="285" y="175" font-size="14" text-anchor="middle" fill="#f7fee7" font-family="sans-serif" font-weight="bold">DG SET</text>' +
        '<rect x="340" y="80" width="12" height="52" fill="#57534e"/>' +
        '<rect x="214" y="190" width="60" height="30" fill="#4d7c0f"/>' +
        '<rect x="160" y="222" width="22" height="30" rx="3" fill="#b91c1c"/>' +
        '<text x="171" y="241" font-size="7" text-anchor="middle" fill="#fff" font-family="sans-serif">HSD</text>' +
        '<ellipse cx="262" cy="254" rx="80" ry="9" fill="#1c1917" opacity=".8"/>'
    }
  };

  // ── Evacuation map ──
  const smallFlame = (x, y) => '<g transform="translate(' + x + ' ' + y + ') scale(.35)">' + flame + '</g>';
  const MAPS = {
    office: {
      svg:
        '<rect width="400" height="300" fill="#bbf7d0"/>' +
        '<rect x="20" y="30" width="300" height="240" fill="#f5f5f4" stroke="#57534e" stroke-width="4"/>' +
        // rooms
        '<rect x="20" y="30" width="100" height="90" fill="#fecaca" stroke="#57534e" stroke-width="2"/>' +
        '<text x="70" y="52" font-size="11" text-anchor="middle" fill="#7f1d1d" font-family="sans-serif" font-weight="bold">STORE</text>' +
        smallFlame(70, 112) +
        '<rect x="120" y="30" width="110" height="90" fill="#e7e5e4" stroke="#57534e" stroke-width="2"/>' +
        '<text x="175" y="60" font-size="10" text-anchor="middle" fill="#44403c" font-family="sans-serif">MEETING</text>' +
        '<rect x="230" y="30" width="90" height="90" fill="#e7e5e4" stroke="#57534e" stroke-width="2"/>' +
        '<text x="275" y="60" font-size="10" text-anchor="middle" fill="#44403c" font-family="sans-serif">SITE ENGR.</text>' +
        '<rect x="20" y="170" width="100" height="100" fill="#e7e5e4" stroke="#57534e" stroke-width="2"/>' +
        '<text x="70" y="225" font-size="10" text-anchor="middle" fill="#44403c" font-family="sans-serif">PANTRY</text>' +
        '<rect x="120" y="170" width="200" height="100" fill="#dbeafe" stroke="#57534e" stroke-width="2"/>' +
        '<text x="220" y="262" font-size="10" text-anchor="middle" fill="#1e3a8a" font-family="sans-serif">DRAWING OFFICE</text>' +
        '<rect x="205" y="166" width="30" height="8" fill="#f5f5f4"/>' +
        // smoke in the left corridor
        '<g fill="#57534e" opacity=".55"><circle cx="40" cy="140" r="16"/><circle cx="66" cy="150" r="20"/><circle cx="96" cy="140" r="17"/>' +
        '<circle cx="124" cy="152" r="14"/><circle cx="52" cy="160" r="12"/><circle cx="148" cy="144" r="10"/></g>' +
        // stairs and lift
        '<rect x="24" y="124" width="40" height="42" fill="#d6d3d1" stroke="#57534e"/>' +
        '<path d="M28 158 h8 v-8 h8 v-8 h8 v-8 h8" stroke="#57534e" stroke-width="2" fill="none"/>' +
        '<rect x="168" y="122" width="34" height="30" fill="#cbd5e1" stroke="#57534e"/>' +
        '<text x="185" y="141" font-size="10" text-anchor="middle" fill="#1e293b" font-family="sans-serif" font-weight="bold">LIFT</text>' +
        '<rect x="276" y="124" width="40" height="42" fill="#d6d3d1" stroke="#57534e"/>' +
        '<path d="M280 158 h8 v-8 h8 v-8 h8 v-8 h8" stroke="#57534e" stroke-width="2" fill="none"/>' +
        '<text x="44" y="182" font-size="9" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="bold" paint-order="stroke" stroke="#57534e" stroke-width="3">STAIRS A</text>' +
        '<text x="296" y="182" font-size="9" text-anchor="middle" fill="#fff" font-family="sans-serif" font-weight="bold" paint-order="stroke" stroke="#57534e" stroke-width="3">STAIRS B</text>' +
        // assembly point
        '<circle cx="365" cy="250" r="22" fill="#16a34a"/>' +
        '<path d="M358 262 v-26 l14 6 l-14 6" stroke="#fff" stroke-width="2" fill="#fff"/>' +
        '<text x="365" y="214" font-size="8" text-anchor="middle" fill="#14532d" font-family="sans-serif" font-weight="bold">ASSEMBLY</text>' +
        '<text x="365" y="223" font-size="8" text-anchor="middle" fill="#14532d" font-family="sans-serif" font-weight="bold">POINT</text>',
      you: { x: 220, y: 222 },
      spots: [
        { id: 'stairA', x: 44, y: 145, r: 26, label: 'Stairs A',
          why: 'Stairs A are right next to the burning store and full of smoke. Smoke kills more people in fires than flames do.' },
        { id: 'lift', x: 185, y: 137, r: 22, label: 'Lift',
          why: 'Never use a lift in a fire. The power can fail and trap you, and the shaft can fill with smoke.' },
        { id: 'stairB', x: 296, y: 145, r: 26, label: 'Stairs B', ok: true,
          why: 'Stairs B are away from the fire and clear of smoke. Close doors behind you to slow the fire, then go straight to the assembly point.' }
      ],
      path: 'M220 222 L220 146 L296 146 L340 146 L365 240'
    }
  };

  window.FIRE_ART = { flame: flame, extIcon: extIcon, BAND: BAND, EXTINGUISHERS: EXTINGUISHERS, SCENES: SCENES, MAPS: MAPS };

  window.FIRE_DRILLS = [
    {
      id: 'panel', icon: '⚡', title: 'Panel fire in the pump house', tag: 'Small electrical fire',
      intro: 'You are on your morning round at the STP pump house. You smell burning, and small flames and smoke are coming from the bottom of the MCC panel. Two operators are working nearby.',
      steps: [
        { type: 'choice', q: 'What do you do FIRST?', options: [
          { t: 'Shout "FIRE!", press the nearest fire alarm call point and warn the operators', ok: true, why: 'Always raise the alarm first so everyone is warned and help is on the way.' },
          { t: 'Throw a bucket of water on the panel', why: 'Water conducts electricity. You could be electrocuted.' },
          { t: 'Walk to the site office to inform the safety officer', why: 'That wastes the most important minutes. Raise the alarm on the spot.' },
          { t: 'Take a photo for the incident report', why: 'Never. Every second counts in the first minute of a fire.' }
        ] },
        { type: 'choice', q: 'The fire is still small and your exit is clear behind you. Before tackling it, what should you do if it is safe?', options: [
          { t: 'Switch off and isolate the incoming supply to the panel', ok: true, why: 'Isolating the power removes the heat source and the shock risk. Sometimes the fire dies down on its own.' },
          { t: 'Open the panel door fully to see the fire', why: 'Opening the door feeds fresh oxygen to the fire and it can flare up in your face.' },
          { t: 'Pour sand inside the live panel', why: 'Unsafe on live equipment. Isolate the power and use the right extinguisher.' }
        ] },
        { type: 'extinguisher', q: 'Which extinguisher do you pick up?', best: 'co2', ok: ['dcp'], why: {
          co2: 'CO₂ does not conduct electricity and leaves no residue. It is the best choice for electrical panels.',
          dcp: 'ABC dry powder works on electrical fires, but the powder damages equipment. CO₂ is preferred for panels.',
          water: 'Water conducts electricity: risk of electric shock and short circuit.',
          foam: 'Foam is water-based and conducts electricity. Not for live electrical equipment.'
        } },
        { type: 'pass', scene: 'panel', power: 1 },
        { type: 'choice', q: 'The flames are out. What now?', options: [
          { t: 'Keep watching for re-ignition, keep the power isolated, and report to the supervisor', ok: true, why: 'Hot parts can re-ignite. Do not switch the panel back on until an electrician has inspected it.' },
          { t: 'Switch the power back on to restart the pumps', why: 'A damaged panel can flare up again or short-circuit. Wait for an inspection.' },
          { t: 'Put the used extinguisher back on its stand', why: 'A used extinguisher must be refilled first. Report it so it is replaced at once.' }
        ] }
      ]
    },
    {
      id: 'diesel', icon: '🛢️', title: 'Diesel fire at the DG set', tag: 'Flammable liquid fire',
      intro: 'While the DG set was being refuelled with the engine running, diesel spilled onto the hot exhaust and caught fire. A burning pool is spreading on the floor.',
      steps: [
        { type: 'choice', q: 'What do you do FIRST?', options: [
          { t: 'Raise the alarm and stop the fuel source: shut down the DG set and close the fuel valve if it is safe', ok: true, why: 'Raise the alarm, then cut off the fuel. A fire with no fuel feeding it is much easier to control.' },
          { t: 'Spray it with a water hose', why: 'Water spreads burning diesel and makes the fire bigger.' },
          { t: 'Quickly finish refuelling and move the can away', why: 'Never keep pouring fuel near a fire. Refuelling should only be done with the engine off and cool.' }
        ] },
        { type: 'extinguisher', q: 'Which extinguisher is best for burning diesel?', best: 'foam', ok: ['dcp'], why: {
          foam: 'Foam blankets the burning liquid, cuts off oxygen and stops re-ignition. It is the best choice for Class B liquid fires.',
          dcp: 'Dry powder knocks the flames down fast on Class B fires, but it does not stop re-ignition the way foam does.',
          water: 'A water jet spreads burning diesel and makes the fire worse.',
          co2: 'Outdoors the CO₂ blows away quickly, and the hot engine can re-ignite the diesel. Foam is better.'
        } },
        { type: 'pass', scene: 'diesel', power: 0.7 },
        { type: 'choice', q: 'The fire is out. What next?', options: [
          { t: 'Keep watch, contain the spill with sand or absorbent, keep ignition sources away, and report it', ok: true, why: 'Spilled fuel and the hot engine can re-ignite. Contain and clean the spill before anyone restarts the set.' },
          { t: 'Restart the DG set so the plant has power', why: 'The engine and fuel lines must be checked first. Spilled fuel near a hot exhaust can re-ignite.' },
          { t: 'Hose the leftover diesel into the drain', why: 'Fuel in drains is a fire and explosion risk, and pollution. Use absorbent and dispose of it properly.' }
        ] }
      ]
    },
    {
      id: 'store', icon: '🏢', title: 'Store fire: evacuate the office', tag: 'Large fire · evacuation',
      intro: 'You are in the drawing office on the first floor of the site office building. The material store at the end of the left corridor (paint, thinner, cartons) is burning, and thick black smoke is filling the corridor.',
      steps: [
        { type: 'choice', q: 'The fire is big and spreading fast. What do you do?', options: [
          { t: 'Raise the alarm and evacuate. Do not try to fight it.', ok: true, why: 'Only fight a fire that is small, in its early stage, and with a clear escape route behind you. A spreading thinner fire with thick smoke is a job for the fire brigade.' },
          { t: 'Grab an extinguisher and go to fight it', why: 'This fire is too big. Thinner fires spread fast and the smoke is toxic. You could be trapped.' },
          { t: 'Save your laptop and drawings first', why: 'Never stop to collect belongings. Seconds matter.' },
          { t: 'Stay in the office and wait for instructions', why: 'Waiting lets smoke cut off your escape. Leave as soon as the alarm sounds.' }
        ] },
        { type: 'evacuate', map: 'office', q: 'Tap your escape route out of the building.' },
        { type: 'choice', q: 'You reach the assembly point. What next?', options: [
          { t: 'Report to the fire warden for the headcount and tell them who you saw still inside', ok: true, why: 'The headcount tells the fire brigade if anyone is missing and where to search.' },
          { t: 'Go home, since work has stopped', why: 'If you are not counted, rescuers may risk their lives searching for you.' },
          { t: 'Go back in to get your phone', why: 'Never re-enter a burning building. Nothing is worth your life.' },
          { t: 'Move closer to watch the fire', why: 'Stay at the assembly point, out of the way of fire tenders and away from smoke and explosions.' }
        ] },
        { type: 'choice', q: 'The fire brigade arrives. What do you tell them first?', options: [
          { t: 'Where the fire is, what is burning (thinner, gas cylinders) and whether anyone is missing', ok: true, why: 'Location, hazardous materials and missing people are what the fire officer needs to plan a safe attack and rescue.' },
          { t: 'Who caused the fire', why: 'The investigation comes later. Give them the information they need to fight the fire safely.' },
          { t: 'Nothing. They will work it out.', why: 'They need site knowledge. Hidden gas cylinders or thinner can injure firefighters.' }
        ] }
      ]
    }
  ];
})();
