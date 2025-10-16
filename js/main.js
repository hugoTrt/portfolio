// --- Particules identiques à la version précédente ---
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

class Particle {
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 25 + 2;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let dirX = dx / distance;
        let dirY = dy / distance;

        if (distance < mouse.radius) {
            this.x -= dirX * force * this.density;
            this.y -= dirY * force * this.density;
        } else {
            if (this.x !== this.baseX) this.x -= (this.x - this.baseX) / 15;
            if (this.y !== this.baseY) this.y -= (this.y - this.baseY) / 15;
        }
    }
}

let particles = [];
function initParticles() {
    particles = [];
    const colors = ['#e63946', '#f5f0e6'];
    for (let i = 0; i < 250; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, size, color));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.draw(); p.update(); });
    requestAnimationFrame(animate);
}
initParticles();
animate();

// --- Effet de glow sur le nom ---
const title = document.getElementById('title');
title.addEventListener('mouseenter', () => title.classList.add('hover'));
title.addEventListener('mouseleave', () => title.classList.remove('hover'));
title.addEventListener('mousemove', (e) => {
    const rect = title.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    title.style.setProperty('--x', `${x}px`);
    title.style.setProperty('--y', `${y}px`);
});
