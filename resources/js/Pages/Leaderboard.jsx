import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Options from '@/Components/Options';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AnimatePresence, motion } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { socket } from '@/socket';

const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [isFinal, setIsFinal] = useState(0);
    const isFinalRef = useRef(isFinal);
    const stages = [
        { value: 0, label: 'Semi Finals' },
        { value: 1, label: 'Finals' },
    ];
    const rankThemes = [
        {
            card: 'border-amber-300 bg-gradient-to-br from-amber-50 via-white to-yellow-50 shadow-amber-200/60',
            badge: 'bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-950 ring-amber-100',
            icon: 'bg-amber-100 text-amber-600',
            accent: 'bg-amber-400',
        },
        {
            card: 'border-slate-300 bg-gradient-to-br from-slate-50 via-white to-sky-50 shadow-slate-200/60',
            badge: 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-800 ring-slate-100',
            icon: 'bg-slate-100 text-slate-500',
            accent: 'bg-slate-400',
        },
        {
            card: 'border-orange-300 bg-gradient-to-br from-orange-50 via-white to-amber-50 shadow-orange-200/60',
            badge: 'bg-gradient-to-br from-orange-200 to-orange-400 text-orange-950 ring-orange-100',
            icon: 'bg-orange-100 text-orange-600',
            accent: 'bg-orange-400',
        },
    ];

    useEffect(() => {
        isFinalRef.current = isFinal;
        loadLeaderBoards();
    }, [isFinal]);

    useEffect(() => {
        const handleSocketUpdate = () => {
            axios.get(`/load-leaderboard/${isFinalRef.current}`).then((res) => {
                setLeaderboards(res.data);
            });
        };

        socket.on('chat message', handleSocketUpdate);
        return () => socket.off('chat message', handleSocketUpdate);
    }, []);

    const loadLeaderBoards = () => {
        axios.get(`/load-leaderboard/${isFinal}`).then((res) => {
            setLeaderboards(res.data);
        });
    };

    const handleStageChange = (e) => {
        setIsFinal(parseInt(e.target.value));
    };

    return (
        <div className="quiz-page px-4 py-5 sm:px-6 lg:px-8">
            <Head title="Leaderboard" />
            <div className="relative z-10 mx-auto max-w-7xl">
                <header className="mb-5 flex items-center justify-between gap-4">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-sky-50">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <ApplicationLogo className="w-44 sm:w-60" />
                    <div className="w-10 sm:w-auto">
                        <Options id="stage" items={stages} itemValue="value" itemName="label" name="stage" value={isFinal} onChange={handleStageChange} className="hidden sm:block" />
                    </div>
                </header>

                <section className="quiz-panel overflow-hidden">
                    <div className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-white p-5 sm:p-10">
                        <div className="absolute -right-8 -top-10 h-32 w-32 rounded-full bg-amber-200/40" />
                        <div className="absolute right-20 top-5 h-10 w-10 rounded-full bg-cyan-200/50" />
                        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h1 className="mt-2 flex items-center gap-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                Leaderboard
                                <span className="rounded-2xl bg-amber-100 p-2 text-amber-600"><TrophyIcon className="h-7 w-7" /></span>
                            </h1>
                            <p className="quiz-kicker mt-2">Live standings</p>
                        </div>
                            <div className="flex items-center gap-3">
                                <span className="hidden items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-600 shadow-sm ring-1 ring-sky-100 md:flex">
                                    <SparklesIcon className="h-5 w-5 text-amber-500" />
                                    {leaderboards.length} contestants
                                </span>
                                <Options id="stage-mobile" items={stages} itemValue="value" itemName="label" name="stage" value={isFinal} onChange={handleStageChange} className="sm:hidden" />
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:px-10 sm:pb-10 pt-5">
                        <div className="space-y-3">
                            <AnimatePresence>
                                {leaderboards.map((user, index) => {
                                    const theme = rankThemes[index];

                                    return (
                                        <motion.div
                                            key={`${user.name}-${user.total_score}`}
                                            initial={{ opacity: 0, x: -18 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 18 }}
                                            transition={{ duration: 0.3, delay: Math.min(index * 0.035, 0.2) }}
                                            layout
                                            className={`group relative grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-2xl border px-3 py-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-5 sm:px-5 ${theme?.card ?? 'border-sky-100 bg-white shadow-sky-100/70'}`}
                                        >
                                            <div className={`absolute inset-y-0 left-0 w-1.5 ${theme?.accent ?? 'bg-sky-400'}`} />

                                            <div className="relative">
                                                <span className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl font-black ring-4 sm:h-14 sm:w-14 sm:text-2xl ${theme?.badge ?? 'bg-sky-100 text-sky-700 ring-sky-50'}`}>
                                                    {index + 1}
                                                </span>
                                                {index < 3 && (
                                                    <span className="absolute -right-1.5 -top-1.5 rounded-full bg-white p-1 text-amber-500 shadow-sm">
                                                        <TrophyIcon className="h-3.5 w-3.5" />
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                                <div className={`hidden rounded-2xl p-3 sm:block ${theme?.icon ?? 'bg-sky-50 text-sky-600'}`}>
                                                    <FaUserAlt className="h-5 w-5" />
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h2 className="truncate text-sm font-black text-slate-900 sm:text-lg" title={user.name}>{user.name.toUpperCase()}</h2>

                                                    </div>
                                                    <p className="mt-1 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs" title={user.school}>
                                                        <span className="sm:hidden">#{user.id} · </span>{user.school.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="flex items-stretch gap-2">
                                                <div className="hidden min-w-24 rounded-xl bg-white/80 px-3 py-2 text-center ring-1 ring-slate-200/70 sm:block">
                                                    <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Contestant</span>
                                                    <span className="mt-0.5 block text-xl font-black text-blue-700">#{user.id}</span>
                                                </div>
                                                <div className="min-w-16 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 px-2 py-2 text-center text-white shadow-md shadow-sky-200 sm:min-w-24 sm:px-3">
                                                    <span className="block text-[9px] font-bold uppercase tracking-wider text-sky-100">Score</span>
                                                    <span className="mt-0.5 block text-xl font-black sm:text-2xl">{user.total_score}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>

                        {leaderboards.length === 0 && (
                            <div className="py-16 text-center">
                                <TrophyIcon className="mx-auto h-10 w-10 text-slate-300" />
                                <p className="mt-3 font-bold text-slate-500">No rankings yet</p>
                                <p className="mt-1 text-sm text-slate-400">Scores will appear here during the round.</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Leaderboard;
