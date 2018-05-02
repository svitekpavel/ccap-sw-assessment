import { Component, OnInit } from "@angular/core";
import { PeopleService } from "../services/people.service";
import { Organism } from "../shared/models/organism.interface";
import {
	FilterAttribute,
	FilterAttributeOption
} from "../shared/models/filter.interface";
import { TitleCasePipe } from "@angular/common";
import { UnitsPipe } from "../shared/pipes/units.pipe";
import { GenderPipe } from "../shared/pipes/gender.pipe";
import { GalacticYearPipe } from "../shared/pipes/galactic-year.pipe";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import "rxjs/add/operator/debounceTime";

@Component({
	selector: "app-list",
	templateUrl: "list.component.html",
	styleUrls: ["list.component.scss"],
	providers: [PeopleService]
})
export class ListComponent implements OnInit {
	people: Organism[] = [];
	loaded: boolean = false;

	querySubject = new Subject<string>();
	filterSubject = new BehaviorSubject<FilterAttribute[]>([]);
	heightOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);
	massOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);
	hairColorOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);
	skinColorOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);
	genderOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);

	constructor(private peopleService: PeopleService) {}

	ngOnInit() {
		/**
		 * Subscribe to the peopleService to receive people
		 */
		this.peopleService.getAllPeople().subscribe(
			people => {
				console.log("Data received from Subject...");
				console.table(people);
				this.people = people;
				/**
				 * 	The BehaviorSubject receives an initial value of [] on first run
				 * 	once we actually receive values we'll set the loaded flag.
				 */
				if (people.length > 0) {
					this.loaded = true;
				}
			},
			error => console.error(error)
		);

		this.peopleService
			.getFilterOptions()
			["height"].subscribe(this.heightOptionsSubject);
		this.peopleService
			.getFilterOptions()
			["mass"].subscribe(this.massOptionsSubject);
		this.peopleService
			.getFilterOptions()
			["hair_color"].subscribe(this.hairColorOptionsSubject);
		this.peopleService
			.getFilterOptions()
			["skin_color"].subscribe(this.skinColorOptionsSubject);
		this.peopleService
			.getFilterOptions()
			["gender"].subscribe(this.genderOptionsSubject);

		// Subscribe to the querySubject to the searchPeople observable
		this.querySubject
			.debounceTime(500)
			.subscribe(queryString => this.searchPeople(queryString));
	}

	sortOptions(subject) {
		return subject.getValue().sort((a, b) => {
			console.log(`Comparing ${a.value} and ${b.value}...`);
			return a.value.localeCompare(b.value, undefined, {
				numeric: true,
				sensitivity: "base"
			});
		});
	}
	searchPeople(queryString: string) {
		console.info(`Search query received: '${queryString}'`);
		this.peopleService.searchPeople(queryString).subscribe(
			people => {
				console.log("Searched data received from Subject...");
				console.table(people);
				this.people = people;
			},
			error => console.error(error)
		);
	}
}
