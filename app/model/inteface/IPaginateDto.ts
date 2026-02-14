export interface IPaginateDto<T>{
    content: T[]
    size:number
    totalElements:number
    totalPages:number
}
