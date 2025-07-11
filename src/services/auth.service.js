import createError from "http-errors";
import User from "../models/User.js";

export async function createUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new createError.Conflict(`User with email ${email} already exists`);
  }

  const user = await User.create({ name, email, password });
  return user;
}
