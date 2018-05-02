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
import { from } from "rxjs/observable/from";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/skipWhile";
import "rxjs/add/operator/zip";

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
	eyeColorOptionsSubject = new BehaviorSubject<FilterAttributeOption[]>([]);
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
			["eye_color"].subscribe(this.eyeColorOptionsSubject);
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
			//console.log(`Comparing ${a.value} and ${b.value}...`);
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
				//console.log("Searched data received from Subject...");
				//console.table(people);
				this.people = this.filterPeople(people);
			},
			error => console.error(error)
		);
	}

	filterSource(filterSubject: BehaviorSubject<FilterAttributeOption[]>) {
		return filterSubject
			.map(options => {
				return options.filter(option => {
					//console.log(option.isActiveFilter.getValue());
					return option.isActiveFilter.getValue();
				});
			})
			.map(options => options.map(option => option.value));
	}
	filterPeople(people: Organism[]): Organism[] {
		console.log("Filtering...");
		let filteredPeople = [];
		const peopleSource = from(people);
		const heightSource = this.filterSource(this.heightOptionsSubject);
		const massSource = this.filterSource(this.massOptionsSubject);
		const hairColorSource = this.filterSource(this.hairColorOptionsSubject);
		const eyeColorSource = this.filterSource(this.eyeColorOptionsSubject);
		const skinColorSource = this.filterSource(this.skinColorOptionsSubject);
		const genderSource = this.filterSource(this.genderOptionsSubject);

		const filterSource = heightSource.zip(
			massSource,
			hairColorSource,
			eyeColorSource,
			skinColorSource,
			genderSource,
			(f1, f2, f3, f4, f5, f6) => {
				return {
					height: f1,
					mass: f2,
					hair_color: f3,
					eye_color: f4,
					skin_color: f5,
					gender: f6
				};
			}
		);

		console.log("People source: ", peopleSource);

		peopleSource
			.withLatestFrom(filterSource, (person, options) => {
				return { person: person, optionsArray: options };
			})
			.filter(check => {
				return this.filterCheck(check, "height");
			})
			.filter(check => {
				return this.filterCheck(check, "mass");
			})
			.filter(check => {
				return this.filterCheck(check, "hair_color");
			})
			.filter(check => {
				return this.filterCheck(check, "eye_color");
			})
			.filter(check => {
				return this.filterCheck(check, "skin_color");
			})
			.filter(check => {
				return this.filterCheck(check, "gender");
			})
			.map(checked => checked.person)
			.reduce(
				(acc: ReadonlyArray<Organism>, person) => acc.concat(person),
				[]
			)
			.subscribe(
				people => (filteredPeople = people),
				error => console.error(error)
			);
		return filteredPeople;
	}

	filterCheck(check, attribute) {
		if (
			check.optionsArray[attribute].length === 0 ||
			check.optionsArray[attribute].includes(check.person[attribute])
		) {
			return true;
		}
	}
}
