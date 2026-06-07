import {
  Search,
  Zap,
  Heart,
  Home,
  User,
  Timer,
} from "lucide-react";

/* iOS-style status bar glyphs (signal / wifi / battery) — kept as inline SVG
   to match the reference exactly; these are decorative, not lucide icons. */
function StatusBar() {
  return (
    <div className="pstat">
      <span>9:41</span>
      <span className="sig">
        <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor">
          <rect x="0" y="7" width="3" height="4" rx="1" />
          <rect x="4.5" y="5" width="3" height="6" rx="1" />
          <rect x="9" y="2.5" width="3" height="8.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="11" rx="1" />
        </svg>
        <svg width="15" height="11" viewBox="0 0 15 12" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M1 4.5a9 9 0 0 1 13 0M3.5 7a5.5 5.5 0 0 1 8 0" />
          <circle cx="7.5" cy="10" r="0.6" fill="currentColor" />
        </svg>
        <svg width="24" height="11" viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="1" y="1" width="20" height="10" rx="3" />
          <rect x="3" y="3" width="14" height="6" rx="1.5" fill="currentColor" />
          <rect x="22.5" y="4" width="2" height="4" rx="1" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

/* CARD 1 — Website (browser frame) */
export function WebsiteCard() {
  return (
    <>
      <div className="brow">
        <i></i>
        <i></i>
        <i></i>
        <span className="u">nova.studio</span>
      </div>
      <div style={{ padding: "18px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 12 }}>
            <span style={{ width: 18, height: 18, borderRadius: 6, background: "var(--green)", display: "grid", placeItems: "center", color: "#06210f", fontSize: 11 }}>
              N
            </span>
            Nova
          </div>
          <div style={{ display: "flex", gap: 11, fontSize: 9, color: "#9aa0a4" }}>
            <span>Product</span>
            <span>Pricing</span>
            <span>Docs</span>
          </div>
        </div>
        <div className="fh" style={{ fontSize: 26, lineHeight: 1.05, marginTop: 30 }}>
          Ship your idea <span className="grn">faster.</span>
        </div>
        <div className="mut" style={{ fontSize: 10, marginTop: 9, lineHeight: 1.55 }}>
          The all-in-one platform to design, build and launch modern products in days.
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <span className="gpill" style={{ height: 30, padding: "0 16px", fontSize: 10 }}>
            Get started
          </span>
          <span style={{ height: 30, padding: "0 14px", fontSize: 10, border: "1px solid rgba(0,0,0,.14)", borderRadius: 999, display: "inline-flex", alignItems: "center", color: "#3a423c" }}>
            Watch demo
          </span>
        </div>
        <div style={{ marginTop: 18, borderRadius: 13, height: 124, background: "linear-gradient(150deg,#f3f5f4,#e9ece9)", border: "1px solid rgba(0,0,0,.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 14, right: 14, top: 14, height: 7, borderRadius: 4, background: "rgba(0,0,0,.07)" }}></div>
          <div style={{ position: "absolute", left: 14, top: 29, width: "62%", height: 7, borderRadius: 4, background: "rgba(0,0,0,.05)" }}></div>
          <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, display: "flex", gap: 8 }}>
            <span style={{ flex: 1, height: 38, borderRadius: 8, background: "rgba(76,196,106,.18)", border: "1px solid rgba(76,196,106,.34)" }}></span>
            <span style={{ flex: 1, height: 38, borderRadius: 8, background: "rgba(0,0,0,.05)" }}></span>
            <span style={{ flex: 1, height: 38, borderRadius: 8, background: "rgba(0,0,0,.05)" }}></span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, color: "#aab0aa", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 11 }}>
          <span>stripe</span>
          <span>linear</span>
          <span>vercel</span>
          <span>notion</span>
        </div>
      </div>
    </>
  );
}

/* CARD 2 — Mobile app (phone) */
export function MobileCard() {
  return (
    <>
      <StatusBar />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="mut" style={{ fontSize: 10 }}>Good morning</div>
            <div className="fh" style={{ fontSize: 19 }}>Discover</div>
          </div>
          <span style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,var(--green),#1c6e3a)" }}></span>
        </div>
        <div style={{ marginTop: 14, height: 38, borderRadius: 11, background: "#f4f6f4", border: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", gap: 9, padding: "0 12px", color: "#9aa0a4", fontSize: 11 }}>
          <Search size={14} strokeWidth={2} />
          Search…
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
          <div className="gtile" style={{ padding: 12, height: 78, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(76,196,106,.16)", display: "grid", placeItems: "center", color: "var(--green-deep)" }}>
              <Zap size={15} fill="currentColor" stroke="none" />
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 700 }}>Workouts</span>
          </div>
          <div className="gtile" style={{ padding: 12, height: 78, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(150deg,#e7f6ed,transparent)", borderColor: "rgba(76,196,106,.3)" }}>
            <span style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(76,196,106,.22)", display: "grid", placeItems: "center", color: "var(--green-deep)" }}>
              <Heart size={15} fill="currentColor" stroke="none" />
            </span>
            <span style={{ fontSize: 11.5, fontWeight: 700 }}>Health</span>
          </div>
        </div>
        <div className="gtile" style={{ marginTop: 10, padding: 12, display: "flex", alignItems: "center", gap: 11 }}>
          <span style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(76,196,106,.14)", display: "grid", placeItems: "center", color: "var(--green-deep)" }}>
            <Timer size={18} strokeWidth={2} />
          </span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11.5, fontWeight: 700 }}>Daily mindfulness</div>
            <div className="mut" style={{ fontSize: 9.5 }}>12 min · meditation</div>
          </div>
          <span className="gdot"></span>
        </div>
      </div>
      <div className="tabbar">
        <Home className="on" strokeWidth={2} />
        <Search strokeWidth={2} />
        <Heart strokeWidth={2} />
        <User strokeWidth={2} />
      </div>
    </>
  );
}

/* CARD 3 — Dashboard (browser frame) */
export function DashboardCard() {
  return (
    <>
      <div className="brow">
        <i></i>
        <i></i>
        <i></i>
        <span className="u">app.devisine.io/analytics</span>
      </div>
      <div style={{ display: "flex", height: "calc(100% - 43px)" }}>
        <div style={{ width: 46, borderRight: "1px solid rgba(0,0,0,.06)", display: "flex", flexDirection: "column", alignItems: "center", gap: 15, paddingTop: 16 }}>
          <span style={{ width: 18, height: 18, borderRadius: 6, background: "var(--green)" }}></span>
          <span style={{ width: 16, height: 16, borderRadius: 5, background: "rgba(0,0,0,.12)" }}></span>
          <span style={{ width: 16, height: 16, borderRadius: 5, background: "rgba(0,0,0,.06)" }}></span>
          <span style={{ width: 16, height: 16, borderRadius: 5, background: "rgba(0,0,0,.06)" }}></span>
        </div>
        <div style={{ flex: 1, padding: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span className="fh" style={{ fontSize: 13 }}>Revenue</span>
            <span style={{ fontSize: 8.5, color: "#828b85", border: "1px solid rgba(0,0,0,.12)", borderRadius: 6, padding: "3px 7px" }}>30d ▾</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 7, marginTop: 9 }}>
            <span className="fh" style={{ fontSize: 25 }}>$48.2k</span>
            <span className="grn" style={{ fontSize: 11, fontWeight: 700 }}>▲ 12.4%</span>
          </div>
          <svg viewBox="0 0 230 64" width="100%" height="60" preserveAspectRatio="none" style={{ marginTop: 8 }}>
            <defs>
              <linearGradient id="agc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#4cc46a" stopOpacity=".34" />
                <stop offset="1" stopColor="#4cc46a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,46 C28,40 40,21 66,27 C96,34 116,10 146,17 C178,25 200,8 230,12 L230,64 L0,64 Z" fill="url(#agc)" />
            <path d="M0,46 C28,40 40,21 66,27 C96,34 116,10 146,17 C178,25 200,8 230,12" fill="none" stroke="#2faa57" strokeWidth="2.2" />
          </svg>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <div className="gtile" style={{ flex: 1, padding: 9 }}>
              <div className="mut" style={{ fontSize: 8.5 }}>Users</div>
              <div className="fh" style={{ fontSize: 14 }}>8.4k</div>
            </div>
            <div className="gtile" style={{ flex: 1, padding: 9 }}>
              <div className="mut" style={{ fontSize: 8.5 }}>Orders</div>
              <div className="fh" style={{ fontSize: 14 }}>1,209</div>
            </div>
          </div>
          <div style={{ marginTop: 13 }}>
            {[
              { label: "Direct", color: "var(--green)", w: "74%", pct: "42%" },
              { label: "Organic", color: "#66c97f", w: "48%", pct: "29%" },
              { label: "Referral", color: "#a7d9b4", w: "30%", pct: "18%" },
            ].map((r, i) => (
              <div
                key={r.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 0",
                  borderBottom: i < 2 ? "1px solid rgba(0,0,0,.06)" : undefined,
                }}
              >
                <span style={{ width: 8, height: 8, borderRadius: 2, background: r.color }}></span>
                <span style={{ flex: 1, fontSize: 10, color: "#3a423c" }}>{r.label}</span>
                <span style={{ width: 54, height: 5, borderRadius: 3, background: "rgba(0,0,0,.08)", overflow: "hidden" }}>
                  <i style={{ display: "block", height: "100%", width: r.w, background: r.color }}></i>
                </span>
                <span className="mut" style={{ fontSize: 9 }}>{r.pct}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* CARD 4 — Maintenance / system status (phone) */
export function MaintenanceCard() {
  const bars = [
    100, 100, 88, 100, 100, 62, 100, 94, 100, 100, 78, 100, 100, 90, 100, 100,
    100, 84, 100, 100, 96, 100,
  ];
  const rows = ["API", "Website", "Database", "CDN"];
  return (
    <>
      <StatusBar />
      <div style={{ padding: "18px 16px 0" }}>
        <div className="fh" style={{ fontSize: 15 }}>System status</div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 9, background: "rgba(76,196,106,.12)", border: "1px solid rgba(76,196,106,.34)", borderRadius: 999, padding: "5px 11px" }}>
          <span className="gdot"></span>
          <span className="grn" style={{ fontSize: 10, fontWeight: 700 }}>All systems operational</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: 18 }}>
          <span className="fh grn" style={{ fontSize: 40, lineHeight: 1 }}>99.9%</span>
          <span className="mut" style={{ fontSize: 10, lineHeight: 1.3 }}>
            uptime
            <br />
            90 days
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 42, marginTop: 16 }}>
          {bars.map((h, i) => (
            <i
              key={i}
              style={{
                flex: 1,
                background: h === 62 ? "#d2d7d2" : "var(--green)",
                height: `${h}%`,
                borderRadius: 2,
              }}
            ></i>
          ))}
        </div>
        <div className="mut" style={{ fontSize: 8.5, marginTop: 6, display: "flex", justifyContent: "space-between" }}>
          <span>90 days ago</span>
          <span>today</span>
        </div>
        <div style={{ marginTop: 14 }}>
          {rows.map((r, i) => (
            <div
              key={r}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 0",
                borderBottom: i < rows.length - 1 ? "1px solid rgba(0,0,0,.06)" : undefined,
              }}
            >
              <span className="gdot"></span>
              <span style={{ flex: 1, fontSize: 11, color: "#3a423c" }}>{r}</span>
              <span className="grn" style={{ fontSize: 9.5, fontWeight: 700 }}>Operational</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* CARD 5 — Proof (no device) */
export function ProofCard() {
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "26px 22px" }}>
      <div className="mut" style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase" }}>
        Trusted by teams
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 4, marginTop: 16 }}>
        <span className="fh" style={{ fontSize: 50, lineHeight: 0.9 }}>4.8</span>
        <span className="grn" style={{ fontSize: 26, lineHeight: 1, marginTop: 2 }}>★</span>
      </div>
      <div className="fh grn" style={{ fontSize: 18, marginTop: 10 }}>20+ projects shipped</div>
      <div className="mut" style={{ fontSize: 10.5, marginTop: 9, lineHeight: 1.55 }}>
        Design &amp; engineering teams trust devisine to ship their flagship products.
      </div>
      <div style={{ height: 1, background: "rgba(0,0,0,.08)", margin: "22px 0" }}></div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div className="logo-cell">Northwind</div>
        <div className="logo-cell">Lumen</div>
        <div className="logo-cell">Apex</div>
        <div className="logo-cell">Vertex</div>
      </div>
    </div>
  );
}

export const DECK_CARDS = [
  WebsiteCard,
  MobileCard,
  DashboardCard,
  MaintenanceCard,
  ProofCard,
];
