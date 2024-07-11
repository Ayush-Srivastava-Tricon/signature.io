// Wait for the content of the window element to load, then perform the operations.
window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    
    // Default settings
    let paintColor = '#000000';
    let fontSize = 5;

    // Stores the initial position of the cursor
    let coord = { x: 0, y: 0 };

    // This is the flag that we are going to use to trigger drawing
    let paint = false;

    // Function to get coordinates based on event type (mouse or touch)
    function getPosition(event) {
        const rect = canvas.getBoundingClientRect();
        if (event.type === 'mousedown' || event.type === 'mousemove') {
            coord.x = event.clientX - rect.left;
            coord.y = event.clientY - rect.top;
        } else if (event.type === 'touchstart' || event.type === 'touchmove') {
            coord.x = event.touches[0].clientX - rect.left;
            coord.y = event.touches[0].clientY - rect.top;
        }
    }

    // Event listeners for starting and stopping drawing
    function startPainting(event) {
        paint = true;
        getPosition(event);
    }

    function stopPainting() {
        paint = false;
    }

    // Event listener for drawing on the canvas
    function sketch(event) {
        event.preventDefault(); // Prevent default touch actions (like scrolling)
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

    // Event listeners for mouse events
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mousemove', sketch);

    // Event listeners for touch events
    canvas.addEventListener('touchstart', startPainting);
    canvas.addEventListener('touchend', stopPainting);
    canvas.addEventListener('touchmove', sketch);

    // Additional event listeners for color and font size change
    document.querySelector('#colorPicker').addEventListener('change', changeColor);
    document.querySelector('#fontSize').addEventListener('change', changeFontSize);

    // Additional event listeners for clear and save buttons
    document.querySelector('#clearBtn').addEventListener('click', clearCanvas);
    document.querySelector('#saveBtn').addEventListener('click', saveCanvas);
});

// Function definitions for color, font size, clear, and save functionalities
function changeColor(event) {
    paintColor = event.target.value;
}

function changeFontSize(event) {
    fontSize = event.target.value;
}

function clearCanvas() {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const canvas = document.querySelector('#canvas');
    const link = document.createElement('a');
    link.download = 'signature.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
