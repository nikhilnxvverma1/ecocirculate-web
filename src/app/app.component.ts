import { Component } from '@angular/core';
import { Http,Headers,RequestOptions,Response } from '@angular/http';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app works!';

  public uploader:FileUploader = new FileUploader({url: "api/sample-upload"});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(
	  private http:Http
  ) { }

  uploadSampleFile(){
	// console.debug("posting sample file to server");
	// let headers = new Headers({ 'Content-Type': 'application/json' });
	// let options=new RequestOptions({headers:headers});
	// return this.http.post("/api/sample-upload",JSON.stringify(signup),options).map((res:Response)=>{return res.json()});
  }
}
