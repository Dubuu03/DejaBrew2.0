import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Onboarding2PageRoutingModule } from './onboarding-2-routing.module';

import { Onboarding2Page } from './onboarding-2.page';

import { CustomButtonComponent } from '../custom-button/custom-button.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Onboarding2PageRoutingModule,
    CustomButtonComponent,
  ],
  declarations: [Onboarding2Page]
})
export class Onboarding2PageModule {}
