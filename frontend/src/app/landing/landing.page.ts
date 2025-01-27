import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements AfterViewInit {
  constructor(private router: Router) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.router.navigate(['/onboarding']);
    }, 3000); 
  }
}
