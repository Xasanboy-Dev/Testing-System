import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const SECRET = process.env.SECRET;

export function SIGNTOKEN({
  name,
  lastname,
  typeOf,
  id,
}: {
  name: string;
  lastname: string;
  typeOf: string;
  id: number;
}) {
  return jwt.sign({ name, lastname, typeOf, id }, SECRET!);
}

export function VERIFY(token: string) {
  return jwt.verify(token, SECRET!);
}

export function HasHPassword(password: string) {
  return bcrypt.hashSync(password, 7);
}

export function ComparePassword({
  password,
  encrypted,
}: {
  password: string;
  encrypted: string;
}) {
  return bcrypt.compareSync(password, encrypted);
}
