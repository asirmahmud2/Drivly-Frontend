"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";


const STEPS = [
  {
    n: "01",
    title: "Explore",
    copy: "Browse a curated fleet with real photography, honest specs, and clear availability — no filler listings to wade through.",
  },
  {
    n: "02",
    title: "Reserve",
    copy: "Set your dates, pickup point, and driver preference. Your total is shown up front, before you commit to anything.",
  },
  {
    n: "03",
    title: "Drive",
    copy: "Collect the vehicle and go. Every booking stays visible and editable from your account for as long as you need it.",
  },
];

const DESKTOP_POINTS = [
  { x: 60, y: 90 },
  { x: 620, y: 40 },
  { x: 1180, y: 110 },
];

const desktopPath = `M ${DESKTOP_POINTS[0].x} ${DESKTOP_POINTS[0].y} C 300 -10, 380 150, ${DESKTOP_POINTS[1].x} ${DESKTOP_POINTS[1].y} S 940 220, ${DESKTOP_POINTS[2].x} ${DESKTOP_POINTS[2].y}`;

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden bg-[#F4F2ED] py-24 sm:py-28 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading block */}
        <div className="max-w-xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C7A76C]">
            How it works
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-[#111214]">
            From first look to
            <br />
            first mile.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#6F706D]">
            Three unhurried steps, each one visible before you take it —
            nothing about your booking should feel like a guess.
          </p>
        </div>

        {/* ---------- Desktop / tablet: curved route ---------- */}
        <div className="relative mt-20 hidden md:block">
          <svg
            viewBox="0 0 1240 220"
            preserveAspectRatio="none"
            className="w-full h-[220px]"
            aria-hidden="true"
          >
            <motion.path
              d={desktopPath}
              fill="none"
              stroke="#D9D6CF"
              strokeWidth="1"
            />
            <motion.path
              d={desktopPath}
              fill="none"
              stroke="#C7A76C"
              strokeWidth="1.25"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />

            {DESKTOP_POINTS.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="4.5"
                fill="#F4F2ED"
                stroke="#C7A76C"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </svg>

          {/* Step copy positioned near each waypoint, alternating above/below.
              Each box is anchored relative to its position on the route (grow
              right / center / grow left) so it can never push past the
              container, regardless of width. */}
          <div className="pointer-events-none absolute inset-0">
            {STEPS.map((step, i) => {
              const p = DESKTOP_POINTS[i];
              const isAbove = i % 2 === 1;
              const xPct = (p.x / 1240) * 100;

              // First point: box grows rightward from the waypoint.
              // Middle point: box centers on the waypoint.
              // Last point: box grows leftward from the waypoint.
              const horizontalAnchor =
                i === 0
                  ? { left: `${xPct}%`, translate: "0% 0" }
                  : i === STEPS.length - 1
                  ? { left: `${xPct}%`, translate: "-100% 0" }
                  : { left: `${xPct}%`, translate: "-50% 0" };

              return (
                <motion.div
                  key={step.n}
                  className="pointer-events-auto absolute w-[200px] sm:w-[220px] lg:w-[250px] xl:w-[270px]"
                  style={{
                    ...horizontalAnchor,
                    top: isAbove ? undefined : `${(p.y / 220) * 100}%`,
                    bottom: isAbove ? `${100 - (p.y / 220) * 100}%` : undefined,
                    marginTop: isAbove ? undefined : "1.75rem",
                    marginBottom: isAbove ? "1.75rem" : undefined,
                  }}
                  initial={{ opacity: 0, y: isAbove ? -10 : 10 }}
                  animate={
                    inView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: isAbove ? -10 : 10 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + i * 0.5,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-xs font-medium tracking-[0.1em] text-[#C7A76C]">
                    {step.n}
                  </span>
                  <h3 className="mt-1.5 text-lg font-medium text-[#111214]">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6F706D]">
                    {step.copy}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ---------- Mobile: vertical route ---------- */}
        <div className="relative mt-16 md:hidden pl-7">
          <div className="absolute left-[3px] top-1 bottom-1 w-px bg-[#D9D6CF]" />
          <motion.div
            className="absolute left-[3px] top-1 w-px origin-top bg-[#C7A76C]"
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ bottom: "0.25rem" }}
          />

          <ul className="space-y-10">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                className="relative"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + i * 0.35,
                  ease: "easeOut",
                }}
              >
                <span
                  className="absolute -left-7 top-1 h-2 w-2 rounded-full border-[1.5px] border-[#C7A76C] bg-[#F4F2ED]"
                  aria-hidden="true"
                />
                <span className="text-xs font-medium tracking-[0.1em] text-[#C7A76C]">
                  {step.n}
                </span>
                <h3 className="mt-1 text-lg font-medium text-[#111214]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#6F706D] max-w-[38ch]">
                  {step.copy}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}