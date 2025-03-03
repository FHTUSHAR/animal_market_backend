import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import config from "../../../config";
import sendResponse from "../../../shared/sendResponse";
import { ILoginResponse } from "./auth.interface";
import httpStatus  from "http-status";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {
    const payload = req.body;
    const result = await AuthService.loginUser(payload);
    console.log('login',result)
  
    const { refreshToken, ...others } = result;
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
  
    res.cookie("refreshToken", refreshToken, cookieOptions);
  
    sendResponse<ILoginResponse>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfull",
      data: others,
    });
  });

  const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);
  
    const cookieOptions = {
      secure: config.env === "production",
      httpOnly: true,
    };
  
    res.cookie("refreshToken", refreshToken, cookieOptions);
  
    sendResponse<string>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfull",
      data: result,
    });
  });
  
  export const AuthController = {
    loginUser,
    refreshToken,
  };