"use client";

import React, { useMemo, useState } from "react";
import {
    Button,
    Card,
    Input,
    Label,
    ListBox,
    Select,
    TextArea,
    TextField,
} from "@heroui/react";
import {
    FiArrowRight,
    FiCalendar,
    FiCheck,
    FiFileText,
    FiUser,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { bookingErrorToast, bookingSuccessToast } from "../Toasters";

const driverOptions = [
    {
        id: "yes",
        label: "Yes",
    },
    {
        id: "no",
        label: "No",
    },
];

const BookCard = ({ data }) => {
    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [driverNeeded, setDriverNeeded] = useState("no");
    const [specialNote, setSpecialNote] = useState("");
    const {
        data: session,
    } = authClient.useSession();
    const user = session?.user;

    const rentalDays = useMemo(() => {
        if (!pickupDate || !returnDate) return 0;

        const start = new Date(`${pickupDate}T00:00:00`);
        const end = new Date(`${returnDate}T00:00:00`);

        const difference = end - start;
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        return days > 0 ? days : 0;
    }, [pickupDate, returnDate]);

    const totalPrice = rentalDays * Number(data.daily_rent_price || 0);

    const handleBooking = async (e) => {
        e.preventDefault();

        const bookingData = {
            user_id: user?.id,
            user_name: user?.name,
            user_image: user?.image,
            car_id: data._id,
            car_name: data.name,
            car_image: data.image,
            pickup_location: data.pickup_location,
            pickup_date: pickupDate,
            return_date: returnDate,
            driver_needed: driverNeeded === "yes",
            special_note: specialNote,
            daily_rent_price: Number(data.daily_rent_price),
            total_days: rentalDays,
            total_price: totalPrice,
            booking_date: new Date(),
        };
        const { data: tokenData } = await authClient.token();
        console.log("Token Data:", tokenData);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/booking`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify(bookingData),
        });

        if (!res.ok) {
            bookingErrorToast();
            return;
        }

        const allData = await res.json();
        console.log(allData);

        bookingSuccessToast();
    };

    return (
        <Card className="rounded-[2rem] border border-[#D9D6CF] bg-[#0B0B0C] shadow-[0_25px_70px_rgba(11,11,12,0.12)]">
            <Card.Header className="border-b border-white/10 px-6 pb-6 pt-7 sm:px-7">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C7A76C]">
                        Reserve this vehicle
                    </p>

                    <Card.Title className="mt-3 text-2xl font-semibold tracking-tight text-[#F4F2ED]">
                        Make it yours.
                    </Card.Title>

                    <Card.Description className="mt-2 text-sm leading-6 text-[#F4F2ED]/45">
                        Choose your dates and preferences to see your rental
                        total.
                    </Card.Description>
                </div>
            </Card.Header>

            <Card.Content className="px-6 py-6 sm:px-7">
                <form onSubmit={handleBooking} className="space-y-5">

                    {/* Dates */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">

                        {/* Pickup Date */}
                        <div>
                            <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#F4F2ED]/45">
                                Pickup Date
                            </Label>

                            <div className="relative">
                                <FiCalendar className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#C7A76C]" />

                                <Input
                                    type="date"
                                    value={pickupDate}
                                    onChange={(e) =>
                                        setPickupDate(e.target.value)
                                    }
                                    min={new Date()
                                        .toISOString()
                                        .split("T")[0]}
                                    className="h-12 w-full rounded-xl border border-white/10 bg-[#151618] pl-10 text-sm text-[#F4F2ED]"
                                />
                            </div>
                        </div>

                        {/* Return Date */}
                        <div>
                            <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#F4F2ED]/45">
                                Return Date
                            </Label>

                            <div className="relative">
                                <FiCalendar className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[#C7A76C]" />

                                <Input
                                    type="date"
                                    value={returnDate}
                                    onChange={(e) =>
                                        setReturnDate(e.target.value)
                                    }
                                    min={
                                        pickupDate ||
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                    className="h-12 w-full rounded-xl border border-white/10 bg-[#151618] pl-10 text-sm text-[#F4F2ED]"
                                />
                            </div>
                        </div>

                    </div>

                    {/* Driver */}
                    <Select
                        selectedKeys={
                            driverNeeded ? [driverNeeded] : []
                        }
                        onSelectionChange={(keys) =>
                            setDriverNeeded(Array.from(keys)[0])
                        }
                        className="w-full"
                    >
                        <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#F4F2ED]/45">
                            Driver Needed
                        </Label>

                        <Select.Trigger className="h-12 rounded-xl border border-white/10 bg-[#151618] text-[#F4F2ED]">
                            <div className="flex items-center gap-2">
                                <FiUser className="text-[#C7A76C]" />
                                <Select.Value />
                            </div>

                            <Select.Indicator />
                        </Select.Trigger>

                        <Select.Popover>
                            <ListBox>
                                {driverOptions.map((option) => (
                                    <ListBox.Item
                                        key={option.id}
                                        id={option.id}
                                    >
                                        {option.label}
                                        <ListBox.ItemIndicator />
                                    </ListBox.Item>
                                ))}
                            </ListBox>
                        </Select.Popover>
                    </Select>

                    {/* Special Note */}
                    <TextField className="w-full">
                        <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-[#F4F2ED]/45">
                            Special Note
                        </Label>

                        <div className="relative">
                            <FiFileText className="pointer-events-none absolute left-3 top-3 z-10 text-[#C7A76C]" />

                            <TextArea
                                value={specialNote}
                                onChange={(e) =>
                                    setSpecialNote(e.target.value)
                                }
                                placeholder="Anything we should know?"
                                rows={3}
                                className="min-h-24 w-full rounded-xl border border-white/10 bg-[#151618] pl-10 pt-3 text-sm text-[#F4F2ED] placeholder:text-[#F4F2ED]/25"
                            />
                        </div>
                    </TextField>

                    {/* Price Summary */}
                    <div className="border-y border-white/10 py-5">

                        <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-[0.16em] text-[#F4F2ED]/40">
                                Daily rate
                            </span>

                            <span className="text-sm font-medium text-[#F4F2ED]">
                                ${data.daily_rent_price} / day
                            </span>
                        </div>

                        {rentalDays > 0 && (
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs uppercase tracking-[0.16em] text-[#F4F2ED]/40">
                                    Rental period
                                </span>

                                <span className="text-sm font-medium text-[#F4F2ED]">
                                    {rentalDays}{" "}
                                    {rentalDays === 1 ? "day" : "days"}
                                </span>
                            </div>
                        )}

                        <div className="mt-5 flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.18em] text-[#F4F2ED]/35">
                                    Estimated total
                                </p>

                                <p className="mt-1 text-3xl font-semibold tracking-tight text-[#F4F2ED]">
                                    ${totalPrice || 0}
                                </p>
                            </div>

                            {rentalDays > 0 && (
                                <span className="mb-1 text-xs text-[#C7A76C]">
                                    {rentalDays} × $
                                    {data.daily_rent_price}
                                </span>
                            )}
                        </div>

                    </div>

                    {/* Submit */}
                    <Button
                        type="submit"
                        isDisabled={!rentalDays || !data.availability}
                        className="group h-13 w-full rounded-xl bg-[#C7A76C] text-sm font-semibold text-[#0B0B0C] transition-all duration-300 hover:bg-[#AF8D52]"
                    >
                        <span>
                            {data.availability
                                ? "Confirm Booking"
                                : "Currently Unavailable"}
                        </span>

                        {data.availability && (
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0B0B0C]/10 transition-transform duration-300 group-hover:translate-x-0.5">
                                <FiArrowRight className="text-sm" />
                            </span>
                        )}
                    </Button>

                    {/* Trust Detail */}
                    <div className="flex items-center justify-center gap-2 pt-1">
                        <FiCheck className="text-xs text-[#52705A]" />

                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#F4F2ED]/25">
                            Secure booking experience
                        </p>
                    </div>

                </form>
            </Card.Content>
        </Card>
    );
};

export default BookCard;