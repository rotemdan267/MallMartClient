import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeFunction = new EventEmitter();    
  subsVar: Subscription = {} as Subscription;

  constructor() { }

  onSearchClick() {
    this.invokeFunction.emit();    
  } 
}
