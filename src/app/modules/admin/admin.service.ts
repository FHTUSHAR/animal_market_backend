import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import { IGenericResponse, IPaginationOptions } from "../../../interfaces/common";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { Admin } from "./admin.model";
import { IAdmin } from "./admin.interface";
import { adminSearchAbleFields } from "./admin.constant";


const createAdmin = async (user: IAdmin):Promise<any> => { 
  const newUser = await Admin.create(user);
  return newUser;   
};

const getAllAdmins = async (
    filters: any,
    paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<any>> => {
    const { searchTerm, ...filterData } = filters;
  
    const andConditions: any = [];
    if (searchTerm) {
      andConditions.push({
        $or: adminSearchAbleFields.map((field) => ({
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
  
    const result = await Admin.find(filter)
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
    const total = await Admin.countDocuments(filter);
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: result,
    };
  };
  
  const getSingleAdmin = async (
    id: string
  ): Promise<IAdmin | null> => {
    const result = await Admin.findById(id)
    return result;
  };
  
  const updateAdmin = async (
    id: string,
    payload:Partial<IAdmin>
  ):Promise<IAdmin | null> => {
    const isExit = await Admin.findById(id);
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
    const result = await Admin.findOneAndUpdate(filter,updatedUserData,options);
    return result;
  };
  
  const deleteAdmin = async (
      id: string,
    ) => {
      const result = await Admin.findByIdAndDelete(id);
      return result;
    };

export const AdminService = {createAdmin, deleteAdmin, updateAdmin, getSingleAdmin, getAllAdmins }