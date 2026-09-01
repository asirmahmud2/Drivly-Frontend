import React from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import FeaturedCarGallery from "./FeaturedCarGallery";

const FeaturedCars = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/featured` , {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const data = await res.json();
    const cars = data?.slice(0, 6) || [];

    return (
        <section className="overflow-hidden bg-[#F4F2ED] py-20 sm:py-24 lg:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* EDITORIAL INTRO */}
                <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="max-w-4xl">
                        <div className="flex items-center gap-3">
                            <span className="h-px w-8 bg-[#C7A76C]" />
                            <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[#C7A76C] sm:text-xs">
                                The Drivly Collection
                            </p>
                        </div>

                        <h2 className="mt-5 max-w-4xl text-5xl font-medium leading-[0.96] tracking-[-0.055em] text-[#111214] sm:text-6xl lg:text-7xl">
                            Cars worth taking
                            <span className="block text-[#C7A76C]">
                                the long way home.
                            </span>
                        </h2>
                    </div>

                    <div className="max-w-sm lg:pb-1">
                        <p className="text-sm leading-7 text-[#6F706D] sm:text-base">
                            A considered selection of distinctive vehicles for
                            drivers who care about the experience as much as
                            the destination.
                        </p>

                        <Link href="/explore" className="group mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#111214] transition-colors duration-300 hover:text-[#C7A76C]">
                            Explore the collection
                            <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                {/* GALLERY WALL — all 6 cars */}
                {cars.length > 0 && <FeaturedCarGallery cars={cars} />}

            </div>
        </section>
    );
};

export default FeaturedCars;