import { ZodError, ZodIssue } from "zod";
import { IGenericErrorMessage } from "../interfaces/error";
import { IGenericErrorResponse } from "../interfaces/common";

const handleZodValidationError = (error: ZodError): IGenericErrorResponse => {
  const errorMessage: IGenericErrorMessage[] = error.issues.map(
    (issue: ZodIssue) => ({
      path: issue?.path[1],
      message: issue?.message,
    })
  );

  return {
    statusCode: 400,
    message: "Validation Error",
    errorMessages: errorMessage,
  };
};
export default handleZodValidationError;
