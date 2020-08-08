import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private subject = new Subject<any>();

  constructor() { }

  sendMessage(message: string) {
    this.subject.next({message: message});
  }

  getMessage():Observable<any>{
    return this.subject.asObservable();
  }

  cleanup(subscription: any) {
    subscription.unsubscribe();
  }

}
