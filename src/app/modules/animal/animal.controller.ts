import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IAnimal } from "./animal.interface";
import { AnimalService } from "./animal.service";
import pick from "../../../shared/pick";
import { animalFilterableFields } from "./animal.constant";
import { paginationField } from "../../../constant";

// ✅ Create animals
export const createAnimal = catchAsync(async (req: Request, res: Response) => {
    const animalData = req.body;
    const newAnimal = await AnimalService.createAnimal(animalData);
  
    sendResponse<IAnimal>(res, {
      statusCode: 200,
      success: true,
      message: "Animal created successfully",
      data: newAnimal,
    });
  });

// ✅ Get all animals
export const getAllAnimals = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, animalFilterableFields);
  const paginationOptions = pick(req.query, paginationField);
  const result = await AnimalService.getAllAnimals(filters,paginationOptions);

  sendResponse<IAnimal[]>(res, {
    statusCode: 200,
    success: true,
    message: "User fetch successfully",
    meta: result.meta,
    data: result.data,
  });
});

// ✅ Get a single animal by ID
export const getSingleAnimal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await AnimalService.getSingleAnimal(id);


  sendResponse<IAnimal | null>(res, {
    statusCode: 200,
    success: true,
    message: result ? "Animal retrieved successfully":"Animal not found",
    data: result,
  });
});

// ✅ Update an animal
export const updateAnimal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AnimalService.updateAnimal(id, updateData);

  sendResponse<IAnimal | null>(res, {
    statusCode: 200,
    success: true,
    message: "Animal data updated successfully",
    data: result,
  });
});

// ✅ Delete an animal
export const deleteAnimal = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await AnimalService.deleteAnimal(id);

  sendResponse<null>(res, {
    statusCode: 200,
    success: true,
    message: "Animal deleted successfully",
    data: null,
  });
});
export const AnimalController = {createAnimal, getAllAnimals, getSingleAnimal, updateAnimal, deleteAnimal}