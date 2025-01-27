import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

interface CartItem {
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
cartItems: CartItem[] = [
  {
    name: 'Lavender Green Chill',
    type: 'Non-coffee',
    price: 180.00,
    quantity: 1,
    image: 'assets/images/Non-Coffee/Lavander Green Chill.PNG',
    size: 'Medium'
  },
  {
    name: 'Vanilla Bean Brew',
    type: 'Cold coffee',
    price: 200.00,
    quantity: 1,
    image: 'assets/images/Cold/Vanilla Bean Brew.PNG',
    size: 'Large'
  },
  {
    name: 'Berry Cool Milkshake',
    type: 'Non-coffee',
    price: 150.00,
    quantity: 2,
    image: 'assets/images/Non-Coffee/Berry Cool Milkshake.PNG',
    size: 'Small'
  },
  {
    name: 'Strawberry Blush Frost',
    type: 'Non-coffee',
    price: 185.00,
    quantity: 1,
    image: 'assets/images/Non-Coffee/Strawberry Blush Frost.PNG',
    size: 'Medium'
  },
  {
    name: 'Herbal Frost',
    type: 'Cold coffee',
    price: 170.00,
    quantity: 1,
    image: 'assets/images/Cold/Herbal Frost.PNG',
    size: 'Large'
  },
  {
    name: 'CinnaDeja Delight',
    type: 'Pastry',
    price: 90.00,
    quantity: 1,
    image: 'assets/images/Pastry/CinnaDeja Delight.PNG',
    size: 'Medium'
  }
];




  constructor(
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // You can load cart items from a service here if needed
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.12; 
  }

  get total(): number {
    return this.subtotal + this.tax;
  }

  async incrementQuantity(item: CartItem): Promise<void> {
    if (item.quantity < 10) {
      item.quantity++;
    } else {
      const toast = await this.toastController.create({
        message: 'Maximum quantity reached',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    }
  }

async decrementQuantity(item: CartItem, index: number): Promise<void> {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    // When quantity reaches 0, remove the item
    const toast = await this.toastController.create({
      message: 'Item removed from cart',
      duration: 2000,
      position: 'bottom'
    });
    this.cartItems.splice(index, 1);
    toast.present();
  }
}
viewOrders(): void {
  this.navCtrl.navigateForward('/orders');
}

  async removeItem(index: number): Promise<void> {
    this.cartItems.splice(index, 1);
    const toast = await this.toastController.create({
      message: 'Item removed from cart!',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

async clearCart(): Promise<void> {
  const toast = await this.toastController.create({
    message: 'Cart cleared!',
    duration: 2000,
    position: 'bottom'
  });
  this.cartItems = [];
  toast.present();
}

  continueShopping(): void {
    this.navCtrl.navigateBack('/menu');
  }

  checkout(): void {
    if (this.cartItems.length > 0) {
      this.navCtrl.navigateForward('/checkout');
    }
  }

    goToHome() {
    window.location.href = '/home';
  }
    goBack() {
    window.history.back();
  }

}