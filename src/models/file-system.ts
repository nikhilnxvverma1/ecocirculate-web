import { User } from './user';
export class FileSystem{
	rid:string;
	pwd:string;
	folderStack:Folder[];
	topLevelFolders:Folder[]=[];
	topLevelFiles:File[]=[];

	currentWorkingDirectory():string{
		return "/some/directory/to/cwd";
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
}