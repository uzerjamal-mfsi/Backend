import createError from 'http-errors';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/config';

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new createError.Conflict(`User with email ${email} already exists`);
  }

  const user = await User.create({ name, email, password });
  return user;
}

export async function authenticateUser({ email, password }: { email: string; password: string }) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new createError.Unauthorized('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new createError.Unauthorized('Invalid email or password');
  }

  const payload = { id: user._id, email: user.email };
  const jwtSecret = config.jwtSecret;
  if (!jwtSecret) {
    throw new Error('JWT secret is not defined');
  }
  const token = jwt.sign(payload, jwtSecret);
  return { user, token };
}
