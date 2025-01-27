import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPageRoutingModule } from './onboarding-routing.module';

import { OnboardingPage } from './onboarding.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CustomButtonComponent } from '../custom-button/custom-button.component'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPageRoutingModule,
    CustomButtonComponent,
  ],
  declarations: [OnboardingPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class OnboardingPageModule {}
