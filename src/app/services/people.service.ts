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
import "rxjs/add/operator/distinct";
import "rxjs/add/operator/scan";
import "rxjs/add/operator/toArray";
import {
	FilterAttribute,
	FilterAttributeOption
} from "../shared/models/filter.interface";

@Injectable()
export class PeopleService {
	allPeopleSubject = new BehaviorSubject<Organism[]>([]);
	allFiltersSubject = new Subject<Organism>();

	attributeFilters = {
		height: this.newAttributeFilterSubject(),
		mass: this.newAttributeFilterSubject(),
		hair_color: this.newAttributeFilterSubject(),
		eye_color: this.newAttributeFilterSubject(),
		skin_color: this.newAttributeFilterSubject(),
		gender: this.newAttributeFilterSubject()
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
		this.generateFilterValues();
		this.attributeFilters["height"].subscribe();
	}

	newAttributeFilterSubject() {
		return new Subject<string>()
			.distinct()
			.map(attributeValue => {
				const newOption: FilterAttributeOption = {
					value: attributeValue,
					isActiveFilter: new BehaviorSubject<boolean>(false)
				};
				return newOption;
			})
			.scan((acc, value) => [...acc, value], []);
	}
	generateFilterValues(): void {
		console.info("FILTER VALUE GENERATION");
		this.allPeopleSubject.asObservable().subscribe(
			people => {
				if (people.length > 0) {
					console.info("People received, filtering...");
					people.forEach(person => {
						Object.keys(this.attributeFilters).forEach(key => {
							this.attributeFilters[key].next(person[key]);
						});
					});
				}
			},
			error => console.error(error),
			() => console.log("Value filter complete")
		);
	}

	getAllPeople(): Observable<Organism[]> {
		return this.allPeopleSubject.asObservable();
	}

	getFilterOptions(): any {
		return this.attributeFilters;
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
