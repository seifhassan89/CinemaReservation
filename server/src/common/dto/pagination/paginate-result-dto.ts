export class PaginateResultDto<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  isSuccess: boolean;
  constructor(
    data: T[],
    totalCount: number,
    currentPage: number,
    pageSize: number,
    totalPages: number,
  ) {
    this.data = data;
    this.isSuccess = true;
    this.totalCount = totalCount;
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.totalPages = totalPages;
  }
}
