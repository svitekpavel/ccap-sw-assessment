import { async, inject, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { environment } from 'environments/environment';
import { ApiService } from './api.service';

const API_URL = environment.apiUrl;

describe('ApiService', () => {
	let service: ApiService = null;

	beforeEach(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('retrieves all the organisms', async(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		service
			.getAllPeople()
			.subscribe((result) => expect(result.length).toBeGreaterThan(0));
	}));

	it('retrieves exactly 1 organism for searchString "R2-D2"', async(() => {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		service
			.getAllPeople('r2-d2')
			.subscribe((result) => expect(result.length).toBe(1));
	}));
});
