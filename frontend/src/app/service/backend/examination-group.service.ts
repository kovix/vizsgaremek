import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExaminationGroup } from 'src/app/model/examination-group';
import { BaseNetworkService } from '../base/base-network.service';

@Injectable({
  providedIn: 'root'
})
export class ExaminationGroupService extends BaseNetworkService<ExaminationGroup> {

  constructor(public override http: HttpClient) {
    super(http);
    this.endpoint = 'examinationgroup';
  }
}
