import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service'; // Import ProductService
import { ProfileComponent } from '../profile/profile.component';
import { fetchAndMapProducts } from '../services/product-utils.service';

// Define Product interface
interface Product {
  productId: number;
  title: string;
  price: number;
  rating: number;
  productImageUrl: string;
  favorite: boolean;
  productPath: string; 
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  
  slidesPerView: number = 2.2;  // Default value for larger screens

  // Declare arrays to hold the products
  bestSellerProducts: Product[] = [];
  hotProducts: Product[] = [];
  coldProducts: Product[] = [];
  nonCoffeeProducts: Product[] = [];
  pastryProducts: Product[] = [];
  highestRatedProducts: { [key: string]: any } = {};

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController, 
    private router: Router,
    private productService: ProductService // Inject ProductService
  ) {}

  ngOnInit() {
    this.updateSlidesPerView();
    this.loadAllProducts(); // Fetch products on component init
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const element = document.querySelector('.some-element');
      if (element) {
        element.remove(); // Safely remove the element if it exists
      } else {
        console.warn('Element not found.');
      }
    }, 0); // Defer the operation to ensure the view is fully rendered
  }

  // Adjust the number of slides shown based on window size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateSlidesPerView();
  }

  updateSlidesPerView() {
    if (window.innerWidth >= 768) {
      this.slidesPerView = 2.1;
    } else if (window.innerWidth >= 650) {
      this.slidesPerView = 1.8;
    } else if (window.innerWidth >= 520) {
      this.slidesPerView = 1.4;
    } else {
      this.slidesPerView = 1.1;
    }
  }

  // Toggle favorite state and show toast notification
  toggleFavorite(product: Product, event: Event) {
    event.stopPropagation();  
    product.favorite = !product.favorite;  
    this.showFavoriteToast(product.favorite);  

  }

  async showFavoriteToast(isFavorited: boolean) {
    const message = isFavorited ? 'Added to favorites!' : 'Removed from favorites!';
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // Method to handle product click and navigate to details
  goToProductDetails(product: Product) {
    this.router.navigate([product.productPath]);
  }

  // Handle slide indexes for the product grid
  getSlideIndexes(products: Product[], productsPerSlide: number) {
    return Array.from({ length: Math.ceil(products.length / productsPerSlide) }, (_, i) => i * productsPerSlide);
  }

  // Navigate to different pages
  goToNotifications() {
    window.location.href = '/notifications';
  }

  goToFavorites() {
    window.location.href = '/favorites';
  }

  goToCart() {
    window.location.href = '/cart';
  }

  // Open Profile modal
  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent
    });
    return await modal.present();
  }

   loadAllProducts(): void {
    fetchAndMapProducts(this.productService, 'getBestSellerProducts', this.bestSellerProducts, 6, this.highestRatedProducts);
    fetchAndMapProducts(this.productService, 'getHotProducts', this.hotProducts, 6, this.highestRatedProducts);
    fetchAndMapProducts(this.productService, 'getColdProducts', this.coldProducts, 6, this.highestRatedProducts);
    fetchAndMapProducts(this.productService, 'getNonCoffeeProducts', this.nonCoffeeProducts, 6, this.highestRatedProducts);
    fetchAndMapProducts(this.productService, 'getPastryProducts', this.pastryProducts, 6, this.highestRatedProducts);
  }
}