import Component from "./Component";
import Project from "./Project";
import ProjectState from "./ProjectState";
import ProjectItem from "./ProjectItem";
import ProjectType from "../enums/project-type.enum";

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
	private type: ProjectType;
	private assignedProjects: Project[];
	private state = ProjectState.GetInstance();

	constructor(type: ProjectType) {
		super('project-list', 'app', `${type}-projects`);

		this.type = type;
		this.assignedProjects = [];

		this.state.AddListener((projects: Project[]) => {
			const relevantProjects = projects.filter(project => { return project.status === this.type; });
			this.assignedProjects = relevantProjects;
			console.debug(this.assignedProjects);
			this.RenderProjects();
		});

		this.RenderContent();
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
}

export default ProjectList;