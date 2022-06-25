import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-elapsed-time',
  templateUrl: './elapsed-time.component.html',
  styleUrls: ['./elapsed-time.component.scss']
})
export class ElapsedTimeComponent implements OnInit, OnChanges {

  @Input() value!: string | undefined;
  @Input() reference!: Date;

  public secs = 0;
  public output = '';

  constructor() { }

  ngOnInit(): void {
    this.calcValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.calcValues();
  }

  private calcValues(): void {
    if (!this.value) {
      this.output = '';
      return;
    };
    const baseDate = Math.round(new Date(this.value).getTime() / 1000);
    const referenceDate = Math.round(this.reference.getTime() / 1000);
    const elapsed = referenceDate - baseDate;

    if (elapsed < 0) {
      this.secs = 99999;
      this.output = '??:??';
    } else {
      this.secs = elapsed;
      this.output = `${String(Math.floor(elapsed / 60)).padStart(2, '0')}:${(elapsed % 60 ? String(elapsed % 60).padStart(2, '0') : '00')}`;
    }
  }


}
