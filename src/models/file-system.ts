import { User } from './user';
export class FileSystem{
	rid:string;
	folderStack:Folder[]=[];
	topLevelFolders:Folder[]=[];
	topLevelFiles:File[]=[];

	selectedFolder:Folder;
	selectedFile:File;

	currentWorkingDirectory():string{
		return "/some/directory/to/cwd";
	}

	topFolderOfStack():Folder{
		if(this.folderStack.length==0){
			return null;
		}
		return this.folderStack[this.folderStack.length-1];
	}

	insertFolderUnderCurrentFolder(folder:Folder){
		let cwd=this.topFolderOfStack()
		if(cwd==null){
			this.topLevelFolders.push(folder);
		}else{
			cwd.folderList.push(folder);
		}
	}
}

export class File{
	rid:string;
	name:string;
	owner:User;
	parentFolder:Folder;
}

export class Folder{
	rid:string;
	name:string;
	owner:User;
	parentFolder:Folder;
	folderList:Folder[]=[];
	fileList:File[]=[];
}