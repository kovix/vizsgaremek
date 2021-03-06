import { Examination } from "./examination";

export interface ExaminationsInGroup {
  order: number;
  _id: string;
  examination?: Examination;
};

export class ExaminationGroup {
  _id: string = '';
  name: string = '';
  examinations?: ExaminationsInGroup[];
}
