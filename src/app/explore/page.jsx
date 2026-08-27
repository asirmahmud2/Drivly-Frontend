import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiSearch,
    FiSliders,
    FiMapPin,
    FiUsers,
    FiArrowUpRight,
} from "react-icons/fi";

const ExploreCars = async () => {
    const res = await fetch("http://localhost:5000/cars", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await res.json();
    console.log(data);

    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* Page Intro */}
            <section className="border-b border-[#D9D6CF] bg-[#F4F2ED]">
                <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <div className="max-w-3xl">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                            The Drivly Collection
                        </p>

                        <h1 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-[#111214] sm:text-5xl lg:text-6xl">
                            Find the car that fits
                            <span className="text-[#C7A76C]">
                                {" "}your journey.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6F706D] sm:text-base sm:leading-8">
                            Explore a curated collection of vehicles selected
                            for comfort, performance, style, and the freedom
                            to drive your way.
                        </p>

                    </div>
                </div>
            </section>

            {/* Search / Filter Bar - Static for now */}
            <section className="border-b border-[#D9D6CF] bg-[#F4F2ED]">
                <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
                    <div className="grid gap-3 md:grid-cols-[1fr_220px_190px]">

                        {/* Search */}
                        <div className="flex h-12 items-center rounded-xl border border-[#D9D6CF] bg-white px-4">
                            <FiSearch className="mr-3 shrink-0 text-[#7C7D79]" />

                            <input
                                type="text"
                                placeholder="Search by brand or model..."
                                className="w-full bg-transparent text-sm text-[#111214] outline-none placeholder:text-[#9A9B97]"
                            />
                        </div>

                        {/* Vehicle Type */}
                        <div className="relative flex h-12 items-center rounded-xl border border-[#D9D6CF] bg-white">
                            <FiSliders className="ml-4 shrink-0 text-[#7C7D79]" />

                            <select
                                defaultValue="all-types"
                                className="h-full w-full cursor-pointer appearance-none bg-transparent px-3 pr-10 text-sm text-[#111214] outline-none"
                            >
                                <option value="all-types">
                                    All Vehicle Types
                                </option>

                                <option value="sedan">
                                    Sedan
                                </option>

                                <option value="suv">
                                    SUV
                                </option>

                                <option value="sports-coupe">
                                    Sports Coupe
                                </option>

                                <option value="luxury">
                                    Luxury
                                </option>
                            </select>

                            <span className="pointer-events-none absolute right-4 text-[#7C7D79]">
                                ↓
                            </span>
                        </div>

                        {/* Availability */}
                        <div className="relative flex h-12 items-center rounded-xl border border-[#D9D6CF] bg-white">
                            <select
                                defaultValue="all"
                                className="h-full w-full cursor-pointer appearance-none bg-transparent px-4 pr-10 text-sm text-[#111214] outline-none"
                            >
                                <option value="all">
                                    All Cars
                                </option>

                                <option value="available">
                                    Available
                                </option>

                                <option value="unavailable">
                                    Unavailable
                                </option>
                            </select>

                            <span className="pointer-events-none absolute right-4 text-[#7C7D79]">
                                ↓
                            </span>
                        </div>

                    </div>
                </div>
            </section>

            {/* Results */}
            <section>
                <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

                    {/* Static Result Count */}
                    <div className="mb-8">
                        <p className="text-sm font-medium text-[#6F706D]">
                            Vehicles available
                        </p>

                        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
                            Explore the collection
                        </h2>
                    </div>

                    {/* Cars */}
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {data.map((car) => (
                            <article
                                key={car._id}
                                className="group overflow-hidden rounded-2xl border border-[#D9D6CF] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A76C]/50 hover:shadow-[0_24px_60px_rgba(11,11,12,0.10)]"
                            >

                                {/* Image */}
                                <div className="relative aspect-[16/10] overflow-hidden bg-[#151618]">

                                    <Image
                                        src={car.image}
                                        alt={car.name}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                                    {/* Availability */}
                                    <div className="absolute left-4 top-4">
                                        {car.availability ? (
                                            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[#C7A76C]" />
                                                Available
                                            </div>
                                        ) : (
                                            <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                                                Unavailable
                                            </div>
                                        )}
                                    </div>

                                    {/* Type */}
                                    <div className="absolute bottom-4 left-4">
                                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-white/85">
                                            {car.type}
                                        </span>
                                    </div>

                                </div>

                                {/* Card Content */}
                                <div className="p-5 sm:p-6">

                                    {/* Brand */}
                                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
                                        {car.brand}
                                    </p>

                                    {/* Model + Year */}
                                    <div className="mt-2">
                                        <h3 className="text-xl font-semibold tracking-tight text-[#111214]">
                                            {car.model}
                                        </h3>

                                        <p className="mt-1 text-sm text-[#6F706D]">
                                            {car.year}
                                        </p>
                                    </div>

                                    {/* Specs */}
                                    <div className="mt-5 grid grid-cols-3 divide-x divide-[#EAE7E0] border-y border-[#EAE7E0] py-4">

                                        <div className="pr-3">
                                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#92938F]">
                                                Seats
                                            </p>

                                            <div className="mt-1.5 flex items-center gap-1.5">
                                                <FiUsers className="text-sm text-[#C7A76C]" />

                                                <span className="text-sm font-medium text-[#111214]">
                                                    {car.seat_capacity}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="px-3">
                                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#92938F]">
                                                Drive
                                            </p>

                                            <p className="mt-1.5 truncate text-sm font-medium text-[#111214]">
                                                {car.transmission}
                                            </p>
                                        </div>

                                        <div className="pl-3">
                                            <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#92938F]">
                                                Fuel
                                            </p>

                                            <p className="mt-1.5 truncate text-sm font-medium text-[#111214]">
                                                {car.fuel_type}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Location + Price */}
                                    <div className="mt-5 flex items-end justify-between gap-4">

                                        <div className="flex min-w-0 items-center gap-2">
                                            <FiMapPin className="shrink-0 text-[#C7A76C]" />

                                            <span className="truncate text-sm text-[#6F706D]">
                                                {car.pickup_location}
                                            </span>
                                        </div>

                                        <div className="shrink-0 text-right">
                                            <p className="text-[11px] text-[#92938F]">
                                                From
                                            </p>

                                            <p className="mt-0.5 text-xl font-semibold tracking-tight text-[#111214]">
                                                ${car.daily_rent_price}

                                                <span className="ml-1 text-xs font-normal text-[#6F706D]">
                                                    / day
                                                </span>
                                            </p>
                                        </div>

                                    </div>

                                    {/* Details */}
                                    <Link
                                        href={`/cars/${car._id}`}
                                        className="group/button mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#C7A76C] bg-transparent text-sm font-semibold text-[#111214] transition-all duration-300 hover:bg-[#C7A76C] hover:text-[#0B0B0C]"
                                    >
                                        View Details

                                        <FiArrowUpRight className="text-base transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                                    </Link>

                                </div>
                            </article>
                        ))}

                    </div>

                </div>
            </section>

        </main>
    );
};

export default ExploreCars;