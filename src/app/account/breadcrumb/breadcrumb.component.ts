import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FileSystem,Folder } from '../../../models/file-system';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

	@Input() fileSystem:FileSystem;
	private newFolderPrompt=false;
	private newFolder:Folder;
	private shouldShowMessage=false;
	private message:string;

	constructor() { }

	ngOnInit() {
	}

	dismissNewFolder(){
		this.newFolderPrompt=false;
		this.newFolder=null;
	}

	openNewFolderPrompt(){
		this.newFolderPrompt=true;
		this.newFolder=new Folder();
	}

	createNewFolder(){
		console.log("Will create new folder of name "+this.newFolder.name);
		//TODO call the service
		this.newFolderPrompt=false;
		this.newFolder=null;
	}



}
