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

  const tailwindColors = [
    "",
    "bg-red-500 text-red-500",
    "bg-orange-500 text-orange-500",
    "bg-yellow-500 text-yellow-500",
    "bg-cyan-500 text-cyan-500",
    "bg-cyan-600 text-cyan-600",
  ];

  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  if (!password) return null;

  return (
    <div className="mt-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`flex-1 h-0.5 transition-colors duration-300 ${
              i <= score
                ? tailwindColors[score].split(" ")[0]
                : "bg-cyan-500/12"
            }`}
          />
        ))}
      </div>
      <span
        className={`block text-[10.5px] font-semibold tracking-wider uppercase mt-1 ${
          tailwindColors[score].split(" ")[1]
        }`}
      >
        {labels[score]}
      </span>
    </div>
  );
}

/* ── stat pill ────────────────────────────────────────────────────────────── */
function StatPill({ value, label }) {
  return (
    <div className="flex flex-col items-center py-2.5 px-5 bg-cyan-500/[0.08] border border-cyan-500/20">
      <span className="text-[22px] font-bold text-cyan-400 font-serif leading-none">
        {value}
      </span>
      <span className="text-[10px] text-sky-200/50 tracking-widest uppercase mt-0.5">
        {label}
      </span>
    </div>
  );
}

/* ── destination card ─────────────────────────────────────────────────────── */
function DestCard({ emoji, name, country }) {
  return (
    <div className="flex items-center gap-2.5 py-2 px-3.5 bg-cyan-500/[0.06] border border-cyan-500/15 backdrop-blur-[4px]">
      <span className="text-[20px]">{emoji}</span>
      <div>
        <div className="text-[12px] font-semibold text-sky-200/85">{name}</div>
        <div className="text-[10px] text-sky-200/40 flex items-center gap-0.5">
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
      name: name,
      email: email,
      password: password,
    });

    if (data) {
      redirect("/login");
    }
    if (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-[#04151f] font-sans min-h-screen antialiased selection:bg-cyan-500/30">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* ═══ LEFT ═══ */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-[#042c53] via-[#0a2a3a] to-[#04151f] overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(6,182,212,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.06)_1px,transparent_1px)] before:bg-[size:48px_48px] before:pointer-events-none after:content-[''] after:absolute after:w-[600px] after:h-[600px] after:rounded-full after:bg-[radial-gradient(circle,rgba(6,182,212,0.14)_0%,transparent_65%)] after:-bottom-[200px] after:-right-[200px] after:pointer-events-none">
          <div className="flex items-center gap-2.5 z-10">
            <div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-[#04151f]">
              <IconCompass />
            </div>
            <span className="font-serif text-[22px] text-white tracking-wide">
              Wander<span className="text-cyan-400">last</span>
            </span>
          </div>

          <div className="z-10">
            <div className="flex items-center gap-2 mb-4.5">
              <div className="w-8 h-px bg-cyan-500" />
              <span className="text-[11px] font-medium text-cyan-400 tracking-[0.18em] uppercase">
                Your journey begins here
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-white leading-[1.12] mb-4.5">
              Discover Your
              <br />
              <em className="not-italic text-cyan-400 block mt-1">
                Next Adventure
              </em>
            </h1>
            <p className="text-[14px] text-sky-200/50 leading-relaxed font-light max-w-[360px] mb-8">
              Explore breathtaking destinations and create unforgettable
              memories with our curated travel experiences. Join thousands of
              explorers worldwide.
            </p>

            <div className="flex gap-[2px] mb-9">
              <StatPill value="40K+" label="Travelers" />
              <StatPill value="120+" label="Destinations" />
              <StatPill value="4.9★" label="Rating" />
            </div>

            <div className="grid grid-cols-2 gap-[2px]">
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
        <div className="bg-[#0a1929] flex items-center justify-center p-5 sm:p-10 md:p-12 border-t md:border-t-0 md:border-l border-cyan-500/10 min-h-screen">
          <form action={handleFormAction} className="w-100 max-w-[400px]">
            <div className="mb-7">
              <h2 className="font-serif text-3xl text-white tracking-tight mb-1.5">
                Start{" "}
                <span className="text-cyan-400 not-italic">Exploring</span>
              </h2>
              <p className="text-[13px] text-sky-200/40 font-light">
                Already a traveler?{" "}
                <a
                  href="#"
                  className="text-cyan-400 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </div>

            {/* Google */}
            <button
              className="w-100 flex items-center justify-center gap-2.5 py-[11px] px-5 bg-cyan-500/[0.05] border border-cyan-500/20 text-sky-200/75 text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-white mb-6"
              type="button"
            >
              <IconGoogle />
              Continue with Google
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex-1 h-px bg-cyan-500/12" />
              <span className="text-[11px] color text-sky-200/25 tracking-wider uppercase">
                or with email
              </span>
              <div className="flex-1 h-px bg-cyan-500/12" />
            </div>

            {/* fields */}
            <div className="text-[10px] font-semibold text-cyan-500/50 tracking-[0.14em] uppercase mb-4">
              Profile details
            </div>
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-[12px] font-medium text-sky-200/55 flex items-center gap-0.5"
                >
                  Full name <span className="text-cyan-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/40 flex pointer-events-none">
                    <IconUser />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-100 py-2.5 pl-9 pr-3 bg-cyan-500/[0.05] border border-cyan-500/15 text-sky-100 text-[13.5px] font-light outline-none transition-all duration-200 placeholder:text-sky-200/18 rounded-none focus:border-cyan-500/55 focus:bg-cyan-500/[0.08] focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-[12px] font-medium text-sky-200/55 flex items-center gap-0.5"
                >
                  Email address <span className="text-cyan-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/40 flex pointer-events-none">
                    <IconMail />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    className="w-100 py-2.5 pl-9 pr-3 bg-cyan-500/[0.05] border border-cyan-500/15 text-sky-100 text-[13.5px] font-light outline-none transition-all duration-200 placeholder:text-sky-200/18 rounded-none focus:border-cyan-500/55 focus:bg-cyan-500/[0.08] focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="password"
                  className="text-[12px] font-medium text-sky-200/55 flex items-center gap-0.5"
                >
                  Password <span className="text-cyan-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/40 flex pointer-events-none">
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
                    className="w-100 py-2.5 pl-9 pr-9 bg-cyan-500/[0.05] border border-cyan-500/15 text-sky-100 text-[13.5px] font-light outline-none transition-all duration-200 placeholder:text-sky-200/18 rounded-none focus:border-cyan-500/55 focus:bg-cyan-500/[0.08] focus:ring-4 focus:ring-cyan-500/10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 bg-none border-none text-cyan-500/30 cursor-pointer flex p-0 transition-colors duration-150 hover:text-cyan-400"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                  >
                    {showPw ? <IconEyeOff /> : <IconEye />}
                  </button>
                </div>
                <StrengthBar password={pw} />
                <span className="text-[11px] text-sky-200/25 leading-normal">
                  Min 8 chars · 1 uppercase · 1 number
                </span>
              </div>
            </div>

            {/* terms */}
            <div className="mt-4.5 flex items-start gap-2 text-[12px] text-sky-200/35 leading-normal">
              <input
                type="checkbox"
                id="terms"
                className="w-3.5 h-3.5 p-0 mt-0.5 accent-cyan-500 shrink-0"
              />
              <label
                htmlFor="terms"
                className="text-[12px] text-sky-200/35 font-light"
              >
                I agree to the{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-cyan-400 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* submit */}
            <button
              type="submit"
              className="mt-5.5 w-100 flex items-center justify-center gap-2 py-3 px-6 bg-cyan-500 text-[#042c53] text-[13px] font-bold tracking-wider uppercase cursor-pointer transition-all duration-200 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(6,182,212,0.3)] active:translate-y-0 active:shadow-none"
            >
              <IconCompass />
              Create Account
            </button>

            <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-sky-200/20">
              <span className="opacity-45">
                <IconShield />
              </span>{" "}
              256-bit SSL encrypted · Safe & secure
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
