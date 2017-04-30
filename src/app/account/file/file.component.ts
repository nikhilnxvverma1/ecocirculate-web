import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { File } from '../../../models/file-system';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

	@Input() file:File;

	constructor() { }

	ngOnInit() {
	}

}
