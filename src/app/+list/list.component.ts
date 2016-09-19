import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { IAupair } from './list.interface';

@Component({
	selector: 'app-list',
	templateUrl: 'list.component.html',
	styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
	private aupairs: IAupair[];
	private countries: any;

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

	constructor(private http: Http) {
	}

	private getAllAuPairs(): Observable<any> {
		return this.http.get('app/data.json')
			.map(r => r.json())
			.map(a => {
				this.aupairs = a.map(r => {
					return r;
				});

				return this.aupairs;
			});
	}

	private getAvailableCountries(): Observable<string[]> {
		return this.getAllAuPairs().map(r => {
			return r.reduce((countries: string[], aupair: IAupair) => {
				if (countries.indexOf(aupair.country) < 0) {
					countries.push(aupair.country);
				}
				return countries;
			}, []);
		});
	}

	ngOnInit() {
		this.getAllAuPairs().subscribe(a => this.aupairs = a);
		this.getAvailableCountries().subscribe(a => this.countries = a);
	}
}
