import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiGithub,
    FiFacebook,
    FiLinkedin,
    FiArrowUpRight,
} from "react-icons/fi";

const usefulLinks = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Explore Cars",
        href: "/explore",
    },
    {
        name: "Add Car",
        href: "/add-car",
    },
    {
        name: "My Bookings",
        href: "/my-bookings",
    },
];

const socialLinks = [
    {
        name: "GitHub",
        href: "https://github.com/",
        icon: FiGithub,
    },
    {
        name: "Facebook",
        href: "https://facebook.com/",
        icon: FiFacebook,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/",
        icon: FiLinkedin,
    },
];

const Footer = () => {
    return (
        <footer className="bg-[#0B0B0C] text-[#F4F2ED]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main Footer */}
                <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-4 lg:gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block">
                            <Image
                                src="https://i.ibb.co.com/Ldkv5hVf/Chat-GPT-Image-Aug-26-2026-12-17-56-PM.png"
                                alt="Drivly logo"
                                width={120}
                                height={60}
                                className="h-auto w-[100px] object-contain"
                            />
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-7 text-[#F4F2ED]/60">
                            A modern car rental platform built to make finding,
                            booking, and managing your next drive simple.
                        </p>

                        <Link
                            href="/explore"
                            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#C7A76C] transition hover:text-[#AF8D52]"
                        >
                            Explore our cars
                            <FiArrowUpRight />
                        </Link>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F2ED]">
                            Useful Links
                        </h3>

                        <ul className="mt-6 space-y-4">
                            {usefulLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-[#F4F2ED]/60 transition hover:text-[#C7A76C]"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F2ED]">
                            Contact
                        </h3>

                        <div className="mt-6 space-y-5">

                            <div className="flex items-start gap-3">
                                <FiMail className="mt-0.5 shrink-0 text-[#C7A76C]" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#F4F2ED]/40">
                                        Email
                                    </p>
                                    <a
                                        href="mailto:hello@drivly.com"
                                        className="mt-1 block text-sm text-[#F4F2ED]/70 transition hover:text-[#C7A76C]"
                                    >
                                        hello@drivly.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiPhone className="mt-0.5 shrink-0 text-[#C7A76C]" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#F4F2ED]/40">
                                        Phone
                                    </p>
                                    <a
                                        href="tel:+8801234567890"
                                        className="mt-1 block text-sm text-[#F4F2ED]/70 transition hover:text-[#C7A76C]"
                                    >
                                        +880 1234 567890
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FiMapPin className="mt-0.5 shrink-0 text-[#C7A76C]" />
                                <div>
                                    <p className="text-xs uppercase tracking-wider text-[#F4F2ED]/40">
                                        Location
                                    </p>
                                    <p className="mt-1 text-sm text-[#F4F2ED]/70">
                                        Chattogram, Bangladesh
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#F4F2ED]">
                            Follow Us
                        </h3>

                        <p className="mt-6 max-w-xs text-sm leading-6 text-[#F4F2ED]/50">
                            Stay connected with Drivly and discover what’s next.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#151618] text-[#F4F2ED]/70 transition duration-200 hover:border-[#C7A76C]/50 hover:bg-[#C7A76C] hover:text-[#0B0B0C]"
                                    >
                                        <Icon className="text-lg" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-[#F4F2ED]/40 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Drivly. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#C7A76C]"
                        >
                            Privacy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-[#C7A76C]"
                        >
                            Terms
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;