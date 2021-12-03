import ProjectType from "../enums/project-type.enum";
import Project from "./Project";
import ProjectState from "./ProjectState";

class ProjectList {
	private type: ProjectType;
	private assignedProjects: Project[];
	private state = ProjectState.GetInstance();
	private templateElement: HTMLTemplateElement;
	private hostElement: HTMLDivElement;
	private element: HTMLElement;

	constructor(type: ProjectType) {
		this.type = type;
		this.assignedProjects = [];
		this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
		this.hostElement = document.getElementById('app')! as HTMLDivElement;

		const node = document.importNode(this.templateElement.content, true);
		this.element = node.firstElementChild as HTMLElement;
		this.element.id = `${this.type}-projects`;

		this.state.AddListener((projects: Project[]) => {
			this.assignedProjects = projects;
			console.debug(this.assignedProjects);
			this.RenderProjects();
		});

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

	private RenderProjects() {
		const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
		listElement.textContent = '';

		for (const project of this.assignedProjects) {
			const listItemElement = document.createElement('li');
			listItemElement.textContent = project.title;
			listElement.appendChild(listItemElement);
		}
	}
}

export default ProjectList;