import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners.",
      features: [
        "100 AI Credits",
        "Basic Report",
        "Voice Interview",
        "Limited History",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter",
      price: "₹100",
      credits: 150,
      description: "Focused practice plan.",
      features: [
        "150 AI Credits",
        "Detailed Feedback",
        "Analytics",
        "Full History",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best for serious prep.",
      features: [
        "650 AI Credits",
        "Advanced Feedback",
        "Skill Analysis",
        "Priority AI",
      ],
      badge: "Most Popular",
    },
  ];

  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =
        plan.id === "basic" ? 100 :
          plan.id === "pro" ? 500 : 0;

      const result = await axios.post(
        ServerUrl + "/api/payment/order",
        {
          planId: plan.id,
          amount,
          credits: plan.credits,
        },
        { withCredentials: true }
      )

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: result.data.amount,
        currency: "INR",
        name: "InterviewIQ.AI",
        description: `${plan.name} - ${plan.credits} Credits`,
        order_id: result.data.id,

        handler: async function (response) {
          const verify = await axios.post(
            ServerUrl + "/api/payment/verify",
            response,
            { withCredentials: true }
          )
          dispatch(setUserData(verify.data.user))
          alert("Payment Successful 🎉")
          navigate("/")
        },

        theme: { color: "#10b981" },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null)
    } catch (error) {
      console.log(error)
      setLoadingPlan(null)
    }
  }

  return (
    <div className='min-h-screen bg-[#020617] text-white relative overflow-hidden py-16 px-6'>

      {/* BACKGROUND GLOW */}
      <div className='absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[-100px]'></div>
      <div className='absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[120px] bottom-[-100px] right-[-100px]'></div>

      {/* HEADER */}
      <div className='max-w-6xl mx-auto mb-14 flex items-start gap-4'>

        <button
          onClick={() => navigate("/")}
          className='p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition'>
          <FaArrowLeft className='text-gray-300' />
        </button>

        <div className="text-center w-full">
          <h1 className="text-4xl md:text-5xl font-bold">
            Choose Your Plan
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Simple pricing for serious interview prep 🚀
          </p>
        </div>
      </div>

      {/* CARDS */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>

        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id
          const isPro = plan.id === "pro"

          return (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => !plan.default && setSelectedPlan(plan.id)}
              className={`relative p-[1px] rounded-3xl cursor-pointer
              ${isPro
                  ? "bg-gradient-to-br from-green-500 to-emerald-600"
                  : "bg-white/10"
                }`}>

              {/* INNER CARD */}
              <div className={`rounded-3xl p-8 backdrop-blur-xl border border-white/10
              ${isSelected ? "bg-[#020617]" : "bg-[#020617]/80"}`}>

                {/* BADGE */}
                {plan.badge && (
                  <div className="absolute top-6 right-6 bg-green-500 text-black text-xs px-3 py-1 rounded-full font-semibold">
                    {plan.badge}
                  </div>
                )}

                {/* NAME */}
                <h3 className="text-xl font-semibold">
                  {plan.name}
                </h3>

                {/* PRICE */}
                <div className="mt-4">
                  <span className="text-3xl font-bold text-green-400">
                    {plan.price}
                  </span>
                  <p className="text-gray-400 mt-1">
                    {plan.credits} Credits
                  </p>
                </div>

                {/* DESC */}
                <p className="text-gray-400 mt-4 text-sm">
                  {plan.description}
                </p>

                {/* FEATURES */}
                <div className="mt-6 space-y-3">
                  {plan.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <FaCheckCircle className="text-green-400 text-sm" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}
                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      isSelected
                        ? handlePayment(plan)
                        : setSelectedPlan(plan.id)
                    }}
                    className={`w-full mt-8 py-3 rounded-xl font-semibold transition
                    ${isSelected
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
                        : "bg-white/10 hover:bg-white/20"
                      }`}>
                    {loadingPlan === plan.id
                      ? "Processing..."
                      : isSelected
                        ? "Proceed to Pay"
                        : "Select Plan"}
                  </button>
                )}

              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default Pricing