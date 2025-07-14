import createError from 'http-errors';
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

export async function createUser({ name, email, password }) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new createError.Conflict(`User with email ${email} already exists`);
  }

  const user = await User.create({ name, email, password });
  return user;
}

export async function authenticateUser({ email, password }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new createError.Unauthorized('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new createError.Unauthorized('Invalid email or password');
  }

  const payload = { id: user._id, email: user.email };
  const token = jwt.sign(payload, config.jwtSecret);
  return { user, token };
}
