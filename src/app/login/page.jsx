"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Button,
    InputGroup,
    Label,
    TextField,
} from "@heroui/react";
import {
    FiArrowLeft,
    FiArrowUpRight,
    FiEye,
    FiEyeOff,
    FiLock,
    FiMail,
} from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { loginErrorToast, loginSuccessToast } from "@/Components/Toasters";

const LoginPages = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const router = useRouter();


    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });
        // console.log({ data, error });

        if (data) {
            loginSuccessToast();
            router.push('/');
        } else {
            loginErrorToast();
        }
    }

    const handleGoogleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

    }

    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* TOP BAR */}
            <div className="container mx-auto flex items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-[#6F706D] transition-colors duration-300 hover:text-[#111214]"
                >
                    <FiArrowLeft className="text-sm transition-transform duration-300 group-hover:-translate-x-1" />

                    <span className="hidden sm:inline">
                        Back to home
                    </span>

                    <span className="sm:hidden">
                        Home
                    </span>
                </Link>
            </div>

            {/* MAIN AUTH LAYOUT */}
            <section className="min-h-screen px-4 pb-6 pt-4 sm:px-6 lg:px-8 lg:pb-8 lg:pt-8">
                <div className="container mx-auto flex min-h-[calc(100vh-96px)] max-w-7xl items-center lg:min-h-[calc(100vh-32px)]">

                    <div className="relative grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-transparent shadow-[0_30px_100px_rgba(11,11,12,0.08)] lg:min-h-[760px] lg:grid-cols-[0.95fr_1.05fr] lg:border-[#D9D6CF] lg:bg-white">

                        {/* MOBILE BACKGROUND */}
                        <div className="absolute inset-0 z-0 lg:hidden">
                            <Image
                                src="https://i.ibb.co.com/7JTRYrSX/Luxury-car-in-architectural-lounge-202608282346.jpg"
                                alt="Premium Drivly vehicle"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover object-center"
                            />

                            {/* Dark cinematic overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/72 via-[#0B0B0C]/52 to-[#0B0B0C]/90" />
                        </div>

                        {/* IMAGE PANEL — DESKTOP ONLY */}
                        <div className="relative hidden min-h-[600px] overflow-hidden bg-[#0B0B0C] lg:block">

                            <img
                                src="https://i.ibb.co.com/7JTRYrSX/Luxury-car-in-architectural-lounge-202608282346.jpg"
                                alt="Premium Drivly vehicle"
                                fill
                                priority
                                sizes="50vw"
                                className="object-cover object-center"
                            />

                            {/* Deep Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/35 to-[#0B0B0C]/10" />

                            {/* Right Edge Gradient */}
                            <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#0B0B0C]/40 to-transparent" />

                            {/* IMAGE CONTENT */}
                            <div className="absolute inset-x-0 bottom-0 z-10 p-8 sm:p-10 lg:p-12">
                                <div className="max-w-md">

                                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C7A76C]">
                                        Drivly
                                    </p>

                                    <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-[#F4F2ED] xl:text-4xl">
                                        Move with
                                        <br />
                                        <span className="text-[#C7A76C]">
                                            intent.
                                        </span>
                                    </h2>

                                    <p className="mt-5 max-w-sm text-sm leading-7 text-[#F4F2ED]/55">
                                        Premium vehicles, effortless booking,
                                        and the freedom to move your way.
                                    </p>

                                    <div className="mt-8 flex items-center gap-3">
                                        <span className="h-px w-10 bg-[#C7A76C]" />

                                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F4F2ED]/40">
                                            Premium mobility
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* SEAM TRANSITION */}
                        <div className="pointer-events-none absolute inset-y-0 left-[47.6%] z-20 hidden w-40 -translate-x-1/2 lg:block">
                            <div
                                className="absolute inset-0 backdrop-blur-2xl"
                                style={{
                                    maskImage:
                                        "linear-gradient(to right, transparent 0%, black 45%, black 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to right, transparent 0%, black 45%, black 100%)",
                                }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/55 to-white" />
                        </div>

                        {/* FORM PANEL */}
                        <div
                            className="relative z-10 flex flex-col justify-center bg-transparent px-6 py-8 sm:px-10 sm:py-10 lg:bg-white lg:px-16 lg:py-14 xl:px-20"
                        >
                            <div className="mx-auto w-full max-w-md">

                                {/* MOBILE BRAND */}
                                <div className="mb-6 lg:hidden">
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#C7A76C]">
                                        Drivly
                                    </span>
                                </div>

                                {/* HEADING */}
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C7A76C]">
                                        Welcome back
                                    </p>

                                    <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:mt-4 lg:text-[#111214] lg:text-5xl">
                                        Your next journey
                                        <br />
                                        <span className="text-[#C7A76C]">
                                            starts here.
                                        </span>
                                    </h1>

                                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/70 lg:mt-5 lg:leading-7 lg:text-[#6F706D]">
                                        Sign in to continue exploring premium
                                        vehicles and managing your Drivly
                                        experience.
                                    </p>
                                </div>

                                {/* LOGIN FORM */}

                                {/* Authentication functionality intentionally not implemented yet. */}

                                <form
                                    onSubmit={handleLogin}
                                    className="mt-6 lg:mt-9"
                                >

                                    {/* EMAIL */}
                                    <TextField
                                        name="email"
                                        type="email"
                                        className="w-full"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Email address
                                        </Label>

                                        <InputGroup
                                            className="mt-2 h-14 rounded-xl border border-white/20 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-300 focus-within:border-[#C7A76C]/70 focus-within:bg-white/[0.12] focus-within:ring-4 focus-within:ring-[#C7A76C]/15 lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none lg:focus-within:bg-white lg:focus-within:ring-[#C7A76C]/10"
                                        >
                                            <InputGroup.Prefix>
                                                <FiMail className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                id="email"
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />
                                        </InputGroup>
                                    </TextField>

                                    {/* PASSWORD */}
                                    <TextField
                                        name="password"
                                        type="password"
                                        className="mt-4 w-full lg:mt-5"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Password
                                        </Label>

                                        <InputGroup
                                            className="mt-2 h-14 rounded-xl border border-white/20 bg-white/[0.08] text-white backdrop-blur-md transition-all duration-300 focus-within:border-[#C7A76C]/70 focus-within:bg-white/[0.12] focus-within:ring-4 focus-within:ring-[#C7A76C]/15 lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none lg:focus-within:bg-white lg:focus-within:ring-[#C7A76C]/10"
                                        >
                                            <InputGroup.Prefix>
                                                <FiLock className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                id="password"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password"
                                                autoComplete="current-password"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />

                                            <InputGroup.Suffix>
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    variant="ghost"
                                                    size="sm"
                                                    aria-label={
                                                        showPassword
                                                            ? "Hide password"
                                                            : "Show password"
                                                    }
                                                    onPress={() =>
                                                        setShowPassword(
                                                            (previous) =>
                                                                !previous
                                                        )
                                                    }
                                                    className="text-white/60 hover:bg-white/10 hover:text-white lg:text-[#92938F] lg:hover:bg-[#F4F2ED] lg:hover:text-[#111214]"
                                                >
                                                    {showPassword ? (
                                                        <FiEyeOff />
                                                    ) : (
                                                        <FiEye />
                                                    )}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>
                                    </TextField>

                                    {/* LOGIN BUTTON */}
                                    <Button
                                        type="submit"
                                        className="group mt-6 h-14 w-full rounded-xl bg-[#0B0B0C] px-5 text-sm font-semibold text-[#F4F2ED] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-[#151618] lg:mt-7 lg:shadow-none"
                                    >
                                        <span>
                                            Sign In
                                        </span>

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C7A76C] text-[#0B0B0C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <FiArrowUpRight className="text-sm" />
                                        </span>
                                    </Button>

                                    {/* DIVIDER */}
                                    <div className="my-5 flex items-center gap-4 lg:my-7">
                                        <div className="h-px flex-1 bg-white/15 lg:bg-[#EAE7E0]" />

                                        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 lg:text-[#92938F]">
                                            Or continue with
                                        </span>

                                        <div className="h-px flex-1 bg-white/15 lg:bg-[#EAE7E0]" />
                                    </div>

                                    {/* GOOGLE */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onPress={handleGoogleLogin}
                                        className="h-14 w-full rounded-xl border-white/25 bg-white/10 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/15 lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:hover:border-[#111214]/30 lg:hover:bg-[#F9F8F4]"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-sm font-semibold text-white lg:border-[#EAE7E0] lg:bg-[#F9F8F4] lg:text-[#111214]">
                                            G
                                        </span>

                                        <span>
                                            Continue with Google
                                        </span>
                                    </Button>

                                    {/* REGISTER */}
                                    <p className="mt-6 text-center text-sm text-white/70 lg:mt-8 lg:text-[#6F706D]">
                                        New to Drivly?

                                        <Link
                                            href="/register"
                                            className="ml-1.5 font-semibold text-white underline decoration-[#C7A76C] decoration-1 underline-offset-4 transition-colors duration-200 hover:text-[#C7A76C] lg:text-[#111214] lg:hover:text-[#AF8D52]"
                                        >
                                            Create an account
                                        </Link>
                                    </p>

                                </form>

                                {/* FOOT NOTE */}
                                <div className="mt-6 border-t border-white/10 pt-4 lg:mt-10 lg:border-[#EAE7E0] lg:pt-5">
                                    <p className="text-center text-[10px] leading-5 text-white/45 lg:text-[#92938F]">
                                        By continuing, you agree to the
                                        Drivly experience and our
                                        <span className="mx-1 text-white/70 lg:text-[#6F706D]">
                                            Terms
                                        </span>
                                        and
                                        <span className="ml-1 text-white/70 lg:text-[#6F706D]">
                                            Privacy Policy
                                        </span>
                                        .
                                    </p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginPages;