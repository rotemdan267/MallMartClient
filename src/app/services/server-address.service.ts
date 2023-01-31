import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerAddressService {

  private readonly SERVER: string = 'https://localhost:7222/api';

  constructor() { }

  getServerAddress() {
    
    return this.SERVER;
  }
}
