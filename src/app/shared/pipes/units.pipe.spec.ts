import { UnitsPipe } from './units.pipe';

describe('UnitsPipe', () => {
	let pipe;

	beforeEach(() => {
		pipe = new UnitsPipe();
	});

	it('create an instance', () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms "65" to cm units by default ', () => {
		const value: any = '65';
		const unitString = pipe.transform(value);

		expect(unitString).toEqual('65 cm');
	});

	it('transforms "42" to kg units ', () => {
		const value: any = '42';
		const args: string[] = ['kg'];
		const unitString = pipe.transform(value, args);

		expect(unitString).toEqual('42 kg');
	});

	it('transforms "unknown" to "Unknown" ', () => {
		const value: any = 'unknown';
		const unitString = pipe.transform(value);

		expect(unitString).toEqual('Unknown');
	});

	it('transforms undefined to "Unknown" ', () => {
		const unitString = pipe.transform(undefined);

		expect(unitString).toEqual('Unknown');
	});
});
