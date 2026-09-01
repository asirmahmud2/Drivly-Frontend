"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

export default function FinalCTA() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#0B0B0C] py-28 sm:py-32 lg:py-36"
    >
      {/* Faint depth — not an image, keeps this distinct from Premium Experience */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 40%, rgba(199,167,108,0.08) 0%, rgba(11,11,12,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="mx-auto h-px w-10 bg-[#C7A76C]" />

          <h2 className="mt-6 text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-[#F4F2ED]">
            Your next drive is already available.
          </h2>

          <p className="mt-5 text-[15px] leading-relaxed text-[#F4F2ED]/65">
            Explore the fleet, see the full price up front, and book without
            back-and-forth.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <Link
              href="/explore"
              className="inline-flex items-center justify-center rounded-sm bg-[#C7A76C] px-8 py-3.5 text-sm font-medium text-[#0B0B0C] transition-colors duration-300 hover:bg-[#AF8D52]"
            >
              Browse the fleet
            </Link>
            <Link
              href="/add-car"
              className="text-sm text-[#F4F2ED]/60 underline underline-offset-4 decoration-[#F4F2ED]/25 transition-colors duration-300 hover:text-[#F4F2ED]/90"
            >
              List your vehicle instead
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}