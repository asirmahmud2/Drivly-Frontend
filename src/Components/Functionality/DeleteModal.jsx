"use client";

import React from "react";

import { AlertDialog, Button } from "@heroui/react";

import {
    FiArrowRight,
    FiTrash2,
} from "react-icons/fi";

import { useRouter } from "next/navigation";

export function DeleteModal({ data }) {
    const { _id, name, brand, model } = data;
    const vehicleName = name || `${brand} ${model}`;
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/cars/${_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw new Error("Failed to delete vehicle");
        }
        const result = await res.json();
        // console.log("Server Response:", result);
        router.push("/explore");
    };

    return (
        <AlertDialog>

            {/* TRIGGER */}

            <AlertDialog.Trigger>

                <button
                    type="button"
                    className="group flex min-h-14 items-center justify-center gap-3 rounded-xl border border-[#A64B45]/20 bg-[#FFFDFC] px-6 py-3 text-sm font-medium text-[#A64B45] transition-all duration-300 hover:border-[#A64B45]/40 hover:bg-[#A64B45]/5"
                >

                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A64B45]/5 transition-colors duration-300 group-hover:bg-[#A64B45]/10">

                        <FiTrash2 />

                    </span>

                    <span>Delete Vehicle</span>

                </button>

            </AlertDialog.Trigger>

            {/* PREMIUM DIALOG */}

            <AlertDialog.Backdrop className="bg-[#0B0B0C]/75 backdrop-blur-[6px]">

                <AlertDialog.Container
                    placement="center"
                    className="w-full max-w-[500px] px-4 py-4"
                >

                    <AlertDialog.Dialog
                        className="
                            relative
                            max-h-[calc(100dvh-2rem)]
                            w-full
                            overflow-y-auto
                            rounded-[2rem]
                            border
                            border-white/10
                            bg-[#0B0B0C]
                            shadow-[0_40px_120px_rgba(11,11,12,0.45)]
                        "
                    >

                        <AlertDialog.CloseTrigger />

                        {/* TOP ACCENT */}

                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A64B45] to-transparent" />

                        {/* MAIN CONTENT */}

                        <div className="px-7 pb-8 pt-10 sm:px-9 sm:pb-9 sm:pt-12">

                            {/* Eyebrow */}

                            <div className="flex items-center gap-3">

                                <span className="h-px w-8 bg-[#A64B45]" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A64B45]">
                                    Remove vehicle
                                </p>

                            </div>

                            {/* Heading */}

                            <AlertDialog.Heading className="mt-5 max-w-sm text-3xl font-semibold leading-[1.08] tracking-tight text-[#C7A76C] sm:text-4xl">

                                Remove {vehicleName} from your collection?

                            </AlertDialog.Heading>

                            {/* Description */}

                            <p className="mt-4 max-w-md text-sm leading-7 text-[#F4F2ED]/50">

                                This will permanently remove the listing and
                                its information from Drivly. This action
                                cannot be undone.

                            </p>

                            {/* BODY */}

                            <AlertDialog.Body className="px-0 py-7">

                                {/* Vehicle Information */}

                                <div className="border-l border-[#C7A76C]/60 pl-4">

                                    <p className="text-sm font-medium text-[#F4F2ED]">
                                        {vehicleName}
                                    </p>

                                    <p className="mt-1 text-xs tracking-wide text-[#F4F2ED]/40">

                                        {data.year}
                                        {"  ·  "}
                                        {data.type}

                                    </p>

                                </div>

                                {/* Secondary Warning */}

                                <div className="mt-7 flex items-center gap-2">

                                    <span className="h-1 w-1 rounded-full bg-[#A64B45]" />

                                    <p className="text-xs text-[#F4F2ED]/35">
                                        This action cannot be reversed.
                                    </p>

                                </div>

                            </AlertDialog.Body>

                            {/* FOOTER */}

                            <AlertDialog.Footer
                                className="
                                    -mx-7
                                    flex
                                    flex-col-reverse
                                    gap-3
                                    border-t
                                    border-white/[0.08]
                                    bg-[#111214]
                                    px-7
                                    py-5
                                    sm:-mx-9
                                    sm:flex-row
                                    sm:justify-end
                                    sm:px-9
                                "
                            >

                                {/* Keep Vehicle */}

                                <Button
                                    type="button"
                                    variant="secondary"
                                    slot="close"
                                    className="
                                        h-11
                                        rounded-xl
                                        border
                                        border-white/10
                                        bg-transparent
                                        px-5
                                        text-sm
                                        font-medium
                                        text-[#F4F2ED]/65
                                        transition-all
                                        duration-200
                                        hover:border-white/20
                                        hover:bg-white/5
                                        hover:text-[#F4F2ED]
                                    "
                                >

                                    Keep Vehicle

                                </Button>

                                {/* Delete Vehicle */}

                                <Button
                                    type="button"
                                    variant="danger"
                                    onPress={handleDelete}
                                    className="
                                        h-11
                                        rounded-xl
                                        border
                                        border-[#A64B45]/40
                                        bg-[#A64B45]
                                        px-5
                                        text-sm
                                        font-medium
                                        text-white
                                        transition-all
                                        duration-200
                                        hover:border-[#923F3A]
                                        hover:bg-[#923F3A]
                                    "
                                >

                                    <FiTrash2 className="text-[14px]" />

                                    <span>
                                        Delete Vehicle
                                    </span>

                                    <FiArrowRight className="text-[14px]" />

                                </Button>

                            </AlertDialog.Footer>

                        </div>

                    </AlertDialog.Dialog>

                </AlertDialog.Container>
            </AlertDialog.Backdrop>

        </AlertDialog>
    );
}