import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { DisplayOfFilterResult } from './display-of-filter-result/display-of-filter-result';
import { NgIf } from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, DisplayOfFilterResult, NgIf, AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should generate the first set of objects', () => {

    component.generateObjects();

    expect(component.allObjects.length).toBe(10); // chunkSize = 10
    expect(component.visibleObjects.length).toBe(10);
    expect(component.isFirstGeneration).toBeFalse();
  });

  it('should generate objects with divisor replacement', () => {
    component.replacementText = 'ddd';
    component.replaceDivisor = '3';

    component.generateObjects();

    expect(component.allObjects[2]).toBe('ddd'); // 3rd element (index 2) should be replaced
    expect(component.allObjects[5]).toBe('ddd'); // 6th element (index 5) should be replaced
  });

  it('should not replace numbers if divisor is invalid', () => {
    component.replacementText = 'ddd';
    component.replaceDivisor = ''; // No divisor set

    component.generateObjects();

    expect(component.allObjects).toContain(3); // 3 should NOT be replaced
    expect(component.allObjects).toContain(6);
  });

  it('should move to previous set when "Back" is clicked', () => {
    component.generateObjects();
    component.generateObjects(); // Two sets of 10 -> total 20
    expect(component.currentIndex).toBe(10); // Should be at second set

    component.goBackPrevious();

    expect(component.currentIndex).toBe(0); // Should go back to first set
    expect(component.visibleObjects.length).toBe(10);
  });

  it('should not go back beyond the first set', () => {
    component.generateObjects();

    component.goBackPrevious();

    expect(component.currentIndex).toBe(0); // Should stay at first set
  });
});
