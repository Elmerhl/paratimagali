const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class Heart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 15 + Math.random() * 30;
    this.speed = 1 + Math.random() * 2;
    this.opacity = 1;
    this.angle = Math.random() * Math.PI * 2;
    this.rotation = Math.random() * 360;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.font = `${this.size}px Arial`;
    ctx.fillText("❤️", 0, 0);
    ctx.restore();
    ctx.globalAlpha = 1;
  }
  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * 0.5;
    this.rotation += 1;
    if (this.y > canvas.height * 0.9) {
      this.opacity -= 0.02;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.update();
    h.draw();
    if (h.opacity <= 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(animate);
}

setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = -20;
  hearts.push(new Heart(x, y));
}, 400);

animate();