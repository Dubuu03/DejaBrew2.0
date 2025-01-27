import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class BackButtonComponent {
  @Input() path: string = '/home';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate([this.path]);
  }
}


