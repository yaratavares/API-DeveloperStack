import { Session, User } from "@prisma/client";
import client from "../database.js";

export function insert(newUser: User) {
  return client.user.create({
    data: newUser,
  });
}

export function findByEmail(email: string) {
  return client.user.findFirst({ where: { email } });
}

export function findSession(userId: number) {
  return client.session.findFirst({ where: { userId } });
}

export function createSession(newSession: Session) {
  return client.session.create({ data: newSession });
}
