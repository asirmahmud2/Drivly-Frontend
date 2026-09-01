"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiMapPin } from "react-icons/fi";

const wallReveal = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const hangIn = {
    hidden: { opacity: 0, y: -26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
    },
};

const getImg = (car) => (Array.isArray(car?.image) ? car.image[0] : car?.image);
const money = (n) => (n || n === 0 ? `$${n}` : "$—");


const Wire = ({ cls }) => (
    <div className="flex flex-col items-center">
        <span className="h-[5px] w-[5px] rounded-full bg-[#C7A76C]" />
        <span className={`w-px bg-gradient-to-b from-[#C7A76C]/80 to-[#C7A76C]/20 ${cls}`} />
    </div>
);

const Rail = () => (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-[#C7A76C]/55 to-transparent" />
);


const FramePanorama = ({ car }) => {
    const image = getImg(car);
    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="rounded-[2px] bg-[#0B0B0C] p-[10px] shadow-[0_26px_56px_-20px_rgba(11,11,12,0.55)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:p-3">
                <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9] lg:aspect-[21/9]">
                    {image && (
                        <Image
                            src={image}
                            alt={car.name}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 90vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5" />

                    <div className="absolute inset-x-0 bottom-0 flex flex-col gap-6 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
                        <div className="max-w-xl">
                            <p className="fc-sans text-[10px] tracking-[0.1em] text-[#C7A76C]">{car.brand}</p>
                            <p className="fc-serif mt-2 text-[26px] leading-[1.05] text-[#F4F2ED] sm:text-[38px]">
                                {car.name}
                            </p>
                            {car.description && (
                                <p className="fc-sans mt-3 hidden max-w-md text-[12px] leading-relaxed text-white/55 sm:block">
                                    {car.description}
                                </p>
                            )}
                            <div className="mt-4 flex flex-wrap gap-1.5">
                                {car.year && (
                                    <span className="fc-sans rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70">
                                        {car.year}
                                    </span>
                                )}
                                {car.type && (
                                    <span className="fc-sans rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70">
                                        {car.type}
                                    </span>
                                )}
                                {car.pickup_location && (
                                    <span className="fc-sans inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-0.5 text-[10px] text-white/70">
                                        <FiMapPin size={10} className="text-[#C7A76C]" />
                                        {car.pickup_location}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                            <div className="text-left sm:text-right">
                                <p className="fc-serif text-[20px] text-[#F4F2ED] sm:text-[22px]">
                                    {money(car.daily_rent_price)}
                                </p>
                                <p className="fc-sans text-[10px] text-white/40">per day</p>
                            </div>
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-[#F4F2ED] transition-colors duration-300 group-hover:border-[#C7A76C] group-hover:text-[#C7A76C]">
                                <FiArrowUpRight size={16} />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};


const FramePrint = ({ car }) => {
    const image = getImg(car);
    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="rounded-[2px] bg-[#FAF8F2] p-3 shadow-[0_16px_34px_-18px_rgba(17,18,20,0.35)] ring-1 ring-[#E4E1D6] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 sm:p-4">
                <div className="relative aspect-[16/10] overflow-hidden">
                    {image && (
                        <Image
                            src={image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 28vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                        />
                    )}
                </div>
                <div className="mt-3 flex items-start justify-between gap-4 px-1">
                    <div className="min-w-0">
                        <p className="fc-serif truncate text-[16px] text-[#111214]">{car.name}</p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                            {car.transmission && (
                                <span className="fc-sans rounded-full border border-[#E4E1D6] px-2 py-0.5 text-[10px] text-[#6F706D]">
                                    {car.transmission}
                                </span>
                            )}
                            {car.seat_capacity && (
                                <span className="fc-sans rounded-full border border-[#E4E1D6] px-2 py-0.5 text-[10px] text-[#6F706D]">
                                    {car.seat_capacity} seats
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="shrink-0 text-right">
                        <p className="fc-serif text-[15px] text-[#111214]">{money(car.daily_rent_price)}</p>
                        <p className="fc-sans text-[10px] text-[#92938F]">per day</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};


const FramePlaque = ({ car }) => {
    const image = getImg(car);
    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="relative flex h-full flex-col justify-between rounded-[2px] bg-[#0B0B0C] p-4 pt-6 shadow-[0_16px_34px_-18px_rgba(11,11,12,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                {image && (
                    <div className="absolute -top-4 right-4 h-12 w-12 overflow-hidden rounded-full ring-2 ring-[#C7A76C]">
                        <Image src={image} alt={car.name} fill sizes="48px" className="object-cover" />
                    </div>
                )}
                <div>
                    <p className="fc-sans text-[10px] tracking-[0.08em] text-[#C7A76C]">{car.brand}</p>
                    <p className="fc-serif mt-1.5 max-w-[85%] text-[17px] leading-snug text-[#F4F2ED]">
                        {car.name}
                    </p>
                    {car.key_features?.[0] && (
                        <p className="fc-sans mt-2 text-[11px] leading-relaxed text-white/45">
                            {car.key_features[0]}
                        </p>
                    )}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="fc-serif text-[14px] text-[#F4F2ED]">{money(car.daily_rent_price)}</span>
                    <span className="fc-sans text-[10px] text-[#C7A76C] underline decoration-[#C7A76C]/40 underline-offset-4">
                        View details
                    </span>
                </div>
            </div>
        </Link>
    );
};


const FrameLedger = ({ car }) => {
    const image = getImg(car);
    const specs = [
        { label: "Year", value: car.year },
        { label: "Transmission", value: car.transmission },
        { label: "Fuel", value: car.fuel_type },
        { label: "Seats", value: car.seat_capacity },
    ].filter((s) => s.value);

    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="rounded-[2px] bg-[#0B0B0C] p-[10px] shadow-[0_18px_38px_-18px_rgba(11,11,12,0.5)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <div className="relative aspect-[16/9] overflow-hidden">
                    {image && (
                        <Image
                            src={image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 30vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                        />
                    )}
                </div>

                <div className="mt-[10px] px-1">
                    <p className="fc-sans text-[10px] tracking-[0.08em] text-[#C7A76C]">{car.brand}</p>
                    <p className="fc-serif mt-1 text-[16px] text-[#F4F2ED]">{car.name}</p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-[2px] bg-[#242424]">
                    {specs.slice(0, 4).map((s) => (
                        <div key={s.label} className="bg-[#141414] px-3 py-2">
                            <p className="fc-sans text-[9px] tracking-[0.06em] text-white/35">{s.label}</p>
                            <p className="fc-sans mt-0.5 truncate text-[11px] text-white/85">{s.value}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-[10px] flex items-center justify-between border-t border-white/10 px-1 pt-3">
                    <span className="fc-serif text-[15px] text-[#F4F2ED]">{money(car.daily_rent_price)}</span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-[#F4F2ED] transition-colors duration-300 group-hover:border-[#C7A76C] group-hover:text-[#C7A76C]">
                        <FiArrowUpRight size={13} />
                    </span>
                </div>
            </div>
        </Link>
    );
};


const FrameShadowbox = ({ car }) => {
    const image = getImg(car);
    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="grid grid-cols-5 overflow-hidden rounded-[2px] bg-[#FAF8F2] shadow-[0_18px_38px_-18px_rgba(17,18,20,0.4)] ring-1 ring-[#E4E1D6] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <div className="relative col-span-2 aspect-square overflow-hidden sm:col-span-3 sm:aspect-auto">
                    {image && (
                        <Image
                            src={image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 1024px) 60vw, 22vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                        />
                    )}
                </div>
                <div className="col-span-3 flex flex-col justify-between border-l border-[#E4E1D6] p-4 sm:col-span-2">
                    <div>
                        {car.type && (
                            <p className="fc-sans text-[10px] tracking-[0.08em] text-[#9C7C42]">{car.type}</p>
                        )}
                        <p className="fc-serif mt-1 text-[16px] leading-tight text-[#111214]">{car.name}</p>
                        {car.description && (
                            <p
                                className="fc-sans mt-2 text-[11px] leading-relaxed text-[#6F706D]"
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                }}
                            >
                                {car.description}
                            </p>
                        )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                        <p className="fc-serif text-[15px] text-[#111214]">{money(car.daily_rent_price)}</p>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#E4E1D6] text-[#111214] transition-colors duration-300 group-hover:border-[#9C7C42] group-hover:text-[#9C7C42]">
                            <FiArrowUpRight size={13} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};


const FrameTicket = ({ car }) => {
    const image = getImg(car);
    return (
        <Link href={`/explore/${car._id}`} className="group block">
            <div className="flex overflow-hidden rounded-[2px] bg-[#FAF8F2] shadow-[0_16px_34px_-18px_rgba(17,18,20,0.35)] ring-1 ring-[#E4E1D6] transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
                <div className="relative w-[42%] shrink-0 overflow-hidden">
                    {image && (
                        <Image
                            src={image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 1024px) 42vw, 16vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                        />
                    )}
                </div>
                <div className="relative flex flex-1 flex-col justify-between gap-4 p-4">
                    <span className="absolute -left-[7px] -top-[7px] h-3.5 w-3.5 rounded-full bg-[#F4F2ED]" />
                    <span className="absolute -bottom-[7px] -left-[7px] h-3.5 w-3.5 rounded-full bg-[#F4F2ED]" />
                    <div className="border-l border-dashed border-[#D9D2BD] pl-4">
                        <p className="fc-sans text-[10px] tracking-[0.08em] text-[#9C7C42]">{car.brand}</p>
                        <p className="fc-serif mt-1 text-[15px] leading-snug text-[#111214]">{car.name}</p>
                    </div>
                    <div className="flex items-end justify-between border-l border-dashed border-[#D9D2BD] pl-4">
                        <div>
                            <p className="fc-serif text-[16px] text-[#111214]">{money(car.daily_rent_price)}</p>
                            <p className="fc-sans text-[9px] text-[#92938F]">per day</p>
                        </div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9D2BD] text-[#111214] transition-colors duration-300 group-hover:border-[#9C7C42] group-hover:text-[#9C7C42]">
                            <FiArrowUpRight size={12} />
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

const FeaturedCarGallery = ({ cars = [] }) => {
    const hero = cars[0];
    const row2 = cars.slice(1, 4);
    const row3 = cars.slice(4, 6);

    return (
        <div className="relative pt-14 sm:pt-16 lg:pt-20">
            <style jsx global>{`
                @import url("https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap");
                .fc-serif {
                    font-family: "Fraunces", ui-serif, Georgia, serif;
                }
                .fc-sans {
                    font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
                }
            `}</style>

            <motion.div
                variants={wallReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* row one — the centerpiece */}
                {hero && (
                    <div>
                        <Rail />
                        <motion.div variants={hangIn}>
                            <Wire cls="h-[10px] lg:h-[8px]" />
                            <div className="mt-2 lg:mt-3">
                                <FramePanorama car={hero} />
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* row two — three medium pieces */}
                {row2.length > 0 && (
                    <div className="mt-16 lg:mt-24">
                        <Rail />
                        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-y-0">
                            {row2[0] && (
                                <motion.div variants={hangIn} className="lg:col-span-5">
                                    <Wire cls="h-[14px] lg:h-[70px]" />
                                    <div className="mt-2 lg:mt-3">
                                        <FramePrint car={row2[0]} />
                                    </div>
                                </motion.div>
                            )}
                            {row2[1] && (
                                <motion.div variants={hangIn} className="lg:col-span-3">
                                    <Wire cls="h-[10px] lg:h-[30px]" />
                                    <div className="mt-2 lg:mt-3 sm:mx-auto sm:max-w-sm lg:mx-0 lg:max-w-none">
                                        <FramePlaque car={row2[1]} />
                                    </div>
                                </motion.div>
                            )}
                            {row2[2] && (
                                <motion.div variants={hangIn} className="sm:col-span-2 lg:col-span-4">
                                    <Wire cls="h-[16px] lg:h-[100px]" />
                                    <div className="mt-2 lg:mt-3 sm:mx-auto sm:max-w-md lg:mx-0 lg:max-w-none">
                                        <FrameLedger car={row2[2]} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}

                {/* row three — two pieces */}
                {row3.length > 0 && (
                    <div className="mt-16 lg:mt-24">
                        <Rail />
                        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12 lg:items-start lg:gap-y-0">
                            {row3[0] && (
                                <motion.div variants={hangIn} className="lg:col-span-7">
                                    <Wire cls="h-[14px] lg:h-[24px]" />
                                    <div className="mt-2 lg:mt-3">
                                        <FrameShadowbox car={row3[0]} />
                                    </div>
                                </motion.div>
                            )}
                            {row3[1] && (
                                <motion.div variants={hangIn} className="lg:col-span-5">
                                    <Wire cls="h-[18px] lg:h-[88px]" />
                                    <div className="mt-2 lg:mt-3">
                                        <FrameTicket car={row3[1]} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>

            {/* footer */}
            <div className="mt-16 flex flex-col gap-4 border-t border-[#E4E1D6] pt-7 sm:flex-row sm:items-center sm:justify-between lg:mt-24">
                <p className="fc-sans max-w-xl text-[13px] leading-relaxed text-[#6F706D]">
                    Every car in the collection is inspected, detailed, and delivered, not just parked in a lot.
                </p>
                <Link href="/explore" className="group fc-sans inline-flex shrink-0 items-center gap-2 text-[13px] font-medium text-[#111214]">
                    <span className="border-b border-[#111214]/30 pb-0.5 transition-colors duration-300 group-hover:border-[#9C7C42] group-hover:text-[#9C7C42]">
                        Browse the full collection
                    </span>
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#E4E1D6] transition-colors duration-300 group-hover:border-[#9C7C42] group-hover:text-[#9C7C42]">
                        <FiArrowUpRight size={13} />
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedCarGallery;