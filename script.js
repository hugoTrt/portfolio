// ======== PARTIE 1 : Animation d'entrée (Transition vers site) ========

// Références aux éléments HTML
let introAnimation, terminalTextContainer, animatedLogo, userNameDisplay;
const body = document.body; // Référence au body

// Contenu de l'animation
const introSequenceContent = {
    welcomePart1: "/ Connexion détectée...",
    welcomePart2: "Bienvenue.",
};
const userName = "HUGO TERRETTE";

// Paramètres de vitesse et de délai
const fastTypingSpeed = 30;
const normalTypingSpeed = 70;
const messageDisplayTime = 1000;
const fadeOutTime = 500;
const logoWaveInDuration = 800;
const nameDisplayDelay = 500;
const waitBeforeMove = 1000; 
const transitionDuration = 1200; 

// Initialisation des références DOM et démarrage de l'animation
document.addEventListener('DOMContentLoaded', () => {
    introAnimation = document.getElementById('intro-animation');
    terminalTextContainer = introAnimation.querySelector('.terminal-text');
    animatedLogo = document.getElementById('animated-logo');
    userNameDisplay = document.getElementById('user-name-display');

    if (introAnimation) {
        runIntroSequence();
    }
});

// La séquence principale de l'animation (MISE À JOUR)
async function runIntroSequence() {
    
    // 1. Écrire "/ Connexion détectée..."
    const [textSpan1, cursorSpan1] = createTextElements();
    terminalTextContainer.appendChild(textSpan1);
    terminalTextContainer.appendChild(cursorSpan1);
    await typeString(introSequenceContent.welcomePart1, fastTypingSpeed, textSpan1);
    cursorSpan1.remove();
    await sleep(messageDisplayTime);

    // 2. Faire disparaître "Connexion détectée..."
    terminalTextContainer.classList.add('fade-out');
    await sleep(fadeOutTime);
    terminalTextContainer.innerHTML = '';
    terminalTextContainer.classList.remove('fade-out');

    await sleep(300);

    // 3. Écrire "Bienvenue."
    const [textSpan2, cursorSpan2] = createTextElements();
    terminalTextContainer.appendChild(textSpan2);
    terminalTextContainer.appendChild(cursorSpan2);
    await typeString(introSequenceContent.welcomePart2, normalTypingSpeed, textSpan2);
    cursorSpan2.remove();
    await sleep(messageDisplayTime);

    // 4. Faire disparaître "Bienvenue."
    terminalTextContainer.classList.add('fade-out');
    await sleep(fadeOutTime);
    terminalTextContainer.innerHTML = '';
    terminalTextContainer.classList.remove('fade-out');

    // 5. Afficher le logo en vague
    animatedLogo.classList.remove('hidden');
    await sleep(logoWaveInDuration); 

    // 6. Afficher le nom
    userNameDisplay.classList.remove('hidden');
    await sleep(nameDisplayDelay);

    // 7. Attendre 
    await sleep(waitBeforeMove);

    // 8. Démarrer la transition !
    
    // "Tuer" les animations pour libérer la propriété 'transform'
    animatedLogo.style.animation = 'none';
    userNameDisplay.style.animation = 'none';
    
    // Attendre 1 "frame" (20ms) pour que le navigateur lâche l'ancienne anim
    await sleep(20); 
    
    // Appliquer la classe qui DÉCLENCHE la transition "volante"
    body.classList.add('start-transition');
    
    // 9. Démarrer le "Handoff" 
    setTimeout(hideIntroAnimation, transitionDuration);
}

// Fonction pour créer les éléments de texte
function createTextElements() {
    const textSpan = document.createElement('span');
    const cursorSpan = document.createElement('span');
    cursorSpan.className = 'cursor';
    cursorSpan.innerHTML = '█';
    return [textSpan, cursorSpan];
}

// Fonction pour taper du texte dans un span existant
function typeString(str, speed, textSpanElement) {
    return new Promise(resolve => {
        let charIndex = 0;
        function typeChar() {
            if (charIndex < str.length) {
                textSpanElement.innerHTML += str.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                resolve(); // Terminé
            }
        }
        typeChar();
    });
}

// Fonction d'aide pour créer des délais (pause)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fonction pour cacher l'animation d'intro
function hideIntroAnimation() {
    if (introAnimation) {
        introAnimation.classList.add('hidden');
    }
    body.classList.remove('loading');
    body.classList.add('body-loaded');
}


// ======== PARTIE 2 : Animation au défilement (Intersection Observer) ========

document.addEventListener('DOMContentLoaded', function() {
    const elementsToShow = document.querySelectorAll('.projet-carte, .competences-liste li');

    if (elementsToShow.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.1
        });

        elementsToShow.forEach(element => {
            observer.observe(element);
        });
    }
});