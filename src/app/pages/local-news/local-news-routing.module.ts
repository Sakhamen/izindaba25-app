import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalNewsPage } from './local-news.page';

const routes: Routes = [
  {
    path: '',
    component: LocalNewsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalNewsPageRoutingModule {}
