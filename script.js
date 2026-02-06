// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffd700" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#ffed4e",
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" }
            }
        },
        retina_detect: true
    });

    // Inicializar contador
    initializeCountdown();
    
    // Inicializar animaciones al scroll
    initializeScrollAnimations();
    
    // Reproducir música automáticamente (con interacción del usuario)
    setupMusicAutoplay();
});

// Contador regresivo
function initializeCountdown() {
    const eventDate = new Date('June 15, 2025 19:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = eventDate - now;
        
        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.querySelector('.countdown-container').innerHTML = 
                '<div class="event-started">¡El evento ha comenzado!</div>';
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Animaciones al hacer scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animar
    document.querySelectorAll('.detail-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Música
function setupMusicAutoplay() {
    const music = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    
    // Intentar reproducir automáticamente después de interacción del usuario
    document.body.addEventListener('click', function initMusic() {
        if (music.paused) {
            music.volume = 0.5;
            music.play().then(() => {
                musicText.textContent = ' Música: ON';
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>' + musicText.textContent;
            }).catch(() => {
                musicText.textContent = ' Activar Música';
            });
        }
        document.body.removeEventListener('click', initMusic);
    }, { once: true });
}

function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const musicText = document.getElementById('musicText');
    const icon = document.querySelector('#musicToggle i');
    
    if (music.paused) {
        music.play();
        musicText.textContent = ' Música: ON';
        icon.className = 'fas fa-volume-up';
    } else {
        music.pause();
        musicText.textContent = ' Música: OFF';
        icon.className = 'fas fa-volume-mute';
    }
}

// Confirmar asistencia
let confirmationTimeout;

function confirmAttendance(response) {
    const messageBox = document.getElementById('confirmationMessage');
    const guestNumber = document.getElementById('guestNumber').textContent;
    
    clearTimeout(confirmationTimeout);
    
    if (response === 'si') {
        messageBox.innerHTML = `
            <i class="fas fa-heart" style="color:#ffd700; margin-right:10px;"></i>
            <strong>¡Gracias por confirmar!</strong> Esperamos verte junto a ${guestNumber} invitado${guestNumber > 1 ? 's' : ''}. 
            Te hemos enviado los detalles por WhatsApp.
        `;
        messageBox.style.color = '#4CAF50';
        
        // Efecto de confeti visual
        createConfetti();
    } else {
        messageBox.innerHTML = `
            <i class="fas fa-heart-broken" style="color:#ffd700; margin-right:10px;"></i>
            <strong>Lamentamos que no puedas asistir.</strong> Agradecemos tu respuesta. 
            ¡Te extrañaremos en esta celebración especial!
        `;
        messageBox.style.color = '#f44336';
    }
    
    messageBox.classList.add('animate__animated', 'animate__pulse');
    
    // Guardar en localStorage (simulación)
    localStorage.setItem('attendance', JSON.stringify({
        response: response,
        guests: guestNumber,
        date: new Date().toISOString()
    }));
    
    confirmationTimeout = setTimeout(() => {
        messageBox.classList.remove('animate__pulse');
    }, 2000);
}

// Cambiar número de invitados
function changeGuests(change) {
    const guestNumber = document.getElementById('guestNumber');
    let current = parseInt(guestNumber.textContent);
    current += change;
    
    if (current < 1) current = 1;
    if (current > 10) current = 10;
    
    guestNumber.textContent = current;
    
    // Efecto de animación
    guestNumber.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        guestNumber.classList.remove('animate__bounce');
    }, 300);
}

// Efecto de confeti
function createConfetti() {
    const confettiCount = 50;
    const container = document.querySelector('.confirmation');
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.innerHTML = '🎉';
        confetti.style.cssText = `
            position: absolute;
            font-size: 20px;
            left: ${Math.random() * 100}%;
            top: -20px;
            animation: fall ${1 + Math.random() * 2}s linear forwards;
            z-index: 1000;
        `;
        
        document.body.appendChild(confetti);
        
        // Remover después de la animación
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
    
    // Añadir estilo de animación
    if (!document.querySelector('#confettiStyle')) {
        const style = document.createElement('style');
        style.id = 'confettiStyle';
        style.textContent = `
            @keyframes fall {
                to {
                    transform: translateY(100vh) rotate(${360 * 3}deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}




// Abrir mapa
// function openMap() {
//     const url = 'https://www.google.com/maps/place/Salón+Diamante/@19.4326077,-99.133207,17z/';
//     window.open(url, '_blank');
// }

// // Efecto de cursor personalizado
// document.addEventListener('mousemove', function(e) {
//     const cursor = document.querySelector('.cursor') || createCursor();
//     cursor.style.left = e.clientX + 'px';
//     cursor.style.top = e.clientY + 'px';
// });

// function createCursor() {
//     const cursor = document.createElement('div');
//     cursor.className = 'cursor';
//     cursor.style.cssText = `
//         position: fixed;
//         width: 20px;
//         height: 20px;
//         border: 2px solid #ffd700;
//         border-radius: 50%;
//         pointer-events: none;
//         z-index: 9999;
//         mix-blend-mode: difference;
//         transition: transform 0.1s ease;
//     `;
//     document.body.appendChild(cursor);
//     return cursor;
// }









// Función para abrir Google Maps con tu dirección
function openMap() {
    // REEMPLAZA ESTA DIRECCIÓN CON LA DE TU EVENTO
    const address = "Felipe Carrillo Puerto 632, Ventura Pérez de Alba, Miguel Hidalgo, 11410 Ciudad de México, CDMX";
    
    // Codificar la dirección para URL
    const encodedAddress = encodeURIComponent(address);
    
    // URL de Google Maps
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    
    // Abrir en nueva pestaña
    window.open(mapsUrl, '_blank');
    
    // Opcional: Mostrar confirmación
    showMapConfirmation(address);
}

// Mostrar mensaje de confirmación (opcional)
function showMapConfirmation(address) {
    const message = `Abriendo ubicación: ${address}`;
    console.log(message);
    
    // Puedes mostrar un toast/notificación
    const notification = document.createElement('div');
    notification.textContent = `📍 ${address}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 215, 0, 0.95);
        color: #000;
        padding: 15px 20px;
        border-radius: 10px;
        z-index: 10000;
        font-weight: bold;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        animation: slideIn 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Añade estos estilos a tu CSS
const mapStyles = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}
@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}
`;

// Inyectar estilos si no existen
if (!document.querySelector('#mapStyles')) {
    const styleEl = document.createElement('style');
    styleEl.id = 'mapStyles';
    styleEl.textContent = mapStyles;
    document.head.appendChild(styleEl);
}










// Contador regresivo - FUNCIONA 100%
function initializeCountdown() {
    // FECHA DEL EVENTO - CAMBIA ESTA LÍNEA CON TU FECHA
    const eventDate = new Date('June 15, 2026 19:00:00').getTime();
    
    // Actualizar cada segundo
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Ejecutar inmediatamente para evitar 1 segundo de retraso
    updateCountdown();
    
    function updateCountdown() {
        // Fecha y hora actual
        const now = new Date().getTime();
        
        // Tiempo restante en milisegundos
        const timeLeft = eventDate - now;
        
        // Si el evento ya pasó
        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            showEventStarted();
            return;
        }
        
        // Cálculos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Actualizar HTML
        document.getElementById('days').textContent = formatTime(days);
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // Efecto visual cada segundo
        animateSeconds();
    }
    
    // Formatear números a 2 dígitos
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
    
    // Efecto de animación en los segundos
    function animateSeconds() {
        const secondsElement = document.getElementById('seconds');
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 300);
    }
    
    // Mensaje cuando el evento comienza
    function showEventStarted() {
        const countdownContainer = document.querySelector('.countdown-container');
        countdownContainer.innerHTML = `
            <div class="event-started animate__animated animate__heartBeat">
                <i class="fas fa-glass-cheers" style="font-size: 3rem; color: #ffd700; margin-bottom: 20px;"></i>
                <h3 style="color: #ffed4e; margin-bottom: 10px;">¡El evento ha comenzado!</h3>
                <p>¡Disfruta de esta celebración especial!</p>
            </div>
        `;
    }
}

// Iniciar el contador cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    initializeCountdown();
    
    // También puedes iniciarlo con un botón si prefieres
    console.log('Contador regresivo activado ✅');
    console.log('Fecha del evento: 15 de Junio, 2025 a las 19:00');
});












// Variables globales
let selectedGuests = 1;
let userResponse = '';

// Función principal para confirmar asistencia
function confirmAttendance(response) {
    userResponse = response;
    
    if (response === 'si') {
        openWhatsAppConfirmation();
    } else {
        openWhatsAppRegret();
    }
    
    // Mostrar mensaje local
    showLocalMessage(response);
}

// Abrir WhatsApp para confirmar ASISTENCIA
function openWhatsAppConfirmation() {
    // TU NÚMERO DE TELÉFONO (sin espacios, con código de país)
    const phoneNumber = "5215512345678"; // Ejemplo: México +52 55 1234 5678
    
    // Mensaje personalizado
    const eventName = "Mis XV Años - Gabriela";
    const guestCount = selectedGuests;
    
    const message = `¡Hola! Confirmo mi asistencia a *${eventName}*.\n\n` +
                   `✅ *Asistiré:* Sí\n` +
                   `👥 *Número de invitados:* ${guestCount}\n` +
                   `📅 *Fecha:* 15 de Junio, 2025\n` +
                   `⏰ *Hora:* 7:00 PM\n\n` +
                   `¡Nos vemos en la celebración! 🎉`;
    
    // Codificar el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    
    // URL de WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Registrar en consola
    console.log("WhatsApp abierto para confirmación:", whatsappUrl);
}





// Abrir WhatsApp para decir que NO puede asistir
function openWhatsAppRegret() {
    const phoneNumber = "5215512345678"; // Mismo número
    
    const message = `¡Hola! Lamento informar que *no podré asistir* a tus XV Años.\n\n` +
                   `❌ *Asistiré:* No\n` +
                   `💝 *Motivo:* [Escribe tu motivo aquí]\n\n` +
                   `Te deseo un día maravilloso y lleno de bendiciones. ¡Felices XV! 🎂`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
}

// Mostrar mensaje local en la página
function showLocalMessage(response) {
    const messageBox = document.getElementById('confirmationMessage');
    
    if (response === 'si') {
        messageBox.innerHTML = `
            <i class="fas fa-check-circle" style="color:#4CAF50; margin-right:10px;"></i>
            <strong>¡Perfecto!</strong> Se abrirá WhatsApp para que envíes tu confirmación.
            <br><small>Por favor, completa el mensaje con tu nombre.</small>
        `;
        messageBox.style.color = '#4CAF50';
        
        // Efecto de confeti
        createConfetti();
    } else {
        messageBox.innerHTML = `
            <i class="fas fa-heart" style="color:#ffd700; margin-right:10px;"></i>
            <strong>Gracias por avisar.</strong> Se abrirá WhatsApp para que nos lo hagas saber.
            <br><small>Te agradecemos tu honestidad.</small>
        `;
        messageBox.style.color = '#ffd700';
    }
    
    // Animación
    messageBox.classList.add('animate__animated', 'animate__pulse');
    setTimeout(() => {
        messageBox.classList.remove('animate__pulse');
    }, 2000);
}

// Cambiar número de invitados
function changeGuests(change) {
    const guestNumber = document.getElementById('guestNumber');
    let current = parseInt(guestNumber.textContent);
    current += change;
    
    // Límites
    if (current < 1) current = 1;
    if (current > 10) current = 10;
    
    guestNumber.textContent = current;
    selectedGuests = current;
    
    // Animación
    guestNumber.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
        guestNumber.classList.remove('animate__bounce');
    }, 300);
}

// Opcional: Selector de número de WhatsApp
function selectWhatsAppNumber() {
    const numbers = [
        { name: "Mamá de Gabriela", number: "5215512345678" },
        { name: "Papá de Gabriela", number: "5215598765432" },
        { name: "Gabriela", number: "5215534567890" }
    ];
    
    let optionsText = "¿A qué número deseas enviar tu confirmación?\n\n";
    numbers.forEach((num, index) => {
        optionsText += `${index + 1}. ${num.name}\n`;
    });
    
    const choice = prompt(optionsText + "\nEscribe el número:");
    const selectedIndex = parseInt(choice) - 1;
    
    if (selectedIndex >= 0 && selectedIndex < numbers.length) {
        return numbers[selectedIndex];
    }
    
    return numbers[0]; // Por defecto
}










// Variables para WhatsApp
let selectedWhatsAppNumber = "5215512345678";
let selectedContactName = "Mamá";

// Mostrar modal de WhatsApp
function openWhatsAppModal(response) {
    userResponse = response;
    updateMessagePreview();
    document.getElementById('whatsappModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Cerrar modal
function closeWhatsAppModal() {
    document.getElementById('whatsappModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Seleccionar contacto
function sendToWhatsApp(number, name) {
    selectedWhatsAppNumber = number;
    selectedContactName = name;
    
    // Resaltar contacto seleccionado
    document.querySelectorAll('.contact-card').forEach(card => {
        card.style.background = 'rgba(255, 255, 255, 0.1)';
    });
    event.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
    
    updateMessagePreview();
}

// Actualizar vista previa del mensaje
function updateMessagePreview() {
    const guestCount = selectedGuests;
    const preview = document.getElementById('messagePreview');
    
    let message = '';
    
    if (userResponse === 'si') {
        message = `¡Hola ${selectedContactName}! Confirmo mi asistencia a *Mis XV Años - Gabriela*.\n\n` +
                 `✅ *Asistiré:* Sí\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `👥 *Número de invitados:* ${guestCount}\n` +
                 `📅 *Fecha:* 15 de Junio, 2025\n` +
                 `⏰ *Hora:* 7:00 PM\n` +
                 `📍 *Lugar:* Salón Diamante\n\n` +
                 `¡Nos vemos en la celebración! 🎉`;
    } else {
        message = `¡Hola ${selectedContactName}! Lamento informar que *no podré asistir* a los XV Años de Gabriela.\n\n` +
                 `❌ *Asistiré:* No\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `💝 *Motivo:* [ESCRIBE TU MOTIVO AQUÍ]\n\n` +
                 `Te deseo un día maravilloso y lleno de bendiciones. ¡Felices XV! 🎂`;
    }
    
    preview.textContent = message;
}

// Enviar mensaje por WhatsApp
function sendWhatsAppMessage() {
    const guestCount = selectedGuests;
    
    let message = '';
    
    if (userResponse === 'si') {
        message = `¡Hola! Confirmo mi asistencia a *Mis XV Años - Gabriela*.\n\n` +
                 `✅ *Asistiré:* Sí\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `👥 *Número de invitados:* ${guestCount}\n` +
                 `📅 *Fecha:* 15 de Junio, 2025\n` +
                 `⏰ *Hora:* 7:00 PM\n` +
                 `📍 *Lugar:* Salón Diamante\n\n` +
                 `¡Nos vemos en la celebración! 🎉`;
    } else {
        message = `¡Hola! Lamento informar que *no podré asistir* a los XV Años de Gabriela.\n\n` +
                 `❌ *Asistiré:* No\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `💝 *Motivo:* [ESCRIBE TU MOTIVO AQUÍ]\n\n` +
                 `Te deseo un día maravilloso y lleno de bendiciones. ¡Felices XV! 🎂`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${selectedWhatsAppNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    closeWhatsAppModal();
    
    // Mostrar mensaje de éxito
    showLocalMessage(userResponse);
}




