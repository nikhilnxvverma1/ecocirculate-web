import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AccountRoutingModule } from './account-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { FileComponent } from './file/file.component';
import { FolderComponent } from './folder/folder.component';
import { FileSystemService } from './file-system.service';


@NgModule({
  imports: [
    CommonModule,
	BrowserModule,
	FormsModule,
	AccountRoutingModule,
  ],
  providers:[FileSystemService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  declarations: [HomeComponent, FileBrowserComponent, BreadcrumbComponent, FileComponent, FolderComponent]
})
export class AccountModule { }
