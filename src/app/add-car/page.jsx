"use client";

import React, { useState } from "react";
import { Button, Card, Input, Label, ListBox, Select, Switch, TextArea, TextField } from "@heroui/react";
import { FiArrowRight, FiCheckCircle, FiDollarSign, FiImage, FiInfo, FiMapPin, FiPlus, FiTrash2 } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const vehicleTypes = [
    "Sedan", "SUV", "Sports Coupe", "Hatchback", "Luxury", "Convertible", "Pickup Truck", "Minivan",
];

const transmissions = ["Automatic", "Manual"];

const fuelTypes = ["Petrol", "Diesel", "Hybrid", "Electric"];

const seatCapacities = ["2", "4", "5", "6", "7", "8"];

const fieldClass = "w-full";
const inputClass = "w-full rounded-xl border border-[#D9D6CF] bg-white text-[#111214] placeholder:text-[#6F706D] focus:border-[#C7A76C] focus:ring-1 focus:ring-[#C7A76C]/30";
const labelClass = "text-sm font-medium text-[#111214]";

const AddCar = () => {
    const [features, setFeatures] = useState([""]);
    const [availability, setAvailability] = useState(true);

    const addFeature = () => {
        setFeatures([...features, ""]);
    };

    const removeFeature = (index) => {
        if (features.length === 1) return;
        setFeatures(features.filter((_, i) => i !== index));
    };

    const updateFeature = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
    };

    const {
        data: session,
    } = authClient.useSession();

    const user = session?.user;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const raw = Object.fromEntries(formData.entries());

        const vehicleData = {
            user_id: user?.id,
            user_name: user?.name,
            user_image: user?.image,
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
            availability: availability,
            description: raw.description,
            key_features: features.filter((f) => f.trim() !== ""),
        };

        console.log("Vehicle Data:", vehicleData);

        const res = await fetch("http://localhost:5000/car", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vehicleData),
        });

        const result = await res.json();

        console.log("Server Response:", result);
    };

    return (
        <main className="min-h-screen bg-[#F4F2ED] py-10 sm:py-14 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* PAGE HEADING */}
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C7A76C] sm:text-sm">
                        List Your Vehicle
                    </p>

                    <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#111214] sm:text-4xl lg:text-5xl">
                        Add a new vehicle
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#6F706D] sm:text-base">
                        Add the details of your vehicle to create a complete, premium listing on Drivly.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSubmit} className="mx-auto mt-10 max-w-5xl space-y-6 lg:mt-14">

                    {/* VEHICLE IDENTITY */}
                    <Card className="rounded-2xl border border-[#D9D6CF] bg-white shadow-none">
                        <Card.Header className="border-b border-[#EAE7E0] px-5 py-6 sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#151618] text-[#C7A76C]">
                                    <FiInfo />
                                </div>

                                <div>
                                    <Card.Title className="text-lg font-semibold text-[#111214]">
                                        Vehicle Identity
                                    </Card.Title>

                                    <Card.Description className="mt-1 text-sm text-[#6F706D]">
                                        Basic information about your vehicle.
                                    </Card.Description>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Content className="grid gap-5 px-5 py-7 sm:grid-cols-2 sm:px-8">
                            <TextField className={fieldClass} name="vehicleName" isRequired>
                                <Label className={labelClass}>Vehicle Name</Label>
                                <Input className={inputClass} placeholder="e.g. BMW M4 Competition" />
                            </TextField>

                            <TextField className={fieldClass} name="brand" isRequired>
                                <Label className={labelClass}>Brand</Label>
                                <Input className={inputClass} placeholder="e.g. BMW" />
                            </TextField>

                            <TextField className={fieldClass} name="model" isRequired>
                                <Label className={labelClass}>Model</Label>
                                <Input className={inputClass} placeholder="e.g. M4 Competition" />
                            </TextField>

                            <TextField className={fieldClass} name="year" type="number" isRequired>
                                <Label className={labelClass}>Year</Label>
                                <Input className={inputClass} placeholder="e.g. 2025" />
                            </TextField>

                            <Select className={fieldClass} name="vehicleType" placeholder="Select vehicle type">
                                <Label className={labelClass}>Vehicle Type</Label>
                                <Select.Trigger className={inputClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        {vehicleTypes.map((type) => (
                                            <ListBox.Item key={type} id={type}>
                                                {type}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <TextField className={fieldClass} name="bodyStyle" isRequired>
                                <Label className={labelClass}>Body Style</Label>
                                <Input className={inputClass} placeholder="e.g. 2-door performance coupe" />
                            </TextField>

                            <TextField className={fieldClass} name="color" isRequired>
                                <Label className={labelClass}>Color</Label>
                                <Input className={inputClass} placeholder="e.g. Obsidian Black Metallic" />
                            </TextField>

                            <div className="sm:col-span-2">
                                <TextField className={fieldClass} name="imageUrl" isRequired>
                                    <Label className={labelClass}>Vehicle Image URL</Label>

                                    <div className="relative">
                                        <Input className={`${inputClass} pl-10`} placeholder="https://example.com/car-image.jpg" />
                                        <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F706D]" />
                                    </div>
                                </TextField>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* SPECIFICATIONS & PRICING */}
                    <Card className="rounded-2xl border border-[#D9D6CF] bg-white shadow-none">
                        <Card.Header className="border-b border-[#EAE7E0] px-5 py-6 sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#151618] text-[#C7A76C]">
                                    <FiDollarSign />
                                </div>

                                <div>
                                    <Card.Title className="text-lg font-semibold text-[#111214]">
                                        Specifications & Pricing
                                    </Card.Title>

                                    <Card.Description className="mt-1 text-sm text-[#6F706D]">
                                        Set the rental details and vehicle specifications.
                                    </Card.Description>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Content className="grid gap-5 px-5 py-7 sm:grid-cols-2 sm:px-8">
                            <TextField className={fieldClass} name="dailyRent" type="number" isRequired>
                                <Label className={labelClass}>Daily Rent Price</Label>

                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 z-10 -translate-y-1/2 text-sm font-medium text-[#6F706D]">
                                        $
                                    </span>

                                    <Input className={`${inputClass} pl-8`} placeholder="e.g. 220" />
                                </div>
                            </TextField>

                            <Select className={fieldClass} name="seatCapacity" placeholder="Select seats">
                                <Label className={labelClass}>Seat Capacity</Label>

                                <Select.Trigger className={inputClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        {seatCapacities.map((seat) => (
                                            <ListBox.Item key={seat} id={seat}>
                                                {seat} Seats
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select className={fieldClass} name="transmission" placeholder="Select transmission">
                                <Label className={labelClass}>Transmission</Label>

                                <Select.Trigger className={inputClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        {transmissions.map((transmission) => (
                                            <ListBox.Item key={transmission} id={transmission}>
                                                {transmission}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <Select className={fieldClass} name="fuelType" placeholder="Select fuel type">
                                <Label className={labelClass}>Fuel Type</Label>

                                <Select.Trigger className={inputClass}>
                                    <Select.Value />
                                    <Select.Indicator />
                                </Select.Trigger>

                                <Select.Popover>
                                    <ListBox>
                                        {fuelTypes.map((fuel) => (
                                            <ListBox.Item key={fuel} id={fuel}>
                                                {fuel}
                                                <ListBox.ItemIndicator />
                                            </ListBox.Item>
                                        ))}
                                    </ListBox>
                                </Select.Popover>
                            </Select>

                            <div className="sm:col-span-2">
                                <TextField className={fieldClass} name="pickupLocation" isRequired>
                                    <Label className={labelClass}>Pickup Location</Label>

                                    <div className="relative">
                                        <Input className={`${inputClass} pl-10`} placeholder="e.g. Gulshan, Dhaka" />
                                        <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6F706D]" />
                                    </div>
                                </TextField>
                            </div>

                            <div className="rounded-2xl border border-[#EAE7E0] bg-[#F4F2ED]/60 p-5 sm:col-span-2">
                                <Switch isSelected={availability} onChange={setAvailability}>
                                    <Switch.Content className="flex items-center gap-3">
                                        <Switch.Control>
                                            <Switch.Thumb />
                                        </Switch.Control>

                                        <div>
                                            <p className="text-sm font-medium text-[#111214]">
                                                Vehicle available for booking
                                            </p>

                                            <p className="mt-1 text-xs text-[#6F706D]">
                                                Turn this off if the vehicle is currently unavailable.
                                            </p>
                                        </div>
                                    </Switch.Content>
                                </Switch>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* DESCRIPTION & FEATURES */}
                    <Card className="rounded-2xl border border-[#D9D6CF] bg-white shadow-none">
                        <Card.Header className="border-b border-[#EAE7E0] px-5 py-6 sm:px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#151618] text-[#C7A76C]">
                                    <FiCheckCircle />
                                </div>

                                <div>
                                    <Card.Title className="text-lg font-semibold text-[#111214]">
                                        Description & Features
                                    </Card.Title>

                                    <Card.Description className="mt-1 text-sm text-[#6F706D]">
                                        Help renters understand what makes this vehicle special.
                                    </Card.Description>
                                </div>
                            </div>
                        </Card.Header>

                        <Card.Content className="gap-7 px-5 py-7 sm:px-8">
                            <TextField className={fieldClass} name="description" isRequired>
                                <Label className={labelClass}>Vehicle Description</Label>

                                <TextArea className={`${inputClass} min-h-32`} placeholder="Describe the vehicle, driving experience, interior, performance, and other important details..." rows={5} />
                            </TextField>

                            <div>
                                <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                                    <div>
                                        <h3 className="text-sm font-semibold text-[#111214]">
                                            Key Features
                                        </h3>

                                        <p className="mt-1 text-xs text-[#6F706D]">
                                            Add the features that make this vehicle stand out.
                                        </p>
                                    </div>

                                    <Button type="button" variant="outline" size="sm" onPress={addFeature} className="rounded-lg border-[#D9D6CF] bg-white text-[#111214] hover:border-[#C7A76C]">
                                        <FiPlus />
                                        Add Feature
                                    </Button>
                                </div>

                                <div className="space-y-3">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3">

                                            <Input
                                                aria-label={`Feature ${index + 1}`}
                                                placeholder={index === 0 ? "e.g. M Performance package" : "Premium Harman Kardon audio"}
                                                value={feature}
                                                onChange={(e) => updateFeature(index, e.target.value)}
                                                className={`${inputClass} flex-1`}
                                            />

                                            {features.length > 1 && (
                                                <Button type="button" isIconOnly variant="ghost" aria-label="Remove feature" onPress={() => removeFeature(index)} className="rounded-lg text-[#A64B45] hover:bg-[#A64B45]/10">
                                                    <FiTrash2 />
                                                </Button>
                                            )}

                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Card.Content>
                    </Card>

                    {/* SUBMIT */}
                    <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-[#D9D6CF] bg-[#151618] p-5 sm:flex-row sm:items-center sm:p-6">

                        <div>
                            <p className="text-sm font-medium text-[#F4F2ED]">
                                Ready to list your vehicle?
                            </p>

                            <p className="mt-1 text-xs text-[#F4F2ED]/50">
                                Review your information before publishing.
                            </p>
                        </div>

                        <Button type="submit" size="lg" variant="primary" className="rounded-lg bg-[#C7A76C] px-7 font-semibold text-[#0B0B0C] hover:bg-[#AF8D52]">
                            Add Vehicle
                            <FiArrowRight />
                        </Button>

                    </div>

                </form>
            </div>
        </main>
    );
};

export default AddCar;