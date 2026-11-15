import Link from "next/link";
import {
    FaCarSide,
    FaEnvelope,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const usefulLinks = [
        { name: "Home", href: "/" },
        { name: "Explore Cars", href: "/cars" },
        { name: "Add Car", href: "/add-car" },
        { name: "My Bookings", href: "/my-bookings" },
    ];

    const socialLinks = [
        { icon: FaFacebookF, href: "#", label: "Facebook" },
        { icon: FaInstagram, href: "#", label: "Instagram" },
        { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
        { icon: FaXTwitter, href: "#", label: "X" },
    ];

    return (
        <footer className="bg-[#101828] text-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link href="/" className="mb-5 inline-flex items-center gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600">
                                <FaCarSide className="text-xl text-white" />
                            </span>
                            <span className="text-2xl font-bold tracking-tight">
                                Drive<span className="text-blue-400">Fleet</span>
                            </span>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-slate-400">
                            Your journey, your choice. Discover reliable cars
                            and enjoy a smoother rental experience with DriveFleet.
                        </p>

                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                                >
                                    <Icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Quick Links
                        </h3>

                        <ul className="space-y-4">
                            {usefulLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-blue-400"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Contact Us
                        </h3>

                        <ul className="space-y-5 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="mt-1 shrink-0 text-blue-400" />
                                <span>Your Business Address</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="shrink-0 text-blue-400" />
                                <span>+880 1XXX-XXXXXX</span>
                            </li>

                            <li className="flex items-center gap-3">
                                <FaEnvelope className="shrink-0 text-blue-400" />
                                <span>support@drivefleet.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Why DriveFleet?
                        </h3>

                        <p className="text-sm leading-7 text-slate-400">
                            From everyday travel to special journeys, find a
                            vehicle that fits your needs. Simple booking,
                            flexible choices, and a better way to travel.
                        </p>
                    </div>
                </div>

                <div className="mt-14 border-t border-slate-700 pt-8">
                    <p className="text-center text-sm text-slate-500">
                        © {new Date().getFullYear()} DriveFleet. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;