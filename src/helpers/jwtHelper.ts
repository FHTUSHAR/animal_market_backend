import jwt, { Secret } from "jsonwebtoken";

const createToken = (
  payload: object,
  secret: Secret,
  expireDay: object
): string => {
  const token = jwt.sign(payload, secret, expireDay);
  return token;
};

const verifyToken = (token: string, secret: Secret):any => {
  const generatedToken = jwt.verify(token, secret);
  return generatedToken;
};

export const jwtHelper = {
  createToken,
  verifyToken,
};
