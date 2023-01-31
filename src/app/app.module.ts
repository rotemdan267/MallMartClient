import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FooterComponent } from './components/footer/footer.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { CartComponent } from './components/cart/cart.component';
import { EventEmitterService } from './services/event-emitter.service';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CustomerPageComponent } from './components/customer-page/customer-page.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { AdminHomepageComponent } from './components/admin-homepage/admin-homepage.component';
import { PaymentMethodPipe } from './pipes/payment-method.pipe';
import { CustomerDetailsForAdminComponent } from './components/customer-details-for-admin/customer-details-for-admin.component';
import { OrderDetailsComponent } from './components/order-details/order-details.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';


const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'products', component: ProductsListComponent },
  { path: 'products/:id', component: ProductPageComponent },
  { path: 'cart', component: CartComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'customer-details', component: CustomerDetailsComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'customer-page', component: CustomerPageComponent },
  { path: 'orders', component: OrdersListComponent },
  { path: 'admin-homepage', component: AdminHomepageComponent },
  { path: 'customers/:id', component: CustomerDetailsForAdminComponent },
  { path: 'orders/:id', component: OrderDetailsComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    ProductCardComponent,
    ProductsListComponent,
    SearchbarComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ProductPageComponent,
    CartComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomepageComponent,
    CustomerDetailsComponent,
    CheckoutComponent,
    CustomerPageComponent,
    OrdersListComponent,
    AdminHomepageComponent,
    PaymentMethodPipe,
    CustomerDetailsForAdminComponent,
    OrderDetailsComponent,
    PageNotFoundComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
  ],
  providers: [
    EventEmitterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
