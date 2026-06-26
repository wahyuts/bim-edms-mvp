import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { auditRouter } from "./routes/audit.routes.js";
import { authRouter } from "./routes/auth.routes.js";
import { dashboardRouter } from "./routes/dashboard.routes.js";
import { documentRouter } from "./routes/document.routes.js";
import { escalationRouter } from "./routes/escalation.routes.js";
import { healthRouter } from "./routes/health.routes.js";
import { notificationRouter } from "./routes/notification.routes.js";
import { slaRouter } from "./routes/sla.routes.js";
import { storageRouter } from "./routes/storage.routes.js";
import { userRouter } from "./routes/user.routes.js";
import { profileRouter } from "./routes/profile.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EDMS Backend is running",
    data: {
      service: "SENA EDMS Backend",
      version: "v1",
    },
  });
});

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.use("/api/v1/documents", documentRouter);
app.use("/api/v1/pfd", (req, res, next) => {
  req.query.discipline = "PFD";
  req.body = req.body || {};
  req.body.discipline = "PFD";
  next();
}, documentRouter);
app.use("/api/v1/pid", (req, res, next) => {
  req.query.discipline = "PID";
  req.body = req.body || {};
  req.body.discipline = "PID";
  next();
}, documentRouter);
app.use("/api/v1/sla", slaRouter);
app.use("/api/v1/escalation", escalationRouter);
app.use("/api/v1/notifications", notificationRouter);
app.use("/api/v1/audit-trail", auditRouter);
app.use("/api/v1/storage", storageRouter);

app.use(notFoundHandler);
app.use(errorHandler);
