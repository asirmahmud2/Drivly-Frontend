"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
    FiMenu,
    FiHome,
    FiGrid,
    FiPlusCircle,
    FiCalendar,
    FiUser,
    FiLogOut,
    FiBriefcase,
    FiLogIn,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { logoutSuccessToast } from "../Toasters";

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
];

const profileOptions = [
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
    {
        name: "My Added Cars",
        href: "/my-cars",
        icon: FiBriefcase,
    },
];

const Navbar = () => {
    const {
        data: session,
    } = authClient.useSession();

    const user = session?.user;
    // console.log("Session", user);

    const handleLogout = async () => {
        logoutSuccessToast();
        await authClient.signOut();
    };

    return (
        <div className="w-full border-b border-white/10 bg-[#0B0B0C]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="navbar min-h-20 px-0">

                    {/* Navbar Start */}
                    <div className="navbar-start">

                        {/* Mobile Menu */}
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
                            </ul>
                        </div>

                        {/* Logo */}
                        <Link
                            href="/"
                            className="ml-2 flex items-center lg:ml-0"
                        >
                            <Image
                                src="https://i.ibb.co.com/Ldkv5hVf/Chat-GPT-Image-Aug-26-2026-12-17-56-PM.png"
                                alt="Drivly Logo"
                                width={260}
                                height={260}
                                className="h-18 w-70 object-contain"
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
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

                    {/* Navbar End */}
                    <div className="navbar-end">

                        {!user ? (
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
                        ) : (
                            <div className="dropdown dropdown-end">
                                {/* Profile Trigger */}
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-[#151618] p-1.5 pr-3 transition-all duration-200 hover:border-[#C7A76C]/40 hover:bg-[#1D1E20]"
                                >
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "Profile"}
                                            width={40}
                                            height={40}
                                            className="h-10 w-10 rounded-lg object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#C7A76C] text-sm font-semibold uppercase text-[#0B0B0C]">
                                            {user.name?.charAt(0) || "U"}
                                        </div>
                                    )}

                                    <div className="hidden text-left sm:block">
                                        <p className="max-w-[110px] truncate text-sm font-medium text-[#F4F2ED]">
                                            {user.name || "User"}
                                        </p>

                                        <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-[#F4F2ED]/35">
                                            Account
                                        </p>
                                    </div>

                                    <FiUser className="ml-1 hidden text-[#C7A76C] sm:block" />
                                </div>

                                {/* Profile Dropdown */}
                                <ul
                                    tabIndex={-1}
                                    className="menu menu-sm dropdown-content z-50 mt-3 w-64 rounded-2xl border border-white/10 bg-[#151618] p-3 shadow-xl"
                                >
                                    {/* Profile Header */}
                                    <li className="pointer-events-none mb-2 border-b border-white/10 pb-3">
                                        <div className="flex items-center gap-3 py-2">
                                            {user.image ? (
                                                <Image
                                                    src={user.image}
                                                    alt={user.name || "Profile"}
                                                    width={42}
                                                    height={42}
                                                    unoptimized
                                                    className="h-[42px] w-[42px] rounded-xl object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-xl bg-[#C7A76C] text-sm font-semibold uppercase text-[#0B0B0C]">
                                                    {user.name?.charAt(0) || "U"}
                                                </div>
                                            )}

                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-medium text-[#F4F2ED]">
                                                    {user.name || "User"}
                                                </p>

                                                <p className="truncate text-xs text-[#F4F2ED]/40">
                                                    {user.email}
                                                </p>
                                            </div>
                                        </div>
                                    </li>

                                    {/* Profile Options */}
                                    {profileOptions.map((option) => {
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

                                    {/* Logout */}
                                    <li className="mt-2 border-t border-white/10 pt-2">
                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="flex w-full items-center gap-3 py-3 text-[#A64B45] hover:bg-[#A64B45]/5"
                                        >
                                            <FiLogOut className="text-lg" />
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;