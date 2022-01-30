import { projects } from "./assets/projects.js";
import { projectHtml } from "./components/buildProject.js";

const container = document.querySelector("main");

const queryString = document.location.search;
const params = new URLSearchParams(queryString);

// get the project from the querystring
export const id = params.get("project");

if (!id) {
  location.href = "/";
}

// match the project key with id in array.

let project = null;

for (let i = 0; projects.length > i; i++) {
  if (projects[i].id === id) {
    project = projects[i];
  }
}

if (project) {
  document.title = "Dennis Løvold | " + project.title;
  container.innerHTML = projectHtml(project);
} else {
  location.href = "/";
}
