"use client";
import { useEffect, useState } from "react";

const CarDetailsPage = ({ params }) => {
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const { id } = await params;

                const response = await fetch(
                    `http://localhost:5000/cars/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch car details");
                }

                const data = await response.json();
                setCar(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCar();
    }, [params]);

    if (loading) return <p className="p-10 text-center">Loading car details...</p>;

    if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

    if (!car) return <p className="p-10 text-center">Car not found.</p>;

    return (
        <main className="min-h-screen bg-slate-50">
            <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">

                {/* Breadcrumb */}
                <div className="mb-8 text-sm text-slate-500">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                    <span>Explore Cars</span>
                    <span className="mx-2">/</span>
                    <span className="font-medium text-slate-900">
                        {car.name}
                    </span>
                </div>

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                        {car.brand} · {car.category}
                    </p>

                    <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
                        {car.name}
                    </h1>

                    <p className="mt-3 text-slate-500">
                        <span>{car.location}</span>
                        <span className="mx-2">·</span>
                        <span>{car.seatCapacity} Seats</span>
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                    {/* Car Information */}
                    <div className="space-y-6 lg:col-span-2">

                        {/* Car Image */}
                        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                            <img
                                src={car.image}
                                alt={car.name}
                                className="h-72 w-full object-cover md:h-[420px]"
                            />
                        </div>

                        {/* Description */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
                            <h2 className="text-xl font-bold text-slate-900">
                                About This Car
                            </h2>

                            <p className="mt-4 leading-7 text-slate-600">
                                {car.description}
                            </p>
                        </div>
                    </div>

                    {/* Booking Card */}
                    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-slate-500">
                            Daily Rental Price
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-slate-900">
                            ৳{car.pricePerDay?.toLocaleString("en-BD")}
                            <span className="text-sm font-normal text-slate-500">
                                {" "}/ day
                            </span>
                        </h2>

                        <div className="my-6 border-t border-slate-100" />

                        <div className="flex items-center justify-between">
                            <span className="text-slate-600">Availability</span>

                            <span className={`rounded-full px-3 py-1 text-sm font-medium ${car.availability
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}>
                                {car.availability ? "Available" : "Unavailable"}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-slate-600">Seats</span>
                            <span className="font-semibold text-slate-900">
                                {car.seatCapacity}
                            </span>
                        </div>

                        <button
                            disabled={!car.availability}
                            className="mt-8 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                        >
                            Book Now
                        </button>

                        <p className="mt-4 text-center text-xs text-slate-400">
                            Booking is subject to vehicle availability.
                        </p>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default CarDetailsPage;