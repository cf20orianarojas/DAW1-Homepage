import './style.css'

import * as THREE from 'three'; 

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene == contenedor  
const scene = new THREE.Scene();

// Camera con perspectiva en 75 grados

const camera = new THREE.PerspectiveCamera( 
  75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderizador 

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bgd'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//render == draw
renderer.render( scene, camera );

//nucleo de la tierra

const geometry = new THREE.SphereGeometry( 5, 32, 32 );
const material = new THREE.MeshStandardMaterial( { color: 0xff3300 } );
const sphere = new THREE.Mesh( geometry, material );

scene.add( sphere );

function animate() {
  requestAnimationFrame(animate);
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.005;
  sphere.rotation.z += 0.01;
  renderer.render( scene, camera ); 
}

animate()

const pointLight = new THREE.PointLight(0xFFFFFF)
pointLight.position.set(-20,20,20)

const ambientLight = new THREE.AmbientLight(0xFFFFFFF);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)

scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement);

//stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffb1})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));

  star.position.set(x,y,z);
  scene.add(star)
}

Array(250).fill().forEach(addStar);


//fondo de pantalla

const loader = new THREE.TextureLoader();
const bgTexture = loader.load('stars_milky_way.jpg');
scene.background = bgTexture;

//earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg');

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(16, 32, 32),
  new THREE.MeshStandardMaterial({
  map: earthTexture
  }) 
);

scene.add(earth);

//moon 

const moonTexture = new THREE.TextureLoader().load('8k_moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
  map: moonTexture
  }) 
);

scene.add(moon);

moon.position.z = 10;
moon.position.y = 10;
moon.position.x = 40;
moon.position.setx(-20);

// animacion scroll

function moveCamera() {
  const ty = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  earth.rotation.y += 0.01;
  earth.rotation.z += 0.01;

  camera.position.z = ty * -0.01;
  camera.position.x = ty * -0.0002;
  camera.position.y = ty * -0.0002;
}

document.body.onscroll = moveCamera