import { ConsultationDetail } from "./consultation-detail";
import { ExaminationGroup, ExaminationsInGroup } from "./examination-group";
import { Log } from "./log";
import { User } from "./user";

export class Consultation {
  _id: string = '';
  name: string = '';
  startDate: string = '';
  doctor?: string | User;
  groupId?: string | ExaminationGroup;
  examinations: ExaminationsInGroup[] = [];
  consultationDetails: ConsultationDetail[] = [];
  log: Log[] = [];
}
