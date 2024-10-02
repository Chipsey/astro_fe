import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacCardComponent } from './zodiac-card.component';

describe('ZodiacCardComponent', () => {
  let component: ZodiacCardComponent;
  let fixture: ComponentFixture<ZodiacCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZodiacCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
