import { Request, Response } from "express";
import { User } from "@prisma/client";

import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
  const user: User = req.body;

  if (!user.email || !user.password) {
    res.sendStatus(422);
  }

  await authService.insertNewUser(user);

  res.sendStatus(200);
}