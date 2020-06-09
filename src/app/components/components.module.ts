import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CustomSkeletonComponent } from './custom-skeleton/custom-skeleton.component';

const PAGES_COMPONENTS = [
  CustomSkeletonComponent,
  // other components...,
];

@NgModule({
  declarations: [
    PAGES_COMPONENTS
  ],
  exports: [
    PAGES_COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
