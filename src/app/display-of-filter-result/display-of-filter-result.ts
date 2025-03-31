import {Component, Input} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'display-of-filter-result',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './display-of-filter-result.html',
  styleUrl: './display-of-filter-result.scss'
})
export class DisplayOfFilterResult {
  @Input() objects: (number | string)[] = [];
  @Input() filter: string = '';

  get filteredObjects(): (number | string)[] {
    return this.objects.filter(obj =>
      obj.toString().toLowerCase().includes(this.filter.toLowerCase())
    );
  }
}
