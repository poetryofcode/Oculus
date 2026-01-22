const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 320;
const HEIGHT = 320;

const SPACING = 20;
const DOT_RADIUS = 2.5;

const FORCE_RADIUS = 40;
const FORCE_STRENGTH = 0.08;
const RETURN_FORCE = 0.05;
const FRICTION = 0.85;

let mouse = {
  x: null,
  y: null,
};

const dots = [];

for (let y = SPACING; y < HEIGHT; y += SPACING) {
  for (let x = SPACING; x < WIDTH; x += SPACING) {
    dots.push({
      x,
      y,
      ox: x,
      oy: y,
      vx: 0,
      vy: 0,
    });
  }
}

canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
});

canvas.addEventListener("mouseleave", () => {
  mouse.x = null;
  mouse.y = null;
});

function animate() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);

  for (const dot of dots) {
    if (mouse.x !== null) {
      const dx = mouse.x - dot.x;
      const dy = mouse.y - dot.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < FORCE_RADIUS) {
        const force = (FORCE_RADIUS - dist) / FORCE_RADIUS;
        dot.vx -= dx * force * FORCE_STRENGTH;
        dot.vy -= dy * force * FORCE_STRENGTH;
      }
    }

    dot.vx += (dot.ox - dot.x) * RETURN_FORCE;
    dot.vy += (dot.oy - dot.y) * RETURN_FORCE;

    dot.vx *= FRICTION;
    dot.vy *= FRICTION;

    dot.x += dot.vx;
    dot.y += dot.vy;

    ctx.fillStyle = "rgba(46,108,189,1)";
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, DOT_RADIUS, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

animate();
