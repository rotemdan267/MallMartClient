import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { ServerAddressService } from './server-address.service';
import { Category } from '../interfaces/Category'

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private SERVER: string = '';

  constructor(private _client: HttpClient, private server: ServerAddressService) {

    this.SERVER = server.getServerAddress();
  }


  // GET (read)
  getCategories(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/categories`);
  }

  getCategory(id: number): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/categories/${id}`);
  }

  // POST (create)
  postCategory(category: Category): Observable<any> {
    return this._client.post(`${this.SERVER}/categories`, category);
  }

  // PUT (update)
  putCategory(id: number, category: Category): Observable<any> {
    return this._client.put(`${this.SERVER}/categories/${id}`, category);
  }

  // DELETE (delete)
  deleteCategory(id: number): Observable<any> {
    return this._client.delete(`${this.SERVER}/categories/${id}`)
  }
}
