import Component from "./Component";
import ProjectState from "./ProjectState";
import Validatable from "./Validatable";

function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	return {
		configurable: true,
		enumerable: false,
		get() {
			return originalMethod.bind(this);
		}
	}
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
	private state = ProjectState.GetInstance();
	private titleInputElement: HTMLInputElement;
	private descriptionInputElement: HTMLInputElement;
	private peopleInputElement: HTMLInputElement;

	constructor() {
		super('project-input', 'app', 'user-input');

		this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

		this.Configure();
	}

	private Configure() {
		this.element.addEventListener('submit', this.SubmitHandler);
	}

	@Autobind
	private SubmitHandler(event: Event) {
		event.preventDefault();
		const input = this.GatherUserInput();
		if (Array.isArray(input)) {
			const [title, description, people] = input;
			this.CreateProject(title, description, people);
			this.ClearInputs();
		}
	}

	private GatherUserInput(): [string, string, number] | void {
		const title = new Validatable(
			this.titleInputElement.value,
			true,
			5,
			20
		);
		const description = new Validatable(
			this.descriptionInputElement.value,
			true,
			10,
			50
		);
		const people = new Validatable(
			+this.peopleInputElement.value,
			true,
			0,
			5
		);

		if (title.IsValid() && description.IsValid() && people.IsValid()) {
			return [title.value, description.value, people.value];
		} else {
			alert('Invalid input');
			return;
		}
	}

	private CreateProject(title: string, description: string, people: number) {
		this.state.AddProject(title, description, people);
	}

	private ClearInputs() {
		this.titleInputElement.value = '';
		this.descriptionInputElement.value = '';
		this.peopleInputElement.value = '';
	}
}

export default ProjectInput;