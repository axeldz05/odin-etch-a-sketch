let mouseDown = false;
document.body.addEventListener('mousedown', (e) => {
    if(e.button === 0){
    mouseDown = true;
}});
document.body.addEventListener('mouseup', (e) => {
    if(e.button === 0){
    mouseDown = false;
}});

const grid_size = '360px';
const grid = document.querySelector('.grid');
grid.style.width = grid_size;
grid.style.height = grid_size;

const cells_amount = 16*16;
const cell_size = Math.sqrt(360*360/cells_amount);

const color_picker = document.querySelector('#color_picker');
color_picker.oninput = (e) => current_color = e.target.value;
let current_color = 'black';

const reset_button = document.querySelector('#reset');
reset_button.addEventListener('click', () => grid.childNodes.forEach( (cell) => {cell.style.backgroundColor = 'white';}));

for (let i = 0; i < cells_amount; i++) {
    grid.appendChild(createCell(cell_size));
}

function createCell(cell_size) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.style.height = cell_size + 'px';
    cell.style.width = cell_size + 'px';
    cell.style.backgroundColor = 'white';
    cell.addEventListener('mouseover', paintCell);
    cell.addEventListener('mousedown', paintCell);
    return cell;
}

function paintCell(e){
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = current_color;
}


