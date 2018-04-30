import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
	name: "galacticYear"
})
export class GalacticYearPipe implements PipeTransform {
	constructor(private _sanitizer: DomSanitizer) {}
	transform(value: string): SafeHtml {
		const regex = RegExp("([0-9,]*)(ABY|BBY)", "gi");

		const parts = regex.exec(value);
		if (parts && parts[1] && parts[2]) {
			const year = parts[1];
			const epoch = parts[2];
			const epochFull = this.getFullEpoch(epoch);

			return this._sanitizer.bypassSecurityTrustHtml(
				`${year}<abbr title="${epochFull}">${epoch}</abbr>`
			);
		} else {
			return "Unknown";
		}
	}

	getFullEpoch(epoch: string): string {
		let epochFull = "";

		switch (epoch) {
			case "BBY":
				epochFull = "Before the Battle of Yavin";
				break;
			case "ABY":
				epochFull = "After the Battle of Yavin";
				break;
			default:
				// No match, sanitize and return value
				epochFull = "Unknown";
		}

		return epochFull;
	}
}
