// Particle Background Animation - Mobile & PC Optimized
// Device-adaptive particle system with performance optimization

const initializeParticleBackground = () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Device detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
  const isLowPower = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Adaptive constants based on device
  const COLORS = ['#b8c5c7', '#a8b5b7', '#98a5a7', '#889597', '#788587', '#687577', '#586567', '#485557'];
  const MAX_SPEED = isMobile ? 0.3 : 0.5;
  const MOUSE_INFLUENCE_RADIUS = isMobile ? 100 : 200;
  const MAX_SPHERE_PARTICLES = isMobile ? 3000 : 10000;
  const MAX_AMBIENT_PARTICLES = isMobile ? 1000 : 4000;
  const SPHERE_PARTICLES_PER_FRAME = isMobile ? 10 : 30;
  const AMBIENT_PARTICLES_PER_FRAME = isMobile ? 4 : 15;
  const FADE_IN_DURATION = 1000;
  const GRAIN_ENABLED = !isLowPower && (isMobile ? false : true);

  // Sphere configuration - responsive positioning
  let SPHERE_CENTER_X = canvas.width * (isMobile ? 0.5 : 0.25);
  let SPHERE_CENTER_Y = canvas.height * 0.5;
  let SPHERE_RADIUS = Math.min(canvas.width, canvas.height) * (isMobile ? 0.25 : 0.35);

  // Particle arrays
  const sphereParticles = [];
  const ambientParticles = [];

  // Mouse/Touch state
  let mouseX = undefined;
  let mouseY = undefined;
  let mouseVelocityX = 0;
  let mouseVelocityY = 0;
  let lastMouseX = undefined;
  let lastMouseY = undefined;

  // Adaptive grain texture
  function addGrainTexture() {
    if (!GRAIN_ENABLED) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const grainIntensity = isMobile ? 30 : 60;
    const backgroundGrain = isMobile ? 15 : 25;
    const coverage = isMobile ? 0.5 : 0.9;

    for (let i = 0; i < pixels.length; i += 4) {
      const intensity = pixels[i + 3] > 0 ? grainIntensity : backgroundGrain;
      const noise = (Math.random() - 0.5) * intensity;

      if (pixels[i + 3] > 0 || Math.random() < coverage) {
        pixels[i] = Math.max(0, Math.min(255, pixels[i] + noise));
        pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + noise));
        pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + noise));
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  // Sphere Particle class
  class SphereParticle {
    constructor() {
      const angle = Math.random() * Math.PI * 2;
      const radiusVariance = Math.random();
      const distance = Math.sqrt(radiusVariance) * SPHERE_RADIUS;

      this.x = SPHERE_CENTER_X + Math.cos(angle) * distance;
      this.y = SPHERE_CENTER_Y + Math.sin(angle) * distance;

      const distFromCenter = Math.sqrt(
        Math.pow(this.x - SPHERE_CENTER_X, 2) +
        Math.pow(this.y - SPHERE_CENTER_Y, 2)
      );
      const normalizedDist = distFromCenter / SPHERE_RADIUS;

      this.size = (1 - normalizedDist * 0.6) * (Math.random() * (isMobile ? 2 : 2.5) + 0.4);
      this.speedX = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4);
      this.speedY = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.4);

      const colorIndex = Math.min(
        Math.floor(normalizedDist * COLORS.length),
        COLORS.length - 1
      );
      this.color = COLORS[colorIndex];

      this.life = Math.random() * 8000 + 12000;
      this.age = 0;
      this.opacity = 0;
      this.baseOpacity = (1 - normalizedDist * 0.3) * 0.95;
    }

    update(deltaTime) {
      const dx = SPHERE_CENTER_X - this.x;
      const dy = SPHERE_CENTER_Y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > SPHERE_RADIUS * 0.3) {
        const pullForce = 0.02;
        this.speedX += (dx / distance) * pullForce;
        this.speedY += (dy / distance) * pullForce;
      }

      if (mouseX !== undefined && mouseY !== undefined) {
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_INFLUENCE_RADIUS) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;

          const repulsionForce = (1 - distMouse / MOUSE_INFLUENCE_RADIUS) * (isMobile ? 1.0 : 1.5);
          this.speedX -= forceDirectionX * repulsionForce;
          this.speedY -= forceDirectionY * repulsionForce;

          this.speedX += mouseVelocityX * 0.05;
          this.speedY += mouseVelocityY * 0.05;
        }
      }

      const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      if (speed > MAX_SPEED) {
        this.speedX = (this.speedX / speed) * MAX_SPEED;
        this.speedY = (this.speedY / speed) * MAX_SPEED;
      }

      this.x += this.speedX;
      this.y += this.speedY;

      const distanceFromCenter = Math.sqrt(
        Math.pow(this.x - SPHERE_CENTER_X, 2) +
        Math.pow(this.y - SPHERE_CENTER_Y, 2)
      );

      if (distanceFromCenter > SPHERE_RADIUS * 1.2) {
        const angle = Math.atan2(this.y - SPHERE_CENTER_Y, this.x - SPHERE_CENTER_X);
        this.x = SPHERE_CENTER_X + Math.cos(angle) * SPHERE_RADIUS;
        this.y = SPHERE_CENTER_Y + Math.sin(angle) * SPHERE_RADIUS;
        this.speedX *= -0.5;
        this.speedY *= -0.5;
      }

      this.age += deltaTime;
      if (this.age < FADE_IN_DURATION) {
        this.opacity = (this.age / FADE_IN_DURATION) * this.baseOpacity;
      } else {
        this.opacity = this.baseOpacity;
      }

      return this.age > this.life;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(
        this.color.slice(3, 5),
        16
      )}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
      ctx.fill();
    }
  }

  // Ambient Particle class
  class AmbientParticle {
    constructor() {
      do {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        const distFromSphere = Math.sqrt(
          Math.pow(this.x - SPHERE_CENTER_X, 2) +
          Math.pow(this.y - SPHERE_CENTER_Y, 2)
        );

        if (distFromSphere > SPHERE_RADIUS * 1.3) break;
      } while (true);

      this.size = Math.random() * (isMobile ? 1.2 : 1.5) + 0.2;
      this.speedX = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3);
      this.speedY = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.3);

      const colorIndex = Math.floor(Math.random() * 4) + (COLORS.length - 4);
      this.color = COLORS[Math.min(colorIndex, COLORS.length - 1)];

      this.life = Math.random() * 10000 + 15000;
      this.age = 0;
      this.opacity = 0;
      this.baseOpacity = Math.random() * (isMobile ? 0.25 : 0.35) + (isMobile ? 0.15 : 0.2);
    }

    update(deltaTime) {
      if (mouseX !== undefined && mouseY !== undefined) {
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_INFLUENCE_RADIUS * 0.8) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;

          const attractionForce = (1 - distMouse / (MOUSE_INFLUENCE_RADIUS * 0.8)) * 0.6;
          this.speedX += forceDirectionX * attractionForce;
          this.speedY += forceDirectionY * attractionForce;

          this.speedX += mouseVelocityX * 0.03;
          this.speedY += mouseVelocityY * 0.03;
        }
      }

      this.speedX *= 0.98;
      this.speedY *= 0.98;

      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

      this.age += deltaTime;
      if (this.age < FADE_IN_DURATION) {
        this.opacity = (this.age / FADE_IN_DURATION) * this.baseOpacity;
      } else {
        this.opacity = this.baseOpacity;
      }

      return this.age > this.life;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${parseInt(this.color.slice(1, 3), 16)}, ${parseInt(
        this.color.slice(3, 5),
        16
      )}, ${parseInt(this.color.slice(5, 7), 16)}, ${this.opacity})`;
      ctx.fill();
    }
  }

  function generateParticles() {
    if (sphereParticles.length < MAX_SPHERE_PARTICLES) {
      for (let i = 0; i < SPHERE_PARTICLES_PER_FRAME; i++) {
        sphereParticles.push(new SphereParticle());
      }
    }

    if (ambientParticles.length < MAX_AMBIENT_PARTICLES) {
      for (let i = 0; i < AMBIENT_PARTICLES_PER_FRAME; i++) {
        ambientParticles.push(new AmbientParticle());
      }
    }
  }

  let lastTimestamp = 0;
  function animateParticles(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    for (let i = 0; i < ambientParticles.length; i++) {
      if (ambientParticles[i].update(deltaTime)) {
        ambientParticles.splice(i, 1);
        i--;
      } else {
        ambientParticles[i].draw();
      }
    }

    for (let i = 0; i < sphereParticles.length; i++) {
      if (sphereParticles[i].update(deltaTime)) {
        sphereParticles.splice(i, 1);
        i--;
      } else {
        sphereParticles[i].draw();
      }
    }

    addGrainTexture();
    generateParticles();
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    const wasMe = isMobile;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Recalculate sphere position and radius on resize
    const currentMobile = window.innerWidth < 768;
    SPHERE_CENTER_X = canvas.width * (currentMobile ? 0.5 : 0.25);
    SPHERE_CENTER_Y = canvas.height * 0.5;
    SPHERE_RADIUS = Math.min(canvas.width, canvas.height) * (currentMobile ? 0.25 : 0.35);

    sphereParticles.length = 0;
    ambientParticles.length = 0;
  });

  // Handle both mouse and touch events
  const handleMove = (x, y) => {
    if (lastMouseX !== undefined && lastMouseY !== undefined) {
      mouseVelocityX = x - lastMouseX;
      mouseVelocityY = y - lastMouseY;
    }
    lastMouseX = x;
    lastMouseY = y;
    mouseX = x;
    mouseY = y;
  };

  window.addEventListener('mousemove', (event) => {
    handleMove(event.x, event.y);
  });

  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      handleMove(event.touches[0].clientX, event.touches[0].clientY);
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    mouseVelocityX = 0;
    mouseVelocityY = 0;
    mouseX = undefined;
    mouseY = undefined;
    lastMouseX = undefined;
    lastMouseY = undefined;
  });

  window.addEventListener('mouseleave', () => {
    mouseVelocityX = 0;
    mouseVelocityY = 0;
    mouseX = undefined;
    mouseY = undefined;
    lastMouseX = undefined;
    lastMouseY = undefined;
  });

  animateParticles(0);
};

export default initializeParticleBackground;
