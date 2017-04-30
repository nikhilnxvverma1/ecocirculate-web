import { Component, OnInit } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { Folder } from '../../../models/file-system';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

	@Input() folder:Folder;
	@Output() folderSelected=new EventEmitter<any>();
	@Output() openFolder=new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	selectFolder($event){
		console.debug(`Folder clicked ${this.folder.name}`);
		this.folderSelected.emit(this.folder);
	}

	folderShouldOpen($event){
		// console.debug(`Folder double clicked ${this.folder.name}`);
		this.openFolder.emit(this.folder);
	}

}
