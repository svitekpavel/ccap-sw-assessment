import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'organismWeight'
})
export class OrganismWeightPipe implements PipeTransform {
	public transform(weight: string | number): string {
		if (weight && weight !== '' && !isNaN(weight as number)) {
			return `${weight} kg`;
		}
		return weight.toString();
	}
}
