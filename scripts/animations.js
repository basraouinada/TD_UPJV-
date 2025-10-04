// ============================================
// PACK D'ANIMATIONS JAVASCRIPT - TD UPJV
// ============================================

// ==========================================
// 1. CONFETTIS AU CHARGEMENT DE LA PAGE 🎉
// ==========================================
function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.opacity = '1';
        confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animation de chute
        let position = -10;
        let rotation = Math.random() * 360;
        const fallSpeed = 2 + Math.random() * 3;
        const rotationSpeed = (Math.random() - 0.5) * 10;
        
        const fall = setInterval(() => {
            position += fallSpeed;
            rotation += rotationSpeed;
            confetti.style.top = position + 'px';
            confetti.style.transform = 'rotate(' + rotation + 'deg)';
            confetti.style.opacity = 1 - (position / window.innerHeight);
            
            if (position > window.innerHeight) {
                clearInterval(fall);
                confetti.remove();
            }
        }, 20);
    }
}

// Lancer les confettis au chargement
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});


// ==========================================
// 2. ANIMATION D'APPARITION AU SCROLL 📜
// ==========================================
function animateOnScroll() {
    const elements = document.querySelectorAll('article, section');
    
    // Ajouter une classe pour l'animation initiale
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Observer les éléments
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => observer.observe(element));
}

// Activer l'animation au scroll
window.addEventListener('load', animateOnScroll);


// ==========================================
// 3. EASTER EGG - KONAMI CODE 🎮
// ==========================================
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiEasterEgg() {
    // Changement de couleurs arc-en-ciel
    let hue = 0;
    const rainbowInterval = setInterval(() => {
        document.body.style.filter = `hue-rotate(${hue}deg)`;
        hue += 5;
        if (hue >= 360) {
            clearInterval(rainbowInterval);
            document.body.style.filter = 'none';
        }
    }, 50);
    
    // Message secret
    alert('🎉 BRAVO ! Vous avez trouvé le Konami Code ! 🎮\n\n↑↑↓↓←→←→BA\n\nVous êtes un vrai gamer ! 🏆');
    
    // Confettis bonus
    createConfetti();
    setTimeout(createConfetti, 300);
    setTimeout(createConfetti, 600);
}


// ==========================================
// 4. COMPTEUR ANIMÉ POUR LES CHIFFRES 🔢
// ==========================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 secondes
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Observer pour déclencher l'animation au scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && counter.textContent === '0') {
                    updateCounter();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

window.addEventListener('load', animateCounters);


// ==========================================
// 5. EFFET AU SURVOL DES TITRES ✨
// ==========================================
function addHoverEffects() {
    const titles = document.querySelectorAll('h2, h3');
    
    titles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        title.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

window.addEventListener('load', addHoverEffects);


// ==========================================
// 6. BOUTON "RETOUR EN HAUT" 🚀
// ==========================================
function createScrollToTopButton() {
    // Créer le bouton
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        transition: transform 0.3s ease, opacity 0.3s ease;
    `;
    
    document.body.appendChild(button);
    
    // Afficher/masquer selon le scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'block';
            setTimeout(() => button.style.opacity = '1', 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => button.style.display = 'none', 300);
        }
    });
    
    // Action du bouton
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Effet hover
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1) rotate(360deg)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) rotate(0deg)';
    });
}

window.addEventListener('load', createScrollToTopButton);


// ==========================================
// 7. MESSAGE DE BIENVENUE ANIMÉ 💬
// ==========================================
function showWelcomeMessage() {
    const message = document.createElement('div');
    message.textContent = '👋 Bienvenue sur notre page de présentation !';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%) translateY(-100px);
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 30px;
        border-radius: 50px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transition: transform 0.5s ease, opacity 0.5s ease;
    `;
    
    document.body.appendChild(message);
    
    // Animation d'apparition
    setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Animation de disparition
    setTimeout(() => {
        message.style.opacity = '0';
        message.style.transform = 'translateX(-50%) translateY(-100px)';
        setTimeout(() => message.remove(), 500);
    }, 3000);
}

window.addEventListener('load', () => {
    setTimeout(showWelcomeMessage, 1000);
});


// ==========================================
// 8. EFFET DE PARTICULES SUR LE CURSEUR ✨
// ==========================================
function createCursorParticles() {
    document.addEventListener('mousemove', (e) => {
        // Créer une particule tous les 50ms seulement
        if (Math.random() > 0.8) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 5px;
                height: 5px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                pointer-events: none;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease, transform 0.5s ease;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.style.opacity = '0';
                particle.style.transform = 'scale(2)';
                setTimeout(() => particle.remove(), 500);
            }, 50);
        }
    });
}

window.addEventListener('load', createCursorParticles);


// ==========================================
// MESSAGE CONSOLE POUR LES CURIEUX 🕵️
// ==========================================
console.log('%c🎉 Félicitations ! 🎉', 'font-size: 30px; color: #667eea; font-weight: bold;');
console.log('%cVous avez ouvert la console ! Vous êtes un vrai développeur ! 💻', 'font-size: 16px; color: #764ba2;');
console.log('%cPetit easter egg : Essayez le Konami Code : ↑↑↓↓←→←→BA', 'font-size: 14px; color: #333;');
// ==========================================
// 10. ETOILES QUI TOMBENT SUR TOUTE LA PAGE ✨
// ==========================================
function createFallingStarsPage() {
    const starCount = 50; // Nombre d'étoiles
    const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#FFFFFF']; // Couleurs des étoiles

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.style.position = 'fixed';
        star.style.width = (2 + Math.random() * 4) + 'px'; // tailles aléatoires
        star.style.height = star.style.width;
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        star.style.borderRadius = '50%';
        star.style.left = Math.random() * window.innerWidth + 'px';
        star.style.top = -10 + 'px';
        star.style.opacity = Math.random() * 0.8 + 0.2;
        star.style.pointerEvents = 'none';
        star.style.zIndex = '9999';
        document.body.appendChild(star);

        const fallSpeed = 1 + Math.random() * 3; // vitesse de chute
        const sway = Math.random() * 2; // léger mouvement horizontal
        let posY = -10;
        let posX = parseFloat(star.style.left);

        const fall = setInterval(() => {
            posY += fallSpeed;
            posX += Math.sin(posY / 30) * sway; // mouvement en zigzag
            star.style.top = posY + 'px';
            star.style.left = posX + 'px';
            
            if (posY > window.innerHeight) {
                clearInterval(fall);
                star.remove();
            }
        }, 20);
    }

    // Relancer les étoiles toutes les 500ms pour un effet continu
    setTimeout(createFallingStarsPage, 500);
}

// Lancer les étoiles au chargement de la page
window.addEventListener('load', createFallingStarsPage);

