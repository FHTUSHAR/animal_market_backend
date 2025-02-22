import { SortOrder } from "mongoose";

type IOptions={
    page?:number;
    limit?:number;
    sortBy?:string;
    sortOrder?:SortOrder
}
type IPaginatonResult={
    page:number;
    limit:number;
    skip:number;
    sortBy?:string;
    sortOrder?:SortOrder
}
const calculatePagination=(options:IOptions):IPaginatonResult=>{
    const page=options.page ||1
    const sortBy=options.sortBy||'createdAt'
    const sortOrder=options.sortOrder||'desc'
    const limit=options.limit||10
    const skip=(page-1)*limit
    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export const PaginationHelper={
    calculatePagination
}