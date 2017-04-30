import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { FileSystem } from '../../../models/file-system';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

	@Input() fileSystem:FileSystem;

	constructor() { }

	ngOnInit() {
	}

}
