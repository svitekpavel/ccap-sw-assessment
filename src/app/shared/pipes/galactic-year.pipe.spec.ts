
import { SecurityContext } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { GalacticYearPipe } from './galactic-year.pipe';

describe('GalacticYearPipe', () => {
	let pipe;
	let sanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [BrowserModule]
		});
	});

	beforeEach(
		inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
			sanitizer = domSanitizer;
			pipe = new GalacticYearPipe(sanitizer);
		})
	);

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms "19ABY" to year acronym tag', () => {
		const value: any = '19ABY';
		const args: string[] = [];
		const yearAbbrTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			yearAbbrTag
		);

		expect(sanitizedValue).toEqual(
			'19<abbr title="After the Battle of Yavin">ABY</abbr>'
		);
	});

	it('transforms "15000BBY" to year acronym tag', () => {
		const value: any = '15000BBY';
		const args: string[] = [];
		const yearAbbrTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			yearAbbrTag
		);

		expect(sanitizedValue).toEqual(
			'15000<abbr title="Before the Battle of Yavin">BBY</abbr>'
		);
	});

	it('transforms "Boba" to "Unknown"', () => {
		const  value: any = 'Boba';
		const args: string[] = [];
		const yearAbbrTag = pipe.transform(value, args);

		expect(yearAbbrTag).toEqual('Unknown');
	});
});
