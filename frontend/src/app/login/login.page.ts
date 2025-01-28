import { Component } from '@angular/core';
import { AuthService } from '../services/authService.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  credentials: LoginCredentials = {
    email: '',
    password: ''
  };
  showPassword: boolean = false;
  isModalVisible: boolean = false;
  platform: string = '';
  platformLogo: string = '';
  platformColor: string = '';
  isLoading: boolean = false;
  isError: boolean = false;
  message: string = '';
  emailError: string = ''; // Variable to hold email error message
  passwordError: string = ''; // Variable to hold password error message

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    // Check if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom',
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await toast.present();
  }

  private async presentLoader() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      spinner: 'circles',
      backdropDismiss: false
    });
    await loading.present();
    return loading;
  }

  private validateInput(): boolean {
    let valid = true;

    // Reset error messages
    this.emailError = '';
    this.passwordError = '';

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.credentials.email) {
      this.emailError = 'Email is required';
      valid = false;
    } else if (!emailRegex.test(this.credentials.email)) {
      this.emailError = 'Please enter a valid email address';
      valid = false;
    }

    // Validate password
    if (!this.credentials.password) {
      this.passwordError = 'Password is required';
      valid = false;
    }

    return valid;
  }

async proceed() {
  // Reset error messages
  this.emailError = '';
  this.passwordError = '';

  if (!this.validateInput()) return;

  const loader = await this.presentLoader();

  try {
    const response = await this.authService.login(this.credentials).toPromise();

    if (response && response.user) {
      await this.showToast('Login successful!', 'success');
      window.location.href = '/home'; // Force page reload to ensure fresh state
    } else {
      await this.showToast('Login failed. Please try again.', 'danger');
    }
  } catch (error: any) {
    console.error('Login error:', error);

    let errorMessage = 'An error occurred. Please try again.';

    if (error.status === 401) {
      this.passwordError = 'Incorrect password. Please try again.';  // Set password error
    } else if (error.status === 404) {
      this.emailError = 'Email not found. Please check your email.';  // Set email error
    } else if (error.status === 429) {
      errorMessage = 'Too many attempts. Please try again later.';
      await this.showToast(errorMessage, 'danger');
    }
  } finally {
    await loader.dismiss();
  }
}


  openModal(platform: string) {
    this.platform = platform;
    this.isModalVisible = true;
    this.setModalDetails(platform);
  }

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

  dismissModal() {
    this.isModalVisible = false;
  }

  // Handle social login functionality
  async socialLogin(platform: string) {
    // Implement social login logic here if needed
    await this.showToast(`Social login with ${platform} is not implemented yet.`, 'warning');
    this.dismissModal();
  }
}
