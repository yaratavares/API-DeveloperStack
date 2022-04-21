import { Session } from "@prisma/client";
import client from "../database.js";

export function findByUserId(userId: number) {
  return client.session.findFirst({ where: { userId } });
}

export function create(newSession: Session) {
  return client.session.create({ data: newSession });
}

export function findByToken(token: string) {
  return client.session.findFirst({ where: { token } });
}
