export interface Pagination {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    currentCount:number;
}

export class PaginatedResult<T>{
    result: T;
    pagination: Pagination;
}