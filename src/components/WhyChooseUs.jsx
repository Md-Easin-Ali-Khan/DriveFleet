"use client";

import { Card, Chip } from "@heroui/react";
import {
    FaShieldAlt,
    FaCalendarCheck,
    FaHeadset,
    FaArrowRight,
} from "react-icons/fa";

const benefits = [
    {
        number: "01",
        icon: FaShieldAlt,
        title: "Reliable & Secure",
        description:
            "Every booking is designed around your comfort, safety, and absolute peace of mind.",
    },
    {
        number: "02",
        icon: FaCalendarCheck,
        title: "Effortless Booking",
        description:
            "Find your ideal vehicle and book your next journey quickly without unnecessary hassle.",
    },
    {
        number: "03",
        icon: FaHeadset,
        title: "Here When You Need Us",
        description:
            "Get dedicated 24/7 assistance whenever you need help with your vehicle rental experience.",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden bg-slate-50/50 px-5 py-20 lg:px-8 lg:py-28">
            <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">

                {/* Left Content */}
                <div className="space-y-6">
                    <Chip
                        color="primary"
                        variant="flat"
                        className="font-bold tracking-wider uppercase text-xs px-3 py-1"
                    >
                        The DriveFleet Difference
                    </Chip>

                    <h2 className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 md:text-5xl">
                        More Than a Ride.{" "}
                        <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            It's Your Journey.
                        </span>
                    </h2>

                    <p className="max-w-lg text-base leading-relaxed text-slate-600">
                        Your journey deserves more than just a car. We bring together modern convenience, dependable service, and a seamless rental experience to make every trip worthwhile.
                    </p>

                    {/* Highlight Box / Banner Card */}
                    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-xl md:p-10 border border-slate-800">
                        <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

                        <p className="text-xs font-bold tracking-widest text-primary uppercase">
                            Your Next Journey Starts Here
                        </p>

                        <h3 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                            Find the right car.
                            <span className="block text-slate-400 font-normal mt-1">Make every mile count.</span>
                        </h3>

                        <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary group cursor-pointer">
                            <span>Drive with confidence</span>
                            <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>

                {/* Right Benefits Cards */}
                <div className="space-y-5">
                    {benefits.map((benefit) => {
                        const Icon = benefit.icon;

                        return (
                            <Card
                                key={benefit.number}
                                shadow="sm"
                                radius="lg"
                                className="group border border-slate-200/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                            >
                                <Card.Content className="flex flex-row items-start gap-5 p-6 md:p-7">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-xl text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-md group-hover:shadow-primary/30">
                                        <Icon />
                                    </div>

                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center gap-3">
                                            <span className="text-xs font-extrabold tracking-widest text-primary">
                                                {benefit.number}
                                            </span>
                                            <div className="h-px flex-1 bg-slate-100" />
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 md:text-xl">
                                            {benefit.title}
                                        </h3>

                                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </Card.Content>
                            </Card>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}