import { Injectable, OnInit } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Organism } from "../shared/models/organism.interface";
import { Observable } from "rxjs/Observable";
import { ApiService } from "../services/api.service";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/of";
import "rxjs/add/observable/from";
import {
	FilterAttribute,
	FilterAttributeOption
} from "../shared/models/filter.interface";

@Injectable()
export class PeopleService {
	allPeopleSubject = new BehaviorSubject<Organism[]>([]);
	allFiltersSubject = new Subject<Organism>();

	filters = {
		height: {
			/*'172': new BehaviorSubject<boolean>(false),
			'170': new BehaviorSubject<boolean>(false),
			'155': new BehaviorSubject<boolean>(false),*/
		},
		mass: {},
		hair_color: {},
		eye_color: {},
		skin_color: {},
		gender: {}
	};

	constructor(private apiService: ApiService) {
		/**
		 * Subscribe to the API to process people
		 */
		console.info("Subscribing to API Service Observable...");
		this.apiService.getAllPeople().subscribe(this.allPeopleSubject);

		/**
		 * Subscribe to the API and process people to Filters
		 */
		this.apiService.getAllPeople();
	}

	getAllPeople(): Observable<Organism[]> {
		return this.allPeopleSubject.asObservable();
	}

	searchPeople(query: string): Observable<Organism[]> {
		console.info("Start search...");
		const matches: Organism[] = this.allPeopleSubject
			.getValue()
			.filter(Organism => {
				const queryString = `^${query}`;
				const regex = RegExp(queryString, "i");
				return regex.test(Organism.name);
			});

		return Observable.of(matches);
	}
}
