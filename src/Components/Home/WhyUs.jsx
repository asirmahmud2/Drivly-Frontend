"use client";

import React from "react";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 22 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
};

const lineDraw = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
};

const reasons = [
    {
        index: "01",
        title: "Curated, not endless",
        body: "Every vehicle on Drivly is chosen for character and condition, not just availability. Fewer options, chosen better.",
        offset: "",
    },
    {
        index: "02",
        title: "Clarity by design",
        body: "Price, dates, pickup, and every detail are laid out before you commit to anything. Nothing appears at checkout.",
        offset: "lg:ml-10",
    },
    {
        index: "03",
        title: "Built for both sides of the journey",
        body: "Rent a vehicle for the weekend, or list your own for others to discover. Drivly works the same way in either direction.",
        offset: "lg:ml-4",
    },
];

const WhyDrivly = () => {
    return (
        <section
            id="why-drivly"
            className="relative overflow-hidden py-24 sm:py-32 lg:py-40"
            style={{
                background: "radial-gradient(120% 100% at 15% 0%, #151618 0%, #0B0B0C 55%)",
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid gap-16 lg:grid-cols-12 lg:gap-x-10"
                >
                    {/* statement */}
                    <div className="lg:col-span-5">
                        <motion.p
                            variants={fadeUp}
                            className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#C7A76C]"
                        >
                            Why Drivly
                        </motion.p>

                        <motion.h2
                            variants={fadeUp}
                            className="mt-6 max-w-md text-4xl font-medium leading-[1.12] tracking-[-0.02em] text-[#F4F2ED] sm:text-5xl"
                        >
                            A car gets you there.
                            <span className="block text-[#F4F2ED]/50">
                                The right car makes it worth the drive.
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeUp}
                            className="mt-7 max-w-sm text-sm leading-7 text-[#F4F2ED]/55 sm:text-base"
                        >
                            Drivly is built for people who care about the vehicle as much
                            as the destination, from the first search to the final mile.
                        </motion.p>
                    </div>

                    {/* spine — the section's one bold move */}
                    <div className="hidden lg:col-span-1 lg:flex lg:justify-center">
                        <motion.span
                            variants={lineDraw}
                            style={{ transformOrigin: "top" }}
                            className="w-px scale-y-0 bg-gradient-to-b from-transparent via-[#C7A76C]/35 to-transparent"
                        />
                    </div>

                    {/* reasons */}
                    <div className="lg:col-span-6">
                        <div className="flex flex-col gap-12 sm:gap-14">
                            {reasons.map((r) => (
                                <motion.div key={r.index} variants={fadeUp} className={r.offset}>
                                    <div className="flex items-baseline gap-4">
                                        <span className="text-[13px] tracking-[0.06em] text-[#C7A76C]">
                                            {r.index}
                                        </span>
                                        <motion.span
                                            variants={lineDraw}
                                            style={{ transformOrigin: "left" }}
                                            className="h-px flex-1 scale-x-0 bg-[#C7A76C]/30"
                                        />
                                    </div>

                                    <h3 className="mt-4 text-xl font-medium tracking-[-0.01em] text-[#F4F2ED] sm:text-2xl">
                                        {r.title}
                                    </h3>

                                    <p className="mt-3 max-w-md text-sm leading-relaxed text-[#F4F2ED]/55">
                                        {r.body}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyDrivly;