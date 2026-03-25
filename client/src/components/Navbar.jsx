import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const { userData } = useSelector((state) => state.user)
    const [showCreditPopup, setShowCreditPopup] = useState(false)
    const [showUserPopup, setShowUserPopup] = useState(false)
    const [showAuth, setShowAuth] = useState(false);

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex justify-center px-4 pt-6 sticky top-0 z-50'>

            {/* GLASS NAVBAR */}
            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='w-full max-w-6xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3 flex justify-between items-center shadow-[0_0_20px_rgba(0,0,0,0.3)]'>

                {/* LOGO */}
                <div
                    onClick={() => navigate("/")}
                    className='flex items-center gap-3 cursor-pointer group'>

                    <div className='p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md group-hover:scale-110 transition'>
                        <BsRobot size={18} />
                    </div>

                    <h1 className='font-semibold hidden md:block text-lg tracking-wide'>
                        Interview<span className='text-green-400'>IQ</span>
                    </h1>
                </div>

                {/* RIGHT SIDE */}
                <div className='flex items-center gap-4 relative'>

                    {/* CREDITS */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) return setShowAuth(true)
                                setShowCreditPopup(!showCreditPopup)
                                setShowUserPopup(false)
                            }}
                            className='flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition backdrop-blur-md'>

                            <BsCoin className='text-yellow-400' />
                            <span className='text-sm'>{userData?.credits || 0}</span>
                        </button>

                        {showCreditPopup && (
                            <div className='absolute right-0 mt-3 w-64 bg-[#020617]/90 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-xl z-50'>

                                <p className='text-sm text-gray-400 mb-4'>
                                    Need more credits?
                                </p>

                                <button
                                    onClick={() => navigate("/pricing")}
                                    className='w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-sm hover:scale-105 transition'>
                                    Buy Credits
                                </button>

                            </div>
                        )}
                    </div>

                    {/* USER */}
                    <div className='relative'>
                        <button
                            onClick={() => {
                                if (!userData) return setShowAuth(true)
                                setShowUserPopup(!showUserPopup)
                                setShowCreditPopup(false)
                            }}
                            className='w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold shadow-md hover:scale-110 transition'>

                            {userData
                                ? userData?.name.slice(0, 1).toUpperCase()
                                : <FaUserAstronaut size={16} />}
                        </button>

                        {showUserPopup && (
                            <div className='absolute right-0 mt-3 w-52 bg-[#020617]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-xl z-50'>

                                <p className='text-green-400 font-medium mb-2'>
                                    {userData?.name}
                                </p>

                                <button
                                    onClick={() => navigate("/history")}
                                    className='w-full text-left text-sm py-2 text-gray-300 hover:text-white transition'>
                                    Interview History
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-400 hover:text-red-300 transition'>
                                    <HiOutlineLogout size={16} />
                                    Logout
                                </button>

                            </div>
                        )}
                    </div>

                </div>

            </motion.div>

            {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        </div>
    )
}

export default Navbar