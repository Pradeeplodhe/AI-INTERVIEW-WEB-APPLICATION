import React, { useEffect, useState, useRef } from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {

  const { interviewId, questions, userName } = interviewData;

  const [isIntroPhase, setIsIntroPhase] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  const currentQuestion = questions[currentIndex];

  /* ---------------- VOICE SETUP ---------------- */
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const female = voices.find(v => v.name.toLowerCase().includes("female"));
      const male = voices.find(v => v.name.toLowerCase().includes("male"));

      if (female) {
        setSelectedVoice(female);
        setVoiceGender("female");
      } else if (male) {
        setSelectedVoice(male);
        setVoiceGender("male");
      } else {
        setSelectedVoice(voices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) return resolve();

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = selectedVoice;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic();
        videoRef.current?.play();
      };

      utterance.onend = () => {
        setIsAIPlaying(false);
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;

        if (isMicOn) startMic();

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  /* ---------------- INTRO + QUESTIONS ---------------- */
  useEffect(() => {
    if (!selectedVoice) return;

    const run = async () => {
      if (isIntroPhase) {
        await speakText(`Hi ${userName}, let's start your interview.`);
        await speakText("Answer confidently and take your time.");
        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 500));
        await speakText(currentQuestion.question);
      }
    };

    run();
  }, [selectedVoice, isIntroPhase, currentIndex]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (isIntroPhase || !currentQuestion) return;

    setTimeLeft(currentQuestion.timeLimit || 60);

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, isIntroPhase]);

  /* ---------------- SPEECH RECOGNITION ---------------- */
  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;

    recognition.onresult = (event) => {
      const text = event.results[event.results.length - 1][0].transcript;
      setAnswer(prev => prev + " " + text);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startMic = () => {
    if (!recognitionRef.current || isAIPlaying) return;
    try {
      recognitionRef.current.start();
    } catch {}
  };

  const stopMic = () => {
    try {
      recognitionRef.current?.stop();
    } catch {}
  };

  const toggleMic = () => {
    isMicOn ? stopMic() : startMic();
    setIsMicOn(!isMicOn);
  };

  /* ---------------- SUBMIT ---------------- */
  const submitAnswer = async () => {
    if (isSubmitting) return;

    stopMic();
    setIsSubmitting(true);

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/submit-answer",
        {
          interviewId,
          questionIndex: currentIndex,
          answer,
          timeTaken: currentQuestion.timeLimit - timeLeft,
        },
        { withCredentials: true }
      );

      setFeedback(res.data.feedback);
      await speakText(res.data.feedback);

    } catch (err) {
      console.log(err);
    }

    setIsSubmitting(false);
  };

  /* ---------------- NEXT ---------------- */
  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      return finishInterview();
    }

    await speakText("Next question");

    setCurrentIndex(prev => prev + 1);
  };

  const finishInterview = async () => {
    stopMic();

    try {
      const res = await axios.post(
        ServerUrl + "/api/interview/finish",
        { interviewId },
        { withCredentials: true }
      );

      onFinish(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  /* AUTO SUBMIT */
  useEffect(() => {
    if (timeLeft === 0 && !feedback && !isSubmitting) {
      submitAnswer();
    }
  }, [timeLeft]);

  /* CLEANUP */
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-black via-[#020617] to-black flex items-center justify-center p-4'>
      
      <div className='w-full max-w-7xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col lg:flex-row overflow-hidden'>

        {/* LEFT */}
        <div className='lg:w-[35%] p-6 space-y-6 border-r border-white/10'>
          <video ref={videoRef} src={videoSource} className='rounded-xl shadow-xl' muted />

          {subtitle && (
            <div className='bg-white/10 p-4 rounded-xl text-center text-sm'>
              {subtitle}
            </div>
          )}

          <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
        </div>

        {/* RIGHT */}
        <div className='flex-1 p-6 flex flex-col'>
          <h2 className='text-2xl font-bold text-emerald-400 mb-6'>
            AI Interview
          </h2>

          {!isIntroPhase && (
            <div className='bg-white/10 p-5 rounded-xl mb-4'>
              {currentQuestion?.question}
            </div>
          )}

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className='flex-1 bg-white/10 p-4 rounded-xl outline-none'
          />

          {!feedback ? (
            <div className='flex gap-4 mt-4'>
              <button onClick={toggleMic} className='p-4 bg-black rounded-full text-white'>
                {isMicOn ? <FaMicrophone /> : <FaMicrophoneSlash />}
              </button>

              <button onClick={submitAnswer} className='flex-1 bg-emerald-500 rounded-xl text-white'>
                Submit
              </button>
            </div>
          ) : (
            <div className='mt-4'>
              <p className='mb-4 text-emerald-300'>{feedback}</p>
              <button onClick={handleNext} className='w-full bg-emerald-500 py-3 rounded-xl text-white'>
                Next <BsArrowRight />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Step2Interview