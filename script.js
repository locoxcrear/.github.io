// Crear lámparas flotantes
function createLanterns() {
    const container = document.querySelector('.floating-lanterns');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
        const lantern = document.createElement('div');
        lantern.className = 'lantern';

        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 10 + Math.random() * 10;

        lantern.style.cssText = `
            left: ${left}%;
            top: ${top}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
            opacity: ${0.3 + Math.random() * 0.5};
        `;

        container.appendChild(lantern);
    }
}

// Crear efecto de cabello brillante
function createHairEffect() {
    const hair = document.querySelector('.hair');
    if (hair) {
        setInterval(() => {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.innerHTML = '✨';
            spark.style.cssText = `
                position: absolute;
                font-size: 20px;
                animation: sparkle 1s ease-out forwards;
                z-index: 100;
            `;
            
            // Posición aleatoria en el cabello
            const x = 20 + Math.random() * 60;
            const y = Math.random() * 100;
            
            spark.style.left = `${x}%`;
            spark.style.top = `${y}%`;
            
            hair.appendChild(spark);
            
            // Remover después de la animación
            setTimeout(() => spark.remove(), 1000);
        }, 500);
    }
}

// Efecto de confeti mágico
function createMagicConfetti() {
    const emojis = ['✨', '🌟', '🎉', '🌸', '🌼', '💫', '⚡', '💖', '🎊'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'magic-confetti';
        confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: -50px;
            z-index: 1000;
            pointer-events: none;
            animation: magicFall ${3 + Math.random() * 5}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        // Remover después
        setTimeout(() => confetti.remove(), 8000);
    }
    
    // Agregar estilos para la animación
    if (!document.querySelector('#magicStyles')) {
        const style = document.createElement('style');
        style.id = 'magicStyles';
        style.textContent = `
            @keyframes magicFall {
                0% {
                    transform: translateY(0) rotate(0deg) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg) scale(1);
                }
                100% {
                    transform: translateY(100vh) rotate(${360 * 3}deg) scale(0.5);
                    opacity: 0;
                }
            }
            @keyframes sparkle {
                0% { transform: scale(0) rotate(0deg); opacity: 0; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efecto de brillo al pasar el mouse
function addHoverEffects() {
    const elements = document.querySelectorAll('.detail-item, .confirm-btn, .gallery-item');
    
    elements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 30px rgba(138, 43, 226, 0.3)';
            
            // Crear partículas de brillo
            if (!this.querySelector('.hover-sparkles')) {
                const sparkles = document.createElement('div');
                sparkles.className = 'hover-sparkles';
                sparkles.innerHTML = '✨✨';
                sparkles.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 30px;
                    opacity: 0;
                    animation: sparkleFade 0.5s ease;
                    pointer-events: none;
                `;
                this.appendChild(sparkles);
                
                // Remover después
                setTimeout(() => sparkles.remove(), 500);
            }
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

// Inicializar efectos mágicos cuando cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Crear efectos visuales
    createLanterns();
    createHairEffect();
    addHoverEffects();
    
    // Efecto especial al hacer scroll
    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        const lanterns = document.querySelector('.floating-lanterns');
        
        if (lanterns) {
            lanterns.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    });
    
    // Efecto de entrada para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                
                // Efecto especial para algunos elementos
                if (entry.target.classList.contains('detail-item')) {
                    setTimeout(() => {
                        createMagicConfetti();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observar elementos
    document.querySelectorAll('.section, .detail-item, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});



// Función para abrir Google Maps con tu dirección
function openMap() {
    const exactMapUrl = "https://www.google.com/maps/place/Sal%C3%B3n+Los+Candiles/@19.3152027,-99.1078475,21z/data=!4m15!1m8!3m7!1s0x85ce018c8e3f927b:0x9efeca9e72425f01!2sC.+Tepetlapa+2075,+Coapa,+Alianza+Popular+Revolucionaria,+Coyoac%C3%A1n,+04918+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.3151438!4d-99.1077892!16s%2Fg%2F11c25_f3wn!3m5!1s0x85ce018c96879a7b:0x123c66e50b0f1700!8m2!3d19.3151335!4d-99.1078206!16s%2Fg%2F1tkp03ls?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D";

    window.open(exactMapUrl, '_blank');
    showMapConfirmation("Salón Los Candiles, Ciudad de México");
}



// Función para abrir Google Maps con tu dirección
function openMapIglesia() {
    const exactMapUrl = "https://www.google.com/maps/place/Parroquia+de+Nuestra+Se%C3%B1ora+del+Carmen+y+San+Jos%C3%A9/@19.3011463,-99.1348311,20.5z/data=!4m15!1m8!3m7!1s0x85ce01af87bf062f:0xc7ee13df40a7839b!2sCalz.+De+Guadalupe+230,+Coapa,+Prado+Coapa,+Tlalpan,+14350+Ciudad+de+M%C3%A9xico,+CDMX!3b1!8m2!3d19.3014077!4d-99.1346447!16s%2Fg%2F11pyvy5b3r!3m5!1s0x85ce0060843e5987:0x3dc78852c98304ab!8m2!3d19.3014077!4d-99.1346447!16s%2Fg%2F1tdmf6cz?entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D";

    window.open(exactMapUrl, '_blank');
    showMapConfirmation("Salón Los Candiles, Ciudad de México");
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
    const eventDate = new Date('June 27, 2026 18:00:00').getTime();
    
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
    console.log('Fecha del evento: 27 de Junio, 2026 a las 18:00');
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
    const phoneNumber = "0000000000"; // Tu número aquí
    
    const message = `✨ *¡Hola! Confirmo mi asistencia!* ✨

👑 *Evento:* XV Años - [Tu Nombre]
🎉 *Asistiré:* ¡Sí! Con mucha alegría
👥 *Invitados:* ${selectedGuests}
📅 *Fecha:* 27 de Junio, 2026
⏰ *Hora:* 8:00 PM (Hora de la lámpara)
🏰 *Salón:* Los Candiles

💜 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]
*¡Nos vemos en esta aventura mágica!* 🌟🎊`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    createMagicConfetti(); // Efecto especial
}





// Abrir WhatsApp para decir que NO puede asistir
function openWhatsAppRegret() {
    const phoneNumber = "0000000000"; // Mismo número
    
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
        { name: "Mamá de Mariana", number: "0000000000" },
        { name: "Papá de Mariana", number: "0000000000" },
        { name: "Mariana", number: "00000000000" }
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
let selectedWhatsAppNumber = "0000000000";
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
        message = `¡Hola ${selectedContactName}! Confirmo mi asistencia a *Mis XV Años - Mariana*.\n\n` +
                 `✅ *Asistiré:* Sí\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `👥 *Número de invitados:* ${guestCount}\n` +
                 `📅 *Fecha:* 27 de Junio, 2026\n` +
                 `⏰ *Hora:* 8:00 PM\n` +
                 `📍 *Salón:* Salón Los Candiles\n\n` +
                 `¡Nos vemos en la celebración! 🎉`;
    } else {
        message = `¡Hola ${selectedContactName}! Lamento informar que *no podré asistir* a los XV Años de Mariana.\n\n` +
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
        message = `¡Hola! Confirmo mi asistencia.\n\n` +
                 `✅ *Asistiré:* Sí\n` +
                 `👤 *Mi nombre:* [ESCRIBE TU NOMBRE AQUÍ]\n` +
                 `👥 *Número de invitados:* ${guestCount}\n` +
                 `📅 *Fecha:* 27 de Junio, 2026\n` +
                 `⏰ *Hora:* 8:00 PM\n` +
                 `📍 *Salón:* Salón Los Candiles \n\n` +
                 `¡Nos vemos en la celebración! 🎉`;
    } else {
        message = `¡Hola! Lamento informar que *no podré asistir* a los XV Años de Mariana.\n\n` +
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


function toggleMusic() {
    const music = document.getElementById('backgroundMusic');
    const text = document.getElementById('musicText');

    if (music.paused) {
        music.play();
        text.textContent = " Pausar Música";
    } else {
        music.pause();
        text.textContent = " Activar Música";
    }
}




