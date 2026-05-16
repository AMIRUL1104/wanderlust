"use client";

import { authClient } from "@/lib/auth-client";

/* ── inline SVG icons ─────────────────────────────────────────────────────── */
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

const IconLogOut = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

function Profile() {
  // login session info
  const { data: session, isPending } = authClient.useSession();
  const userInfo = session?.user;
  console.log("User Info:", userInfo);

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  // Loading state handling
  if (isPending) {
    return (
      <div className="bg-[#04151f] text-cyan-400 min-h-screen flex items-center justify-center font-sans">
        <div className="flex items-center gap-2 tracking-widest text-[11px] uppercase animate-pulse">
          <IconCompass /> Loading Explorer Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#04151f] font-sans min-h-screen antialiased selection:bg-cyan-500/30 relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[linear-gradient(rgba(6,182,212,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.04)_1px,transparent_1px)] before:bg-[size:48px_48px] before:pointer-events-none">
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent,65%)] -top-[150px] -left-[150px] pointer-events-none" />

      <div className="max-w-[550px] mx-auto px-4 py-16 relative z-10">
        {/* Top Navbar Area */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-[#04151f]">
              <IconCompass />
            </div>
            <span className="font-serif text-[18px] text-white tracking-wide">
              Wander<span className="text-cyan-400">last</span>
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-red-500/20 bg-red-500/[0.04] text-[11px] font-medium uppercase tracking-wider text-red-400/80 transition-all duration-200 hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 cursor-pointer"
          >
            <IconLogOut /> Sign Out
          </button>
        </div>

        {/* Profile Info Card */}
        <div className="bg-[#0a1929] border border-cyan-500/10 p-6 sm:p-8 relative">
          {/* Cyberpunk Tech Corners */}
          <div className="absolute top-0 left-0 w-8 h-[1px] bg-cyan-500" />
          <div className="absolute top-0 left-0 w-[1px] h-8 bg-cyan-500" />

          {/* Card Header */}
          <div className="mb-8">
            <div className="text-[10px] font-semibold text-cyan-500/50 tracking-[0.14em] uppercase mb-1">
              Explorer Identity
            </div>
            <h2 className="font-serif text-2xl text-white tracking-tight">
              Personal{" "}
              <span className="text-cyan-400 not-italic">Dashboard</span>
            </h2>
          </div>

          {/* User Info Fields Container */}
          <div className="flex flex-col gap-5">
            {/* Avatar & ID Section */}
            <div className="flex items-center gap-4 py-3 px-4 bg-cyan-500/[0.03] border border-cyan-500/10 mb-2">
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 text-xl flex items-center justify-center select-none">
                🧑‍🚀
              </div>
              <div>
                <div className="text-[10px] text-sky-200/30 uppercase tracking-widest">
                  Explorer ID
                </div>
                <div className="text-[12px] font-mono text-cyan-400/80 tracking-tight mt-0.5 break-all">
                  {userInfo?.id || "6a081a3ad204e0e917eface3"}
                </div>
              </div>
            </div>

            {/* Name Row */}
            <div className="border-b border-cyan-500/5 pb-3">
              <div className="text-[11px] text-sky-200/40 uppercase tracking-wider mb-0.5">
                Full name
              </div>
              <div className="text-[14.5px] font-medium text-white">
                {userInfo?.name || "Jomir"}
              </div>
            </div>

            {/* Email Row with Verification Pill */}
            <div className="border-b border-cyan-500/5 pb-3">
              <div className="text-[11px] text-sky-200/40 uppercase tracking-wider mb-0.5">
                Email address
              </div>
              <div className="text-[14.5px] font-medium text-sky-100 flex items-center gap-2">
                {userInfo?.email || "jomir.e@gmail.com"}

                {userInfo?.emailVerified ? (
                  <span className="text-[9px] font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 py-0.5 px-1.5 uppercase tracking-wide">
                    Verified
                  </span>
                ) : (
                  <span className="text-[9px] font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400 py-0.5 px-1.5 uppercase tracking-wide">
                    Pending
                  </span>
                )}
              </div>
            </div>

            {/* Joined/Created Date Row */}
            <div>
              <div className="text-[11px] text-sky-200/40 uppercase tracking-wider mb-0.5">
                Joined on
              </div>
              <div className="text-[13.5px] text-sky-200/70 font-light">
                {userInfo?.createdAt
                  ? new Date(userInfo.createdAt).toDateString()
                  : "Sat May 16 2026"}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Security Footer */}
        <div className="flex items-center justify-center gap-1.5 mt-6 text-[11px] text-sky-200/20">
          <span className="opacity-45">
            <IconShield />
          </span>{" "}
          Encrypted Session Active · Secure Traveler Node
        </div>
      </div>
    </div>
  );
}

export default Profile;
