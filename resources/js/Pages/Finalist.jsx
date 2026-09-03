import ApplicationLogo from '@/Components/ApplicationLogo';
import { useEffect, useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon, CheckIcon, SparklesIcon, UsersIcon } from '@heroicons/react/24/outline';

function Finalist() {
    const [students, setStudents] = useState([]);
    const [checkedStudents, setCheckedStudents] = useState([]);

    useEffect(() => {
        loadFinalist();
        getFinalist();
    }, []);

    const loadFinalist = () => {
        axios.get('/fetch-students').then((response) => {
            setStudents(response.data);
        }).catch(() => {
            alert('Error: Failed to load students.');
        });
    };

    const getFinalist = () => {
        axios.get('/get-finalist').then((response) => {
            setCheckedStudents(response.data);
        });
    };

    const toggleStudentCheck = (name) => {
        const formData = new FormData();
        formData.append('name', name);

        axios.post('/toggle-student-finalist', formData).then((res) => {
            setCheckedStudents((prev) => res.data.status === 'Inserted'
                ? [...prev, name]
                : prev.filter((studentName) => studentName !== name));
        });
    };

    return (
        <div className="quiz-page px-4 py-5 sm:px-6 lg:px-8">
            <Head title="Choose finalists" />
            <div className="relative z-10 mx-auto max-w-[1500px]">
                <header className="mb-5 flex items-center justify-between gap-4">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-sky-50">
                        <ArrowLeftIcon className="h-5 w-5" />
                        <span className="hidden sm:inline">Dashboard</span>
                    </Link>
                    <ApplicationLogo className="w-44 sm:w-60" />
                    <div className="flex min-w-10 items-center justify-end gap-2 text-slate-700">
                        <UsersIcon className="h-5 w-5 text-amber-500" />
                        <span className="hidden text-sm font-bold sm:inline">{checkedStudents.length} selected</span>
                    </div>
                </header>

                <section className="quiz-panel overflow-hidden">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                        <div>
                            <p className="quiz-kicker">Final round selection</p>
                            <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">Choose your finalists</h1>
                            <p className="mt-2 text-sm text-slate-500">Select every contestant advancing to the final round.</p>
                        </div>
                        <div className="flex items-center gap-3 rounded-2xl bg-amber-50 px-4 py-3 text-amber-800 ring-1 ring-amber-100">
                            <SparklesIcon className="h-6 w-6" />
                            <div><p className="text-2xl font-black leading-none">{checkedStudents.length}</p><p className="text-[10px] font-bold uppercase tracking-wider">Finalists</p></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-3 sm:p-6 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10">
                        {students.map((student) => {
                            const isChecked = checkedStudents.includes(student.name);
                            return (
                                <button key={student.id} type="button" onClick={() => toggleStudentCheck(student.name)} className={`group relative flex min-h-32 flex-col items-center justify-center overflow-hidden rounded-2xl border p-3 text-center transition duration-200 hover:-translate-y-0.5 hover:shadow-lg ${isChecked ? 'border-amber-400 bg-gradient-to-br from-amber-300 to-orange-400 text-slate-950 shadow-md shadow-amber-500/20' : 'border-slate-200 bg-white text-slate-800 hover:border-amber-300'}`}>
                                    {isChecked && <span className="absolute right-2 top-2 rounded-full bg-slate-900 p-1 text-white"><CheckIcon className="h-3.5 w-3.5 stroke-[3]" /></span>}
                                    <span className={`text-3xl font-black ${isChecked ? 'text-slate-950' : 'text-blue-600'}`}>{student.id}</span>
                                    <span className={`mt-1 line-clamp-2 text-[11px] font-extrabold uppercase leading-4 ${isChecked ? 'text-amber-950' : 'text-slate-600'}`}>{student.name}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Finalist;
