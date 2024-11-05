// Ambil elemen canvas dan konteks 2D
const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');

// Variabel untuk menyimpan data gambar, ukuran, posisi, font, dan warna teks
let img = new Image();
let imgWidth = 200; 
let imgHeight = 200; 
let imgX = (canvas.width - imgWidth) / 2;
let imgY = (canvas.height - imgHeight) / 2;
let textX = canvas.width / 2;
let textY = canvas.height / 2;
let currentFont = 'Arial'; 
let currentColor = '#000000';

// Memuat template Twibbon
const twibbonImage = new Image();
twibbonImage.crossOrigin = "Anonymous"; 
twibbonImage.src = 'twibbon.png'; // Path ke gambar twibbon
twibbonImage.onload = () => {
    draw(); // Menggambar ulang setelah gambar twibbon dimuat
};

// Mengupload foto
document.getElementById('uploadPhoto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        img = new Image();
        img.onload = function() {
            imgWidth = 200; // Reset ukuran gambar yang diupload
            imgHeight = 200;
            imgX = (canvas.width - imgWidth) / 2; // Center secara horizontal
            imgY = (canvas.height - imgHeight) / 2; // Center secara vertikal
            draw(); // Menggambar ulang setelah gambar diupload
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Fungsi menggambar canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Hapus canvas

    // Gambar gambar yang diunggah (lapisan bawah)
    if (img.src) {
        ctx.drawImage(img, imgX, imgY, imgWidth, imgHeight);
    }

    // Gambar twibbon overlay di atas gambar yang diunggah (lapisan atas)
    ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height);

    // Gambar teks di atas twibbon
    ctx.font = `30px ${currentFont}`; // Atur font
    ctx.fillStyle = currentColor; // Atur warna teks
    ctx.textAlign = 'center';
    ctx.fillText(document.getElementById('inputName').value, textX, textY); // Gambar teks
}

// Fungsi untuk menggerakkan teks
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

// Fungsi untuk mengubah ukuran gambar
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

// Fungsi untuk menggerakkan gambar
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

// Mengubah font teks
document.getElementById('fontSelect').addEventListener('change', function() {
    currentFont = this.value;
    draw();
});

// Mengubah warna teks
document.getElementById('colorSelect').addEventListener('input', function() {
    currentColor = this.value;
    draw();
});

// Fungsi untuk mendownload Twibbon
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'twibbon.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}
