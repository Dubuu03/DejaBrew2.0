import { Component } from '@angular/core';
import { AuthService } from '../services/authService.service';  // Import the AuthService
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';  // Import ToastController and LoadingController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = ''; 
  password: string = '';
  showPassword: boolean = false;
  isModalVisible: boolean = false;
  platform: string = '';
  platformLogo: string = '';
  platformColor: string = '';
  isLoading: boolean = false;  

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastController: ToastController,  
    private loadingController: LoadingController
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Function to show toast messages
  async showToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      color: color,
      position: 'bottom', 
      // cssClass: 'toast-custom'
    });
    toast.present();
  }

  async presentLoader() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'circles', 
    });
    await loading.present();
    return loading;  
  }

  proceed() {
    if (this.username && this.password) {
      // object with the login details 
      const userDetails = { email: this.username, password: this.password };

      console.log('Entered Username:', this.username);
      console.log('Entered Password:', this.password);


      this.presentLoader().then((loading) => {

      this.authService.login(userDetails).subscribe(
        (response: any) => { 
          if (response && response.message === 'Login successful') {
            console.log('Login successful:', response);

            this.showToast('Login successful!', 'success');
            window.location.href = '/home';  
          } else {
            // Handle invalid login case
            console.error('Login failed:', response);
            this.showToast('Invalid username or password', 'danger');
          }
          loading.dismiss();  
        },
        (error) => {
          console.error('Login failed:', error);

          if (error.status === 401) {
            this.showToast('Incorrect password. Please try again.', 'danger');
          } else if (error.status === 404) {
            this.showToast('Email not found. Please check your email.', 'danger');
          } 
          else {
            this.showToast('An error occurred. Please try again.', 'danger');
          }

          loading.dismiss();  
        }
      );

      });
    } else {
      console.error('Username and password are required');
      this.showToast('Username and password are required', 'danger');
    }
  }

  // Show modal for social login
  openModal(platform: string) {
    this.platform = platform;
    this.isModalVisible = true;
    this.setModalDetails(platform);
  }

  // Set details for modal based on selected platform
  setModalDetails(platform: string) {
    switch (platform) {
      case 'facebook.com':
        this.platformLogo = 'logo-facebook';
        this.platformColor = '#1877F2';
        break;
      case 'instagram.com':
        this.platformLogo = 'logo-instagram';
        this.platformColor = '#C13584';
        break;
      case 'google.com':
        this.platformLogo = 'logo-google';
        this.platformColor = '#DB4437';
        break;
      default:
        this.platformLogo = '';
        this.platformColor = '';
    }
  }

  // Dismiss the modal
  dismissModal() {
    this.isModalVisible = false;
  }
}
