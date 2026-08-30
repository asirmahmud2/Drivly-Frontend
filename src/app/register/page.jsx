"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, FieldError, Form, InputGroup, Label, TextField } from "@heroui/react";
import { FiArrowLeft, FiArrowUpRight, FiEye, FiEyeOff, FiImage, FiLock, FiMail, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";


const RegisterPage = () => {
    const [showPassword, setShowPassword] = React.useState(false);

    // PASSWORD VALIDATION
    const validatePassword = (value) => {
        if (value.length < 6) {
            return "Password must be at least 6 characters.";
        }

        if (!/[A-Z]/.test(value)) {
            return "Password must include an uppercase letter.";
        }

        if (!/[a-z]/.test(value)) {
            return "Password must include a lowercase letter.";
        }

        return null;
    };
    const router = useRouter();

    // REGISTER
    const handleRegister = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const passwordError = validatePassword(user.password);

        if (passwordError) {
            return;
        }

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image,
            callbackURL: "/login",
        });
        console.log({ data, error });

        if (data) {
            router.push('/');
        }
    };

    const handleGoogleRegister = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });

        console.log("google sign In", data)
    }


    return (
        <main className="min-h-screen bg-[#F4F2ED]">

            {/* TOP BAR */}
            <div className="container mx-auto flex items-center justify-between px-5 py-5  sm:px-8 lg:px-10">
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
            <section className="min-h-screen px-3 pb-4 pt-2 sm:px-5 sm:pb-6 lg:px-8 lg:py-0">
                <div className="container mx-auto flex min-h-[calc(100vh-90px)] max-w-7xl items-center">

                    <div className="relative grid w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_30px_100px_rgba(11,11,12,0.08)] lg:min-h-[820px] lg:grid-cols-[1.05fr_0.95fr] lg:border-[#D9D6CF]">

                        {/* MOBILE BACKGROUND */}
                        <div className="absolute inset-0 z-0 lg:hidden">
                            <img
                                src="https://i.ibb.co.com/7JTRYrSX/Luxury-car-in-architectural-lounge-202608282346.jpg"
                                alt="Premium Drivly vehicle"
                                fill
                                priority
                                sizes="100vw"
                                className="object-cover object-center"
                            />

                            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0C]/72 via-[#0B0B0C]/50 to-[#0B0B0C]/90" />
                        </div>

                        {/* FORM PANEL */}
                        <div className="relative z-10 flex flex-col justify-center bg-transparent px-6 py-8 sm:px-10 sm:py-10 lg:bg-white lg:px-16 lg:py-14 xl:px-20">
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
                                        Get started
                                    </p>

                                    <h1 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight text-white sm:text-4xl lg:mt-4 lg:text-[#111214] lg:text-5xl">
                                        Create your
                                        <br />
                                        <span className="text-[#C7A76C]">
                                            Drivly ID.
                                        </span>
                                    </h1>

                                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/70 lg:mt-5 lg:leading-7 lg:text-[#6F706D]">
                                        Join Drivly to unlock premium
                                        vehicles, effortless bookings, and
                                        a better way to move.
                                    </p>
                                </div>

                                {/* REGISTER FORM */}
                                <Form
                                    onSubmit={handleRegister}
                                    validationBehavior="aria"
                                    className="mt-6 lg:mt-9"
                                >

                                    {/* NAME */}
                                    <TextField
                                        name="name"
                                        isRequired
                                        className="w-full"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Name
                                        </Label>

                                        <InputGroup className="mt-2 h-14 rounded-xl border-white/20 bg-white/[0.08] text-white backdrop-blur-md lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none">
                                            <InputGroup.Prefix>
                                                <FiUser className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                placeholder="Your full name"
                                                autoComplete="name"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />
                                        </InputGroup>

                                        <FieldError className="mt-1.5 text-xs text-red-300 lg:text-red-600" />
                                    </TextField>

                                    {/* EMAIL */}
                                    <TextField
                                        name="email"
                                        type="email"
                                        isRequired
                                        className="mt-4 w-full lg:mt-5"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Email address
                                        </Label>

                                        <InputGroup className="mt-2 h-14 rounded-xl border-white/20 bg-white/[0.08] text-white backdrop-blur-md lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none">
                                            <InputGroup.Prefix>
                                                <FiMail className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                placeholder="you@example.com"
                                                autoComplete="email"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />
                                        </InputGroup>

                                        <FieldError className="mt-1.5 text-xs text-red-300 lg:text-red-600" />
                                    </TextField>

                                    {/* PHOTO URL */}
                                    <TextField
                                        name="image"
                                        type="url"
                                        className="mt-4 w-full lg:mt-5"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Photo URL
                                        </Label>

                                        <InputGroup className="mt-2 h-14 rounded-xl border-white/20 bg-white/[0.08] text-white backdrop-blur-md lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none">
                                            <InputGroup.Prefix>
                                                <FiImage className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                placeholder="https://example.com/photo.jpg"
                                                autoComplete="off"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />
                                        </InputGroup>

                                        <FieldError className="mt-1.5 text-xs text-red-300 lg:text-red-600" />
                                    </TextField>

                                    {/* PASSWORD */}
                                    <TextField
                                        name="password"
                                        isRequired
                                        validate={validatePassword}
                                        className="mt-4 w-full lg:mt-5"
                                    >
                                        <Label className="text-xs font-semibold uppercase tracking-[0.15em] text-white lg:text-[#111214]">
                                            Password
                                        </Label>

                                        <InputGroup className="mt-2 h-14 rounded-xl border-white/20 bg-white/[0.08] text-white backdrop-blur-md lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:backdrop-blur-none">
                                            <InputGroup.Prefix>
                                                <FiLock className="text-white/50 lg:text-[#92938F]" />
                                            </InputGroup.Prefix>

                                            <InputGroup.Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Create a password"
                                                autoComplete="new-password"
                                                className="login-input !text-white placeholder:!text-white/40 lg:!text-[#111214] lg:placeholder:!text-[#9A9B97]"
                                            />

                                            <InputGroup.Suffix>
                                                <Button
                                                    type="button"
                                                    isIconOnly
                                                    variant="ghost"
                                                    size="sm"
                                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                                    onPress={() => setShowPassword((previous) => !previous)}
                                                    className="text-white/60 hover:bg-white/10 hover:text-white lg:text-[#92938F] lg:hover:bg-[#F4F2ED] lg:hover:text-[#111214]"
                                                >
                                                    {showPassword ? <FiEyeOff /> : <FiEye />}
                                                </Button>
                                            </InputGroup.Suffix>
                                        </InputGroup>

                                        <FieldError className="mt-1.5 text-xs text-red-300 lg:text-red-600" />
                                    </TextField>

                                    {/* REGISTER BUTTON */}
                                    <Button
                                        type="submit"
                                        className="group mt-6 h-14 w-full rounded-xl bg-[#0B0B0C] text-sm font-semibold text-[#F4F2ED] shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-all duration-300 hover:bg-[#151618] lg:mt-7 lg:shadow-none"
                                    >
                                        <span>
                                            Register
                                        </span>

                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#C7A76C] text-[#0B0B0C] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                            <FiArrowUpRight className="text-sm" />
                                        </span>
                                    </Button>

                                    {/* DIVIDER */}
                                    <div className="my-5 flex w-full items-center gap-4 lg:my-7">
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
                                        onPress={handleGoogleRegister}
                                        className="h-14 w-full rounded-xl border-white/25 bg-white/10 text-sm font-medium text-white transition-all duration-300 hover:border-white/40 hover:bg-white/15 lg:border-[#D9D6CF] lg:bg-white lg:text-[#111214] lg:hover:border-[#111214]/30 lg:hover:bg-[#F9F8F4]"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-sm font-semibold text-white lg:border-[#EAE7E0] lg:bg-[#F9F8F4] lg:text-[#111214]">
                                            G
                                        </span>

                                        Continue with Google
                                    </Button>

                                    {/* LOGIN LINK */}
                                    <p className="mt-6 text-center text-sm text-white/70 lg:mt-8 lg:text-[#6F706D]">
                                        Already have an account?

                                        <Link
                                            href="/login"
                                            className="ml-1.5 font-semibold text-white underline decoration-[#C7A76C] decoration-1 underline-offset-4 transition-colors duration-200 hover:text-[#C7A76C] lg:text-[#111214] lg:hover:text-[#AF8D52]"
                                        >
                                            Sign in
                                        </Link>
                                    </p>

                                    {/* FOOTNOTE */}
                                    <div className="mt-6 w-full border-t border-white/10 pt-4 lg:mt-10 lg:border-[#EAE7E0] lg:pt-5">
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

                                </Form>
                            </div>
                        </div>

                        {/* SEAM TRANSITION */}
                        <div className="pointer-events-none absolute inset-y-0 left-[52.4%] z-[25] hidden w-40 -translate-x-1/2 lg:block">
                            <div
                                className="absolute inset-0 backdrop-blur-2xl"
                                style={{
                                    maskImage: "linear-gradient(to left, transparent 0%, black 45%, black 100%)",
                                    WebkitMaskImage: "linear-gradient(to left, transparent 0%, black 45%, black 100%)",
                                }}
                            />

                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/55 to-white" />
                        </div>

                        {/* DESKTOP IMAGE PANEL */}
                        <div className="relative hidden min-h-[600px] overflow-hidden bg-[#0B0B0C] lg:block">
                            <img
                                src="https://i.ibb.co.com/7JTRYrSX/Luxury-car-in-architectural-lounge-202608282346.jpg"
                                alt="Premium Drivly vehicle"
                                fill
                                priority
                                sizes="50vw"
                                className="object-cover object-center"
                            />

                            {/* CINEMATIC OVERLAY */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/35 to-[#0B0B0C]/10" />

                            {/* IMAGE → FORM TRANSITION */}
                            <div className="absolute inset-y-0 left-0 z-20 w-40 bg-gradient-to-r from-[#0B0B0C]/35 via-transparent to-transparent" />

                            {/* IMAGE CONTENT */}
                            <div className="absolute inset-x-0 bottom-0 z-30 p-8 sm:p-10 lg:p-12">
                                <div className="max-w-md pl-15">

                                    <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-[#C7A76C]">
                                        Drivly
                                    </p>

                                    <h2 className="mt-4 text-3xl font-semibold leading-[1.05] tracking-tight text-[#F4F2ED] xl:text-4xl">
                                        Built for
                                        <br />
                                        <span className="text-[#C7A76C]">
                                            the drive.
                                        </span>
                                    </h2>

                                    <p className="mt-5 max-w-sm text-sm leading-7 text-[#F4F2ED]/55">
                                        Every membership unlocks a curated
                                        fleet, verified pricing, and
                                        effortless pickup.
                                    </p>

                                    <div className="mt-8 flex items-center gap-3">
                                        <span className="h-px w-10 bg-[#C7A76C]" />

                                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#F4F2ED]/40">
                                            Member access
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;