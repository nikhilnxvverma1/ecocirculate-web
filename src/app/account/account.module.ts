import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
	BrowserModule,
	FormsModule,
	AccountRoutingModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent]
})
export class AccountModule { }
