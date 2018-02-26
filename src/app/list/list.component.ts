import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Aupair } from './list.interface';

@Component({
	selector: 'app-list',
	templateUrl: 'list.component.html',
	styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
	private aupairs: Aupair[];
	private countries: any;

	constructor(private http: HttpClient) {
	}

	public getFlag(country: string) {
		let code;
		switch (country) {

			case 'Burkina Faso':
				code = 'bf';
				break;
			case 'Slovak Republic':
				code = 'sk';
				break;
			case 'Virgin Islands (US)':
				code = 'vi';
				break;
			case 'Australia':
				code = 'au';
				break;
			case 'Laos':
				code = 'la';
				break;
			case 'United Kingdom':
				code = 'uk';
				break;
			case 'Norway':
				code = 'no';
				break;
			case 'Reunion':
				code = 're';
				break;
			case 'Denmark':
				code = 'dk';
				break;
			case 'Georgia':
				code = 'ge';
				break;
		}
		return `http://www.geonames.org/flags/x/${code}.gif`;
	}

	public ngOnInit() {
		//
	}

	private getAllAuPairs(): Observable<any> {
		// fetch aupairs from the json file
		return null;
	}

	private getAvailableCountries(): Observable<string[]> {
		// the countries to be used in the filters
		return null;
	}
}
