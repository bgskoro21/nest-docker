export class PaginationDto {
  page: number;
  limit: number;

  constructor(page: number = 1, limit: number = 10) {
    this.page = Math.max(Number(page), 1);
    this.limit = Math.max(Number(limit), 1);
  }

  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  totalPages(totalItems: number): number {
    return Math.ceil(totalItems / this.limit);
  }

  prevPage(): number | null {
    return this.page > 1 ? this.page - 1 : null;
  }

  nextPage(totalItems: number): number | null {
    return this.page < this.totalPages(totalItems) ? this.page + 1 : null;
  }

  formatResponse<T>(data: T[], totalItems: number, baseUrl: string) {
    return {
      items: data,
      meta: {
        totalItems,
        totalPages: this.totalPages(totalItems),
        currentPage: this.page,
        perPage: this.limit,
        prevPage: this.prevPage()
          ? `${baseUrl}?page=${this.prevPage()}&limit=${this.limit}`
          : null,
        nextPage: this.nextPage(totalItems)
          ? `${baseUrl}?page=${this.nextPage(totalItems)}&limit=${this.limit}`
          : null,
      },
    };
  }
}
