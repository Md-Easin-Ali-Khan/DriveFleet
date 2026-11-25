
"use client";

import { useState } from "react";
import { toast } from "sonner";

const AddCarPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        pricePerDay: "",
        image: "",
        seatCapacity: "",
        location: "",
        description: "",
        availability: "true",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit car information
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSubmitting) return;

        const carData = {
            ...formData,
            pricePerDay: Number(formData.pricePerDay),
            seatCapacity: Number(formData.seatCapacity),
            availability: formData.availability === "true",
        };

        try {
            setIsSubmitting(true);

            const response = await fetch("http://localhost:5000/cars", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(carData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add car");
            }

            toast.success("Car added successfully!");

            setFormData({
                name: "",
                brand: "",
                category: "",
                pricePerDay: "",
                image: "",
                seatCapacity: "",
                location: "",
                description: "",
                availability: "true",
            });

        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Heading */}
                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        Add Your Car
                    </h1>

                    <p className="mt-3 text-slate-500">
                        List your vehicle and connect with people looking for their next ride.
                    </p>
                </div>

                {/* Form */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Car Name & Brand */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Car Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. BMW 5 Series"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Brand
                                </label>
                                <input
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. BMW"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Category & Price */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Car Category
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                                >
                                    <option value="" disabled>Select category</option>
                                    <option value="Sedan">Sedan</option>
                                    <option value="SUV">SUV</option>
                                    <option value="Luxury">Luxury</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Sports">Sports</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Daily Rental Price (৳)
                                </label>
                                <input
                                    type="number"
                                    name="pricePerDay"
                                    value={formData.pricePerDay}
                                    onChange={handleChange}
                                    placeholder="e.g. 5000"
                                    min="1"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Image URL & Seat Capacity */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Car Image URL
                                </label>
                                <input
                                    type="url"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    placeholder="https://example.com/car.jpg"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Seat Capacity
                                </label>
                                <input
                                    type="number"
                                    name="seatCapacity"
                                    value={formData.seatCapacity}
                                    onChange={handleChange}
                                    placeholder="e.g. 5"
                                    min="1"
                                    required
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Pickup Location
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Dhaka, Bangladesh"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Car Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                placeholder="Describe your car..."
                                required
                                className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3"
                            />
                        </div>

                        {/* Availability */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-slate-700">
                                Availability
                            </label>
                            <select
                                name="availability"
                                value={formData.availability}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3"
                            >
                                <option value="true">Available</option>
                                <option value="false">Unavailable</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-blue-600 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Adding Car..." : "Add Car Listing"}
                        </button>

                    </form>
                </div>
            </div>
        </main>
    );
};

export default AddCarPage;
