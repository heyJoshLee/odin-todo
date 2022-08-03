const PageSection = () => {
    const spawnElement = (tag, id, content, parent) => {
        let element = document.createElement(tag);
        if (id) { element.id = id }
        element.textContent = content;
        parent.appendChild(element);
        return element;
    }

    const spawnElementWithClass = (tag, classToAdd, content, parent) => {
        let element = document.createElement(tag);
        element.classList.add(classToAdd)
        element.textContent = content;
        parent.appendChild(element);
        return element;
    }

    const spawnImage = (src, parent) => {
        const element = document.createElement('img');
        element.src = src;
        parent.appendChild(element);
        return element;
    }

    const changeParent = function(element, newParent) { 
        element.remove();
        newParent.append(element);
    }

    return {
        spawnElement,
        spawnElementWithClass,
        spawnImage,
        changeParent
    }
}

export default PageSection;