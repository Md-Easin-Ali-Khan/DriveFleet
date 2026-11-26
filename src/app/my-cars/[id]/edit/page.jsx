
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const EditCarPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        brand: "",
        category: "",
        pricePerDay: "",
        image: "",
        seatCapacity: "",
        location: "",
        description: "",
        availability: true,
    });

    // Fetch existing car information
    useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await fetch(
                    `http://localhost:5000/cars/${id}`,
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to load car information");
                }

                const data = await response.json();

                setFormData({
                    name: data.name || "",
                    brand: data.brand || "",
                    category: data.category || "",
                    pricePerDay: data.pricePerDay || "",
                    image: data.image || "",
                    seatCapacity: data.seatCapacity || "",
                    location: data.location || "",
                    description: data.description || "",
                    availability: Boolean(data.availability),
                });
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCar();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                name === "availability"
                    ? value === "true"
                    : value,
        }));
    };

    // Update car
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const updatedCar = {
                ...formData,
                pricePerDay: Number(formData.pricePerDay),
                seatCapacity: Number(formData.seatCapacity),
            };

            const response = await fetch(
                `http://localhost:5000/cars/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(updatedCar),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to update car");
            }

            toast.success("Car updated successfully!");
            router.push("/my-cars");
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-slate-600">
                    Loading car information...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Edit Car
                    </h1>
                    <p className="mt-2 text-slate-500">
                        Update your car listing information.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-2xl bg-white p-6 shadow-sm sm:p-8"
                >
                    <div>
                        <label className="mb-2 block font-medium">
                            Car Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block font-medium">
                                Brand
                            </label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Category
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            >
                                <option value="">Select category</option>
                                <option value="Economy">Economy</option>
                                <option value="Luxury">Luxury</option>
                                <option value="SUV">SUV</option>
                                <option value="Sports">Sports</option>
                                <option value="Sedan">Sedan</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Price Per Day (৳)
                            </label>
                            <input
                                type="number"
                                name="pricePerDay"
                                value={formData.pricePerDay}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block font-medium">
                                Seat Capacity
                            </label>
                            <input
                                type="number"
                                name="seatCapacity"
                                value={formData.seatCapacity}
                                onChange={handleChange}
                                min="1"
                                required
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium">
                            Availability
                        </label>
                        <select
                            name="availability"
                            value={String(formData.availability)}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="true">Available</option>
                            <option value="false">Unavailable</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Updating..." : "Update Car"}
                        </button>

                        <button
                            type="button"
                            onClick={() => router.push("/my-cars")}
                            className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditCarPage;
