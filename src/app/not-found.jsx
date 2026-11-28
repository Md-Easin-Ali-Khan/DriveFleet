
import Link from "next/link";
import { FaCarSide, FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-slate-950 px-4 py-16">
            <div className="mx-auto max-w-2xl text-center">

                {/* Car Icon */}
                <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/10">
                    <FaCarSide className="text-5xl text-blue-500" />
                </div>

                {/* Error Code */}
                <h1 className="text-8xl font-extrabold tracking-tight text-blue-500 sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
                    Oops! Page Not Found
                </h2>

                <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-400">
                    Looks like this road leads nowhere.
                    The page you are looking for might have been
                    removed, renamed, or is temporarily unavailable.
                </p>

                {/* Actions */}
                <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 font-semibold text-white transition hover:bg-blue-700"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </Link>

                    <Link
                        href="/cars"
                        className="inline-flex items-center justify-center rounded-xl border border-slate-600 px-7 py-3.5 font-semibold text-white transition hover:border-blue-500 hover:bg-blue-500/10"
                    >
                        Explore Cars
                    </Link>
                </div>

                <p className="mt-12 text-sm text-slate-500">
                    Need a ride? Let DriveFleet help you find one.
                </p>
            </div>
        </main>
    );
};

export default NotFound;
