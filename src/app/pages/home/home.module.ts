import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';

import { MomentModule } from 'angular2-moment';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    MomentModule,
    CommonModule,
    ComponentsModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
