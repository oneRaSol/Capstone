import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { CartService } from '../_services/cart.service';
import { CartItem } from '../models/cart-item.model';
import { Observable, map } from 'rxjs';
import { Router } from '@angular/router';

const USER_KEY = 'auth-user';

@Component({
  selector: 'app-header',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean> | undefined;
  user$: Observable<{ role: string; }> | undefined;

  cartItems$: Observable<CartItem[]> | undefined;
  cartCount$: Observable<number> | undefined;
  subtotal: number = 0;
  total: number = 0;
  cartItemCount$: Observable<{ [itemId: string]: number; }> | undefined;

  isLoggedIn = false;
  isAdminLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$();
    this.user$ = this.authService.getUser();

    const userId = this.cartService.getUserIdFromSession();
    this.cartItems$ = this.cartService.getCartItems(userId);

    this.cartCount$ = this.cartService.getCartItems().pipe(
      map((cartItems: any[]) => {
        return cartItems.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0);
      })
    );

    this.authService.user$.subscribe((user: { role: string; } | undefined) => {
      if (user) {
        this.isLoggedIn = true;
        this.isAdminLoggedIn = user.role === 'admin';
      } else {
        this.isLoggedIn = false;
        this.isAdminLoggedIn = false;
      }
    });
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.isAdminLoggedIn = false;
      this.router.navigate(['/login']);
    });
  }
}
