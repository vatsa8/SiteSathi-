# Site Engineer Daily

A daily quiz and checklist web app for site engineers (Civil and Safety first).

## How to open it
Double-click `index.html`. It opens in your browser and needs no internet, server or install.
Progress (name, points, streak, checklists) is saved in that browser on that device.

## What's inside
| File | What it does |
|---|---|
| `index.html` | The page that loads everything |
| `styles.css` | Colours and layout (mobile-friendly, dark mode supported) |
| `app.js` | The app logic: profile, daily quiz, streak, points, checklists |
| `data/questions.js` | The question bank, which you will edit most |
| `data/checklists.js` | The daily checklists |

## How the daily quiz works
- Each day, everyone in the same discipline gets the same 5 questions, picked from the bank.
- 10 points per correct answer. Points count once per day, and practice mode gives none.
- Doing the quiz on consecutive days builds the streak. Missing a day resets it.

## Adding a question
Open `data/questions.js`, copy one `{ ... }` block, and change it. Only English text is needed:

```js
{
  id: 'c15', discipline: 'civil', topic: 'Concrete',
  q: { en: 'Your question here?' },
  options: [ { en: 'A' }, { en: 'B' }, { en: 'C' }, { en: 'D' } ],
  answer: 2,                       // 0 = first option, 1 = second, ...
  explain: { en: 'Why C is right.' },
  ref: 'IS 456:2000, Cl. x.x',
  verified: false
},
```
Make sure each `id` is unique. The app is English only. Some older entries (c01–c14, s01–s13) also hold Hindi text (`hi`), which the app ignores.

You can put the correct answer in any position: the app shuffles the options each time, so the right answer doesn't always appear in the same place.

Current bank: 102 questions (51 Civil, 51 Safety), including "put in order" and True/False questions.

### True/False question
Use exactly two options, `True` then `False`:
```js
options: [ { en: 'True' }, { en: 'False' } ], answer: 1,   // 1 = False
```

### "Put the steps in order" question
Add `type: 'order'` and list the steps in the **correct** order. The app shuffles them, and the user taps them back into sequence:
```js
{
  id: 's52', discipline: 'safety', topic: 'Lifting', type: 'order',
  q: { en: 'Put these steps in order.' },
  items: [ { en: 'First step' }, { en: 'Second step' }, { en: 'Third step' } ],
  explain: { en: 'Why this order matters.' },
  ref: 'Source', verified: false
},
```

## Fire drill (🎮 Play tab)
Three step-by-step emergency simulations with a running clock:
1. **⚡ Panel fire in the pump house:** raise the alarm, isolate the power, pick CO₂, put the fire out, then aftercare.
2. **🛢️ Diesel fire at the DG set:** stop the fuel, pick foam (powder is accepted), fight a harder fire, contain the spill.
3. **🏢 Store fire, evacuate:** decide not to fight it, choose the escape route on a floor plan (not the lift, not the smoky stairs), then the assembly point and briefing the fire brigade.

The fire-fighting step is hands-on PASS: tap the pin, tap the base of the fire to aim (aiming at the flames counts as a mistake), then press, hold and sweep across the base. The fire shrinks as you sweep, grows back if you stop, and the extinguisher runs out after about 9 seconds of spraying.
Results: ★★★ for no mistakes, ★★ for up to 2, ★ otherwise, with a lesson for every mistake. You get 10 points per star the first time you finish each drill, and the 🧯 Fire Marshal badge for 3 stars.
Scenarios are in `data/firedrill.js`. You can add your own using the same step types (`choice`, `extinguisher`, `pass`, `evacuate`).

## Game features
- **Spot the Hazard** (🔍 Spot tab): tap the hazards in illustrated site scenes (building site, STP/sewer works). Each hazard found shows the fix and a code reference. Clearing a scene for the first time gives 5 points per hazard. Scenes live in `data/hazards.js`; each hazard is a tap circle (x, y, r) on a 400 × 300 drawing.
- **Code cards** (📚 Learn tab): flip cards for 23 IS codes and safety rules, filterable by Civil or Safety. Edit them in `data/learn.js`.
- **Ranks:** Trainee (0) → Junior Engineer (100) → Site Engineer (300) → Senior Engineer (700) → Project Manager (1500) → Chief Engineer (3000 points).
- **10 badges**, such as First Shift, Perfect Pour, Hawk Eye and Code Reader. See them on the Profile page (tap the 🪖 Lv chip at the top).
- **Did you know?** A daily tip on the home screen, taken from the question bank.

## Interactive features
- Instant feedback: correct answers pop green, wrong ones shake red, and you get a short sound and a vibration on phones (sound can be turned off in Profile).
- Confetti for a perfect quiz score and for each completed checklist.
- Progress bars on the home screen and the checklists.
- On a laptop: press 1–4 to answer and Enter for the next question.

## ⚠ Verify the references
Every question starts with `verified: false`, and the app shows "Reference pending expert verification" under it.
Check each answer and clause number against the actual code copy (IS 456, IS 3696, OSHA, etc.), then change it to `verified: true`.

## Next steps (later)
1. More questions (aim for 100+ per discipline so the daily set rarely repeats).
2. Mechanical, Electrical and MEP disciplines.
3. Put it online (e.g. Netlify / GitHub Pages) so engineers can open it on their phones.
4. Accounts and a shared database (e.g. Supabase) for leaderboards, verified profiles and community posts.
