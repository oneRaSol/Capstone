import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() { }

  getPage(totalItems: number, currentPage: number, itemsPerPage: number) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startPage = Math.max(currentPage - 3, 1);
    const endPage = Math.min(startPage + 5, totalPages);
    const pages = [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return {
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: itemsPerPage,
      totalItems: totalItems,
      startPage: startPage,
      endPage: endPage,
      pages: pages
    };
  }
}
