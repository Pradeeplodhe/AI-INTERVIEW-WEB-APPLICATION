import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='flex justify-center px-4 py-12 relative'>

      {/* GLOW */}
      <div className='absolute w-[400px] h-[400px] bg-green-500/10 blur-[120px] bottom-0'></div>

      <div className='w-full max-w-6xl backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-8 py-10 text-center shadow-[0_0_30px_rgba(0,0,0,0.3)]'>

        {/* LOGO */}
        <div className='flex justify-center items-center gap-3 mb-4'>
          <div className='p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md'>
            <BsRobot size={16} />
          </div>

          <h2 className='font-semibold text-lg tracking-wide'>
            Interview<span className='text-green-400'>IQ</span>
          </h2>
        </div>

        {/* TEXT */}
        <p className='text-gray-400 text-sm max-w-xl mx-auto leading-relaxed'>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth and professional confidence.
        </p>

        {/* DIVIDER */}
        <div className='my-6 border-t border-white/10'></div>

        {/* BOTTOM */}
        <p className='text-xs text-gray-500'>
          © {new Date().getFullYear()} InterviewIQ.AI — All rights reserved
        </p>

      </div>
    </div>
  )
}

export default Footer