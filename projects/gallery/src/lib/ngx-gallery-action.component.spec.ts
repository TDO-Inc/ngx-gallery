import { ComponentFixture, TestBed } from '@angular/core/testing';
import {} from 'jasmine';
import { NgxGalleryActionComponent } from '../';

describe('NgxGalleryActionComponent', () => {
  let fixture: ComponentFixture<NgxGalleryActionComponent>;
  let comp: NgxGalleryActionComponent;
  let el;
  let icon;
  let iconContent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxGalleryActionComponent]
    });

    fixture = TestBed.createComponent(NgxGalleryActionComponent);
    comp = fixture.componentInstance;
    comp.icon = 'test';

    fixture.detectChanges();

    el = fixture.debugElement.nativeElement;
    icon = el.querySelector('.ngx-gallery-icon');
    iconContent = el.querySelector('.ngx-gallery-icon-content');
  });

  it('should emit event clicked after click', () => {
    spyOn(comp.clicked, 'emit');
    icon.click();
    expect(comp.clicked.emit).toHaveBeenCalled();
  });

  it('should not emit event clicked after click if action is disabled', () => {
    comp.disabled = true;
    spyOn(comp.clicked, 'emit');
    icon.click();
    expect(comp.clicked.emit).not.toHaveBeenCalled();
  });

  it('should set icon class', () => {
    comp.disabled = true;
    fixture.detectChanges();

    expect(iconContent.classList.contains('test')).toBeTruthy();
  });
});
