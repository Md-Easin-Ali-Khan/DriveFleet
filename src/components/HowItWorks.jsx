"use client";

import { Chip, Card } from "@heroui/react";
import {
    FaSearch,
    FaCalendarCheck,
    FaCarSide,
    FaArrowRight,
} from "react-icons/fa";

const steps = [
    {
        number: "01",
        icon: FaSearch,
        title: "Find Your Car",
        description:
            "Explore our collection and choose the perfect vehicle tailored for your journey.",
    },
    {
        number: "02",
        icon: FaCalendarCheck,
        title: "Make a Booking",
        description:
            "Select your preferred dates and complete your secure reservation in just a few clicks.",
    },
    {
        number: "03",
        icon: FaCarSide,
        title: "Enjoy the Ride",
        description:
            "Hit the road with confidence and experience the ultimate freedom of driving.",
    },
];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-slate-950 px-5 py-20 lg:px-8 lg:py-28">
            {/* Background Glow Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

            <div className="relative mx-auto max-w-7xl">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center space-y-4">
                    <Chip
                        color="primary"
                        variant="flat"
                        className="border border-primary/20 bg-primary/10 font-bold uppercase tracking-wider text-xs px-3 py-1 text-primary"
                    >
                        Simple Process
                    </Chip>

                    <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                        Your Journey Starts{" "}
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            in 3 Steps
                        </span>
                    </h2>

                    <p className="text-sm md:text-base leading-relaxed text-slate-400">
                        Getting on the road has never been easier. Follow these simple steps and make your next journey happen seamlessly.
                    </p>
                </div>

                {/* Steps Cards Grid */}
                <div className="relative mt-16 grid gap-8 md:grid-cols-3">
                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.number} className="relative group">
                                {/* Connector Line for Desktop */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute top-1/4 right-0 hidden h-px w-full translate-x-1/2 border-t border-dashed border-slate-800 lg:block z-0" />
                                )}

                                <Card
                                    shadow="sm"
                                    className="relative z-10 h-full border border-slate-800/80 bg-slate-900/60 backdrop-blur-md transition-all duration-300 group-hover:-translate-y-2 group-hover:border-primary/50 group-hover:shadow-2xl group-hover:shadow-primary/10"
                                    radius="lg"
                                >
                                    <Card.Content className="p-8">
                                        <div className="flex items-center justify-between">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-2xl text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
                                                <Icon />
                                            </div>

                                            <span className="text-4xl font-black text-slate-800 group-hover:text-slate-700 transition-colors">
                                                {step.number}
                                            </span>
                                        </div>

                                        <h3 className="mt-6 text-xl font-bold text-white tracking-tight">
                                            {step.title}
                                        </h3>

                                        <p className="mt-3 text-sm leading-relaxed text-slate-400">
                                            {step.description}
                                        </p>
                                    </Card.Content>
                                </Card>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Note */}
                <div className="mt-16 flex items-center justify-center gap-3 border-t border-slate-900 pt-8 text-sm font-medium text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span>Three simple steps. One unforgettable journey.</span>
                    <FaArrowRight className="text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>

            </div>
        </section>
    );
}