import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Examination } from 'src/app/model/examination';
import { BaseNetworkService } from '../base/base-network.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService extends BaseNetworkService<Examination> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'examination';
  }
}
