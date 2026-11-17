"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    Card,
    CardFooter,
    Chip,
    Button,
} from "@heroui/react";

import {
    FaArrowRight,
    FaUsers,
    FaCar,
} from "react-icons/fa";

export default function FeaturedCars() {
    const router = useRouter();

    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Cars from Backend
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

    return (
        <section className="bg-slate-950 px-5 py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Section Heading */}
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                        <Chip color="primary" variant="flat">
                            Our Collection
                        </Chip>

                        <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                            Explore Our Featured Cars
                        </h2>

                        <p className="mt-3 max-w-xl text-gray-500">
                            Discover our handpicked collection of premium
                            vehicles for your next journey.
                        </p>
                    </div>

                    <Button
                        color="primary"
                        variant="light"
                        endContent={<FaArrowRight />}
                        className="font-semibold"
                        onPress={() => router.push("/cars")}
                    >
                        View All Cars
                    </Button>
                </div>

                {/* Loading State */}
                {loading && (
                    <p className="mt-10 text-center text-gray-500">
                        Loading cars...
                    </p>
                )}

                {/* Error State */}
                {!loading && error && (
                    <p className="mt-10 text-center text-red-500">
                        {error}
                    </p>
                )}

                {/* Empty State */}
                {!loading && !error && cars.length === 0 && (
                    <p className="mt-10 text-center text-gray-500">
                        No cars available right now.
                    </p>
                )}

                {/* Car Cards */}
                {!loading && !error && cars.length > 0 && (
                    <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {cars.map((car) => (
                            <Card
                                key={car._id}
                                shadow="sm"
                                radius="lg"
                                className="bg-slate-900/60 border border-slate-800"
                            >
                                <div className="overflow-hidden p-0">
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

                                    <h3 className="text-xl font-bold text-gray-500">
                                        {car.name}
                                    </h3>

                                    <div className="flex items-center justify-between border-t border-gray-500 pt-4">
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
                                            onPress={() => router.push("/cars")}
                                        >
                                            View Details
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}
