import ojs= require('orientjs');
import winston=require('winston');
import Promise=require('bluebird');

const FILESYSTEM="FileSystem";

export class FileSystemBackend{

	constructor(private db:ojs.Db){
	}

	createFilesystem():Promise<ojs.Record>{
		return this.db.insert().into(FILESYSTEM).one().then((r:ojs.Record)=>{
			return r;//success
		}).catch((error:Error)=>{
			winston.error("Error while creating file system: "+error.message);
			return null;
		});
	}

	checkAndCreateNewFolder(user:any):Promise<number>{
		return this.db.select().from('User').where({
			email: user.email
		}).all().then((records:any[])=>{
			if(records.length>0){
				return 2;//Email already taken
			}else{
				return this.insertNewUser(user);
			}
		}).catch((error:Error)=>{
			winston.error("Users retrieval : "+error.message);
			return 1;//InternalServerError
		})
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

