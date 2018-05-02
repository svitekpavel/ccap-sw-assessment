import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface FilterAttributeOption {
	value: string;
	isActiveFilter: BehaviorSubject<boolean>;
}
export interface FilterAttribute {
	attributeKey: string;
	values: FilterAttributeOption[];
}
