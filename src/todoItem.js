import PageSection from "./pageSection";
const TodoItem = (newTitle, newDescription, newDueDate, newPriority, newNotes, newCompleted) => {
    const { spawnElement, spawnElementWithClass, spawnImage } = PageSection();
    let currentProjectDiv = document.querySelector('#current-project');
    let element = document.createElement('div');
    element.classList.add('todo');

    let title = newTitle;
    let description = newDescription;
    let dueDate = newDueDate;
    let priority = newPriority;
    let notes = newNotes;
    let completed = newCompleted;
    let todoItemId;
    let projectId;
    let isEditing = false;
    

    const setProjectId = (newId) => {
        projectId = newId;
    }

    const getElement = () => {
        return element;
    }

    const getIsEditing = () => {
        return isEditing;
    }

    const setIsEditing = (newIsEditing) => {
        isEditing = newIsEditing;
        render();
    }

    const getTitle = () => {
        return title;
    }

    const getDescription = () => {
        return description;
    }

    const getDueDate = () =>{
        return dueDate;
    }

    const getPriority = () => {
        return priority;
    }

    const getNotes = () => {
        return notes;
    }

    const getCompleted = () => {
        return completed;
    }

    const getProjectId = () => {
        return projectId;
    }

    const getTodoItemId = () => {
        return todoItemId;
    }

    const setTodoItemId = (newTodoItemId) => {
        todoItemId = newTodoItemId;
    }

    const getPriorityLevelString = () => {
            switch (priority) {
                case '1': 
                    return 'low';
                    break;
                case '2':
                    return 'medium';
                    break;
                case '3':
                    return 'high';
                    break;
             }
    }

    const toggleCompleted = () => {
        completed = !completed;
    }

    const saveNewValues = () => {
        const newTitle = document.querySelector(`#todo-${todoItemId}-edit-title-input`).value;
        const newPriority = document.querySelector(`#todo-${todoItemId}-edit-priority-input`).value;
        const newDueDate = document.querySelector(`#todo-${todoItemId}-edit-due-date-input`).value;
        const newNotes = document.querySelector(`#todo-${todoItemId}-edit-notes-input`).value;
        const newDescription = document.querySelector(`#todo-${todoItemId}-edit-description-input`).value;
        const newCompleted = document.querySelector(`#todo-${todoItemId}-edit-completed-input`).checked;
        console.log(newCompleted)
        title = newTitle;
        priority = newPriority;
        dueDate = newDueDate;
        notes = newNotes;
        description = newDescription;
        completed = newCompleted;
    }


    const render = () => {
        element.innerText = '';
        const renderNormalTodoDiv = () => {
            const todoHeading = spawnElementWithClass('div', 'todo-heading', '', element);
            const todoitle = spawnElementWithClass('div', 'todo-title', getTitle(), todoHeading);
            if (getCompleted()) { todoitle.classList.add('completed'); }

            const priorityText = getPriorityLevelString();
            const todoPriority = spawnElementWithClass('div','todo-priority', priorityText, todoHeading);
            todoPriority.classList.add(priorityText)


            const downArrow = spawnImage('../src/images/arrow-down.png', todoHeading);
            downArrow.classList.add('expand');

            const editingButton = spawnImage('../src/images/edit.png', todoHeading );
            editingButton.classList.add('edit');
            editingButton.addEventListener('click', () => {
                isEditing = true;
                render();
            })

            const todoBodyDiv = spawnElementWithClass('div','todo-body', '', element);

            downArrow.addEventListener('click', () => {
                todoBodyDiv.classList.toggle('expanded');
            });

            const todoDueDateContainer = spawnElementWithClass('div', 'todo-due-date-container', '', todoBodyDiv);
            const todoDueDate = spawnElementWithClass('div','todo-due-date', getDueDate(), todoDueDateContainer);

            spawnImage('../src/images/calendar.png', todoDueDateContainer);

            const todoDescription = spawnElementWithClass('div','todo-description', getDescription(), todoBodyDiv);
   
            const todoNotes = spawnElementWithClass('div','todo-notes', getNotes(), todoBodyDiv);
            const todoMarkAsDoneButton = spawnElement('div', '', '', todoBodyDiv);
            todoMarkAsDoneButton.classList.add('mark-as-done-button');
            todoMarkAsDoneButton.addEventListener('click', () => {
                toggleCompleted();
                render();
            })
            if (!completed) {
                todoMarkAsDoneButton.textContent = 'Mark as done'
            } else {
                todoMarkAsDoneButton.classList.add('complete');
                todoMarkAsDoneButton.textContent = 'Mark as incomplete'
            }
  

        }

        const renderEditingTodoDiv = () => {

            const todoEditHeading = spawnElementWithClass('div', 'todo-edit-heading', '', element);
            const todoEditTitleInput = spawnElement('input', `todo-${todoItemId}-edit-title-input`, '', todoEditHeading);
            todoEditTitleInput.value = getTitle();

            const todoEditPriorityInput = spawnElement('select', `todo-${todoItemId}-edit-priority-input`, '', todoEditHeading);
            const optionLow = spawnElement('option', '', 'Low', todoEditPriorityInput);
            optionLow.value = '1';
            if (optionLow.value === getPriorityLevelString()) {
                optionLow.selected = true;
            }
            const optionMedium = spawnElement('option', '', 'Medium', todoEditPriorityInput);
            optionMedium.value = '2';
            if (optionMedium.value === getPriorityLevelString()) {
                optionMedium.selected = true;
            }
            const optionHigh = spawnElement('option', '', 'High', todoEditPriorityInput);
            optionHigh.value = '3';
            if (optionHigh.value === getPriorityLevelString()) {
                optionHigh.selected = true;
            }

            const todoEditSaveIcon = spawnImage('../src/images/save.png', todoEditHeading);
            todoEditSaveIcon.classList.add('save');
            todoEditSaveIcon.addEventListener('click', () => {
                isEditing = false;
                saveNewValues();
                render();
            })


            const todoEditBodyDiv = spawnElementWithClass('div', 'todo-edit-body', '', element);

            const todoEditDueDateContainer = spawnElementWithClass('div', 'todo-edit-due-date-container', '', todoEditBodyDiv);


            const todoEditDueDateContainerInput = spawnElement('input', `todo-${todoItemId}-edit-due-date-input`, '', todoEditDueDateContainer);
            todoEditDueDateContainerInput.type = 'date';
            todoEditDueDateContainerInput.value = getDueDate();


            const todoEditDescriptionInput = spawnElement('textarea',`todo-${todoItemId}-edit-description-input`, getDescription(), todoEditBodyDiv);
   
            const todoNotes = spawnElement('textarea',`todo-${todoItemId}-edit-notes-input`, getNotes(), todoEditBodyDiv);

            const todoEditCompletedLabel = spawnElement('label', `todo-${todoItemId}-edit-completed-label`, 'Completed', todoEditBodyDiv)
            const todoEditCompletedInput = spawnElement('input', `todo-${todoItemId}-edit-completed-input`, '', todoEditBodyDiv)
            todoEditCompletedInput.type = 'checkbox';
            todoEditCompletedInput.checked = completed;
        }

        if (!isEditing) {
            renderNormalTodoDiv();
        } else {
            renderEditingTodoDiv();
        }
    }

    return {
        getTitle,
        getProjectId,
        getDescription,
        getDueDate,
        getPriority,
        getNotes,
        getCompleted,
        getTodoItemId,
        setProjectId,
        getIsEditing,
        setIsEditing,
        getElement,
        setTodoItemId,
        render
    }
}

export default TodoItem;