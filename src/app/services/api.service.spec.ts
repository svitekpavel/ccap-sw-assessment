import { TestBed, inject, async } from "@angular/core/testing";

import { ApiService } from "./api.service";
import { HttpModule } from "@angular/http";
import { environment } from "environments/environment";

const API_URL = environment.apiUrl;

describe("ApiService", () => {
	let service: ApiService = null;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [ApiService]
		});
	});

	beforeEach(
		inject([ApiService], (apiService: ApiService) => {
			service = apiService;
		})
	);

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("retrieves all the organisms", async(() => {
		service
			.getAllPeople()
			.subscribe(result => expect(result.length).toBeGreaterThan(0));
	}));

	it("calls the getApiPage method", async(() => {
		expect(service.getApiPage(API_URL)).toHaveBeenCalled;
	}));
});
