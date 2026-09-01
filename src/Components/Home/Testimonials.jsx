"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";


const STATS = [
  { value: 4.9, decimals: 1, suffix: "", label: "Average rating across completed rentals" },
  { value: 12400, decimals: 0, suffix: "+", label: "Vehicles rented through Drivly" },
  { value: 38, decimals: 0, suffix: "", label: "Cities with active listings" },
];

const SECONDARY_QUOTES = [
  {
    quote: "The listing matched the car exactly. No surprises at pickup, which is rarer than it should be.",
    name: "Daniel K.",
    detail: "Nairobi",
  },
  {
    quote: "Listing my own car took ten minutes and I had my first booking by the weekend.",
    name: "Priya S.",
    detail: "Bengaluru, vehicle owner",
  },
];

function AnimatedStat({ value, decimals, suffix, inView }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [inView, value, motionValue]);

  return (
    <span className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-hidden bg-[#F4F2ED] py-24 sm:py-28 lg:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-xl">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#C7A76C]">
            Trust
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-[#111214]">
            Trusted by people
            <br />
            who expect more.
          </h2>
        </div>

        {/* Featured quote + stats */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <blockquote className="text-2xl sm:text-[1.75rem] leading-[1.4] text-[#111214] max-w-xl">
              &ldquo;Booking felt like reading a spec sheet I could actually
              trust. The car was exactly as described, inside and out, and
              the total never changed between the quote and pickup.&rdquo;
            </blockquote>
            <div className="mt-6 h-px w-10 bg-[#C7A76C]" />
            <p className="mt-4 text-sm text-[#6F706D]">
              Amara T. &nbsp;&middot;&nbsp; Lagos, booked a 2023 Range Rover Sport
            </p>
          </motion.div>

          <motion.div
            className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-[#D9D6CF]"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          >
            <dl>
              {STATS.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex items-baseline justify-between gap-6 py-5 ${
                    i !== 0 ? "border-t border-[#D9D6CF]" : ""
                  }`}
                >
                  <dt className="text-sm text-[#6F706D] max-w-[16ch]">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl sm:text-4xl font-medium text-[#111214] whitespace-nowrap">
                    <AnimatedStat
                      value={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                      inView={inView}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>

        {/* Secondary quotes */}
        <motion.div
          className="mt-16 pt-12 border-t border-[#D9D6CF] grid grid-cols-1 sm:grid-cols-2 gap-10 sm:gap-8"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {SECONDARY_QUOTES.map((t, i) => (
            <div
              key={t.name}
              className={`${
                i === 1 ? "sm:pl-8 sm:border-l sm:border-[#D9D6CF]" : ""
              }`}
            >
              <p className="text-[15px] leading-relaxed text-[#111214] max-w-[42ch]">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="mt-3 text-sm text-[#6F706D]">
                {t.name} &nbsp;&middot;&nbsp; {t.detail}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}