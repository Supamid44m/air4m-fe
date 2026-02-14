import { IPaginateDto } from "../inteface/task/IPaginateDto";

export class PaginateResponse<T> {
  content: T[];
  size: number;
  totalElements: number;
  totalPages: number;

  constructor(data?:IPaginateDto<T>) {
    this.content = data?.content ?? [];
    this.size = data?.size ?? 0;
    this.totalElements = data?.totalElements ?? 0;
    this.totalPages = data?.totalPages ?? 0;
  }
}
