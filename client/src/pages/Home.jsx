import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import AuthModel from '../components/AuthModel';

import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

function Home() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate()

  const handleRoute = (path) => {
    if (!userData) return setShowAuth(true)
    navigate(path)
  }

  const steps = [
    { icon: <BsRobot />, step: "STEP 1", title: "Role Selection", desc: "Adaptive AI difficulty." },
    { icon: <BsMic />, step: "STEP 2", title: "Voice Interview", desc: "Real-time follow-ups." },
    { icon: <BsClock />, step: "STEP 3", title: "Timed Mode", desc: "Real interview pressure." }
  ]

  const features = [
    { image: evalImg, icon: <BsBarChart />, title: "AI Evaluation", desc: "Deep performance analysis." },
    { image: resumeImg, icon: <BsFileEarmarkText />, title: "Resume Based", desc: "Smart personalized questions." },
    { image: pdfImg, icon: <BsFileEarmarkText />, title: "PDF Reports", desc: "Download insights instantly." },
    { image: analyticsImg, icon: <BsBarChart />, title: "Analytics", desc: "Track growth visually." }
  ]

  const modes = [
    { img: hrImg, title: "HR Mode", desc: "Behavioral interview." },
    { img: techImg, title: "Technical Mode", desc: "Deep tech questions." },
    { img: confidenceImg, title: "Confidence AI", desc: "Voice analysis." },
    { img: creditImg, title: "Credits", desc: "Unlock premium sessions." }
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">

      {/* BACKGROUND GLOW */}
      <div className="absolute w-[600px] h-[600px] bg-green-500/20 blur-[120px] top-[-100px] left-[-100px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] bottom-[-100px] right-[-100px]"></div>

      <Navbar />

      <div className="relative px-6 py-20 max-w-6xl mx-auto">

        {/* BADGE */}
        <div className="flex justify-center mb-8">
          <div className="px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 text-sm text-gray-300">
            <HiSparkles className="text-green-400" />
            AI Interview Platform
          </div>
        </div>

        {/* HERO */}
        <div className="text-center mb-28">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold leading-tight">

            Crack Interviews with{" "}
            <span className="bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
              AI Intelligence
            </span>

          </motion.h1>

          <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
            Smart mock interviews with real-time feedback & analytics.
          </p>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-10">

            <button
              onClick={() => handleRoute("/interview")}
              className="relative px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 transition-all shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              Start Interview
            </button>

            <button
              onClick={() => handleRoute("/history")}
              className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition">
              View History
            </button>

          </div>
        </div>

        {/* STEPS */}
        <div className="grid md:grid-cols-3 gap-10 mb-28">
          {steps.map((item, i) => (
            <div key={i}
              className="group relative p-[1px] rounded-3xl bg-gradient-to-br from-green-500/30 to-transparent">

              <div className="bg-[#020617]/80 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/10 group-hover:border-green-400/30 transition">

                <div className="text-green-400 mb-4 flex justify-center">
                  {item.icon}
                </div>

                <p className="text-xs text-green-400">{item.step}</p>
                <h3 className="font-semibold mt-2">{item.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{item.desc}</p>

              </div>
            </div>
          ))}
        </div>

        {/* FEATURES */}
        <div className="mb-28">
          <h2 className="text-4xl font-bold text-center mb-16">
            AI Capabilities
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((item, i) => (
              <div key={i}
                className="group p-[1px] rounded-3xl bg-gradient-to-br from-green-500/20 to-transparent">

                <div className="bg-[#020617]/80 backdrop-blur-xl rounded-3xl p-6 flex items-center gap-6 border border-white/10 group-hover:border-green-400/30 transition">

                  <img src={item.image} className="w-32" />

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODES */}
        <div className="mb-28">
          <h2 className="text-4xl font-bold text-center mb-16">
            Interview Modes
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            {modes.map((mode, i) => (
              <div key={i}
                className="group p-[1px] rounded-3xl bg-gradient-to-br from-green-500/20 to-transparent">

                <div className="bg-[#020617]/80 backdrop-blur-xl rounded-3xl p-6 flex justify-between items-center border border-white/10 group-hover:border-green-400/30 transition">

                  <div>
                    <h3 className="font-semibold">{mode.title}</h3>
                    <p className="text-gray-400 text-sm">{mode.desc}</p>
                  </div>

                  <img src={mode.img} className="w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
      <Footer />
    </div>
  )
}

export default Home