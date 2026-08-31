import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSelector } from './text-selector.component';

describe('IdSelector', () => {
  let component: TextSelector;
  let fixture: ComponentFixture<TextSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(TextSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
