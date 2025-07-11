import { createUser } from "../services/auth.service.js";

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
