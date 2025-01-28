import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';  // Import the AuthService
import { ToastController, LoadingController } from '@ionic/angular';  // Import ToastController and LoadingController

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  isLoading: boolean = false;  // For loader control

  // Error messages for each field
  errorMessages = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private toastController: ToastController,  // Inject ToastController
    private loadingController: LoadingController  // Inject LoadingController
  ) {}

  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'confirmPassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  // Function to show toast messages
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      color: color,
      position: 'bottom', 
    });
    toast.present();
  }

  // Show loader while waiting for the signup process
  async presentLoader() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'circles',  
    });
    await loading.present();
    return loading;  
  }

  // Clear error messages before signup attempt
  clearErrors() {
    this.errorMessages = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  }

  onSignup() {
    this.clearErrors();  // Reset errors before new validation

    // Validate inputs
    let isValid = true;

    if (!this.username) {
      this.errorMessages.username = 'Username is required.';
      isValid = false;
    }

    if (!this.email) {
      this.errorMessages.email = 'Email is required.';
      isValid = false;
    }

    if (!this.password) {
      this.errorMessages.password = 'Password is required.';
      isValid = false;
    }

    if (!this.confirmPassword) {
      this.errorMessages.confirmPassword = 'Confirm password is required.';
      isValid = false;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessages.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
    };

    this.presentLoader().then((loading) => {
      // Call signup method from AuthService
      this.authService.signup(userData).subscribe({
        next: (response: any) => {
          console.log('Signup successful:', response);
          this.showToast('Signup successful! Please log in.', 'success');
          this.router.navigate(['/login']);
          loading.dismiss();  
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessages.email = 'Invalid email. Please enter a valid email.';
          } else if (error.status === 402) {
            this.errorMessages.username = 'Username already exists. Please choose another username.';
          } else if (error.status === 409) {
            this.errorMessages.email = 'Email already exists. Please choose another email.';
          } else {
            console.error('Signup error:', error);
            this.showToast('An error occurred during signup.', 'danger');
          }
          loading.dismiss(); 
        },
      });
    });
  }
}
