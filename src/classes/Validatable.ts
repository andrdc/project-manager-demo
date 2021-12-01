class Validatable {
	private value?: string | number;
	private required?: boolean;
	private minLength?: number;
	private maxLength?: number;
	private min?: number;
	private max?: number;

	constructor(value: number, required?: boolean, min?: number, max?: number);
	constructor(value: string, required?: boolean, min?: number, max?: number);
	constructor(value?: any, required?: boolean, min?: number, max?: number) {
		this.value = value;
		this.required = required;

		if (typeof value === 'string') {
			this.minLength = min;
			this.maxLength = max;
		} else if (typeof value === 'number') {
			this.min = min;
			this.max = max;
		}
	}

	IsValid(): boolean {
		let isValid = true;

		if (typeof this.value === 'string') {
			if (this.required) {
				isValid = isValid && this.value.trim().length !== 0;
			}
			if (this.minLength != null) {
				isValid = isValid && this.value.length > this.minLength;
			}
			if (this.maxLength != null) {
				isValid = isValid && this.value.length < this.maxLength;
			}
		} else if (typeof this.value === 'number') {
			if (this.min != null) {
				isValid = isValid && this.value > this.min;
			}
			if (this.max != null) {
				isValid = isValid && this.value < this.max;
			}
		}

		return isValid;
	}
}

export default Validatable;