abstract class Component<T extends HTMLElement, U extends HTMLElement> {
	protected templateElement: HTMLTemplateElement;
	protected hostElement: T;
	protected element: U;

	constructor(templateId: string, newElementId: string) {
		this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as T;

		const node = document.importNode(this.templateElement.content, true);
		this.element = node.firstElementChild as U;
		this.element.id = newElementId;

		this.Attach();
	}

	private Attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}
}

export default Component;