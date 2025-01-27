import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
})
export class OnboardingPage implements OnInit, OnDestroy {
  @ViewChild('swiperContainer', { static: false }) swiperContainer?: ElementRef;

  slideInterval = 7000;
  private timer: any;
  private currentIndex = 0;
  private manualSlide = false; 

  constructor() {}

  ngOnInit() {
    this.startAutoSlide();  
  }

  ngOnDestroy() {
    this.stopAutoSlide(); 
  }

  // Start the automatic slide 
  startAutoSlide() {
    if (!this.manualSlide) {  
      this.timer = setInterval(() => this.moveToNextSlide(), this.slideInterval);
    }
  }

  // Stop the automatic slide 
  stopAutoSlide() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null; 
    }
  }

  // Move to the next slide
  moveToNextSlide() {
    if (this.swiperContainer) {
      const swiperSlides = this.swiperContainer.nativeElement.querySelectorAll('swiper-slide');
      if (swiperSlides.length > 0) {
        this.currentIndex = (this.currentIndex + 1) % swiperSlides.length;
        this.swiperContainer.nativeElement.swiper.slideTo(this.currentIndex);
      }
    }
  }

  // Swiper initialization handler
  onSwiper(swiper: any) {
    console.log('Swiper initialized:', swiper);
  }

  onSlideChange(event: any) {
    console.log('Slide changed:', event);
    this.currentIndex = event.activeIndex;
    this.stopAutoSlide();
    this.manualSlide = true;
  }
}
