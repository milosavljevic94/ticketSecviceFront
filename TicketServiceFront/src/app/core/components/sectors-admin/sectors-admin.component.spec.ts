import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorsAdminComponent } from './sectors-admin.component';

describe('SectorsAdminComponent', () => {
  let component: SectorsAdminComponent;
  let fixture: ComponentFixture<SectorsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
