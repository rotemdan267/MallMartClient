import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerAddressService } from './server-address.service';
import { Observable } from 'rxjs';
import { UserImage } from '../interfaces/UserImage';

@Injectable({
  providedIn: 'root'
})
export class UserImagesService {

  private SERVER: string = "";
  
  constructor(private _client: HttpClient, private server: ServerAddressService) { 
    this.SERVER = server.getServerAddress();
  }

  // GET (read)
  getUserImages(): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/userImages`);
  }

  getUserImage(id: number): Observable<any> {
    return this._client.get<Observable<any>>(`${this.SERVER}/userImages/${id}`);
  }

  // POST (create)
  postUserImage(userImage: UserImage): Observable<any> {
    return this._client.post(`${this.SERVER}/userImages`, userImage);
  }

  // PUT (update)
  putUserImage(id: number, userImage: UserImage): Observable<any> {
    return this._client.put(`${this.SERVER}/userImages/${id}`, userImage);
  }

  // DELETE (delete)
  deleteUserImage(id: number): Observable<any> {
    return this._client.delete(`${this.SERVER}/userImages/${id}`)
  }
}
