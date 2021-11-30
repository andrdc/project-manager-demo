export default class ProjectInput {
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

	private SubmitHandler(event: Event) {
		event.preventDefault();
		console.debug(event);
		console.debug(this);
	}

	private Configure() {
		this.element.addEventListener('submit', this.SubmitHandler.bind(this));
	}

	private Attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}