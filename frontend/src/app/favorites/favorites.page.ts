import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { ProfileComponent } from '../profile/profile.component';
import { Router } from '@angular/router'; // Import Router for navigation

interface FavoriteItem {
  name: string;
  category: string;
  rating: number;
  image: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  favorites: FavoriteItem[] = [
    {
      name: 'Lavender Green Chill',
      category: 'Non-coffee',
      rating: 5.0,
      image: 'assets/images/Non-Coffee/Lavander Green Chill.PNG',
      isFavorite: true
    },
    {
      name: 'Vanilla Bean Brew',
      category: 'Cold coffee',
      rating: 5.0,
      image: 'assets/images/Cold/Vanilla Bean Brew.PNG',
      isFavorite: true
    },
    {
      name: 'Berry Cool Milkshake',
      category: 'Non-coffee',
      rating: 5.0,
      image: 'assets/images/Non-Coffee/Berry Cool Milkshake.PNG',
      isFavorite: true
    },
    {
      name: 'Strawberry Blush Frost',
      category: 'Non-coffee',
      rating: 5.0,
      image: 'assets/images/Non-Coffee/Strawberry Blush Frost.PNG',
      isFavorite: true
    },
    {
      name: 'Herbal Frost',
      category: 'Cold coffee',
      rating: 5.0,
      image: 'assets/images/Cold/Herbal Frost.PNG',
      isFavorite: true
    },
    {
      name: 'CinnaDeja Delight',
      category: 'Pastry',
      rating: 5.0,
      image: 'assets/images/Pastry/CinnaDeja Delight.PNG',
      isFavorite: true
    }
  ];

  constructor(
    private toastController: ToastController,
    private modalCtrl: ModalController, // Injecting ModalController
    private router: Router // Injecting Router
  ) { }

  ngOnInit() {}

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 500,
      position: 'bottom'
    });
    toast.present();
  }

  clearAll() {
    this.favorites = [];
    this.presentToast('All favorites have been cleared!');
  }

  toggleFavorite(item: FavoriteItem) {
    item.isFavorite = !item.isFavorite;
    if (!item.isFavorite) {
      this.presentToast(`${item.name} has been removed from favorites.`);
    }
    this.favorites = this.favorites.filter(favorite => favorite.isFavorite);
  }

  // Navigation methods with Router
  goToHome() {
    this.router.navigate(['/home']);  // Use Router for navigation
  }

  goToCart() {
    this.router.navigate(['/cart']);  // Use Router for navigation
  }

  goToNotifications() {
    this.router.navigate(['/notifications']);  // Use Router for navigation
  }

  // Open Profile modal
  async openProfileModal() {
    const modal = await this.modalCtrl.create({
      component: ProfileComponent
    });
    return await modal.present();
  }

}
