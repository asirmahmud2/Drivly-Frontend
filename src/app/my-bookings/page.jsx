import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import BookingCards from "@/Components/Functionality/BookingCards";

const BookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;

    const { token } = await auth.api.getToken({
        headers: await headers(),
    });

    // console.log("My Token", token);

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/booking/${user?.id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
        }
    );

    const data = await res.json();

    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* PAGE INTRO */}
            <section className="border-b border-[#D9D6CF]">
                <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
                    <div className="max-w-3xl">

                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                            Your Drivly Journey
                        </p>

                        <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight text-[#111214] sm:text-5xl lg:text-6xl">
                            Your bookings,
                            <span className="text-[#C7A76C]">
                                {" "}beautifully simple.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-2xl text-sm leading-7 text-[#6F706D] sm:text-base sm:leading-8">
                            Keep track of your upcoming drives, reservation
                            details, pickup locations, and rental costs all
                            in one place.
                        </p>

                    </div>
                </div>
            </section>

            {/* BOOKING CONTENT */}
            <section>
                <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-20">

                    <BookingCards bookings={data} />

                </div>
            </section>

        </main>
    );
};

export default BookingPage;