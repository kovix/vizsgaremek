import { Examination } from "./examination";
import { Patient } from "./patient";

export class ConsultationDetail {
  _id: string = "";
  patientId?: string | Patient;
  examinationID?: string | Examination;
  required: boolean = false;
  startedAt?: string;
  finishedAt?: string;
  requiredForCall: boolean = false;
  createdAt: string = '';
  updatedAt: string = '';
}
