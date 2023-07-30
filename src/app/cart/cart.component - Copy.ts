import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../_services/cart.service';
import { CartItem } from '../models/cart-item.model';
// import { SessionService } from '../_services/

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> | undefined;
  cartItems: CartItem[] | undefined;
  subtotal: number | undefined;
  total: number | undefined;
  cartCount: number | undefined;
  cartItemCount: number | undefined;

  constructor(private cartService: CartService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const userId = this.getUserIdFromSession();

    // Get the cart items and calculate the total price
    this.cartService.getCartItems(userId).subscribe((items) => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });

    // Get the cart totals and count
    this.cartService.getCartTotals(userId).subscribe((totals) => {
      this.subtotal = totals.subtotal;
      this.total = totals.total;
    });
    this.cartService.getCartCount(userId).subscribe((count) => {
      this.cartCount = count;
    });

    // Subscribe to the cart item count observable
    this.cartService.getCartItemCount(userId).subscribe((count) => {
      this.cartItemCount = count;
    });increaseItemQuantity(itemId: string): void {
  this.cartService.increaseItemQuantity(itemId).subscribe(() => {
    this.cartItems$ = this.cartService.getCartItems(this.route.snapshot.paramMap.get('id'));
    this.cartService.getCartTotals(this.route.snapshot.paramMap.get('id')).subscribe((totals) => {
      this.subtotal = totals.subtotal;
      this.total = totals.total;
    });
    this.cartService.getCartCount(this.route.snapshot.paramMap.get('id')).subscribe((count) => {
      this.cartCount = count;
    });
    this.cartService.getCartItemCount(this.route.snapshot.paramMap.get('id')).subscribe((count) => {
      this.cartItemCount = count;
    });
  });
}
  }

  removeItemFromCart(itemId: string): void {
    this.cartService.removeItemFromCart(itemId).subscribe(() => {
      this.cartItems = this.cartService.getCartItems(this.route.snapshot.paramMap.get('id'));
      this.calculateTotalPrice();
      this.cartCount = this.cartService.getCartCount(this.route.snapshot.paramMap.get('id'));
      this.cartItemCount = this.cartService.getCartItemCount(this.route.snapshot.paramMap.get('id'));
    });
  }

  increaseItemQuantity(itemId: string): void {
    this.cartService.increaseItemQuantity(itemId).subscribe(() => {
      this.cartItems$ = this.cartService.getCartItems(this.route.snapshot.paramMap.get('id'));
      this.cartService.getCartTotals(this.route.snapshot.paramMap.get('id')).subscribe((totals) => {
        this.subtotal = totals.subtotal;
        this.total = totals.total;
      });
      this.cartService.getCartCount(this.route.snapshot.paramMap.get('id')).subscribe((count) => {
        this.cartCount = count;
      });
      this.cartService.getCartItemCount(this.route.snapshot.paramMap.get('id')).subscribe((count) => {
        this.cartItemCount = count;
      });
    });
  }

  decreaseItemQuantity(itemId: string): void {
    this.cartService.decreaseItemQuantity(itemId).subscribe(() => {
      this.cartItems = this.cartService.getCartItems(this.route.snapshot.paramMap.get('id'));
      this.calculateTotalPrice();
      this.cartCount = this.cartService.getCartCount(this.route.snapshot.paramMap.get('id'));
      this.cartItemCount = this.cartService.getCartItemCount(this.route.snapshot.paramMap.get('id'));
    });
  }

  calculateTotalPrice(): void {
    this.total = 0;
    this.subtotal = 0;
    this.cartItems?.forEach(item => {
      if (item) {
        this.total += item.price * item.quantity;
        this.subtotal += item.price * item.quantity;
      }
    });
  }

  getCartItemCount(userId?: string): Observable<number> {
    return this.cartService.getCartCount(userId);
  }

  getUserIdFromSession(): string {
    const authUser = sessionStorage.getItem('auth-user');
    if (authUser) {
      const user = JSON.parse(authUser);
      return user.id;
    } else {
      return '';
    }
  }

}


