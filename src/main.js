import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import side1 from './img/Image Background Orange Minimal Phone Wallpaper (1).jpg';
import side2 from './img/Image Background Orange Minimal Phone Wallpaper (2).jpg';
import side3 from './img/Image Background Orange Minimal Phone Wallpaper (3).jpg';
import side4 from './img/Image Background Orange Minimal Phone Wallpaper.jpg';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 96;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//function handles window resize

function handleResize () {
    //update camera's aspect ratios
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    //update the rendere's size
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', handleResize);

handleResize();

//constrol

const controls = new OrbitControls( camera, renderer.domElement );

controls.update();

//box geometry

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const boxmaterial = new THREE.MeshBasicMaterial({color : 0xffffff, wireframe: true});
const boxMesh = new THREE.Mesh(boxGeometry, boxmaterial);
scene.add( boxMesh );
boxMesh.position.y = -2;
camera.position.z = 3; 


// texture box geometry

const textureBox = new THREE.BoxGeometry(2,2,2);
const textureLoader = new THREE.TextureLoader;
const texturedoubleSide = THREE.DoubleSide
const textureBoxMulti = [
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side1), side : texturedoubleSide}),
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side2), side : texturedoubleSide}),
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side3), side : texturedoubleSide}),
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side4), side : texturedoubleSide}),
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side1), side : texturedoubleSide}),
    new THREE.MeshBasicMaterial({ map : textureLoader.load(side2), side : texturedoubleSide}),
]

const textureBoxMesh = new THREE.Mesh(textureBox, textureBoxMulti);
textureBoxMesh.position.x = -1;
scene.add(textureBoxMesh);


//box geo animation
function animate() {
	requestAnimationFrame( animate );
    boxMesh.rotation.x += 0.001;
    boxMesh.rotation.y += 0.005;
	renderer.render( scene, camera );
}
animate();


