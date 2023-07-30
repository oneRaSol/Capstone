import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ProductService } from '../_services/productService';
import { CartService } from '../_services/cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  productId: string | undefined;
  product: any;
  cartCount$: Observable<number> | undefined;
  cartCount: number = 0;
  cartItemCount: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.getCartCount();
      }
    });
  }
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    this.productService.getProduct(this.productId).subscribe(product => {
      this.product = product;
    });
    const userId = this.getUserIdFromSession();
    this.cartService.getCartItemCount(userId).subscribe((count: any) => {
      this.cartItemCount = count;
    });
  this.productService.getProduct(this.productId).subscribe((product) => {
    this.product = product;
  });
  }

  addToCart(productId: number, quantity: number): void {
    const userId = this.getUserIdFromSession();
    if (userId!== undefined && productId!== undefined) {
      const name = this.product.name;
      const price = this.product.regular_price;
      const imageName = this.product.images[0].src;
      const shortDescription = this.product.short_description;
      this.cartService.addItemToCart(userId, productId, quantity, name, price, imageName, shortDescription).subscribe(
        () => {
          console.log('Item added to cart');
          this.router.navigate(['/cart']);
        },
        (error) => {
          console.log('Error adding item to cart:', error);
        }
      );
    }
  }


  getCartCount(): void {
    const userId = this.getUserIdFromSession();
    if (userId!== undefined) {
      this.cartService.getCartItemCount(userId).subscribe((count: number) => {
        this.cartCount = count;
      });
    }
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
