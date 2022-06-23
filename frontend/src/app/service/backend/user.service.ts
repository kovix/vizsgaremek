import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/model/user';
import { BaseNetworkService } from '../base/base-network.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseNetworkService<User> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'user';
  }
}
