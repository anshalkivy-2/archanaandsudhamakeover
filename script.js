// ==========================================
// 1. TAB SWITCHING WITH SLIDE ANIMATION
// ==========================================
function switchTab(tabName, btnElement) {
    // Buttons ka active color change karein
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    btnElement.classList.add('active');

    // Slide karne ke liye position calculate karein
    const tabs = ['facials', 'waxing', 'hair', 'bodyclean'];
    const index = tabs.indexOf(tabName);
    const wrapper = document.querySelector('.tabs-wrapper');
    
    // Wrapper ko shift karein (25% * index)
    if (wrapper) {
        wrapper.style.transform = `translateX(-${index * 25}%)`;
    }
}

// ==========================================
// 2. PAGE NAVIGATION (Bottom Bar)
// ==========================================
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageName + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    const navButtons = document.querySelectorAll('.nav-btn');
    const pageIndex = ['home', 'time', 'booking', 'support'].indexOf(pageName);
    if (pageIndex !== -1 && navButtons[pageIndex]) {
        navButtons[pageIndex].classList.add('active');
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// 3. WHATSAPP BOOKING SYSTEM
// ==========================================
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const address = document.getElementById('address').value;
    const service = document.getElementById('service').value;
    
    if (!name || !mobile || !address || !service) {
        alert('Please fill in all fields!');
        return;
    }
    
    const yourNumber = "919896874368"; 
    
    const message = `*New Appointment Request* %0A%0A👤 Name: ${name}%0A Mobile: ${mobile}%0A📍 Address: ${address}%0A♀️ Service: ${service}`;
    
    window.open(`https://wa.me/${yourNumber}?text=${message}`, '_blank');
    
    this.reset();
});

// ==========================================
// 4. 3D BACKGROUND ANIMATION (Three.js)
// ==========================================
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 700;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xff8fab,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 4;

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
});

function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    particlesMesh.rotation.x += 0.0005;
    particlesMesh.rotation.y += mouseX * 0.005;
    particlesMesh.rotation.x += mouseY * 0.005;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});