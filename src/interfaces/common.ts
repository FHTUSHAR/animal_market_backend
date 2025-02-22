
export interface IGenericErrorMessage{
    path:string|number;
    message:string;
}

export interface IGenericErrorResponse{
    statusCode:number;
    message:string;
    errorMessages:IGenericErrorMessage[]
}

export  type IPaginationOptions = {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?:'asc'|'desc';
  };

export type IGenericResponse<T>={
    meta:{
      page:number;
      limit:number;
      total:number;
    },
    data:T
  }