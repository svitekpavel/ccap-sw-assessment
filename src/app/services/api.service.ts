import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/expand';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import { Observable } from 'rxjs/Observable';
import { Organism } from '../shared/models/organism.interface';

const API_URL = environment.apiUrl;

interface SwapiRes {
	next: string;
	results: Organism;
}

@Injectable()
export class ApiService {
	constructor(private http: Http) {}

	// SWAPI Api: GET /people
	public getAllPeople(): Observable<Organism[]> {
		console.info('Making an API call for data...');
		return this.getApiPage(API_URL)
			.expand(
				(r: SwapiRes) =>
					this.isNil(r.next)
						? Observable.empty()
						: this.getApiPage(r.next)
			)
			.reduce(
				(a: ReadonlyArray<Organism>, v: SwapiRes) =>
					a.concat(v.results),
				[]
			);
	}

	private getApiPage(url) {
		return this.http.get(url).map((r) => r.json());
	}

	private isNil<A>(a: A): boolean {
		return a === null || a === undefined;
	}
}
