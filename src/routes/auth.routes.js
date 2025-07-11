import { Router } from "express";
import { register } from "../controllers/auth.controller.js";
import validate from "../middleware/validator.js";
import { registerSchema } from "../validators/auth.validator.js";

export const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
