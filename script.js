const envelopeContainer = document.getElementById('envelope-container');
const openEnvelopeBtn = document.getElementById('open-envelope-btn');
const mainCard = document.getElementById('main-card');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const pdBtn = document.getElementById('pd-btn');
const mainText = document.getElementById('main-text');
const imagenCambio = document.getElementById('imagen-cambio');
const imgWrapper = document.querySelector('.img-wrapper');

// ACCIÓN DE ABRIR EL SOBRE (Inicia la música automáticamente y muestra la carta)
openEnvelopeBtn.addEventListener('click', () => {
    // Reproducir música al abrir el sobre
    backgroundMusic.play().catch(() => {});
    
    // Ocultar sobre y mostrar tarjeta y botón de música
    envelopeContainer.style.display = 'none';
    mainCard.classList.remove('hidden');
    musicToggle.classList.remove('hidden');
});

// Botón de activar/desactivar música manualmente
musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = "🔊 Música";
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = "🔇 Silencio";
    }
});

// Secuencia de mensajes y fotos al presionar "No"
const secuenciasNo = [
    {
        texto: "Sé que cometí un error y me equivoqué contigo, de verdad lo siento 🥺",
        imagen: "img/rogando.png"
    },
    {
        texto: "Me importas muchísimo y odio estar así contigo... ¿me das otra oportunidad? 💔",
        imagen: "img/perdon.png"
    },
    {
        texto: "Ándale, por favor... prometo portarme bien y mejorar cada día 😭",
        imagen: "img/triste.png"
    }
];

let contadorNo = 0;

// Lógica del botón "No"
noBtn.addEventListener('click', () => {
    if (contadorNo < secuenciasNo.length) {
        mainText.textContent = secuenciasNo[contadorNo].texto;
        imagenCambio.src = secuenciasNo[contadorNo].imagen;
        contadorNo++;
    } else {
        // Efecto esquivo cuando se acaban las frases
        const maxX = window.innerWidth - noBtn.offsetWidth - 50;
        const maxY = window.innerHeight - noBtn.offsetHeight - 50;
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;
    }
});

// Cuando acepta las disculpas
yesBtn.addEventListener('click', () => {
    mainText.textContent = "Gracias por perdonarme y por tener un corazón tan bonito. Te quiero muchísimo ❤️✨";
    document.querySelector('.btn-group').style.display = 'none';
    if(noBtn) noBtn.style.display = 'none';
    
    // Mostramos el botón de Postdata
    pdBtn.classList.remove('hidden');
    imagenCambio.src = "img/perdon.png"; 
});

// Cuando hace clic en el botón de Postdata (cambia automáticamente al MP4)
pdBtn.addEventListener('click', () => {
    mainText.textContent = "P.D. De verdad quiero hacer las cosas bien contigo, cuidarte y demostrarte que se puede confiar en mí. 🌟";
    pdBtn.style.display = 'none'; 
    
    // Reemplaza la imagen por tu archivo pd-animacion.mp4
    imgWrapper.innerHTML = `
        <video autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
            <source src="img/pd-animacion.mp4" type="video/mp4">
            Tu navegador no soporta la reproducción de video.
        </video>
    `;
});
