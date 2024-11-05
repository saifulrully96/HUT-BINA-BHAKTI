// Ambil elemen canvas
const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');

// Variabel untuk menyimpan data foto, nama, posisi, dll.
let image, userName, fontType = 'Arial', textColor = '#000000';
let textX = 360, textY = 680; // posisi default nama
let imageX = 0, imageY = 0, imageScale = 1;

// Function untuk meng-upload foto
document.getElementById('uploadPhoto').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            image = new Image();
            image.src = e.target.result;
            image.onload = () => {
                drawCanvas();
            };
        };
        reader.readAsDataURL(file);
    }
});

// Function untuk menampilkan nama di canvas
document.getElementById('inputName').addEventListener('input', (event) => {
    userName = event.target.value;
    drawCanvas();
});

// Function untuk memilih font dan warna
document.getElementById('fontSelect').addEventListener('change', (event) => {
    fontType = event.target.value;
    drawCanvas();
});
document.getElementById('colorSelect').addEventListener('input', (event) => {
    textColor = event.target.value;
    drawCanvas();
});

// Function untuk menggambar canvas
function drawCanvas() {
    // Bersihkan canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Gambar foto jika ada
    if (image) {
        const scaledWidth = image.width * imageScale;
        const scaledHeight = image.height * imageScale;
        ctx.drawImage(image, imageX, imageY, scaledWidth, scaledHeight);
    }

    // Gambar teks nama
    if (userName) {
        ctx.font = `40px ${fontType}`;
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(userName, textX, textY);
    }
}

// Fungsi untuk memindahkan teks dan gambar
function moveText(direction) {
    const step = 5;
    if (direction === 'up') textY -= step;
    if (direction === 'down') textY += step;
    if (direction === 'left') textX -= step;
    if (direction === 'right') textX += step;
    drawCanvas();
}

function moveImage(direction) {
    const step = 5;
    if (direction === 'up') imageY -= step;
    if (direction === 'down') imageY += step;
    if (direction === 'left') imageX -= step;
    if (direction === 'right') imageX += step;
    drawCanvas();
}

function resizeImage(action) {
    const scaleStep = 0.1;
    if (action === 'increase') imageScale += scaleStep;
    if (action === 'decrease') imageScale = Math.max(0.1, imageScale - scaleStep);
    drawCanvas();
}

// Fungsi untuk download gambar dengan kualitas HD
function downloadImage() {
    // Buat canvas baru dengan resolusi tinggi
    const hdCanvas = document.createElement('canvas');
    const hdCtx = hdCanvas.getContext('2d');
    hdCanvas.width = 1920;
    hdCanvas.height = 1920;

    // Sesuaikan ukuran konten
    hdCtx.scale(hdCanvas.width / canvas.width, hdCanvas.height / canvas.height);

    // Gambar ulang konten dalam resolusi tinggi
    if (image) {
        const scaledWidth = image.width * imageScale * (hdCanvas.width / canvas.width);
        const scaledHeight = image.height * imageScale * (hdCanvas.height / canvas.height);
        hdCtx.drawImage(image, imageX * (hdCanvas.width / canvas.width), imageY * (hdCanvas.height / canvas.height), scaledWidth, scaledHeight);
    }

    if (userName) {
        hdCtx.font = `80px ${fontType}`;
        hdCtx.fillStyle = textColor;
        hdCtx.textAlign = 'center';
        hdCtx.fillText(userName, textX * (hdCanvas.width / canvas.width), textY * (hdCanvas.height / canvas.height));
    }

    // Unduh sebagai gambar
    const link = document.createElement('a');
    link.href = hdCanvas.toDataURL('image/png');
    link.download = 'Twibbon-HD.png';
    link.click();
}
