import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {DisplayOfFilterResult} from './display-of-filter-result/display-of-filter-result';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DisplayOfFilterResult, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  replacementText: string = '';
  replaceDivisor: string ='';
  filterText: string = '';
  allObjects: (number | string)[] = [];
  visibleObjects: (number | string)[] = [];
  isFirstGeneration: boolean = true;
  chunkSize: number = 10;
  currentIndex = 0;

  private counter = 1;


  generateObjects(): void {
    const divisor = this.replaceDivisor ? Number(this.replaceDivisor) : 0;
    const newObjects = Array.from({ length: this.chunkSize }, () => {
      const value = this.counter++;
      return divisor > 0 && value % divisor === 0
        ? this.replacementText
        : value;
    });

    this.allObjects = [...this.allObjects, ...newObjects];
    this.currentIndex = this.allObjects.length - this.chunkSize; // Move index forward

    this.updateVisibleObjects();
    this.isFirstGeneration = false;
  }

  goBackPrevious(): void {
    if (this.currentIndex - this.chunkSize >= 0) {
      this.currentIndex -= this.chunkSize;
    } else {
      this.currentIndex = 0;
    }
    this.updateVisibleObjects();
  }

  updateVisibleObjects(): void {
    this.visibleObjects = this.allObjects.slice(this.currentIndex, this.currentIndex + this.chunkSize);
  }
}
