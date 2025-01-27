import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CustomButtonComponent } from '../custom-button/custom-button.component'; 
import { ProductCardComponent } from '../product-card/product-card.component';


import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    CustomButtonComponent,
  ],
  declarations: [
    HomePage,
    ProductCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  
})
export class HomePageModule {}
