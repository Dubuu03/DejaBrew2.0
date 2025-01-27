import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  @Input() activeIndex: number = 0;  // Accept active index from parent
  @Input() setActiveIndex!: Function;  // A function to update active index

  constructor(private router: Router) {}

  // Handle click on each list item to update active state and navigate
  goToPage(index: number, route: string) {
    this.activeIndex = index;  // Update active index
    this.setActiveIndex(this.activeIndex);  // Update active index in parent component
    this.router.navigate([route]);  // Navigate to the corresponding route
  }

  calculateIndicatorPosition(): number {
    const basePosition = 10; // Starting position for the first item
    const itemWidth = 90; // Width of each list item
    return basePosition + this.activeIndex * itemWidth;
  }
}
