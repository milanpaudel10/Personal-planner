const input = document.getElementById('userInput');
const typeSelect = document.getElementById('itemType');
const addBtn = document.getElementById('addBtn');
const container = document.getElementById('listContainer');
const dateDisplay = document.getElementById('date-display');

dateDisplay.innerText = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric' 
});

const createItem = () => {
    const text = input.value.trim();
    const type = typeSelect.value;

    if (!text) return;

    const wrapper = document.createElement('div');
    wrapper.className = `item item-${type}`;

    const isTask = type === 'task';
    const icon = isTask ? '○' : '📌';

    wrapper.innerHTML = `
        <div class="content">
            <span class="icon">${icon}</span> ${text}
        </div>
        <span class="delete-icon">×</span>
    `;

    wrapper.querySelector('.content').onclick = function() {
        this.classList.toggle('done');
        if (isTask) {
            const iconSpan = this.querySelector('.icon');
            iconSpan.innerText = this.classList.contains('done') ? '●' : '○';
        }
    };

    wrapper.querySelector('.delete-icon').onclick = () => wrapper.remove();

    container.prepend(wrapper);
    input.value = '';
};

addBtn.onclick = createItem;

input.onkeydown = (e) => {
    if (e.key === 'Enter') createItem();
};