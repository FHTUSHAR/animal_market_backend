import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";
import { IUser } from "./user.interface";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { paginationField } from "../../../constant";

const createUser = catchAsync(
    async (req: Request, res: Response) => {
      const { ...userData } = req.body;
      const result = await UserService.createUser(userData);
  
      sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User created successfully",
        data: result,
      });
    }
  );

  const getAllUsers = catchAsync(
    async (req: Request, res: Response) => {
      const filters = pick(req.query, userFilterableFields);
      const paginationOptions = pick(req.query, paginationField);
  
      const result = await UserService.getAllUsers(
        filters,
        paginationOptions
      );
      sendResponse<IUser[]>(res, {
        statusCode: 200,
        success: true,
        message: "User fetch successfully",
        meta: result.meta,
        data: result.data,
      });
    }
  );
  
  const getSingleUser = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await UserService.getSingleUser(id);
      sendResponse<IUser | null>(res, {
        statusCode: 200,
        success: true,
        message: "User fetch successfully",
        data: result,
      });
    }
  );
  
  const updateUser = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const updateData=req.body;
      const result = await UserService.updateUser(id,updateData);
      sendResponse<IUser | null>(res, {
        statusCode: 200,
        success: true,
        message: "User data updated successfully",
        data: result,
      });
    }
  );
  
  const deleteUser = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await UserService.deleteUser(id);
      sendResponse<IUser | null>(res, {
        statusCode: 200,
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    }
  );

export const UserController = {createUser, getAllUsers, deleteUser, updateUser, getSingleUser}