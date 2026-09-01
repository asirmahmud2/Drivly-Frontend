"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";


const IMAGE_SRC = "https://i.ibb.co.com/b5BnqCkV/Luxury-vehicles-in-architectural-202609011349.jpg";

export default function PremiumExperience() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });
  const reduceMotion = useReducedMotion();

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[90vh] min-h-[560px] max-h-[900px] overflow-hidden bg-[#0B0B0C]"
    >
      {/* Full-bleed image — intentionally not container-constrained,
          same treatment as the Hero */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={reduceMotion ? { scale: 1 } : { scale: 1.06 }}
        transition={{ duration: 20, ease: "linear" }}
      >
        <Image
          src={IMAGE_SRC}
          alt=""
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Vignette / legibility overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(11,11,12,0.55) 0%, rgba(11,11,12,0.15) 32%, rgba(11,11,12,0.35) 62%, rgba(11,11,12,0.88) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content — aligned to the same container system as every other section */}
      <div className="relative z-10 flex h-full items-end">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24">
          <div className="max-w-2xl">
            <motion.span
              className="block h-px w-10 bg-[#C7A76C]"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            />

            <motion.h2
              className="mt-6 text-3xl sm:text-4xl lg:text-[2.75rem] font-medium leading-[1.15] tracking-tight text-[#F4F2ED]"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            >
              The right car doesn&apos;t just take you somewhere.
              <br />
              It changes how you get there.
            </motion.h2>

            <motion.p
              className="mt-5 max-w-md text-[15px] leading-relaxed text-[#F4F2ED]/70"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
            >
              Every vehicle on Drivly is chosen to be felt, not just driven.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}