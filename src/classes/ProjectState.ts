class ProjectState {
	private static instance: ProjectState;

	private constructor() { }

	static GetInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new ProjectState();
		return this.instance;
	}
}

export default ProjectState;