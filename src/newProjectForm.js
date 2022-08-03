import PageSection from "./pageSection";
import Project from './project';

const NewProjectForm = () => {
    const { spawnElement, changeParent } = PageSection();
    let pageContainer;
    let projectsContainer;
    let form = document.createElement('form');
    let titleInput;
    let descriptionInput;
    let dueDateInput;
    let priorityInput;
    let completedInput;
    let modal;

    const setProjectsContainer = (newProjectsContainer) => {
        projectsContainer = newProjectsContainer;
    }

    const render = () => {
        pageContainer = document.querySelector('#page-container');
        form.id = 'new-project-form'
        if (modal) { modal.renderCloseButton(form); }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const newProject = createNewProject(getFormValues().title,
                            getFormValues().description,
                            getFormValues().dueDate,
                            getFormValues().priority,
                            getFormValues().completed
                            )
            projectsContainer.addProject(newProject);
            clearForm();
            closeModal();
        });

        spawnElement('h2', '', 'New Project', form);

        const titleLabel = spawnElement('label', '', 'Project Title', form);
        titleLabel.htmlFor = 'projectTitleInput';
        titleInput = spawnElement('input', 'projectTitleInput', '', form);
        titleInput.name = "title";

        const descriptionLabel = spawnElement('label', '', 'Project Description', form);
        descriptionLabel.htmlFor = 'projectDescriptionInput';
        descriptionInput = spawnElement('textarea', 'projectDescriptionInput', '', form);
        descriptionInput.name = "description";

        const dueDateLabel = spawnElement('label', '', 'Project dueDate', form);
        dueDateLabel.htmlFor = 'projectDueDateInput';
        dueDateInput = spawnElement('input', 'projectDueDateInput', '', form);
        dueDateInput.type = 'date';
        dueDateInput.name = "dueDate";


        const priorityLabel = spawnElement('label', '', 'Project Priority', form);
        priorityLabel.htmlFor = 'projectPriorityInput';
        priorityInput = spawnElement('select', 'projectPriorityInput', '', form);
        const optionLow = spawnElement('option', '', 'Low', priorityInput);
        optionLow.value = 'low';
        const optionMedium = spawnElement('option', '', 'Medium', priorityInput);
        optionMedium.value = 'medium';
        const optionHigh = spawnElement('option', '', 'High', priorityInput);
        optionHigh.value = 'high';

        const completedLabel = spawnElement('label', '', 'Project completed', form);
        completedLabel.htmlFor = 'projectCompletedInput';
        completedInput = spawnElement('input', 'projectCompletedInput', '', form);
        completedInput.type = 'checkbox';
        completedInput.name = "completed";

        spawnElement('button', '', 'Add New Project', form );
    }

    const getFormValues = () => {
        return {
            title: document.querySelector('#projectTitleInput').value,
            description: document.querySelector('#projectDescriptionInput').value,
            dueDate: document.querySelector('#projectDueDateInput').value,
            priority: document.querySelector('#projectPriorityInput').value,
            completed: document.querySelector('#projectCompletedInput').value
        }
    }

    const createNewProject = (title, description, dueDate, priority, completed) => {
         return Project(title, description, dueDate, priority, completed);
    }

    const getFormDiv = () => {
        return form;
    }

    const clearForm = () => {
        titleInput.value = "";
        descriptionInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "";
        completedInput.value = "";
    }

    const closeModal = () => {
        console.log(modal)
        if (modal) {
            modal.close(); 
        }

    }

    const setModal = function (newModal) {
        modal = newModal;
        changeParent(form, modal.getModalDiv());
    }

    return {
        render,
        changeParent,
        setModal,
        getFormDiv,
        setProjectsContainer
    }
}

export default NewProjectForm;