const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');
let img = new Image();
let imgWidth = 600; // Set initial image width
let imgHeight = 600; // Set initial image height
let imgX = (canvas.width - imgWidth) / 2; // Center image horizontally
let imgY = (canvas.height - imgHeight) / 2; // Center image vertically
let textX = canvas.width / 2;
let textY = canvas.height / 2;
let currentFont = 'Arial'; // Default font
let currentColor = '#000000'; // Default text color

// Muat template Twibbon
const twibbonImage = new Image();
twibbonImage.crossOrigin = "Anonymous";
twibbonImage.src = 'twibbon.png';
twibbonImage.onload = () => {
    draw(); // Panggil draw ketika twibbon sudah dimuat
};

// Mengupload foto
document.getElementById('uploadPhoto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            imgWidth = 300; 
            imgHeight = 300;
            imgX = (canvas.width - imgWidth) / 2; 
            imgY = (canvas.height - imgHeight) / 2; 
            draw(); // Panggil draw ketika gambar yang diunggah selesai dimuat
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Menggambar canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    
    // Pastikan gambar sudah selesai dimuat sebelum menggambar
    if (img.complete) {
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight); // Gambar yang diupload terlebih dahulu
    }
    if (twibbonImage.complete) {
        ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height); // Lalu gambar twibbon
    }
    
    ctx.font = `30px ${currentFont}`; // Set font
    ctx.fillStyle = currentColor; // Set warna teks
    ctx.fillText(document.getElementById('inputName').value, textX, textY); // Tulis teks
}

// Menggerakkan teks
function moveText(direction) {
    const step = 5; 
    switch (direction) {
        case 'up': textY -= step; break;
        case 'down': textY += step; break;
        case 'left': textX -= step; break;
        case 'right': textX += step; break;
    }
    draw(); 
}

// Mengubah ukuran gambar
function resizeImage(action) {
    const resizeStep = 10;
    if (action === 'increase') {
        imgWidth += resizeStep;
        imgHeight += resizeStep;
    } else if (action === 'decrease') {
        imgWidth = Math.max(imgWidth - resizeStep, 10);
        imgHeight = Math.max(imgHeight - resizeStep, 10);
    }
    draw(); 
}

// Menggerakkan gambar
function moveImage(direction) {
    const step = 5;
    switch (direction) {
        case 'up': imgY -= step; break;
        case 'down': imgY += step; break;
        case 'left': imgX -= step; break;
        case 'right': imgX += step; break;
    }
    draw(); 
}

// Mengubah jenis font
document.getElementById('fontSelect').addEventListener('change', function() {
    currentFont = this.value;
    draw(); 
});

// Mengubah warna teks
document.getElementById('colorSelect').addEventListener('input', function() {
    currentColor = this.value;
    draw();
});

// Men-download Twibbon
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'twibbon.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
