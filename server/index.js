import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();


// ✅ CORS (ABHI TEMP - jab tak frontend deploy nahi hua)
app.use(cors({
  // origin: "https://ai-interview-web-application-1-rxhy.onrender.com"
  // origin: true, // 🔥 allow all origins (safe for testing)
 
//  origin: "https://ai-interview-web-application-1-rxhy.onrender.com",
  origin:"https://ai-interview-web-application-p2pw.vercel.app",
credentials: true
}));


// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());


// ✅ Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/interview", interviewRouter);
app.use("/api/payment", paymentRouter);


// ✅ Test route (optional but useful)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


// ✅ Server start
const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});