import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { DataService } from 'src/app/services/data.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  user: UserLogin = {} as UserLogin;

  youArentLoggedIn: Boolean = false;
  loginFailed: Boolean = false;
  errorMessage: string = "";  

  constructor(private router: Router, private usersService: UsersService, 
    private dataService: DataService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.youArentLoggedIn = Boolean(this.activatedRoute.snapshot.queryParamMap.get('ynli'));
  }

  back() {
    this.router.navigate(['']);
  }

  login(form: any) {

    this.user.username = form.username;
    this.user.password = form.password;

    this.usersService.login(this.user).subscribe(result => {
      this.dataService.login(result, false);
    },
    error => {
      this.errorMessage = error.error;
      this.loginFailed = true;
    });

  }
}
