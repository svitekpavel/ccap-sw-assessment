import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Organism } from './list.interface';

@Component({
	selector: 'app-list',
	templateUrl: 'list.component.html',
	styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
	public organisms: Organism[];

	constructor(private http: HttpClient) {
	}

	public ngOnInit() {
		//
	}
}
