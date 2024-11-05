const canvas = document.getElementById('twibbonCanvas'); 
const ctx = canvas.getContext('2d');

let img = new Image();

let imgWidth = 200; // Set initial image width
let imgHeight = 200; // Set initial image height
let imgX = (canvas.width - imgWidth) / 2; // Center image horizontally
let imgY = (canvas.height - imgHeight) / 2; // Center image vertically

let textX = canvas.width / 2;
let textY = canvas.height / 2;

let currentFont = 'Arial'; // Default font
let currentColor = '#000000'; // Default text color

// Load Twibbon template
const twibbonImage = new Image();
twibbonImage.crossOrigin = "Anonymous"; // Add CORS to avoid tainted canvas issue
twibbonImage.src = 'twibbon.png';
twibbonImage.onload = () => {
    draw(); // Redraw after Twibbon image is loaded
};

// Upload photo
document.getElementById('uploadPhoto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            imgWidth = 200; // Reset width of the uploaded image
            imgHeight = 200; // Reset height of the uploaded image
            imgX = (canvas.width - imgWidth) / 2; // Center image horizontally
            imgY = (canvas.height - imgHeight) / 2; // Center image vertically
            draw(); // Redraw after image is uploaded
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Drawing function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw uploaded image first
    if (img.src) { // Ensure img is loaded
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight); // Draw uploaded image
    }

    // Draw Twibbon on top
    ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height); // Draw Twibbon image

    // Draw text
    ctx.font = `30px ${currentFont}`; // Set font
    ctx.fillStyle = currentColor; // Set text color
    ctx.fillText(document.getElementById('inputName').value, textX, textY); // Draw text
}

// Move text function
function moveText(direction) {
    const step = 5; // Step distance
    switch (direction) {
        case 'up': textY -= step; break;
        case 'down': textY += step; break;
        case 'left': textX -= step; break;
        case 'right': textX += step; break;
    }
    draw(); // Redraw after moving text
}

// Resize image function
function resizeImage(action) {
    const resizeStep = 10; // Resize step
    if (action === 'increase') {
        imgWidth += resizeStep;
        imgHeight += resizeStep;
    } else if (action === 'decrease') {
        imgWidth = Math.max(imgWidth - resizeStep, 10); // Ensure minimum size
        imgHeight = Math.max(imgHeight - resizeStep, 10);
    }
    draw(); // Redraw after resizing
}

// Move image function
function moveImage(direction) {
    const step = 5; // Step distance
    switch (direction) {
        case 'up': imgY -= step; break;
        case 'down': imgY += step; break;
        case 'left': imgX -= step; break;
        case 'right': imgX += step; break;
    }
    draw(); // Redraw after moving image
}

// Change font event
document.getElementById('fontSelect').addEventListener('change', function() {
    currentFont = this.value;
    draw(); // Redraw after changing font
});

// Change text color event
document.getElementById('colorSelect').addEventListener('input', function() {
    currentColor = this.value;
    draw(); // Redraw after changing color
});

// Download function
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'twibbon.png';
    link.href = canvas.toDataURL('image/png'); // Get data URL from canvas in PNG format
    link.click(); // Trigger download
    }
