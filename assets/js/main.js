// Scene setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
let renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 2000;

let controls = new THREE.OrbitControls(camera, renderer.domElement);

class ParticleSystem {
	constructor(sphereRadius, amount, yr, size, systemType) {
		this.radius = sphereRadius;
		this.particleAmount = amount;
		this.particles = new THREE.Points();
		this.color = Math.random() * 0xFFFFFF;
		this.yr = yr;
		this.size = size;
		this.systemType = systemType;
	}

	create() {
		if (this.systemType) {
			let particlesGeometry = new THREE.Geometry();
			for (let i = 0; i < this.particleAmount; i++) {
				let theta = Math.random() * (Math.PI * 2);
				let phi = (Math.random() * Math.PI * 2) - (Math.PI * 2);
				let particle = new THREE.Vector3();
				let randomPos = Math.random() * this.radius;
				particle.x = randomPos * Math.sin(theta) * Math.cos(phi);
				particle.y = randomPos * Math.cos(theta);
				particle.z = randomPos * Math.sin(theta) * Math.sin(phi);
				particlesGeometry.vertices.push(particle);
			}
			let particlesMaterial = new THREE.PointsMaterial({ color: this.color, size: this.size });
			this.particles.geometry = particlesGeometry;
			this.particles.material = particlesMaterial;
			this.particles.name = "PARTICLES";
			return this.particles;
		}
		else {
			let particlesGeometry = new THREE.Geometry();
			for (let i = 0; i < this.particleAmount; i++) {
				let theta = Math.random() * (Math.PI * 2);
				let phi = (Math.random() * Math.PI * 2) - (Math.PI * 2);
				let particle = new THREE.Vector3();
				let randomPos = Math.random() * this.radius;
				particle.x = randomPos * Math.sin(theta) * Math.cos(phi);
				particle.y = this.yr * Math.random();
				particle.z = randomPos * Math.sin(theta) * Math.sin(phi);
				particlesGeometry.vertices.push(particle);
			}
			let particlesMaterial = new THREE.PointsMaterial({ color: this.color, size: this.size });
			this.particles.geometry = particlesGeometry;
			this.particles.material = particlesMaterial;
			this.particles.name = "PARTICLES";
			return this.particles;
		}
	}

}

const blackholeGeometry = new THREE.SphereBufferGeometry(100, 32, 32);
const blackholeMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
const blackhole = new THREE.Mesh(blackholeGeometry, blackholeMaterial);
scene.add(blackhole);

const sphereGeometry = new THREE.SphereBufferGeometry(1000, 32, 32);
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x9bd1e1, transparent: true, opacity: .05, blending: THREE.AdditiveBlending });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

// Adding some lighting to the scene
const light = new THREE.AmbientLight();
scene.add(light);

console.log(blackhole)

const systemType = Math.random() > 0.5;

const particleSystem_1 = new ParticleSystem(200, 5000, 10, 6, systemType);
const particles_1 = particleSystem_1.create();

const particleSystem_2 = new ParticleSystem(400, 5000, 8, 5, systemType);
const particles_2 = particleSystem_2.create();

const particleSystem_3 = new ParticleSystem(550, 5000, 7, 4, systemType);
const particles_3 = particleSystem_3.create();

const particleSystem_4 = new ParticleSystem(600, 5000, 5, 3, systemType);
const particles_4 = particleSystem_4.create();

const particleSystem_5 = new ParticleSystem(750, 5000, 4, 4, systemType);
const particles_5 = particleSystem_5.create();

const particleSystem_6 = new ParticleSystem(900, 5000, 1, 5, systemType);
const particles_6 = particleSystem_6.create();

scene.add(particles_1, particles_2, particles_3, particles_4, particles_5, particles_6);

camera.position.set(95, 1100, 1650);

function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
	controls.update();
	particles_1.rotation.y += .064;
	particles_2.rotation.y += .032;
	particles_3.rotation.y += .016;
	particles_4.rotation.y += .008;
	particles_5.rotation.y += .004;
	particles_6.rotation.y += .002;
	if(systemType && blackhole.scale.x < 9.5){
		blackhole.scale.set(blackhole.scale.x+=.01, blackhole.scale.y+=.01, blackhole.scale.z+=.01);
	}
}

animate();



