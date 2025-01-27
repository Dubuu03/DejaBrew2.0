import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

interface CartItem {
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  cartItems: CartItem[] = []; // Will be populated from cart service
  deliveryInstructions: string = '';
  selectedDeliveryOption: string = 'standard';
  selectedPaymentMethod: string = 'gcash';
  deliveryFee: number = 45.00;
  
  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController  // Inject IonLoadingController
  ) {}

  ngOnInit() {
    // In a real app, you would get the cart items from your cart service
    this.cartItems = [
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
      }
    ];
  }

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get tax(): number {
    return this.subtotal * 0.12;
  }

  get total(): number {
    let total = this.subtotal + this.deliveryFee;
    if (this.selectedDeliveryOption === 'priority') {
      this.deliveryFee = 80.00;
    }
    else {
      this.deliveryFee = 45.00;
    }
    return total + this.tax;
  }

  selectPaymentMethod(method: string): void {
    this.selectedPaymentMethod = method;
  }

  selectDeliveryOption(option: string): void {
    this.selectedDeliveryOption = option;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }

  isValidOrder(): boolean {
    return this.cartItems.length > 0 && 
          this.selectedDeliveryOption !== '' && 
          this.selectedPaymentMethod !== '';
  }

  // Method to show loader
  async showLoader(message: string) {
    const loader = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      backdropDismiss: false 
    });
    await loader.present();
    return loader;
  }

  async reviewOrder() {
    if (!this.isValidOrder()) {
      await this.showToast('Please complete all required fields');
      return;
    }

    const orderDetails = {
      items: this.cartItems,
      deliveryOption: this.selectedDeliveryOption,
      deliveryInstructions: this.deliveryInstructions,
      paymentMethod: this.selectedPaymentMethod,
      subtotal: this.subtotal,
      deliveryFee: this.deliveryFee,
      tax: this.tax,
      total: this.total
    };

    // Show loader
    const loader = await this.showLoader('Processing your order...');
    
    setTimeout(() => {
      loader.dismiss(); 
      
      this.navCtrl.navigateForward('/order-review', {
        state: { orderDetails }
      });
    }, 3000);
  }

  // Method to format numbers as currency
  formatPrice(price: number): string {
    return `₱${price.toFixed(2)}`;
  }

  selectAddress() {
    // Navigate to address selection page
    this.navCtrl.navigateForward('/address-selection');
  }

  goBack() {
    this.navCtrl.back();
  }

  checkout() {
    this.showLoader('Processing your payment...');
    
    // Simulate payment process
    setTimeout(() => {
      window.location.href = '/payment-success';
    }, 3000);
  }
}
