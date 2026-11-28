
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    FaUser,
    FaEnvelope,
    FaCamera,
    FaEdit,
    FaSave,
    FaTimes,
    FaShieldAlt,
} from "react-icons/fa";
import { toast } from "sonner";

const API_URL = "http://localhost:5000";

const ProfilePage = () => {
    const router = useRouter();

    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        photoURL: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // Fetch Profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`${API_URL}/profile`, {
                    credentials: "include",
                });

                if (response.status === 401) {
                    toast.error("Please login to view your profile");
                    router.push("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error("Failed to fetch profile");
                }

                const data = await response.json();

                setProfile(data);
                setFormData({
                    name: data.name || "",
                    photoURL: data.photoURL || "",
                });
            } catch (error) {
                console.error(error);
                toast.error("Could not load your profile");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    // Handle Input Change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Enable Editing
    const handleEdit = () => {
        setFormData({
            name: profile.name || "",
            photoURL: profile.photoURL || "",
        });

        setIsEditing(true);
    };

    // Cancel Editing
    const handleCancel = () => {
        setFormData({
            name: profile.name || "",
            photoURL: profile.photoURL || "",
        });

        setIsEditing(false);
    };

    // Update Profile
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            return toast.error("Name is required");
        }

        setSaving(true);

        try {
            const response = await fetch(`${API_URL}/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    name: formData.name,
                    photoURL: formData.photoURL,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Profile update failed");
            }

            setProfile(data.profile);

            setFormData({
                name: data.profile.name,
                photoURL: data.profile.photoURL,
            });

            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error(error.message || "Something went wrong");
        } finally {
            setSaving(false);
        }
    };

    // Loading State
    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-slate-500 font-medium">
                        Loading your profile...
                    </p>
                </div>
            </main>
        );
    }

    // Error State
    if (!profile) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
                <div className="text-center">
                    <FaUser className="text-5xl text-slate-300 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">
                        Profile Not Available
                    </h2>
                    <p className="text-slate-500 mt-2">
                        We could not load your profile information.
                    </p>
                    <button
                        onClick={() => router.push("/")}
                        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
                    >
                        Back to Home
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                        My Account
                    </p>

                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
                        My Profile
                    </h1>

                    <p className="text-slate-500 mt-2">
                        Manage your personal information and account details.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">

                    {/* Cover */}
                    <div className="h-40 md:h-52 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 relative">
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle, white 1px, transparent 1px)",
                                backgroundSize: "22px 22px",
                            }}
                        />
                    </div>

                    <div className="px-6 md:px-10 pb-10">

                        {/* Avatar and User Info */}
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 -mt-16 relative">

                            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
                                <div className="w-32 h-32 rounded-2xl bg-white p-1.5 shadow-lg">
                                    {profile.photoURL ? (
                                        <img
                                            src={profile.photoURL}
                                            alt="Profile"
                                            className="w-full h-full object-cover rounded-xl"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-xl bg-blue-100 flex items-center justify-center">
                                            <FaUser className="text-5xl text-blue-600" />
                                        </div>
                                    )}
                                </div>

                                <div className="pb-1">
                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {profile.name}
                                    </h2>

                                    <p className="text-slate-500 text-sm mt-1">
                                        DriveFleet Member
                                    </p>
                                </div>
                            </div>

                            {!isEditing && (
                                <button
                                    onClick={handleEdit}
                                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                                >
                                    <FaEdit />
                                    Edit Profile
                                </button>
                            )}
                        </div>

                        <div className="border-t border-slate-200 my-8" />

                        {/* Profile Information */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6">
                                Personal Information
                            </h3>

                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Full Name
                                        </label>

                                        <div className="relative">
                                            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="Enter your name"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-80"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="email"
                                                value={profile.email}
                                                disabled
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed outline-none"
                                            />
                                        </div>

                                        <p className="text-xs text-slate-400 mt-2">
                                            Email address cannot be changed.
                                        </p>
                                    </div>

                                    {/* Photo URL */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Profile Photo URL
                                        </label>

                                        <div className="relative">
                                            <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                                            <input
                                                type="url"
                                                name="photoURL"
                                                value={formData.photoURL}
                                                onChange={handleChange}
                                                disabled={!isEditing}
                                                placeholder="https://example.com/photo.jpg"
                                                className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-80"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isEditing && (
                                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                                        <button
                                            type="submit"
                                            disabled={saving}
                                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-7 py-3 rounded-xl font-semibold transition"
                                        >
                                            <FaSave />
                                            {saving ? "Saving..." : "Save Changes"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            disabled={saving}
                                            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-7 py-3 rounded-xl font-semibold transition"
                                        >
                                            <FaTimes />
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </form>
                        </div>

                        {/* Account Security */}
                        <div className="mt-10 p-5 rounded-2xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                            <div className="w-11 h-11 shrink-0 rounded-xl bg-blue-100 flex items-center justify-center">
                                <FaShieldAlt className="text-blue-600 text-lg" />
                            </div>

                            <div>
                                <h4 className="font-bold text-slate-800">
                                    Your Account is Protected
                                </h4>

                                <p className="text-sm text-slate-600 mt-1">
                                    Your account information is protected using secure authentication.
                                    Your password is never displayed on this page.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProfilePage;
