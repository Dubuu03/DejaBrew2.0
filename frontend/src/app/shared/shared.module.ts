import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  
import { FooterComponent } from '../footer/footer.component';  

import { ProfileComponent } from '../profile/profile.component';

@NgModule({
  declarations: [FooterComponent,ProfileComponent],
  imports: [
    CommonModule,
    IonicModule  
  ],
  exports: [FooterComponent]
})
export class SharedModule {}
