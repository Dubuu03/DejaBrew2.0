import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private apiUrl = 'http://localhost:5000/api/signup'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Function to handle user registration
  registerUser(userData: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, userData).pipe(
      catchError((error) => {
        // Handle error
        console.error('Error during registration:', error);
        return throwError('Registration failed. Please try again.');
      })
    );
  }
}
