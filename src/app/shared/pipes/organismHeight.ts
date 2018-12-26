import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'organismHeight'
})
export class OrganismHeightPipe implements PipeTransform {
	public transform(height: string): string {
		return `${height} cm`;
	}
}
