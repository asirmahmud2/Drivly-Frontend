"use client";

import React from "react";
import { AlertDialog, Button } from "@heroui/react";
import { FiArrowRight, FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { carDeletedToast } from "../Toasters";
import { authClient } from "@/lib/auth-client";

export function DeleteModal({ data }) {
    const { _id, name, brand, model, year, type } = data;
    const vehicleName = name || `${brand} ${model}`;
    const router = useRouter();

    const handleDelete = async () => {
        const { data: tokenData } = await authClient.token();
        console.log("Token Data:", tokenData);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/cars/${_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${tokenData?.token}`
                },
            });

            if (!res.ok) {
                throw new Error("Failed to delete vehicle");
            }

            const result = await res.json();
            carDeletedToast();

            // console.log("Server Response:", result);

            router.push("/my-cars");
        } catch (error) {
            console.error("Delete Error:", error);
        }
    };

    return (
        <AlertDialog>
            {/* TRIGGER */}
            <AlertDialog.Trigger>
                <button type="button" className="group flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#E4D8D6] bg-[#FFFDFC] px-4 text-sm font-medium text-[#8F514B] transition-all duration-300 hover:border-[#A64B45]/40 hover:bg-[#A64B45]/5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#A64B45]/8 transition-colors duration-300 group-hover:bg-[#A64B45]/12">
                        <FiTrash2 className="text-sm" />
                    </span>
                    <span>Delete</span>
                </button>
            </AlertDialog.Trigger>

            {/* PREMIUM DIALOG */}
            <AlertDialog.Backdrop className="bg-[#0B0B0C]/75 backdrop-blur-[6px]">
                <AlertDialog.Container placement="center" className="w-full max-w-[500px] px-4 py-4">
                    <AlertDialog.Dialog className="relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0B0B0C] shadow-[0_40px_120px_rgba(11,11,12,0.45)]">
                        <AlertDialog.CloseTrigger />

                        {/* TOP ACCENT */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#A64B45] to-transparent" />

                        {/* MAIN CONTENT */}
                        <div className="px-7 pb-8 pt-10 sm:px-9 sm:pb-9 sm:pt-12">

                            {/* EYEBROW */}
                            <div className="flex items-center gap-3">
                                <span className="h-px w-8 bg-[#A64B45]" />

                                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#A64B45]">
                                    Remove vehicle
                                </p>
                            </div>

                            {/* HEADING */}
                            <AlertDialog.Heading className="mt-5 max-w-sm text-3xl font-semibold leading-[1.08] tracking-tight text-[#C7A76C] sm:text-4xl">
                                Remove {vehicleName} from your collection?
                            </AlertDialog.Heading>

                            {/* DESCRIPTION */}
                            <p className="mt-4 max-w-md text-sm leading-7 text-[#F4F2ED]/50">
                                This will permanently remove the listing and its information from Drivly. This action cannot be undone.
                            </p>

                            {/* BODY */}
                            <AlertDialog.Body className="px-0 py-7">

                                {/* VEHICLE INFORMATION */}
                                <div className="border-l border-[#C7A76C]/60 pl-4">
                                    <p className="text-sm font-medium text-[#F4F2ED]">
                                        {vehicleName}
                                    </p>

                                    <p className="mt-1 text-xs tracking-wide text-[#F4F2ED]/40">
                                        {year} · {type}
                                    </p>
                                </div>

                                {/* SECONDARY WARNING */}
                                <div className="mt-7 flex items-center gap-2">
                                    <span className="h-1 w-1 rounded-full bg-[#A64B45]" />

                                    <p className="text-xs text-[#F4F2ED]/35">
                                        This action cannot be reversed.
                                    </p>
                                </div>

                            </AlertDialog.Body>

                            {/* FOOTER */}
                            <AlertDialog.Footer className="-mx-7 flex flex-col-reverse gap-3 border-t border-white/[0.08] bg-[#111214] px-7 py-5 sm:-mx-9 sm:flex-row sm:justify-end sm:px-9">

                                {/* KEEP VEHICLE */}
                                <Button type="button" variant="secondary" slot="close" className="h-11 rounded-xl border border-white/10 bg-transparent px-5 text-sm font-medium text-[#F4F2ED]/65 transition-all duration-200 hover:border-white/20 hover:bg-white/5 hover:text-[#F4F2ED]">
                                    Keep Vehicle
                                </Button>

                                {/* DELETE VEHICLE */}
                                <Button type="button" variant="danger" onPress={handleDelete} className="group h-11 rounded-xl border border-[#A64B45]/40 bg-[#A64B45] px-5 text-sm font-medium text-white transition-all duration-200 hover:border-[#923F3A] hover:bg-[#923F3A]">
                                    <FiTrash2 className="text-[14px]" />

                                    <span>Delete Vehicle</span>

                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-0.5">
                                        <FiArrowRight className="text-[13px]" />
                                    </span>
                                </Button>

                            </AlertDialog.Footer>
                        </div>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}