const value = document.querySelector("#grid_size_value");
const input = document.querySelector("#grid_size");
const grid = document.querySelector('.grid');
const color_picker = document.querySelector('#color_picker');
const reset_button = document.querySelector('#reset');
const rainbow_button = document.querySelector('#rainbow');
const grid_size = 800;

let rainbow_mode = false;
let current_color = 'black';
let cells_amount = 256;
let cell_size = 0;
let mouseDown = false;

value.textContent = input.value + 'x' + input.value;
grid.style.width = grid_size + 'px';
grid.style.height = grid_size + 'px';

calculateCellSize();
createGrid();
current_color = color_picker.childNodes[1].value; 

color_picker.oninput = (e) => current_color = e.target.value;
rainbow_button.addEventListener('click', () => rainbow_mode = !rainbow_mode)
input.addEventListener('input', (event) => {
    value.textContent = event.target.value + 'x' + event.target.value;
    cells_amount = event.target.value*event.target.value;
    cleanGrid();
    calculateCellSize();
    createGrid();
});

reset_button.addEventListener('click', () => grid.childNodes.forEach( (cell) => {cell.style.backgroundColor = 'white';}));
document.body.addEventListener('mousedown', (e) => {
    if(e.button === 0){
    mouseDown = true;
}});

document.body.addEventListener('mouseup', (e) => {
    if(e.button === 0){
    mouseDown = false;
}});

function cleanGrid(){
    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }
}

function createGrid() {
    for (let i = 0; i < cells_amount; i++) {
        grid.appendChild(createCell(cell_size));
    }    
}

function calculateCellSize() {
    cell_size = Math.sqrt(grid_size*grid_size/cells_amount)
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
    if(rainbow_mode)
    {
        e.target.style.backgroundColor = randomColor();
    }else{
        e.target.style.backgroundColor = current_color;
    }
}

function randomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}