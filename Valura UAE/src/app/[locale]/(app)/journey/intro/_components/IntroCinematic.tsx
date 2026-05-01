"use client";

import { useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Howl } from "howler";
import type { AvatarType } from "@prisma/client";
import UAESkyline from "@/components/svg/UAESkyline";
import SanadFalcon from "@/components/svg/SanadFalcon";
import AvatarSVG from "@/components/svg/AvatarSVG";
import { WORLD_COORDS, worldCoordsToPath } from "@/lib/game/world-coords";

gsap.registerPlugin(useGSAP);

// ── First node position — "camera" pans here in Beat 4 ─────────────────────
const NODE_1 = WORLD_COORDS[0]; // Marina Mile x=80, y=370

interface IntroCinematicProps {
  displayName?: string;
  avatarType: AvatarType;
  locale: string;
}

export default function IntroCinematic({ displayName, avatarType, locale }: IntroCinematicProps) {
  const router = useRouter();
  const isRtl = locale === "ar";
  const name = displayName ?? (isRtl ? "مستكشفنا" : "explorer");

  // ── DOM refs ──────────────────────────────────────────────────────────────
  const containerRef  = useRef<HTMLDivElement>(null);
  const logoRef       = useRef<HTMLDivElement>(null);
  const dotRef        = useRef<HTMLDivElement>(null);
  const sceneWrapRef  = useRef<HTMLDivElement>(null);
  const skylineRef    = useRef<SVGGElement>(null);
  const sanadRef      = useRef<SVGGElement>(null);
  const pathRef       = useRef<SVGPathElement>(null);
  const nodeRefs      = useRef<SVGGElement[]>([]);
  const avatarRef     = useRef<SVGGElement>(null);
  const welcomeRef    = useRef<HTMLDivElement>(null);
  const beginRef      = useRef<HTMLButtonElement>(null);
  const skipRef       = useRef<HTMLButtonElement>(null);
  const tlRef         = useRef<gsap.core.Timeline | null>(null);
  const bellRef       = useRef<Howl | null>(null);

  // Pre-compute the SVG path string
  const pathD = useMemo(() => worldCoordsToPath(WORLD_COORDS), []);

  // ── Load bell sound ───────────────────────────────────────────────────────
  useEffect(() => {
    bellRef.current = new Howl({
      src: ["/audio/bell.mp3"],
      volume: 0.45,
      // Silent failure if placeholder file is missing
      onloaderror: () => {},
    });
    return () => { bellRef.current?.unload(); };
  }, []);

  // ── Mark intro seen + redirect ────────────────────────────────────────────
  const markSeenRef = useRef<() => void>(() => {});

  const markSeen = useCallback(async () => {
    try {
      await fetch("/api/game/seen-intro", { method: "PATCH" });
    } catch {}
    router.replace(`/${locale}/journey`);
  }, [locale, router]);

  // Keep ref in sync so GSAP onComplete always calls the latest version
  markSeenRef.current = markSeen;

  // ── GSAP 5-beat timeline ──────────────────────────────────────────────────
  useGSAP(() => {
    const pathEl    = pathRef.current!;
    const pathLen   = pathEl.getTotalLength();

    // ── Initial hidden states ─────────────────────────────────────────────
    gsap.set(logoRef.current,    { opacity: 0, scale: 1 });
    gsap.set(dotRef.current,     { opacity: 0, scale: 0 });
    gsap.set(sceneWrapRef.current, { opacity: 0 });
    gsap.set(skylineRef.current, { opacity: 0, y: 55 });
    gsap.set(sanadRef.current,   {
      x: isRtl ? -340 : 340,   // start off-screen on the approaching side
      y: -30,
      opacity: 0,
    });
    gsap.set(pathEl, {
      strokeDasharray: pathLen,
      strokeDashoffset: pathLen,
    });
    nodeRefs.current.forEach((n) => gsap.set(n, { opacity: 0, scale: 0, transformOrigin: "center" }));
    gsap.set(avatarRef.current,  { opacity: 0, scale: 0, transformOrigin: "center" });
    gsap.set(welcomeRef.current, { opacity: 0, y: 18 });
    gsap.set(beginRef.current,   { opacity: 0, y: 20 });
    gsap.set(skipRef.current,    { opacity: 0 });

    const tl = gsap.timeline();
    tlRef.current = tl;

    // ══ Beat 1 (0–2s): Cream bg, Valura logo → dissolves to dot ════════════
    tl
      .to(logoRef.current, { opacity: 1, duration: 0.75, ease: "power2.out" })
      .to(logoRef.current, { opacity: 1, duration: 0.45 })                     // hold
      .to(logoRef.current, {
          opacity: 0,
          scale: 0.15,
          duration: 0.55,
          ease: "power3.in",
        }, "+=0.1",
      )
      .to(dotRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
        }, "<0.3",
      )
      .to(dotRef.current, { opacity: 0, scale: 3, duration: 0.35, ease: "power2.in" }, "+=0.1");

    // ══ Beat 2 (2–4s): Scene fades up, skyline rises, Sanad swoops in ═══════
    tl
      .to(sceneWrapRef.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, 2.0)
      .to(skylineRef.current,   {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power3.out",
        }, 2.1,
      )
      .to(sanadRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
        }, 2.5,
      );

    // ══ Beat 3 (4–7s): Journey path draws, 15 nodes light up ═══════════════
    tl.to(pathEl, {
      strokeDashoffset: 0,
      duration: 3.0,
      ease: "power1.inOut",
    }, 4.0);

    // Each node pops in at evenly-spaced intervals along the 3-second draw
    nodeRefs.current.forEach((nodeEl, i) => {
      const t = 4.0 + (i / (WORLD_COORDS.length - 1)) * 3.0;
      tl.to(nodeEl, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t);
    });

    // ══ Beat 4 (7–10s): Camera pans to Node 1, avatar appears ══════════════
    // Pan/zoom into the beginning of the journey (left side of the map).
    // Node 1 is at x=80 ≈ 5% of 1600; pull right 22% at 1.55× scale to bring it into focus.
    const panX = isRtl ? "-22%" : "22%";
    tl
      .to(sceneWrapRef.current, {
          scale: 1.55,
          xPercent: parseFloat(panX),
          duration: 2.4,
          ease: "power2.inOut",
        }, 7.0,
      )
      .to(avatarRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        }, 8.8,
      );

    // ══ Beat 5 (10–12s): Welcome text, bell, Begin button ══════════════════
    tl
      .to(sceneWrapRef.current, {
          scale: 1,
          xPercent: 0,
          duration: 1.0,
          ease: "power2.inOut",
        }, 9.6,
      )
      .to(welcomeRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
        }, 10.0,
      )
      .call(() => { try { bellRef.current?.play(); } catch {} }, [], 10.6)
      .to(beginRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
        }, 11.1,
      );

    // Skip button fades in after 3s (runs in parallel on the same timeline)
    tl.to(skipRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" }, 3.0);

  }, { scope: containerRef });

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBegin = () => {
    tlRef.current?.pause();
    markSeenRef.current();
  };

  const handleSkip = () => {
    tlRef.current?.pause();
    markSeenRef.current();
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const welcomeEn = `Welcome, ${name}. Your journey starts here.`;
  const welcomeAr = `أهلاً ${name}. رحلتك تبدأ من هنا.`;
  const welcomeCopy = isRtl ? welcomeAr : welcomeEn;
  const beginLabel = isRtl ? "ابدأ" : "Begin";
  const skipLabel  = isRtl ? "تخطي ›" : "Skip ›";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#00111B" }}
      role="dialog"
      aria-modal="true"
      aria-label={isRtl ? "مقدمة فالورا" : "Valura opening cinematic"}
    >
      {/* ── Beat 1: Wordmark overlay ────────────────────────────────────── */}
      <div
        ref={logoRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          className="font-display select-none text-[5.5rem] font-bold leading-none tracking-tight"
          style={{
            background: "linear-gradient(135deg, #D4A95A 0%, #F5C872 48%, #D4A95A 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Valura
        </span>
      </div>

      {/* ── Beat 1: Dissolve dot of light ───────────────────────────────── */}
      <div
        ref={dotRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{
            background: "#F5C872",
            boxShadow: "0 0 24px 12px rgba(245,200,114,0.7), 0 0 60px 30px rgba(212,169,90,0.4)",
          }}
        />
      </div>

      {/* ── Beats 2–4: SVG scene ────────────────────────────────────────── */}
      <div
        ref={sceneWrapRef}
        className="absolute inset-0 flex items-center justify-center will-change-transform"
        style={{ transformOrigin: "center center" }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1600 520"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ transform: isRtl ? "scaleX(-1)" : undefined }}
        >
          <defs>
            {/* Sky gradient — night navy → dawn gold */}
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#000A12" />
              <stop offset="45%"  stopColor="#002540" />
              <stop offset="78%"  stopColor="#1A4A3C" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8A6020" stopOpacity="0.5" />
            </linearGradient>
            {/* Sea gradient */}
            <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#0B4D6E" />
              <stop offset="100%" stopColor="#0A2E42" />
            </linearGradient>
            {/* Journey path glow filter */}
            <filter id="pathGlow" x="-15%" y="-60%" width="130%" height="220%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Node glow filter */}
            <filter id="nodeGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Sunrise lens flare radial */}
            <radialGradient id="sunFlare" cx="50%" cy="100%" r="60%">
              <stop offset="0%"   stopColor="#D4A95A" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D4A95A" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Sky */}
          <rect x="0" y="0" width="1600" height="520" fill="url(#skyGrad)" />

          {/* Sunrise lens flare */}
          <ellipse cx="800" cy="520" rx="800" ry="260" fill="url(#sunFlare)" />

          {/* Horizon shimmer */}
          <rect x="0" y="395" width="1600" height="3" fill="#D4A95A" opacity="0.18" />

          {/* Sea */}
          <path
            d="M 0,400 Q 400,392 800,402 Q 1200,412 1600,400 L 1600,520 L 0,520 Z"
            fill="url(#seaGrad)"
          />
          {/* Sea highlight ripples */}
          <path d="M 50,420  Q 200,416 350,422" stroke="#B4E3C8" strokeWidth="1" fill="none" opacity="0.25" />
          <path d="M 400,430 Q 600,424 750,432" stroke="#B4E3C8" strokeWidth="1" fill="none" opacity="0.2" />
          <path d="M 900,425 Q 1100,418 1300,426" stroke="#B4E3C8" strokeWidth="1" fill="none" opacity="0.2" />

          {/* Sand / ground strip */}
          <path
            d="M 0,412 Q 400,408 800,416 Q 1200,422 1600,412 L 1600,520 L 0,520 Z"
            fill="#C8A882"
            opacity="0.55"
          />

          {/* UAE skyline silhouettes */}
          <g ref={skylineRef}>
            <UAESkyline />
          </g>

          {/* Journey path (reveals via stroke-dashoffset animation) */}
          <path
            ref={pathRef}
            d={pathD}
            fill="none"
            stroke="#05A049"
            strokeWidth="2.5"
            strokeLinecap="round"
            filter="url(#pathGlow)"
          />

          {/* World nodes (15 circles — each ref stored in nodeRefs.current[i]) */}
          {WORLD_COORDS.map((world, i) => (
            <g
              key={world.slug}
              ref={(el) => { if (el) nodeRefs.current[i] = el; }}
            >
              {/* Outer pulse ring */}
              <circle
                cx={world.x}
                cy={world.y}
                r="13"
                fill="none"
                stroke="#05A049"
                strokeWidth="1.5"
                opacity="0.45"
                style={{ animation: "nodePulse 2.2s ease-out infinite" }}
              />
              {/* Node body */}
              <circle
                cx={world.x}
                cy={world.y}
                r="7"
                fill="#05A049"
                filter="url(#nodeGlow)"
              />
              {/* Inner highlight */}
              <circle cx={world.x} cy={world.y} r="3.5" fill="#B4E3C8" opacity="0.9" />
            </g>
          ))}

          {/* Sanad falcon (swoops in from off-screen right) */}
          <g ref={sanadRef} transform="translate(1448, 178) scale(1.25)">
            <SanadFalcon />
          </g>

          {/* Avatar (appears at Node 1 in Beat 4) */}
          <g ref={avatarRef} transform={`translate(${NODE_1.x - 10}, ${NODE_1.y - 58})`}>
            <AvatarSVG type={avatarType} />
          </g>
        </svg>
      </div>

      {/* ── Beat 5: Welcome text overlay ────────────────────────────────── */}
      <div
        ref={welcomeRef}
        className="pointer-events-none absolute inset-x-0 top-1/3 z-30 flex flex-col items-center gap-3 px-6 text-center"
        aria-live="polite"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <p
          className="font-display font-bold leading-tight text-[clamp(2rem,5vw,3.5rem)]"
          style={{ color: "#FFFFFC", textShadow: "0 2px 24px rgba(0,17,27,0.8)" }}
        >
          {welcomeCopy}
        </p>
        <p
          className="font-heading text-lg font-medium"
          style={{ color: "#B4E3C8", opacity: 0.85 }}
        >
          {isRtl ? "رحلة من ١٥ عالماً تبدأ معك" : "15 worlds of financial wisdom await."}
        </p>
      </div>

      {/* ── Beat 5: Begin button ─────────────────────────────────────────── */}
      <button
        ref={beginRef}
        onClick={handleBegin}
        className="absolute bottom-16 left-1/2 z-40 -translate-x-1/2 rounded-full px-12 py-4 font-heading text-lg font-semibold transition-all duration-200"
        style={{
          background: "#00111B",
          color: "#B4E3C8",
          border: "2px solid #05A049",
          boxShadow: "0 0 0 0 rgba(5,160,73,0)",
        }}
        aria-label={isRtl ? "ابدأ رحلتك" : "Begin your journey"}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 24px 6px rgba(5,160,73,0.45), 0 0 0 2px #05A049";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 0 0 0 rgba(5,160,73,0)";
        }}
      >
        {beginLabel}
      </button>

      {/* ── Skip button (appears at 3s) ──────────────────────────────────── */}
      <button
        ref={skipRef}
        onClick={handleSkip}
        className="absolute end-6 top-6 z-40 rounded-full px-4 py-2 font-body text-sm font-medium transition-colors"
        style={{ color: "#B4E3C8", opacity: 0.6 }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.6"; }}
        aria-label={isRtl ? "تخطي المقدمة" : "Skip intro"}
      >
        {skipLabel}
      </button>

    </div>
  );
}
