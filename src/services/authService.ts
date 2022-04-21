import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import * as authRepository from "../repositories/authRepositoriy.js";
import { conflict } from "../utils/errorUtils.js";

export async function insertNewUser(newUser: User) {
  const user = await authRepository.findByEmail(newUser.email);

  if (user) {
    throw conflict();
  }

  const passwordHash = bcrypt.hashSync(newUser.password, 10);

  const userObject: User = { ...newUser, password: passwordHash };

  await authRepository.insert(userObject);
}
