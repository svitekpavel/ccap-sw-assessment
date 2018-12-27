import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'organismHeight'
})
export class OrganismHeightPipe implements PipeTransform {
	public transform(height: string | number): string {
		if (height && height !== '' && !isNaN(height as number)) {
			return `${height} cm`;
		}
		return height.toString();
	}
}
