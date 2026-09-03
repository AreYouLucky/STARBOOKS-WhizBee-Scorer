import ApplicationLogo from "@/Components/ApplicationLogo";
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link } from '@inertiajs/react';

export default function Authenticated({ children }) {
    return (
        <div className="quiz-page px-4 py-6 sm:px-6 sm:py-10">
            <main className="quiz-panel relative z-10 mx-auto max-w-6xl overflow-hidden">
                <nav className="flex items-center justify-between border-b border-slate-100 px-5 py-10 sm:px-10">
                    <ApplicationLogo className="w-44 sm:w-56" />
                    <Link
                        href="/logout"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Log out</span>
                    </Link>
                </nav>
                <div className="px-5 py-8 sm:px-10 sm:pt-10 pb-20">{children}</div>
            </main>
        </div>
    );
}
