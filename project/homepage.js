import * as THREE from 'three';
import * as MODELS from './mscript.js';
//import * as FUNCTIONS from './models.js';
import { TrackballControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js'
import { randomPosition, Pause } from './functions.js';
//import * as CONTROLS from './inputHandler.js'
//import { selectedplane } from './models.js';
function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});



  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;
  //const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  //camera.position.set(0,0,7);
  //camera.position.z = 3;
  //camera.position.z = 6;
  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(0, 140, -30)
  camera.lookAt(0, 0, 0);



  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x92FFF8);


    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-20, 20,20);
    scene.add(light);



/*
const plane=PLANE.createPlane1();
plane.position.set(0,0,0);
plane.scale.set(0.5,0.5,0.5);
*/

var enemies=[];
var enemy;



var selectedplane=1;
var plane;



function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}


function generatePlane(){
  if(randomPosition(0,1)){
    enemy=new MODELS.Plane2();
  }else{
    enemy=new MODELS.Plane();
  }

  enemy.mesh.position.set(randomPosition(-70,70) , 0, randomPosition(100, 200));
  enemy.mesh.scale.set(0.5, 0.5, 0.5)
  enemy.mesh.rotation.y=Math.PI;
  scene.add( enemy.mesh );
  enemies.push(enemy);
  console.log(enemies);

}


//_____________________________________________________________



//spawn an enemy plane each second


setInterval(function() {
  generatePlane();
}, 2000);


//_______________________________________________________________



  function render(time) {

    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }


    enemies.forEach(p => {
      p.propeller.rotation.z=20*time;
      p.movePlanePattern1(0.5);
      p.destroy();
      if(p.mesh.position.y<=-100 || p.mesh.position.z<-80){
        scene.remove(p.mesh);
      }

    });


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  
  }
  requestAnimationFrame(render);
}



main();
