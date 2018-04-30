import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Organism } from "../shared/models/organism.interface";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import "rxjs/add/observable/empty";
import "rxjs/add/operator/expand";
import "rxjs/add/operator/reduce";

const API_URL = environment.apiUrl;

interface SwapiRes {
	next: string;
	results: Organism;
}

@Injectable()
export class ApiService {
	constructor(private http: Http) {}

	//SWAPI Api: GET /people
	getAllPeople(): Observable<Organism[]> {
		console.info("Making an API call for data...");
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

	getApiPage(url) {
		return this.http.get(url).map(r => r.json());
	}

	isNil<A>(a: A): boolean {
		return a === null || a === undefined;
	}
}
