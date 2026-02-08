"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  /** Delay in seconds before the decode animation starts (after element is in view) */
  delay?: number;
  speed?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const GLITCH_CHARS = "!@#$%^&*01_-+=<>?/\\|{}[]~";

function getRandomChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function GlitchText({
  text,
  delay = 0,
  speed = 35,
  className = "",
  as: Tag = "span",
}: GlitchTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [showGlitchLayers, setShowGlitchLayers] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);
  const timeoutsRef = useRef<Set<number>>(new Set());

  /* ── Intersection Observer: trigger animation only when visible ── */
  useEffect(() => {
    const el = elementRef.current;
    if (!el || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [isInView]);

  const decode = useCallback(() => {
    setIsDecoding(true);
    let resolvedCount = 0;
    const totalChars = text.length;
    const iterations = 4; // cycles per character before resolving

    const step = () => {
      resolvedCount++;
      const currentResolved = Math.min(
        Math.floor(resolvedCount / iterations),
        totalChars,
      );

      let result = "";
      for (let i = 0; i < totalChars; i++) {
        if (i < currentResolved) {
          result += text[i];
        } else if (text[i] === " ") {
          result += " ";
        } else {
          result += getRandomChar();
        }
      }
      setDisplayText(result);

      if (currentResolved < totalChars) {
        const id = window.setTimeout(step, speed);
        timeoutsRef.current.add(id);
        rafRef.current = id;
      } else {
        setDisplayText(text);
        setIsDecoding(false);
        // Trigger glitch flash after decode completes
        const t1 = window.setTimeout(() => {
          setShowGlitchLayers(true);
          const t2 = window.setTimeout(() => setShowGlitchLayers(false), 150);
          timeoutsRef.current.add(t2);
        }, 50);
        timeoutsRef.current.add(t1);
      }
    };

    step();
  }, [text, speed]);

  /* ── Start decode when element is in view (after delay) ── */
  useEffect(() => {
    if (prefersReducedMotion || hasStarted || !isInView) return;

    // Clamp delay: treat anything > 10 as milliseconds for safety
    const delaySec = delay > 10 ? delay / 1000 : delay;

    // Capture ref value for cleanup
    const pendingTimeouts = timeoutsRef.current;

    const timer = setTimeout(() => {
      setHasStarted(true);
      // Start with scrambled text
      setDisplayText(
        text
          .split("")
          .map((c) => (c === " " ? " " : getRandomChar()))
          .join(""),
      );
      decode();
    }, delaySec * 1000);

    return () => {
      clearTimeout(timer);
      // Clean up all tracked timeouts
      pendingTimeouts.forEach((id) => clearTimeout(id));
      pendingTimeouts.clear();
    };
  }, [decode, delay, hasStarted, isInView, prefersReducedMotion, text]);

  if (prefersReducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  if (!hasStarted) {
    return (
      <Tag ref={elementRef as React.Ref<never>} className={className} style={{ opacity: 0 }}>
        {text}
      </Tag>
    );
  }

  return (
    <Tag
      ref={elementRef as React.Ref<never>}
      className={`glitch-text ${showGlitchLayers ? "glitch-active" : ""} ${className}`}
      data-text={text}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {displayText}
      {isDecoding && (
        <span
          style={{
            position: "absolute",
            right: "-2px",
            opacity: 0.8,
            animation: "blink 0.5s step-end infinite",
          }}
        >
          _
        </span>
      )}
    </Tag>
  );
}
