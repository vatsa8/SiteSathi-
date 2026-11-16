// Site Engineer Daily — main app logic
// All progress is saved in this browser (localStorage). No server needed.
(function () {
  'use strict';

  const STORE_KEY = 'sed_state_v1';
  const QUIZ_SIZE = 5;
  const POINTS_PER_CORRECT = 10;
  const POINTS_PER_HAZARD = 5;

  const DISCIPLINES = [
    { id: 'civil', name: 'Civil', ready: true },
    { id: 'safety', name: 'Safety', ready: true },
    { id: 'mechanical', name: 'Mechanical', ready: false },
    { id: 'electrical', name: 'Electrical', ready: false },
    { id: 'mep', name: 'MEP / Plumbing', ready: false }
  ];

  // Ranks: points needed for each level.
  const LEVELS = [
    [0, 'Trainee'], [100, 'Junior Engineer'], [300, 'Site Engineer'],
    [700, 'Senior Engineer'], [1500, 'Project Manager'], [3000, 'Chief Engineer']
  ];

  const BADGES = [
    { id: 'first', icon: '🪖', name: 'First Shift', desc: 'Finish your first daily quiz' },
    { id: 'perfect', icon: '🎯', name: 'Perfect Pour', desc: 'Score 5/5 in a daily quiz' },
    { id: 'streak3', icon: '🔥', name: 'On a Roll', desc: 'Reach a 3-day streak' },
    { id: 'streak7', icon: '📅', name: 'Week Warrior', desc: 'Reach a 7-day streak' },
    { id: 'order', icon: '🧩', name: 'Sequence Pro', desc: 'Solve a "put in order" question' },
    { id: 'checklist', icon: '✅', name: 'Checklist Champ', desc: 'Complete a checklist' },
    { id: 'allcheck', icon: '🦺', name: 'Safety First', desc: 'Complete every checklist in one day' },
    { id: 'hazard', icon: '🔍', name: 'Hazard Hunter', desc: 'Clear a Spot-the-Hazard scene' },
    { id: 'hawk', icon: '🦅', name: 'Hawk Eye', desc: 'Clear a scene with no wrong taps' },
    { id: 'cards', icon: '📚', name: 'Code Reader', desc: 'Flip every code card' },
    { id: 'fire', icon: '🧯', name: 'Fire Marshal', desc: 'Finish a fire drill with 3 stars' }
  ];

  // ---------- Storage ----------
  function defaultState() {
    return {
      profile: null, sound: true, points: 0, streak: 0, lastQuizDate: null, history: {}, checklists: {},
      badges: {}, scenes: {}, cardsSeen: [], drills: {}
    };
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(defaultState(), JSON.parse(raw));
    } catch (e) { /* storage unavailable: start fresh */ }
    return defaultState();
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  let state = load();
  let view = 'home';       // home | quiz | result | hazards | hazard | learn | checklists | checklist | profile
  let quiz = null;         // current quiz session
  let hz = null;           // current Spot-the-Hazard game
  let activeList = null;   // checklist id being viewed
  let draftDisc = null;    // discipline being picked on onboarding/profile
  let formError = '';
  let learnFilter = 'all';
  const flipped = new Set();

  // ---------- Helpers ----------
  const app = document.getElementById('app');
  const text = (v) => (v && typeof v === 'object') ? (v.en || '') : (v || '');
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function dateKey(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function yesterdayKey() { const d = new Date(); d.setDate(d.getDate() - 1); return dateKey(d); }
  function discName(id) { const d = DISCIPLINES.find((x) => x.id === id); return d ? d.name : id; }
  function greeting() {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  }

  // Streak shown to the user: it is broken if the last quiz was before yesterday.
  function currentStreak() {
    const last = state.lastQuizDate;
    return (last === dateKey() || last === yesterdayKey()) ? state.streak : 0;
  }

  // Deterministic "random" so everyone in a discipline gets the same 5 questions on the same day.
  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function seededRandom(seed) {
    return function () {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function pick(pool, n, rand) {
    const a = pool.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(0, n);
  }

  // ---------- Levels, points, badges ----------
  function levelFor(points) {
    let i = 0;
    while (i < LEVELS.length - 1 && points >= LEVELS[i + 1][0]) i++;
    const next = LEVELS[i + 1];
    return {
      num: i + 1, name: LEVELS[i][1], next: next ? next[0] : null, nextName: next ? next[1] : null,
      pct: next ? Math.round((points - LEVELS[i][0]) / (next[0] - LEVELS[i][0]) * 100) : 100
    };
  }
  function addPoints(n) {
    if (n <= 0) return;
    const before = levelFor(state.points).num;
    state.points += n;
    save();
    const after = levelFor(state.points);
    if (after.num > before) toast('⬆️ Level up! You are now a ' + after.name, true);
  }
  function award(id) {
    if (state.badges[id]) return;
    state.badges[id] = dateKey();
    save();
    const b = BADGES.find((x) => x.id === id);
    toast('🏅 Badge unlocked: ' + b.icon + ' ' + b.name, true);
  }

  // ---------- Effects: sound, vibration, confetti, toasts ----------
  const reduceMotion = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let audioCtx = null;
  function beep(good) {
    if (!state.sound) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = good ? 'sine' : 'triangle';
      o.frequency.setValueAtTime(good ? 660 : 200, now);
      if (good) o.frequency.setValueAtTime(880, now + 0.09);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(0.18, now + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, now + (good ? 0.28 : 0.35));
      o.connect(g); g.connect(audioCtx.destination);
      o.start(now); o.stop(now + 0.4);
    } catch (e) { /* no audio available */ }
  }
  function buzz(good) {
    try { if (navigator.vibrate) navigator.vibrate(good ? 30 : [60, 40, 60]); } catch (e) { /* ignore */ }
  }
  function confetti() {
    if (reduceMotion) return;
    const box = document.createElement('div');
    box.className = 'confetti';
    const colors = ['#ea580c', '#16a34a', '#2563eb', '#eab308', '#db2777'];
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('span');
      s.style.left = (Math.random() * 100) + '%';
      s.style.background = colors[i % colors.length];
      s.style.animationDelay = (Math.random() * 0.4) + 's';
      s.style.animationDuration = (1.6 + Math.random() * 1.2) + 's';
      s.style.transform = 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 3200);
  }
  // Toasts show one after another so several unlocks don't overlap.
  const toastQueue = [];
  let toastBusy = false;
  function toast(msg, celebrate) {
    toastQueue.push({ msg: msg, celebrate: !!celebrate });
    if (!toastBusy) nextToast();
  }
  function nextToast() {
    const t = toastQueue.shift();
    if (!t) { toastBusy = false; return; }
    toastBusy = true;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = t.msg;
    document.body.appendChild(el);
    if (t.celebrate) { confetti(); beep(true); }
    setTimeout(() => { el.remove(); nextToast(); }, 1900);
  }
  // Animate numbers marked with data-count-to.
  function animateCounts() {
    app.querySelectorAll('[data-count-to]').forEach((el) => {
      const to = Number(el.dataset.countTo);
      const prefix = el.dataset.prefix || '';
      if (reduceMotion || to <= 0) { el.textContent = prefix + to; return; }
      const start = performance.now();
      (function step(now) {
        const p = Math.min(1, (now - start) / 700);
        el.textContent = prefix + Math.round(to * p);
        if (p < 1) requestAnimationFrame(step);
      })(start);
    });
  }

  // ---------- Quiz ----------
  // Prepare a question for display: shuffle options (multiple choice) or steps (order).
  function prepare(q, rand) {
    if (q.type === 'order') {
      const display = pick(q.items.map((_, i) => i), q.items.length, rand);
      if (display.every((v, i) => v === i)) display.push(display.shift()); // never show it already solved
      return Object.assign({}, q, { display: display });
    }
    if (q.options.length === 2) return q;  // True/False keeps its order
    const order = pick(q.options.map((_, i) => i), q.options.length, rand);
    return Object.assign({}, q, { options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) });
  }
  function current() { return quiz.qs[quiz.i]; }

  function startQuiz(practice) {
    const disc = state.profile.discipline;
    const pool = window.QUESTIONS.filter((q) => q.discipline === disc);
    const rand = practice ? Math.random : seededRandom(hash(dateKey() + '|' + disc));
    const qs = pick(pool, Math.min(QUIZ_SIZE, pool.length), rand).map((q) => prepare(q, rand));
    quiz = { qs: qs, i: 0, answered: false, right: false, chosen: null, picked: [], correct: 0, practice: practice };
    view = 'quiz';
    render();
  }
  function settle(right) {
    quiz.answered = true;
    quiz.right = right;
    if (right) quiz.correct++;
    beep(right); buzz(right);
    render();
    if (right && current().type === 'order') award('order');
  }
  function answer(idx) {
    if (!quiz || quiz.answered || current().type === 'order') return;
    quiz.chosen = idx;
    settle(idx === current().answer);
  }
  function pickStep(idx) {
    if (quiz.answered || quiz.picked.includes(idx)) return;
    quiz.picked.push(idx);
    render();
  }
  function unpickStep(pos) {
    if (quiz.answered) return;
    quiz.picked.splice(pos, 1);
    render();
  }
  function checkOrder() {
    const q = current();
    if (quiz.answered || quiz.picked.length !== q.items.length) return;
    quiz.chosen = 'order';
    settle(quiz.picked.every((v, i) => v === i));
  }
  function nextQuestion() {
    if (quiz.i < quiz.qs.length - 1) {
      quiz.i++; quiz.answered = false; quiz.right = false; quiz.chosen = null; quiz.picked = [];
      render(); window.scrollTo(0, 0);
      return;
    }
    finishQuiz();
  }
  function finishQuiz() {
    const today = dateKey();
    const n = quiz.qs.length;
    quiz.done = true;
    quiz.earned = 0;
    const counts = !quiz.practice && state.lastQuizDate !== today;
    if (counts) {
      quiz.earned = quiz.correct * POINTS_PER_CORRECT;
      state.streak = (state.lastQuizDate === yesterdayKey()) ? state.streak + 1 : 1;
      state.lastQuizDate = today;
      state.history[today] = { score: quiz.correct, total: n };
      save();
    }
    view = 'result';
    render();
    if (quiz.correct === n && n > 0) confetti();
    if (counts) {
      addPoints(quiz.earned);
      award('first');
      if (quiz.correct === n) award('perfect');
      if (state.streak >= 3) award('streak3');
      if (state.streak >= 7) award('streak7');
    }
  }

  // ---------- Spot the Hazard ----------
  function scene() { return window.HAZARD_SCENES.find((s) => s.id === hz.id); }
  function startScene(id) {
    hz = { id: id, found: [], misses: [], done: false, revealed: false };
    view = 'hazard';
    render(); window.scrollTo(0, 0);
  }
  function sceneTap(svg, e) {
    if (!hz || hz.done) return;
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const s = scene();
    const near = (h) => Math.hypot(h.x - p.x, h.y - p.y) <= h.r + 6;  // a little forgiving for fingers
    const idx = s.hazards.findIndex((h, i) => !hz.found.includes(i) && near(h));
    if (idx >= 0) {
      hz.found.push(idx);
      beep(true); buzz(true);
      if (hz.found.length === s.hazards.length) completeScene();
      else render();
      return;
    }
    if (s.hazards.some(near)) return;  // tapped an already-found hazard: ignore
    hz.misses.push({ x: p.x, y: p.y, t: Date.now() });
    beep(false); buzz(false);
    render();
  }
  function completeScene() {
    const s = scene();
    hz.done = true;
    const prev = state.scenes[s.id];
    const firstClear = !prev;
    state.scenes[s.id] = { cleared: prev ? prev.cleared : dateKey(), bestMisses: prev ? Math.min(prev.bestMisses, hz.misses.length) : hz.misses.length };
    save();
    hz.earned = firstClear ? s.hazards.length * POINTS_PER_HAZARD : 0;
    render();
    confetti();
    addPoints(hz.earned);
    award('hazard');
    if (hz.misses.length === 0) award('hawk');
  }
  function revealScene() {
    if (!hz || hz.done) return;
    hz.done = true; hz.revealed = true;
    render();
  }

  // ---------- Fire drill ----------
  let dr = null;       // current drill session
  let passRAF = 0;     // animation loop for the fire-fighting step
  function drill() { return window.FIRE_DRILLS.find((d) => d.id === dr.id); }
  function drillStep() { return drill().steps[dr.step]; }
  function fmtTime(ms) { const s = Math.round(ms / 1000); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function starStr(n) { return '★'.repeat(n) + '☆'.repeat(3 - n); }

  function startDrill(id) {
    dr = { id: id, step: 0, tried: [], solved: false, mistakes: [], notes: [], ext: null, start: Date.now(), done: false, pass: null };
    view = 'drill';
    render(); window.scrollTo(0, 0);
  }
  function addMistake(why) { dr.mistakes.push(why); }
  function drillChoose(i) {
    const st = drillStep();
    if (dr.solved || dr.tried.includes(i)) return;
    dr.tried.push(i);
    if (st.options[i].ok) { dr.solved = true; beep(true); buzz(true); }
    else { addMistake(st.options[i].why); beep(false); buzz(false); }
    render();
  }
  function drillExt(id) {
    const st = drillStep();
    if (dr.solved || dr.tried.includes(id)) return;
    dr.tried.push(id);
    if (id === st.best || st.ok.includes(id)) {
      dr.solved = true; dr.ext = id;
      if (id !== st.best) dr.notes.push(st.why[id]);
      beep(true); buzz(true);
    } else { addMistake(st.why[id]); beep(false); buzz(false); }
    render();
  }
  function mapTap(svg, e) {
    const st = drillStep();
    if (dr.solved) return;
    const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const map = window.FIRE_ART.MAPS[st.map];
    const spot = map.spots.find((s) => Math.hypot(s.x - p.x, s.y - p.y) <= s.r + 8);
    if (!spot || dr.tried.includes(spot.id)) return;
    dr.tried.push(spot.id);
    if (spot.ok) { dr.solved = true; beep(true); buzz(true); }
    else { addMistake(spot.why); beep(false); buzz(false); }
    render();
  }
  function drillNext() {
    if (!dr.solved) return;
    dr.step++; dr.tried = []; dr.solved = false;
    if (dr.step >= drill().steps.length) { finishDrill(); return; }
    if (drillStep().type === 'pass') dr.pass = { phase: 'pull', hp: 1, charge: 1, aimMistake: false };
    render(); window.scrollTo(0, 0);
  }
  function finishDrill() {
    const d = drill();
    dr.done = true;
    dr.time = Date.now() - dr.start;
    dr.stars = dr.mistakes.length === 0 ? 3 : dr.mistakes.length <= 2 ? 2 : 1;
    const prev = state.drills[d.id];
    dr.earned = prev ? 0 : dr.stars * 10;
    state.drills[d.id] = {
      stars: Math.max(prev ? prev.stars : 0, dr.stars),
      bestTime: prev ? Math.min(prev.bestTime, dr.time) : dr.time
    };
    save();
    render(); window.scrollTo(0, 0);
    if (dr.stars === 3) confetti();
    addPoints(dr.earned);
    if (dr.stars === 3) award('fire');
  }

  // Fire fighting: Pull the pin, Aim at the base, Squeeze and Sweep. Runs an animation loop on the scene.
  function setupPass() {
    if (view !== 'drill' || !dr || dr.done) return;
    const st = drillStep();
    if (st.type !== 'pass' || !['pull', 'aim', 'spray'].includes(dr.pass.phase)) return;
    const svg = document.getElementById('pass-svg');
    if (!svg) return;
    const sc = window.FIRE_ART.SCENES[st.scene];
    const P = dr.pass;
    const flames = svg.querySelector('#flames');
    const smoke = svg.querySelector('#smoke');
    const spray = svg.querySelector('#spray');
    const hpBar = document.getElementById('hp-bar');
    const chBar = document.getElementById('charge-bar');
    const hint = document.getElementById('pass-hint');
    const PIN = { x: 94, y: 158 };
    const halfW = 58 * sc.sx;
    const inBase = (q) => Math.abs(q.x - sc.cx) <= halfW && q.y >= sc.baseY - 45 && q.y <= sc.baseY + 22;
    const onFlames = (q) => Math.abs(q.x - sc.cx) <= halfW && q.y < sc.baseY - 45 && q.y > sc.baseY - 140;
    const toSvg = (e) => { const pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY; return pt.matrixTransform(svg.getScreenCTM().inverse()); };
    const setHint = (t, bad) => { hint.textContent = t; hint.className = 'pass-hint' + (bad ? ' bad' : ''); };
    let pressed = false, last = null, lastT = performance.now();

    function draw() {
      const s = 0.12 + 0.88 * Math.max(0, P.hp);
      flames.setAttribute('transform', 'translate(' + sc.cx + ' ' + sc.baseY + ') scale(' + (sc.sx * s).toFixed(3) + ' ' + s.toFixed(3) + ')');
      smoke.setAttribute('opacity', (0.1 + 0.6 * Math.max(0, P.hp)).toFixed(2));
      hpBar.style.width = Math.max(0, P.hp * 100).toFixed(1) + '%';
      chBar.style.width = Math.max(0, P.charge * 100).toFixed(1) + '%';
    }
    svg.onpointerdown = (e) => {
      const q = toSvg(e);
      if (P.phase === 'pull') {
        if (Math.hypot(q.x - PIN.x, q.y - PIN.y) <= 24) { P.phase = 'aim'; beep(true); render(); }
        else setHint('First pull the pin: tap the yellow ring on the extinguisher.', true);
        return;
      }
      if (P.phase === 'aim') {
        if (inBase(q)) { P.phase = 'spray'; beep(true); render(); }
        else if (onFlames(q)) {
          if (!P.aimMistake) { P.aimMistake = true; addMistake('Aim at the base of the fire, not the flames. Spraying the flames does not put out the burning fuel underneath.'); }
          beep(false); buzz(false);
          setHint('Too high! Aim at the BASE of the fire, where the fuel is burning.', true);
        } else setHint('Tap the base of the fire to aim.', true);
        return;
      }
      if (P.phase === 'spray') {
        e.preventDefault();
        pressed = true; last = q;
        try { svg.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        spray.setAttribute('x2', q.x); spray.setAttribute('y2', q.y);
        spray.style.display = '';
      }
    };
    svg.onpointermove = (e) => {
      if (!pressed) return;
      const q = toSvg(e);
      if (inBase(q) && inBase(last)) P.hp -= Math.abs(q.x - last.x) * 0.0011 * st.power;
      if (q.y < sc.baseY - 50) setHint('Aim lower, at the base of the fire!', true);
      else setHint('Good! Keep sweeping side to side.', false);
      last = q;
      spray.setAttribute('x2', q.x); spray.setAttribute('y2', q.y);
    };
    svg.onpointerup = svg.onpointercancel = () => { pressed = false; spray.style.display = 'none'; };

    function tick(now) {
      const dt = Math.min(0.1, (now - lastT) / 1000);
      lastT = now;
      if (P.phase === 'spray') {
        if (pressed) {
          P.charge -= dt * 0.11;                                   // about 9 seconds of spray
          if (last && inBase(last)) P.hp -= dt * 0.05 * st.power;  // holding still helps a little
        } else if (P.hp > 0) {
          P.hp = Math.min(1, P.hp + dt * 0.07);                    // fire grows back if you stop
        }
        draw();
        if (P.hp <= 0) {
          P.hp = 0; P.phase = 'out'; dr.solved = true;
          confetti(); beep(true); buzz(true); render();
          return;
        }
        if (P.charge <= 0) {
          P.charge = 0; P.phase = 'empty'; dr.solved = true;
          addMistake('The extinguisher ran out before the fire was out. Sweep fast across the base. If a fire is not going out, leave, close the door and evacuate.');
          beep(false); buzz(false); render();
          return;
        }
      }
      passRAF = requestAnimationFrame(tick);
    }
    draw();
    passRAF = requestAnimationFrame(tick);
  }

  // Update the drill clock every half second.
  setInterval(() => {
    const el = document.getElementById('drill-time');
    if (el && dr && !dr.done) el.textContent = fmtTime(Date.now() - dr.start);
  }, 500);

  // ---------- Checklists ----------
  function checkedFor(listId) {
    const day = state.checklists[dateKey()] || {};
    return day[listId] || [];
  }
  function isComplete(c) { return checkedFor(c.id).length === c.items.length; }
  function toggleItem(listId, idx) {
    const today = dateKey();
    const list = window.CHECKLISTS.find((x) => x.id === listId);
    const wasComplete = isComplete(list);
    // Keep only today's checklist data so storage doesn't grow forever.
    state.checklists = { [today]: state.checklists[today] || {} };
    const cur = state.checklists[today][listId] || [];
    state.checklists[today][listId] = cur.includes(idx) ? cur.filter((i) => i !== idx) : cur.concat(idx);
    save();
    render();
    if (!wasComplete && isComplete(list)) {
      buzz(true);
      toast('✅ ' + text(list.title) + ' checklist complete', true);
      award('checklist');
      if (window.CHECKLISTS.every(isComplete)) award('allcheck');
    }
  }

  // ---------- Learn ----------
  function flipCard(code) {
    if (flipped.has(code)) flipped.delete(code); else flipped.add(code);
    if (!state.cardsSeen.includes(code)) { state.cardsSeen.push(code); save(); }
    render();
    if (window.CODE_CARDS.every((c) => state.cardsSeen.includes(c.code))) award('cards');
  }

  // ---------- Views ----------
  function header() {
    const lv = state.profile ? levelFor(state.points) : null;
    return '<div class="stripe"></div><div class="header"><div class="brand">Site Engineer Daily<small>Learn · Play · Stay safe on site</small></div>' +
      (lv ? '<button class="rank-chip" data-action="nav" data-view="profile" title="Your profile">🪖 <span>Lv ' + lv.num + '</span></button>' : '') +
      '</div>';
  }

  function nav() {
    const tabs = [
      ['home', '🏠', 'Home'], ['quiz', '❓', 'Quiz'], ['hazards', '🎮', 'Play'], ['learn', '📚', 'Learn'], ['checklists', '✅', 'Checklist']
    ];
    const map = { result: 'quiz', hazard: 'hazards', drill: 'hazards', checklist: 'checklists' };
    const activeTab = map[view] || view;
    return '<nav class="nav"><div class="nav-inner">' + tabs.map((t) =>
      '<button data-action="nav" data-view="' + t[0] + '" class="' + (activeTab === t[0] ? 'active' : '') + '"><span class="ni">' + t[1] + '</span>' + t[2] + '</button>'
    ).join('') + '</div></nav>';
  }

  function discPicker() {
    return '<div class="disc-grid">' + DISCIPLINES.map((d) =>
      '<button class="disc' + (draftDisc === d.id ? ' selected' : '') + '" data-action="pick-disc" data-disc="' + d.id + '"' + (d.ready ? '' : ' disabled') + '>' +
      esc(d.name) + (d.ready ? '' : '<small>Coming soon</small>') + '</button>'
    ).join('') + '</div>';
  }

  function rankCard() {
    const lv = levelFor(state.points);
    return '<div class="card rank-card"><div class="rank-top"><div class="rank-badge">🪖<b>' + lv.num + '</b></div>' +
      '<div class="grow"><div class="rank-name">' + esc(lv.name) + '</div>' +
      '<div class="muted">' + (lv.next ? (lv.next - state.points) + ' points to ' + esc(lv.nextName) : 'Top rank reached!') + '</div></div></div>' +
      '<div class="bar xp"><div style="width:' + lv.pct + '%"></div></div></div>';
  }

  function viewOnboarding() {
    return header() +
      '<div class="card hero"><div class="hero-art">👷‍♂️🏗️🦺</div><h2>Welcome to site</h2>' +
      '<p class="muted">Answer 5 questions a day, spot hazards in site scenes, learn your codes, and climb from Trainee to Chief Engineer.</p>' +
      '<label for="name">Your name</label><input id="name" type="text" maxlength="40" autocomplete="name">' +
      '<label>Your discipline</label>' + discPicker() +
      (formError ? '<div class="error">' + esc(formError) + '</div>' : '') +
      '<button class="btn" data-action="save-profile">Get started</button></div>';
  }

  function viewHome() {
    const doneToday = state.lastQuizDate === dateKey();
    const h = state.history[dateKey()];
    const lists = window.CHECKLISTS;
    const listsDone = lists.filter(isComplete).length;
    const scenes = window.HAZARD_SCENES;
    const cleared = scenes.filter((s) => state.scenes[s.id]).length;
    const tipQ = window.QUESTIONS[hash('tip|' + dateKey()) % window.QUESTIONS.length];
    const badgeCount = Object.keys(state.badges).length;
    return header() +
      '<div class="greet"><h2>' + greeting() + ', ' + esc(state.profile.name) + ' 👋</h2><span class="muted">' + esc(discName(state.profile.discipline)) + ' engineer</span></div>' +
      rankCard() +
      '<div class="stats three"><div class="card stat"><div class="num"><span class="flame' + (currentStreak() ? ' on' : '') + '">🔥</span>' + currentStreak() + '</div><div class="muted">Streak</div></div>' +
      '<div class="card stat"><div class="num">' + state.points + '</div><div class="muted">Points</div></div>' +
      '<button class="card stat" data-action="nav" data-view="profile"><div class="num">' + badgeCount + '</div><div class="muted">Badges</div></button></div>' +
      '<div class="card action-card' + (doneToday ? '' : ' glow') + '"><div class="ac-icon">❓</div><div class="grow"><h3>Today\'s quiz</h3>' +
      (doneToday
        ? '<p class="muted">Done: <b>' + h.score + '/' + h.total + '</b>. Come back tomorrow!</p></div><button class="btn small secondary" data-action="practice">Practice</button></div>'
        : '<p class="muted">' + QUIZ_SIZE + ' ' + esc(discName(state.profile.discipline)) + ' questions waiting · +' + POINTS_PER_CORRECT + ' each</p></div><button class="btn small" data-action="start">Start</button></div>') +
      '<div class="card action-card fire-card"><div class="ac-icon">🧯</div><div class="grow"><h3>Fire drill</h3><p class="muted">' +
      window.FIRE_DRILLS.filter((d) => state.drills[d.id]).length + ' of ' + window.FIRE_DRILLS.length + ' drills done. Could you handle a real fire?</p></div>' +
      '<button class="btn small" data-action="nav" data-view="hazards">Drill</button></div>' +
      '<div class="card action-card"><div class="ac-icon">🔍</div><div class="grow"><h3>Spot the Hazard</h3><p class="muted">' + cleared + ' of ' + scenes.length + ' scenes cleared. Tap the dangers in the picture.</p></div>' +
      '<button class="btn small" data-action="nav" data-view="hazards">Play</button></div>' +
      '<div class="card tip-card"><div class="tip-label">💡 Did you know?</div><p>' + esc(text(tipQ.explain)) + '</p><div class="ref">' + esc(tipQ.ref) + '</div></div>' +
      '<div class="card action-card"><div class="ac-icon">✅</div><div class="grow"><h3>Daily checklists</h3>' +
      '<div class="bar"><div style="width:' + Math.round(listsDone / lists.length * 100) + '%"></div></div>' +
      '<p class="muted">' + listsDone + ' of ' + lists.length + ' complete today</p></div>' +
      '<button class="btn small secondary" data-action="nav" data-view="checklists">Open</button></div>';
  }

  function viewQuizIntro() {
    const doneToday = state.lastQuizDate === dateKey();
    return header() + '<div class="card"><h2>Daily quiz</h2>' +
      (doneToday
        ? '<p>You have finished today\'s quiz. Come back tomorrow to keep your streak!</p><button class="btn secondary" data-action="practice">Practice (no points)</button>'
        : '<p class="muted">' + QUIZ_SIZE + ' questions · ' + POINTS_PER_CORRECT + ' points per correct answer.</p><button class="btn" data-action="start">Start</button>') +
      '</div>';
  }

  function mcqBody(q) {
    let html = '';
    q.options.forEach((opt, i) => {
      let cls = 'option';
      if (quiz.answered) {
        if (i === q.answer) cls += ' correct' + (quiz.chosen === i ? ' pop' : '');
        else if (i === quiz.chosen) cls += ' wrong shake';
        else cls += ' dim';
      }
      html += '<button class="' + cls + '" data-action="answer" data-idx="' + i + '"' + (quiz.answered ? ' disabled' : '') + '>' +
        '<span class="key">' + (i + 1) + '</span><span>' + esc(text(opt)) + '</span></button>';
    });
    return html;
  }

  function orderBody(q) {
    const n = q.items.length;
    let html = '<p class="muted hint">Tap the steps in the correct order. Tap a placed step to take it back.</p><div class="order-picked">';
    for (let pos = 0; pos < n; pos++) {
      const it = quiz.picked[pos];
      if (it === undefined) {
        html += '<div class="order-slot empty"><span class="num">' + (pos + 1) + '</span></div>';
      } else {
        let cls = 'order-slot filled';
        if (quiz.answered) cls += it === pos ? ' correct' : ' wrong shake';
        html += '<button class="' + cls + '" data-action="unpick" data-pos="' + pos + '"' + (quiz.answered ? ' disabled' : '') + '>' +
          '<span class="num">' + (pos + 1) + '</span><span>' + esc(text(q.items[it])) + '</span></button>';
      }
    }
    html += '</div>';
    if (!quiz.answered) {
      html += '<div class="order-pool">' + q.display.filter((i) => !quiz.picked.includes(i)).map((i) =>
        '<button class="chip" data-action="pick-step" data-idx="' + i + '">' + esc(text(q.items[i])) + '</button>').join('') + '</div>';
      if (quiz.picked.length === n) html += '<button class="btn" data-action="check-order">Check order</button>';
    }
    return html;
  }

  function viewQuiz() {
    const q = current();
    const pct = Math.round(((quiz.i + (quiz.answered ? 1 : 0)) / quiz.qs.length) * 100);
    let html = header() + '<div class="card">' +
      (quiz.practice ? '<div class="practice-note">Practice mode: no points</div>' : '') +
      '<div class="progress"><div style="width:' + pct + '%"></div></div>' +
      '<div class="q-meta"><span class="muted">Question ' + (quiz.i + 1) + ' of ' + quiz.qs.length + '</span>' +
      '<span class="muted">✔ ' + quiz.correct + '</span></div>' +
      '<span class="topic">' + esc(q.topic) + (q.type === 'order' ? ' · Order' : (q.options.length === 2 ? ' · True/False' : '')) + '</span>' +
      '<div class="question">' + esc(text(q.q)) + '</div>' +
      (q.type === 'order' ? orderBody(q) : mcqBody(q));

    if (quiz.answered) {
      html += '<div class="feedback"><div class="verdict ' + (quiz.right ? 'good' : 'bad') + '">' +
        (quiz.right ? '✔ Correct!' + (quiz.practice ? '' : ' +' + POINTS_PER_CORRECT) : '✘ Not quite') + '</div>';
      if (q.type === 'order' && !quiz.right) {
        html += '<div class="ref"><b>Correct order:</b><ol class="order-answer">' + q.items.map((it) => '<li>' + esc(text(it)) + '</li>').join('') + '</ol></div>';
      }
      html += '<p>' + esc(text(q.explain)) + '</p>' +
        '<div class="ref"><b>Reference:</b> ' + esc(q.ref) + '</div>' +
        (q.verified ? '' : '<div class="unverified">⚠ Reference pending expert verification</div>') +
        '</div>' +
        '<button class="btn" data-action="next">' + (quiz.i < quiz.qs.length - 1 ? 'Next' : 'See result') + '</button>';
    }
    return html + '</div>';
  }

  function viewResult() {
    const n = quiz.qs.length;
    const msg = quiz.correct === n ? 'Perfect score! 🎉'
      : quiz.correct >= n - 1 ? 'Great work! 💪'
      : quiz.correct >= Math.ceil(n / 2) ? 'Good effort. Read the explanations and try practice mode.'
      : 'Keep going. Every day you learn something new on site.';
    return header() + '<div class="card result-card"><h2>Result</h2>' +
      '<div class="stat"><div class="num">' + quiz.correct + ' / ' + n + '</div></div>' +
      '<p class="big-msg">' + msg + '</p>' +
      (quiz.practice
        ? '<p class="muted center">Practice mode: no points.</p>'
        : '<p class="center">Points earned: <b data-count-to="' + quiz.earned + '" data-prefix="+">+' + quiz.earned + '</b> · Streak: <b>🔥 ' + currentStreak() + '</b></p>') +
      '<button class="btn" data-action="nav" data-view="hazards">Play Spot the Hazard 🔍</button>' +
      '<button class="btn secondary" data-action="practice">Practice again</button>' +
      '<button class="btn secondary" data-action="nav" data-view="home">Back to home</button></div>';
  }

  function viewHazards() {
    return header() + '<h2>🎮 Play</h2>' +
      '<h3 class="section">🧯 Fire drills</h3><p class="muted">Handle a real fire emergency step by step: raise the alarm, pick the right extinguisher, fight the fire, or get out safely. Up to 30 points per drill.</p>' +
      window.FIRE_DRILLS.map((d) => {
        const rec = state.drills[d.id];
        return '<button class="list-row drill-row' + (rec ? ' complete' : '') + '" data-action="open-drill" data-drill="' + d.id + '">' +
          '<span class="icon">' + d.icon + '</span><span class="grow"><b>' + esc(d.title) + '</b><br><span class="muted">' + esc(d.tag) +
          (rec ? ' · <span class="stars">' + starStr(rec.stars) + '</span> · best ' + fmtTime(rec.bestTime) : '') + '</span></span>' +
          '<span class="count">▶</span></button>';
      }).join('') +
      '<h3 class="section">🔍 Spot the Hazard</h3><p class="muted">Look closely at each site scene and tap every hazard you can see. ' +
      'Clear a scene for the first time to earn ' + POINTS_PER_HAZARD + ' points per hazard.</p>' +
      window.HAZARD_SCENES.map((s) => {
        const rec = state.scenes[s.id];
        return '<button class="list-row scene-row' + (rec ? ' complete' : '') + '" data-action="open-scene" data-scene="' + s.id + '">' +
          '<span class="scene-thumb"><svg viewBox="0 0 400 300">' + s.svg + '</svg></span>' +
          '<span class="grow"><b>' + s.icon + ' ' + esc(s.title) + '</b><br><span class="muted">' + s.hazards.length + ' hazards' +
          (rec ? ' · ✔ cleared' + (rec.bestMisses === 0 ? ' perfectly' : ' (best: ' + rec.bestMisses + ' wrong taps)') : '') + '</span></span>' +
          '<span class="count">▶</span></button>';
      }).join('');
  }

  function viewHazard() {
    const s = scene();
    const total = s.hazards.length;
    let marks = '';
    s.hazards.forEach((h, i) => {
      const order = hz.found.indexOf(i);
      if (order >= 0) {
        marks += '<g class="hz-found"><circle cx="' + h.x + '" cy="' + h.y + '" r="' + h.r + '"/>' +
          '<circle class="hz-dot" cx="' + (h.x + h.r * 0.7) + '" cy="' + (h.y - h.r * 0.7) + '" r="9"/>' +
          '<text x="' + (h.x + h.r * 0.7) + '" y="' + (h.y - h.r * 0.7 + 4) + '">' + (order + 1) + '</text></g>';
      } else if (hz.revealed) {
        marks += '<g class="hz-missed"><circle cx="' + h.x + '" cy="' + h.y + '" r="' + h.r + '"/></g>';
      }
    });
    hz.misses.slice(-3).forEach((m) => {
      if (Date.now() - m.t > 1200) return;
      marks += '<g class="hz-miss"><line x1="' + (m.x - 7) + '" y1="' + (m.y - 7) + '" x2="' + (m.x + 7) + '" y2="' + (m.y + 7) + '"/>' +
        '<line x1="' + (m.x + 7) + '" y1="' + (m.y - 7) + '" x2="' + (m.x - 7) + '" y2="' + (m.y + 7) + '"/></g>';
    });

    let html = header() + '<div class="card">' +
      '<h2>' + s.icon + ' ' + esc(s.title) + '</h2><p class="muted hint">' + esc(s.intro) + '</p>' +
      '<div class="hz-status"><span>Found <b>' + hz.found.length + '</b> / ' + total + '</span><span class="hz-pips">' +
      s.hazards.map((_, i) => '<i class="' + (i < hz.found.length ? 'on' : '') + '"></i>').join('') + '</span>' +
      '<span class="muted">✘ ' + hz.misses.length + '</span></div>' +
      '<svg class="scene' + (hz.done ? ' done' : '') + '" viewBox="0 0 400 300" data-action="scene-tap" role="img" aria-label="' + esc(s.title) + ' scene">' + s.svg + marks + '</svg>';

    if (hz.done && !hz.revealed) {
      html += '<div class="feedback"><div class="verdict good">🎉 Scene cleared!' + (hz.earned ? ' +' + hz.earned + ' points' : '') + '</div>' +
        '<p class="muted">' + (hz.misses.length === 0 ? 'No wrong taps. Sharp eyes!' : hz.misses.length + ' wrong tap' + (hz.misses.length > 1 ? 's' : '') + '.') +
        (hz.earned ? '' : ' Points are only given the first time you clear a scene.') + '</p></div>';
    } else if (hz.revealed) {
      html += '<div class="feedback"><div class="verdict bad">Hazards you missed are circled in red.</div><p class="muted">Play again to clear the scene and earn points.</p></div>';
    }

    // Found (and revealed) hazards with the fix
    const listed = hz.found.concat(hz.revealed ? s.hazards.map((_, i) => i).filter((i) => !hz.found.includes(i)) : []);
    if (listed.length) {
      html += '<div class="hz-list">' + listed.map((i, k) => {
        const h = s.hazards[i];
        const miss = k >= hz.found.length;
        return '<div class="hz-item' + (miss ? ' missed' : '') + '"><span class="num">' + (miss ? '!' : k + 1) + '</span><div><b>' + esc(h.title) + '</b>' +
          '<div>✔ ' + esc(h.fix) + '</div><div class="ref">' + esc(h.ref) + '</div></div></div>';
      }).join('') + '</div>';
    }

    html += hz.done
      ? '<button class="btn" data-action="open-scene" data-scene="' + s.id + '">Play again</button><button class="btn secondary" data-action="nav" data-view="hazards">All scenes</button>'
      : '<button class="btn secondary" data-action="reveal">I give up: show the hazards</button>';
    return html + '</div>';
  }

  function drillChoiceBody(st) {
    return st.options.map((o, i) => {
      const tried = dr.tried.includes(i);
      let cls = 'option';
      if (tried) cls += o.ok ? ' correct pop' : ' wrong shake';
      else if (dr.solved) cls += ' dim';
      return '<button class="' + cls + '" data-action="drill-choose" data-idx="' + i + '"' + (tried || dr.solved ? ' disabled' : '') + '>' +
        '<span class="key">' + String.fromCharCode(65 + i) + '</span><span>' + esc(o.t) +
        (tried ? '<small class="why">' + (o.ok ? '✔ ' : '✘ ') + esc(o.why) + '</small>' : '') + '</span></button>';
    }).join('');
  }

  function drillExtBody(st) {
    return '<div class="ext-grid">' + window.FIRE_ART.EXTINGUISHERS.map((x) => {
      const tried = dr.tried.includes(x.id);
      const good = x.id === st.best || st.ok.includes(x.id);
      let cls = 'ext-card';
      if (tried) cls += x.id === st.best ? ' correct pop' : good ? ' okay pop' : ' wrong shake';
      else if (dr.solved) cls += ' dim';
      return '<button class="' + cls + '" data-action="drill-ext" data-ext="' + x.id + '"' + (tried || dr.solved ? ' disabled' : '') + '>' +
        window.FIRE_ART.extIcon(x.id) + '<b>' + esc(x.name) + '</b><small>' + esc(x.classes) + '</small></button>';
    }).join('') + '</div>' +
      dr.tried.map((id) => {
        const good = id === st.best || st.ok.includes(id);
        const name = window.FIRE_ART.EXTINGUISHERS.find((x) => x.id === id).name;
        return '<div class="drill-note ' + (id === st.best ? 'good' : good ? 'okay' : 'bad') + '"><b>' + esc(name) + ':</b> ' +
          (id === st.best ? 'Best choice. ' : good ? 'Acceptable, but not the best. ' : 'Wrong choice. ') + esc(st.why[id]) + '</div>';
      }).join('');
  }

  function drillPassBody(st) {
    const sc = window.FIRE_ART.SCENES[st.scene];
    const P = dr.pass;
    const ext = dr.ext || 'dcp';
    const band = window.FIRE_ART.BAND[ext];
    const label = { water: 'WATER', foam: 'FOAM', co2: 'CO₂', dcp: 'ABC' }[ext];
    const sprayColor = { co2: '#f8fafc', dcp: '#e0e7ff', foam: '#fef3c7', water: '#93c5fd' }[ext];
    const s = 0.12 + 0.88 * Math.max(0, P.hp);
    const out = P.phase === 'out';
    const phaseIdx = { pull: 0, aim: 1, spray: 2, out: 3, empty: 3 }[P.phase];
    const hints = {
      pull: 'P: Pull the pin. Tap the yellow ring on the extinguisher.',
      aim: 'A: Aim at the base of the fire. Tap where you will aim.',
      spray: 'S + S: Press and hold on the base of the fire, then sweep side to side.',
      out: '🎉 Fire out! Well done.',
      empty: '🧯 Extinguisher empty, and the fire is still burning. Get out, close the door and raise the alarm.'
    };
    const smoke = '<g id="smoke" fill="#57534e" opacity="' + (0.1 + 0.6 * P.hp).toFixed(2) + '">' +
      '<circle cx="' + (sc.cx - 25) + '" cy="' + (sc.baseY - 150) + '" r="24"/><circle cx="' + (sc.cx + 15) + '" cy="' + (sc.baseY - 175) + '" r="30"/>' +
      '<circle cx="' + (sc.cx + 45) + '" cy="' + (sc.baseY - 140) + '" r="20"/></g>';
    const extDraw =
      '<path d="M84 158 Q 140 150 150 205" stroke="#111827" stroke-width="5" fill="none"/>' +
      '<rect x="145" y="199" width="11" height="14" rx="2" fill="#111827" transform="rotate(35 150 206)"/>' +
      '<path d="M62 150 L104 140" stroke="#374151" stroke-width="6" stroke-linecap="round"/>' +
      '<rect x="58" y="148" width="28" height="22" rx="4" fill="#374151"/>' +
      '<rect x="48" y="168" width="48" height="100" rx="12" fill="#dc2626"/>' +
      '<rect x="48" y="196" width="48" height="24" fill="' + band + '"/>' +
      '<text x="72" y="213" font-size="11" text-anchor="middle" fill="' + (ext === 'foam' ? '#713f12' : '#fff') + '" font-family="sans-serif" font-weight="bold">' + label + '</text>' +
      (P.phase === 'pull' ? '<circle class="pin" cx="94" cy="158" r="7" fill="none" stroke="#facc15" stroke-width="4"/>' : '');
    const svg = '<svg id="pass-svg" class="pass-scene' + (P.phase === 'spray' ? ' spraying' : '') + '" viewBox="0 0 400 300">' + sc.svg + smoke +
      (out
        ? '<g class="steam" fill="#e5e7eb"><circle cx="' + sc.cx + '" cy="' + (sc.baseY - 20) + '" r="14"/><circle cx="' + (sc.cx + 16) + '" cy="' + (sc.baseY - 40) + '" r="10"/></g>'
        : '<g id="flames" class="fire" transform="translate(' + sc.cx + ' ' + sc.baseY + ') scale(' + (sc.sx * s).toFixed(3) + ' ' + s.toFixed(3) + ')">' + window.FIRE_ART.flame + '</g>') +
      extDraw +
      '<line id="spray" x1="150" y1="206" x2="150" y2="206" stroke="' + sprayColor + '" stroke-width="14" stroke-linecap="round" opacity=".9" style="display:none"/>' +
      '</svg>';
    return '<div class="pass-steps">' + [['P', 'Pull'], ['A', 'Aim'], ['S', 'Squeeze + Sweep']].map((p, i) =>
      '<span class="' + (i < phaseIdx ? 'done' : i === phaseIdx ? 'now' : '') + '"><b>' + p[0] + '</b> ' + p[1] + '</span>').join('') + '</div>' +
      svg +
      '<div id="pass-hint" class="pass-hint' + (P.phase === 'empty' ? ' bad' : '') + '">' + hints[P.phase] + '</div>' +
      '<div class="meters"><div><span>🔥 Fire</span><div class="meter fire-m"><div id="hp-bar" style="width:' + (P.hp * 100).toFixed(1) + '%"></div></div></div>' +
      '<div><span>🧯 Extinguisher</span><div class="meter ext-m"><div id="charge-bar" style="width:' + (P.charge * 100).toFixed(1) + '%"></div></div></div></div>';
  }

  function drillMapBody(st) {
    const map = window.FIRE_ART.MAPS[st.map];
    let marks = '';
    map.spots.forEach((s) => {
      const tried = dr.tried.includes(s.id);
      marks += '<circle class="map-spot' + (tried ? (s.ok ? ' good' : ' bad') : dr.solved ? '' : ' live') + '" cx="' + s.x + '" cy="' + s.y + '" r="' + s.r + '"/>';
    });
    const you = dr.solved
      ? '<path d="' + map.path + '" fill="none" stroke="#2563eb" stroke-width="3" stroke-dasharray="6 5" class="route"/>' +
        '<circle r="8" fill="#2563eb" stroke="#fff" stroke-width="2"><animateMotion dur="2.4s" fill="freeze" path="' + map.path + '"/></circle>'
      : '<circle cx="' + map.you.x + '" cy="' + map.you.y + '" r="8" fill="#2563eb" stroke="#fff" stroke-width="2" class="you"/>' +
        '<text x="' + map.you.x + '" y="' + (map.you.y + 22) + '" font-size="10" text-anchor="middle" fill="#1e3a8a" font-family="sans-serif" font-weight="bold">YOU</text>';
    return '<svg class="pass-scene map" viewBox="0 0 400 300" data-action="map-tap">' + map.svg + marks + you + '</svg>' +
      dr.tried.map((id) => {
        const s = map.spots.find((x) => x.id === id);
        return '<div class="drill-note ' + (s.ok ? 'good' : 'bad') + '"><b>' + esc(s.label) + ':</b> ' + esc(s.why) + '</div>';
      }).join('');
  }

  function viewDrill() {
    const d = drill();
    if (dr.done) {
      const lessons = dr.mistakes.concat(dr.notes);
      return header() + '<div class="card result-card drill-result"><div class="drill-badge">' + d.icon + '</div><h2>' + esc(d.title) + '</h2>' +
        '<div class="big-stars">' + starStr(dr.stars) + '</div>' +
        '<p class="big-msg">' + (dr.stars === 3 ? 'Fire Marshal level! 🧯' : dr.stars === 2 ? 'Good. A few things to learn.' : 'Read the lessons below and try again.') + '</p>' +
        '<div class="stats three"><div class="card stat"><div class="num">' + fmtTime(dr.time) + '</div><div class="muted">Time</div></div>' +
        '<div class="card stat"><div class="num">' + dr.mistakes.length + '</div><div class="muted">Mistakes</div></div>' +
        '<div class="card stat"><div class="num" data-count-to="' + dr.earned + '" data-prefix="+">+' + dr.earned + '</div><div class="muted">Points</div></div></div>' +
        (dr.earned ? '' : '<p class="muted center">Points are only given the first time you finish a drill.</p>') +
        (lessons.length ? '<div class="lessons"><h3>📝 Lessons</h3>' + lessons.map((l) => '<div class="drill-note bad">' + esc(l) + '</div>').join('') + '</div>' : '') +
        '<button class="btn" data-action="open-drill" data-drill="' + d.id + '">Try again</button>' +
        '<button class="btn secondary" data-action="nav" data-view="hazards">All drills</button></div>';
    }
    const st = drillStep();
    const n = d.steps.length;
    let body;
    if (st.type === 'choice') body = '<div class="question">' + esc(st.q) + '</div>' + drillChoiceBody(st);
    else if (st.type === 'extinguisher') body = '<div class="question">' + esc(st.q) + '</div>' + drillExtBody(st);
    else if (st.type === 'pass') body = drillPassBody(st);
    else body = '<div class="question">' + esc(st.q) + '</div>' + drillMapBody(st);

    return header() + '<div class="card drill-card">' +
      '<div class="alarm-bar"><span class="siren">🚨</span> FIRE DRILL · ' + esc(d.title) + '<span id="drill-time" class="drill-time">' + fmtTime(Date.now() - dr.start) + '</span></div>' +
      '<div class="hz-status"><span class="muted">Step ' + (dr.step + 1) + ' of ' + n + '</span><span class="hz-pips">' +
      d.steps.map((_, i) => '<i class="' + (i < dr.step || (i === dr.step && dr.solved) ? 'on' : i === dr.step ? 'cur' : '') + '"></i>').join('') + '</span>' +
      '<span class="muted">✘ ' + dr.mistakes.length + '</span></div>' +
      (dr.step === 0 ? '<div class="scenario">' + esc(d.intro) + '</div>' : '') +
      body +
      (dr.solved ? '<button class="btn" data-action="drill-next">' + (dr.step < n - 1 ? 'Continue →' : 'See result') + '</button>' : '') +
      '</div>';
  }

  function viewLearn() {
    const cards = window.CODE_CARDS.filter((c) => learnFilter === 'all' || c.disc === learnFilter);
    const seen = state.cardsSeen.length;
    return header() + '<h2>📚 Code cards</h2><p class="muted">Tap a card to flip it. ' + seen + ' of ' + window.CODE_CARDS.length + ' explored.</p>' +
      '<div class="filters">' + [['all', 'All'], ['civil', 'Civil'], ['safety', 'Safety']].map((f) =>
        '<button class="filter' + (learnFilter === f[0] ? ' on' : '') + '" data-action="filter" data-f="' + f[0] + '">' + f[1] + '</button>').join('') + '</div>' +
      '<div class="card-grid">' + cards.map((c) => {
        const isFlipped = flipped.has(c.code);
        const seenIt = state.cardsSeen.includes(c.code);
        return '<button class="code-card ' + c.disc + (isFlipped ? ' flipped' : '') + '" data-action="flip" data-code="' + esc(c.code) + '">' +
          (isFlipped
            ? '<b>' + esc(c.title) + '</b><span>' + esc(c.use) + '</span>'
            : '<span class="cc-tag">' + (c.disc === 'civil' ? 'CIVIL' : 'SAFETY') + (seenIt ? ' ✔' : '') + '</span><span class="cc-code">' + esc(c.code) + '</span><span class="cc-hint">Tap to flip ↻</span>') +
          '</button>';
      }).join('') + '</div>';
  }

  function viewChecklists() {
    return header() + '<h2>Daily checklists</h2><p class="muted">Tick each item before work starts. Checklists reset every day.</p>' +
      window.CHECKLISTS.map((c) => {
        const done = checkedFor(c.id).length;
        const complete = done === c.items.length;
        return '<button class="list-row' + (complete ? ' complete' : '') + '" data-action="open-list" data-list="' + c.id + '"><span class="icon">' + c.icon + '</span>' +
          '<span class="grow">' + esc(text(c.title)) + '<span class="bar small"><span style="width:' + Math.round(done / c.items.length * 100) + '%"></span></span></span>' +
          '<span class="count">' + (complete ? '✔ ' : '') + done + '/' + c.items.length + '</span></button>';
      }).join('');
  }

  function viewChecklist() {
    const c = window.CHECKLISTS.find((x) => x.id === activeList);
    const checked = checkedFor(c.id);
    return header() + '<div class="card"><h2>' + c.icon + ' ' + esc(text(c.title)) + '</h2>' +
      '<div class="muted">' + dateKey() + ' · ' + checked.length + '/' + c.items.length + ' done</div>' +
      '<div class="bar"><div style="width:' + Math.round(checked.length / c.items.length * 100) + '%"></div></div>' +
      c.items.map((item, i) => {
        const on = checked.includes(i);
        return '<label class="check-item' + (on ? ' done' : '') + '"><input type="checkbox" data-action="toggle" data-idx="' + i + '"' + (on ? ' checked' : '') + '><span>' + esc(text(item)) + '</span></label>';
      }).join('') +
      '</div><button class="btn secondary" data-action="nav" data-view="checklists">Back</button>';
  }

  function viewProfile() {
    const days = [];
    for (let i = 0; i < 7; i++) { const d = new Date(); d.setDate(d.getDate() - i); days.push(dateKey(d)); }
    const rows = days.filter((d) => state.history[d]).map((d) =>
      '<div class="hist-row"><span>' + d + '</span><b>' + state.history[d].score + '/' + state.history[d].total + '</b></div>').join('');
    const got = Object.keys(state.badges).length;
    return header() + rankCard() +
      '<div class="card"><h3>🏅 Badges <span class="muted">' + got + '/' + BADGES.length + '</span></h3><div class="badge-grid">' +
      BADGES.map((b) => {
        const on = !!state.badges[b.id];
        return '<div class="badge' + (on ? ' on' : '') + '" title="' + esc(b.desc) + '"><div class="b-icon">' + (on ? b.icon : '🔒') + '</div>' +
          '<div class="b-name">' + esc(b.name) + '</div><div class="b-desc">' + esc(b.desc) + '</div></div>';
      }).join('') + '</div></div>' +
      '<div class="card"><h3>Last 7 days</h3>' + (rows || '<p class="muted">No quizzes yet.</p>') + '</div>' +
      '<div class="card"><h2>Profile</h2>' +
      '<label for="name">Your name</label><input id="name" type="text" maxlength="40" value="' + esc(state.profile.name) + '">' +
      '<label>Your discipline</label>' + discPicker() +
      (formError ? '<div class="error">' + esc(formError) + '</div>' : '') +
      '<button class="btn" data-action="save-profile">Save</button></div>' +
      '<div class="card"><h3>Settings</h3><label class="switch-row"><input type="checkbox" data-action="sound"' + (state.sound ? ' checked' : '') + '> Sound effects</label></div>' +
      '<button class="btn danger" data-action="reset">Reset all data</button>';
  }

  function render() {
    cancelAnimationFrame(passRAF);
    let html;
    if (!state.profile) html = viewOnboarding();
    else {
      switch (view) {
        case 'quiz': html = quiz ? viewQuiz() : viewQuizIntro(); break;
        case 'result': html = viewResult(); break;
        case 'hazards': html = viewHazards(); break;
        case 'hazard': html = viewHazard(); break;
        case 'drill': html = dr ? viewDrill() : viewHazards(); break;
        case 'learn': html = viewLearn(); break;
        case 'checklists': html = viewChecklists(); break;
        case 'checklist': html = viewChecklist(); break;
        case 'profile': html = viewProfile(); break;
        default: html = viewHome();
      }
      html += nav();
    }
    app.innerHTML = html;
    animateCounts();
    setupPass();
  }

  // ---------- Events ----------
  app.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const a = el.dataset.action;

    if (a === 'nav') {
      view = el.dataset.view;
      // Keep an unfinished quiz so switching tabs doesn't restart it; drop a finished one.
      if (quiz && quiz.done) quiz = null;
      if (view === 'profile') draftDisc = state.profile.discipline;
      formError = '';
      render(); window.scrollTo(0, 0);
    }
    else if (a === 'start') {
      if (quiz && !quiz.done && !quiz.practice) { view = 'quiz'; render(); }  // resume
      else startQuiz(false);
    }
    else if (a === 'practice') startQuiz(true);
    else if (a === 'answer') answer(Number(el.dataset.idx));
    else if (a === 'pick-step') pickStep(Number(el.dataset.idx));
    else if (a === 'unpick') unpickStep(Number(el.dataset.pos));
    else if (a === 'check-order') checkOrder();
    else if (a === 'next') nextQuestion();
    else if (a === 'open-scene') startScene(el.dataset.scene);
    else if (a === 'scene-tap') sceneTap(el, e);
    else if (a === 'reveal') revealScene();
    else if (a === 'open-drill') startDrill(el.dataset.drill);
    else if (a === 'drill-choose') drillChoose(Number(el.dataset.idx));
    else if (a === 'drill-ext') drillExt(el.dataset.ext);
    else if (a === 'drill-next') drillNext();
    else if (a === 'map-tap') mapTap(el, e);
    else if (a === 'flip') flipCard(el.dataset.code);
    else if (a === 'filter') { learnFilter = el.dataset.f; render(); }
    else if (a === 'open-list') { activeList = el.dataset.list; view = 'checklist'; render(); window.scrollTo(0, 0); }
    else if (a === 'toggle') toggleItem(activeList, Number(el.dataset.idx));
    else if (a === 'sound') { state.sound = el.checked; save(); if (state.sound) beep(true); }
    else if (a === 'pick-disc') {
      const nameInput = document.getElementById('name');
      const typed = nameInput ? nameInput.value : '';
      draftDisc = el.dataset.disc;
      render();
      const again = document.getElementById('name');
      if (again) again.value = typed;
    }
    else if (a === 'save-profile') {
      const name = (document.getElementById('name').value || '').trim();
      if (!name) { formError = 'Please enter your name.'; render(); return; }
      if (!draftDisc) { formError = 'Please choose your discipline.'; render(); return; }
      const isNew = !state.profile;
      state.profile = { name: name, discipline: draftDisc };
      formError = '';
      save();
      view = 'home';
      render();
      toast(isNew ? '👷 Welcome, ' + name + '! Your first shift starts now.' : 'Profile saved', isNew);
    }
    else if (a === 'reset') {
      if (window.confirm('Delete all your progress on this device?')) {
        state = defaultState(); save(); view = 'home'; quiz = null; hz = null; dr = null; draftDisc = null; flipped.clear(); render();
      }
    }
  });

  // Keyboard shortcuts on a laptop: 1–4 to answer, Enter to go to the next question.
  document.addEventListener('keydown', (e) => {
    if (view !== 'quiz' || !quiz || quiz.done) return;
    const tag = e.target.tagName;
    if (tag === 'INPUT' || tag === 'BUTTON') return;  // let the focused control handle it
    const q = current();
    if (!quiz.answered && q.type !== 'order' && /^[1-9]$/.test(e.key)) {
      const i = Number(e.key) - 1;
      if (i < q.options.length) answer(i);
    } else if (quiz.answered && e.key === 'Enter') {
      e.preventDefault();
      nextQuestion();
    }
  });

  render();
})();
