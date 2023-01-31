import { Component } from '@angular/core';
import { Product } from './interfaces/Product';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MallMartClient';

  products: Product[] = [];
  allProducts: Product[] = [];

  constructor(private dataService: DataService) {

    this.dataService.allProducts.subscribe(pro => this.allProducts = pro);
  }

  setProducts(newProducts: Product[]) {

    this.products = newProducts;
  }
}
