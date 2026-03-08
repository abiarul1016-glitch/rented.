import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
// const LISTINGS_DATA = [
//   { title: "3 Bed Detached House — Meadowvale", price: 3300, location: "Meadowvale, Mississauga", description: "Full house including basement. 3 bed, 2 bath detached with two large rec rooms. Beautifully renovated and freshly painted throughout.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/4e/4ef2425c-e5e7-4b73-966b-884b3f4718d1?rule=kijijica-400-webp", bedrooms: 3, bathrooms: 2, size_sqft: 1500, unit_type: "House", parking_included: true, illegal_flags: [] },
//   { title: "Davisville Village Bachelor", price: 1595, location: "City of Toronto", description: "Enjoy 2 Months Rent Free. Beautifully maintained bachelor apartment in Davisville Village with modern finishes throughout.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/37/37357d34-8b70-4345-be85-31eec54059f7?rule=kijijica-400-webp", bedrooms: 0, bathrooms: 1, size_sqft: null, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
//   { title: "3 Bedroom Apartment — North Toronto", price: 2995, location: "City of Toronto", description: "Large and bright 3 bedroom apartment. Renovated suite with balconies, hardwood floors and modern appliances throughout.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/e5/e5871ac1-5181-447c-afc9-acb298e1fab5?rule=kijijica-400-webp", bedrooms: 3, bathrooms: 1, size_sqft: null, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
//   { title: "35 Walmer Road — 2 Bedroom", price: 2876, location: "Toronto", description: "One month free on a 13-month lease. Near University of Toronto, 746 sq ft of beautifully maintained space.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/63/639f9143-e0d7-4ba6-8d25-736acba4b887?rule=kijijica-400-webp", bedrooms: 2, bathrooms: 1, size_sqft: 746, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
//   { title: "2 Bed Basement — West Hill", price: 1600, location: "West Hill, Toronto", description: "From $1,600 plus utilities or $1,800 all-inclusive. One parking spot included. Near Morningside and Lawrence Ave.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/7d/7db7a676-bb6c-4125-83d9-4215007456eb?rule=kijijica-400-webp", bedrooms: 2, bathrooms: 1, size_sqft: 750, unit_type: "Basement", parking_included: true, illegal_flags: [] },
//   { title: "Liberty Village Bachelor Suite", price: 2295, location: "Fort York, Toronto", description: "Luxury bachelor townhouse suite in a sought-after condominium complex in Liberty Village, behind Exhibition Place.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/3f/3fc1fad7-b564-4693-95d1-293edc56ff4f?rule=kijijica-400-webp", bedrooms: 0, bathrooms: 1, size_sqft: 650, unit_type: "Townhouse", parking_included: true, illegal_flags: [] },
//   { title: "Oakville Main Floor House", price: 2700, location: "Central Oakville", description: "Bright 3-bedroom 1.5-bath main floor of a detached house. Ideal for families or professionals. Approx 900 sq ft.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/16/16c84619-f7ca-4bf8-afa0-c73f1aac4174?rule=kijijica-400-webp", bedrooms: 3, bathrooms: 1.5, size_sqft: 900, unit_type: "House", parking_included: true, illegal_flags: [] },
//   { title: "Newly Built 1 Bed — Leaside", price: 1050, location: "Leaside-Bennington, Toronto", description: "Newly built basement apartment with 9-foot ceilings, large windows and a spacious layout. Quiet neighbourhood.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/8c/8cfa444a-f3c2-44a0-91a1-63970900b5a8?rule=kijijica-400-webp", bedrooms: 1, bathrooms: 1, size_sqft: 800, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
//   { title: "Furnished Studio — The Annex", price: 995, location: "The Annex, Toronto", description: "All-inclusive studio units from $995 per month. Private washroom, fully furnished. 15-min walk to UofT campus.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-fsbo-ads/images/71/71d14c6e-1f6d-41b8-9116-d7f566b235e3?rule=kijijica-400-webp", bedrooms: 0, bathrooms: 1, size_sqft: 200, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
//   { title: "Parkdale 1 Bed — 99 Dowling Ave", price: 1782, location: "Parkdale, Toronto", description: "Quiet five-storey high-rise in a mature community. Queen Street shops and restaurants right at your door.", url: "https://www.kijiji.ca", image: "https://media.kijiji.ca/api/v1/ca-prod-dealer-ads/images/ad/add1ea91-87c6-4e3d-bdb2-aa6ad54a6fd3?rule=kijijica-400-webp", bedrooms: 1, bathrooms: 1, size_sqft: 656, unit_type: "Apartment", parking_included: false, illegal_flags: [] },
// ];

const CITIES = ["Toronto", "Mississauga", "Brampton", "Oakville", "Vaughan", "Markham", "Oshawa", "Burlington"];
const UNIT_LABELS = { House: "House", Apartment: "Apartment", Basement: "Basement", Condo: "Condo", Townhouse: "Townhouse", "Duplex/Triplex": "Duplex" };

// function scoreListings(listings, { location, minPrice, maxPrice, bedrooms, bathrooms }) {
//   return listings
//     .filter(l => {
//       const inLoc = !location || l.location.toLowerCase().includes(location.toLowerCase());
//       const inPrice = (!minPrice || l.price >= parseFloat(minPrice)) && (!maxPrice || l.price <= parseFloat(maxPrice));
//       return inLoc && inPrice && l.price > 0;
//     })
//     .map(l => {
//       let s = 50;
//       if (bedrooms !== "" && l.bedrooms == bedrooms) s += 25;
//       if (bathrooms !== "" && l.bathrooms >= parseFloat(bathrooms)) s += 15;
//       if (l.image && !l.image.includes("not-found")) s += 20;
//       if (l.parking_included) s += 5;
//       if (l.size_sqft) s += 5;
//       if (l.illegal_flags?.length) s -= 30;
//       const mid = (parseFloat(minPrice || 500) + parseFloat(maxPrice || 5000)) / 2;
//       s -= Math.abs(l.price - mid) / 200;
//       return { ...l, score: Math.max(0, Math.round(s)) };
//     })
//     .sort((a, b) => b.score - a.score)
//     .slice(0, 10);
// }

// ─── MINIMAL SVG ICONS ────────────────────────────────────────────────────────
const IconShield = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconBrain = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.53-4.62A2.5 2.5 0 0 1 4 10c0-.66.26-1.26.68-1.7A2.5 2.5 0 0 1 9.5 2z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.53-4.62A2.5 2.5 0 0 0 20 10c0-.66-.26-1.26-.68-1.7A2.5 2.5 0 0 0 14.5 2z"/>
  </svg>
);
const IconSpark = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L9.1 9.1 2 12l7.1 2.9L12 22l2.9-7.1L22 12l-7.1-2.9L12 2z"/>
  </svg>
);
const IconParking = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>
  </svg>
);
const IconPin = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const IconWarn = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

// ─── HOUSE LOADER ─────────────────────────────────────────────────────────────
function HouseLoader({ stage, total }) {
  const pct = ((stage + 1) / total) * 100;
  const wallFill = Math.min(pct, 100);
  const roofOpacity = pct > 35 ? Math.min((pct - 35) / 30, 1) : 0;
  const chimneyActive = pct > 65;
  const sparksVisible = pct > 80;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
      <div style={{ position: "relative", width: 200, height: 200, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>

        {/* Outer glow ring */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(167,139,250,0.12) 0%, transparent 70%)",
          animation: "pulseGlow 3s ease-in-out infinite",
        }}/>

        {/* Orbit ring */}
        <svg style={{ position: "absolute", inset: 0 }} width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(196,181,253,0.18)" strokeWidth="1" strokeDasharray="3 8"/>

          {/* Orbiting dots */}
          {[0, 1, 2].map(i => (
            <circle key={i} r="4.5" fill="#a78bfa" style={{
              filter: "drop-shadow(0 0 5px rgba(167,139,250,0.9))",
              animation: `orbitDot 3.6s linear infinite`,
              animationDelay: `${i * 1.2}s`,
            }}>
              <animateMotion dur="3.6s" repeatCount="indefinite" begin={`${i * 1.2}s`}>
                <mpath href="#houseOrbit"/>
              </animateMotion>
            </circle>
          ))}
          <path id="houseOrbit" d="M100,20 a80,80 0 1,1 -0.01,0" fill="none"/>

          {/* Ground */}
          <ellipse cx="100" cy="172" rx="52" ry="5" fill="rgba(196,181,253,0.15)"/>

          {/* House walls */}
          <rect x="62" y="106" width="76" height="66" rx="3" fill="#f9f7ff" stroke="#ddd5fe" strokeWidth="1.5"/>
          {/* Fill from bottom */}
          <clipPath id="wc"><rect x="62" y={172 - (wallFill / 100) * 66} width="76" height={Math.max((wallFill / 100) * 66, 0)}/></clipPath>
          <rect x="62" y="106" width="76" height="66" rx="3" fill="url(#wg)" clipPath="url(#wc)" style={{ transition: "none" }}/>
          <defs>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ede9fe"/>
              <stop offset="100%" stopColor="#ddd5fe" stopOpacity="0.35"/>
            </linearGradient>
          </defs>

          {/* Door */}
          <rect x="88" y="132" width="24" height="40" rx="12" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.5"/>
          <circle cx="108" cy="153" r="2" fill="#a78bfa"/>

          {/* Left window */}
          <rect x="67" y="113" width="22" height="18" rx="3" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.2"/>
          <line x1="78" y1="113" x2="78" y2="131" stroke="#c4b5fd" strokeWidth="1"/>
          <line x1="67" y1="122" x2="89" y2="122" stroke="#c4b5fd" strokeWidth="1"/>
          {/* Right window */}
          <rect x="111" y="113" width="22" height="18" rx="3" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.2"/>
          <line x1="122" y1="113" x2="122" y2="131" stroke="#c4b5fd" strokeWidth="1"/>
          <line x1="111" y1="122" x2="133" y2="122" stroke="#c4b5fd" strokeWidth="1"/>

          {/* Roof triangle */}
          <polygon points="54,110 100,60 146,110" fill="none" stroke="#c4b5fd" strokeWidth="1.5"/>
          <polygon points="54,110 100,60 146,110" fill="url(#rg)" style={{ opacity: roofOpacity, transition: "opacity 0.8s cubic-bezier(.4,0,.2,1)" }}/>
          <defs>
            <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
          </defs>

          {/* Chimney */}
          <rect x="112" y="72" width="14" height="22" rx="2"
            fill={chimneyActive ? "#7c3aed" : "#ede9fe"}
            stroke="#c4b5fd" strokeWidth="1.2"
            style={{ transition: "fill 0.8s ease" }}
          />

          {/* Smoke */}
          {chimneyActive && [0, 1].map(i => (
            <circle key={i} cx={119 + i * 3} cy={70} r="4" fill="rgba(196,181,253,0.65)" style={{
              animation: "smokeUp 2.2s ease-out infinite",
              animationDelay: `${i * 1.1}s`,
            }}/>
          ))}

          {/* Sparkles */}
          {sparksVisible && [[42, 82], [158, 88], [68, 55], [132, 52]].map(([x, y], i) => (
            <text key={i} x={x} y={y} fontSize="10" fill="#c084fc" textAnchor="middle" style={{
              animation: "sparkleAnim 1.6s ease-in-out infinite",
              animationDelay: `${i * 0.32}s`,
            }}>✦</text>
          ))}
        </svg>
      </div>

      {/* Progress track */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, width: 260 }}>
        <div style={{ width: "100%", height: 2, background: "#ede9fe", borderRadius: 99, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${pct}%`,
            background: "linear-gradient(90deg, #7c3aed, #c084fc)",
            borderRadius: 99,
            transition: "width 0.9s cubic-bezier(.4,0,.2,1)",
          }}/>
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#c4b5fd", letterSpacing: "1px" }}>
          {Math.round(pct)}%
        </div>
      </div>
    </div>
  );
}

// ─── LISTING CARD ─────────────────────────────────────────────────────────────
function ListingCard({ listing, rank, isActive }) {
  const hasImg = listing.image && !listing.image.includes("not-found");

  return (
    <div style={{
      width: 295,
      flexShrink: 0,
      background: "#fff",
      borderRadius: 24,
      overflow: "hidden",
      border: `1px solid ${isActive ? "rgba(124,58,237,0.22)" : "rgba(196,181,253,0.22)"}`,
      boxShadow: isActive
        ? "0 2px 4px rgba(124,58,237,0.04), 0 8px 20px rgba(124,58,237,0.10), 0 28px 60px rgba(124,58,237,0.14)"
        : "0 2px 4px rgba(100,80,180,0.03), 0 6px 16px rgba(100,80,180,0.06), 0 20px 44px rgba(100,80,180,0.08)",
      transform: isActive ? "translateY(-6px)" : "translateY(0px)",
      transition: "all 0.55s cubic-bezier(.4,0,.2,1)",
      fontFamily: "'Outfit', sans-serif",
      position: "relative",
      scrollSnapAlign: "center",
    }}>
      {/* Rank badge */}
      <div style={{
        position: "absolute", top: 12, left: 12, zIndex: 3,
        background: "rgba(255,255,255,0.94)", backdropFilter: "blur(10px)",
        borderRadius: 99, padding: "3px 10px",
        fontSize: 10.5, fontWeight: 800, color: "#7c3aed",
        border: "1px solid rgba(124,58,237,0.16)",
        letterSpacing: "0.3px",
      }}>#{rank}</div>

      {/* Image */}
      <div style={{ position: "relative", height: 162, background: "#f5f3ff" }}>
        {hasImg
          ? <img src={listing.image} alt={listing.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
          : <div style={{ width: "100%", height: "100%", background: "linear-gradient(145deg,#f5f3ff,#ede9fe)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 10, fontWeight: 700, color: "#c4b5fd", letterSpacing: "2px", textTransform: "uppercase" }}>No photo</span>
            </div>
        }
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 48, background: "linear-gradient(transparent, rgba(255,255,255,0.96))" }}/>
        <div style={{
          position: "absolute", bottom: 10, right: 11, zIndex: 2,
          background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)",
          borderRadius: 99, padding: "3px 10px",
          fontSize: 10.5, fontWeight: 700, color: "#6d28d9",
          border: "1px solid rgba(196,181,253,0.35)",
          letterSpacing: "0.2px",
        }}>{UNIT_LABELS[listing.unit_type] || listing.unit_type}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "14px 18px 18px" }}>
        {/* Price */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
          <span style={{ fontSize: 30, fontWeight: 800, color: "#5b21b6", letterSpacing: "-1.5px", lineHeight: 1 }}>
            ${listing.price.toLocaleString()}
          </span>
          <span style={{ fontSize: 12.5, fontWeight: 500, color: "#c4b5fd" }}>/mo</span>
        </div>

        <div style={{ fontSize: 13, fontWeight: 600, color: "#1e1b4b", marginTop: 7, lineHeight: 1.42 }}>
          {listing.title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, color: "#b0b8c8" }}>
          <IconPin/>
          <span style={{ fontSize: 11 }}>{listing.location}</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
          {listing.bedrooms !== null && (
            <span style={tg}>{listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms} bed`}</span>
          )}
          {listing.bathrooms && <span style={tg}>{listing.bathrooms} bath</span>}
          {listing.size_sqft && <span style={tg}>{listing.size_sqft} sqft</span>}
          {listing.parking_included && (
            <span style={{ ...tg, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", display: "flex", alignItems: "center", gap: 4 }}>
              <IconParking/> Parking
            </span>
          )}
        </div>

        {/* Flags */}
        {listing.illegal_flags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 9 }}>
            {listing.illegal_flags.map(f => (
              <span key={f} style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 99, padding: "2px 8px", fontSize: 10, fontWeight: 700, color: "#c2410c", display: "flex", alignItems: "center", gap: 4 }}>
                <IconWarn/> {f}
              </span>
            ))}
          </div>
        )}

        <p style={{ fontSize: 11.5, color: "#b0b8c8", marginTop: 10, lineHeight: 1.68, fontWeight: 400 }}>
          {listing.description?.slice(0, 92)}…
        </p>

        <a href={listing.url} target="_blank" rel="noreferrer" style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 7,
          marginTop: 14, padding: "11px 16px",
          background: "#5b21b6",
          borderRadius: 11, color: "#fff",
          fontSize: 12, fontWeight: 700, textDecoration: "none",
          boxShadow: "0 4px 16px rgba(91,33,182,0.3), 0 1px 3px rgba(91,33,182,0.2)",
          letterSpacing: "0.2px",
          transition: "all 0.2s ease",
        }}>
          View listing <IconArrow/>
        </a>
      </div>
    </div>
  );
}

const tg = {
  background: "#f5f3ff", border: "1px solid #ede9fe",
  borderRadius: 99, padding: "2px 10px",
  fontSize: 11, fontWeight: 600, color: "#7c3aed",
};

// ─── RESULTS CAROUSEL ─────────────────────────────────────────────────────────
function ResultsCarousel({ results }) {
  const n = results.length;
  const [active, setActive] = useState(0);

  const prev = () => setActive(i => (i - 1 + n) % n);
  const next = () => setActive(i => (i + 1) % n);
  const goTo = (i) => setActive(i);

  // For each card, compute its visual slot relative to active (wrapping)
  const getOffset = (idx) => {
    let off = idx - active;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    return off;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>

      {/* Score & position pill */}
      <div style={{
        display: "flex", alignItems: "center", gap: 14,
        background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)",
        border: "1px solid rgba(196,181,253,0.3)", borderRadius: 99,
        padding: "8px 24px",
        boxShadow: "0 2px 12px rgba(124,58,237,0.06)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#5b21b6", letterSpacing: "-1px", lineHeight: 1 }}>
            {results[active]?.score}
          </span>
          <span style={{ fontSize: 9, color: "#c4b5fd", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase" }}>match</span>
        </div>
        <div style={{ width: 1, height: 24, background: "rgba(196,181,253,0.4)" }}/>
        <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
          {active + 1} <span style={{ color: "#ddd5fe" }}>/</span> {n}
        </span>
      </div>

      {/* Track — CSS transform carousel, no scroll */}
      <div style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        transform: "translateX(-50%)",
        height: 530,
      }}>
        {/* Soft fade masks on edges */}
        <div style={{
          position: "absolute", top: 0, left: 0, bottom: 0, width: 120,
          background: "linear-gradient(to right, #faf9ff, transparent)",
          zIndex: 20, pointerEvents: "none",
        }}/>
        <div style={{
          position: "absolute", top: 0, right: 0, bottom: 0, width: 120,
          background: "linear-gradient(to left, #faf9ff, transparent)",
          zIndex: 20, pointerEvents: "none",
        }}/>

        {results.map((l, i) => {
          const off = getOffset(i);
          const abs = Math.abs(off);
          if (abs > 2) return null;

          const xPx = off * 318;
          const scale = abs === 0 ? 1 : abs === 1 ? 0.83 : 0.67;
          const zIndex = abs === 0 ? 10 : abs === 1 ? 5 : 2;
          const opacity = abs === 0 ? 1 : abs === 1 ? 0.72 : 0.42;
          const blur = abs === 0 ? "none" : abs === 1 ? "blur(0.6px)" : "blur(1.8px)";

          return (
            <div
              key={i}
              onClick={() => abs !== 0 && goTo(i)}
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: `translateX(calc(-50% + ${xPx}px)) scale(${scale})`,
                transformOrigin: "top center",
                zIndex,
                opacity,
                filter: blur,
                transition: "all 0.46s cubic-bezier(.4,0,.2,1)",
                cursor: abs !== 0 ? "pointer" : "default",
              }}
            >
              <ListingCard listing={l} rank={i + 1} isActive={abs === 0}/>
            </div>
          );
        })}
      </div>
      

      {/* Nav — arrows + dots */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: -16 }}>
        <button onClick={prev} style={navBtn}>‹</button>

        <div style={{ display: "flex", gap: 5 }}>
          {results.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                padding: 0, border: "none", cursor: "pointer", borderRadius: 99,
                width: i === active ? 22 : 7, height: 7,
                background: i === active ? "#5b21b6" : "#ddd5fe",
                transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
              }}
            />
          ))}
        </div>

        <button onClick={next} style={navBtn}>›</button>
      </div>
    </div>
  );
}

const navBtn = {
  background: "rgba(91,33,182,0.07)", border: "1px solid rgba(196,181,253,0.4)",
  width: 36, height: 36, borderRadius: "50%", fontSize: 19, color: "#7c3aed",
  display: "flex", alignItems: "center", justifyContent: "center",
  fontFamily: "sans-serif", transition: "all 0.2s", cursor: "pointer",
};

// ─── LOADING MESSAGES ─────────────────────────────────────────────────────────
const MSGS = [
  "Connecting to Kijiji",
  "Scraping listings",
  "Filtering for RTA violations",
  "Scoring your matches",
  "Preparing results",
];

// ─── CHIME ─────────────────────────────────────────────────────────

function playChime() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 — a clean major chord arpeggio

  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const start = ctx.currentTime + i * 0.12;
    const end = start + 0.6;

    gain.gain.setValueAtTime(0, start);
    gain.gain.linearRampToValueAtTime(0.18, start + 0.02);  // soft attack
    gain.gain.exponentialRampToValueAtTime(0.001, end);      // gentle fade

    osc.start(start);
    osc.stop(end);
  });
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState("home");
  const [filters, setFilters] = useState({ location: "", minPrice: "", maxPrice: "", bedrooms: "", bathrooms: "" });
  const [results, setResults] = useState([]);
  const [loadStage, setLoadStage] = useState(0);
  const [msgVisible, setMsgVisible] = useState(true);

  const handleSearch = async () => {
  setLoadStage(0);
  setMsgVisible(true);
  setStep("loading");

  // Run animation and data fetch in parallel
  const animationDone = new Promise((resolve) => {
    let s = 0;
    const tick = () => {
      setMsgVisible(false);
      setTimeout(() => {
        s++;
        setLoadStage(s);
        setMsgVisible(true);
        if (s < MSGS.length - 1) {
          setTimeout(tick, 1100);
        } else {
          // Wait a beat on the final stage before resolving
          setTimeout(resolve, 900);
        }
      }, 280);
    };
    setTimeout(tick, 1100);
  });

    const dataReady = fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    })
      .then(res => res.json())
      .catch(err => {
        console.error("API error:", err);
        return [];
      });

    // Wait for BOTH the animation AND the data before showing results
    const [, data] = await Promise.all([animationDone, dataReady]);
    setResults(data);
    playChime();
    setStep("results");
  };

  const setF = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  return (
    <div style={{ minHeight: "100vh", background: "#faf9ff", fontFamily: "'Outfit', -apple-system, sans-serif", color: "#1e1b4b", position: "relative", overflow: "hidden" }}>

      {/* Background blobs */}
      <div style={{ position: "fixed", top: "-16%", right: "-8%", width: 540, height: 540, background: "radial-gradient(circle, rgba(167,139,250,0.13) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0, animation: "blobDrift 16s ease-in-out infinite" }}/>
      <div style={{ position: "fixed", bottom: "-14%", left: "-8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(196,181,253,0.11) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0, animation: "blobDrift 20s ease-in-out infinite reverse" }}/>
      <div style={{ position: "fixed", top: "44%", left: "36%", width: 320, height: 320, background: "radial-gradient(circle, rgba(221,214,254,0.09) 0%, transparent 68%)", borderRadius: "50%", pointerEvents: "none", zIndex: 0, animation: "blobDrift 13s ease-in-out infinite 3s" }}/>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 36px", borderBottom: "1px solid rgba(196,181,253,0.22)", background: "rgba(250,249,255,0.8)", backdropFilter: "blur(20px)" }}>
        <button onClick={() => setStep("home")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 23, fontWeight: 800, color: "#5b21b6", letterSpacing: "-1px", fontFamily: "'Outfit', sans-serif", padding: 0 }}>
          rented.
        </button>
        <span style={{ fontSize: 11.5, color: "#c4b5fd", fontWeight: 500, letterSpacing: "0.2px" }}>
          Renting in Toronto shouldn't be this hard.
        </span>
      </header>

      {/* ── HOME ── */}
      {step === "home" && (
        <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "60px 28px 88px", animation: "fadeUp 0.6s cubic-bezier(.4,0,.2,1) both" }}>

          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 20, background: "rgba(91,33,182,0.055)", border: "1px solid rgba(124,58,237,0.14)", color: "#7c3aed", borderRadius: 99, padding: "5px 14px", fontSize: 10.5, fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase" }}>
              Your home is out there
            </div>
            <h1 style={{ fontSize: "clamp(36px, 5.5vw, 56px)", fontWeight: 800, letterSpacing: "-2.5px", lineHeight: 1.08, color: "#1e1b4b", marginBottom: 16 }}>
              Find your next<br/>
              <span style={{ background: "linear-gradient(118deg, #5b21b6 0%, #c084fc 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>home.</span>
            </h1>
            <p style={{ fontSize: 15, color: "#a0a8b8", lineHeight: 1.82, fontWeight: 400, maxWidth: 460, margin: "0 auto" }}>
              We scrape Kijiji, score every listing, and cut the noise — surfacing only what actually matches what you need.
            </p>
          </div>

          {/* Filter card */}
          <div style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(24px)", border: "1px solid rgba(196,181,253,0.26)", borderRadius: 24, padding: "30px 32px 28px", boxShadow: "0 2px 4px rgba(124,58,237,0.02), 0 8px 24px rgba(124,58,237,0.05), 0 32px 64px rgba(124,58,237,0.06)", marginBottom: 40 }}>

            <div style={{ fontSize: 10, fontWeight: 700, color: "#c4b5fd", letterSpacing: "1.8px", textTransform: "uppercase", marginBottom: 20 }}>Your filters</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 16, marginBottom: 16 }}>
              <div>
                <label style={lbl}>City</label>
                <div style={{ position: "relative", background: "#f9f7ff", border: "1px solid rgba(196,181,253,0.5)", borderRadius: 12, overflow: "hidden" }}>
                  <select value={filters.location} onChange={e => setF("location", e.target.value)} style={{ background: "none", border: "none", outline: "none", color: "#3b0764", fontSize: 13.5, padding: "10px 32px 10px 13px", width: "100%", appearance: "none", cursor: "pointer", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}>
                    <option value="">Anywhere in GTA</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <span style={{ position: "absolute", right: 11, top: "50%", transform: "translateY(-50%)", color: "#c4b5fd", pointerEvents: "none", fontSize: 14 }}>⌄</span>
                </div>
              </div>

              <div>
                <label style={lbl}>Budget per month</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {["minPrice", "maxPrice"].map((key, i) => (
                    <div key={key} style={{ flex: 1, display: "flex", alignItems: "center", background: "#f9f7ff", border: "1px solid rgba(196,181,253,0.5)", borderRadius: 12, overflow: "hidden" }}>
                      <span style={{ padding: "0 5px 0 11px", color: "#c4b5fd", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>$</span>
                      <input type="number" placeholder={i === 0 ? "800" : "3500"} value={filters[key]} onChange={e => setF(key, e.target.value)}
                        style={{ background: "none", border: "none", outline: "none", color: "#3b0764", fontSize: 13.5, padding: "10px 9px 10px 2px", width: "100%", fontFamily: "'Outfit', sans-serif", fontWeight: 500 }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[
                { key: "bedrooms", label: "Bedrooms", opts: [["Any",""],["Studio","0"],["1","1"],["2","2"],["3","3"],["4+","4"]] },
                { key: "bathrooms", label: "Bathrooms", opts: [["Any",""],["1","1"],["1.5","1.5"],["2","2"],["2+","2"]] },
              ].map(({ key, label, opts }) => (
                <div key={key}>
                  <label style={lbl}>{label}</label>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {opts.map(([display, val]) => {
                      const on = filters[key] === val;
                      return (
                        <button key={display} onClick={() => setF(key, val)} style={{
                          background: on ? "#5b21b6" : "#f9f7ff",
                          border: `1px solid ${on ? "transparent" : "rgba(196,181,253,0.45)"}`,
                          borderRadius: 99, padding: "6px 12px", fontSize: 12.5,
                          fontWeight: on ? 700 : 500,
                          color: on ? "#fff" : "#9ca3af",
                          cursor: "pointer", fontFamily: "'Outfit', sans-serif",
                          boxShadow: on ? "0 2px 10px rgba(91,33,182,0.3)" : "none",
                          transition: "all 0.22s cubic-bezier(.4,0,.2,1)",
                        }}>{display}</button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleSearch} style={{
              width: "100%", padding: "14px 24px",
              background: "#5b21b6",
              border: "none", borderRadius: 13, cursor: "pointer",
              color: "#fff", fontSize: 15, fontWeight: 700,
              fontFamily: "'Outfit', sans-serif",
              boxShadow: "0 4px 12px rgba(91,33,182,0.22), 0 1px 3px rgba(91,33,182,0.14)",
              letterSpacing: "-0.2px",
              transition: "all 0.22s ease",
            }}>
              Find my place
            </button>
          </div>

          {/* Features */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            {[
              { Icon: IconShield, title: "No illegal clauses", desc: "We flag listings with Ontario RTA violations before you ever see them." },
              { Icon: IconBrain, title: "Smart matching", desc: "Each listing is scored and ranked by how closely it fits your needs." },
              { Icon: IconSpark, title: "No clutter", desc: "No promoted listings, no ads. Just the results that matter." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} style={{ background: "rgba(255,255,255,0.6)", border: "1px solid rgba(196,181,253,0.18)", borderRadius: 18, padding: "20px 18px" }}>
                <div style={{ color: "#a78bfa", marginBottom: 10 }}><Icon/></div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e1b4b", marginBottom: 5 }}>{title}</div>
                <div style={{ fontSize: 11.5, color: "#a0a8b8", lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── LOADING ── */}
      {step === "loading" && (
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 66px)", gap: 0 }}>
          <HouseLoader stage={loadStage} total={MSGS.length}/>

          {/* Message underneath with crossfade */}
          <div style={{ marginTop: 32, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{
              fontSize: 13, fontWeight: 600, color: "#7c3aed",
              letterSpacing: "0.1px",
              opacity: msgVisible ? 1 : 0,
              transform: msgVisible ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}>
              {MSGS[loadStage]}
            </div>
          </div>
        </div>
      )}

      {/* ── RESULTS ── */}
      {step === "results" && (
        <div style={{ position: "relative", zIndex: 1, maxWidth: "100%", margin: "0 auto", padding: "44px 0 80px", animation: "fadeUp 0.55s cubic-bezier(.4,0,.2,1) both", overflowX: "hidden" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 36, padding: "0 32px" }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-1px", color: "#1e1b4b" }}>
                {results.length} match{results.length !== 1 ? "es" : ""}
              </div>
              <div style={{ fontSize: 12, color: "#b0b8c8", marginTop: 4, fontWeight: 500 }}>
                {filters.location || "Greater Toronto Area"} &middot; {filters.minPrice ? `$${filters.minPrice}` : "Any"} – {filters.maxPrice ? `$${filters.maxPrice}` : "Any"}/mo
                {filters.bedrooms !== "" ? ` · ${filters.bedrooms === "0" ? "Studio" : filters.bedrooms + " bed"}` : ""}
              </div>
            </div>
            <button onClick={() => setStep("home")} style={{ background: "rgba(91,33,182,0.055)", border: "1px solid rgba(196,181,253,0.34)", borderRadius: 99, padding: "8px 18px", color: "#7c3aed", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginRight: 32 }}>
              Refine search
            </button>
          </div>

          {results.length === 0
            ? <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#c4b5fd", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>No results</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b" }}>Nothing matched your filters</div>
                <div style={{ fontSize: 13, color: "#a0a8b8", marginTop: 6 }}>Try widening your price range or choosing a different city.</div>
              </div>
            : <ResultsCarousel results={results}/>
          }
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input::placeholder { color: #ddd5fe; }
        select option { background: #fff; color: #1e1b4b; }
        ::-webkit-scrollbar { height: 0; width: 0; }
        @keyframes blobDrift { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(16px,-12px) scale(1.03)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulseGlow { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes smokeUp { 0%{opacity:0.75;transform:translateY(0) scale(1)} 100%{opacity:0;transform:translateY(-22px) scale(2.4)} }
        @keyframes sparkleAnim { 0%,100%{opacity:0;transform:scale(0.4)} 50%{opacity:1;transform:scale(1)} }
      `}</style>
    </div>
  );
}

const lbl = { display: "block", fontSize: 10, fontWeight: 700, color: "#c4b5fd", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 7 };