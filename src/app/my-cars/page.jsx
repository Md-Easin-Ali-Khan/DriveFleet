"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

const MyCarsPage = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyCars = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/my-cars",
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch your cars");
                }

                const data = await response.json();
                setCars(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyCars();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-slate-600">
                    Loading your cars...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">
                            My Added Cars
                        </h1>
                        <p className="mt-2 text-slate-500">
                            Manage the cars you have listed.
                        </p>
                    </div>

                    <Link
                        href="/add-car"
                        className="rounded-xl bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Add New Car
                    </Link>
                </div>

                {cars.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-800">
                            You haven't added any cars yet
                        </h2>
                        <p className="mt-2 text-slate-500">
                            Add your first car and start listing it for rent.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car) => (
                            <div
                                key={car._id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {car.name}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        {car.brand} · {car.category}
                                    </p>

                                    <p className="mt-3 text-lg font-semibold text-blue-600">
                                        ৳{car.pricePerDay}
                                        <span className="text-sm font-normal text-slate-500">
                                            {" "} / day
                                        </span>
                                    </p>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Location: {car.location}
                                    </p>

                                    <div className="mt-5 flex items-center justify-between">
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${car.availability
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {car.availability
                                                ? "Available"
                                                : "Unavailable"}
                                        </span>

                                        <Link
                                            href={`/cars/${car._id}`}
                                            className="font-semibold text-blue-600 hover:underline"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyCarsPage;
