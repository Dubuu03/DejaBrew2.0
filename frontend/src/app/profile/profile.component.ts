// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  isLoading: boolean = true;

  menuItems = [
    { icon: 'person-outline', text: 'Edit Profile', route: '/edit-profile' },
    { icon: 'document-text-outline', text: 'My Orders', route: '/my-orders' },
    { icon: 'location-outline', text: 'My Address', route: '/my-address' },
    { icon: 'shield-outline', text: 'Privacy Policy', route: '/privacy-policy' },
    { icon: 'people-outline', text: 'Invite Friends', route: '/invite-friends' },
    { icon: 'log-out-outline', text: 'Logout', route: '/logout' }
  ];

  constructor(
    private modalCtrl: ModalController, 
    private router: Router, 
    private authService: AuthService
  ) {}

  ngOnInit() {
    // First check session storage
    const userData = this.authService.getUserFromSession();
    if (userData && userData.username) {
      this.username = userData.username;
      this.isLoading = false;
    } else {
      // If not in session storage, fetch from API
      this.authService.getUsername().subscribe({
        next: (response) => {
          this.username = response.username;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching username:', error);
          this.handleAuthError();
        }
      });
    }
  }

  private handleAuthError() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/login']);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async navigateTo(route: string) {
    if (route === '/logout') {
      await this.logout();
    } else {
      await this.modalCtrl.dismiss();
      this.router.navigate([route]);
    }
  }

  async logout() {
    this.authService.logout().subscribe({
      next: async () => {
        await this.modalCtrl.dismiss();
        window.location.href = '/login'; // Force a full page reload
      },
      error: async (error) => {
        console.error('Logout error:', error);
        // Force logout even if API call fails
        sessionStorage.clear();
        await this.modalCtrl.dismiss();
        window.location.href = '/login';
      }
    });
  }
}