"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { useState } from "react";

/* ── inline icons ─────────────────────────────────────────────────────────── */
const IconUser = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const IconMail = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconLock = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const IconEye = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconEyeOff = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
    <line x1="2" x2="22" y1="2" y2="22" />
  </svg>
);
const IconGoogle = () => (
  <svg width="17" height="17" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);
const IconCompass = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const IconMapPin = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconShield = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/* ── strength bar ─────────────────────────────────────────────────────────── */
function StrengthBar({ password }) {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (password.length >= 12) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const colors = ["", "#ef4444", "#f97316", "#eab308", "#06b6d4", "#0891b2"];
  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  if (!password) return null;
  return (
    <div style={{ marginTop: 6 }}>
      <div style={{ display: "flex", gap: 3 }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: 2,
              background: i <= score ? colors[score] : "rgba(6,182,212,0.12)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <span
        style={{
          fontSize: 10.5,
          color: colors[score],
          fontWeight: 600,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          marginTop: 3,
          display: "block",
        }}
      >
        {labels[score]}
      </span>
    </div>
  );
}

/* ── stat pill ────────────────────────────────────────────────────────────── */
function StatPill({ value, label }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "10px 20px",
        background: "rgba(6,182,212,0.08)",
        border: "1px solid rgba(6,182,212,0.2)",
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: "#22d3ee",
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: 10,
          color: "rgba(186,230,253,0.5)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginTop: 3,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── destination card ─────────────────────────────────────────────────────── */
function DestCard({ emoji, name, country }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 14px",
        background: "rgba(6,182,212,0.06)",
        border: "1px solid rgba(6,182,212,0.15)",
        backdropFilter: "blur(4px)",
      }}
    >
      <span style={{ fontSize: 20 }}>{emoji}</span>
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: "rgba(186,230,253,0.85)",
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "rgba(186,230,253,0.4)",
            display: "flex",
            alignItems: "center",
            gap: 3,
          }}
        >
          <IconMapPin />
          {country}
        </div>
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────────────────────── */
export default function WanderlustSignup() {
  const [showPw, setShowPw] = useState(false);
  const [pw, setPw] = useState("");

  const handleFormAction = async (formData) => {
    const userInfo = Object.fromEntries(formData.entries());

    const { name, email, password } = userInfo;
    console.log(userInfo);

    const { data, error } = await authClient.signUp.email({
      name: name, // required
      email: email, // required
      password: password, // required
    });

    if (data) {
      // console.log("signup successfull");
      redirect("/login");
    }
    if (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,600&family=Outfit:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
          background: #04151f;
          font-family: 'Outfit', sans-serif;
          min-height: 100vh;
        }

        .page {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        /* ── LEFT ── */
        .left {
          position: relative;
          background: linear-gradient(160deg, #042c53 0%, #0a2a3a 50%, #04151f 100%);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 48px 52px;
        }

        /* grid overlay */
        .left::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(6,182,212,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.06) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        /* glow */
        .left::after {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6,182,212,0.14) 0%, transparent 65%);
          bottom: -200px; right: -200px;
          pointer-events: none;
        }

        .brand {
          display: flex; align-items: center; gap: 10px;
          z-index: 1;
        }
        .brand-icon {
          width: 36px; height: 36px;
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          display: flex; align-items: center; justify-content: center;
          color: #04151f;
        }
        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #fff;
          letter-spacing: 0.03em;
        }
        .brand-name span { color: #22d3ee; }

        .hero { z-index: 1; }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 18px;
        }
        .eyebrow-line { width: 32px; height: 1px; background: #06b6d4; }
        .eyebrow-text {
          font-size: 11px; font-weight: 500;
          color: #22d3ee;
          letter-spacing: 0.18em; text-transform: uppercase;
        }
        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(34px, 3.2vw, 52px);
          line-height: 1.12;
          color: #fff;
          margin-bottom: 18px;
        }
        .hero-title em {
          font-style: italic;
          color: #22d3ee;
          display: block;
        }
        .hero-desc {
          font-size: 14px;
          color: rgba(186,230,253,0.5);
          line-height: 1.75;
          font-weight: 300;
          max-width: 360px;
          margin-bottom: 32px;
        }

        .stats {
          display: flex; gap: 2px;
          margin-bottom: 36px;
        }

        .dest-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2px;
        }

        /* ── RIGHT ── */
        .right {
          background: #0a1929;
          display: flex; align-items: center; justify-content: center;
          padding: 48px 40px;
          border-left: 1px solid rgba(6,182,212,0.1);
        }

        .form-card {
          width: 100%;
          max-width: 400px;
        }

        .form-header { margin-bottom: 28px; }
        .form-header h2 {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          color: #fff;
          letter-spacing: -0.01em;
          margin-bottom: 6px;
        }
        .form-header h2 span { color: #22d3ee; font-style: italic; }
        .form-header p {
          font-size: 13px;
          color: rgba(186,230,253,0.4);
          font-weight: 300;
        }
        .form-header p a {
          color: #22d3ee; text-decoration: none; font-weight: 500;
        }
        .form-header p a:hover { text-decoration: underline; }

        /* google btn */
        .google-btn {
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          padding: 11px 20px;
          background: rgba(6,182,212,0.05);
          border: 1px solid rgba(6,182,212,0.2);
          color: rgba(186,230,253,0.75);
          font-size: 13px; font-weight: 500;
          font-family: 'Outfit', sans-serif;
          cursor: pointer;
          transition: all 0.18s;
          margin-bottom: 24px;
        }
        .google-btn:hover {
          background: rgba(6,182,212,0.1);
          border-color: rgba(6,182,212,0.4);
          color: #fff;
        }

        .divider {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 24px;
        }
        .div-line { flex: 1; height: 1px; background: rgba(6,182,212,0.12); }
        .div-text {
          font-size: 11px; color: rgba(186,230,253,0.25);
          letter-spacing: 0.1em; text-transform: uppercase;
        }

        /* section label */
        .section-label {
          font-size: 10px; font-weight: 600;
          color: rgba(6,182,212,0.5);
          letter-spacing: 0.14em; text-transform: uppercase;
          margin-bottom: 16px;
        }

        .field-group { display: flex; flex-direction: column; gap: 14px; }

        .field { display: flex; flex-direction: column; gap: 5px; }

        label {
          font-size: 12px; font-weight: 500;
          color: rgba(186,230,253,0.55);
          display: flex; align-items: center; gap: 3px;
        }
        label .req { color: #06b6d4; }

        .input-wrap { position: relative; display: flex; align-items: center; }
        .in-icon {
          position: absolute; left: 12px;
          color: rgba(6,182,212,0.4);
          display: flex; pointer-events: none;
        }
        input[type=text], input[type=email], input[type=password] {
          width: 100%;
          padding: 10px 12px 10px 36px;
          background: rgba(6,182,212,0.05);
          border: 1px solid rgba(6,182,212,0.15);
          color: #e0f2fe;
          font-size: 13.5px;
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          outline: none;
          transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
          border-radius: 0;
        }
        input::placeholder { color: rgba(186,230,253,0.18); }
        input:focus {
          border-color: rgba(6,182,212,0.55);
          background: rgba(6,182,212,0.08);
          box-shadow: 0 0 0 3px rgba(6,182,212,0.1);
        }
        .eye-toggle {
          position: absolute; right: 12px;
          background: none; border: none;
          color: rgba(6,182,212,0.3);
          cursor: pointer; display: flex; padding: 0;
          transition: color 0.15s;
        }
        .eye-toggle:hover { color: #22d3ee; }

        .field-hint {
          font-size: 11px; color: rgba(186,230,253,0.25); line-height: 1.5;
        }

        /* terms */
        .terms {
          margin-top: 18px;
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 12px; color: rgba(186,230,253,0.35); line-height: 1.5;
        }
        .terms input[type=checkbox] {
          width: 14px; min-width: 14px; height: 14px;
          padding: 0; margin-top: 2px;
          accent-color: #06b6d4;
        }
        .terms a { color: #22d3ee; text-decoration: none; }
        .terms a:hover { text-decoration: underline; }

        /* submit */
        .submit-btn {
          margin-top: 22px;
          width: 100%;
          display: flex; align-items: center; justify-content: center; gap: 9px;
          padding: 13px 24px;
          background: #06b6d4;
          border: none;
          color: #042c53;
          font-size: 13px; font-weight: 700;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.1em; text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s;
        }
        .submit-btn:hover {
          background: #22d3ee;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(6,182,212,0.3);
        }
        .submit-btn:active { transform: none; }

        .security-note {
          display: flex; align-items: center; justify-content: center; gap: 5px;
          margin-top: 16px;
          font-size: 11px; color: rgba(186,230,253,0.2);
        }
        .security-note svg { opacity: 0.45; }

        /* ── responsive ── */
        @media (max-width: 820px) {
          .page { grid-template-columns: 1fr; }
          .left { display: none; }
          .right {
            padding: 40px 20px;
            align-items: flex-start;
            padding-top: 60px;
            min-height: 100vh;
          }
        }
      `}</style>

      <div className="page">
        {/* ═══ LEFT ═══ */}
        <div className="left">
          <div className="brand">
            <div className="brand-icon">
              <IconCompass />
            </div>
            <span className="brand-name">
              Wander<span>last</span>
            </span>
          </div>

          <div className="hero">
            <div className="hero-eyebrow">
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Your journey begins here</span>
            </div>
            <h1 className="hero-title">
              Discover Your
              <br />
              <em>Next Adventure</em>
            </h1>
            <p className="hero-desc">
              Explore breathtaking destinations and create unforgettable
              memories with our curated travel experiences. Join thousands of
              explorers worldwide.
            </p>

            <div className="stats">
              <StatPill value="40K+" label="Travelers" />
              <StatPill value="120+" label="Destinations" />
              <StatPill value="4.9★" label="Rating" />
            </div>

            <div className="dest-grid">
              <DestCard emoji="🏔️" name="Banff" country="Canada" />
              <DestCard emoji="🏛️" name="Santorini" country="Greece" />
              <DestCard emoji="🌿" name="Bali" country="Indonesia" />
              <DestCard emoji="🏜️" name="Sahara" country="Morocco" />
            </div>
          </div>

          {/* empty div to push hero down a bit */}
          <div />
        </div>

        {/* ═══ RIGHT ═══ */}
        <div className="right">
          <form action={handleFormAction} className="form-card">
            <div className="form-header">
              <h2>
                Start <span>Exploring</span>
              </h2>
              <p>
                Already a traveler? <a href="#">Sign in</a>
              </p>
            </div>

            {/* Google */}
            <button className="google-btn" type="button">
              <IconGoogle />
              Continue with Google
            </button>

            <div className="divider">
              <div className="div-line" />
              <span className="div-text">or with email</span>
              <div className="div-line" />
            </div>

            {/* fields */}
            <div className="section-label">Profile details</div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="name">
                  Full name <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <span className="in-icon">
                    <IconUser />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="email">
                  Email address <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <span className="in-icon">
                    <IconMail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="password">
                  Password <span className="req">*</span>
                </label>
                <div className="input-wrap">
                  <span className="in-icon">
                    <IconLock />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    style={{ paddingRight: 38 }}
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                <StrengthBar password={pw} />
                <span className="field-hint">
                  Min 8 chars · 1 uppercase · 1 number
                </span>
              </div>
            </div>

            {/* terms */}
            <div className="terms">
              <input type="checkbox" id="terms" />
              <label
                htmlFor="terms"
                style={{
                  fontSize: 12,
                  color: "rgba(186,230,253,0.35)",
                  fontWeight: 400,
                }}
              >
                I agree to the <a href="#">Terms of Service</a> and{" "}
                <a href="#">Privacy Policy</a>
              </label>
            </div>

            {/* submit */}
            <button type="submit" className="submit-btn">
              <IconCompass />
              Create Account
            </button>

            <div className="security-note">
              <IconShield /> 256-bit SSL encrypted · Safe & secure
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
