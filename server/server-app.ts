import express = require('express');
import http = require('http');
import https = require('https');
import path = require('path');
import orientjs = require('orientjs');
import winston = require('winston');
import bodyParser = require('body-parser');
import session = require('express-session');
import { UserBackend,AuthenticationResult,statusCodeForLogin,statusCodeForSignup } from './user.backend';
const multer = require('multer');

export class ServerApp {
    
	private app: express.Application;
	private db:orientjs.Db;
	private multer:any;
	private userBackend:UserBackend;
    
	constructor(db?:orientjs.Db) {
		this.app = express();
		this.db=db;
		this.userBackend=new UserBackend(this.db);
	}
    
    public setRoutes() {        //the order matters here

		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({
			extended:false
		}));

		//TODO WARNING: the secret should not be stored in code.(Dev purposes only)
		//TODO Replace with mongo connect or redis store, in memory is not suitable for production
		this.app.use(session({secret:"sdf923jk23asf01gasds42",saveUninitialized:true,resave:false}));

		this.configureAPIRoutes();
		
		//static resources (is amongst the main folders in the root of the project)
		this.app.use('/', express.static(path.join(__dirname, '../', 'dist')));//for one level

		//setup file uploads using multer
		this.multer=multer({
			dest: "./uploads/"
		}).any();
		this.app.use(this.multer);


		//all other routes are handled by angular
		this.app.get('/*', this._homePage);//this should be in the end
	}

	private configureAPIRoutes(){

		this.app.post('/api/sample-upload', (req:express.Request, res:express.Response) =>{
			this.multer(req,res,(error:Error)=>{
				winston.debug("got a file here ");
				if(error){
					console.error("Error occured while uploading file");
				}
				res.send("File is uploaded");
			});

		});

		//rough work
		this.app.get('/api/sample-json', (req:express.Request, res:express.Response) => {
            winston.debug("Rough work for development purposes");
            //Do rough work in this end point
			let obj={
				first:"hello",
				second:"world"
			}
			res.send(JSON.stringify(obj));
			
			//--------------------------------
		});

		//login authentication
		this.app.post('/api/authenticate-user', (req:express.Request, res:express.Response) => {
			winston.debug("Attempting to login user");
			this.userBackend.authenticateUser((<any>req).body).
			then((result:AuthenticationResult)=>{
				//if authentic, store the user model in the session
				if(result.attempt==0){
					(<any>req).session.user=result.user;
				}
				//respond back with an appropriate status code
				jsonHeader(res).status(statusCodeForLogin(result.attempt)).send(JSON.stringify(result.attempt));
			});
		});


		//create a user
		this.app.post('/api/create-user', (req:express.Request, res:express.Response) => {
			winston.debug("Attempting to create new user");
			this.userBackend.checkAndCreateNewUser((<any>req).body).
			then((attempt:number)=>{
				//respond back with an appropriate status code
				jsonHeader(res).status(statusCodeForSignup(attempt)).send(JSON.stringify(attempt));
			});
		})

	}

    public start() {//this method is called after setRoutes()

		//normalize ports by environment variables        
		let port=process.env.PORT_SANITY||3000;
		
		// http.createServer(express).listen(port);
		this.app.listen(port,()=>{
			winston.info("Server started on port "+port);
		})
	}

    private _homePage(req: express.Request, res: express.Response) {

		let pathToIndexPage:string;
		pathToIndexPage=path.join(__dirname,'../','dist/','index.html'); //amongst the main folders
		winston.log('info',"Server refreshed index file: "+pathToIndexPage);
        res.sendFile(pathToIndexPage);
    }
}

/**
 * Simple method that set the content header to be json. 
 * Returns the same response to allow chaining. 
 */
export function jsonHeader(response:express.Response):express.Response{
	response.setHeader('Content-Type', 'application/json');
	return response;
}

const production=process.env.NODE_ENV=='production';