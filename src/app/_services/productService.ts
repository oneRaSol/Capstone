import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';
  private apiUrl2 = 'http://localhost:8080/api/categories';
  private apiUrl3 = 'http://localhost:8080/api/products';
  private apiUrl4 = 'http://localhost:8080/api/products/add';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl2);
  }

  // getProduct(productId: string): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/${productId}`);
  // }

  getProduct(productId: string): Observable<Product> {
    const url = `${this.apiUrl}/products/${productId}`;
    return this.http.get<Product>(url);
  }

  getProducts(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl4, product);
  }

  updateProduct(product: any): Observable<any> {
    const url = `${this.apiUrl}/${product.id}`;
    return this.http.put<any>(url, product);
  }

  deleteProduct(productId: number): Observable<any> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.delete<any>(url);
  }
}



