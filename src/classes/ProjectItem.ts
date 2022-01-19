import Component from "./Component";
import Project from "./Project";
import { Autobind } from "../utils/autobind-helper";
import Draggable from "../models/draggable.model";

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
	private project: Project;

	private get persons() {
		return this.project.people === 1 ? '1 Person' : `${this.project.people} Persons`;
	}

	constructor(hostElementId: string, project: Project) {
		super('single-project', hostElementId, project.id);

		this.project = project;

		this.Configure();
		this.RenderContent();
	}

	private Configure() {
		this.element.addEventListener('dragstart', this.dragStartHandler);
		this.element.addEventListener('dragend', this.dragEndHandler);
	}

	private RenderContent() {
		this.element.querySelector('h2')!.textContent = this.project.title;
		this.element.querySelector('h3')!.textContent = `${this.persons} assigned`;
		this.element.querySelector('p')!.textContent = this.project.description;
	}

	@Autobind
	dragStartHandler(event: DragEvent) {
		console.debug(event);
	};

	@Autobind
	dragEndHandler(event: DragEvent) {
		console.debug(event);
	};
}

export default ProjectItem;