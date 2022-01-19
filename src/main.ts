import './styles/style.css';
import ProjectInput from './classes/ProjectInput';
import ProjectList from './classes/ProjectList';
import ProjectType from './enums/project-type.enum';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `<h1>Project Manager</h1>`;
new ProjectInput();
new ProjectList(ProjectType.active);
new ProjectList(ProjectType.finished);