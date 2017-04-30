import { Component, OnInit } from '@angular/core';
import { FileSystem,Folder,File } from '../../../models/file-system';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {

	private fileSystem:FileSystem;
	private folderList:Folder[];
	private fileList:File[];

	constructor() { }

	ngOnInit() {

		this.makeDummy();
		this.folderList=this.fileSystem.topLevelFolders;
		this.fileList=this.fileSystem.topLevelFiles;

	}

	private makeDummy(){
		this.fileSystem=new FileSystem();
		
		//folders
		for(let i=0;i<10;i++){
			let folder=new Folder();
			folder.name=`Folder-${i+1}`;
			this.fileSystem.topLevelFolders.push(folder);
		}

		//files
		for(let i=0;i<10;i++){
			let file=new Folder();
			file.name=`File-${i+1}`;
			this.fileSystem.topLevelFiles.push(file);
		}
	}

	selectFolder(folder:Folder){
		console.log("will select folder "+folder.name);
		this.fileSystem.selectedFolder=folder;
		this.fileSystem.selectedFile=null;
	}

	openFolder(folder:Folder){
		console.log("will open folder "+folder.name);
	}

	selectFile(file:File){
		console.log("will select file "+file.name);
		this.fileSystem.selectedFile=file;
		this.fileSystem.selectedFile=null;
	}

	openFile(file:File){
		console.log("will open file "+file.name);
	}

}
