interface ExaminationsInGroup {
  order: number;
  _id: string;
};

export class ExaminationGroup {
  _id: string = '';
  name: string = '';
  examinations?: ExaminationsInGroup[];
}
