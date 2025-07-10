import { getHello } from "../services/service.js";

export const sayHello = (req, res, next) => {
  try {
    const message = getHello();
    res.json({ message });
  } catch (err) {
    next(err);
  }
};
