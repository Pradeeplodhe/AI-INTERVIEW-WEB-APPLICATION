import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })
                setInterviews(result.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyInterviews()
    }, [])

    return (
        <div className='min-h-screen bg-[#020617] text-white relative overflow-hidden py-16'>

            {/* GLOW BACKGROUND */}
            <div className='absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[-100px]'></div>
            <div className='absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] bottom-[-100px] right-[-100px]'></div>

            <div className='w-[90vw] lg:w-[70vw] mx-auto relative'>

                {/* HEADER */}
                <div className='mb-12 flex items-start gap-4 flex-wrap'>

                    <button
                        onClick={() => navigate("/")}
                        className='p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md'>
                        <FaArrowLeft className='text-gray-300' />
                    </button>

                    <div>
                        <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
                            Interview History
                        </h1>

                        <p className='text-gray-400 mt-2'>
                            Track your past interviews and performance insights
                        </p>
                    </div>

                </div>

                {/* EMPTY STATE */}
                {interviews.length === 0 ? (
                    <div className='bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-3xl text-center shadow-xl'>
                        <p className='text-gray-400'>
                            No interviews found. Start your first interview 🚀
                        </p>
                    </div>
                ) : (

                    /* LIST */
                    <div className='grid gap-6'>
                        {interviews.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/report/${item._id}`)}
                                className='group p-[1px] rounded-3xl bg-gradient-to-br from-green-500/20 to-transparent cursor-pointer'>

                                {/* CARD */}
                                <div className='bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 transition group-hover:border-green-400/30 group-hover:shadow-[0_0_30px_rgba(34,197,94,0.2)]'>

                                    <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                                        {/* LEFT */}
                                        <div>
                                            <h3 className="text-lg font-semibold">
                                                {item.role}
                                            </h3>

                                            <p className="text-gray-400 text-sm mt-1">
                                                {item.experience} • {item.mode}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-2">
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* RIGHT */}
                                        <div className='flex items-center gap-6'>

                                            {/* SCORE */}
                                            <div className="text-right">
                                                <p className="text-xl font-bold text-green-400">
                                                    {item.finalScore || 0}/10
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Overall Score
                                                </p>
                                            </div>

                                            {/* STATUS */}
                                            <span
                                                className={`px-4 py-1 rounded-full text-xs font-medium ${
                                                    item.status === "completed"
                                                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                                                }`}
                                            >
                                                {item.status}
                                            </span>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    )
}

export default InterviewHistory