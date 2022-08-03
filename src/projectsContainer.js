import PageSection from "./pageSection";
import Project from "./project";
import Modal from "./modal";
import NewTodoForm from "./newTodoForm";
import NewProjectForm from "./newProjectForm";

const ProjectTitlesContainer = function () {
    const { spawnElement, spawnElementWithClass } = PageSection();
    const pageContainer = document.querySelector('#page-container');
    let projectListContainerDiv = spawnElement('div', 'project-titles-container', 'content', pageContainer);
    let currentProjectDiv = spawnElement('div', 'current-project', '', pageContainer);
    let currentProject;
    let currentProjectContainer;
    let idToAddToNewProject = 0;

    let newProjectForm = NewProjectForm();
    let newProjectFormModal = Modal();
    
    newProjectForm.setModal(newProjectFormModal);
    newProjectForm.render();

    let newTodoForm = NewTodoForm();
    let newTodoFormModal = Modal();

    newTodoForm.setModal(newTodoFormModal);
    newTodoForm.render();


    const projects = [];

    if (projects.length > 0) {
        currentProject = projects[0];
    }

    const getNewProjectForm = () => {
        return newProjectForm;
    }

    const getCurrentProjectDiv = () => {
        return currentProjectDiv;
    }


    const getProjectListContainerDiv = () => {
        return projectListContainerDiv;
    }

    const getNewTodoForm = () => {
        return newTodoForm;
    }

    const getCurrentProject = () => {
        return currentProject;
    }

    const setNewProjectFormModal = (modalToSet) => {
        newProjectFormModal = modalToSet;
    }

    const getNewProjectFormModal = () => {
        return newProjectFormModal;
    }

    const getNewTodoFormModal = () => {
        return newTodoFormModal;
    }

    const renderProjectList = () => {
        const projectList = spawnElement('ul', 'project-list', '', projectListContainerDiv);
        projects.forEach(project => renderProject(projectList, project));
    }

    const createProject = function (projectToAdd) {
        projectToAdd.setProjectId(++idToAddToNewProject);
        projectToAdd.setProjectsContainer(this);
        projects.push(projectToAdd);
        projectToAdd.render();
        currentProject = projectToAdd;
        render();
    }

    const addProject = function(projectToAdd) {
        createProject.call(this, projectToAdd);
        setCurrentProject(projectToAdd); 
    }

    const renderProject = (projectList, project) => {
        const newElement = spawnElementWithClass('li', 'project-link', '', projectList);
        newElement.dataset.projectId = project.getProjectId();
        spawnElementWithClass('div', 'project-title-link', project.title, newElement);
        if (currentProject && currentProject.getProjectId() === project.getProjectId()) {
            newElement.classList.add('current-project-nav');
        }
        newElement.addEventListener('click', () => {
            setCurrentProjectById(newElement.dataset.projectId);
            if (!currentProjectContainer) {
                currentProjectContainer = document.querySelector('#current-project');
            }
            currentProjectContainer.textContent = '';
            currentProject.render();
            render();
        })
    }

    const setCurrentProjectById = (id) => {
        currentProject = projects.find((project) => {
            return project.getProjectId() === id;
        });

    }

    const setCurrentProject = (newCurrentProject) => {
        currentProject = newCurrentProject;
        newTodoForm.render();
    }

    const deleteProjectById = (id) => {
        let projectToDelete;
        projectToDelete = projects.find((project) => {
            return project.getProjectId() === id;
        })
        let indexToDelete = projects.indexOf(projectToDelete);
        projects.splice(indexToDelete, 1);
        currentProject = projects[0];
        currentProject.render()
        render();
    }

    const render = () => {       
        projectListContainerDiv.textContent = '';

        const projectLegendAndButtonContainer = spawnElement('div', 'project-legend-and-button-container', '', projectListContainerDiv);
        spawnElement('div', 'projects-list-header', 'Projects', projectLegendAndButtonContainer);
        if (newProjectFormModal) {
            newProjectFormModal.renderOpenButton(projectLegendAndButtonContainer);
        }

        renderProjectList();
        newTodoForm.render();
    }

    return {
        render,
        projects,
        addProject,
        setNewProjectFormModal,
        getNewProjectFormModal,
        deleteProjectById,
        getCurrentProject,
        getNewProjectForm,
        getNewTodoFormModal,
        getNewTodoForm,
        getCurrentProjectDiv,
        getProjectListContainerDiv
    }
}

export default ProjectTitlesContainer;