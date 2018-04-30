import { Pipe, PipeTransform } from "@angular/core";
/*
 * Add units to a number string
 * Takes an unit argument that defaults to 'cm'.
 * Usage:
 *   value | units:unit
 * Example:
 *   {{ 2 | units:kg }}
 *   formats to: 2 kg
*/
@Pipe({ name: "units" })
export class UnitsPipe implements PipeTransform {
	transform(value: string, unit: string = "cm"): string {
		if (value === "unknown" || value === undefined) {
			return `Unknown`;
		}
		return `${value} ${unit}`;
	}
}
