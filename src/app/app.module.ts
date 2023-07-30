import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedComponent } from './shared/shared.component';
import { HelpersComponent } from './helpers/helpers.component';
import { ServicesComponent } from './services/services.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReturnComponent } from './return/return.component';
import { TermsComponent } from './terms/terms.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ShopComponent } from './shop/shop.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailsComponent } from './details/details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';


import { ProductService } from '../_services/product.service';
import { CartService } from './_services/cart.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { CurrencyPipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SharedComponent,
    HelpersComponent,
    ServicesComponent,
    AboutComponent,
    ContactComponent,
    PrivacyComponent,
    ReturnComponent,
    TermsComponent,
    ThanksComponent,
    ShopComponent,
    CartComponent,
    CheckoutComponent,
    DetailsComponent,
    PagenotfoundComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    CartService,
    ProductService,
    { provide: CurrencyPipe, useClass: CurrencyPipe }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
