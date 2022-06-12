import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColumnStorageService {
  private _localStorage: Storage = localStorage;
  private _columnDefinitonData$ = new BehaviorSubject<string[]>([]);

  public columnDefinitonData$ = this._columnDefinitonData$.asObservable();

  constructor() { }

  setColumnVisibility(formName: string, columns: string[]) {
    const dataToSave = JSON.stringify(columns);
    this._localStorage.setItem(`${formName}_columnvisibility`, dataToSave);
    this._columnDefinitonData$.next(columns);
  }

  getColumnVisibility(formName: string) {
    const data = JSON.parse(this._localStorage.getItem(`${formName}_columnvisibility`) || '["(empty)"]');
    this._columnDefinitonData$.next(data);
  }

}
