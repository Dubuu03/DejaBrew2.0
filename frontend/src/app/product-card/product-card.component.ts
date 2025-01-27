import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product: {
    rating: number;
    title: string;
    price: number;
    productImageUrl: string;
    favorite?: boolean;
    productId: number;
    productPath: string; 
  };

  constructor(private router: Router) {
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


  toggleFavorite(product: any, event: MouseEvent) {
    event.stopPropagation();
    this.product.favorite = !this.product.favorite;
  }

  goToProductDetail(product: any) {
      this.router.navigate([product.productPath]);
  }
}
