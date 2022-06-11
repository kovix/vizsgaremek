import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarTogglerService {

  private togglerFunc = new Subject();
  public togglerFired$ = this.togglerFunc.asObservable();

  constructor() { }

  fireTogger(){
    this.togglerFunc.next(true);
  }
}
