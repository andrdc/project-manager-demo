import Listener from "../types/listener.type";
import Project from "./Project";

class ProjectState {
	private static instance: ProjectState;
	private projects: Project[];
	private listeners: Listener[];

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
		this.projects.push(new Project(title, description, people));

		console.debug(this.projects);

		for (const listenerFunction of this.listeners) {
			listenerFunction(this.projects.slice());
		}
	}

	AddListener(listernerFunction: Listener) {
		this.listeners.push(listernerFunction);

		console.debug('listener registered');
	}
}

export default ProjectState;