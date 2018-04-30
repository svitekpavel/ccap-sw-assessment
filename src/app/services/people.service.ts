import { Injectable, OnInit } from "@angular/core";
import { environment } from "environments/environment";
import { Http } from "@angular/http";
import { Organism } from "../shared/models/organism.interface";
import { Observable } from "rxjs/Observable";
import { ApiService } from "../services/api.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/observable/of";

@Injectable()
export class PeopleService {
	allPeopleSubject = new BehaviorSubject<Organism[]>([]);

	constructor(private apiService: ApiService) {
		console.info("Subscribing to API Service Observable...");
		this.apiService.getAllPeople().subscribe(this.allPeopleSubject);
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
