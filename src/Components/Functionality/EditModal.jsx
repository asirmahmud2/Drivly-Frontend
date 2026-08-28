"use client";

import React, { useState } from "react";
import { Button, Input, Label, Modal, Switch, TextArea, TextField } from "@heroui/react";
import { FiArrowUpRight, FiCheck, FiDollarSign, FiEdit3, FiImage, FiInfo, FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";

const vehicleTypes = [
    "Sedan", "SUV", "Sports Coupe", "Hatchback", "Luxury", "Convertible", "Pickup Truck", "Minivan",
];

const transmissions = ["Automatic", "Manual"];
const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];
const seatCapacities = ["2", "4", "5", "6", "7", "8"];

const inputClass =
    "w-full rounded-xl border border-[#D9D6CF] bg-white text-[#111214] placeholder:text-[#92938F] focus:border-[#C7A76C] focus:ring-1 focus:ring-[#C7A76C]/30";
const labelClass = "text-sm font-medium text-[#111214]";

export function EditModal({ data }) {

    const { _id } = data;
    const [features, setFeatures] = useState(
        data?.key_features?.length ? data.key_features : [""]
    );
    const [availability, setAvailability] = useState(
        data?.availability ?? true
    );

    const addFeature = () => {
        setFeatures((previous) => [...previous, ""]);
    };

    const removeFeature = (index) => {
        setFeatures((previous) => {
            if (previous.length === 1) return previous;
            return previous.filter((_, i) => i !== index);
        });
    };

    const updateFeature = (index, value) => {
        setFeatures((previous) => {
            const updated = [...previous];
            updated[index] = value;
            return updated;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const raw = Object.fromEntries(
            new FormData(event.currentTarget).entries()
        );

        const vehicleData = {
            name: raw.vehicleName,
            brand: raw.brand,
            model: raw.model,
            image: raw.imageUrl,
            year: Number(raw.year),
            type: raw.vehicleType,
            color: raw.color,
            body_style: raw.bodyStyle,
            daily_rent_price: Number(raw.dailyRent),
            seat_capacity: Number(raw.seatCapacity),
            transmission: raw.transmission,
            fuel_type: raw.fuelType,
            pickup_location: raw.pickupLocation,
            availability,
            booking_count: 0,
            description: raw.description,
            key_features: features.filter((feature) => feature.trim() !== ""),
        };

        console.log("Vehicle Data:", vehicleData);
        const res = await fetch(`http://localhost:5000/cars/${_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(vehicleData)
        });
        const result = await res.json();
        console.log("Server Response:", result);
    };

    return (
        <Modal>
            <Modal.Trigger>
                <Button
                    variant="outline"
                    className="group flex min-h-14 items-center justify-center gap-3 rounded-xl border-[#D9D6CF] bg-[#F9F8F4] px-6 py-3 text-sm font-medium text-[#111214] transition-all duration-300 hover:border-[#C7A76C]/60 hover:bg-[#F4F2ED]"
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#6F706D] transition-colors duration-300 group-hover:bg-[#C7A76C]/10 group-hover:text-[#C7A76C]">
                        <FiEdit3 />
                    </span>
                    <span>Edit Vehicle</span>
                </Button>
            </Modal.Trigger>
            <Modal.Backdrop className="bg-[#0B0B0C]/70 backdrop-blur-sm">
                <Modal.Container
                    placement="auto"
                    className="w-full px-3 py-4 sm:px-6"
                >
                    <Modal.Dialog className="w-full max-w-4xl overflow-hidden rounded-3xl border border-[#D9D6CF] bg-[#F4F2ED] shadow-[0_30px_100px_rgba(11,11,12,0.25)]">
                        <Modal.CloseTrigger />
                        <Modal.Header className="border-b border-[#D9D6CF] bg-white px-6 py-6 sm:px-8">
                            <div className="flex items-start gap-4 pr-8">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#151618] text-[#C7A76C]">
                                    <FiEdit3 className="text-lg" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#C7A76C]">
                                        Vehicle management
                                    </p>
                                    <Modal.Heading className="mt-1.5 text-2xl font-semibold tracking-tight text-[#111214] sm:text-3xl">
                                        Edit your vehicle
                                    </Modal.Heading>
                                    <p className="mt-2 max-w-xl text-sm leading-6 text-[#6F706D]">
                                        Update the information below to keep your vehicle listing accurate and complete.
                                    </p>
                                </div>
                            </div>
                        </Modal.Header>
                        <Modal.Body className="max-h-[72vh] overflow-y-auto p-0">
                            <form
                                id="edit-vehicle-form"
                                onSubmit={handleSubmit}
                                className="space-y-4 p-5 sm:p-7"
                            >
                                <section className="overflow-hidden rounded-2xl border border-[#D9D6CF] bg-white">
                                    <div className="border-b border-[#EAE7E0] px-5 py-5 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#151618] text-[#C7A76C]">
                                                <FiInfo />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-[#111214]">
                                                    Vehicle Identity
                                                </h3>
                                                <p className="mt-0.5 text-xs text-[#6F706D]">
                                                    Core information about your vehicle.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                                        <TextField
                                            className="w-full sm:col-span-2"
                                            name="vehicleName"
                                            defaultValue={data?.name || ""}
                                        >
                                            <Label className={labelClass}>
                                                Vehicle Name
                                            </Label>
                                            <Input
                                                name="vehicleName"
                                                className={inputClass}
                                                placeholder="e.g. BMW M4 Competition"
                                                isRequired
                                            />
                                        </TextField>
                                        <TextField
                                            className="w-full"
                                            name="brand"
                                            defaultValue={data?.brand || ""}
                                        >
                                            <Label className={labelClass}>Brand</Label>
                                            <Input
                                                name="brand"
                                                className={inputClass}
                                                placeholder="e.g. BMW"
                                                isRequired
                                            />
                                        </TextField>
                                        <TextField
                                            className="w-full"
                                            name="model"
                                            defaultValue={data?.model || ""}
                                        >
                                            <Label className={labelClass}>Model</Label>
                                            <Input
                                                name="model"
                                                className={inputClass}
                                                placeholder="e.g. M4 Competition"
                                                isRequired
                                            />
                                        </TextField>
                                        <TextField
                                            className="w-full"
                                            name="year"
                                            defaultValue={data?.year ?? ""}
                                        >
                                            <Label className={labelClass}>
                                                Model Year
                                            </Label>
                                            <Input
                                                name="year"
                                                type="number"
                                                className={inputClass}
                                                placeholder="e.g. 2025"
                                                isRequired
                                            />
                                        </TextField>
                                        <div>
                                            <Label className={labelClass}>
                                                Vehicle Type
                                            </Label>
                                            <select
                                                name="vehicleType"
                                                defaultValue={data?.type || ""}
                                                className={`${inputClass} mt-2 h-11 px-3 outline-none`}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select vehicle type
                                                </option>
                                                {vehicleTypes.map((type) => (
                                                    <option key={type} value={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <TextField
                                            className="w-full"
                                            name="bodyStyle"
                                            defaultValue={data?.body_style || ""}
                                        >
                                            <Label className={labelClass}>
                                                Body Style
                                            </Label>
                                            <Input
                                                name="bodyStyle"
                                                className={inputClass}
                                                placeholder="e.g. 2-door performance coupe"
                                                isRequired
                                            />
                                        </TextField>
                                        <TextField
                                            className="w-full"
                                            name="color"
                                            defaultValue={data?.color || ""}
                                        >
                                            <Label className={labelClass}>
                                                Exterior Color
                                            </Label>
                                            <Input
                                                name="color"
                                                className={inputClass}
                                                placeholder="e.g. Obsidian Black Metallic"
                                                isRequired
                                            />
                                        </TextField>
                                        <TextField
                                            className="w-full sm:col-span-2"
                                            name="imageUrl"
                                            defaultValue={data?.image || ""}
                                        >
                                            <Label className={labelClass}>
                                                Vehicle Image URL
                                            </Label>
                                            <div className="relative mt-2">
                                                <Input
                                                    name="imageUrl"
                                                    className={`${inputClass} pl-10`}
                                                    placeholder="https://example.com/car-image.jpg"
                                                    isRequired
                                                />
                                                <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F706D]" />
                                            </div>
                                        </TextField>
                                    </div>
                                </section>

                                <section className="overflow-hidden rounded-2xl border border-[#D9D6CF] bg-white">
                                    <div className="border-b border-[#EAE7E0] px-5 py-5 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#151618] text-[#C7A76C]">
                                                <FiDollarSign />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-[#111214]">
                                                    Specifications & Pricing
                                                </h3>
                                                <p className="mt-0.5 text-xs text-[#6F706D]">
                                                    Adjust the vehicle's rental and technical specifications.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">
                                        <TextField
                                            className="w-full"
                                            name="dailyRent"
                                            defaultValue={data?.daily_rent_price ?? ""}
                                        >
                                            <Label className={labelClass}>
                                                Daily Rent Price
                                            </Label>
                                            <div className="relative mt-2">
                                                <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-[#6F706D]">
                                                    $
                                                </span>
                                                <Input
                                                    name="dailyRent"
                                                    type="number"
                                                    className={`${inputClass} pl-8`}
                                                    placeholder="e.g. 220"
                                                    isRequired
                                                />
                                            </div>
                                        </TextField>
                                        <div>
                                            <Label className={labelClass}>
                                                Seat Capacity
                                            </Label>
                                            <select
                                                name="seatCapacity"
                                                defaultValue={
                                                    data?.seat_capacity
                                                        ? String(data.seat_capacity)
                                                        : ""
                                                }
                                                className={`${inputClass} mt-2 h-11 px-3 outline-none`}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select seats
                                                </option>
                                                {seatCapacities.map((seat) => (
                                                    <option key={seat} value={seat}>
                                                        {seat} Seats
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className={labelClass}>
                                                Transmission
                                            </Label>
                                            <select
                                                name="transmission"
                                                defaultValue={data?.transmission || ""}
                                                className={`${inputClass} mt-2 h-11 px-3 outline-none`}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select transmission
                                                </option>
                                                {transmissions.map((transmission) => (
                                                    <option
                                                        key={transmission}
                                                        value={transmission}
                                                    >
                                                        {transmission}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <Label className={labelClass}>
                                                Fuel Type
                                            </Label>
                                            <select
                                                name="fuelType"
                                                defaultValue={data?.fuel_type || ""}
                                                className={`${inputClass} mt-2 h-11 px-3 outline-none`}
                                                required
                                            >
                                                <option value="" disabled>
                                                    Select fuel type
                                                </option>
                                                {fuelTypes.map((fuel) => (
                                                    <option key={fuel} value={fuel}>
                                                        {fuel}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <section className="overflow-hidden rounded-2xl border border-[#D9D6CF] bg-white">
                                    <div className="border-b border-[#EAE7E0] px-5 py-5 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#151618] text-[#C7A76C]">
                                                <FiMapPin />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-[#111214]">
                                                    Location & Availability
                                                </h3>
                                                <p className="mt-0.5 text-xs text-[#6F706D]">
                                                    Keep your pickup information and booking status current.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5 p-5 sm:p-6">
                                        <TextField
                                            className="w-full"
                                            name="pickupLocation"
                                            defaultValue={data?.pickup_location || ""}
                                        >
                                            <Label className={labelClass}>
                                                Pickup Location
                                            </Label>
                                            <div className="relative mt-2">
                                                <Input
                                                    name="pickupLocation"
                                                    className={`${inputClass} pl-10`}
                                                    placeholder="e.g. Gulshan, Dhaka"
                                                    isRequired
                                                />
                                                <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F706D]" />
                                            </div>
                                        </TextField>
                                        <div className="rounded-2xl border border-[#EAE7E0] bg-[#F9F8F4] p-4 sm:p-5">
                                            <Switch
                                                isSelected={availability}
                                                onChange={setAvailability}
                                            >
                                                <Switch.Content className="flex items-center gap-3">
                                                    <Switch.Control>
                                                        <Switch.Thumb />
                                                    </Switch.Control>
                                                    <div>
                                                        <p className="text-sm font-medium text-[#111214]">
                                                            Vehicle available for booking
                                                        </p>
                                                        <p className="mt-1 text-xs leading-5 text-[#6F706D]">
                                                            Turn this off when the vehicle is temporarily unavailable.
                                                        </p>
                                                    </div>
                                                </Switch.Content>
                                            </Switch>
                                        </div>
                                    </div>
                                </section>

                                <section className="overflow-hidden rounded-2xl border border-[#D9D6CF] bg-white">
                                    <div className="border-b border-[#EAE7E0] px-5 py-5 sm:px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#151618] text-[#C7A76C]">
                                                <FiCheck />
                                            </div>
                                            <div>
                                                <h3 className="text-base font-semibold text-[#111214]">
                                                    Description & Features
                                                </h3>
                                                <p className="mt-0.5 text-xs text-[#6F706D]">
                                                    Refine what makes this vehicle special.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-7 p-5 sm:p-6">
                                        <TextField
                                            className="w-full"
                                            name="description"
                                            defaultValue={data?.description || ""}
                                        >
                                            <Label className={labelClass}>
                                                Vehicle Description
                                            </Label>
                                            <TextArea
                                                name="description"
                                                className={`${inputClass} mt-2 min-h-32`}
                                                placeholder="Describe the vehicle, driving experience, interior, performance, and other important details..."
                                                rows={5}
                                                isRequired
                                            />
                                        </TextField>

                                        <div>
                                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                                <div>
                                                    <h4 className="text-sm font-semibold text-[#111214]">
                                                        Key Features
                                                    </h4>
                                                    <p className="mt-1 text-xs leading-5 text-[#6F706D]">
                                                        Add or remove features that should appear on the vehicle details page.
                                                    </p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onPress={addFeature}
                                                    className="rounded-lg border-[#D9D6CF] bg-white text-[#111214] hover:border-[#C7A76C] hover:text-[#AF8D52]"
                                                >
                                                    <FiPlus />
                                                    Add Feature
                                                </Button>
                                            </div>
                                            <div className="space-y-3">
                                                {features.map((feature, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-3"
                                                    >
                                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#EAE7E0] bg-[#F9F8F4] text-xs font-semibold text-[#6F706D]">
                                                            {String(index + 1).padStart(
                                                                2,
                                                                "0"
                                                            )}
                                                        </div>
                                                        <Input
                                                            aria-label={`Feature ${index + 1
                                                                }`}
                                                            value={feature}
                                                            onChange={(event) =>
                                                                updateFeature(
                                                                    index,
                                                                    event.target.value
                                                                )
                                                            }
                                                            className={`${inputClass} flex-1`}
                                                            placeholder={
                                                                index === 0
                                                                    ? "e.g. M Performance package"
                                                                    : "e.g. Premium Harman Kardon audio"
                                                            }
                                                        />
                                                        {features.length > 1 && (
                                                            <Button
                                                                type="button"
                                                                isIconOnly
                                                                variant="ghost"
                                                                aria-label="Remove feature"
                                                                onPress={() =>
                                                                    removeFeature(index)
                                                                }
                                                                className="rounded-lg text-[#A64B45] hover:bg-[#A64B45]/10"
                                                            >
                                                                <FiTrash2 />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </form>
                        </Modal.Body>
                        <Modal.Footer className="border-t border-[#D9D6CF] bg-white px-5 py-4 sm:px-7">
                            <div className="flex w-full flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <div className="hidden sm:block">
                                    <p className="text-xs text-[#92938F]">
                                        Review the information before saving.
                                    </p>
                                </div>
                                <div className="flex w-full gap-3 sm:w-auto">
                                    <Button
                                        slot="close"
                                        variant="outline"
                                        className="flex-1 rounded-xl border-[#D9D6CF] bg-white px-6 text-sm font-medium text-[#111214] hover:border-[#111214]/30 sm:flex-none"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        form="edit-vehicle-form"
                                        // slot="close"
                                        className="group flex-1 rounded-xl bg-[#0B0B0C] px-6 text-sm font-semibold text-[#F4F2ED] hover:bg-[#151618] sm:flex-none"
                                    >
                                        Save Changes
                                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#C7A76C] text-[#0B0B0C] transition-transform duration-300 group-hover:translate-x-0.5">
                                            <FiArrowUpRight className="text-sm" />
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}
