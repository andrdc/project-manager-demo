import './styles/style.css';
import ProjectType from './enums/project-type.enum';
import ProjectInput from './classes/ProjectInput';
import ProjectList from './classes/ProjectList';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `<h1>Project Manager</h1>`;
new ProjectInput();
new ProjectList(ProjectType.active);
new ProjectList(ProjectType.finished);