import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExaminationGroup } from 'src/app/model/examination-group';
import { BaseNetworkService } from '../base/base-network.service';
@Injectable({
  providedIn: 'root'
})
export class ExaminationGroupService extends BaseNetworkService<ExaminationGroup> {

  constructor(public override http: HttpClient) {
    super(http);
    this.endpoint = 'examinationgroup';
  };

  addExaminations(id: string, examinations: string[]): Observable<ExaminationGroup> {
    return this.http.patch<ExaminationGroup>(`${this.backendURL}${this.endpoint}/addexaminations/${id}`, examinations);
  };

  saveNewOrder(id: string, examinations: string[]): Observable<ExaminationGroup> {
    return this.http.patch<ExaminationGroup>(`${this.backendURL}${this.endpoint}/savereorder/${id}`, examinations);
  };

  removeExamination(id: string, examinationId: string): Observable<ExaminationGroup> {
    return this.http.patch<ExaminationGroup>(`${this.backendURL}${this.endpoint}/removeexaminations/${id}/${examinationId}`, '');
  }

}
