import { Injectable } from '@angular/core';

interface CartItem {
  name: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];

  constructor() {}

  getItems(): CartItem[] {
    return this.cartItems;
  }

  addItem(item: CartItem): void {
    const existingItem = this.cartItems.find(
      (cartItem) => cartItem.name === item.name && cartItem.size === item.size
    );

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity > 0) {
      this.cartItems[index].quantity = quantity;
    } else {
      this.cartItems.splice(index, 1);
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
