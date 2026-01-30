function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

/* Snowfall canvas renderer - subtle, performant */
(function () {
  function initSnow() {
    const canvas = document.getElementById("snow-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    let particles = [];

    function resize() {
      const dpi = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpi);
      canvas.height = Math.floor(h * dpi);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpi, 0, 0, dpi, 0, 0);
    }

    function initParticles() {
      particles = [];
      const count = Math.max(80, Math.min(220, Math.floor(window.innerWidth / 6)));
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 3 + 0.6,
          d: Math.random() * 1.5 + 0.2,
          vx: (Math.random() * 1 - 0.5) * 0.6,
          vy: Math.random() * 0.6 + 0.2,
          opacity: 0.2 + Math.random() * 0.8,
        });
      }
    }

    function update(dt) {
      for (let p of particles) {
        p.x += p.vx * p.d * dt * 0.06;
        p.y += p.vy * p.d * dt * 0.06;
        p.x += Math.sin((p.y + dt) * 0.002) * 0.4;
        if (p.y > h + 10) {
          p.y = -10;
          p.x = Math.random() * w;
        }
        if (p.x > w + 20) p.x = -20;
        if (p.x < -20) p.x = w + 20;
      }
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,255,' + (p.opacity * 0.85) + ')';
        ctx.shadowColor = 'rgba(126,240,255,' + (p.opacity * 0.12) + ')';
        ctx.shadowBlur = 6 * (p.r / 3);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    let last = performance.now();
    function loop(now) {
      const dt = now - last;
      last = now;
      update(dt);
      render();
      requestAnimationFrame(loop);
    }

    resize();
    initParticles();
    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });
    requestAnimationFrame(loop);
  }

  if (document.readyState === "loading") {
    window.addEventListener("load", initSnow);
  } else {
    setTimeout(initSnow, 100);
  }
})();
