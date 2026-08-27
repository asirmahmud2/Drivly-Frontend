import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiCalendar, FiCheck, FiDroplet, FiEdit3, FiMapPin, FiSettings, FiTrash2, FiUsers } from "react-icons/fi";
import { EditModal } from "@/Components/Functionality/EditModal";

const CarDetails = async ({ params }) => {
    const { id } = await params;

    const result = await fetch(`http://localhost:5000/cars/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await result.json();

    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* BACK NAVIGATION */}
            <section className="border-b border-[#D9D6CF] bg-[#F4F2ED]">
                <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
                    <Link
                        href="/explore"
                        className="group inline-flex items-center gap-2 text-sm font-medium text-[#6F706D] transition-colors duration-200 hover:text-[#111214]"
                    >
                        <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" />
                        Back to Explore
                    </Link>
                </div>
            </section>

            {/* VEHICLE HERO */}
            <section>
                <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

                    {/* Vehicle Identity */}
                    <div className="mx-auto max-w-5xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                            {data.brand}
                        </p>

                        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight text-[#111214] sm:text-5xl lg:text-6xl">
                            {data.model}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm text-[#6F706D]">
                            <span>{data.year}</span>

                            <span className="h-1 w-1 rounded-full bg-[#C7A76C]" />

                            <span>{data.type}</span>

                            <span className="h-1 w-1 rounded-full bg-[#C7A76C]" />

                            <span>{data.body_style}</span>
                        </div>
                    </div>

                    {/* Main Image */}
                    <div className="relative mt-8 overflow-hidden rounded-[2rem] bg-[#151618] shadow-[0_30px_90px_rgba(11,11,12,0.14)] sm:mt-10 lg:mt-12">
                        <div className="relative aspect-[16/9] min-h-[320px] sm:min-h-[440px] lg:min-h-[620px]">

                            <Image
                                src={data.image}
                                alt={data.name || data.model}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
                                className="object-cover"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/75 via-[#0B0B0C]/5 to-transparent" />

                            {/* Availability */}
                            <div className="absolute left-5 top-5 sm:left-7 sm:top-7">
                                {data.availability ? (
                                    <div className="flex items-center gap-2 rounded-full border border-white/20 bg-[#0B0B0C]/45 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C7A76C]" />
                                        Available for booking
                                    </div>
                                ) : (
                                    <div className="rounded-full border border-white/20 bg-[#0B0B0C]/45 px-4 py-2 text-xs font-medium text-white backdrop-blur-xl">
                                        Currently unavailable
                                    </div>
                                )}
                            </div>

                            {/* Image Bottom Information */}
                            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 lg:p-10">
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-[0.25em] text-white/60">
                                            {data.color}
                                        </p>

                                        <p className="mt-2 text-sm text-white/75">
                                            {data.pickup_location}
                                        </p>
                                    </div>

                                    <div className="text-left sm:text-right">
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                                            Starting from
                                        </p>

                                        <div className="mt-1 flex items-baseline gap-2">
                                            <span className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                                                ${data.daily_rent_price}
                                            </span>

                                            <span className="text-sm text-white/50">
                                                / day
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* SPECIFICATIONS */}
            <section>
                <div className="container mx-auto px-4 py-2 sm:px-6 sm:py-4 lg:px-8 lg:py-6">

                    <div className="border-y border-[#D9D6CF]">

                        <div className="py-6 sm:py-8">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C7A76C]">
                                Vehicle specifications
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
                                Everything at a glance.
                            </h2>
                        </div>

                        <div className="grid border-t border-[#EAE7E0] sm:grid-cols-2 lg:grid-cols-4">

                            {/* Seats */}
                            <div className="border-b border-[#EAE7E0] px-1 py-6 sm:border-r sm:px-6 lg:border-b-0">
                                <div className="flex items-center gap-3">
                                    <FiUsers className="text-lg text-[#C7A76C]" />

                                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#92938F]">
                                        Seats
                                    </span>
                                </div>

                                <p className="mt-3 text-lg font-semibold text-[#111214]">
                                    {data.seat_capacity}
                                </p>
                            </div>

                            {/* Transmission */}
                            <div className="border-b border-[#EAE7E0] px-1 py-6 sm:border-r sm:px-6 lg:border-b-0">
                                <div className="flex items-center gap-3">
                                    <FiSettings className="text-lg text-[#C7A76C]" />

                                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#92938F]">
                                        Transmission
                                    </span>
                                </div>

                                <p className="mt-3 text-lg font-semibold text-[#111214]">
                                    {data.transmission}
                                </p>
                            </div>

                            {/* Fuel */}
                            <div className="border-b border-[#EAE7E0] px-1 py-6 sm:border-r sm:px-6 lg:border-b-0">
                                <div className="flex items-center gap-3">
                                    <FiDroplet className="text-lg text-[#C7A76C]" />

                                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#92938F]">
                                        Fuel
                                    </span>
                                </div>

                                <p className="mt-3 text-lg font-semibold text-[#111214]">
                                    {data.fuel_type}
                                </p>
                            </div>

                            {/* Year */}
                            <div className="px-1 py-6 sm:px-6">
                                <div className="flex items-center gap-3">
                                    <FiCalendar className="text-lg text-[#C7A76C]" />

                                    <span className="text-xs font-medium uppercase tracking-[0.16em] text-[#92938F]">
                                        Model Year
                                    </span>
                                </div>

                                <p className="mt-3 text-lg font-semibold text-[#111214]">
                                    {data.year}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* ABOUT + FEATURES */}
            <section>
                <div className="container mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">

                    <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">

                        {/* About */}
                        <div>

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C7A76C]">
                                About the vehicle
                            </p>

                            <h2 className="mt-3 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#111214] sm:text-4xl">
                                Built for the way you drive.
                            </h2>

                            <p className="mt-6 max-w-2xl text-sm leading-8 text-[#6F706D] sm:text-base">
                                {data.description}
                            </p>

                            {/* Vehicle Details */}
                            <div className="mt-10 grid border-t border-[#D9D6CF] sm:grid-cols-2">

                                <div className="border-b border-[#EAE7E0] py-5 sm:border-r sm:pr-7">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#92938F]">
                                        Brand
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-[#111214]">
                                        {data.brand}
                                    </p>
                                </div>

                                <div className="border-b border-[#EAE7E0] py-5 sm:pl-7">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#92938F]">
                                        Model
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-[#111214]">
                                        {data.model}
                                    </p>
                                </div>

                                <div className="border-b border-[#EAE7E0] py-5 sm:border-r sm:pr-7">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#92938F]">
                                        Exterior color
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-[#111214]">
                                        {data.color}
                                    </p>
                                </div>

                                <div className="border-b border-[#EAE7E0] py-5 sm:pl-7">
                                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#92938F]">
                                        Body style
                                    </p>

                                    <p className="mt-2 text-sm font-medium text-[#111214]">
                                        {data.body_style}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Features */}
                        <div className="rounded-[2rem] bg-[#151618] p-7 sm:p-9 lg:p-10">

                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C7A76C]">
                                Key features
                            </p>

                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl">
                                Designed to stand out.
                            </h2>

                            <div className="mt-8 space-y-0">

                                {data.key_features?.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 border-b border-white/10 py-4 first:pt-0 last:border-b-0 last:pb-0"
                                    >
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C7A76C]/10 text-[#C7A76C]">
                                            <FiCheck className="text-sm" />
                                        </div>

                                        <p className="text-sm leading-6 text-[#F4F2ED]/75">
                                            {feature}
                                        </p>
                                    </div>
                                ))}

                            </div>

                        </div>
                    </div>

                </div>
            </section>

            {/* PICKUP + RENTAL RATE */}
            <section>
                <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8">

                    <div className="grid overflow-hidden rounded-[2rem] border border-[#D9D6CF] bg-white lg:grid-cols-2">

                        {/* Pickup */}
                        <div className="p-7 sm:p-9 lg:p-10">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A76C]">
                                Pickup location
                            </p>

                            <div className="mt-5 flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#151618] text-[#C7A76C]">
                                    <FiMapPin />
                                </div>

                                <div>
                                    <p className="text-lg font-semibold text-[#111214]">
                                        {data.pickup_location}
                                    </p>

                                    <p className="mt-1 text-sm text-[#6F706D]">
                                        Convenient pickup for your next journey.
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Rental Rate */}
                        <div className="border-t border-[#EAE7E0] bg-[#FAF9F6] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:p-10">

                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A76C]">
                                Rental rate
                            </p>

                            <div className="mt-4 flex items-baseline gap-2">

                                <span className="text-4xl font-semibold tracking-tight text-[#111214] sm:text-5xl">
                                    ${data.daily_rent_price}
                                </span>

                                <span className="text-sm text-[#6F706D]">
                                    / day
                                </span>

                            </div>

                            <p className="mt-2 text-sm text-[#6F706D]">
                                Simple daily pricing with no unnecessary complexity.
                            </p>

                        </div>

                    </div>

                </div>
            </section>

            {/*  ACTION AREA */}
            <section>
                <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-7 lg:px-8">

                    <div className="rounded-[2rem] border border-[#D9D6CF] bg-white p-4 sm:p-5">

                        <div className="flex flex-col gap-3 lg:flex-row">

                            {/* Primary Booking */}
                            <Link
                                href={`/booking/${data._id}`}
                                className="group flex min-h-14 flex-1 items-center justify-center gap-3 rounded-xl bg-[#0B0B0C] px-6 py-3 text-sm font-semibold text-[#F4F2ED] transition-all duration-300 hover:bg-[#151618]"
                            >
                                <span>Book This Vehicle</span>

                                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C7A76C] text-[#0B0B0C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    <FiArrowUpRight className="text-sm" />
                                </span>
                            </Link>

                            {/* Edit */}
                            <EditModal data={data}/>

                            {/* Delete */}
                            <button
                                type="button"
                                className="group flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#A64B45]/20 bg-[#FFFDFC] px-6 py-3 text-sm font-medium text-[#A64B45] transition-all duration-300 hover:border-[#A64B45]/40 hover:bg-[#A64B45]/5"
                            >
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A64B45]/5 transition-colors duration-300 group-hover:bg-[#A64B45]/10">
                                    <FiTrash2 />
                                </span>

                                <span>Delete Vehicle</span>
                            </button>

                        </div>

                    </div>

                </div>
            </section>

            {/* FINAL CTA */}
            <section>
                <div className="container mx-auto px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

                    <div className="relative overflow-hidden rounded-[2rem] bg-[#0B0B0C] px-6 py-12 sm:px-10 sm:py-16 lg:px-16">

                        {/* Decorative Circles */}
                        <div className="absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full border border-[#C7A76C]/10" />

                        <div className="absolute right-[-35px] top-[-55px] h-56 w-56 rounded-full border border-[#C7A76C]/10" />

                        <div className="absolute bottom-[-100px] left-[-100px] h-72 w-72 rounded-full border border-white/5" />

                        {/* CTA Content */}
                        <div className="relative z-10 max-w-2xl">

                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C]">
                                Your next drive
                            </p>

                            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-[#F4F2ED] sm:text-4xl lg:text-5xl">
                                Ready to get behind the wheel?
                            </h2>

                            <p className="mt-5 max-w-xl text-sm leading-7 text-[#F4F2ED]/55 sm:text-base">
                                Reserve the {data.brand} {data.model} and turn
                                your next journey into something worth remembering.
                            </p>

                        </div>

                    </div>
                </div>
            </section>

        </main>
    );
};

export default CarDetails;