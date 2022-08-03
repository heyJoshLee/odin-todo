import ProjectsContainer from './projectsContainer';
import NewProjectForm from './newProjectForm';
import Project from './project';
import TodoItem from './todoItem';
import Modal from './modal';
import NewTodoForm from './newTodoForm';



function generateTestData () {
    const newTodoItem1 = TodoItem('cool title 1', 'description', '2011-09-29', '1', 'notes', 'completed');
    const newProject1 = Project('do this 1', 'do this thing', '2011-09-29', 'somet notes go here', false);
    const newTodoItem4 = TodoItem('cool title 4', 'description', '2011-09-29', '2', 'notes', 'completed');

    projectsContainer.addProject(newProject1);
    
    newProject1.addTodoItem(newTodoItem1);
    newProject1.addTodoItem(newTodoItem4);
    
    
    const newTodoItem2 = TodoItem('cool title 2', 'description', '2011-09-29', '3', 'notes', 'completed');
    const newProject2 = Project('do this 2', 'do this thing', '2011-09-29', 'somet notes go here', false);
    
    projectsContainer.addProject(newProject2);
    
    newProject2.addTodoItem(newTodoItem2);
    
    const newTodoItem3 = TodoItem('cool title 3', 'description', '2011-09-29', '1', 'notes', 'completed');
    const newProject3 = Project('do this 3', 'do this thing', '2011-09-29', 'somet notes go here', false);
    const newTodoItem5 = TodoItem('cool title 5', 'description', '2011-09-29', '1', 'notes', 'completed');
    const newTodoItem6 = TodoItem('cool title 6', 'description', '2011-09-29', '1', 'notes', 'completed');


    
    projectsContainer.addProject(newProject3);
    
    newProject3.addTodoItem(newTodoItem5);
    newProject3.addTodoItem(newTodoItem6);

    newTodoItem6.setIsEditing(true);
    newProject3.render()
}

const projectsContainer = ProjectsContainer();
projectsContainer.getNewProjectForm().setProjectsContainer(projectsContainer);
projectsContainer.getNewTodoForm().setProjectsContainer(projectsContainer);

generateTestData();

projectsContainer.render();


