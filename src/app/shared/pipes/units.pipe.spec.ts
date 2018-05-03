import { UnitsPipe } from "./units.pipe";

describe("UnitsPipe", () => {
	let pipe;

	beforeEach(() => {
		pipe = new UnitsPipe();
	});

	it("create an instance", () => {
		expect(pipe).toBeTruthy();
	});

	it('transforms "65" to cm units by default ', () => {
		let value: any = "65";
		//let args: string[] = [];
		const unitString = pipe.transform(value);

		expect(unitString).toEqual("65 cm");
	});

	it('transforms "42" to kg units ', () => {
		let value: any = "42";
		let args: string[] = ["kg"];
		const unitString = pipe.transform(value, args);

		expect(unitString).toEqual("42 kg");
	});

	it('transforms "unknown" to "Unknown" ', () => {
		let value: any = "unknown";
		const unitString = pipe.transform(value);

		expect(unitString).toEqual("Unknown");
	});

	it('transforms undefined to "Unknown" ', () => {
		let value: any = undefined;
		const unitString = pipe.transform(value);

		expect(unitString).toEqual("Unknown");
	});
});
