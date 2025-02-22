import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/common";
import { userSearchAbleFields } from "./user.constant";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";


const createUser = async (user: IUser):Promise<any> => { 
  const newUser = await User.create(user);
  return newUser;   
};

const getAllUsers = async (
    filters: any,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<any>> => {
    const { searchTerm, ...filterData } = filters;
  
    const andConditions: any = [];
    if (searchTerm) {
      andConditions.push({
        $or: userSearchAbleFields.map((field) => ({
          [field]: {
            $regex: searchTerm,
            $options: "i",
          },
        })),
      });
    }
  
    if (Object.keys(filterData).length) {
      andConditions.push({
        $and: Object.entries(filterData).map(([field, value]) => ({
          [field]: value,
        })),
      });
    }
   
    const { page, limit, skip, sortBy, sortOrder } =
      PaginationHelper.calculatePagination(paginationOptions);
    const sortCondition: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
      sortCondition[sortBy] = sortOrder;
    }
    let filter;
    if (andConditions.length !== 0) {
      filter = { $and: andConditions };
    } else {
      filter = {};
    }
  
    const result = await User.find(filter)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = await User.countDocuments(filter);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  
  const getSingleUser = async (
    id: string
  ): Promise<IUser | null> => {
    const result = await User.findById(id)
    return result;
  };
  
  const updateUser = async (
    id: string,
    payload:Partial<IUser>
  ):Promise<IUser | null> => {
    const isExit = await User.findById(id);
    if(!isExit){
      throw new ApiError(httpStatus.NOT_FOUND,'User not exit')
    }
    const {name,...userData} = payload;
    const updatedUserData = {...userData}
  
    if(name && Object.keys(name).length> 0 ){
      Object.keys(name).forEach((key) => {
          const nameKey = `name.${key}`;
          (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
        })
    }
  
    const filter = {_id:id };
    const options={new:true}
    const result = await User.findOneAndUpdate(filter,updatedUserData,options);
    return result;
  };
  
  const deleteUser = async (
      id: string,
    ) => {
      const result = await User.findByIdAndDelete(id);
      return result;
    };

export const UserService = {createUser, deleteUser, updateUser, getSingleUser, getAllUsers }