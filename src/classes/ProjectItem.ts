import Component from "./Component";
import Project from "./Project";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
	private project: Project;

	private get persons() {
		return this.project.people === 1 ? '1 Person' : `${this.project.people} Persons`;
	}

	constructor(hostElementId: string, project: Project) {
		super('single-project', hostElementId, project.id);

		this.project = project;
		this.RenderContent();
	}

	private RenderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
		this.element.querySelector('p')!.textContent = this.project.description;
	}
}

export default ProjectItem;