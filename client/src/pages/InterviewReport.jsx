import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App';
import Step3Report from '../components/Step3Report';
import { motion } from "motion/react";

function InterviewReport() {
  const { id } = useParams()
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const result = await axios.get(
          ServerUrl + "/api/interview/report/" + id,
          { withCredentials: true }
        )
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReport()
  }, [id])

  /* LOADING UI */
  if (!report) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center relative overflow-hidden">

        {/* GLOW */}
        <div className='absolute w-[400px] h-[400px] bg-green-500/10 blur-[120px]'></div>

        <div className="flex flex-col items-center gap-4">

          {/* SPINNER */}
          <div className="w-10 h-10 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="text-gray-400 text-lg">
            Generating your AI Report...
          </p>

        </div>
      </div>
    );
  }

  /* REPORT UI */
  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden py-10">

      {/* BACKGROUND GLOW */}
      <div className='absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[-100px]'></div>
      <div className='absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] bottom-[-100px] right-[-100px]'></div>

      <div className="max-w-5xl mx-auto px-4 relative">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
        >
          <Step3Report report={report} />
        </motion.div>

      </div>
    </div>
  )
}

export default InterviewReport