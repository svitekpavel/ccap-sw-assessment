import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'genderAvatar'
})
export class GenderAvatarPipe implements PipeTransform {
	public transform(gender: string): string {
		if (gender === 'male') {
			return '&#9894;';
		} else if (gender === 'female') {
			return '&#9792;';
		}
		return '?';
	}
}
