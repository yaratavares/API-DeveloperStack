import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import * as authRepository from "../repositories/authRepositoriy.js";
import { conflict, notFound, unauthorized } from "../utils/errorUtils.js";

export async function insertNewUser(newUser: User) {
  const user = await authRepository.findByEmail(newUser.email);

  if (user) {
    throw conflict();
  }

  const passwordHash = bcrypt.hashSync(newUser.password, 10);

  const userObject: User = { ...newUser, password: passwordHash };

  await authRepository.insert(userObject);
}

export async function createSession(logUser: User) {
  const user = await authRepository.findByEmail(logUser.email);

  if (!user) {
    throw notFound();
  }

  if (!bcrypt.compareSync(logUser.password, user.password)) {
    throw unauthorized();
  }

  const session = await authRepository.findSession(user.id);

  if (session) {
    return session.token;
  }

  const secretKey = process.env.JWT_SECRET;
  const token = jwt.sign(user.email, secretKey);

  await authRepository.createSession({ userId: user.id, token });

  return token;
}
