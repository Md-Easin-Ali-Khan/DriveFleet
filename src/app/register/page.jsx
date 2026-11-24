
"use client";

import Link from "next/link";
import { FaCarSide } from "react-icons/fa";

const RegisterPage = () => {
    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200">

                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-2xl font-bold text-blue-600"
                    >
                        <FaCarSide className="text-3xl" />
                        DriveFleet
                    </Link>
                </div>

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Create an Account
                    </h1>

                    <p className="mt-2 text-slate-500">
                        Join DriveFleet and start your journey
                    </p>
                </div>

                {/* Register Form */}
                <form className="space-y-4">

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Photo URL
                        </label>

                        <input
                            type="url"
                            name="photoURL"
                            placeholder="Enter your profile photo URL"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />

                        <p className="mt-1 text-xs text-slate-500">
                            At least 6 characters, including uppercase and lowercase letters.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="text-sm text-slate-400">OR</span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Google Register */}
                <button
                    type="button"
                    className="w-full rounded-lg border border-slate-300 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
                >
                    Continue with Google
                </button>

                {/* Login Link */}
                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </main>
    );
};

export default RegisterPage;
