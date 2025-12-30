 const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        let fireworks = [];

        function createParticle() {
            const p = document.createElement('div');
            const rand = Math.random();
            // Corazones o destellos dorados
            if (rand > 0.5) {
                p.innerHTML = '❤️';
            } else if (rand > 0.2) {
                p.innerHTML = '✨';
            } else {
                p.innerHTML = '⭐';
            }
            
            p.classList.add('particle');
            p.style.left = Math.random() * 100 + 'vw';
            p.style.top = '-20px';
            p.style.fontSize = (Math.random() * 15 + 10) + 'px';
            p.style.opacity = Math.random();
            p.style.filter = "drop-shadow(0 0 5px gold)";
            document.body.appendChild(p);

            const duration = Math.random() * 3000 + 4000;
            p.animate([
                { transform: `translateY(0) rotate(0deg)` },
                { transform: `translateY(110vh) rotate(${Math.random() * 360}deg)` }
            ], { duration: duration, easing: 'linear' });

            setTimeout(() => p.remove(), duration);
        }
        setInterval(createParticle, 400);

        function explotarAmor() {
            document.getElementById('hidden-msg').classList.add('opacity-100');
            for(let i=0; i<12; i++) {
                setTimeout(() => {
                    createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
                }, i * 150);
            }
        }

        function createFirework(x, y) {
            // Colores más de Año Nuevo: Oro, Plata, Blanco, Rosa
            const colors = ['#ffd700', '#ffffff', '#e5e4e2', '#ff69b4', '#f0e68c'];
            for(let i=0; i<60; i++) {
                fireworks.push({
                    x, y,
                    dx: (Math.random() - 0.5) * 12,
                    dy: (Math.random() - 0.5) * 12,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    life: 1.0
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            fireworks.forEach((p, i) => {
                p.x += p.dx;
                p.y += p.dy;
                p.dy += 0.12; 
                p.life -= 0.01;
                
                ctx.globalAlpha = p.life;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = p.color;
                ctx.fill();
                
                if(p.life <= 0) fireworks.splice(i, 1);
            });
            requestAnimationFrame(animate);
        }
        animate();

        // Explosión inicial automática
        setTimeout(() => {
            explotarAmor();
        }, 2000);

        for (let index = 0; index < 5; index++) {
            explotarAmor();
        }
        