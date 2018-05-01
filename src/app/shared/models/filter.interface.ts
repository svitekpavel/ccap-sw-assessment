import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface FilterAttributeOption {
	valueKey: string;
	status: BehaviorSubject<boolean>;
}
export interface FilterAttribute {
	attributeKey: string;
	values: FilterAttributeOption[];
}
