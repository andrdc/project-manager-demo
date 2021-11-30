export default class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;

	constructor() {
		this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		const node = document.importNode(this.templateElement.content, true);
		this.element = node.firstElementChild as HTMLFormElement;
		this.attach();
	}

	private attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}