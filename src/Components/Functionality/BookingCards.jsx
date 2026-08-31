"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    FiArrowUpRight,
    FiCalendar,
    FiClock,
    FiMapPin,
    FiUser,
    FiX,
} from "react-icons/fi";
import { Button, Card } from "@heroui/react";
import { cancelErrorToast, cancelSuccessToast } from "../Toasters";
import { authClient } from "@/lib/auth-client";

const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const BookingCards = ({ bookings = [] }) => {
    const [visibleBookings, setVisibleBookings] = useState(bookings);

    const handleCancel = async (bookingId) => {
        const { data: tokenData } = await authClient.token();
        console.log("Token Data:", tokenData);
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/booking/${bookingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`,
            },
        });

        if (!res.ok) {
            cancelErrorToast();
            return;
        }

        setVisibleBookings((currentBookings) =>
            currentBookings.filter((booking) => booking._id !== bookingId)
        );
        cancelSuccessToast()
    };

    if (!visibleBookings.length) {
        return (
            <div className="mx-auto max-w-3xl">
                <Card className="rounded-[2rem] border border-[#D9D6CF] bg-white shadow-none">
                    <Card.Content className="flex flex-col items-center px-6 py-20 text-center sm:py-24">

                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#151618] text-[#C7A76C]">
                            <FiCalendar className="text-2xl" />
                        </div>

                        <h2 className="mt-6 text-2xl font-semibold tracking-tight text-[#111214]">
                            No bookings yet.
                        </h2>

                        <p className="mt-3 max-w-md text-sm leading-7 text-[#6F706D]">
                            Your future journeys will appear here once you
                            reserve a vehicle through Drivly.
                        </p>

                        <Button
                            as={Link}
                            href="/explore"
                            className="mt-7 rounded-xl bg-[#0B0B0C] px-6 text-sm font-semibold text-[#F4F2ED] hover:bg-[#151618]"
                        >
                            Explore Cars
                            <FiArrowUpRight />
                        </Button>

                    </Card.Content>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-8">

            {/* Booking Summary */}
            <div className="flex flex-col gap-4 border-b border-[#D9D6CF] pb-7 sm:flex-row sm:items-end sm:justify-between">

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C7A76C]">
                        Reservations
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
                        Your upcoming drives
                    </h2>
                </div>

                <div className="flex items-center gap-2 text-sm text-[#6F706D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#52705A]" />

                    {visibleBookings.length}{" "}
                    {visibleBookings.length === 1
                        ? "reservation"
                        : "reservations"}
                </div>

            </div>

            {/* Booking List */}
            <div className="space-y-6">

                {visibleBookings.map((booking) => {
                    const image = Array.isArray(booking.car_image)
                        ? booking.car_image[0]
                        : booking.car_image;

                    return (
                        <Card
                            key={booking._id}
                            className="group overflow-hidden rounded-[2rem] border border-[#D9D6CF] bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-[#C7A76C]/40 hover:shadow-[0_24px_60px_rgba(11,11,12,0.08)]"
                        >
                            <div className="grid lg:grid-cols-[440px_1fr] xl:grid-cols-[480px_1fr]">

                                {/* VEHICLE IMAGE */}
                                <div className="relative aspect-[16/11] overflow-hidden bg-[#151618] lg:aspect-auto lg:min-h-[340px]">

                                    {image && (
                                        <Image
                                            src={image}
                                            alt={booking.car_name}
                                            fill
                                            sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 440px, 480px"
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/65 via-transparent to-transparent" />

                                    {/* Status */}
                                    <div className="absolute left-5 top-5">
                                        <div className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0B0B0C]/45 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#C7A76C]" />
                                            Reserved
                                        </div>
                                    </div>

                                    {/* Car Name */}
                                    <div className="absolute bottom-5 left-5 right-5">
                                        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A76C]">
                                            {booking.car_name}
                                        </p>
                                    </div>

                                </div>

                                {/* BOOKING DETAILS */}
                                <Card.Content className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">

                                    <div>

                                        {/* Heading */}
                                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                                            <div>
                                                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A76C]">
                                                    Booking
                                                </p>

                                                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-[#111214]">
                                                    {booking.car_name}
                                                </h3>
                                            </div>

                                            <div className="text-left sm:text-right">
                                                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#92938F]">
                                                    Total
                                                </p>

                                                <p className="mt-1 text-2xl font-semibold tracking-tight text-[#111214]">
                                                    ${booking.total_price}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Rental Details */}
                                        <div className="mt-7 grid gap-4 border-y border-[#EAE7E0] py-6 sm:grid-cols-2">

                                            {/* Pickup */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F2ED] text-[#C7A76C]">
                                                    <FiCalendar />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Pickup
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#111214]">
                                                        {formatDate(
                                                            booking.pickup_date
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Return */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F2ED] text-[#C7A76C]">
                                                    <FiClock />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Return
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#111214]">
                                                        {formatDate(
                                                            booking.return_date
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Location */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F2ED] text-[#C7A76C]">
                                                    <FiMapPin />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Pickup location
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#111214]">
                                                        {booking.pickup_location}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Driver */}
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F4F2ED] text-[#C7A76C]">
                                                    <FiUser />
                                                </div>

                                                <div>
                                                    <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#92938F]">
                                                        Driver
                                                    </p>

                                                    <p className="mt-1 text-sm font-medium text-[#111214]">
                                                        {booking.driver_needed
                                                            ? "Driver required"
                                                            : "Self drive"}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Pricing */}
                                        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                            <div>
                                                <p className="text-xs text-[#92938F]">
                                                    {booking.total_days}{" "}
                                                    {booking.total_days === 1
                                                        ? "day"
                                                        : "days"}{" "}
                                                    · $
                                                    {
                                                        booking.daily_rent_price
                                                    }
                                                    / day
                                                </p>

                                                {booking.special_note && (
                                                    <p className="mt-2 max-w-lg text-xs leading-5 text-[#6F706D]">
                                                        Note:{" "}
                                                        {booking.special_note}
                                                    </p>
                                                )}
                                            </div>

                                            <p className="text-sm font-medium text-[#52705A]">
                                                Booking confirmed
                                            </p>

                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                                        <Link href={`/explore/${booking.car_id}`}>
                                            <Button
                                                variant="outline"
                                                className="h-11 rounded-xl border-[#D9D6CF] bg-transparent px-5 text-sm font-medium text-[#111214] hover:border-[#C7A76C] hover:bg-[#F4F2ED]"
                                            >
                                                View Vehicle
                                                <FiArrowUpRight />
                                            </Button>
                                        </Link>

                                        <Button
                                            type="button"
                                            variant="outline"
                                            onPress={() =>
                                                handleCancel(booking._id)
                                            }
                                            className="h-11 rounded-xl border-[#A64B45]/20 bg-transparent px-5 text-sm font-medium text-[#A64B45] hover:border-[#A64B45]/40 hover:bg-[#A64B45]/5"
                                        >
                                            <FiX />
                                            Cancel Booking
                                        </Button>

                                    </div>

                                </Card.Content>
                            </div>
                        </Card>
                    );
                })}

            </div>

        </div>
    );
};

export default BookingCards;