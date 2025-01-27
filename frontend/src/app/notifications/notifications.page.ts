import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { ProfileComponent } from '../profile/profile.component';
import { ToastController, ModalController } from '@ionic/angular';

interface Notification {
  icon: string;
  title: string;
  message: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  notifications = {
    today: [
      {
        icon: 'car',
        title: 'On The Way',
        message: 'Your DejaBrew order is on the way! Sit tight, deliciousness is coming.'
      },
      {
        icon: 'time',
        title: 'Limited-Time Dish',
        message: 'Don\'t miss out on our special! Enjoy the cups for a limited time at DejaBrew.'
      },
      {
        icon: 'notifications',
        title: 'DejaBrew Update',
        message: 'Stay in the loop! Here\'s the latest from DejaBrew, including new dishes, promotions, and more.'
      }
    ],
    yesterday: [
      {
        icon: 'moon',
        title: 'Midnight Snack Promo',
        message: 'Late-night cravings? Get 20% off on your favorite coffee and pastry pairings from 10 PM-2 AM!'
      },
      {
        icon: 'gift',
        title: '11.11 Sale',
        message: 'It\'s the 11.11 Sale! Grab amazing deals on your favorite brews and pastries today only!'
      },
      {
        icon: 'time',
        title: 'Happy Hour Reminder',
        message: 'Happy Hour is on! Get 1-for-1 coffee from 3 PM to 6 PM. Grab your favorite brew and unwind with us.'
      }
      
    ]
  };

  // Open Profile modal
  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent
    });
    return await modal.present();
  }

  // Close Modal
  closeModal() {
    const modal = document.getElementById('profile-modal') as HTMLIonModalElement;
    modal.dismiss();
  }

  // Navigation methods with Router
  goToHome() {
    this.router.navigate(['/home']);  
  }

  goToFavorites() {
    this.router.navigate(['/favorites']);  
  }

  goToCart() {
    this.router.navigate(['/cart']);  
  }

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController,
    private router: Router  
  ) {}

  ngOnInit() {}
}
