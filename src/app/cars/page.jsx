"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaSearch, FaSlidersH, FaUsers, FaCar } from "react-icons/fa";

import { Card, CardFooter, Chip, Button } from "@heroui/react";

const CarsPage = () => {
    const router = useRouter();

    const [cars, setCars] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch All Cars
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch("http://localhost:5000/cars");

                if (!response.ok) {
                    throw new Error("Failed to fetch cars");
                }

                const data = await response.json();
                setCars(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    // Search and Category Filter
    const filteredCars = cars.filter((car) => {
        const matchesSearch = car.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory = category
            ? car.category.toLowerCase() === category.toLowerCase()
            : true;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="min-h-screen bg-slate-950">

            {/* Hero Section */}
            <section className=" px-6 py-20 text-center text-white">
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
                        {[...new Set(cars.map((car) => car.category))].map(
                            (item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            )
                        )}
                    </select>
                </div>

                {/* Results Count */}
                <p className="mt-8 text-sm text-slate-500">
                    Showing {filteredCars.length} of {cars.length} cars
                </p>

                {/* Loading */}
                {loading && (
                    <p className="py-16 text-center text-slate-500">
                        Loading cars...
                    </p>
                )}

                {/* Error */}
                {!loading && error && (
                    <p className="py-16 text-center text-red-500">
                        {error}
                    </p>
                )}

                {/* Empty Result */}
                {!loading && !error && filteredCars.length === 0 && (
                    <div className="mt-8 rounded-2xl bg-white px-6 py-16 text-center">
                        <h3 className="text-lg font-semibold text-slate-800">
                            No cars found
                        </h3>

                        <p className="mt-2 text-sm text-slate-500">
                            Try another search or category.
                        </p>
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
                                className="border border-gray-200"
                            >
                                <div className="overflow-hidden">
                                    <img
                                        src={car.image}
                                        alt={car.name}
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
                                            {car.seatCapacity} Seats
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900">
                                        {car.name}
                                    </h3>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <div>
                                            <p className="text-2xl font-bold text-blue-600">
                                                ৳{car.pricePerDay.toLocaleString("en-IN")}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                Per day
                                            </p>
                                        </div>

                                        <Button
                                            color="primary"
                                            radius="lg"
                                            endContent={<FaCar />}
                                            onPress={() => router.push(`/cars/${car._id}`)}
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
