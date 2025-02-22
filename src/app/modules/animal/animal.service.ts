import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelper";
import {
  IGenericResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IAnimal } from "./animal.interface";
import { Animal } from "./animal.model";
import { animalSearchAbleFields } from "./animal.constant";

const createAnimal = async (animal: IAnimal): Promise<IAnimal> => {
  const newUser = await Animal.create(animal);
  return newUser;
};

const getAllAnimals = async (
  filters: any,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<any>> => {
  const { searchTerm, ...filterData } = filters;

  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: animalSearchAbleFields.map((field) => ({
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

  const result = await Animal.find(filter)
    .populate("seller")
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Animal.countDocuments(filter);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAnimal = async (id: string): Promise<IAnimal | null> => {
  const result = await Animal.findById(id).populate("seller");
//   if(!result){
//     throw new ApiError(httpStatus.BAD_REQUEST,"Animal not found")
//   }
  return result;
};

const updateAnimal = async (
  id: string,
  payload: Partial<IAnimal>
): Promise<IAnimal | null> => {
  const isExit = await Animal.findById(id);
  if (!isExit) {
    throw new ApiError(httpStatus.NOT_FOUND, "Animal not exit");
  }

  const filter = { _id:id };
  const options = { new: true };
  const result = await Animal.findOneAndUpdate(
    filter,
    payload,
    options
  );
  return result;
};

const deleteAnimal = async (id: string) => {
  const result = await Animal.findByIdAndDelete(id);
  return result;
};

export const AnimalService = {
  createAnimal,
  deleteAnimal,
  updateAnimal,
  getSingleAnimal,
  getAllAnimals,
};
