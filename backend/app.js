import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const envPath = process.env.NODE_ENV === "production" 
  ? "./config/config.production.env" 
  : ".env";
config({ path: envPath });

// CORS configuration for production
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: [
        process.env.FRONTEND_URL_ONE,
        process.env.FRONTEND_URL_TWO,
        "https://hospital-management-frontend.onrender.com",
        "https://hospital-management-dashboard.onrender.com"
      ],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
} else {
  // CORS configuration for development
  app.use(
    cors({
      origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Serve static files from dashboard build
app.use("/dashboard", express.static(path.join(__dirname, "../dashboard/dist")));

// Handle dashboard routes (SPA)
app.get("/dashboard/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dashboard/dist/index.html"));
});

// Handle frontend routes (SPA) - must be last
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

dbConnection();

app.use(errorMiddleware);
export default app;
