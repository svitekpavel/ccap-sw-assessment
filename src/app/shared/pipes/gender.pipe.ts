import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
/*
 * Replace gender string with a unicode gender icon
 * 
 * Usage:
 *   value | gender
 * Example:
 *   {{ female | gender }}
 *   formats to: <span data-tooltip="female" class="gender">&#x2640;</span>
*/
@Pipe({
	name: "gender"
})
export class GenderPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}

	transform(value: string): SafeHtml {
		let icon: string;

		switch (value) {
			case "male":
				icon = "&#x2642;";
				break;
			case "female":
				icon = "&#x2640;";
				break;
			case "hermaphrodite":
				icon = "&#x26A5;";
				break;
			default:
				icon = "?";
				value = "Unknown";
				break;
		}

		return this._sanitizer.bypassSecurityTrustHtml(
			`<span data-tooltip="${value}" class="gender">${icon}</span>`
		);
	}
}
