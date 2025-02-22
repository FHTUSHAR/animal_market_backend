import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";

export const handleValidationError = (
  error: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errorMessage: IGenericErrorMessage[] = Object.values(error.errors).map(
    (element) => ({ path: element?.path, message: element?.message })
  );
  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errorMessage,
  };
};
