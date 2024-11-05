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

// Muat template Twibbon
const twibbonImage = new Image();
twibbonImage.crossOrigin = "Anonymous"; // Add CORS to avoid tainted canvas issue
twibbonImage.src = 'twibbon.png';
twibbonImage.onload = () => {
    draw(); // Menggambar ulang setelah gambar Twibbon dimuat
};

// Mengupload foto
document.getElementById('uploadPhoto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            imgWidth = 200; // Reset width of the uploaded image
            imgHeight = 200; // Reset height of the uploaded image
            imgX = (canvas.width - imgWidth) / 2; // Center image horizontally
            imgY = (canvas.height - imgHeight) / 2; // Center image vertically
            draw(); // Menggambar ulang setelah gambar diupload
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Menggambar canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus canvas
    ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height); // Menggambar gambar Twibbon
    ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight); // Menggambar gambar yang diupload
    ctx.font = `30px ${currentFont}`; // Mengatur font
    ctx.fillStyle = currentColor; // Mengatur warna teks
    ctx.fillText(document.getElementById('inputName').value, textX, textY); // Menggambar teks
}

// Menggerakkan teks
function moveText(direction) {
    const step = 5; // Jarak gerak
    switch (direction) {
        case 'up': textY -= step; break;
        case 'down': textY += step; break;
        case 'left': textX -= step; break;
        case 'right': textX += step; break;
    }
    draw(); // Menggambar ulang setelah memindahkan teks
}

// Mengubah ukuran gambar
function resizeImage(action) {
    const resizeStep = 10; // Ukuran perubahan
    if (action === 'increase') {
        imgWidth += resizeStep;
        imgHeight += resizeStep;
    } else if (action === 'decrease') {
        imgWidth = Math.max(imgWidth - resizeStep, 10); // Pastikan ukuran tidak kurang dari 10
        imgHeight = Math.max(imgHeight - resizeStep, 10); // Pastikan ukuran tidak kurang dari 10
    }
    draw(); // Menggambar ulang setelah mengubah ukuran
}

// Menggerakkan gambar
function moveImage(direction) {
    const step = 5; // Jarak gerak
    switch (direction) {
        case 'up': imgY -= step; break;
        case 'down': imgY += step; break;
        case 'left': imgX -= step; break;
        case 'right': imgX += step; break;
    }
    draw(); // Menggambar ulang setelah memindahkan gambar
}

// Mengubah jenis font
document.getElementById('fontSelect').addEventListener('change', function() {
    currentFont = this.value;
    draw(); // Menggambar ulang setelah mengubah font
});

// Mengubah warna teks
document.getElementById('colorSelect').addEventListener('input', function() {
    currentColor = this.value;
    draw(); // Menggambar ulang setelah mengubah warna
});

// Men-download Twibbon
function downloadImage() {
    const originalWidth = canvas.width;
    const originalHeight = canvas.height;
    const scaleFactor = 3; // Skala resolusi tinggi (misalnya 3x)

    // Buat canvas sementara untuk menggambar dengan resolusi tinggi
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    tempCanvas.width = originalWidth * scaleFactor;
    tempCanvas.height = originalHeight * scaleFactor;

    // Gambar ulang dengan skala yang lebih besar
    tempCtx.scale(scaleFactor, scaleFactor);
    tempCtx.drawImage(twibbonImage, 0, 0, originalWidth, originalHeight);
    tempCtx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    tempCtx.font = `30px ${currentFont}`;
    tempCtx.fillStyle = currentColor;
    tempCtx.fillText(document.getElementById('inputName').value, textX, textY);

    // Dapatkan URL gambar dari canvas sementara dan unduh
    const link = document.createElement('a');
    link.download = 'twibbon_hd.png';
    link.href = tempCanvas.toDataURL('image/png', 1.0);
    link.click();
}
