import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationUpdateAdminComponent } from './location-update-admin.component';

describe('LocationUpdateAdminComponent', () => {
  let component: LocationUpdateAdminComponent;
  let fixture: ComponentFixture<LocationUpdateAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationUpdateAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationUpdateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
