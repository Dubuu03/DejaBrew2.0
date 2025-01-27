import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000'; // URL for backend

  constructor(private http: HttpClient) { }

  // Signup method (Change to POST)
  signup(userData: { email: string, username: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, userData); 
  }

  // Login method (Change to POST)
  login(userData: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData); 
  }
}
