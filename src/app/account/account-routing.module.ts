import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path:'home', component:HomeComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule {}