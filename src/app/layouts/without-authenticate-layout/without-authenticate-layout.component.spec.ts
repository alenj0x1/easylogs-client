import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithoutAuthenticateLayoutComponent } from './without-authenticate-layout.component';

describe('WithoutAuthenticateLayoutComponent', () => {
  let component: WithoutAuthenticateLayoutComponent;
  let fixture: ComponentFixture<WithoutAuthenticateLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithoutAuthenticateLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithoutAuthenticateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
