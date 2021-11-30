import './styles/style.css';
import ProjectInput from './classes/ProjectInput';

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `<h1>Project Manager</h1>`;
new ProjectInput();