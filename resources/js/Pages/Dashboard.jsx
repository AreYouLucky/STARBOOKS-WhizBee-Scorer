import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import {
    AcademicCapIcon,
    TrophyIcon,
    StarIcon,
    ArrowUpRightIcon,
} from '@heroicons/react/24/outline';

export default function Dashboard({ auth }) {
    const cards = [
        {
            title: 'Scores',
            description: 'Set individual participant scores.',
            href: '/score',
            icon: AcademicCapIcon,
            color: 'from-cyan-500 to-blue-600',
            accent: 'bg-cyan-50 text-cyan-700',
        },
        {
            title: 'Leaderboards',
            description: 'See the top-ranking participants.',
            href: '/leaderboards',
            icon: TrophyIcon,
            color: 'from-emerald-500 to-teal-600',
            accent: 'bg-emerald-50 text-emerald-700',
        },
        {
            title: 'Finalist',
            description: 'Set who made it to the finals.',
            href: '/finalist',
            icon: StarIcon,
            color: 'from-amber-400 to-orange-500',
            accent: 'bg-amber-50 text-amber-700',
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div>
                <div className="mb-8 max-w-2xl">
                    <p className="quiz-kicker">Competition dashboard</p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Ready for the next round?
                    </h1>
                    <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                        Score contestants, choose your finalists, and keep an eye on the rankings from one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                    {cards.map(({ title, description, href, icon: Icon, color, accent }, index) => (
                        <Link
                            key={title}
                            href={href}
                            className="group relative min-h-64 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${color}`} />
                            <div className="flex items-start justify-between">
                                <div className={`rounded-2xl p-3 ${accent}`}>
                                    <Icon className="h-7 w-7" />
                                </div>
                                <span className="text-5xl font-black text-sky-400">0{index + 1}</span>
                            </div>
                            <div className="mt-10">
                                <h2 className="text-xl font-extrabold text-slate-900">{title}</h2>
                                <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
                            </div>
                            <div className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-700 transition group-hover:text-cyan-600">
                                Open workspace
                                <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
