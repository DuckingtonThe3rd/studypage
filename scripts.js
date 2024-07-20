function addItem(columnId) {
    const column = document.getElementById(columnId);
    const newItem = document.createElement('div');
    newItem.className = 'kanban-item';
    newItem.contentEditable = 'true';
    newItem.textContent = 'New Task';
    column.appendChild(newItem);
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.kanban-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });
});

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggableElement = document.getElementById(id);
    const dropzone = e.target;
    dropzone.appendChild(draggableElement);
    e.dataTransfer.clearData();
}
