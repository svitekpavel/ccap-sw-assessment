import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'environments/environment';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/toArray';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ApiService } from '../services/api.service';
import {
	FilterAttribute,
	FilterAttributeOption
} from '../shared/models/filter.interface';
import { Organism } from '../shared/models/organism.interface';

@Injectable()
export class PeopleService {
	private allPeopleSubject = new BehaviorSubject<Organism[]>([]);
	private allFiltersSubject = new Subject<Organism>();

	private attributeFilters = {
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
		console.info('Subscribing to API Service Observable...');
		this.apiService.getAllPeople().subscribe(this.allPeopleSubject);

		/**
		 * Subscribe to the API and process people to Filters
		 */
		this.generateFilterValues();
		this.attributeFilters['height'].subscribe();
	}

	public newAttributeFilterSubject() {
		return new Subject<string>()
			.distinct()
			.map((attributeValue) => {
				const newOption: FilterAttributeOption = {
					value: attributeValue,
					isActiveFilter: new BehaviorSubject<boolean>(false)
				};
				return newOption;
			})
			.scan((acc, value) => [...acc, value], []);
	}
	public generateFilterValues(): void {
		this.allPeopleSubject.asObservable().subscribe(
			(people) => {
				if (people.length > 0) {
					console.info('People received, filtering...');
					people.forEach((person) => {
						Object.keys(this.attributeFilters).forEach((key) => {
							this.attributeFilters[key].next(person[key]);
						});
					});
				}
			},
			(error) => console.error(error),
			() => console.log('Value filter complete')
		);
	}

	public getAllPeople(): Observable<Organism[]> {
		return this.allPeopleSubject
			.asObservable()
			.skipWhile((result) => result.length === 0);
	}

	public getFilterOptions(): any {
		return this.attributeFilters;
	}

	public searchPeople(query: string): Observable<Organism[]> {
		console.info('Start search...');
		const matches: Organism[] = this.allPeopleSubject
			.getValue()
			.filter((organism) => {
				const queryString = `^${query}`;
				const regex = RegExp(queryString, 'i');
				return regex.test(organism.name);
			});

		return Observable.of(matches);
	}
}
