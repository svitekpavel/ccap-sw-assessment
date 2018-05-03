import { SecurityContext } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { GenderPipe } from './gender.pipe';

describe('GenderPipe', () => {
	let pipe;
	let sanitizer;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [GenderPipe]
		});
	});

	beforeEach(
		inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
			sanitizer = domSanitizer;
			pipe = new GenderPipe(sanitizer);
		})
	);

	it('creates an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms "female" to gender span tag', () => {
		const value: any = 'female';
		const args: string[] = [];
		const genderSpanTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			genderSpanTag
		);

		expect(sanitizedValue).toEqual(
			'<span data-tooltip="female" class="gender">&#x2640;</span>'
		);
	});

	it('transforms "male" to gender span tag', () => {
		const value: any = 'male';
		const args: string[] = [];
		const genderSpanTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			genderSpanTag
		);

		expect(sanitizedValue).toEqual(
			'<span data-tooltip="male" class="gender">&#x2642;</span>'
		);
	});

	it('transforms "hermaphrodite" to gender span tag', () => {
		const value: any = 'hermaphrodite';
		const args: string[] = [];
		const genderSpanTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			genderSpanTag
		);

		expect(sanitizedValue).toEqual(
			'<span data-tooltip="hermaphrodite" class="gender">&#x26A5;</span>'
		);
	});

	it('transforms "narwhal" to gender span tag', () => {
		const value: any = 'narwhal';
		const args: string[] = [];
		const genderSpanTag = pipe.transform(value, args);
		const sanitizedValue = sanitizer.sanitize(
			SecurityContext.HTML,
			genderSpanTag
		);

		expect(sanitizedValue).toEqual(
			'<span data-tooltip="Unknown" class="gender">?</span>'
		);
	});
});
