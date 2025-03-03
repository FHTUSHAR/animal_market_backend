import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { jwtHelper } from "../../../helpers/jwtHelper";
import { User } from "../user/user.model";
import { ILoginUser } from "./auth.interface";
import httpStatus from "http-status";

const loginUser = async (payload: ILoginUser): Promise<any> => {
  const { id, password } = payload;
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  const isPasswordExist = await User.isPasswordExist(
    password,
    isUserExist?.password
  );
  if (!isPasswordExist) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }

  const { _id: userId, role } = isUserExist;
  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in }
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt_refresh_secret as Secret,
    { expiresIn: config.jwt_refresh_expires_in }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<any> => {
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
  }
  const { userId, role } = verifiedToken;
  const isUserExist = await User.isUserExist(userId);

  if (!isUserExist) {
    throw new ApiError(httpStatus.FORBIDDEN, "User not found");
  }
  const newAccessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt_secret as Secret,
    { expiresIn: config.jwt_expires_in }
  );

  return { accessToken: newAccessToken };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
