import ProjectType from "../enums/project-type.enum";

class Project {
	readonly id: string;
	title: string;
	description: string;
	people: number;
	status: ProjectType;

	constructor(title: string, description: string, people: number) {
		this.id = Math.random().toString();
		this.title = title;
		this.description = description;
		this.people = people;
		this.status = ProjectType.active;
	}
}

export default Project;