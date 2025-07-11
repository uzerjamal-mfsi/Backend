import { Router } from "express";
import { authenticateToken } from "../middleware/authenticate.js";

export const dashboardRouter = Router();

dashboardRouter.get("/", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Dashboard" });
});
