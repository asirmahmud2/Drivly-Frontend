import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

const Hero = () => {
    return (
        <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-[#0B0B0C]">
            {/* Background Image */}
            <Image
                src="https://i.ibb.co.com/mCgxq1MG/Chat-GPT-Image-Aug-26-2026-12-49-11-PM.png"
                alt="Premium luxury car"
                fill
                priority
                className="object-cover object-center"
            />

            {/* Readability Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/95 via-[#0B0B0C]/65 to-[#0B0B0C]/10" />

            {/* Bottom subtle fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0C]/60 to-transparent" />

            {/* Content */}
            <div className="relative z-10 container mx-auto flex min-h-[calc(100vh-80px)] items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl py-20 sm:max-w-2xl lg:max-w-3xl">

                    {/* Brand Identity */}
                    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                        Premium Mobility, Refined, Fast, Reliable
                    </p>

                    {/* Title */}
                    <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight text-[#F4F2ED] sm:text-6xl lg:text-7xl xl:text-8xl">
                        Your Journey.
                        <br />
                        <span className="text-[#C7A76C]">
                            Your Drive.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-xl text-base leading-7 text-[#F4F2ED]/70 sm:text-lg sm:leading-8">
                        Discover premium vehicles, effortless booking, and
                        flexible rentals designed around the way you move.
                    </p>

                    {/* CTA */}
                    <div className="mt-9">
                        <Link
                            href="/explore"
                            className="group inline-flex items-center gap-3 rounded-xl border border-[#C7A76C] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#F4F2ED] transition-all duration-300 hover:bg-[#C7A76C] hover:text-[#0B0B0C]"
                        >
                            Explore Cars
                            <FiArrowUpRight className="text-lg transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;