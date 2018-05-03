import { TestBed, inject, async } from "@angular/core/testing";

import { PeopleService } from "./people.service";
import { ApiService } from "./api.service";
import { HttpModule } from "@angular/http";

describe("PeopleService", () => {
	let service: PeopleService = null;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [PeopleService, ApiService]
		});
	});

	beforeEach(
		inject([PeopleService], (peopleService: PeopleService) => {
			service = peopleService;
		})
	);

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should have a newAttributeFilterSubject method", () => {
		expect(service.newAttributeFilterSubject).toBeDefined;
	});

	it("should have a generateFilterValues method", () => {
		expect(service.generateFilterValues).toBeDefined;
	});

	it("should have a getAllPeople method", () => {
		expect(service.getAllPeople).toBeDefined;
	});

	it("should have a serchPeople method", () => {
		expect(service.searchPeople).toBeDefined;
	});

	it("should have a getFilterOptions method", () => {
		expect(service.getFilterOptions).toBeDefined;
	});

	it("retrieves all the organisms", async(() => {
		service
			.getAllPeople()
			.subscribe(result => expect(result.length).toBeGreaterThan(0));
	}));

	it("builds the list of filter values from all people", () => {
		expect(service.generateFilterValues).toHaveBeenCalled;
	});
});
