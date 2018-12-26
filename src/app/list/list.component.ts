import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skipWhile';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/zip';

import { ApiService } from './../services/api.service';
import { Organism } from './../shared/models/organism.interface';

@Component({
	selector: 'app-list',
	templateUrl: 'list.component.html',
	styleUrls: ['list.component.scss'],
	providers: [ApiService]
})
export class ListComponent implements OnInit {
	private people: Organism[] = [];
	private loading: boolean = true;

	constructor(private peopleService: ApiService) {}

	public ngOnInit() {
		const form: HTMLFormElement = document.querySelector('.search form');

		// This could have been implemented as onChange event on input element after debounce
		// However, the task was to include a search button
		form.addEventListener('submit', (event: Event) => {
			const input: HTMLInputElement = document.querySelector('.search input[type=text]');

			// Prevent default form submit
			event.preventDefault();

			const searchValue = input.value;
			this.loading = true;

			this.peopleService.getAllPeople(searchValue).subscribe(
				this.setPeople.bind(this),
				this.setError.bind(this)
			);
		});

		/**
		 * Subscribe to the peopleService to receive people
		 */
		this.peopleService.getAllPeople().subscribe(
			this.setPeople.bind(this),
			this.setError.bind(this)
		);
	}

	private setPeople(people): void {
		this.people = people;
		this.loading = false;
	}

	private setError(error): void {
		console.log(error);
		this.loading = false;
	}
}
