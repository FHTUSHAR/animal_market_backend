import { NextFunction, Request, Response } from "express";
import ApiError from "../../errors/ApiError";
import httpStatus from "http-status";
import { jwtHelper } from "../../helpers/jwtHelper";
import config from "../../config";
import { Secret } from "jsonwebtoken";

export const auth =
  (...roles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      let verifiedUser = null;
      verifiedUser = jwtHelper.verifyToken(token, config.jwt_secret as Secret);
      if (!verifiedUser) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
      }
      req.user = verifiedUser; //role,userId

      const isValidUser = roles?.includes(verifiedUser?.role);
      if (!isValidUser) {
        throw new ApiError(httpStatus.FORBIDDEN, "FORBIDDEN");
      }
      next();
    } catch (error) {

    }
  };


