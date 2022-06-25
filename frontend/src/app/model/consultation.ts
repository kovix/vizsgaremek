import { ExaminationGroup, ExaminationsInGroup } from "./examination-group";
import { Log } from "./log";
import { Patient } from "./patient";
import { User } from "./user";

export interface iPatientEditData {
  id: string,
  data: IConsultationDetail,
}
export interface IPatientConsultation {
  examinationID: string; //will never be pupulated!
  required: boolean;
  startedAt?: string;
  finishedAt?: string;
  callRequired: boolean;
}

export interface IConsultationDetail {
  patient?: Patient;
  comment: string;
  arrived?: string;
  leaved?: string;
  lastUpdated?: string;
  patientConsultations: IPatientConsultation[];
}
export class Consultation {
  _id: string = '';
  name: string = '';
  startDate: string = '';
  doctor?: string | User;
  groupId?: string | ExaminationGroup;
  examinations: ExaminationsInGroup[] = [];
  logEntries: Log[] = [];
  details: IConsultationDetail[] = [];
  closed: boolean = false;
}
