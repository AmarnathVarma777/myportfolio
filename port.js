// =============== Canvas Animation (Dark Theme with Glow) ===============
const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");
let DPR = window.devicePixelRatio || 1;
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth * DPR;
  canvas.height = window.innerHeight * DPR;
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = rand(0, canvas.width / DPR);
    this.y = rand(0, canvas.height / DPR);
    this.vx = rand(-0.3, 0.3);
    this.vy = rand(-0.3, 0.3);
    this.size = rand(2, 6);
    this.color = `hsla(${rand(200, 300)}, 100%, 70%, 0.8)`;
    this.glow = `0 0 ${rand(5, 15)}px ${this.color}`;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width / DPR || this.y < 0 || this.y > canvas.height / DPR) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.shadowBlur = 15;
    ctx.shadowColor = this.color;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}

function animate() {
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#0d0d2b");
  gradient.addColorStop(1, "#1a0033");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// =============== Portfolio Data ===============
const projects = [
  {
    title: "Code Assistant Chatbot",
    description: "An intelligent chatbot built with Python and LangChain.",
    link: "https://github.com/AmarnathVarma777/Coding-Assistant-Chatbot"
  },

];

const tools = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "LangChain", icon: "https://img.icons8.com/fluency/48/artificial-intelligence.png" },
  { name: "LangGraph", icon: "https://img.icons8.com/color/48/network.png" },
  { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" }
];

// =============== Render Functions ===============
const projectsGrid = document.getElementById("projectsGrid");
projects.forEach(p => {
  const card = document.createElement("div");
  card.innerHTML = `
    <h3>${p.title}</h3>
    <p>${p.description}</p>
    <a href="${p.link}" target="_blank">View</a>
  `;
  projectsGrid.appendChild(card);
});

const toolsGrid = document.getElementById("toolsGrid");
tools.forEach(t => {
  const tool = document.createElement("div");
  tool.innerHTML = `
    <img src="${t.icon}" alt="${t.name}" style="max-width:50px"><br>
    ${t.name}
  `;
  toolsGrid.appendChild(tool);
});
