// Attendre que tout le HTML soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function() {

    // On sélectionne toutes les sections "projet-carte" et "competences-liste li"
    const elementsToShow = document.querySelectorAll('.projet-carte, .competences-liste li');

    // On crée un "IntersectionObserver"
    // C'est une API du navigateur qui regarde quand un élément entre dans la fenêtre
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si l'élément est visible à l'écran...
            if (entry.isIntersecting) {
                // ...on lui ajoute la classe 'is-visible'
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
    });

    // On dit à l'Observer de "surveiller" tous nos éléments
    elementsToShow.forEach(element => {
        observer.observe(element);
    });
});

// === CSS à ajouter dans ton fichier style.css pour que l'animation marche ===


