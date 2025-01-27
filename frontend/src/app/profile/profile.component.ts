import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute  } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  menuItems = [
    { icon: 'person-outline', text: 'Edit Profile', route: '/edit-profile' },
    { icon: 'document-text-outline', text: 'My Orders', route: '/my-orders' },
    { icon: 'location-outline', text: 'My Address', route: '/my-address' },
    { icon: 'shield-outline', text: 'Privacy Policy', route: '/privacy-policy' },
    { icon: 'people-outline', text: 'Invite Friends', route: '/invite-friends' },
    { icon: 'log-out-outline', text: 'Logout', route: '/login' }
  ];

  constructor(private modalCtrl: ModalController, private router: Router) { }

  ngOnInit() {    
    const currentPath = this.router.url;
    console.log('Current path:', currentPath); }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async navigateTo(route: string) {
    await this.modalCtrl.dismiss();
    this.router.navigate([route]); 
  }

  async logout() {
    const currentPath = this.router.url; 

    await this.modalCtrl.dismiss();
    
    // Check the current route



  if (currentPath === '/' || currentPath === '/home')  {
      window.location.href = '/login'
  }
  else {
      this.router.navigate(['/login']);
  }

  }
}
