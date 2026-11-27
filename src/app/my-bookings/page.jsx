"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/my-bookings",
                    {
                        credentials: "include",
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch your bookings");
                }

                const data = await response.json();
                setBookings(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-slate-600">
                    Loading your bookings...
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-12">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-slate-900">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-slate-500">
                        View and manage the cars you have booked.
                    </p>
                </div>

                {bookings.length === 0 ? (
                    <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-slate-800">
                            No bookings yet
                        </h2>

                        <p className="mt-2 text-slate-500">
                            Explore our cars and book your next ride.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                                <div className="mb-4 flex items-start justify-between gap-3">
                                    <h2 className="text-xl font-bold text-slate-900">
                                        {booking.carName || "Car Booking"}
                                    </h2>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                                        Booked
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm text-slate-600">
                                    <p>
                                        <span className="font-medium text-slate-800">
                                            Driver Needed:
                                        </span>{" "}
                                        {booking.driverNeeded || "Not specified"}
                                    </p>

                                    {booking.specialNote && (
                                        <p>
                                            <span className="font-medium text-slate-800">
                                                Special Note:
                                            </span>{" "}
                                            {booking.specialNote}
                                        </p>
                                    )}

                                    {booking.createdAt && (
                                        <p>
                                            <span className="font-medium text-slate-800">
                                                Booking Date:
                                            </span>{" "}
                                            {new Date(
                                                booking.createdAt
                                            ).toLocaleDateString()}
                                        </p>
                                    )}

                                    {booking.pricePerDay && (
                                        <p>
                                            <span className="font-medium text-slate-800">
                                                Price Per Day:
                                            </span>{" "}
                                            ৳{booking.pricePerDay}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 border-t border-slate-100 pt-4">
                                    <p className="text-xs text-slate-400">
                                        Booking ID: {booking._id}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default MyBookingsPage;
