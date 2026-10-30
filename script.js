const envelopeContainer = document.querySelector('#envelope-container');
const envelope = document.querySelector('#envelope');
const mainContent = document.querySelector('#main-content');

const bgMusic = document.querySelector('#bg-music');
const musicBtn = document.querySelector('#music-btn');

const yesBtn = document.querySelector('#yes-btn');
const noBtn = document.querySelector('#no-btn');
const mainText = document.querySelector('#main-text');
const imagenCambio = document.querySelector('#imagen-cambio');
const pdBtn = document.querySelector('#pd-btn');

let pasoActual = 0;
let esEcurridizo = false;
let isPlaying = false;

// Secuencias con frases sinceras y tus imágenes locales
const secuenciasNo = [
    {
        texto: "Sé que cometí un error y me equivoqué contigo, de verdad lo siento 🥺",
        imagen: "img/rogando.png" 
    },
    {
        texto: "Me importas muchísimo y odio estar así contigo... ¿me das otra oportunidad? 💔",
        imagen: "img/perdon.png" 
    }
];

// Abrir el sobre al tocarlo y reproducir música
envelopeContainer.addEventListener('click', () => {
    envelope.classList.add('open');
    
    // Iniciar la música (los navegadores permiten audio tras el toque de la usuaria)
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.textContent = '🎵';
    }).catch(err => console.log("Audio autostart prevented:", err));

    setTimeout(() => {
        envelopeContainer.style.display = 'none';
        mainContent.classList.remove('hidden');
        musicBtn.classList.remove('hidden'); // Mostrar botón flotante de música
    }, 500);
});

// Control manual de la música (Pausa / Play)
musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔇';
        isPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '🎵';
        isPlaying = true;
    }
});

function moverBoton() {
    noBtn.style.position = 'fixed';
    
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.floor(Math.random() * (maxX - 20)) + 20;
    const randomY = Math.floor(Math.random() * (maxY - 20)) + 20;

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

function handleNoAction(e) {
    if (esEcurridizo) {
        e.preventDefault();
        moverBoton();
        return;
    }

    if (pasoActual < secuenciasNo.length) {
        mainText.textContent = secuenciasNo[pasoActual].texto;
        imagenCambio.src = secuenciasNo[pasoActual].imagen; 
        pasoActual++;

        if (pasoActual === secuenciasNo.length) {
            esEcurridizo = true;
            noBtn.addEventListener('mouseenter', moverBoton);
            noBtn.addEventListener('touchstart', (e) => {
                e.preventDefault();
                moverBoton();
            });
        }
    }
}

noBtn.addEventListener('click', handleNoAction);

// Cuando acepta las disculpas
yesBtn.addEventListener('click', () => {
    mainText.textContent = "Gracias por perdonarme y por tener un corazón tan bonito. Te quiero muchísimo ❤️✨";
    document.querySelector('.btn-group').style.display = 'none';
    if(noBtn) noBtn.style.display = 'none';
    
    // Mostramos el botón de Postdata
    pdBtn.classList.remove('hidden');
    
    imagenCambio.src = "img/pd.png"; 
});

// Cuando hace clic en el botón de Postdata
pdBtn.addEventListener('click', () => {
    mainText.textContent = "P.D. De verdad quiero hacer las cosas bien contigo, cuidarte y demostrarte que se puede confiar en mí. 🌟";
    pdBtn.style.display = 'none'; 
});
