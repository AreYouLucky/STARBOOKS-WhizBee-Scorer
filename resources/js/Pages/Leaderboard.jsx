import { FaMedal, FaUserAlt, FaStar } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Options from "@/Components/Options";
import { io } from "socket.io-client";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
const socket = io("http://192.168.40.43:3001");


const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [isFinal, setIsFinal] = useState(0);
    const isFinalRef = useRef(isFinal);
    const stages = [
        { value: 0, label: "Semi Finals" },
        { value: 1, label: "Finals" },
    ];

    useEffect(() => {
        isFinalRef.current = isFinal;
        loadLeaderBoards();
    }, [isFinal]);

    useEffect(() => {
        const handleSocketUpdate = () => {
            console.log("Socket Triggered. isFinal:", isFinalRef.current);
            axios.get(`/load-leaderboard/${isFinalRef.current}`).then((res) => {
                setLeaderboards(res.data);
            });
        };

        socket.on("chat message", handleSocketUpdate);
        return () => socket.off("chat message", handleSocketUpdate);
    }, []);

    const loadLeaderBoards = () => {
        console.log("loadLeaderBoards:", isFinal);
        axios.get(`/load-leaderboard/${isFinal}`).then((res) => {
            setLeaderboards(res.data);
        });
    };

    const handleStageChange = (e) => {
        const final = parseInt(e.target.value)
        setIsFinal(final);
    };

    return (
        <div className="w-full bg-blue-200 min-h-screen px-10">
            <div className="w-full mx-auto px-4 py-2 ">
                <div className="flex justify-between gap-3">
                    <Link href="/dashboard">
                        <div className="bg-blue-500 rounded-lg shadow-md px-4 py-2 w-fit text-white font-bold">
                            Back
                        </div>
                    </Link>
                    <Options
                        id="stage"
                        items={stages}
                        itemValue="value"
                        itemName="label"
                        name="stage"
                        value={isFinal}
                        onChange={handleStageChange}
                    />
                </div>
                <ApplicationLogo className="w-80 mb-6 mx-auto" />

                {/* Top 5 Players */}
                <div className="bg-white rounded-md shadow-lg overflow-hidden mb-8 p-2">
                    <div className="bg-blue-500 px-6 py-4 rounded-t-md">
                        <h2 className="text-2xl font-semibold text-gray-100"> 🏆 Leaderboard</h2>
                    </div>
                    <table className="w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-blue-200">
                            <tr>
                                <th className="px-6 py-5 text-center font-extrabold text-gray-700 text-2xl">CONTESTANT NO.</th>
                                <th className="px-6 py-5 text-left font-extrabold text-gray-700 text-2xl">NAME</th>
                                {/* <th className="px-6 py-5 text-center font-extrabold text-gray-700 text-lg">SCHOOL</th> */}
                              {/*  <th className="px-6 py-5 text-center font-extrabold text-gray-700 text-2xl">SCORE</th>*/}
                                <th className="px-6 py-5 text-center font-extrabold text-gray-700 text-2xl">RANK</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {leaderboards.map((user, index) => (
                                    <motion.tr
                                        key={`${user.name}-${user.total_score}`}
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                        className={`
                                        transition-all duration-150 hover:bg-gray-50
                                        ${index % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                                                            
                                    `}
                                    >
                                        <td className="px-6 py-4 font-semibold text-blue-800 ">
                                            <div className="flex items-center gap-2 justify-center text-4xl">
                                                #{user.id}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="flex items-center gap-5">
                                                <FaUserAlt className="text-white bg-gray-400 w-10 h-10 rounded-full p-1" />
                                                <div>
                                                    <span className=" text-3xl truncate font-bold">{user.name.toUpperCase()}</span>
                                                    <p className="text-lg font-medium">
                                                        {user.school.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        {/*<td className="px-6 py-4 text-center  text-2xl font-bold">
                                            {user.total_score}
                                        </td>*/}
                                        <td className="px-6 py-4 text-center text-yellow-700 font-extrabold text-3xl">
                                            {index + 1}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Leaderboard;
