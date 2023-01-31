import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerAddressService } from './server-address.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/User';
import { UserLogin } from '../interfaces/UserLogin';
import { Customer } from '../interfaces/Customer';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private SERVER: string = "";
  jwtToken: string = '';

  constructor(private _client: HttpClient, private server: ServerAddressService, private dataService: DataService) {
    this.SERVER = this.server.getServerAddress();
    this.dataService.jwt.subscribe(res => this.jwtToken = res);
  }

  // GET (read)
  getUsers(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/users`);
  }

  getCustomers(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const requestOptions = { headers: headers };
    return this._client.get<Observable<any>>(`${this.SERVER}/customers`, requestOptions);
  }

  getUser(id: number): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/users/${id}`);
  }

  getCustomer(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const requestOptions = { headers: headers };
    return this._client.get<Observable<any>>(`${this.SERVER}/customers/${id}`, requestOptions);
  }

  // POST (create)
  postUser(user: User): Observable<any> {
    return this._client.post(`${this.SERVER}/users`, user);
  }

  postCustomer(customer: Customer): Observable<any> {
    return this._client.post(`${this.SERVER}/customers`, customer).pipe()
  }

  login(user: UserLogin): Observable<any> {
    return this._client.post(`${this.SERVER}/login`, user);
  }

  // PUT (update)
  putUser(id: number, user: User): Observable<any> {
    return this._client.put(`${this.SERVER}/users/${id}`, user);
  }

  putCustomer(id: number, customer: Customer): Observable<any> {
    return this._client.put(`${this.SERVER}/customers/${id}`, customer);
  }

  // DELETE (delete)
  deleteUser(id: number): Observable<any> {
    return this._client.delete(`${this.SERVER}/users/${id}`)
  }
}
