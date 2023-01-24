const value = document.querySelector("#grid_size_value");
const input = document.querySelector("#grid_size");
const grid = document.querySelector('.grid');
const color_picker = document.querySelector('#color_picker');
const reset_button = document.querySelector('#reset');

let current_color = 'black';
let cells_amount = 256;
let cell_size = 0;
let mouseDown = false;

calculateCellSize();
createGrid();

value.textContent = input.value + 'x' + input.value;

input.addEventListener("input", (event) => {
    value.textContent = event.target.value + 'x' + event.target.value;
    cells_amount = event.target.value*event.target.value;
    cleanGrid();
    calculateCellSize();
    createGrid();
});
color_picker.oninput = (e) => current_color = e.target.value;
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
    cell_size = Math.sqrt(360*360/cells_amount)
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