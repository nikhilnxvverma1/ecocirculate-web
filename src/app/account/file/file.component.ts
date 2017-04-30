import { Component, OnInit } from '@angular/core';
import { Input,Output,EventEmitter } from '@angular/core';
import { File } from '../../../models/file-system';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

	@Input() file:File;
	@Output() fileSelected=new EventEmitter<any>();
	@Output() openFile=new EventEmitter<any>();

	constructor() { }

	ngOnInit() {
	}

	selectFile($event){
		console.debug(`File clicked ${this.file.name}`);
		this.fileSelected.emit(this.file);
	}

	fileShouldOpen($event){
		// console.debug(`File double clicked ${this.file.name}`);
		this.openFile.emit(this.file);
	}

}
