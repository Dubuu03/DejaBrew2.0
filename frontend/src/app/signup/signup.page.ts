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

onSignup() {
  if (!this.username || !this.email || !this.password || !this.confirmPassword) {
    this.showToast('All fields are required.', 'danger');
    return;
  }

  if (this.password !== this.confirmPassword) {
    this.showToast('Passwords do not match.', 'danger');
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
        if (error.status===400){
          this.showToast('Invalid email. Please enter a valid email.', 'danger');
        }
        else if(error.status===402){
          this.showToast('Username already exists. Please choose another username.', 'danger');
        }
        else if(error.status === 409) {
          this.showToast('Email already exists. Please choose another email.', 'danger');
        } 
        else{
          console.error('Signup error:', error);
          this.showToast('An error occurred during signup.', 'danger');
        }
        loading.dismiss(); 
      },
    });
  });
}
}
