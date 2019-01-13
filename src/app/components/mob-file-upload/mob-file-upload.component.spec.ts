import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobFileUploadComponent } from './mob-file-upload.component';

describe('MobFileUploadComponent', () => {
  let component: MobFileUploadComponent;
  let fixture: ComponentFixture<MobFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
