import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Entity } from '../model/entity';

interface GenericFlattenObj {
  [key: string]: any;
}


@Injectable({
  providedIn: 'root'
})
export class BaseNetworkService<GenericEntity extends Entity> {
  private backendURL:string = environment.backendURL;
  public endpoint:string = '';

  constructor(public http: HttpClient) { }

  getAll(): Observable<GenericEntity[]> {
    return this.http.get<GenericEntity[]>(`${this.backendURL}${this.endpoint}`);
  }

  get(id: number): Observable<GenericEntity> {
    return this.http.get<GenericEntity>(`${this.backendURL}${this.endpoint}/${id}`);
  }

  create(entity: GenericEntity): Observable<GenericEntity> {
    return this.http.post<GenericEntity>(`${this.backendURL}${this.endpoint}`, this.normalizeDataBeforeSave(entity));
  }

  update(entity: GenericEntity): Observable<GenericEntity> {
    return this.http.patch<GenericEntity>(`${this.backendURL}${this.endpoint}/${entity.id}`, this.normalizeDataBeforeSave(entity));
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendURL}${this.endpoint}/${id}`);
  }

  flattenResponse(entity: GenericEntity, prefix: string = ''): GenericEntity {
    if (!entity) return entity;
    for (const [key, value] of Object.entries(entity)) {
      if (typeof value === 'object') {
        entity = {
          ...entity,
          ...this.flattenObject(value, key)
        }
        delete entity[key];
      }
    }
    return entity;
  }

  flattenObject(obj: GenericFlattenObj, prefix: string ): GenericFlattenObj {
    let ret: GenericFlattenObj = {};

    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object') {
        ret = {
          ...ret,
          ...this.flattenObject(value, `${prefix}.${key}`)
        }
        delete obj[key];
      } else {
        ret[`${prefix}.${key}`] = value;
      }
    }
    return ret;
  }

  normalizeDataBeforeSave(entity: GenericEntity): GenericEntity {
    for (const [key, value] of Object.entries(entity)) {
      if (key.includes('.') || typeof value === 'object') {
        delete entity[key];
      }
    }
    return entity;
  }
}
