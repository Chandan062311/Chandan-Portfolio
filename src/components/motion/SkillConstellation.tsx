"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";

/* ── types ─────────────────────────────────────────── */
interface SkillGroupData {
  title: string;
  items: string[];
}

/* ── palette per ring ──────────────────────────────── */
const RINGS = [
  { accent: "#D88A2A" }, // amber  — Web Engineering
  { accent: "#5FA8A0" }, // teal   — Backend
  { accent: "#8B7BDE" }, // violet — Ops
  { accent: "#E06040" }, // coral  — AI
];

/* ── exported component ────────────────────────────── */
export function SkillConstellation({
  groups,
}: {
  groups: SkillGroupData[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [dims, setDims] = useState({ w: 600, h: 520 });
  const prefersReduced = useReducedMotion();

  /* responsive sizing */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      setDims({ w: rect.width, h: rect.height });
    };
    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cx = dims.w / 2;
  const cy = dims.h / 2;
  const maxR = Math.min(cx, cy) - 36;

  /* mouse parallax for subtle depth feel */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const parallaxX = useTransform(springX, [0, 1], [-6, 6]);
  const parallaxY = useTransform(springY, [0, 1], [-6, 6]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [mouseX, mouseY],
  );

  /* ring radii — evenly spaced from center */
  const ringRadii = groups.map(
    (_, i) => maxR * ((i + 1) / (groups.length + 0.4)),
  );

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      className="relative mx-auto w-full overflow-hidden rounded-xl border border-white/10"
      style={{
        height: "min(560px, 74vw)",
        background:
          "radial-gradient(ellipse 80% 70% at 50% 50%, #0f1520 0%, #060a0e 100%)",
        boxShadow: "inset 0 0 80px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)",
      }}
    >
      {/* ── SVG visualization ── */}
      <motion.svg
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        className="absolute inset-0 h-full w-full"
        style={{
          x: prefersReduced ? 0 : parallaxX,
          y: prefersReduced ? 0 : parallaxY,
          ...(prefersReduced ? { animationPlayState: "paused" } : {}),
        }}
        aria-label="Skill constellation visualization"
      >
        <defs>
          {/* Glow filters */}
          {RINGS.map((r, i) => (
            <filter
              key={`glow-${i}`}
              id={`node-glow-${i}`}
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="5"
                result="blur"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          ))}

          {/* Sweep gradient */}
          <radialGradient id="sweep-fade" cx="0" cy="0" r="1">
            <stop offset="0%" stopColor="rgba(216,138,42,0.06)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Center radial glow */}
          <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(17,23,32,0.6)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* solid dark background rect to ensure full opacity */}
        <rect x={0} y={0} width={dims.w} height={dims.h} fill="#080c10" />
        {/* subtle radial highlight in center */}
        <circle cx={cx} cy={cy} r={maxR * 0.8} fill="url(#center-glow)" />

        {/* ── grid crosshairs ── */}
        <line
          x1={cx}
          y1={20}
          x2={cx}
          y2={dims.h - 20}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={0.5}
        />
        <line
          x1={20}
          y1={cy}
          x2={dims.w - 20}
          y2={cy}
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={0.5}
        />
        {/* diagonal cross */}
        <line
          x1={cx - maxR * 0.7}
          y1={cy - maxR * 0.7}
          x2={cx + maxR * 0.7}
          y2={cy + maxR * 0.7}
          stroke="rgba(255,255,255,0.025)"
          strokeWidth={0.5}
        />
        <line
          x1={cx + maxR * 0.7}
          y1={cy - maxR * 0.7}
          x2={cx - maxR * 0.7}
          y2={cy + maxR * 0.7}
          stroke="rgba(255,255,255,0.025)"
          strokeWidth={0.5}
        />

        {/* ── Radar sweep ── */}
        <g opacity={0.25}>
          <line
            x1={cx}
            y1={cy}
            x2={cx + maxR + 10}
            y2={cy}
            stroke="rgba(216,138,42,0.12)"
            strokeWidth={1}
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${cx} ${cy}`}
              to={`360 ${cx} ${cy}`}
              dur="10s"
              repeatCount="indefinite"
            />
          </line>
          {/* sweep trail / wedge */}
          <path
            d={`M ${cx} ${cy} L ${cx + maxR + 10} ${cy} A ${maxR + 10} ${maxR + 10} 0 0 0 ${cx + (maxR + 10) * Math.cos(-Math.PI / 6)} ${cy + (maxR + 10) * Math.sin(-Math.PI / 6)} Z`}
            fill="rgba(216,138,42,0.03)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 ${cx} ${cy}`}
              to={`360 ${cx} ${cy}`}
              dur="10s"
              repeatCount="indefinite"
            />
          </path>
        </g>

        {/* ── Concentric rings + nodes ── */}
        {groups.map((group, gi) => {
          const r = ringRadii[gi];
          const ring = RINGS[gi % RINGS.length];
          const isActiveRing = activeGroup === gi;
          const dimmed = activeGroup !== null && activeGroup !== gi;
          const sweepDur = 22 + gi * 10;

          return (
            <g key={group.title} opacity={dimmed ? 0.2 : 1}>
              {/* Ring circle — dashed */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={ring.accent}
                strokeWidth={isActiveRing ? 1.2 : 0.6}
                opacity={isActiveRing ? 0.5 : 0.12}
                strokeDasharray={isActiveRing ? "none" : "2 8"}
                style={{ transition: "all 0.4s ease" }}
              />

              {/* Animated arc segment — spinning glow arc */}
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={ring.accent}
                strokeWidth={isActiveRing ? 2.5 : 1.5}
                opacity={isActiveRing ? 0.6 : 0.25}
                strokeDasharray={`${r * 0.6} ${r * 5.7}`}
                strokeLinecap="round"
                style={{ transition: "opacity 0.3s ease" }}
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from={`0 ${cx} ${cy}`}
                  to={`${gi % 2 === 0 ? 360 : -360} ${cx} ${cy}`}
                  dur={`${sweepDur}s`}
                  repeatCount="indefinite"
                />
              </circle>

              {/* Ring label — positioned top-right to avoid node collisions */}
              <text
                x={cx + r * 0.7}
                y={cy - r * 0.7 - 6}
                textAnchor="start"
                fill={ring.accent}
                fontSize={7}
                fontFamily="var(--font-heading, 'Rajdhani', sans-serif)"
                fontWeight={600}
                letterSpacing="0.18em"
                opacity={isActiveRing ? 0.7 : 0.25}
                style={{ transition: "opacity 0.3s" }}
              >
                {group.title.toUpperCase()}
              </text>

              {/* ── Skill nodes ── */}
              {group.items.map((item, ii) => {
                /* offset start angle per ring so no node sits at 12-o'clock
                   where the ring label lives */
                const ringOffset = (gi * 0.4) + 0.35; // radians
                const angle =
                  (ii / group.items.length) * Math.PI * 2 - Math.PI / 2 + ringOffset;
                const nx = cx + Math.cos(angle) * r;
                const ny = cy + Math.sin(angle) * r;
                const nodeId = `${gi}-${ii}`;
                const isHovered = hoveredNode === nodeId;

                /* label positioning to avoid center overlap */
                const cosA = Math.cos(angle);
                const sinA = Math.sin(angle);
                const labelAnchor =
                  cosA > 0.3
                    ? "start"
                    : cosA < -0.3
                      ? "end"
                      : "middle";
                const labelDx =
                  cosA > 0.3 ? 14 : cosA < -0.3 ? -14 : 0;
                const labelDy = labelAnchor === "middle" ? (sinA > 0 ? 18 : -12) : 4;

                return (
                  <g
                    key={nodeId}
                    className="cursor-pointer"
                    onMouseEnter={() => {
                      setHoveredNode(nodeId);
                      setActiveGroup(gi);
                    }}
                    onMouseLeave={() => {
                      setHoveredNode(null);
                      setActiveGroup(null);
                    }}
                  >
                    {/* connection line to center on hover */}
                    {isHovered && (
                      <line
                        x1={cx}
                        y1={cy}
                        x2={nx}
                        y2={ny}
                        stroke={ring.accent}
                        strokeWidth={0.6}
                        opacity={0.25}
                        strokeDasharray="3 5"
                      >
                        <animate
                          attributeName="stroke-dashoffset"
                          from="0"
                          to="-16"
                          dur="1s"
                          repeatCount="indefinite"
                        />
                      </line>
                    )}

                    {/* outer detection ring (bigger hover target) */}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isHovered ? 16 : 10}
                      fill="transparent"
                    />

                    {/* decorative outer ring */}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isHovered ? 12 : 7}
                      fill="none"
                      stroke={ring.accent}
                      strokeWidth={isHovered ? 1 : 0.4}
                      opacity={isHovered ? 0.6 : 0.12}
                      style={{ transition: "all 0.3s ease" }}
                    />

                    {/* secondary outer ring (appears on hover) */}
                    {isHovered && (
                      <circle
                        cx={nx}
                        cy={ny}
                        r={18}
                        fill="none"
                        stroke={ring.accent}
                        strokeWidth={0.4}
                        opacity={0.3}
                        strokeDasharray="2 4"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from={`0 ${nx} ${ny}`}
                          to={`360 ${nx} ${ny}`}
                          dur="4s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}

                    {/* core dot */}
                    <circle
                      cx={nx}
                      cy={ny}
                      r={isHovered ? 4.5 : 3}
                      fill={ring.accent}
                      opacity={isHovered ? 1 : 0.75}
                      filter={
                        isHovered
                          ? `url(#node-glow-${gi % RINGS.length})`
                          : undefined
                      }
                      style={{ transition: "all 0.25s ease" }}
                    />

                    {/* label text (always visible, brighter on hover) */}
                    <text
                      x={nx + labelDx}
                      y={ny + labelDy}
                      textAnchor={labelAnchor}
                      fill={isHovered ? "#f1f5f9" : "#c1cbd6"}
                      fontSize={isHovered ? 11.5 : 9.5}
                      fontFamily="var(--font-body, 'Space Grotesk', sans-serif)"
                      fontWeight={isHovered ? 600 : 500}
                      letterSpacing="0.03em"
                      opacity={isHovered ? 1 : 0.7}
                      style={{ transition: "all 0.25s ease" }}
                    >
                      {item}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })}

        {/* ── Center hub ── */}
        {/* Pulsing outer ring */}
        <circle
          cx={cx}
          cy={cy}
          r={20}
          fill="none"
          stroke="rgba(216,138,42,0.12)"
          strokeWidth={0.6}
        >
          <animate
            attributeName="r"
            values="18;26;18"
            dur="4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.2;0.04;0.2"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Hub circle */}
        <circle
          cx={cx}
          cy={cy}
          r={16}
          fill="rgba(8,11,15,0.85)"
          stroke="rgba(216,138,42,0.3)"
          strokeWidth={1}
        />

        {/* Spinning diamond */}
        <polygon
          points={`${cx},${cy - 5} ${cx + 5},${cy} ${cx},${cy + 5} ${cx - 5},${cy}`}
          fill="none"
          stroke="rgba(216,138,42,0.45)"
          strokeWidth={0.7}
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from={`0 ${cx} ${cy}`}
            to={`360 ${cx} ${cy}`}
            dur="18s"
            repeatCount="indefinite"
          />
        </polygon>

        {/* Hub label */}
        <text
          x={cx}
          y={cy + 30}
          textAnchor="middle"
          fill="var(--color-muted)"
          fontSize={7}
          fontFamily="var(--font-heading, 'Rajdhani', sans-serif)"
          fontWeight={600}
          letterSpacing="0.28em"
          opacity={0.4}
        >
          CORE
        </text>
      </motion.svg>

      {/* ── Hover detail card (bottom-left) ── */}
      <AnimatePresence>
        {hoveredNode &&
          (() => {
            const [gi, ii] = hoveredNode.split("-").map(Number);
            const group = groups[gi];
            const ring = RINGS[gi % RINGS.length];
            return (
              <motion.div
                key={hoveredNode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.15 }}
                className="pointer-events-none absolute bottom-12 left-4 z-30 rounded-md border px-3 py-2"
                style={{
                  background: "rgba(8,11,15,0.88)",
                  borderColor: `${ring.accent}30`,
                  backdropFilter: "blur(12px)",
                  boxShadow: `0 0 24px ${ring.accent}12`,
                }}
              >
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: ring.accent }}
                >
                  {group.title}
                </p>
                <p className="mt-0.5 font-heading text-sm font-bold text-[color:var(--color-text)]">
                  {group.items[ii]}
                </p>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {/* ── Group legend (bottom-right) ── */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1">
        {groups.map((g, i) => {
          const ring = RINGS[i % RINGS.length];
          const isActive = activeGroup === i;
          return (
            <button
              key={g.title}
              className="flex cursor-pointer items-center gap-2 rounded px-2 py-0.5 text-left text-[8px] font-semibold uppercase tracking-[0.15em] transition-all duration-200"
              style={{
                color: isActive ? ring.accent : "var(--color-muted)",
                background: isActive ? `${ring.accent}10` : "transparent",
                borderLeft: isActive
                  ? `2px solid ${ring.accent}`
                  : "2px solid transparent",
              }}
              onMouseEnter={() => setActiveGroup(i)}
              onMouseLeave={() => setActiveGroup(null)}
            >
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: ring.accent,
                  boxShadow: isActive
                    ? `0 0 6px ${ring.accent}`
                    : "none",
                }}
              />
              {g.title}
            </button>
          );
        })}
      </div>

      {/* ── Hint ── */}
      <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 text-[8px] uppercase tracking-[0.3em] text-[color:var(--color-muted)] opacity-30">
        Hover to scan
      </p>
    </div>
  );
}
