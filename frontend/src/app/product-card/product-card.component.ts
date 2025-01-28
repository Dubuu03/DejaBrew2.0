import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../services/favorite.service'; // Import your service

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product: {
    rating: number;
    title: string;
    price: number;
    productImageUrl: string;
    favorite?: boolean;
    productId: number;
    productPath: string; 
  };

  constructor(private router: Router, private favoriteService: FavoriteService) {
    this.product = {
      rating: 0,
      title: '',
      price: 0,
      productImageUrl: '',
      favorite: false,
      productId: 0,
      productPath: '' 
    };
  }

  ngOnInit() {
    // Optionally, fetch the user's favorites on init
    this.checkIfFavorite();
  }

  toggleFavorite(product: any, event: MouseEvent) {
    event.stopPropagation();

    this.favoriteService.toggleFavorite(product.productId).subscribe(
      (response) => {
        this.product.favorite = !this.product.favorite; // Toggle locally for instant feedback
      },
      (error) => {
        console.error('Error updating favorite:', error);
      }
    );
  }

  goToProductDetail(product: any) {
    this.router.navigate([product.productPath]);
  }

  checkIfFavorite() {
    // Optionally, get the user's favorite products from the backend and update the local state
    this.favoriteService.getFavorites().subscribe(
      (response: any) => {
        this.product.favorite = response.favorites.includes(this.product.productId);
      },
      (error) => {
        console.error('Error fetching favorites:', error);
      }
    );
  }
}
