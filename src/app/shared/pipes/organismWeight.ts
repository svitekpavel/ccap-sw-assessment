import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'organismWeight'
})
export class OrganismWeightPipe implements PipeTransform {
	public transform(weight: string): string {
		return `${weight} kg`;
	}
}
