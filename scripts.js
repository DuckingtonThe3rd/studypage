function addItem(columnId) {
    const column = document.getElementById(columnId);
    const newItem = document.createElement('div');
    newItem.className = 'kanban-item';
    newItem.contentEditable = 'true';
    newItem.textContent = 'New Task';
    newItem.draggable = true;
    newItem.id = 'item-' + new Date().getTime(); // Unique ID
    newItem.addEventListener('dragstart', handleDragStart);
    newItem.addEventListener('dragover', handleDragOver);
    newItem.addEventListener('drop', handleDrop);
    column.appendChild(newItem);
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.kanban-item');
    items.forEach(item => {
        item.draggable = true;
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
    });

    const columns = document.querySelectorAll('.kanban-items');
    columns.forEach(column => {
        column.addEventListener('dragover', handleDragOver);
        column.addEventListener('drop', handleDrop);
    });

    document.getElementById('save-button').addEventListener('click', saveData);
    document.getElementById('upload').addEventListener('change', loadData);
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
    if (e.target.classList.contains('kanban-items')) {
        e.target.appendChild(draggableElement);
    } else if (e.target.classList.contains('kanban-item')) {
        e.target.parentElement.appendChild(draggableElement);
    }
    e.dataTransfer.clearData();
}

function saveData() {
    const toDoItems = Array.from(document.getElementById('to-do').children).map(item => item.textContent);
    const inProgressItems = Array.from(document.getElementById('in-progress').children).map(item => item.textContent);
    const doneItems = Array.from(document.getElementById('done').children).map(item => item.textContent);

    const data = {
        toDo: toDoItems,
        inProgress: inProgressItems,
        done: doneItems
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'kanban-data.txt';
    a.click();
}

function loadData(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = JSON.parse(e.target.result);
            populateColumn('to-do', data.toDo);
            populateColumn('in-progress', data.inProgress);
            populateColumn('done', data.done);
        };
        reader.readAsText(file);
    }
}

function populateColumn(columnId, items) {
    const column = document.getElementById(columnId);
    column.innerHTML = ''; // Clear existing items
    items.forEach(itemText => {
        const newItem = document.createElement('div');
        newItem.className = 'kanban-item';
        newItem.contentEditable = 'true';
        newItem.textContent = itemText;
        newItem.draggable = true;
        newItem.id = 'item-' + new Date().getTime(); // Unique ID
        newItem.addEventListener('dragstart', handleDragStart);
        newItem.addEventListener('dragover', handleDragOver);
        newItem.addEventListener('drop', handleDrop);
        column.appendChild(newItem);
    });
}
