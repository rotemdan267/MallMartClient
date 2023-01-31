import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn = false;
  username: string = "Guest";
  authorization: string = '';

  constructor(private dataService: DataService, private router: Router) {

    this.dataService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res.isLoggedIn;
      this.username = res.username;
      this.authorization = res.authorization;
    });
  }

  ngOnInit(): void {
  }

  goToCart() {

    if (!this.isLoggedIn) {
      this.router.navigate(['login'], { queryParams: { 'ynli': true } }); // ynli = you not loggen in
      return;
    }
    else if (this.authorization == "Customer") {
      this.router.navigate(['cart']);
    }
    else alert("Log in as a customer to shop");
  }

  goToCustoemrPage() {

    if (!this.isLoggedIn) {
      this.router.navigate(['login']);
      return;
    }
    else if (this.authorization == "Customer") {
      this.router.navigate(['customer-page']);
    }
    else this.router.navigate(['admin-homepage']);
  }
}
