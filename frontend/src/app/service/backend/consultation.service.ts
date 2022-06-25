import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addPatients(id: string, patientsArr: string[]): Observable<Consultation> {
    return this.http.patch<Consultation>(`${this.backendURL}${this.endpoint}/${id}/addpatients`, patientsArr);
  }

  updatePatient(id: string, patient: string, patientData: any): Observable<Consultation> {
    return this.http.patch<Consultation>(`${this.backendURL}${this.endpoint}/${id}/updatepatient/${patient}`, patientData);
  }

}
