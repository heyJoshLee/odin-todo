import PageSection from "./pageSection";
import TodoItem from './todoItem';
const NewTodoForm = () => {
    const { spawnElement, changeParent } = PageSection();
    let projectsContainer;
    let form = document.createElement('form');
    form.id = 'new-todo-form'

    let titleInput;
    let descriptionInput;
    let dueDateInput;
    let notesInput;
    let priorityInput;
    let completedInput;
    let modal;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        createNewTodoItem(getFormValues().title,
            getFormValues().description,
            getFormValues().dueDate,
            getFormValues().priority,
            getFormValues().notes,
            getFormValues().completed
        )
        console.log('submit')
        clearForm();
        closeModal();
    });

    const setProjectsContainer = (newProjectsContainer) => {
        projectsContainer = newProjectsContainer;
        render();
    }

    const render = () => {
        form.textContent = '';
        if (modal) { modal.renderCloseButton(form); }

  


        spawnElement('h2', '', 'New todo for', form);
        if (projectsContainer && projectsContainer.getCurrentProject()) {
           spawnElement('h3', '', projectsContainer.getCurrentProject().title, form);
        }


        const titleLabel = spawnElement('label', '', 'Title', form);
        titleLabel.htmlFor = 'todo-title-input';
        titleInput = spawnElement('input', 'todo-title-input', '', form);
        titleInput.name = "title";

        const descriptionLabel = spawnElement('label', '', 'Description', form);
        descriptionLabel.htmlFor = 'todo-description-input';
        descriptionInput = spawnElement('textarea', 'todo-description-input', '', form);
        descriptionInput.name = "description";

        const dueDateLabel = spawnElement('label', '', 'Due Date', form);
        dueDateLabel.htmlFor = 'todo-due-date-input';
        dueDateInput = spawnElement('input', 'todo-due-date-input', '', form);
        dueDateInput.type = 'date';
        dueDateInput.name = "dueDate";


        const notesLabel = spawnElement('label', '', 'Notes', form);
        notesLabel.htmlFor = 'todo-notes-input';
        notesInput = spawnElement('textarea', 'todo-notes-input', '', form);
        notesInput.name = "notes";

        const priorityLabel = spawnElement('label', '', 'Priority', form);
        priorityLabel.htmlFor = 'todo-priority-input';
        priorityInput = spawnElement('select', 'todo-priority-input', '', form);
        const optionLow = spawnElement('option', '', 'Low', priorityInput);
        optionLow.value = 'low';
        const optionMedium = spawnElement('option', '', 'Medium', priorityInput);
        optionMedium.value = 'medium';
        const optionHigh = spawnElement('option', '', 'High', priorityInput);
        optionHigh.value = 'high';


        const completedLabel = spawnElement('label', '', 'Completed?', form);
        completedLabel.htmlFor = 'todo-completed-input';
        completedInput = spawnElement('input', 'todo-completed-input', '', form);
        completedInput.type = 'checkbox';
        completedInput.name = "completed";

        spawnElement('button', '', 'Add New Todo', form);
    }

    const getFormValues = () => {
        return {
            title: document.querySelector('#todo-title-input').value,
            description: document.querySelector('#todo-description-input').value,
            dueDate: document.querySelector('#todo-due-date-input').value,
            notes: document.querySelector('#todo-notes-input').value,
            priority: document.querySelector('#todo-priority-input').value,
            completed: document.querySelector('#todo-completed-input').value
        }

    }

    const createNewTodoItem = (title, description, dueDate, priority, completed) => {
        let newItem =  TodoItem(title, description, dueDate, priority, completed);
        projectsContainer.getCurrentProject().addTodoItem(newItem);

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

export default NewTodoForm;