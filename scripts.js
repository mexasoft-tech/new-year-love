  const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        let fireworks = [];

        // Ajustar tamaño del canvas
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        // Función para los fuegos artificiales
        function createFirework(x, y) {
            const colors = ['#ffd700', '#ffffff', '#ff69b4', '#f0e68c', '#00e5ff'];
            const count = window.innerWidth < 768 ? 25 : 45;
            for(let i = 0; i < count; i++) {
                fireworks.push({
                    x, y,
                    dx: (Math.random() - 0.5) * 10,
                    dy: (Math.random() - 0.5) * 10,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1.0,
                    size: Math.random() * 2 + 1
                });
            }
        }

        // Función que se dispara con el botón
        function explotarAmor() {
            document.getElementById('hidden-msg').classList.add('opacity-100');
            for(let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.4);
                }, i * 150);
            }
        }

        // EJECUCIÓN AUTOMÁTICA CADA 1 SEGUNDO
        setInterval(() => {
            createFirework(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.5
            );
        }, 1000);

        // Crear partículas que caen (estrellas/corazones)
        function createParticle() {
            const p = document.createElement('div');
            const icons = ['❤️', '✨', '⭐'];
            p.innerHTML = icons[Math.floor(Math.random() * icons.length)];
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-20px';
            p.style.fontSize = (Math.random() * 10 + 10) + 'px';
            p.style.opacity = Math.random();
            document.body.appendChild(p);

            const duration = Math.random() * 3000 + 4000;
            p.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], { duration: duration, easing: 'linear' });

            setTimeout(() => p.remove(), duration);
        }
        setInterval(createParticle, 500);

        // Animación constante
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = fireworks.length - 1; i >= 0; i--) {
                const p = fireworks[i];
                p.x += p.dx;
                p.y += p.dy;
                p.dy += 0.12; // gravedad
                p.life -= 0.015;
                
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
                
                if(p.life <= 0) fireworks.splice(i, 1);
            }
            requestAnimationFrame(animate);
        }
        animate();

        // Lanzar uno inicial
        setTimeout(explotarAmor, 1000);