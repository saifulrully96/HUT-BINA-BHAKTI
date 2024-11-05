// script.js

const canvas = document.getElementById("twibbonCanvas");
const ctx = canvas.getContext("2d");

let uploadedImage = new Image();
let twibbonImage = new Image(); // Gambar twibbon
let imageX = 0;
let imageY = 0;
let imageSize = 200; // Ukuran gambar default
let text = '';
let font = 'Arial';
let textColor = '#000000';
let textYPosition = canvas.height / 2; // Posisi Y teks default (tengah)

// Memuat gambar twibbon
twibbonImage.src = 'path/to/twibbon.png'; // Ganti dengan path ke gambar twibbon
twibbonImage.onload = () => {
    draw(); // Menggambar ulang kanvas saat gambar twibbon dimuat
};

// Fungsi untuk mengunggah foto
document.getElementById("uploadPhoto").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            uploadedImage.src = e.target.result;
            uploadedImage.onload = () => {
                // Atur ukuran kanvas sesuai dengan ukuran gambar asli
                canvas.width = uploadedImage.width;
                canvas.height = uploadedImage.height;
                imageX = 0; // Reset posisi X gambar
                imageY = 0; // Reset posisi Y gambar
                draw(); // Menggambar ulang kanvas saat gambar dimuat
            };
        };
        reader.readAsDataURL(file);
    }
});

// Fungsi untuk menggambar gambar dan teks pada kanvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Menghapus kanvas

    // Menggambar gambar yang diunggah terlebih dahulu
    ctx.drawImage(uploadedImage, imageX, imageY, uploadedImage.width, uploadedImage.height); // Gambar yang diunggah

    // Menggambar twibbon di atas gambar yang diunggah
    ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height); // Gambar twibbon

    ctx.font = `${imageSize / 10}px ${font}`; // Mengatur ukuran font relatif terhadap ukuran gambar
    ctx.fillStyle = textColor; // Mengatur warna teks
    ctx.fillText(text, canvas.width / 2 - ctx.measureText(text).width / 2, textYPosition); // Menempatkan teks di tengah
}

// Fungsi untuk memperbarui input teks
document.getElementById("inputName").addEventListener("input", function (event) {
    text = event.target.value;
    draw();
});

// Fungsi untuk mengubah jenis font
document.getElementById("fontSelect").addEventListener("change", function (event) {
    font = event.target.value;
    draw();
});

// Fungsi untuk mengubah warna teks
document.getElementById("colorSelect").addEventListener("input", function (event) {
    textColor = event.target.value;
    draw();
});

// Fungsi untuk menggerakkan teks
function moveText(direction) {
    switch (direction) {
        case 'up':
            textYPosition -= 10;
            break;
        case 'down':
            textYPosition += 10;
            break;
    }
    draw();
}

// Fungsi untuk mengubah ukuran gambar yang diunggah (opsional)
function resizeImage(action) {
    if (action === 'increase') {
        imageSize += 10;
    } else if (action === 'decrease') {
        imageSize = Math.max(10, imageSize - 10); // Mencegah ukuran menjadi negatif atau nol
    }
    draw();
}

// Fungsi untuk memindahkan gambar
function moveImage(direction) {
    switch (direction) {
        case 'up':
            imageY -= 10;
            break;
        case 'down':
            imageY += 10;
            break;
        case 'left':
            imageX -= 10;
            break;
        case 'right':
            imageX += 10;
            break;
    }
    draw();
}

// Fungsi untuk mengunduh kanvas sebagai gambar
function downloadImage() {
    const link = document.createElement('a');
    link.download = 'twibbon.png'; // Nama file untuk diunduh
    link.href = canvas.toDataURL("image/png", 1.0); // Mengambil data kanvas sebagai PNG dengan kualitas maksimal
    link.click(); // Memicu pengunduhan
}

// Panggilan gambar awal untuk menyiapkan kanvas
draw();
