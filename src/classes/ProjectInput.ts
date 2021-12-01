function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	return {
		configurable: true,
		enumerable: false,
		get() {
			return originalMethod.bind(this);
		}
	}
}

class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		const node = document.importNode(this.templateElement.content, true);
		this.element = node.firstElementChild as HTMLFormElement;
		this.element.id = 'user-input';

		this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

		this.Configure();
		this.Attach();
	}

	@Autobind
	private SubmitHandler(event: Event) {
		event.preventDefault();
		this.GatherUserInput();
		this.CleanInputs();
	}

	private CleanInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}

	private GatherUserInput() {
		console.info(this.titleInputElement.value);
		console.info(this.descriptionInputElement.value);
		console.info(this.peopleInputElement.value);
	}

	private Configure() {
		this.element.addEventListener('submit', this.SubmitHandler);
	}

	private Attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}

export default ProjectInput;