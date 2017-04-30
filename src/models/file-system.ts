import { User } from './user';
export class FileSystem{
	rid:string;
	pwd:string;
	folderStack:Folder[];
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