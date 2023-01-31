import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/Product';
import { Category } from 'src/app/interfaces/Category';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  products: Product[] = [];
  newProducts: Product[] = [];

  categories: { category: Category, isChosen: boolean, products: Product[] }[] = [];
  isChooseAll: boolean = true;

  constructor(private dataService: DataService,
    private router: Router,
    private eventEmitterService: EventEmitterService
  ) {
    this.dataService.allProducts.subscribe(pro => {
      this.products = pro;
      this.orderProducts();
      this.setCategories();
      this.divideProductsByCategory();
    });
  }

  ngOnInit(): void {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeFunction.subscribe(() => {
          this.setCategoriesToAll();
         });
  }

  setCategoriesToAll() {
    this.isChooseAll = true;
    this.categories.forEach((c) => {
      c.isChosen = false;
    });
  }

  chooseAll() {
    this.setCategoriesToAll()
    this.dataService.updateProducts(this.products);
    this.router.navigate(['products']);
  }

  choose(index: number) {
    this.isChooseAll = false;
    this.categories[index].isChosen = !this.categories[index].isChosen;
    this.setProducts();
    this.router.navigate(['products']);
  }

  setProducts() {

    this.newProducts = [];
    this.categories.forEach((c) => {
      if (c.isChosen) {
        this.newProducts.push(...c.products);
      }
    });
    if (this.newProducts.length === 0) {
      this.isChooseAll = true;
      this.newProducts.push(...this.products);
    }
    this.dataService.updateProducts(this.newProducts);
  }

  divideProductsByCategory() {

    let chosenCategoriesIds: number[] = [];
    this.categories.forEach((c) => {
      if (c.isChosen) {
        chosenCategoriesIds.push(c.category.id);
      }
    });

    this.products.forEach((product) => {
      for (const category of this.categories) {
        if (product.category.id === category.category.id) {
          category.products.push(product);
        }
      }
    });
  }

  orderProducts() {

    // order products by categoryId to simplify the creation of categories list
    this.products = this.products.sort((a, b) => {
      if (a.category.id < b.category.id) {
        return -1;
      }
      if (a.category.id > b.category.id) {
        return 1;
      }
      return 0;
    });
  }

  setCategories() {

    let index = 0;

    this.products.forEach((p) => {
      if (this.categories.length === 0) {
        this.categories.push({ category: p.category, isChosen: false, products: [] });
      }
      else if (this.categories[index].category.id !== p.category.id) {
        this.categories.push({ category: p.category, isChosen: false, products: [] });
        index++;
      }
    });
  }
}
