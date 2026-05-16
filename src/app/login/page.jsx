"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { IoLogInOutline } from "react-icons/io5";
import { toast } from "react-toastify";

/* ── inline icons ─────────────────────────────────────────────────────────── */
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

/* ── review card (login variant) ─────────────────────────────────────────── */
function ReviewPill({ avatar, quote, author }) {
  return (
    <div className="flex flex-col gap-1.5 p-4 bg-cyan-500/[0.05] border border-cyan-500/15 backdrop-blur-[4px] max-w-[340px]">
      <p className="text-[12.5px] italic text-sky-200/70 font-light leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-[14px]">{avatar}</span>
        <span className="text-[11px] font-medium tracking-wide text-cyan-400 uppercase">
          {author}
        </span>
      </div>
    </div>
  );
}

/* ── main ─────────────────────────────────────────────────────────────────── */
export default function WanderlustLogin() {
  const [showPw, setShowPw] = useState(false);

  const handleFormAction = async (formData) => {
    const userInfo = Object.fromEntries(formData.entries());
    const { email, password } = userInfo;
    // console.log(userInfo);

    const { data, error } = await authClient.signIn.email({
      email: email,
      password: password,
    });

    if (data) {
      redirect("/");
    }
    if (error) {
      console.log(error.message);
      toast.error("Login Failed: " + error.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="bg-[#04151f] font-sans min-h-screen antialiased selection:bg-cyan-500/30">
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        {/* ═══ LEFT (Welcome Back Panel) ═══ */}
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
                Welcome Back, Explorer
              </span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-white leading-[1.12] mb-4.5">
              Chasing Stories,
              <br />
              <em className="not-italic text-cyan-400 block mt-1">
                Not Destinations
              </em>
            </h1>
            <p className="text-[14px] text-sky-200/50 leading-relaxed font-light max-w-[360px] mb-8">
              Log in to access your customized itineraries, saved secret spots,
              and upcoming global expeditions.
            </p>

            <div className="flex flex-col gap-[2px]">
              <ReviewPill
                avatar="🧑‍🚀"
                quote="The community recommendations here helped me find a hidden waterfall in Bali that wasn't on any map."
                author="Alex M. · Nomad"
              />
            </div>
          </div>

          {/* empty div to balance the layout space */}
          <div />
        </div>

        {/* ═══ RIGHT (Login Form) ═══ */}
        <div className="bg-[#0a1929] flex items-center justify-center p-5 sm:p-10 md:p-12 border-t md:border-t-0 md:border-l border-cyan-500/10 min-h-screen">
          <form action={handleFormAction} className="w-100 max-w-[400px]">
            <div className="mb-7">
              <h2 className="font-serif text-3xl text-white tracking-tight mb-1.5">
                Resume <span className="text-cyan-400 not-italic">Journey</span>
              </h2>
              <p className="text-[13px] text-sky-200/40 font-light">
                New to the platform?{" "}
                <Link
                  href="/signup"
                  className="text-cyan-400 font-medium hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>

            {/* Google Login */}
            <button
              className="w-100 flex items-center justify-center gap-2.5 py-[11px] px-5 bg-cyan-500/[0.05] border border-cyan-500/20 text-sky-200/75 text-[13px] font-medium cursor-pointer transition-all duration-200 hover:bg-cyan-500/10 hover:border-cyan-500/40 hover:text-white mb-6"
              type="button"
            >
              <IconGoogle />
              Continue with Google
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <div className="flex-1 h-px bg-cyan-500/12" />
              <span className="text-[11px] text-sky-200/25 tracking-wider uppercase">
                or with credentials
              </span>
              <div className="flex-1 h-px bg-cyan-500/12" />
            </div>

            {/* fields */}
            <div className="text-[10px] font-semibold text-cyan-500/50 tracking-[0.14em] uppercase mb-4">
              Account Security
            </div>
            <div className="flex flex-col gap-3.5">
              {/* Email Field */}
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
                    className="w-100 py-2.5 pl-9 pr-3 bg-cyan-500/5 border border-cyan-500/15 text-sky-100 text-[13.5px] font-light outline-none transition-all duration-200 placeholder:text-sky-200/18 rounded-none focus:border-cyan-500/55 focus:bg-cyan-500/[0.08] focus:ring-4 focus:ring-cyan-500/10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-[12px] font-medium text-sky-200/55 flex items-center gap-0.5"
                  >
                    Password <span className="text-cyan-500">*</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[11px] text-cyan-500/60 hover:text-cyan-400 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-cyan-500/40 flex pointer-events-none">
                    <IconLock />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPw ? "text" : "password"}
                    placeholder="Enter your password"
                    required
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
              </div>
            </div>

            {/* Remember Me */}
            <div className="mt-4.5 flex items-start gap-2 text-[12px] text-sky-200/35 leading-normal">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="w-3.5 h-3.5 p-0 mt-0.5 accent-cyan-500 shrink-0"
              />
              <label
                htmlFor="remember"
                className="text-[12px] text-sky-200/35 font-light selection:bg-transparent"
              >
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-5.5 w-100 flex items-center justify-center gap-2 py-3 px-6 bg-cyan-500 text-[#042c53] text-[13px] font-bold tracking-wider uppercase cursor-pointer transition-all duration-200 hover:bg-cyan-400 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(6,182,212,0.3)] active:translate-y-0 active:shadow-none"
            >
              <IoLogInOutline className="text-base" />
              Sign In
            </button>

            {/* Security Note */}
            <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] text-sky-200/20">
              <span className="opacity-45">
                <IconShield />
              </span>{" "}
              Secure authentication layer · Encryption active
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
