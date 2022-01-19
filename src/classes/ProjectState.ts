import ProjectType from "../enums/project-type.enum";
import Project from "./Project";
import State from "./State";

class ProjectState extends State<Project>{
	private static instance: ProjectState;
	private projects: Project[];

	private constructor() {
		super();
		this.projects = [];
	}

	static GetInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	private updateListeners() {
		for (const listenerFunction of this.listeners) {
			listenerFunction(this.projects.slice());
		}
	}

	AddProject(title: string, description: string, people: number) {
		this.projects.push(new Project(title, description, people));
		this.updateListeners();
	}

	UpdateProjectStatus(projectId: string, newStatus: ProjectType) {
		const project = this.projects.find(project => project.id === projectId);

		if (project && project.status !== newStatus) {
			project.status = newStatus;
			this.updateListeners();
		}
	}
}

export default ProjectState;