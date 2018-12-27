import { OrganismHeightPipe } from './organismHeight';

describe('OrganismHeightPipe', () => {
	let pipe: OrganismHeightPipe;

	beforeEach(() => {
		pipe = new OrganismHeightPipe();
	});

	it('should create an instance of OrganismHeightPipe', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return "172 cm" for "172" input', () => {
		expect(pipe.transform('172')).toBe('172 cm');
		expect(pipe.transform(172)).toBe('172 cm');
	});

	it('should return "20 cm" for "20" input', () => {
		expect(pipe.transform('20')).toBe('20 cm');
		expect(pipe.transform(20)).toBe('20 cm');
	});

	it('should return "" for "" input', () => {
		expect(pipe.transform('')).toBe('');
	});

	it('should not add "cm" for non-a-number input', () => {
		expect(pipe.transform('')).toBe('');
		expect(pipe.transform('twenty')).toBe('twenty');
		expect(pipe.transform('random')).toBe('random');
	});
});
