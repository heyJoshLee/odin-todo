import PageSection from "./pageSection";
import TodoItem from "./todoItem";
import Modal from './modal';
import NewTodoForm from "./newTodoForm";
const Project = (newTitle, newDescription, newDueDate, newNotes, newCompleted) => {
    const { spawnElementWithClass, spawnElement, spawnImage, changeParent } = PageSection();
    let title = newTitle;
    let description = newDescription;
    let dueDate = newDueDate;
    let notes = newNotes;
    let completed = newCompleted;
    let pageContainer;
    let projectDiv;
    let todoItems = [];
    let projectsContainer;
    let projectId;
    let modal;
    let createdTodoItems = 0;
    let isEditing = false;

    const addTodoItem = (itemToAdd) => {
        itemToAdd.setProjectId(projectId);
        itemToAdd.setTodoItemId(++createdTodoItems)
        todoItems.push(itemToAdd);
        render();
    }

    const setModal = (newModal) => {
        modal = newModal;
    }

    const setProjectsContainer = (newProjectsContainer) => {
        projectsContainer = newProjectsContainer;
    }

    const setProjectId = (newProjectId) => {
        projectId = newProjectId.toString();
    }

    const getProjectId = () => {
        return projectId;
    }

    const deleteProject = () => {
        projectsContainer.deleteProjectById(projectId);
    }

    const saveNewValues = () => {
        const newTitle = document.querySelector(`#project-${projectId}-edit-title-input`).value;
        title = newTitle;
    }
    const render = () => {
        if (!projectsContainer) {

            return;
        }
        projectDiv = projectsContainer.getCurrentProjectDiv();
        const renderHeaderSection = () => {
            if (!projectDiv) { projectDiv = spawnElement('div', 'current-project', '', pageContainer); }
            projectDiv.textContent = '';

            const renderNormallHeaderSection = () => {
                let headerDiv = spawnElementWithClass('div', 'project-header', '', projectDiv);
                spawnElement('h1', '', title, headerDiv);
                const editButton = spawnImage('../src/images/edit.png', headerDiv);
                editButton.classList.add('edit');
                editButton.addEventListener('click', () => {
                    isEditing = true;
                    render();
                })
    
                let todosHeadingContainer = spawnElement('div', 'todos-heading-container', '', projectDiv);
                spawnElement('h2', '', 'Todos', todosHeadingContainer);
                if (projectsContainer) { projectsContainer.getNewTodoFormModal().renderOpenButton(todosHeadingContainer); }
        
                if (modal) {
                    modal.renderOpenButton(todosHeadingContainer);
                }
            }

            const renderEditingHeaderSection = () => {
                let headerDiv = spawnElementWithClass('div', 'project-header', '', projectDiv);
                let projectEditTitleInput = spawnElement('input', `project-${projectId}-edit-title-input`, '', headerDiv);
                projectEditTitleInput.value = title;

                const projectEditSaveIcon = spawnImage('../src/images/save.png', headerDiv);
                projectEditSaveIcon.classList.add('save');
                projectEditSaveIcon.addEventListener('click', () => {
                    isEditing = false;
                    saveNewValues();
                    render();
                })



                let deleteButton = spawnElement('div', `${projectId}-delete-button`, 'delete', headerDiv);
                deleteButton.classList.add('project-delete-button');
                deleteButton.addEventListener('click', () => {
                    let wantToDelete = confirm('Are you sure you want to delete this project and all related todos?');
                    if (wantToDelete) { deleteProject() }
                });
            }

            if (!isEditing) {
                renderNormallHeaderSection();
            } else {
                renderEditingHeaderSection();
            }


        }

        const renderTodoItems = () => {
            todoItems.forEach((todoItem) => {
                changeParent(todoItem.getElement(), projectDiv);
                todoItem.render();
            })
        }
    
        pageContainer = document.querySelector('#page-container');
        renderHeaderSection();
        renderTodoItems();
    }


    render();

    return {
        title,
        description,
        dueDate,
        completed,
        projectId,
        notes,
        addTodoItem,
        setProjectsContainer,
        setProjectId,
        getProjectId,
        setModal,
        render
    }
}

export default Project;