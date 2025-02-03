import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-list-filtered',
  templateUrl: './products-list-filtered.component.html',
  styleUrls: ['./products-list-filtered.component.css']
})
export class ProductsListFilteredComponent implements OnInit {

  productsFiltered: Product[] = [];

  constructor(private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router) {

    let filterBy = "";
    this.route.params.subscribe((params: Params) => {
      filterBy = params['filterBy'];
      this.productsService.getProductsFiltered(filterBy).subscribe((res) => {
        this.productsFiltered = res;
      });
    });
  }

  ngOnInit(): void {
  }


  back() {
    this.router.navigate(['admin-homepage']);
  }


}
