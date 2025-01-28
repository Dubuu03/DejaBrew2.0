import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Interface for the login response
interface LoginResponse {
  message: string;
  user: {
    id: string;
    username: string;
    email: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private readonly SESSION_KEY = 'user_session';

  constructor(private http: HttpClient) { }

  signup(userData: { email: string, username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData, { withCredentials: true });
  }

  login(userData: { email: string, password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData, { withCredentials: true })
      .pipe(
        tap(response => {
          sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(response.user));
        })
      );
  }

  getUsername(): Observable<{ username: string }> {
    return this.http.get<{ username: string }>(`${this.apiUrl}/api/get-username`, { 
      withCredentials: true 
    });
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.SESSION_KEY) !== null;
  }

  logout(): Observable<any> {
    sessionStorage.removeItem(this.SESSION_KEY);
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  getUserFromSession(): LoginResponse['user'] | null {
    const userData = sessionStorage.getItem(this.SESSION_KEY);
    return userData ? JSON.parse(userData) : null;
  }
}