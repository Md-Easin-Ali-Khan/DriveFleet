
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Cars", href: "/cars" },
    { name: "Add Car", href: "/add-car" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-gray-900">
                        Drive<span className="text-blue-600">Fleet</span>
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

                {/* Desktop Auth Buttons */}
                <div className="hidden items-center gap-3 md:flex">
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
                </div>

                {/* Mobile Navigation */}
                <details className="relative md:hidden">
                    <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-gray-200 text-2xl text-gray-700">
                        <GiHamburgerMenu className="text-xl" />
                    </summary>

                    <div className="absolute right-0 top-14 w-56 rounded-xl border border-gray-200 bg-white p-4 shadow-xl">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-semibold text-gray-700 hover:text-blue-600"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-gray-100" />

                            <Link href="/login" className="text-sm font-semibold text-gray-700">
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </details>

            </nav>
        </header>
    );
}
