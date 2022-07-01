import * as THREE from 'three';
import * as MODELS from './mscript.js';
import { TrackballControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/TrackballControls.js'
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js'

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
  camera.position.set(0, 90, -30)
  camera.lookAt(0, 0, 0);

const controls = new TrackballControls(camera, renderer.domElement );
controls.rotateSpeed = 2.0;
controls.zoomSpeed = 1.5;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x92FFF8);

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(10, 20, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const boxWidth1 = 0.5;
  const boxHeight1 = 1;
  const boxDepth1 = 0.3;
  const geometry1 = new THREE.BoxGeometry(boxWidth1, boxHeight1, boxDepth1);

  //const material = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue
  const material = new THREE.MeshPhongMaterial({color: 0x44aa88});  // greenish blue

  const cube = new THREE.Mesh(geometry, material);
  function makeInstance(geometry, color, x, y, z) {
    const material = new THREE.MeshPhongMaterial({color});

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.y = y;
    cube.position.z = z;

    return cube;
  }

  const cubes = [
    //makeInstance(geometry, 0x44aa88,  0, -1, -2),
    //makeInstance(geometry1, 0x8844aa, -4, 0, -2),
    //makeInstance(geometry, 0xaa8844,  2, 1.5, -1 ),
  ];

//Background
//const geometryc = new THREE.CylinderGeometry( 2.5, 2.5, canvas.width*1/100, 32 );
const geometryc = new THREE.CylinderGeometry( 25, 25, 100, 32 );
const materialc = new THREE.MeshPhongMaterial( {color: 0x1da2d8} );
const cylinder = new THREE.Mesh( geometryc, materialc );
//scene.add( cylinder );
cylinder.position.set(0, 0, 0);
cylinder.rotation.z=Math.PI/2;

const geometrycubeA = new THREE.BoxGeometry( 0.05, 0.05, 0.05 );
const geometrycubeB = new THREE.BoxGeometry( 0.5, 0.5, 0.05 );
const materialcube = new THREE.MeshBasicMaterial( {color: 0xC2B280} );

const cubeA = new THREE.Mesh( geometrycubeA, materialcube );
cubeA.position.set( 0, 0, 2.5 );

const cubeB = new THREE.Mesh( geometrycubeB, materialcube );
cubeB.position.set( 1, 0, 2.5 );

const group = new THREE.Group();
group.add(cylinder);
group.add(cubeA);
group.add(cubeB)

//scene.add(group);
/*
const plane=PLANE.createPlane1();
plane.position.set(0,0,0);
plane.scale.set(0.5,0.5,0.5);
*/
var plane=new MODELS.Plane2();
scene.add(plane.mesh);


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
  function setupKeyControls() {
    document.addEventListener("keydown",function(event) {
      switch (event.keyCode) {
        case 37:
          plane.mesh.position.x+=0.1;
        break;
        case 38:
          plane.mesh.position.z+=0.1;
        break;
        case 39:
          plane.mesh.position.x-=0.1;
        break;
        case 40:
          plane.mesh.position.z-=0.1;
        break;
      }
    });
  }

/*
const controlPlane = new OrbitControls( plane, renderer.domElement );
controlPlane.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}*/


  function render(time) {
    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube, ndx) => {
      const speed = 1 + ndx * .1;
      const rot = time * speed;
      cube.rotation.x = rot;
      cube.rotation.y = rot;
    });

    setupKeyControls();
    //updatePlane();
    //cylinder.rotation.x = time;
    //plane.rotation.z=2*time;
    
    group.rotation.x=0.2*time;


    controls.update();
    plane.propeller.rotation.z=20*time;
    
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);


  //console.log(canvas.clientWidth);
  //scene.add(cube);

  //renderer.render(scene, camera);
  /*
  function render(time) {
    time *= 0.001;  // convert time to seconds

    cube.rotation.x = time;
    cube.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  */

}

main();
