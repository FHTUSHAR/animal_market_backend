import { Response } from "express";

type IData<T> = {
  statusCode: number;
  success: boolean;
  message?: string|null;
  meta?:{
    page:number;
    limit:number;
    total:number;
  }
  data?:T;
};

const sendResponse =<T> (res: Response, data: IData<T>) => {
  const apiResponse:IData<T>={
    statusCode:data.statusCode,
    success: data.success,
    message: data.message || null,
    meta:data.meta||null||undefined,
    data: data.data||undefined,
  }
  res.status(data.statusCode).json(apiResponse);
};

export default sendResponse;