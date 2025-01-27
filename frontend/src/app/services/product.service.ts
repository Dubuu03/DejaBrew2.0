// services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Product {
  productId: number;
  title: string;
  price: number;
  rating: number;
  productImageUrl: string;
  favorite: boolean;
  productPath: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/type';  

  constructor(private http: HttpClient) {}

  getBestSellerProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:5000/api/products");
  }

  getHotProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Hot Coffee`);
  }

  getColdProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Cold Drink`);
  }

  getNonCoffeeProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Non-Coffee`);
  }

  getPastryProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Pastry`);
  }
}
