import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MomentModule } from 'angular2-moment';

import { LocalNewsPageRoutingModule } from './local-news-routing.module';

import { LocalNewsPage } from './local-news.page';

import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    ComponentsModule,
    LocalNewsPageRoutingModule
  ],
  declarations: [LocalNewsPage]
})
export class LocalNewsPageModule {}
