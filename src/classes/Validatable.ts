class Validatable {
	private _value: string | number;
	private required?: boolean;
	private minLength?: number;
	private maxLength?: number;
	private min?: number;
	private max?: number;

	constructor(value: number, required?: boolean, min?: number, max?: number);
	constructor(value: string, required?: boolean, min?: number, max?: number);
	constructor(value: any, required?: boolean, min?: number, max?: number) {
		this._value = value;
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

		if (typeof this._value === 'string') {
			if (this.required) {
				isValid = isValid && this._value.trim().length !== 0;
			}
			if (this.minLength != null) {
				isValid = isValid && this._value.length > this.minLength;
			}
			if (this.maxLength != null) {
				isValid = isValid && this._value.length < this.maxLength;
			}
		} else if (typeof this._value === 'number') {
			if (this.min != null) {
				isValid = isValid && this._value > this.min;
			}
			if (this.max != null) {
				isValid = isValid && this._value < this.max;
			}
		}

		return isValid;
	}

	get value(): any {
		return this._value;
	}
}

export default Validatable;