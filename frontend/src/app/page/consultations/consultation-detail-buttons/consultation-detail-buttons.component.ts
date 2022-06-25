import { Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-consultation-detail-buttons',
  templateUrl: './consultation-detail-buttons.component.html',
  styleUrls: ['./consultation-detail-buttons.component.scss']
})
export class ConsultationDetailButtonsComponent {

  @ViewChild('templateBottomSheet') TemplateBottomSheet!: TemplateRef<any>;

  @Input() isFullScreen: boolean = false;
  @Input() isFinishedVisible: boolean = false;

  @Output() eventOccures: EventEmitter<string> = new EventEmitter();

  constructor(
    private bottomSheet: MatBottomSheet
  ) { }

  openMobileSheet() {
    this.bottomSheet.open(this.TemplateBottomSheet);
  }


  onBtnClicked(event: string) {
    this.eventOccures.emit(event);
  }

}
