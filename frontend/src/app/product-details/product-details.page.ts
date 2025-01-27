// product-details.page.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  product: Product | null = null;
  quantity: number = 1;
  selectedMemory: string = 'Ecstatic';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {

    const productId = this.route.snapshot.paramMap.get('id');
    
    this.product = {
      id: '1',
      name: 'Lavender Green Chill',
      type: 'Non-coffee',
      price: 180.00,
      image: 'assets/images/productdetails/lavander.png',
      description: 'A unique blend of herbal lavender and earthy green matcha'
    };
  }

  getSize(memory: string): string {
    switch (memory) {
      case 'Melancholia': return 'Small';
      case 'Nostalgia': return 'Medium';
      case 'Euphoric': return 'Large';
      default: return 'Medium';
    }
  }

  selectMemory(memory: string) {
    this.selectedMemory = memory;
  }

  incrementQuantity() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }


  async addToCart() {
    if (!this.product) return;

    const cartItem = {
      ...this.product,
      quantity: this.quantity,
      size: this.getSize(this.selectedMemory)
    };

    // Here you would typically add the item to your cart service
    console.log('Adding to cart:', cartItem);

    const toast = await this.toastController.create({
      message: `${this.quantity} ${this.product.name} added to cart`,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

    goBack() {
    this.navCtrl.back();
  }
  goToCart() {
    window.location.href = '/cart';
  }

}