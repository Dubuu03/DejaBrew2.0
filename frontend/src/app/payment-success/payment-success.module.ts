import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentSuccessPageRoutingModule } from './payment-success-routing.module';

import { PaymentSuccessPage } from './payment-success.page';

import { CustomButtonComponent } from '../custom-button/custom-button.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentSuccessPageRoutingModule,
    CustomButtonComponent
  ],
  declarations: [PaymentSuccessPage]
})
export class PaymentSuccessPageModule {}
