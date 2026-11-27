
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const CarDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [driverNeeded, setDriverNeeded] = useState("No");
    const [specialNote, setSpecialNote] = useState("");
    const [isBooking, setIsBooking] = useState(false);

    // Fetch car details
    useEffect(() => {
        if (!id) return;

        const fetchCar = async () => {
            try {
                setLoading(true);
                setError("");

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
    }, [id]);

    // Create booking
    const handleBooking = async (e) => {
        e.preventDefault();

        if (!car) return;

        if (!car.availability) {
            toast.error("This car is currently unavailable");
            return;
        }

        setIsBooking(true);

        try {
            const bookingData = {
                carId: car._id,
                carName: car.name,
                pricePerDay: car.pricePerDay,
                driverNeeded,
                specialNote,
            };

            const response = await fetch(
                "http://localhost:5000/bookings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify(bookingData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to create booking"
                );
            }

            toast.success("Car booked successfully!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsBooking(false);
        }
    };

    if (loading) {
        return (
            <p className="p-10 text-center">
                Loading car details...
            </p>
        );
    }

    if (error) {
        return (
            <p className="p-10 text-center text-red-500">
                {error}
            </p>
        );
    }

    if (!car) {
        return (
            <p className="p-10 text-center">
                Car not found.
            </p>
        );
    }

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
                        {car.location}
                        <span className="mx-2">·</span>
                        {car.seatCapacity} Seats
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
                            <span className="text-slate-600">
                                Availability
                            </span>

                            <span
                                className={`rounded-full px-3 py-1 text-sm font-medium ${car.availability
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {car.availability
                                    ? "Available"
                                    : "Unavailable"}
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-slate-600">
                                Seats
                            </span>

                            <span className="font-semibold text-slate-900">
                                {car.seatCapacity}
                            </span>
                        </div>

                        {/* Booking Form */}
                        <form onSubmit={handleBooking} className="mt-6 space-y-4">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Driver Needed?
                                </label>

                                <select
                                    value={driverNeeded}
                                    onChange={(e) =>
                                        setDriverNeeded(e.target.value)
                                    }
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                                >
                                    <option value="No">No, I will drive</option>
                                    <option value="Yes">Yes, I need a driver</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Special Note
                                </label>

                                <textarea
                                    value={specialNote}
                                    onChange={(e) =>
                                        setSpecialNote(e.target.value)
                                    }
                                    rows={3}
                                    placeholder="Any special request? (optional)"
                                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!car.availability || isBooking}
                                className="w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                            >
                                {isBooking
                                    ? "Booking..."
                                    : car.availability
                                        ? "Book Now"
                                        : "Unavailable"}
                            </button>
                        </form>

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
