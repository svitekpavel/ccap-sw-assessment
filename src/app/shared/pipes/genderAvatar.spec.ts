import { GenderAvatarPipe } from './genderAvatar';

describe('GenderAvatarPipe', () => {
    let pipe: GenderAvatarPipe;

    beforeEach(() => {
        pipe = new GenderAvatarPipe();
    });

    it('should create an instance of GenderAvatarPipe', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return "&#9894;" for "male" input', () => {
        expect(pipe.transform('male')).toBe('&#9894;');
    });

    it('should return "&#9792;" for "female" input', () => {
        expect(pipe.transform('female')).toBe('&#9792;');
    });

    it('should return "?" for "n/a" input', () => {
        expect(pipe.transform('n/a')).toBe('?');
    });

    it('should return "?" for empty and any other input', () => {
        expect(pipe.transform('')).toBe('?');
        expect(pipe.transform('M')).toBe('?');
        expect(pipe.transform('F')).toBe('?');
        expect(pipe.transform('1')).toBe('?');
    });
})