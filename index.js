// Wait for the content of the window element to load, then perform the operations.
window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    
    // Default settings
    let paintColor = '#000000';
    let fontSize = 5;
    let coord = { x: 0, y: 0 }; // Initialize coord for drawing

    // Function to resize the canvas to fit the window size
    function resizeCanvas() {
        canvas.width = window.innerWidth * 0.8; // Adjust canvas width as needed
        canvas.height = 500; // Set a fixed height or adjust as needed
    }

    // Function to get coordinates based on event type (mouse or touch)
    function getPosition(event) {
        const rect = canvas.getBoundingClientRect();
        if (event.type === 'mousedown' || event.type === 'mousemove') {
            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        } else if (event.type === 'touchstart' || event.type === 'touchmove') {
            return {
                x: event.touches[0].clientX - rect.left,
                y: event.touches[0].clientY - rect.top
            };
        }
    }

    // Event listeners for starting and stopping drawing
    function startPainting(event) {
        paint = true;
        const pos = getPosition(event);
        if (pos) {
            coord.x = pos.x;
            coord.y = pos.y;
        }
    }

    function stopPainting() {
        paint = false;
    }

    // Event listener for drawing on the canvas
    function sketch(event) {
        event.preventDefault(); // Prevent default touch actions (like scrolling)
        if (!paint) return;

        const pos = getPosition(event);
        if (pos) {
            ctx.beginPath();
            ctx.lineWidth = fontSize;
            ctx.lineCap = 'round';
            ctx.strokeStyle = paintColor;
            ctx.moveTo(coord.x, coord.y);
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();

            coord.x = pos.x;
            coord.y = pos.y;
        }
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

    // Resize canvas initially and on window resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
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
