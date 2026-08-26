import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FiMenu,
    FiHome,
    FiGrid,
    FiPlusCircle,
    FiCalendar,
    FiLogIn,
} from "react-icons/fi";

const navOptions = [
    {
        name: "Home",
        href: "/",
        icon: FiHome,
    },
    {
        name: "Explore Cars",
        href: "/explore",
        icon: FiGrid,
    },
    {
        name: "Add Car",
        href: "/add-car",
        icon: FiPlusCircle,
    },
    {
        name: "My Bookings",
        href: "/my-bookings",
        icon: FiCalendar,
    },
];

const Navbar = () => {
    return (
        <div className="w-full border-b border-white/10 bg-[#0B0B0C]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar min-h-20 px-0">

                    <div className="navbar-start">

                        <div className="dropdown">
                            <div
                                tabIndex={0}
                                role="button"
                                className="btn btn-ghost btn-circle text-[#F4F2ED] hover:bg-white/5 lg:hidden"
                            >
                                <FiMenu className="text-xl" />
                            </div>

                            <ul
                                tabIndex={-1}
                                className="menu menu-sm dropdown-content left-0 z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-[#151618] p-3 shadow-xl"
                            >
                                {navOptions.map((option) => {
                                    const Icon = option.icon;

                                    return (
                                        <li key={option.name}>
                                            <Link
                                                href={option.href}
                                                className="flex items-center gap-3 py-3 text-[#F4F2ED] hover:bg-white/5 hover:text-[#C7A76C]"
                                            >
                                                <Icon className="text-lg" />
                                                {option.name}
                                            </Link>
                                        </li>
                                    );
                                })}

                                <li className="mt-2 border-t border-white/10 pt-2">
                                    <Link
                                        href="/login"
                                        className="flex items-center gap-3 py-3 text-[#C7A76C] hover:bg-white/5"
                                    >
                                        <FiLogIn className="text-lg" />
                                        Login / Register
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="ml-2 flex items-center lg:ml-0"
                        >
                            <Image
                                src="https://i.ibb.co.com/Ldkv5hVf/Chat-GPT-Image-Aug-26-2026-12-17-56-PM.png"
                                alt="DriveFleet Logo"
                                width={260}
                                height={260}
                                className="h-18 w-70 object-contain"
                            />
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-2">
                            {navOptions.map((option) => (
                                <li key={option.name}>
                                    <Link
                                        href={option.href}
                                        className="rounded-lg px-4 py-2 text-sm font-medium text-[#F4F2ED]/75 transition hover:bg-white/5 hover:text-[#C7A76C]"
                                    >
                                        {option.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="navbar-end">
                        <Link
                            href="/login"
                            className="flex items-center gap-2 rounded-xl bg-[#C7A76C] px-4 py-2.5 text-sm font-semibold text-[#0B0B0C] transition duration-200 hover:bg-[#AF8D52] sm:px-5"
                        >
                            <FiLogIn className="text-base" />

                            <span className="hidden sm:inline">
                                Login / Register
                            </span>

                            <span className="sm:hidden">
                                Login
                            </span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Navbar;