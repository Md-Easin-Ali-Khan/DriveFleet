"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const MyCarsPage = () => {
    const router = useRouter();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deleteCarId, setDeleteCarId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fetch user's cars
    useEffect(() => {
        const fetchMyCars = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/my-cars",
                    {
                        credentials: "include",
                    }
                );

                if (response.status === 401) {
                    toast.error("Please login to view your cars");
                    router.replace("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch your cars");
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid response from server");
                }

                setCars(data);
            } catch (error) {
                setError(error.message);
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMyCars();
    }, [router]);

    // Delete car
    const handleDelete = async () => {
        if (!deleteCarId) return;

        setIsDeleting(true);

        try {
            const response = await fetch(
                `http://localhost:5000/cars/${deleteCarId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (response.status === 401) {
                toast.error("Please login again");
                router.replace("/login");
                return;
            }

            if (!response.ok) {
                throw new Error(data.message || "Failed to delete car");
            }

            setCars((previousCars) =>
                previousCars.filter(
                    (car) => car._id !== deleteCarId
                )
            );

            toast.success("Car deleted successfully!");
            setDeleteCarId(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <p className="text-lg font-medium text-slate-600">
                    Loading your cars...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
                <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
                    <h2 className="text-xl font-semibold text-red-600">
                        Unable to load your cars
                    </h2>

                    <p className="mt-2 text-slate-600">
                        {error}
                    </p>

                    <button
                        onClick={() => window.location.reload()}
                        className="mt-5 rounded-xl bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                </div>
            </main>
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
                            You have not added any cars yet
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

                                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
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

                                        <div className="flex items-center gap-3">
                                            <Link
                                                href={`/cars/${car._id}`}
                                                className="font-semibold text-blue-600 hover:underline"
                                            >
                                                View Details
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    setDeleteCarId(car._id)
                                                }
                                                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                            >
                                                Delete
                                            </button>

                                            <Link
                                                href={`/my-cars/${car._id}/edit`}
                                                className="font-semibold text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Custom Delete Confirmation Modal */}
            {deleteCarId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-bold text-slate-900">
                            Delete this car?
                        </h2>

                        <p className="mt-3 text-slate-600">
                            Are you sure you want to delete this car?
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteCarId(null)}
                                disabled={isDeleting}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                disabled={isDeleting}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default MyCarsPage;
