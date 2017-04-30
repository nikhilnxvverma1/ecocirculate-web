import ojs= require('orientjs');
import winston=require('winston');
import Promise=require('bluebird');

const FILESYSTEM="FileSystem";

export class FileSystemBackend{

	constructor(private db:ojs.Db){
	}

	createFilesystem():Promise<ojs.Record>{
		return this.db.insert().into(FILESYSTEM).set({creationDate:new Date()}).one().then((r:ojs.Record)=>{
			return r;//success
		}).catch((error:Error)=>{
			winston.error("Error while creating file system: "+error.message);
			return null;
		});
	}

	checkAndCreateNewFolder(name:string,currentFolder:string,user:any):Promise<any>{
		
		return this.fileOrFolder(name,true,currentFolder,user).
		then((r:any)=>{
			if(r.item==null){

				return this.db.insert().into('Folder').set({
					name:name,
					creationDate:new Date(),
					modificationDate:new Date()
				}).one().
				then((r:any)=>{
					return this.updateFolderAttributes(r,currentFolder,user);
				})
			}else{
				return {code:500,response:{status:1,message:"Folder name already exists"}};
			}
		}).catch((error:Error)=>{
			winston.error("New folder insertion: "+error.message);
			return {code:500,response:{status:1,message:error.message}}
		});
	}

	private updateFolderAttributes(f:any,containerFolder:any,user:any):Promise<any>{
		let query:string;
		if(containerFolder==null){
			query=`Update Folder set owner='${user['@rid']}' return after @this where @rid = '${f['@rid']}'`;
		}else{
			query=`Update Folder set parentFolder = '${containerFolder}', owner='${user['@rid']}' return after @this where @rid = '${f['@rid']}'`;
		}
		return this.db.query(query).
		then((v:any[])=>{
			return {code:200,response:{status:0,message:"Success",folder:v[0]}};
		});
	}

	fileOrFolder(name:string,isFolder:boolean,containerFolderRID:string,user:any):Promise<any>{
		let fileOrFolder=isFolder?"Folder":"File";

		let query:string;
		if(containerFolderRID==null){
			query=`select from ${fileOrFolder} where owner = '${user["@rid"]}' and parentFolder is NULL and name = '${name}'`;
		}else{
			query=`select from ${fileOrFolder} where owner = '${user["@rid"]}' parentFolder = '${containerFolderRID}' and name = '${name}'`;
		}

		return this.db.query(query).
		then((rs:any[])=>{
			if(rs.length==0){
				return {code:500,response:{status:1,message:"doesn't exist"}, item:null};
			}
			return {code:500,response:{status:1,message:"success"}, item:rs[0]};
		}).catch((error:Error)=>{
			return {code:500,response:{status:1,message:error.message}}
		});
	}

	private insertNewUser(user:any):Promise<number>{
 		return this.db.insert().into('User').set({
			firstName:user.firstName,
			lastName:user.lastName,
			email:user.email,
			password:user.password,
			gender:user.gender==undefined?'undisclosed':user.gender,
			dateOfBirth:user.dateOfBirth
		}).one().then(()=>{
			return 0;//success
		}).catch((error:Error)=>{
			winston.error("New user insertion: "+error.message);
			return 1;
		})
	}

}

