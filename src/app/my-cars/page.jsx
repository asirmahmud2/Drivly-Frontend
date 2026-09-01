import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowUpRight,
    FiMapPin,
    FiUsers,
} from "react-icons/fi";
import { Button, Card } from "@heroui/react";
import { DeleteModal } from "@/Components/Functionality/DeleteModal";
import { EditModal } from "@/Components/Functionality/EditModal";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyAddedCars = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    console.log("My Token", token);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/add-car/${user?.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            cache: "no-store",
        }
    );

    const data = await res.json();

    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* PAGE INTRO */}
            <section className="border-b border-[#D9D6CF]">
                <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                                Your Drivly Garage
                            </p>

                            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#111214] sm:text-5xl lg:text-6xl">
                                Your vehicles,
                                <span className="text-[#C7A76C]">
                                    {" "}your control.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6F706D] sm:text-base sm:leading-8">
                                Manage the vehicles you have listed on Drivly,
                                keep their information current, and control
                                their availability.
                            </p>
                        </div>

                        <Link
                            href="/add-car"
                            className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#0B0B0C] px-6 py-3 text-sm font-semibold text-[#F4F2ED] transition-colors duration-200 hover:bg-[#151618]"
                        >
                            Add Another Vehicle
                            <FiArrowUpRight />
                        </Link>

                    </div>
                </div>
            </section>

            {/* VEHICLE LIST */}
            <section>
                <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                    {/* SECTION HEADER */}
                    <div className="mb-8 flex flex-col gap-3 border-b border-[#D9D6CF] pb-7 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A76C]">
                                Your Listings
                            </p>

                            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
                                Managed vehicles
                            </h2>
                        </div>

                        <p className="text-sm text-[#6F706D]">
                            {data.length}{" "}
                            {data.length === 1
                                ? "vehicle"
                                : "vehicles"}{" "}
                            listed
                        </p>

                    </div>

                    {/* EMPTY STATE */}
                    {data.length === 0 ? (
                        <Card className="rounded-[2rem] border border-[#D9D6CF] bg-white shadow-none">
                            <Card.Content className="flex flex-col items-center px-6 py-20 text-center sm:py-24">

                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#151618] text-[#C7A76C]">
                                    <FiArrowUpRight className="text-2xl" />
                                </div>

                                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-[#111214]">
                                    No vehicles listed yet.
                                </h3>

                                <p className="mt-3 max-w-md text-sm leading-7 text-[#6F706D]">
                                    Add your first vehicle to start building
                                    your Drivly garage.
                                </p>

                                <Link
                                    href="/add-car"
                                    className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0B0B0C] px-6 py-3 text-sm font-semibold text-[#F4F2ED] transition-colors duration-200 hover:bg-[#151618]"
                                >
                                    Add Your First Vehicle
                                    <FiArrowUpRight />
                                </Link>

                            </Card.Content>
                        </Card>
                    ) : (
                        /* VEHICLE GRID */
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {data.map((car) => {
                                const image = Array.isArray(car.image)
                                    ? car.image[0]
                                    : car.image;

                                return (
                                    <Card
                                        key={car._id}
                                        className="group overflow-hidden rounded-[2rem] border border-[#D9D6CF] bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A76C]/40 hover:shadow-[0_24px_60px_rgba(11,11,12,0.08)]"
                                    >

                                        {/* IMAGE */}
                                        <div className="relative aspect-[16/10] overflow-hidden bg-[#151618]">

                                            {image && (
                                                <Image
                                                    src={image}
                                                    alt={car.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/60 via-transparent to-[#0B0B0C]/5" />

                                            {/* Availability */}
                                            <div className="absolute left-4 top-4">
                                                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0B0C]/45 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${car.availability
                                                            ? "bg-[#C7A76C]"
                                                            : "bg-[#A64B45]"
                                                            }`}
                                                    />

                                                    {car.availability
                                                        ? "Available"
                                                        : "Unavailable"}
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="absolute bottom-4 right-4">
                                                <div className="rounded-xl border border-white/10 bg-[#0B0B0C]/55 px-3 py-2 backdrop-blur-md">
                                                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/40">
                                                        Daily
                                                    </p>

                                                    <p className="mt-0.5 text-lg font-semibold text-white">
                                                        ${car.daily_rent_price}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* CONTENT */}
                                        <Card.Content className="p-5 sm:p-6">

                                            {/* Brand */}
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
                                                {car.brand}
                                            </p>

                                            {/* Vehicle */}
                                            <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#111214]">
                                                {car.name}
                                            </h3>

                                            <p className="mt-1 text-sm text-[#6F706D]">
                                                {car.year} · {car.type}
                                            </p>

                                            {/* Information */}
                                            <div className="mt-5 grid grid-cols-2 gap-3 border-y border-[#EAE7E0] py-4">

                                                {/* Location */}
                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Location
                                                    </p>

                                                    <div className="mt-1.5 flex min-w-0 items-center gap-2">
                                                        <FiMapPin className="shrink-0 text-sm text-[#C7A76C]" />

                                                        <span className="truncate text-sm font-medium text-[#111214]">
                                                            {car.pickup_location}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Capacity */}
                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Capacity
                                                    </p>

                                                    <div className="mt-1.5 flex items-center gap-2">
                                                        <FiUsers className="text-sm text-[#C7A76C]" />

                                                        <span className="text-sm font-medium text-[#111214]">
                                                            {car.seat_capacity} Seats
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>

                                            {/* Booking Count */}
                                            <div className="mt-4 flex items-center justify-between">

                                                <p className="text-xs text-[#92938F]">
                                                    {car.booking_count || 0}{" "}
                                                    {car.booking_count === 1
                                                        ? "booking"
                                                        : "bookings"}
                                                </p>

                                                <p className="text-xs font-medium text-[#52705A]">
                                                    {car.availability
                                                        ? "Ready to rent"
                                                        : "Not available"}
                                                </p>

                                            </div>

                                            {/* MANAGEMENT ACTIONS */}
                                            <div className="mt-6 grid grid-cols-2 gap-3">

                                                <EditModal data={car} />

                                                <DeleteModal data={car} />

                                            </div>

                                        </Card.Content>
                                    </Card>
                                );
                            })}

                        </div>
                    )}

                </div>
            </section>

            {/* BOTTOM BRAND SECTION */}
            <section className="bg-[#0B0B0C]">
                <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-20 lg:px-8">

                    <div className="max-w-2xl">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C]">
                            Your Garage
                        </p>

                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F4F2ED] sm:text-4xl">
                            Keep every listing
                            <span className="text-[#C7A76C]">
                                {" "}exactly right.
                            </span>
                        </h2>

                        <p className="mt-4 max-w-xl text-sm leading-7 text-[#F4F2ED]/45 sm:text-base">
                            Maintain accurate vehicle information so renters
                            always know what to expect when they choose your
                            car.
                        </p>

                    </div>

                </div>
            </section>

        </main>
    );
};

export default MyAddedCars;