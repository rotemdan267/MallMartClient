import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerAddressService } from './server-address.service';
import { Observable } from 'rxjs'
import { Order } from '../interfaces/Order';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private SERVER: string = "";
  jwtToken: string = '';

  constructor(private _client: HttpClient, private dataService: DataService, private server: ServerAddressService) {
    this.SERVER = this.server.getServerAddress();
    this.dataService.jwt.subscribe(res => this.jwtToken = res);
  }


  // GET (read)
  getOrders(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/orders`);
  }

  getOrdersByCustomerId(id: number): Observable<any> {
    let param: any = { 'custId': id };
    return this._client.get<Observable<any>>(`${this.SERVER}/orders`, { params: param });
  }

  getOrder(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const requestOptions = { headers: headers };
    return this._client.get<Observable<any>>(`${this.SERVER}/orders/${id}`, requestOptions);
  }

  // POST (create)
  postOrder(order: Order): Observable<any> {
    return this._client.post(`${this.SERVER}/orders`, order);
  }

  // PUT (update)
  putOrder(id: number, order: Order): Observable<any> {
    return this._client.put(`${this.SERVER}/orders/${id}`, order);
  }

  // DELETE (delete)
  deleteOrder(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    const requestOptions = { headers: headers };
    return this._client.delete(`${this.SERVER}/orders/${id}`, requestOptions)
  }

}
