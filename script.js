//#region Constants
const value = document.querySelector("#grid_size_value");
const input = document.querySelector("#grid_size");
const grid = document.querySelector('.grid');
const color_picker = document.querySelector('#color_picker');
const erase_toggle = document.querySelector('#erase');
const rainbow_toggle = document.querySelector('#rainbow');
const shading_toggle = document.querySelector('#shading');
const reset_button = document.querySelector('#reset');
const grid_size = 800;
const pincel_mode = Object.freeze({
	Paint: Symbol(0),
	Erase: Symbol(1),
    Rainbow: Symbol(2),
	Shading: Symbol(3)
});
//#endregion

//#region Variables
let current_pincel_mode = pincel_mode.Paint;
let shading_value = 10;
let current_color = color_picker.childNodes[1].value;
let cells_amount = 256;
let cell_size = 0;
let mouseDown = false;
//#endregion

value.textContent = input.value + 'x' + input.value;
grid.style.width = grid_size + 'px';
grid.style.height = grid_size + 'px';

//#region Listeners
color_picker.oninput = (e) => current_color = e.target.value;
erase_toggle.addEventListener('click', () => changePincelMode(erase_toggle, pincel_mode.Erase));
rainbow_toggle.addEventListener('click', () => changePincelMode(rainbow_toggle,pincel_mode.Rainbow));
shading_toggle.addEventListener('click', () => changePincelMode(shading_toggle,pincel_mode.Shading));
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
//#endregion

//#region Initialize grid
calculateCellSize();
createGrid();
//#endregion

function changePincelMode(toggle, mode){
    if(!toggle.checked){
        current_pincel_mode = pincel_mode.Paint;
        return;
    }
    current_pincel_mode = mode;
    document.querySelectorAll('input[type="checkbox"]').forEach(e => {if(e != toggle) {e.checked = 0;}} );
}

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
    cell.style.backgroundColor = '#FFFFFF';
    cell.addEventListener('mouseover', paintCell);
    cell.addEventListener('mousedown', paintCell);
    return cell;
}

function paintCell(e){
    if (e.type === 'mouseover' && !mouseDown) return
    switch (current_pincel_mode) {
        case pincel_mode.Paint:
            e.target.style.backgroundColor = current_color;
            break;
        case pincel_mode.Erase:
            e.target.style.backgroundColor = '#FFFFFF';
            break;
        case pincel_mode.Rainbow:
            e.target.style.backgroundColor = randomColor();
            break;
        case pincel_mode.Shading:
            let color = e.target.style.backgroundColor;
            
            if(color[0] == '#') // checks if it's a hex value
            {
                color = hexToRGB(e.target.style.backgroundColor);
            }

            let shaded_rgb = [];
            if(!Array.isArray(color))
                color = color.split('(')[1].split(')')[0].split(',')
            color.forEach(primary_color => {
                shaded_rgb.push(Math.floor(primary_color - primary_color/10));
            });
            console.log(shaded_rgb);

            e.target.style.backgroundColor = rgbToHex(shaded_rgb);

            // e.target.setAttribute('data-shadingIndex', 0); // prevents the cell from being wrongly shaded after being painted
            break;
    
        default:
            console.error('This shouldn’t happened');
            break;
    }
}

function hexToRGB(hex){
    if(hex.length != 7){
        hex = '#' +
        hex.slice(hex.startsWith('#') ? 1 : 0)
        .split('')
        .map(x => x + x)
        .join('');
    }
    let red = parseInt(hex.slice(1,3), 16);
    let green = parseInt(hex.slice(3,5), 16);
    let blue = parseInt(hex.slice(5,7), 16);
    return `rgb(${red},${green},${blue})`; 
}
function rgbToHex(rgb){
    if(!Array.isArray(rgb))
        rgb = rgb.split('(')[1].split(')')[0].split(','); // Make the string "rgb(a,b,c)" into an array of [a,b,c]

    let hex = rgb.map(function(primary_color){          
        primary_color = parseInt(primary_color).toString(16);
        return (primary_color.length==1) ? "0" + primary_color : primary_color;  //Add zero if we get only one character
    });

    return '#' + hex.join('');
}
function randomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}  