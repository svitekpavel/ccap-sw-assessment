import { OrganismWeightPipe } from './organismWeight';

describe('OrganismWeightPipe', () => {
	let pipe: OrganismWeightPipe;

	beforeEach(() => {
		pipe = new OrganismWeightPipe();
	});

	it('should create an instance of OrganismWeightPipe', () => {
		expect(pipe).toBeTruthy();
	});

	it('should return "172 kg" for "172" input', () => {
		expect(pipe.transform('172')).toBe('172 kg');
		expect(pipe.transform(172)).toBe('172 kg');
	});

	it('should return "20 kg" for "20" input', () => {
		expect(pipe.transform('20')).toBe('20 kg');
		expect(pipe.transform(20)).toBe('20 kg');
	});

	it('should return "" for "" input', () => {
		expect(pipe.transform('')).toBe('');
	});

	it('should not add "kg" for non-a-number input', () => {
		expect(pipe.transform('')).toBe('');
		expect(pipe.transform('twenty')).toBe('twenty');
		expect(pipe.transform('random')).toBe('random');
	});
});
