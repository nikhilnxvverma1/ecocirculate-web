import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { LoginAttempt,Signup } from '../../models/user';
import { Folder,File,FileSystem } from '../../models/file-system';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FileSystemService {

   constructor(
	  private http:Http
  ) { }

	createNewFolder(folder:Folder,fileSystem:FileSystem):Observable<any>{
		
		console.log("inserting folder in the database under current folder");
		let requestObject={
			name:folder.name,
			currentFolder:fileSystem.topFolderOfStack()
		}
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options=new RequestOptions({headers:headers});
		return this.http.post("/api/new-folder",JSON.stringify(requestObject),options).map((res:Response)=>{return res.json()});
	}

	getFileSystem():Observable<FileSystem>{
		
		console.log("Fetching file system");
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let options=new RequestOptions({headers:headers});
		return this.http.get("/api/file-system",options).map((res:Response)=>{return this.fileSystemFrom(res.json())});
	}

	private fileSystemFrom(json:any):FileSystem{
		let fileSystem=new FileSystem();
		fileSystem.rid=json.fileSystem['@rid'];
		return fileSystem;
	}

}
