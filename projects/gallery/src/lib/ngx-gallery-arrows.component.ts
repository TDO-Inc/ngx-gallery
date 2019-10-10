import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ngx-gallery-arrows',
  template: `
    <div class="ngx-gallery-arrow-wrapper ngx-gallery-arrow-left">
      <div
        class="ngx-gallery-icon ngx-gallery-arrow"
        aria-hidden="true"
        (click)="handlePrevClick()"
        [class.ngx-gallery-disabled]="prevDisabled"
      >
        <i class="ngx-gallery-icon-content {{ arrowPrevIcon }}"></i>
      </div>
    </div>
    <div class="ngx-gallery-arrow-wrapper ngx-gallery-arrow-right">
      <div
        class="ngx-gallery-icon ngx-gallery-arrow"
        aria-hidden="true"
        (click)="handleNextClick()"
        [class.ngx-gallery-disabled]="nextDisabled"
      >
        <i class="ngx-gallery-icon-content {{ arrowNextIcon }}"></i>
      </div>
    </div>
  `,
  styleUrls: ['./ngx-gallery-arrows.component.scss']
})
export class NgxGalleryArrowsComponent {
  @Input() prevDisabled: boolean;
  @Input() nextDisabled: boolean;
  @Input() arrowPrevIcon: string;
  @Input() arrowNextIcon: string;

  @Output() prevClick = new EventEmitter();
  @Output() nextClick = new EventEmitter();

  handlePrevClick(): void {
    this.prevClick.emit();
  }

  handleNextClick(): void {
    this.nextClick.emit();
  }
}
