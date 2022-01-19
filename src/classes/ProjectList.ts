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
			console.debug(this.assignedProjects);
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

	@Autobind
	dragOverHandler(event: DragEvent) {
		console.debug(event);
	};

	@Autobind
	dropHandler(event: DragEvent) {
		console.debug(event);
	};

	@Autobind
	dragLeaveHandler(event: DragEvent) {
		console.debug(event);
	};
}

export default ProjectList;