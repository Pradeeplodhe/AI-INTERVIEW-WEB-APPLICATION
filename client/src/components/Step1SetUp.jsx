import React, { useState } from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const { userData } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/resume",
                formdata,
                { withCredentials: true }
            )

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);
        } catch (error) {
            console.log(error)
        }
        setAnalyzing(false);
    }

    const handleStart = async () => {
        setLoading(true)
        try {
            const result = await axios.post(
                ServerUrl + "/api/interview/generate-questions",
                { role, experience, mode, resumeText, projects, skills },
                { withCredentials: true }
            )

            if (userData) {
                dispatch(setUserData({ ...userData, credits: result.data.creditsLeft }))
            }

            onStart(result.data)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <div className='min-h-screen bg-[#020617] text-white flex items-center justify-center px-4 relative overflow-hidden'>

            {/* GLOW */}
            <div className='absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[-100px]'></div>

            <div className='w-full max-w-6xl grid md:grid-cols-2 gap-8'>

                {/* LEFT SIDE */}
                <motion.div
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl'>

                    <h2 className="text-3xl font-bold mb-6">
                        Start Your AI Interview 🚀
                    </h2>

                    <p className="text-gray-400 mb-8">
                        Practice real scenarios with AI & get instant feedback.
                    </p>

                    <div className='space-y-5'>
                        {[
                            { icon: <FaUserTie />, text: "Choose Role & Experience" },
                            { icon: <FaMicrophoneAlt />, text: "AI Voice Interview" },
                            { icon: <FaChartLine />, text: "Detailed Report" },
                        ].map((item, i) => (
                            <motion.div key={i}
                                whileHover={{ scale: 1.05 }}
                                className='flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10'>

                                <div className='text-green-400 text-xl'>
                                    {item.icon}
                                </div>

                                <span className='text-gray-300'>{item.text}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT SIDE */}
                <motion.div
                    initial={{ x: 60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-xl'>

                    <h2 className='text-2xl font-bold mb-6'>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>

                        {/* ROLE */}
                        <input
                            placeholder='Enter Role'
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-400'
                        />

                        {/* EXPERIENCE */}
                        <input
                            placeholder='Experience (e.g. 2 years)'
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-400'
                        />

                        {/* MODE */}
                        <select
                            value={mode}
                            onChange={(e) => setMode(e.target.value)}
                            className='w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-green-400'>
                            <option value="Technical">Technical</option>
                            <option value="HR">HR</option>
                        </select>

                        {/* UPLOAD */}
                        {!analysisDone && (
                            <div
                                onClick={() => document.getElementById("file").click()}
                                className='border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer hover:border-green-400 transition'>

                                <FaFileUpload className='text-3xl mx-auto text-green-400 mb-2' />

                                <input
                                    id="file"
                                    type="file"
                                    hidden
                                    onChange={(e) => setResumeFile(e.target.files[0])}
                                />

                                <p className='text-gray-400'>
                                    {resumeFile ? resumeFile.name : "Upload Resume (Optional)"}
                                </p>

                                {resumeFile && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        className='mt-3 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </button>
                                )}
                            </div>
                        )}

                        {/* RESULT */}
                        {analysisDone && (
                            <div className='bg-white/5 border border-white/10 rounded-xl p-4'>
                                <p className='text-green-400 font-medium mb-2'>Resume Analyzed ✅</p>

                                <div className='flex flex-wrap gap-2'>
                                    {skills.map((s, i) => (
                                        <span key={i} className='bg-green-500/10 px-3 py-1 rounded-full text-sm'>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* BUTTON */}
                        <button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            className='w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition font-semibold'>
                            {loading ? "Starting..." : "Start Interview"}
                        </button>

                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default Step1SetUp