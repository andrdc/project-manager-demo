import ProjectType from "../enums/project-type.enum";

class ProjectList {
	private templateElement: HTMLTemplateElement;
	private hostElement: HTMLDivElement;
	private element: HTMLElement;
	private type: ProjectType;

	constructor(type: ProjectType) {
		this.type = type;
		this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		const node = document.importNode(this.templateElement.content, true);
		this.element = node.firstElementChild as HTMLElement;
		this.element.id = `${this.type}-projects`;

		this.Attach();
		this.RenderContent();
	}

	private Attach() {
		this.hostElement.insertAdjacentElement('beforeend', this.element);
	}

	private RenderContent() {
		this.element.querySelector('ul')!.id = `${this.type}-project-list`;
		this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
	}
}

export default ProjectList;