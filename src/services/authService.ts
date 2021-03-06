import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import authRepository from "../repositories/authRepositoriy.js";
import sessionRepository from "../repositories/sessionRepository.js";
import errors from "../utils/errorUtils.js";

async function insertNewUser(newUser: User) {
  const user = await authRepository.findByEmail(newUser.email);

  if (user) {
    throw errors.conflict();
  }

  const passwordHash = bcrypt.hashSync(newUser.password, 10);

  const userObject: User = { ...newUser, password: passwordHash };

  await authRepository.insert(userObject);
}

async function createSession(logUser: User) {
  const user = await authRepository.findByEmail(logUser.email);

  if (!user) {
    throw errors.notFound();
  }

  if (!bcrypt.compareSync(logUser.password, user.password)) {
    throw errors.unauthorized();
  }

  const session = await sessionRepository.findByUserId(user.id);

  if (session) {
    return session.token;
  }

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(user.email, secretKey);

  await sessionRepository.create({ userId: user.id, token });

  return token;
}

export async function verifyToken(token: string) {
  const session = await sessionRepository.findByToken(token);

  if (!session) {
    throw errors.unauthorized();
  }

  return session.userId;
}

export default { createSession, insertNewUser };
