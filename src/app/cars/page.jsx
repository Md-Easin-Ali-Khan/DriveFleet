"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    FaSearch,
    FaSlidersH,
    FaUsers,
    FaCar,
} from "react-icons/fa";

import {
    Card,
    CardFooter,
    Chip,
    Button,
} from "@heroui/react";

const CarsPage = () => {
    const router = useRouter();

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch all cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/cars"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }

                const data = await response.json();

                if (!Array.isArray(data)) {
                    throw new Error("Invalid car data received");
                }

                setCars(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Get unique categories
    const categories = [
        ...new Set(
            cars
                .map((car) => car.category)
                .filter(Boolean)
        ),
    ];

    // Search and category filter
    const filteredCars = cars.filter((car) => {
        const carName = String(car.name || "").toLowerCase();
        const searchValue = search.trim().toLowerCase();

        const matchesSearch = carName.includes(searchValue);

        const matchesCategory = category
            ? car.category?.toLowerCase() === category.toLowerCase()
            : true;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-slate-50">

            {/* Hero Section */}
            <section className="bg-slate-950 px-6 py-20 text-center text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Explore Our Collection
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Find the Perfect Car for Your Journey
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
                        Discover a wide range of vehicles that match your
                        travel needs, comfort, and budget.
                    </p>
                </div>
            </section>

            {/* Cars Section */}
            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">

                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Explore All Cars
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Find a vehicle that fits your next adventure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FaSlidersH className="text-blue-600" />
                        Search & Filter
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">

                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                        <FaSearch className="text-slate-400" />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by car name..."
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500"
                    >
                        <option value="">All Car Types</option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    {(search || category) && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("");
                            }}
                            className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
                        >
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Results Count */}
                {!loading && !error && (
                    <p className="mt-8 text-sm text-slate-500">
                        Showing {filteredCars.length} of {cars.length} cars
                    </p>
                )}

                {/* Loading */}
                {loading && (
                    <div className="py-20 text-center">
                        <p className="text-lg font-medium text-slate-500">
                            Loading cars...
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="mt-8 rounded-2xl bg-red-50 px-6 py-16 text-center">
                        <h3 className="text-lg font-semibold text-red-600">
                            Unable to load cars
                        </h3>

                        <p className="mt-2 text-sm text-red-500">
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty Result */}
                {!loading && !error && filteredCars.length === 0 && (
                    <div className="mt-8 rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
                        <FaCar className="mx-auto text-4xl text-slate-300" />

                        <h3 className="mt-4 text-lg font-semibold text-slate-800">
                            No cars found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Try another search or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearch("");
                                setCategory("");
                            }}
                            className="mt-5 font-semibold text-blue-600 hover:underline"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Car Cards */}
                {!loading && !error && filteredCars.length > 0 && (
                    <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredCars.map((car) => (
                            <Card
                                key={car._id}
                                shadow="sm"
                                radius="lg"
                                className="overflow-hidden border border-gray-200"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name || "Rental car"}
                                        className="h-60 w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                </div>

                                <CardFooter className="flex-col items-stretch gap-4 p-5">
                                    <div className="flex items-center justify-between">
                                        <Chip
                                            color="primary"
                                            variant="flat"
                                            size="sm"
                                        >
                                            {car.category}
                                        </Chip>

                                        <span className="flex items-center gap-2 text-sm text-gray-500">
                                            <FaUsers />
                                            {car.seatCapacity || "N/A"} Seats
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {car.name}
                                    </h3>

                                    <p className="text-sm text-slate-500">
                                        {car.brand}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ৳{Number(car.pricePerDay || 0).toLocaleString("en-IN")}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Per day
                                            </p>
                                        </div>

                                        <Button
                                            color="primary"
                                            radius="lg"
                                            endContent={<FaCar />}
                                            onPress={() =>
                                                router.push(`/cars/${car._id}`)
                                            }
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default CarsPage;
