import Options from "@/Components/Options";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Head, Link } from "@inertiajs/react";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon, UsersIcon } from "@heroicons/react/24/outline";
import { socket } from "@/socket";

const score = () => {
    const [students, setStudents] = useState([]);
    const [qNumber, setqNumber] = useState(1);
    const [level, setLevel] = useState(1);
    const [isFinal, setIsFinal] = useState(0);
    const [checkedStudents, setCheckedStudents] = useState([]);
    const debounceRef = useRef(null);
    const stages = [
        {
            value: 0,
            label: "Semi Finals",
        },
        {
            value: 1,
            label: "Finals",
        },
    ];

    const difficulties = [
        {
            score: 1,
            label: "Easy",
        },
        {
            score: 3,
            label: "Average",
        },
        {
            score: 5,
            label: "Difficult",
        },
    ];
    const [mySocketId, setMySocketId] = useState(null);

    useEffect(() => {
        loadEvents();
        socket.on("connect", () => {
            setMySocketId(socket.id);
        });
        return () => socket.off("connect");
    }, []);

    useEffect(() => {
        socket.on("chat message", (data) => {
            if (Number(data.number) === Number(qNumber) && data.senderId !== mySocketId && Number(data.stage) === Number(isFinal)) {
                setCheckedStudents(prev =>
                    data.status === 'Inserted'
                        ? [...prev, data.name]
                        : prev.filter(n => n !== data.name)
                );
            }
        });
        return () => socket.off("chat message");
    }, [qNumber, mySocketId, isFinal]);



    useEffect(() => {
        loadStudents();
    }, [isFinal]);

    useEffect(() => {
        if (qNumber !== 0)
            loadCheckedStudents();
    }, [qNumber, isFinal]);

    const loadStudents = () => {
        axios.get("/students/" + isFinal).then((response) => {
            setStudents(response.data);
        }).catch((error) => {
            alert("❌ Error: Failed to load students.");
        })
    }

    const loadEvents = () => {
        axios.get("/events")
            .then((response) => {
                setIsFinal(response.data.is_final);
                setqNumber(response.data.number);
                setLevel(response.data.level);
            })
            .catch((error) => {
                alert("❌ Error: Failed to load events.");
            });
    }

    const loadCheckedStudents = () => {
        axios.get('/load-checked-students/' + qNumber + '/' + isFinal).then(
            res => {
                const names = res.data.map(student => student.name);
                setCheckedStudents(names);
                if (res.data.length > 0) {
                    setLevel(res.data[0].score);
                }
            }
        )
    }

    const handleDifficultyChange = (e) => {
        const current_level = parseInt(e.target.value, 10)

        setLevel(current_level)
        if (isFinal === 0) {
            if (current_level === 1) {
                setqNumber(1)
            }
            else if (current_level === 3) {
                setqNumber(11)
            }
            else if (current_level === 5) {
                setqNumber(21)
            }
        }
        else {
            if (current_level === 1) {
                setqNumber(1)
            }
            else if (current_level === 3) {
                setqNumber(6)
            }
            else if (current_level === 5) {
                setqNumber(11)
            }
        }
    }


    const handleStageChange = (e) => {
        const value = parseInt(e.target.value);
        const formData = new FormData();
        formData.append('stage', value);

        setIsFinal(value);

        axios.post('/update-stage', formData).then(
            res => {
                resetItems()
                setqNumber(1)
                console.log(e.target.value, 'heruhejr')
            }
        ).catch((error) => {
            alert("❌ Error: Failed to update stage.");
        });
    }

    const resetItems = () => {
        axios.post('/reset-items').then(
            res => {
                setqNumber(1)
            }
        )
    }

    const toggleStudentCheck = (name) => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('number', qNumber)
        formData.append('level', level)
        formData.append('stage', isFinal)
        axios.post('/toggle-student-check', formData).then(
            res => {
                setCheckedStudents(prev =>
                    res.data.status === 'Inserted'
                        ? [...prev, name]
                        : prev.filter(n => n !== name)
                );
                socket.emit("chat message", {
                    name,
                    number: qNumber,
                    stage: isFinal,
                    senderId: socket.id,
                    status: res.data.status
                });
            }
        )
    }

    const navigateQuestion = (actions) => {
        const number = actions === 1 ? Number(qNumber) + 1 : Number(qNumber) - 1;
        setqNumber(number)
        if (isFinal == 0) {
            if (number <= 10) {
                setLevel(1)
            }
            else if (number > 10 && number <= 20) {
                setLevel(3)
            }
            else if (number > 20) {
                setLevel(5)
            }
        }
        else {
            if (number <= 5) {
                setLevel(1)
            }
            else if (number > 5 && number <= 10) {
                setLevel(3)
            }
            else if (number > 10) {
                setLevel(5)
            }
        }
    }

    const jumpTo = (e) => {
        const value = parseInt(e.target.value);
        clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            setqNumber(value)
            if (isFinal == 0) {
                if (value <= 10) {
                    setLevel(1)
                }
                else if (value > 10 && value <= 20) {
                    setLevel(3)
                }
                else if (value > 20) {
                    setLevel(5)
                }
            }
            else {
                if (value <= 5) {
                    setLevel(1)
                }
                else if (value > 5 && value <= 10) {
                    setLevel(3)
                }
                else if (value > 10) {
                    setLevel(5)
                }
            }
        }, 2000);
    };

    return (
        <div className="quiz-page px-4 py-5 sm:px-6 lg:px-8">
            <Head title="Score contestants" />
            <div className="relative z-10 mx-auto max-w-[1600px]">
                <header className="mb-5 flex items-center justify-between gap-4">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-sky-50">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <ApplicationLogo className="w-44 sm:w-60" />
                    <div className="flex min-w-10 items-center justify-end gap-2 text-slate-700">
                        <UsersIcon className="h-5 w-5 text-sky-600" />
                        <span className="hidden text-sm font-bold sm:inline">{checkedStudents.length} scored</span>
                    </div>
                </header>

                <section className="quiz-panel overflow-hidden">
                    <div className="grid gap-5 border-b border-slate-100 px-5 py-5 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:px-10 lg:py-5">
                        <div>
                            <p className="text-lg text-sky-500 font-extrabold tracking-widest uppercase sm:text-2xl">{isFinal === 1 ? 'Final round' : 'Semi-final round'}</p>
                        </div>
                        <div className="rounded-2xl bg-sky-500 px-8 py-3 text-center text-white ">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-100">Question</p>
                            <p className="text-4xl font-black leading-none">{qNumber}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 lg:justify-end">
                            <Options id="difficulty" items={difficulties} itemValue="score" itemName="label" name="difficulty" value={level} onChange={handleDifficultyChange} />
                            <Options id="stage" items={stages} itemValue="value" itemName="label" name="stage" value={isFinal} onChange={handleStageChange} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5 p-5 sm:grid-cols-3 sm:px-10 pb-10 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-5">
                        {students.map((student) => {
                            const isChecked = checkedStudents.includes(student.name);
                            return (
                                <button key={student.id} type="button" onClick={() => toggleStudentCheck(student.name)} className={`group relative flex min-h-28 flex-col items-center justify-center overflow-hidden rounded-2xl border p-3 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${isChecked ? 'border-blue-500 bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-md shadow-blue-500/20' : 'border-sky-400 bg-white text-slate-800 hover:border-cyan-300'}`}>
                                    {isChecked && <span className="absolute right-2 top-2 rounded-full bg-amber-300 p-1 text-slate-900"><CheckIcon className="h-3.5 w-3.5 stroke-[3]" /></span>}
                                    <span className={`text-3xl font-black ${isChecked ? 'text-white' : 'text-sky-500'}`}>{student.id}</span>
                                    <span className={`mt-1 line-clamp-2 text-[11px] font-extrabold uppercase leading-4 ${isChecked ? 'text-blue-50' : 'text-slate-600'}`}>{student.name}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-col gap-3 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-10 lg:py-5">
                        <p className="text-sm font-medium text-slate-500">Tap a contestant to mark a correct answer.</p>
                        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2">
                            <button type="button" className={`inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-sm font-bold transition ${qNumber > 1 ? 'bg-white text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-100' : 'cursor-not-allowed bg-slate-200 text-slate-400'}`} disabled={qNumber <= 1} onClick={() => navigateQuestion(0)}>
                                <ChevronLeftIcon className="h-4 w-4" /> Prev
                            </button>
                            <input type="number" min="1" placeholder="Jump to" onChange={jumpTo} className="min-w-0 rounded-xl border-slate-200 bg-white px-3 py-2 text-center text-sm font-bold focus:border-cyan-400 focus:ring-cyan-400" />
                            <button type="button" className="inline-flex items-center gap-1 rounded-xl bg-slate-900 px-3 py-2.5 text-sm font-bold text-white transition hover:bg-blue-600" onClick={() => navigateQuestion(1)}>
                                Next <ChevronRightIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default score;
