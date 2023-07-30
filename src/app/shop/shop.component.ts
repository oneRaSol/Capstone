import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/productService';
import { PaginationService } from '../_services/pagination.service';
import { Product } from '../models/product';
import { Category } from '../models/category';
import { CategoryService } from '../_services/category.service';
// import { Pagination } from '../_models/pagination.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = []
  filteredCategories: Category[] = [];
  pagination: Pagination;
  page = 1;
  totalItems: number = 12;

  constructor(private productService: ProductService, private paginationService: PaginationService, private categoryService: CategoryService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
      this.totalItems = products.length;
      console.log(products);
    });

    this.categoryService.getAllCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(categories);
    });



    // this.categoryService.getSubCategories('electronics').subscribe(subcategories => {
    //   this.subcategories = subcategories;
    // });

  }

  onPageChange(pageNumber: number) {
    this.page = pageNumber;
    const pagination = this.paginationService.getPage(this.totalItems, this.page, 10);
    // Do something with the pagination object
  }
}
