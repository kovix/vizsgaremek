import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { BaseNetworkService } from '../base/base-network.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseNetworkService<Patient> {

  constructor(public override http: HttpClient,) {
    super(http);
    this.endpoint = 'patient';
  }
}
