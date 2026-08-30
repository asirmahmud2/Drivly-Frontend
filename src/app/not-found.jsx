import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";

const NotFound = () => {
    return (
        <main className="min-h-screen bg-[#0B0B0C]">

            <section className="relative min-h-screen overflow-hidden">

                {/* BACKGROUND IMAGE */}
                <Image
                    src="https://i.ibb.co.com/mCgxq1MG/Chat-GPT-Image-Aug-26-2026-12-49-11-PM.png"
                    alt="Drivly vehicle"
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-right"
                />

                {/* IMAGE OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-[#0B0B0C]/90 to-[#0B0B0C]/15" />

                <div className="absolute inset-0 bg-[#0B0B0C]/15" />

                {/* CONTENT */}
                <div className="relative z-10 flex min-h-screen items-center">
                    <div className="container mx-auto px-5 py-16 sm:px-8 lg:px-10">

                        <div className="max-w-xl">

                            {/* EYEBROW */}
                            <div className="flex items-center gap-3">
                                <span className="h-px w-9 bg-[#C7A76C]" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C7A76C]">
                                    Drivly
                                </p>
                            </div>

                            {/* 404 */}
                            <p className="mt-7 text-[110px] font-semibold leading-none tracking-[-0.08em] text-[#F4F2ED]/10 sm:text-[150px] lg:text-[190px]">
                                404
                            </p>

                            {/* HEADING */}
                            <h1 className="-mt-7 text-4xl font-semibold leading-[1.05] tracking-tight text-[#F4F2ED] sm:-mt-10 sm:text-5xl lg:text-6xl">
                                This road
                                <span className="text-[#C7A76C]">
                                    {" "}doesn't exist.
                                </span>
                            </h1>

                            {/* DESCRIPTION */}
                            <p className="mt-5 max-w-md text-sm leading-7 text-[#F4F2ED]/55 sm:text-base sm:leading-8">
                                The page you're looking for may have moved,
                                disappeared, or taken a different turn. Let's
                                get you back on the road.
                            </p>

                            {/* ACTIONS */}
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                <Link
                                    href="/"
                                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#C7A76C] px-6 text-sm font-semibold text-[#0B0B0C] transition-all duration-300 hover:bg-[#AF8D52]"
                                >
                                    <FiArrowLeft className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                    Back to Home
                                </Link>

                                <Link
                                    href="/explore"
                                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-medium text-[#F4F2ED] backdrop-blur-sm transition-all duration-300 hover:border-[#C7A76C]/50 hover:bg-white/10"
                                >
                                    Explore Cars
                                    <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                                </Link>

                            </div>

                            {/* FOOTNOTE */}
                            <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-[#F4F2ED]/25">
                                Your next journey is still waiting.
                            </p>

                        </div>

                    </div>
                </div>

            </section>

        </main>
    );
};

export default NotFound;