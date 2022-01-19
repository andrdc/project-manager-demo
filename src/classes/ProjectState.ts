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

	AddProject(title: string, description: string, people: number) {
		this.projects.push(new Project(title, description, people));

		console.debug(this.projects);

		for (const listenerFunction of this.listeners) {
			listenerFunction(this.projects.slice());
		}
	}
}

export default ProjectState;