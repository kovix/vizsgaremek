import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, Renderer2, Inject } from '@angular/core';

@Component({
  selector: 'app-consultation-details',
  templateUrl: './consultation-details.component.html',
  styleUrls: ['./consultation-details.component.scss']
})
export class ConsultationDetailsComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    debugger;
    this.renderer.addClass(this.document.body, 'setalo-body');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'setalo-body');
  }

}
