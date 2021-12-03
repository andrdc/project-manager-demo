import Project from "../models/project.model";

class ProjectState {
	private static instance: ProjectState;
	private projects: Project[];
	private listeners: Function[];

	private constructor() {
		this.projects = [];
		this.listeners = [];
	}

	static GetInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}

	AddProject(title: string, description: string, people: number) {
		this.projects.push({
			id: Math.random().toString(),
			title: title,
			description: description,
			people: people
		});

		console.debug(this.projects);

		for (const listenerFunction of this.listeners) {
			listenerFunction(this.projects.slice());
		}
	}

	AddListener(listernerFunction: Function) {
		this.listeners.push(listernerFunction);

		console.debug('listener registered');
	}
}

export default ProjectState;