import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import side1 from './img/Image Background Orange Minimal Phone Wallpaper (1).jpg';
import side2 from './img/Image Background Orange Minimal Phone Wallpaper (2).jpg';
import side3 from './img/Image Background Orange Minimal Phone Wallpaper (3).jpg';
import side4 from './img/Image Background Orange Minimal Phone Wallpaper.jpg';

import floor from './img/Ground.jpg';
import wall from './img/Wall.jpg';
import ceilling from './img/Ceiling.jpg'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

camera.position.z = 3;

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

//controls

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
//const texturedoubleSide = THREE.DoubleSide
const textureBoxMulti = [
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side1), side : THREE.DoubleSide }),
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side2), side : THREE.DoubleSide }),
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side3), side : THREE.DoubleSide }),
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side4), side : THREE.DoubleSide }),
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side1), side : THREE.DoubleSide }),
    new THREE.MeshLambertMaterial({ map : textureLoader.load(side2), side : THREE.DoubleSide })
]

const textureBoxMesh = new THREE.Mesh(textureBox, textureBoxMulti);
textureBoxMesh.position.x = 1;
scene.add(textureBoxMesh);

// ***************** home *****************
// floor 
const floorGeometry = new THREE.BoxGeometry(10,1,10);
const floorMaterial = new THREE.MeshLambertMaterial({ 
    map : textureLoader.load(floor), 
    side :THREE.DoubleSide 
})
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
scene.add( floorMesh );
floorMesh.position.y = -5;

// left wall 
const leftWallGeometry = new THREE.BoxGeometry(1,10,10);
const leftWallMaterial = new THREE.MeshLambertMaterial({ 
    map : textureLoader.load(wall), 
    side :THREE.DoubleSide 
});
const leftWallMesh = new THREE.Mesh(leftWallGeometry, leftWallMaterial);
scene.add( leftWallMesh );
leftWallMesh.position.x = -5;

// right wall 
const rightWallGeometry = new THREE.BoxGeometry(1,10,10);
const rightWallMaterial = new THREE.MeshLambertMaterial({ 
    map : textureLoader.load(wall), 
    side :THREE.DoubleSide 
});
const rightWallMesh = new THREE.Mesh(rightWallGeometry, rightWallMaterial);
scene.add( rightWallMesh );
rightWallMesh.position.x = 5;

// ceiling 
const ceillingGeometry = new THREE.BoxGeometry(10,1,10);
const ceillingMaterial = new THREE.MeshLambertMaterial({
    map : textureLoader.load(ceilling),
    side : THREE.DoubleSide
});
const ceillingMesh = new THREE.Mesh(ceillingGeometry, ceillingMaterial);
scene.add (ceillingMesh);
ceillingMesh.position.y = 5;

// ***************** home *****************

//ambient light
const ambient = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambient);




//box geo animation
function animate() {
	requestAnimationFrame( animate );
    boxMesh.rotation.x += 0.001;
    boxMesh.rotation.y += 0.005;
    

	renderer.render( scene, camera );
}
animate();


