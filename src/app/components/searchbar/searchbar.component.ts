import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/Product';
import { DataService } from 'src/app/services/data.service';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {

  products: Product[] = [];
  productsFound: Product[] = [];
  searchResults: string[] = [];

  constructor(private dataService: DataService,
    private router: Router,
    private eventEmitterService: EventEmitterService) {

    this.dataService.allProducts.subscribe(pro => { this.products = pro });
  }

  ngOnInit(): void { }

  Search(searchText: string) {
    if (searchText !== '') {
      this.handleKeyUp(searchText);
      this.dataService.updateProducts(this.productsFound);
      this.eventEmitterService.onSearchClick();
      this.router.navigate(['products']);
    }
  }

  handleKeyUp(searchText: string) {

    this.productsFound = [];
    this.searchResults = [];

    // I want products, whose descriptions contain the search term, to be 
    // included in the results, but only after those containing the 
    // search term in their name. So I saved them separately...
    let resultsDesc: string[] = [];
    let productsFoundByDescription: Product[] = [];

    if (searchText != "") {

      let lowerSearchText = searchText.toLowerCase();
      this.products.forEach((p) => {
        let lowerCaseName = p.name.toLowerCase();
        if (lowerCaseName.includes(lowerSearchText)) {
          this.productsFound.push(p);
          this.searchResults.push(p.name);
        }
        else {
          let lowerCaseDesc = p.description.toLowerCase();
          if (lowerCaseDesc.includes(lowerSearchText)) {
            productsFoundByDescription.push(p);
            resultsDesc.push(p.name);
          }
        }
      });

      // ... and added them to the end of the lists
      this.productsFound.push(...productsFoundByDescription);
      this.searchResults.push(...resultsDesc);
    }
  }
}
