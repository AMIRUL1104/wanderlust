"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import {
  IoHomeOutline,
  IoCompassOutline,
  IoCalendarOutline,
  IoShieldCheckmarkOutline,
  IoPersonOutline,
  IoLogInOutline,
  IoPersonAddOutline,
} from "react-icons/io5";

const mainLinks = [
  { href: "/", label: "Home", icon: IoHomeOutline },
  { href: "/destination", label: "Destination", icon: IoCompassOutline },
  { href: "/my-booking", label: "My Booking", icon: IoCalendarOutline },
  { href: "/admin", label: "Admin", icon: IoShieldCheckmarkOutline },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a2a3a]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_24px_rgba(6,182,212,0.08)]"
            : "bg-[#0a2a3a]/80 backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="max-w-360 mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ── Left nav (desktop) ── */}
            <nav className="hidden lg:flex items-center gap-1">
              {mainLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium tracking-wide transition-all duration-200 group
                    ${
                      isActive(href)
                        ? "text-cyan-400"
                        : "text-blue-200/70 hover:text-cyan-300"
                    }`}
                >
                  <Icon className="text-base shrink-0" />
                  {label}
                  <span
                    className={`absolute bottom-0 left-3.5 right-3.5 h-px bg-cyan-400 transition-all duration-300 origin-left
                      ${isActive(href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </Link>
              ))}
            </nav>

            {/* ── Logo (center) ── */}
            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0"
            >
              <div
                style={{
                  filter:
                    "drop-shadow(0 0 12px rgba(6,182,212,0.5)) brightness(0) saturate(100%) invert(78%) sepia(60%) saturate(400%) hue-rotate(155deg) brightness(105%)",
                }}
              >
                <Image
                  src="/assets/Wanderlast.png"
                  alt="Wanderlast logo"
                  width={200}
                  height={100}
                  className="object-contain "
                  priority
                />
              </div>
            </Link>

            {/* ── Right nav (desktop) ── */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/profile"
                className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group
                  ${isActive("/profile") ? "text-cyan-400" : "text-blue-200/70 hover:text-cyan-300"}`}
              >
                <IoPersonOutline className="text-base" />
                Profile
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-px bg-cyan-400 transition-all duration-300 origin-left ${isActive("/profile") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>

              <Link
                href="/login"
                className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200 group
                  ${isActive("/login") ? "text-cyan-400" : "text-blue-200/70 hover:text-cyan-300"}`}
              >
                <IoLogInOutline className="text-base" />
                Login
                <span
                  className={`absolute bottom-0 left-3.5 right-3.5 h-px bg-cyan-400 transition-all duration-300 origin-left ${isActive("/login") ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                />
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-1.5 ml-2 px-4 py-2 text-sm font-medium tracking-wide bg-cyan-500 hover:bg-cyan-400 text-[#042c53] transition-colors duration-200"
              >
                <IoPersonAddOutline className="text-base" />
                Sign Up
              </Link>
            </nav>

            {/* ── Hamburger (mobile/tablet) ── */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden flex items-center justify-center w-10 h-10 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/10 transition-all duration-200 border border-cyan-500/20"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <HiX className="text-xl" />
              ) : (
                <HiOutlineMenuAlt3 className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* ── Mobile drawer ── */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] bg-[#0b2d3e] border-l border-cyan-500/20 lg:hidden
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-500/15">
          {/* <div
            style={{
              filter:
                "drop-shadow(0 0 8px rgba(6,182,212,0.5)) brightness(0) saturate(100%) invert(78%) sepia(60%) saturate(400%) hue-rotate(155deg) brightness(105%)",
            }}
          >
            <Image
              src="/assets/Wanderlast.png"
              alt="Wanderlast logo"
              width={100}
              height={40}
              className="object-contain h-8 w-auto"
            />
          </div> */}
          <button
            className="flex items-center justify-center w-8 h-8 text-blue-200/60 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
            aria-label="Close menu"
          >
            <HiX className="text-lg" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <p className="text-[10px] uppercase tracking-widest text-blue-300/40 px-3 mb-2">
            Explore
          </p>
          <ul className="space-y-0.5 mb-6">
            {mainLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150
                    ${
                      isActive(href)
                        ? "bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-400"
                        : "text-blue-200/70 hover:bg-white/5 hover:text-cyan-300 border-l-2 border-transparent"
                    }`}
                >
                  <Icon className="text-lg shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="text-[10px] uppercase tracking-widest text-blue-300/40 px-3 mb-2">
            Account
          </p>
          <ul className="space-y-0.5">
            {[
              { href: "/profile", label: "Profile", icon: IoPersonOutline },
              { href: "/login", label: "Login", icon: IoLogInOutline },
            ].map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150
                    ${
                      isActive(href)
                        ? "bg-cyan-500/15 text-cyan-400 border-l-2 border-cyan-400"
                        : "text-blue-200/70 hover:bg-white/5 hover:text-cyan-300 border-l-2 border-transparent"
                    }`}
                >
                  <Icon className="text-lg shrink-0" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer footer CTA */}
        <div className="p-4 border-t border-cyan-500/15">
          <Link
            href="/signup"
            className="flex items-center justify-center gap-2 w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#042c53] font-medium text-sm uppercase tracking-widest transition-colors duration-200"
          >
            <IoPersonAddOutline className="text-base" />
            Sign Up Free
          </Link>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-16 lg:h-20" />
    </>
  );
}
