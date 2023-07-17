import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerAddressService } from './server-address.service';
import { Observable } from 'rxjs'
import { Address } from '../interfaces/Address';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  private SERVER: string = "";

  constructor(private _client: HttpClient, private server: ServerAddressService) {

    this.SERVER = server.getServerAddress();
  }

  // GET (read)
  getAddresses(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/addresses`);
  }

  getRegions(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/regions`);
  }

  getAddress(id: number): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/addresses/${id}`);
  }

  // POST (create)
  postAddress(address: Address): Observable<any> {
    return this._client.post(`${this.SERVER}/addresses`, address);
  }

  // PUT (update)
  putAddress(id: number, address: Address): Observable<any> {
    return this._client.put(`${this.SERVER}/addresses/${id}`, address);
  }

  // DELETE (delete)
  deleteAddress(id: number): Observable<any> {
    return this._client.delete(`${this.SERVER}/addresses/${id}`)
  }
}
