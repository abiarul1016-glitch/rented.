<div align="left">

<br />

<h1>rented.</h1>

<p><em>Renting in Toronto shouldn't be this hard.</em></p>

<br />

![Python](https://img.shields.io/badge/Python-3.8+-7c3aed?style=flat-square&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-19-7c3aed?style=flat-square&logo=react&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-7c3aed?style=flat-square&logo=flask&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7c3aed?style=flat-square&logo=vite&logoColor=white)

</div>

---

## The story

I'm the son of a landlord.

My dad doesn't really like that word — "landlord" — and honestly, neither do I. He's just someone who bought a house, couldn't afford the mortgage alone, and had to rent part of it out. Every month, I'm the one writing the Kijiji listings, fielding the calls, and trying to find a decent tenant before the mortgage is due. I've sat on both sides of this thing.

And from where I sit, the rental market is genuinely broken — not just for tenants, but for everyone in it.

Renters are scrolling through pages of overpriced listings, duplicate ads from the same landlord, promoted posts they didn't ask for, and buried in half of them — illegal clauses. Things like *"no pets"*, *"students only"*, *"no subletting"* — restrictions that are straight-up violations of the Ontario Residential Tenancies Act. Most people never catch them.


But this isn’t a tale about them, rather about the potential tenants, and the next generation—my generation who may not have a home in the country they call their home. So...

Meet **rented.**

---

## What it does

You enter what you're looking for — city, price range, bedrooms, bathrooms. rented. scrapes Kijiji live, scores every result against your filters, flags anything with illegal clauses, and returns a clean carousel of your top 10 matches.

No ads. No promoted listings. No noise.

Just the places that actually fit.

---

## How it works

### 1. Scraping

`kijiji_V2.py` hits the first 3 pages of Kijiji's GTA apartments & condos section. For each listing card on the page, it pulls:

- Title, price, location, description, and posting date
- The listing URL and lead photo
- Structured attributes from Kijiji's own attribute list — bedrooms, bathrooms, unit type, parking, and square footage

Price is cleaned from a raw string like `$1,750/mo` down to a plain number. Anything that isn't a dollar amount (e.g. *"Please Contact"*) becomes `0` and gets filtered out later.

### 2. RTA violation detection

This is the part I care about most. Before a listing ever reaches you, its description is scanned against a library of regex patterns organised by violation type:

| Category | Examples caught |
|---|---|
| Gender restriction | `female only`, `looking for male`, `must be female` |
| Ethnicity / religion | `indian only`, `muslim only`, `prefer asian` |
| Age / occupation | `students only`, `no students`, `working professionals only` |
| Pets | `no pets`, `no dogs`, `pet free home` |
| Guests | `no guests`, `no overnight guests`, `visitors not allowed` |
| Subletting | `no subletting`, `no sublease` |
| Family status | `no couples`, `no families`, `single person only` |

Every pattern that matches gets added to the listing's `illegal_flags` list. Flagged listings aren't removed — they show up in results with a visible warning badge so you can decide for yourself. Transparency over gatekeeping.

> The current limitation is that the scraper only checks the short preview description on the listing card, not the full listing page. A deeper per-listing scrape would catch far more. That's next.

### 3. Scoring

Once listings are filtered by your location and price range, each one is scored:

- Exact bedroom match → **+20 pts**
- Bathroom match or better → **+20 pts**
- Has a real photo → **+20 pts**
- Price at your minimum → **+40 pts**
- Illegal RTA clause found → **−20 pts** per flag

Top 10 by score are returned. The rest are dropped.

### 4. The UI

Results come back through a Flask REST API and land in a React carousel. Your top match sits front and centre at full size. Cards on either side scale down and blur slightly, giving a sense of depth. Clicking any side card brings it forward. A dot nav and arrow buttons let you move through the full list. While all of this is loading, a small SVG house animates itself being built — walls, roof, chimney, smoke and all.

---

## Project structure

```
rented/
├── api.py              # Flask server — exposes /search
├── kijiji_V2.py        # Kijiji scraper → listings.json
├── listings.json       # Cached listings
├── requirements.txt
│
└── rented-ui/          # React + Vite frontend
    └── src/
        ├── App.jsx     # Everything — home, loader, carousel
        └── main.jsx
```

---

## Running it locally

You'll need **Python 3.8+** and **Node.js 18+**.

**Backend**
```bash
pip install flask flask-cors requests beautifulsoup4
python api.py
# → http://127.0.0.1:5000
```

**Frontend** (in a second terminal)
```bash
cd rented-ui
npm install --legacy-peer-deps
npm run dev
# → http://localhost:5173
```

Both need to be running at the same time. Flask handles the data, Vite serves the UI.

---

## Deploying

| Part | Platform | Notes |
|---|---|---|
| Backend | [Render](https://render.com) | Add `gunicorn` to `requirements.txt`, start command: `gunicorn api:app` |
| Frontend | [Vercel](https://vercel.com) | Auto-detects Vite, one-click deploy |

Update the `fetch` URL in `App.jsx` to your Render backend URL before deploying the frontend. Render's free tier spins down after 15 minutes of inactivity — first request after idle may take ~30s to wake up.

---

## API

**`POST /search`**

```json
{
  "location":  "Toronto",
  "minPrice":  800,
  "maxPrice":  2500,
  "bedrooms":  "2",
  "bathrooms": "1"
}
```

Returns an array of up to 10 listings sorted by score. Each listing includes title, price, location, bedrooms, bathrooms, sqft, parking, illegal flags, image, URL, and score.

---

## What's still broken / what's next?

- `date_posted` always returns `null` — the scraper isn't catching it yet
- RTA violation detection only checks the short preview text, not the full listing page — a deeper per-listing scrape would make this much more accurate
- Only Kijiji for now — Facebook Marketplace and Realtor.ca are next
- Scoring weights are hardcoded — ideally these would be user-adjustable
- No saved searches, no accounts, no history yet

---

<div align="center">

*Built at Hack Canada  ·  Made with 🍁 and a lot of spite*

</div>
