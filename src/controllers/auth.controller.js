import { createUser, loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;

    const user = await createUser({ name, email, password });

    const {
      password: __removedPassword,
      __v,
      ...publicUserData
    } = user.toObject();

    res
      .status(201)
      .json({ message: "User registered successfully", user: publicUserData });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser({ email, password });
    const { password: __removedPassword, __v, ...publicUserData } = user.toObject();
    res.status(200).json({ message: "Login successful", user: publicUserData, token });
  } catch (error) {
    next(error);
  }
}