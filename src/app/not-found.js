"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const [angle, setAngle] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 0.5) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16"
      style={{ background: "#0a2a3a" }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(6,182,212,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Mountain silhouette */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-15">
        <svg
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-20"
        >
          <polygon
            points="0,120 180,40 300,75 500,10 680,55 860,20 1050,60 1200,35 1200,120"
            fill="#06b6d4"
          />
        </svg>
      </div>

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(6,182,212,0.06), transparent)",
        }}
      />

      {/* Compass */}
      <div className="relative w-32 h-32 mb-6">
        <svg
          viewBox="0 0 130 130"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <circle
            cx="65"
            cy="65"
            r="58"
            fill="none"
            stroke="rgba(6,182,212,0.2)"
            strokeWidth="1"
          />
          <circle
            cx="65"
            cy="65"
            r="50"
            fill="rgba(6,182,212,0.06)"
            stroke="rgba(6,182,212,0.4)"
            strokeWidth="0.75"
          />
          <text
            x="65"
            y="23"
            textAnchor="middle"
            fontSize="11"
            fill="#06b6d4"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            N
          </text>
          <text
            x="65"
            y="112"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(186,230,253,0.45)"
            fontFamily="sans-serif"
          >
            S
          </text>
          <text
            x="110"
            y="69"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(186,230,253,0.45)"
            fontFamily="sans-serif"
          >
            E
          </text>
          <text
            x="20"
            y="69"
            textAnchor="middle"
            fontSize="11"
            fill="rgba(186,230,253,0.45)"
            fontFamily="sans-serif"
          >
            W
          </text>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 65 + 46 * Math.sin(rad);
            const y1 = 65 - 46 * Math.cos(rad);
            const x2 = 65 + 50 * Math.sin(rad);
            const y2 = 65 - 50 * Math.cos(rad);
            return (
              <line
                key={deg}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(6,182,212,0.3)"
                strokeWidth="1"
              />
            );
          })}
          <g
            style={{
              transform: `rotate(${angle}deg)`,
              transformOrigin: "65px 65px",
            }}
          >
            <polygon points="65,20 68,62 65,65 62,62" fill="#06b6d4" />
            <polygon
              points="65,110 68,68 65,65 62,68"
              fill="rgba(186,230,253,0.25)"
            />
          </g>
          <circle
            cx="65"
            cy="65"
            r="4"
            fill="#0a2a3a"
            stroke="#06b6d4"
            strokeWidth="1.5"
          />
          <circle cx="65" cy="65" r="2" fill="#06b6d4" />
        </svg>
      </div>

      {/* 404 */}
      <h1
        className="text-8xl font-bold text-cyan-400 leading-none mb-2 tracking-tight"
        style={{ textShadow: "0 0 40px rgba(6,182,212,0.3)" }}
      >
        404
      </h1>

      {/* Badge */}
      <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs px-3 py-1 uppercase tracking-widest mb-5">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        Destination Not Found
      </div>

      <h2 className="text-2xl font-medium text-blue-50 text-center mb-2">
        Lost in the Journey?
      </h2>
      <p className="text-sm text-blue-200/60 text-center max-w-sm leading-relaxed mb-8">
        Looks like this destination doesn&apos;t exist on our map. The page may
        have moved or the adventure has ended.
      </p>

      {/* Search */}
      <div className="flex items-center w-full max-w-sm border border-cyan-500/30 bg-white/5 mb-7 overflow-hidden">
        <svg
          className="w-4 h-4 text-blue-300/50 ml-3 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search destinations..."
          className="flex-1 bg-transparent text-blue-50 text-sm px-3 py-2.5 outline-none placeholder-blue-300/35"
        />
        <button className="bg-cyan-500 hover:bg-cyan-400 text-[#042c53] px-3 py-2.5 transition-colors cursor-pointer">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 flex-wrap justify-center mb-8">
        <Link
          href="/"
          className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-[#042c53] font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
        <Link
          href="/destinations"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-blue-100 border border-blue-200/30 font-medium text-xs uppercase tracking-widest px-5 py-3 transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          View Destinations
        </Link>
      </div>

      {/* Quick links */}
      <div className="flex gap-2 flex-wrap justify-center">
        {[
          { label: "Beaches", icon: "🏖️", href: "/beaches" },
          { label: "Mountains", icon: "🏔️", href: "/mountains" },
          { label: "Cities", icon: "🏙️", href: "/cities" },
          { label: "Flights", icon: "✈️", href: "/flights" },
        ].map(({ label, icon, href }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-1.5 bg-white/5 hover:bg-cyan-500/15 border border-blue-200/15 hover:border-cyan-500/35 text-blue-200/65 hover:text-cyan-300 text-xs px-3 py-1.5 transition-all"
          >
            <span>{icon}</span>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
