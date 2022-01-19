import Component from "./Component";
import Project from "./Project";
import ProjectState from "./ProjectState";
import ProjectItem from "./ProjectItem";
import { Autobind } from "../utils/autobind-helper";
import DragTarget from "../models/drag-target.model";
import ProjectType from "../enums/project-type.enum";

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
	private type: ProjectType;
	private assignedProjects: Project[];
	private state = ProjectState.GetInstance();

	constructor(type: ProjectType) {
		super('project-list', 'app', `${type}-projects`);

		this.type = type;
		this.assignedProjects = [];

		this.Configure();
		this.RenderContent();
	}

	private Configure() {
		this.state.AddListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => { return project.status === this.type; });
			this.assignedProjects = relevantProjects;
			this.RenderProjects();
		});

		this.element.addEventListener('dragover', this.dragOverHandler);
		this.element.addEventListener('drop', this.dropHandler);
		this.element.addEventListener('dragleave', this.dragLeaveHandler);
	}

	private RenderContent() {
		this.element.querySelector('ul')!.id = `${this.type}-project-list`;
		this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`;
	}

	private RenderProjects() {
		const listElement = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
		listElement.textContent = '';

		for (const project of this.assignedProjects) {
			new ProjectItem(listElement.id, project);
		}
	}

	private addDroppableClass() {
		const listElement = this.element.querySelector('ul');
		listElement?.classList.add('droppable');
	}

	private removeDroppableClass() {
		const listElement = this.element.querySelector('ul');
		listElement?.classList.remove('droppable');
	}

	@Autobind
	dragOverHandler(event: DragEvent) {
		event.preventDefault();
		this.addDroppableClass();
	};

	@Autobind
	dropHandler(event: DragEvent) {
		this.removeDroppableClass();
		this.state.UpdateProjectStatus(event.dataTransfer!.getData('text/plain'), this.type === ProjectType.active ? ProjectType.active : ProjectType.finished);
	};

	@Autobind
	dragLeaveHandler(_: DragEvent) {
		this.removeDroppableClass();
	};
}

export default ProjectList;