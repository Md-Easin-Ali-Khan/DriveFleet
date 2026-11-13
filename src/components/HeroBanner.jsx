
import Link from "next/link";
import { Button } from "@heroui/react";
import {
    FaArrowRight,
    FaCarSide,
    FaShieldAlt,
    FaStar,
} from "react-icons/fa";

export default function HeroBanner() {
    return (
        <section className="relative isolate overflow-hidden bg-slate-950">
            {/* Background Image */}
            <div
                className="absolute inset-0 -z-20 bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1800')",
                }}
            />

            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/20" />

            <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:py-32 lg:px-8">
                {/* Left Content */}
                <div className="max-w-2xl">
                    <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
                        <FaStar />
                        Premium Car Rental Experience
                    </div>

                    <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Drive Your Dreams.
                        <span className="mt-2 block text-blue-500">
                            We Handle The Rest.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-8 text-gray-300 md:text-lg">
                        Discover the perfect ride for every journey.
                        From everyday comfort to luxury experiences,
                        your next adventure starts with DriveFleet.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-4">
                        <Link href="/explore-cars">
                            <Button
                                color="primary"
                                size="lg"
                                radius="lg"
                                endContent={<FaArrowRight />}
                                className="bg-blue-600 px-7 font-semibold text-white"
                            >
                                Explore Cars
                            </Button>
                        </Link>

                        <Link href="/get-started">
                            <Button
                                variant="bordered"
                                size="lg"
                                radius="lg"
                                className="border-white/40 px-7 font-semibold text-white"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
                        <div>
                            <p className="text-3xl font-bold text-white">500+</p>
                            <p className="mt-1 text-sm text-gray-400">Happy Customers</p>
                        </div>

                        <div>
                            <p className="text-3xl font-bold text-white">100+</p>
                            <p className="mt-1 text-sm text-gray-400">Premium Cars</p>
                        </div>

                        <div>
                            <p className="flex items-center gap-2 text-3xl font-bold text-white">
                                <FaShieldAlt className="text-blue-400" />
                                24/7
                            </p>
                            <p className="mt-1 text-sm text-gray-400">Customer Support</p>
                        </div>
                    </div>
                </div>

                {/* Right Side Highlight */}
                <div className="hidden justify-center md:flex">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
                                <FaCarSide />
                            </div>
                            <div>
                                <p className="font-bold text-white">Your Journey Starts Here</p>
                                <p className="text-sm text-gray-300">
                                    Comfort. Freedom. Reliability.
                                </p>
                            </div>
                        </div>
                        <p className="mt-5 max-w-xs text-sm leading-7 text-gray-300">
                            Find a vehicle that fits your lifestyle and
                            enjoy a better way to travel.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
