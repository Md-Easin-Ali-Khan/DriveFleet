
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { FaCarSide, FaUserCircle } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
];

const profileLinks = [
    { name: "My Profile", href: "/my-profile" },
    { name: "Add Car", href: "/add-car" },
    { name: "My Bookings", href: "/my-bookings" },
    { name: "My Added Cars", href: "/my-added-cars" },
];

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check logged-in user
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/protected",
                    {
                        credentials: "include",
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkLogin();
    }, [pathname]);

    // Logout user
    const handleLogout = async () => {
        try {
            const response = await fetch(
                "http://localhost:5000/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Logout failed");
            }

            setUser(null);

            toast.success("Logged out successfully");

            router.push("/");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                {/* Logo */}
                <Link href="/" className="inline-flex items-center gap-2">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                        <FaCarSide className="text-xl text-white" />
                    </span>

                    <span className="text-2xl font-bold tracking-tight">
                        Drive<span className="text-blue-400">Fleet</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-semibold text-gray-600 transition hover:text-blue-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Auth / Profile */}
                <div className="hidden items-center gap-4 md:flex">
                    {!isLoading && (
                        user ? (
                            <details className="relative">
                                <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-gray-200 px-3 py-2 transition hover:bg-gray-50">
                                    <FaUserCircle className="text-2xl text-blue-600" />

                                    <span className="max-w-36 truncate text-sm font-semibold text-gray-700">
                                        {user.email}
                                    </span>
                                </summary>

                                <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                                    <div className="border-b border-gray-100 px-3 pb-3">
                                        <p className="text-xs text-gray-500">
                                            Signed in as
                                        </p>
                                        <p className="truncate text-sm font-semibold text-gray-800">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-1 pt-2">
                                        {profileLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}

                                        <hr className="my-1 border-gray-100" />

                                        <button
                                            onClick={handleLogout}
                                            className="rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-500 transition hover:bg-red-50"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </details>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/register"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>
                            </>
                        )
                    )}
                </div>

                {/* Mobile Navigation */}
                <details className="relative md:hidden">
                    <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700">
                        <GiHamburgerMenu className="text-xl" />
                    </summary>

                    <div className="absolute right-0 top-14 w-64 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                        <div className="flex flex-col gap-3">

                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-gray-100" />

                            {!isLoading && (
                                user ? (
                                    <>
                                        <div className="flex items-center gap-2 px-2 py-2">
                                            <FaUserCircle className="text-2xl text-blue-600" />
                                            <span className="truncate text-sm font-semibold text-gray-700">
                                                {user.email}
                                            </span>
                                        </div>

                                        {profileLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="rounded-lg px-2 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}

                                        <button
                                            onClick={handleLogout}
                                            className="rounded-lg bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="rounded-lg px-2 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/register"
                                            className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-700"
                                        >
                                            Get Started
                                        </Link>
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </details>

            </nav>
        </header>
    );
}
