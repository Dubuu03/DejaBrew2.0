import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private apiUrl = 'http://localhost:5000/api/favorites/toggle';  // Endpoint to toggle favorite

  constructor(private http: HttpClient) {}

  // Toggle favorite status for a product
  toggleFavorite(productId: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { productId });
  }

  // Optionally: Fetch user's favorite products from backend (if needed)
  getFavorites(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/favorites');
  }
}
