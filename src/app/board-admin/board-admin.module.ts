import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { BoardAdminComponent } from './board-admin.component';
import { ProductService } from '../_services/productService';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [ProductService],
  exports: []
})
export class BoardAdminModule { }
