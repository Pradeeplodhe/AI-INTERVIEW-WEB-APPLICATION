import React, { useState } from 'react'
import Step1SetUp from '../components/Step1SetUp'
import Step2Interview from '../components/Step2Interview'
import Step3Report from '../components/Step3Report'
import { motion, AnimatePresence } from "motion/react";

function InterviewPage() {
    const [step, setStep] = useState(1)
    const [interviewData, setInterviewData] = useState(null)

    const steps = ["Setup", "Interview", "Report"]

    return (
        <div className='min-h-screen bg-[#020617] text-white relative overflow-hidden'>

            {/* BACKGROUND GLOW */}
            <div className='absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[-100px]'></div>
            <div className='absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] bottom-[-100px] right-[-100px]'></div>

            <div className='relative max-w-5xl mx-auto px-4 py-10'>

                {/* STEP PROGRESS BAR */}
                <div className='flex justify-center mb-10'>
                    <div className='flex items-center gap-6'>

                        {steps.map((label, index) => (
                            <div key={index} className='flex items-center gap-3'>

                                {/* CIRCLE */}
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all
                                    ${step >= index + 1
                                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                        : "bg-white/10 text-gray-400 border border-white/20"
                                    }`}>
                                    {index + 1}
                                </div>

                                {/* LABEL */}
                                <span className={`text-sm hidden md:block
                                    ${step >= index + 1 ? "text-white" : "text-gray-400"}`}>
                                    {label}
                                </span>

                                {/* LINE */}
                                {index !== steps.length - 1 && (
                                    <div className={`w-10 h-[2px]
                                        ${step > index + 1 ? "bg-green-500" : "bg-white/10"}`} />
                                )}
                            </div>
                        ))}

                    </div>
                </div>

                {/* CONTENT WITH ANIMATION */}
                <div className='bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl'>

                    <AnimatePresence mode="wait">

                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step1SetUp onStart={(data) => {
                                    setInterviewData(data);
                                    setStep(2)
                                }} />
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step2Interview
                                    interviewData={interviewData}
                                    onFinish={(report) => {
                                        setInterviewData(report);
                                        setStep(3)
                                    }}
                                />
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Step3Report report={interviewData} />
                            </motion.div>
                        )}

                    </AnimatePresence>

                </div>

            </div>
        </div>
    )
}

export default InterviewPage