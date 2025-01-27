import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CustomButtonComponent } from '../custom-button/custom-button.component'; 
import { BackButtonComponent } from '../back-button/back-button.component'  

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    CustomButtonComponent,  // Add CustomButtonComponent 
    BackButtonComponent  // Add BackButtonComponent
  ],
  declarations: [LoginPage] 
})
export class LoginPageModule {}
