import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../models/product';
import { ProductService } from '../_services/productService';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})

export class BoardAdminComponent {
  products: Product[] = [];
  product: Product = {
    id: 0,
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    regular_price: '',
    sales_price: '',
    sku: '',
    stock_status: '',
    featured: false,
    quantity: 0,
    image_name: '',
    image_des: '',
    category_id: 0,
    timestamp: new Date()
  };
  id: number = 0;

  constructor(private router: Router, private productService: ProductService, private currencyPipe: CurrencyPipe) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
  }

  addProduct(product: Product) {
    this.productService.addProduct(product).subscribe((data: any) => {
      this.products.push(data);
    });
  }

  updateProduct(product: Product) {
    this.productService.updateProduct(product).subscribe((data: any) => {
      const index = this.products.findIndex((p) => p.id === parseInt(this.id.toString()));
      this.products[index] = data;
    });
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((data: any) => {
      const index = this.products.findIndex((p) => p.id === parseInt(id.toString()));
      this.products.splice(index, 1);
    });
  }


  scrollFunction1() {
    const e = document.querySelector('anchorname');
    if (e) {
      e.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
        inline: 'start'
      });
    }
  }
  }

