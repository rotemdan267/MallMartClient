import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ServerAddressService } from '../services/server-address.service'
import { Product } from '../interfaces/Product'


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private SERVER: string = "";

  constructor(private _client: HttpClient, private server: ServerAddressService) {

    this.SERVER = server.getServerAddress();
  }

  // GET (read)
  getProducts(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/products`);
  }

  getProduct(id: number): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/products/${id}`);
  }

  getProductsFiltered(filterBy: string): Observable<any> {
      const headers = new HttpHeaders({
        'filterBy': filterBy
      });
      const requestOptions = { headers: headers };
      return this._client.get<Observable<any>>(`${this.SERVER}/products/filtered`, requestOptions);
  }

  // POST (create)
  postProduct(product: Product): Observable<any> {
    return this._client.post(`${this.SERVER}/products`, product);
  }

  // PUT (update)
  putProduct(id: number, product: Product): Observable<any> {
    return this._client.put(`${this.SERVER}/products/${id}`, product);
  }

  // DELETE (delete)
  deleteProduct(id: number): Observable<any> {
    return this._client.delete(`${this.SERVER}/products/${id}`)
  }
}
