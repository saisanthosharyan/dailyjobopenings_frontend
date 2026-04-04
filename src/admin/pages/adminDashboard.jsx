import { useEffect, useState } from "react";
import AdminNavbar from "../components/adminnavbar";

const S = {
  primary: "#0f4c81", accent: "#e8472a", gold: "#f5a623",
  light: "#f4f7fb", green: "#16a34a", text: "#1a1a2e",
  muted: "#6b7280", border: "#e2e8f0",
};

const stats = [
  { label: "Total Jobs",  value: "48",  sub: "12 active",        dot: S.green   },
  { label: "Applicants",  value: "312", sub: "28 new today",     dot: S.primary },
  { label: "Open Roles",  value: "7",   sub: "3 closing soon",   dot: S.gold    },
  { label: "Admins",      value: "5",   sub: "1 pending invite", dot: S.accent  },
];

const activity = [
  { icon: "📝", title: "Senior Frontend Developer",   sub: "Job posted by admin@company.com",       status: "Live",    bg: "#f0fdf4", color: "#16a34a", time: "2m ago"  },
  { icon: "👤", title: "New applicant — Arjun Sharma", sub: "Applied for Backend Engineer",          status: "New",     bg: "#e8f4fd", color: "#0f4c81", time: "14m ago" },
  { icon: "🔒", title: "Product Manager",              sub: "Role closed by admin@hr.com",           status: "Closed",  bg: "#fff8e1", color: "#b45309", time: "1h ago"  },
  { icon: "⚠️", title: "Admin invite pending",         sub: "ops@company.com hasn't accepted yet",   status: "Pending", bg: "#fee2e2", color: "#b91c1c", time: "3h ago"  },
];

const cards = [
  { icon: "📋", iconBg: "#e8f4fd", title: "Manage Jobs",   desc: "View, update, and close existing job listings.",   role: null          },
  { icon: "✏️", iconBg: "#f0fdf4", title: "Create Job",    desc: "Post new openings and set application deadlines.", role: null          },
  { icon: "👥", iconBg: "#fff8e1", title: "Manage Admins", desc: "Add, update, or remove admin accounts.",           role: "super_admin"  },
];

export default function Dashboard() {
  const admin = JSON.parse(localStorage.getItem("adminInfo"));
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(new Date().toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric", year: "numeric",
    }));
  }, []);

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: S.light, fontFamily: "'DM Sans', sans-serif", color: S.text, overflowX: "hidden" }}>
      <style>{`
               @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');

        /* ── HARD RESET ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { width: 100% !important; margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; background: #f4f7fb !important; }
        #root { width: 100% !important; overflow-x: hidden !important; }

        /* ── Full-width sections ── */
        .section-full  { width: 100%; }
        .section-inner { width: 100%; padding: 0 clamp(16px, 4vw, 40px); box-sizing: border-box; }

        /* ── Welcome ── */
        .welcome       { display:flex; align-items:flex-start; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom: clamp(20px,3vw,28px); }
        .welcome h2    { font-family:'Syne',sans-serif; font-size:clamp(17px,2.5vw,22px); font-weight:800; letter-spacing:-0.4px; margin:0; color:${S.text}; }
        .welcome p     { font-size:13px; color:${S.muted}; margin-top:3px; }
        .date-chip     { font-size:11px; color:${S.muted}; background:#fff; border:1px solid ${S.border}; padding:5px 12px; border-radius:20px; font-family:monospace; white-space:nowrap; }

        /* ── Stats ── */
        .stats-grid    { display:grid; grid-template-columns:repeat(4,1fr); gap:clamp(10px,1.5vw,16px); margin-bottom:clamp(20px,3vw,28px); }
        .stat-card     { background:#fff; border:1px solid ${S.border}; border-radius:12px; padding:clamp(14px,2vw,20px); box-shadow:0 1px 3px rgba(0,0,0,.05); }
        .stat-label    { font-size:10px; font-weight:700; color:${S.muted}; text-transform:uppercase; letter-spacing:.7px; margin-bottom:8px; }
        .stat-value    { font-family:'Syne',sans-serif; font-size:clamp(22px,3vw,30px); font-weight:800; letter-spacing:-.5px; color:${S.text}; }
        .stat-sub      { font-size:12px; color:${S.muted}; margin-top:5px; display:flex; align-items:center; gap:5px; }
        .dot           { width:6px; height:6px; border-radius:50%; display:inline-block; flex-shrink:0; }

        /* ── Section label ── */
        .sec-label     { font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:${S.text}; margin-bottom:12px; display:flex; align-items:center; gap:8px; }
        .sec-label::before { content:''; width:4px; height:18px; background:${S.accent}; border-radius:3px; display:inline-block; }

        /* ── Action Cards ── */
        .cards-grid    { display:grid; grid-template-columns:repeat(3,1fr); gap:clamp(10px,1.5vw,16px); margin-bottom:clamp(20px,3vw,28px); }
        .act-card      { background:#fff; border:1px solid ${S.border}; border-radius:12px; padding:clamp(16px,2vw,22px); cursor:pointer; display:flex; flex-direction:column; gap:10px; box-shadow:0 1px 3px rgba(0,0,0,.05); transition:box-shadow .2s,transform .2s,border-color .2s; }
        .act-card:hover{ box-shadow:0 4px 14px rgba(15,76,129,.1); transform:translateY(-2px); border-color:#bdd6f0; }
        .card-icon     { width:38px; height:38px; border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0; }
        .card-title    { font-family:'Syne',sans-serif; font-size:14px; font-weight:700; color:${S.text}; margin:0; }
        .card-desc     { font-size:12px; color:${S.muted}; margin-top:4px; line-height:1.55; }
        .card-arrow    { margin-top:auto; font-size:11.5px; color:${S.primary}; font-weight:700; }

        /* ── Activity Panel ── */
        .panel         { background:#fff; border:1px solid ${S.border}; border-radius:12px; box-shadow:0 1px 3px rgba(0,0,0,.05); overflow:hidden; }
        .panel-hdr     { padding:14px clamp(14px,2vw,20px); border-bottom:1px solid ${S.border}; display:flex; align-items:center; justify-content:space-between; }
        .panel-hdr span{ font-family:'Syne',sans-serif; font-size:13px; font-weight:700; color:${S.text}; }
        .panel-hdr a   { font-size:12px; color:${S.primary}; font-weight:600; text-decoration:none; }
        .act-row       { display:flex; align-items:center; gap:clamp(10px,1.5vw,16px); padding:13px clamp(14px,2vw,20px); border-bottom:1px solid ${S.border}; transition:background .15s; }
        .act-row:last-child { border-bottom:none; }
        .act-row:hover { background:${S.light}; }
        .act-icon      { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:15px; flex-shrink:0; }
        .act-info      { flex:1; min-width:0; }
        .act-info strong { font-size:13px; font-weight:500; display:block; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:${S.text}; }
        .act-info span   { font-size:12px; color:${S.muted}; }
        .pill          { font-size:10px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; padding:2px 9px; border-radius:20px; white-space:nowrap; flex-shrink:0; }
        .act-time      { font-size:11px; color:${S.muted}; font-family:monospace; white-space:nowrap; flex-shrink:0; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .stats-grid  { grid-template-columns: repeat(2,1fr); }
          .cards-grid  { grid-template-columns: repeat(2,1fr); }
        }
        @media (max-width: 600px) {
          .cards-grid  { grid-template-columns: 1fr; }
          .act-time    { display: none; }
          .welcome     { flex-direction: column; }
        }
        @media (max-width: 400px) {
          .stats-grid  { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Navbar: full width ── */}
      <div className="section-full">
        <AdminNavbar />
      </div>

      {/* ── Hero Banner ── */}
      <div className="section-full" style={{ background: `linear-gradient(135deg, ${S.primary} 0%, #1565c0 60%, #0d47a1 100%)`, color: "#fff", padding: "clamp(24px,4vw,40px) 0" }}>
        <div className="section-inner">
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.2rem,3vw,1.8rem)", fontWeight: 800, marginBottom: 6 }}>
            Welcome back, <span style={{ color: S.gold }}>{admin?.email}</span>
          </h1>
          <p style={{ fontSize: 13.5, opacity: 0.85 }}>
            {date} · Role: <span style={{ background: "rgba(255,255,255,.15)", padding: "2px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.4 }}>{admin?.role ?? "admin"}</span>
          </p>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="section-full">
        <div className="section-inner" style={{ paddingTop: "clamp(20px,3vw,32px)", paddingBottom: 48 }}>

          {/* Stats */}
          <div className="sec-label">Overview</div>
          <div className="stats-grid">
            {stats.map((st) => (
              <div key={st.label} className="stat-card">
                <div className="stat-label">{st.label}</div>
                <div className="stat-value">{st.value}</div>
                <div className="stat-sub">
                  <span className="dot" style={{ background: st.dot }} />
                  {st.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Action Cards */}
          <div className="sec-label">Quick Actions</div>
          <div className="cards-grid">
            {cards
              .filter((c) => !c.role || admin?.role === c.role)
              .map((c) => (
                <div key={c.title} className="act-card">
                  <div className="card-icon" style={{ background: c.iconBg }}>{c.icon}</div>
                  <div>
                    <h3 className="card-title">{c.title}</h3>
                    <p className="card-desc">{c.desc}</p>
                  </div>
                  <div className="card-arrow">Open →</div>
                </div>
              ))}
          </div>

          {/* Activity */}
          <div className="sec-label">Recent Activity</div>
          <div className="panel">
            <div className="panel-hdr">
              <span>Latest Updates</span>
              <a href="#">View all →</a>
            </div>
            {activity.map((a) => (
              <div key={a.title} className="act-row">
                <div className="act-icon" style={{ background: a.bg }}>{a.icon}</div>
                <div className="act-info">
                  <strong>{a.title}</strong>
                  <span>{a.sub}</span>
                </div>
                <span className="pill" style={{ background: a.bg, color: a.color }}>{a.status}</span>
                <span className="act-time">{a.time}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}