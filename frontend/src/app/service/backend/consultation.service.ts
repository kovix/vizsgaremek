import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from 'src/app/model/consultation';
import { BaseNetworkService } from '../base/base-network.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService extends BaseNetworkService<Consultation> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'consultation';
  }
}
