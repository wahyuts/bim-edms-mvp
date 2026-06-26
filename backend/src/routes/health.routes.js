import { Router } from "express";

export const healthRouter = Router();

healthRouter.get("/", (req, res) => {
  res.json({
    success: true,
    message: "OK",
    data: {
      status: "healthy",
      service: "SENA EDMS Backend",
      time: new Date().toISOString(),
    },
  });
});
