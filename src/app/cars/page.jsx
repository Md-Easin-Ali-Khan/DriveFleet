
import { FaSearch, FaSlidersH } from "react-icons/fa";

const CarsPage = () => {
    return (
        <main className="min-h-screen bg-slate-50">
            <section className="bg-[#101828] px-6 py-20 text-center text-white">
                <div className="mx-auto max-w-3xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
                        Explore Our Collection
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Find the Perfect Car for Your Journey
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300">
                        Discover a wide range of vehicles that match your
                        travel needs, comfort, and budget.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Explore All Cars
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Find a vehicle that fits your next adventure.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <FaSlidersH className="text-blue-600" />
                        Search & Filter
                    </div>
                </div>

                <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row">
                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
                        <FaSearch className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by car name..."
                            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                        />
                    </div>

                    <select className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 outline-none focus:border-blue-500">
                        <option value="">All Car Types</option>
                        <option value="sedan">Sedan</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="luxury">Luxury</option>
                    </select>
                </div>

                <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                    <h3 className="text-lg font-semibold text-slate-800">
                        Cars will appear here
                    </h3>
                    <p className="mt-2 text-sm text-slate-500">
                        The car collection section is coming next.
                    </p>
                </div>
            </section>
        </main>
    );
};

export default CarsPage;
