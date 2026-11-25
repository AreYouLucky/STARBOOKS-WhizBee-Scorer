import { FaUserAlt } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import Options from '@/Components/Options';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { AnimatePresence, motion } from 'framer-motion';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, ArrowRightIcon, ArrowsPointingInIcon, ArrowsPointingOutIcon, SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import { socket } from '@/socket';

const ITEMS_PER_COLUMN = 5;
const ITEMS_PER_PAGE = ITEMS_PER_COLUMN * 2;
const MAX_PAGES = 5;

const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [isFinal, setIsFinal] = useState(0);
    const [page, setPage] = useState(0);
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

    const totalPages = Math.min(MAX_PAGES, Math.max(1, Math.ceil(leaderboards.length / ITEMS_PER_PAGE)));
    const pageStart = page * ITEMS_PER_PAGE;
    const pageItems = leaderboards.slice(pageStart, pageStart + ITEMS_PER_PAGE);
    const columns = [pageItems.slice(0, ITEMS_PER_COLUMN), pageItems.slice(ITEMS_PER_COLUMN)];

    useEffect(() => {
        isFinalRef.current = isFinal;
        setPage(0);
        loadLeaderBoards();
    }, [isFinal]);

    useEffect(() => {
        if (page > totalPages - 1) setPage(0);
    }, [totalPages, page]);

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

    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const onChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
        document.addEventListener('fullscreenchange', onChange);
        return () => document.removeEventListener('fullscreenchange', onChange);
    }, []);

    const toggleFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen?.();
        }
    };

    const handleNext = () => {
        setPage((current) => (current + 1) % totalPages);
    };

    const renderRow = (user, index) => {
        const theme = rankThemes[index];

        return (
            <motion.div
                key={`${user.id}-${user.total_score}`}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.3, delay: Math.min((index % ITEMS_PER_COLUMN) * 0.035, 0.2) }}
                layout
                className={`group relative grid min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 shadow-sm lg:h-full lg:px-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-4 sm:px-4 ${theme?.card ?? 'border-sky-100 bg-white shadow-sky-100/70'}`}
            >
                <div className={`absolute inset-y-0 left-0 w-1.5 ${theme?.accent ?? 'bg-sky-400'}`} />

                <div className="relative">
                    <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg font-black ring-4 sm:h-12 sm:w-12 sm:text-xl lg:h-14 lg:w-14 lg:text-2xl ${theme?.badge ?? 'bg-sky-100 text-sky-700 ring-sky-50'}`}>
                        {index + 1}
                    </span>
                    {index < 3 && (
                        <span className="absolute -right-1.5 -top-1.5 rounded-full bg-white p-1 text-amber-500 shadow-sm">
                            <TrophyIcon className="h-3.5 w-3.5" />
                        </span>
                    )}
                </div>

                <div className="flex min-w-0 items-center gap-3">
                    <div className={`hidden rounded-xl p-2.5 xl:block ${theme?.icon ?? 'bg-sky-50 text-sky-600'}`}>
                        <FaUserAlt className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-black text-slate-900 sm:text-base lg:text-xl" title={user.name}>{user.name.toUpperCase()}</h2>
                        <p className="mt-0.5 truncate text-[10px] font-semibold uppercase tracking-wide text-slate-400 sm:text-xs" title={user.school}>
                            <span className="xl:hidden">#{user.id} · </span>{user.school.toUpperCase()}
                        </p>
                    </div>
                </div>

                <div className="flex items-stretch gap-2">
                    <div className="hidden min-w-20 rounded-xl bg-white/80 px-2 py-1.5 text-center ring-1 ring-slate-200/70 xl:block">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-slate-400">Contestant</span>
                        <span className="mt-0.5 block text-lg font-black text-blue-700">#{user.id}</span>
                    </div>
                    <div className="min-w-16 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 px-2 py-1.5 text-center text-white shadow-md shadow-sky-200 sm:min-w-20">
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-sky-100">Score</span>
                        <span className="mt-0.5 block text-lg font-black sm:text-xl lg:text-3xl">{user.total_score}</span>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="quiz-page flex flex-col px-4 py-4 sm:px-6 lg:h-screen lg:px-8">
            <Head title="Leaderboard" />
            <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col">
                <header className="mb-5 flex items-center justify-between gap-4">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-sky-50">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <ApplicationLogo className="w-44 sm:w-60" />
                    <div className="flex items-center gap-2">
                        <Options id="stage" items={stages} itemValue="value" itemName="label" name="stage" value={isFinal} onChange={handleStageChange} className="hidden sm:block" />
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            title={isFullscreen ? 'Exit full screen' : 'Full screen'}
                            className="inline-flex items-center rounded-xl border border-white bg-white p-2 text-slate-700 shadow-sm transition hover:bg-sky-50"
                        >
                            {isFullscreen ? <ArrowsPointingInIcon className="h-5 w-5" /> : <ArrowsPointingOutIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </header>

                <section className="quiz-panel flex min-h-0 flex-1 flex-col overflow-hidden">
                    <div className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-r from-white via-sky-50 to-white p-5 sm:px-10 sm:py-6">
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

                    <div className="flex min-h-0 flex-1 flex-col p-4 pt-5 sm:px-10 sm:pb-8">
                        {leaderboards.length > 0 && (
                            <>
                                <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-2 lg:gap-6">
                                    {columns.map((column, columnIndex) => (
                                        <div key={columnIndex} className="flex min-h-0 flex-col gap-3 lg:grid lg:grid-rows-5">
                                            <AnimatePresence mode="popLayout">
                                                {column.map((user, i) =>
                                                    renderRow(user, pageStart + columnIndex * ITEMS_PER_COLUMN + i)
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                                {totalPages > 1 && (
                                    <div className="mt-5 flex shrink-0 items-center justify-between gap-4">
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }, (_, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => setPage(i)}
                                                    className={`h-10 w-10 rounded-xl text-sm font-black transition ${
                                                        page === i
                                                            ? 'bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-200'
                                                            : 'bg-white text-slate-600 ring-1 ring-sky-100 hover:bg-sky-50'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-sky-200 transition hover:brightness-110"
                                        >
                                            Next
                                            <ArrowRightIcon className="h-5 w-5" />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}

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
