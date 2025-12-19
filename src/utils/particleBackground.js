// Particle Background Animation with Extreme Grain Density and Brightness
// Creates a highly grainy, bright spherical particle cluster with dynamic mouse interaction

const initializeParticleBackground = () => {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Constants - Brighter color palette
  const COLORS = ['#b8c5c7', '#a8b5b7', '#98a5a7', '#889597', '#788587', '#687577', '#586567', '#485557'];
  const MAX_SPEED = 0.5;
  const MOUSE_INFLUENCE_RADIUS = 200;
  const MAX_SPHERE_PARTICLES = 10000; // Massively increased from 7000
  const MAX_AMBIENT_PARTICLES = 4000; // Massively increased from 2500
  const SPHERE_PARTICLES_PER_FRAME = 30; // Increased from 20
  const AMBIENT_PARTICLES_PER_FRAME = 15; // Increased from 8
  const FADE_IN_DURATION = 1000;
  
  // Sphere configuration
  const SPHERE_CENTER_X = canvas.width * 0.25;
  const SPHERE_CENTER_Y = canvas.height * 0.5;
  const SPHERE_RADIUS = Math.min(canvas.width, canvas.height) * 0.35;

  // Particle arrays
  const sphereParticles = [];
  const ambientParticles = [];

  // Mouse state
  let mouseX = undefined;
  let mouseY = undefined;
  let mouseVelocityX = 0;
  let mouseVelocityY = 0;
  let lastMouseX = undefined;
  let lastMouseY = undefined;

  // Maximum grain texture overlay with extreme intensity
  function addGrainTexture() {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
      // Extreme grain intensity
      const grainIntensity = pixels[i + 3] > 0 ? 60 : 25; // Massively increased
      const noise = (Math.random() - 0.5) * grainIntensity;
      
      // 90% coverage for maximum grain
      if (pixels[i + 3] > 0 || Math.random() < 0.9) {
        pixels[i] = Math.max(0, Math.min(255, pixels[i] + noise));
        pixels[i + 1] = Math.max(0, Math.min(255, pixels[i + 1] + noise));
        pixels[i + 2] = Math.max(0, Math.min(255, pixels[i + 2] + noise));
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  }

  // Sphere Particle class with enhanced brightness
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
      
      // Varied particle sizes for more texture
      this.size = (1 - normalizedDist * 0.6) * (Math.random() * 2.5 + 0.4);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.speedY = (Math.random() - 0.5) * 0.4;
      
      // Use brighter colors
      const colorIndex = Math.min(
        Math.floor(normalizedDist * COLORS.length), 
        COLORS.length - 1
      );
      this.color = COLORS[colorIndex];
      
      this.life = Math.random() * 8000 + 12000;
      this.age = 0;
      this.opacity = 0;
      // Increased base opacity for brightness
      this.baseOpacity = (1 - normalizedDist * 0.3) * 0.95;
    }

    update(deltaTime) {
      // Gravitational pull towards sphere center
      const dx = SPHERE_CENTER_X - this.x;
      const dy = SPHERE_CENTER_Y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > SPHERE_RADIUS * 0.3) {
        const pullForce = 0.02;
        this.speedX += (dx / distance) * pullForce;
        this.speedY += (dy / distance) * pullForce;
      }

      // Enhanced mouse interaction
      if (mouseX !== undefined && mouseY !== undefined) {
        const dxMouse = mouseX - this.x;
        const dyMouse = mouseY - this.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < MOUSE_INFLUENCE_RADIUS) {
          const forceDirectionX = dxMouse / distMouse;
          const forceDirectionY = dyMouse / distMouse;
          
          const repulsionForce = (1 - distMouse / MOUSE_INFLUENCE_RADIUS) * 1.5;
          this.speedX -= forceDirectionX * repulsionForce;
          this.speedY -= forceDirectionY * repulsionForce;
          
          this.speedX += mouseVelocityX * 0.05;
          this.speedY += mouseVelocityY * 0.05;
        }
      }

      // Limit speed
      const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
      if (speed > MAX_SPEED) {
        this.speedX = (this.speedX / speed) * MAX_SPEED;
        this.speedY = (this.speedY / speed) * MAX_SPEED;
      }

      // Update position
      this.x += this.speedX;
      this.y += this.speedY;

      // Soft boundaries
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

      // Update age and opacity
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

  // Ambient Particle class with enhanced brightness
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
      
      // More varied particle sizes
      this.size = Math.random() * 1.5 + 0.2;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      
      // Use brighter colors for ambient
      const colorIndex = Math.floor(Math.random() * 4) + (COLORS.length - 4);
      this.color = COLORS[Math.min(colorIndex, COLORS.length - 1)];
      
      this.life = Math.random() * 10000 + 15000;
      this.age = 0;
      this.opacity = 0;
      // Increased ambient opacity for visibility
      this.baseOpacity = Math.random() * 0.35 + 0.2;
    }

    update(deltaTime) {
      // Enhanced mouse interaction
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

      // Apply friction
      this.speedX *= 0.98;
      this.speedY *= 0.98;

      // Update position
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;

      // Update age and opacity
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

  // Generate new particles
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

  // Animation loop
  let lastTimestamp = 0;
  function animateParticles(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const deltaTime = timestamp - lastTimestamp;
    lastTimestamp = timestamp;

    // Update and draw ambient particles
    for (let i = 0; i < ambientParticles.length; i++) {
      if (ambientParticles[i].update(deltaTime)) {
        ambientParticles.splice(i, 1);
        i--;
      } else {
        ambientParticles[i].draw();
      }
    }

    // Update and draw sphere particles
    for (let i = 0; i < sphereParticles.length; i++) {
      if (sphereParticles[i].update(deltaTime)) {
        sphereParticles.splice(i, 1);
        i--;
      } else {
        sphereParticles[i].draw();
      }
    }

    // Apply extreme grain texture
    addGrainTexture();

    generateParticles();
    requestAnimationFrame(animateParticles);
  }

  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sphereParticles.length = 0;
    ambientParticles.length = 0;
  });

  // Enhanced mouse tracking
  window.addEventListener('mousemove', (event) => {
    if (lastMouseX !== undefined && lastMouseY !== undefined) {
      mouseVelocityX = event.x - lastMouseX;
      mouseVelocityY = event.y - lastMouseY;
    }
    
    lastMouseX = event.x;
    lastMouseY = event.y;
    mouseX = event.x;
    mouseY = event.y;
  });

  // Reset mouse velocity when mouse leaves canvas
  window.addEventListener('mouseleave', () => {
    mouseVelocityX = 0;
    mouseVelocityY = 0;
    mouseX = undefined;
    mouseY = undefined;
    lastMouseX = undefined;
    lastMouseY = undefined;
  });

  // Start animation
  animateParticles(0);
};

export default initializeParticleBackground;

