import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of} from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { EventEmitter } from '@angular/core';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CartItem } from '../models/cart-item.model';


export interface CartTotals {
  subtotal: number;
  total: number;
}

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private loggedInUserId: string | undefined;
  private apiUrl = 'http://localhost:8080/api';
  private cartDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cartData$ = this.cartDataSubject.asObservable();
  // cartCount$ = this.cartCountSubject.asObservable();
  cartCountChanged = new EventEmitter<number>();
  private cartItems: any[] = [];
  private cartCount: number = 0;
  cartCount$: Observable<number> | undefined;
  cartService: any;
  cartItems$: any;

  constructor(private http: HttpClient) {
    // this.cartCount$ = this.getCartCount();
  }

  setLoggedInUserId(userId: string): void {
    this.loggedInUserId = userId;
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.apiUrl}/cart/items/${cartItem.id}`, cartItem);
  }

  getCartItems(userId?: string): Observable<CartItem[]> {
    const id = userId || this.loggedInUserId;
    return this.http.get<CartItem[]>(`${this.apiUrl}/cart/${id}/items`);
  }

  getCartItemCount(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/carts/${userId}/count`);
  }

  getCartTotals(userId: string): Observable<{ subtotal: number, total: number }> {
    return this.http.get<{ subtotal: number, total: number }>(`${this.apiUrl}/totals/${userId}`);
  }

  getCartCount(userId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/cart/count/${userId}`);
  }

  removeFromCart(cartItem: CartItem): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/cart/items/${cartItem.id}`);
  }

  removeItemFromCart(userId: string, itemId: string): Observable<CartItem[]> {
    return this.http.delete<CartItem[]>(`${this.apiUrl}/cart/${userId}/item/${itemId}`);
  }

  increaseItemQuantity(userId: string, itemId: string): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.apiUrl}/cart/${userId}/item/${itemId}/quantity/increase`, null);
  }

  decreaseItemQuantity(userId: string, itemId: string): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.apiUrl}/cart/${userId}/item/${itemId}/quantity/decrease`, null);
  }

  updateItemQuantity(userId: string, itemId: string, quantity: number): Observable<CartItem[]> {
    return this.http.put<CartItem[]>(`${this.apiUrl}/cart/${userId}/item/${itemId}/quantity/${quantity}`, null);
  }

  getCartData(): Observable<any> {
    const userId = this.getUserIdFromSession();
    const url = `${this.apiUrl}/cart/data`;
    return this.http.get<any>(`${url}?userId=${userId}`).pipe(
      map((response: any) => {
        this.cartDataSubject.next(response);
        this.cartCountSubject.next(response.reduce((total: number, item: any) => total + item.quantity, 0));
        return response;
      })
    );
  }

  addItemToCart(userId: string, productId: number, quantity: number, name: string, price: number, imageName: string, shortDescription: string): Observable<any> {
    const url = `${this.apiUrl}/cart/${userId}/items`;
    const data = {
      userId: userId,
      productId: productId,
      quantity: quantity,
      name: name,
      price: price,
      imageName: imageName,
      shortDescription: shortDescription
    };
    return this.http.post<any>(url, data, { observe: 'response' }).pipe(
      tap((response: any) => {
        this.cartDataSubject.next(response.body);
        this.cartCountSubject.next(response.body.reduce((total: number, item: any) => total + item.quantity, 0));
        this.cartCountChanged.emit(this.cartCountSubject.value);
      }),
      catchError((error) => {
        console.error('Error adding item to cart:', error);
        return of(null);
      })
    );
  }

  // updateItemInCart(userId: string, cartItemId: string, quantity: number): Observable<any> {
  //   const url = `${this.apiUrl}/user/${userId}/item/${cartItemId}`;
  //   const data = {
  //     quantity: quantity
  //   };
  //   return this.http.put<any>(url, data).pipe(
  //     tap((response: any) => {
  //       this.cartDataSubject.next(response);
  //       this.cartCountSubject.next(response.reduce((total: number, item: any) => total + item.quantity, 0));
  //     })
  //   );
  // }

  deleteItemFromCart(userId: string, cartItemId: string): Observable<any> {
    const url = `${this.apiUrl}/user/${userId}/item/${cartItemId}`;
    return this.http.delete<any>(url).pipe(
      tap((response: any) => {
        this.cartDataSubject.next(response);
        this.cartCountSubject.next(response.reduce((total: number, item: any) => total + item.quantity, 0));
      })
    );
  }



  public getUserIdFromSession(): string {
    const authUser = sessionStorage.getItem('auth-user');
    if (authUser) {
      const user = JSON.parse(authUser);
      return user.id;
    } else {
      return '';
    }
  }
}
