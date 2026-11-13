"use client";

import Link from "next/link";
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

const cars = [
    {
        name: "Porsche 911 Carrera",
        category: "Luxury Sports",
        price: "12,000",
        seats: 2,
        image:
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
    },
    {
        name: "Mercedes-Benz C-Class",
        category: "Premium Sedan",
        price: "8,000",
        seats: 5,
        image:
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
    },
    {
        name: "BMW 5 Series",
        category: "Business Sedan",
        price: "7,000",
        seats: 5,
        image:
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
    },
];

export default function FeaturedCars() {
    return (
        <section className="bg-white px-5 py-20 lg:px-8">
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
                        as={Link}
                        href="/cars"
                        color="primary"
                        variant="light"
                        endContent={<FaArrowRight />}
                        className="font-semibold"
                    >
                        View All Cars
                    </Button>
                </div>

                {/* Car Cards */}
                <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                    {cars.map((car) => (
                        <Card
                            key={car.name}
                            shadow="sm"
                            radius="lg"
                            className="border border-gray-200"
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
                                    <Chip color="primary" variant="flat" size="sm">
                                        {car.category}
                                    </Chip>

                                    <span className="flex items-center gap-2 text-sm text-gray-500">
                                        <FaUsers />
                                        {car.seats} Seats
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900">
                                    {car.name}
                                </h3>

                                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <p className="text-2xl font-bold text-blue-600">
                                            ৳{car.price}
                                        </p>
                                        <p className="text-xs text-gray-500">Per day</p>
                                    </div>

                                    <Button
                                        as={Link}
                                        href="/cars"
                                        color="primary"
                                        radius="lg"
                                        endContent={<FaCar />}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}