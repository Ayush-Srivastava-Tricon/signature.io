// Wait for the content of the window element to load, then perform the operations.
window.addEventListener('load', () => {
    document.addEventListener('mousedown', startPainting);
    document.addEventListener('mouseup', stopPainting);
    document.addEventListener('mousemove', sketch);

    // Adding event listeners for color and font size change
    document.querySelector('#colorPicker').addEventListener('change', changeColor);
    document.querySelector('#fontSize').addEventListener('change', changeFontSize);

    // Adding event listeners for clear and save buttons
    document.querySelector('#clearBtn').addEventListener('click', clearCanvas);
    document.querySelector('#saveBtn').addEventListener('click', saveCanvas);
});

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

// Default settings
let paintColor = '#000000';
let fontSize = 5;

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to trigger drawing
let paint = false;

// Updates the coordinates of the cursor when an event e is triggered
function getPosition(event) {
    const rect = canvas.getBoundingClientRect();
    coord.x = event.clientX - rect.left;
    coord.y = event.clientY - rect.top;
}

// Toggles the flag to start and stop drawing
function startPainting(event) {
    paint = true;
    getPosition(event);
}

function stopPainting() {
    paint = false;
}

// Handles the sketching
function sketch(event) {
    if (!paint) return;
    ctx.beginPath();
    ctx.lineWidth = fontSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = paintColor;
    ctx.moveTo(coord.x, coord.y);
    getPosition(event);
    ctx.lineTo(coord.x, coord.y);
    ctx.stroke();
}

// Changes the paint color
function changeColor(event) {
    paintColor = event.target.value;
}

// Changes the font size
function changeFontSize(event) {
    fontSize = event.target.value;
}

// Clears the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Saves the canvas content as a file
function saveCanvas() {
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
