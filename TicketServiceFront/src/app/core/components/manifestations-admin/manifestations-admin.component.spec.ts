import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestationsAdminComponent } from './manifestations-admin.component';

describe('ManifestationsAdminComponent', () => {
  let component: ManifestationsAdminComponent;
  let fixture: ComponentFixture<ManifestationsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManifestationsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifestationsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
