import PageSection from "./pageSection";

const Modal = () => {
    const { spawnElement, changeParent, spawnImage } = PageSection();

    let element;
    let pageContainer = document.querySelector('#page-container');
    let modalCloseButton;
    let modalOpenButton;
    let modalId;

    const generateModalId = () => {
        let currentNumberOfModals = document.querySelectorAll('.modal').length;
        modalId = ++currentNumberOfModals;
    }

    const getModalDiv = () => {
        if (!element) { element = createModal(); }
        return element; 
    }

    const getOpenButton = () => {
        return modalOpenButton;
    }

    const getCloseButton = () => {
        return modalCloseButton;
    }

    const renderOpenButton = (divToRenderTo) => {
        if (document.querySelector(`#modal-${modalId}-open-button`)) {
            modalOpenButton = document.querySelector(`#modal-${modalId}-open-button`); 
            modalOpenButton.classList.add('modal-open-button');
        } else {
            modalOpenButton = spawnImage('../src/images/plus.png', divToRenderTo);            
            modalOpenButton.id =`'modal-${modalId}-open-button`;
            modalOpenButton.classList.add('modal-open-button');
        }
        modalOpenButton.addEventListener('click', () => {
            toggleModal();
        });
    }

    const renderCloseButton = (divToRenderTo) => {
        if (document.querySelector(`#modal-${modalId}-close-button`)) {
            modalCloseButton = document.querySelector(`#modal-${modalId}-close-button`); 
            modalCloseButton.classList.add('modal-close-button');
        } else {
            modalCloseButton = spawnImage('../src/images/close.png', divToRenderTo);            
            modalCloseButton.id =`'modal-${modalId}-close-button`;
            modalCloseButton.classList.add('modal-close-button');
        }
        modalCloseButton.addEventListener('click', () => {
            toggleModal();
        });
    }

    const render = () => {
        if (!element) { element = createModal(); }
    }

    const createModal = () => {
        const newModal = spawnElement('div', `modal-${modalId}`, '', pageContainer);
        newModal.classList.add('modal');
        return newModal;
    }

    const toggleModal = () => {
        if (!element) { element = createModal(); }

        element.classList.toggle('hidden');
    }

    const close = () => {
        element.classList.add('hidden');
    }

    generateModalId();

    toggleModal();


    return {
        render,
        getModalDiv,
        changeParent,
        getCloseButton,
        close,
        renderOpenButton,
        renderCloseButton,
        getOpenButton
    }

}

export default Modal;