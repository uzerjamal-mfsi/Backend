import createError from "http-errors";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next(new createError.Unauthorized("Invalid Token"));
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new createError.Unauthorized("Invalid Token"));
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return next(new createError.Forbidden("Invalid token"));
    }
    req.user = user;
    next();
  });
}
