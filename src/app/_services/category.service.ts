import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';
  categoryModel: any;

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }



  getCategoryById(categoryId: string): Observable<Category> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<Category>(url);
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    const url = `${this.apiUrl}/${category._id}`;
    return this.http.put<Category>(url, category);
  }

  deleteCategory(categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.delete<any>(url);
  }
  // getSubCategories(categoryId: string): Observable<Category[]> {
  //   const url = `${this.apiUrl}/subcategories/${categoryId}`;
  //   return this.http.get<Category[]>(url);
  // }
}
