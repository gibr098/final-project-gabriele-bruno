import * as THREE from 'three';
import { TrackballControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/TrackballControls.js'

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const fov = 75;
  const aspect = 2;  // the canvas default
  const near = 0.1;
  const far = 5;

  function makeCamera(fov = 40) {
    const aspect = 2;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(8, 4, 10).multiplyScalar(3);
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


  const plane = new THREE.Object3D();
  scene.add(plane);

  //cilinder for the body
  const bodyGeometry = new THREE.CylinderGeometry(3, 1.5 , 20, 9, 25);
  const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);

  bodyMesh.position.y = 1.4;
  bodyMesh.rotation.x=Math.PI/2
  bodyMesh.castShadow = true;
  plane.add(bodyMesh);


const torusGeometry = new THREE.TorusGeometry( 2.6, 0.5, 6, 9 );
const torusMaterial = new THREE.MeshBasicMaterial( { color: 0x6688AA } );
const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.set(0,10,0);
torus.rotation.x=Math.PI/2
torus.rotation.z=Math.PI/2
torus.castShadow = true;
bodyMesh.add( torus );


const tipGeometry = new THREE.CylinderGeometry( 0.8, 1.3, 3, 9 );
const tipMaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );
const tipCylinder = new THREE.Mesh( tipGeometry, tipMaterial );
tipCylinder.position.set(0,10,0);
bodyMesh.add( tipCylinder );


const geometry = new THREE.ConeGeometry( 1, 1, 9 );
const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh( geometry, material );
cone.position.set(0,2,0);
tipCylinder.add( cone );


//propeller
const propGeometry = new THREE.BoxGeometry( 1, 10, 0.2 );
const propMaterial = new THREE.MeshBasicMaterial( {color: 0x7CFC00} );
const propeller = new THREE.Mesh( propGeometry, propMaterial );
propeller.position.set(0,1.35,11.5);
plane.add( propeller );


//wings
const wingGeometry = new THREE.BoxGeometry( 0.7, 4, 25 );
const wingMaterial = new THREE.MeshBasicMaterial( {color: 0xffa500} );
const wing1 = new THREE.Mesh( wingGeometry, wingMaterial );
const wing2 = new THREE.Mesh( wingGeometry, wingMaterial );
wing1.rotation.y=Math.PI/2
wing1.position.set(0 ,5.5, 1);
wing2.rotation.y=Math.PI/2
wing2.position.set(0, 5.5, -3.5);


const wgeometryA = new THREE.CylinderGeometry( 2, 2, 0.7, 5, 1, false, 0, Math.PI );
const wmaterialA = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const wcylinder1A = new THREE.Mesh( wgeometryA, wmaterialA );
const wcylinder2A = new THREE.Mesh( wgeometryA, wmaterialA );
wcylinder1A.rotation.z=-Math.PI/2
wcylinder1A.rotation.x=Math.PI/2
wcylinder1A.position.set(0, 0, -12.5);
wcylinder2A.rotation.z=Math.PI/2
wcylinder2A.rotation.x=Math.PI/2
wcylinder2A.position.set(0, 0, 12.5);
wing1.add( wcylinder1A );
wing1.add( wcylinder2A );

const wgeometryB = new THREE.CylinderGeometry( 2, 2, 0.7, 5, 1, false, 0, Math.PI );
const wmaterialB = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const wcylinder1B = new THREE.Mesh( wgeometryB, wmaterialB );
const wcylinder2B = new THREE.Mesh( wgeometryB, wmaterialB );
wcylinder1B.rotation.z=-Math.PI/2
wcylinder1B.rotation.x=Math.PI/2
wcylinder1B.position.set(0, 0, -12.5);
wcylinder2B.rotation.z=Math.PI/2
wcylinder2B.rotation.x=Math.PI/2
wcylinder2B.position.set(0, 0, 12.5);
wing2.add( wcylinder1B );
wing2.add( wcylinder2B );


bodyMesh.add( wing1 );
bodyMesh.add( wing2 );

//poles
const Pgeometry = new THREE.BoxGeometry( 4.8, 0.3, 0.3 );
const Pmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const pole1 = new THREE.Mesh( Pgeometry, Pmaterial );
pole1.position.set(2, 1, 10);
pole1.rotation.y=Math.PI/8
const pole2 = new THREE.Mesh( Pgeometry, Pmaterial );
pole2.position.set(2, -1, 10);
pole2.rotation.y=Math.PI/8
const pole3 = new THREE.Mesh( Pgeometry, Pmaterial );
pole3.position.set(2, 1, -10);
pole3.rotation.y=-Math.PI/8
const pole4 = new THREE.Mesh( Pgeometry, Pmaterial );
pole4.position.set(2, -1, -10);
pole4.rotation.y=-Math.PI/8

const Pgeometry1 = new THREE.BoxGeometry( 0.3, 5, 0.3 );
const Pmaterial1 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const pole5 = new THREE.Mesh( Pgeometry1, Pmaterial1 );
pole5.position.set(1.5, 5, -2);
pole5.rotation.x=-Math.PI/4
pole5.rotation.z=-Math.PI/8
const pole6 = new THREE.Mesh( Pgeometry1, Pmaterial1 );
pole6.position.set(-1.5, 5, -2);
pole6.rotation.x=-Math.PI/4
pole6.rotation.z=Math.PI/8

wing1.add(pole1);
wing1.add(pole2);
wing1.add(pole3);
wing1.add(pole4);

bodyMesh.add(pole5);
bodyMesh.add(pole6);

//spoilers
const spoiler = new THREE.Shape()
					spoiler.moveTo( 1.5, 0 )
					spoiler.lineTo( 0, 0 )
					spoiler.lineTo( 1.45, 1.5 )
					spoiler.lineTo( 1.5, 1.5 ); // close path
const extrudeSettings = {
  depth: 0.5,
  bevelEnabled: true,
  bevelSegments: 0,
  steps: 2,
  bevelSize: 0.5,
}

const sgeometry = new THREE.ExtrudeGeometry( spoiler, extrudeSettings );
const smaterial = new THREE.MeshBasicMaterial( {color: 0xff0000} );

const smesh = new THREE.Mesh( sgeometry, smaterial );
const smeshR = new THREE.Mesh( sgeometry, smaterial );
const smeshL = new THREE.Mesh( sgeometry, smaterial );
smesh.position.set(0, -7.5, -1.8);
smesh.rotation.y=Math.PI/2
smesh.rotation.x=-Math.PI/2

smeshR.rotation.x=Math.PI
smeshR.rotation.z=Math.PI/2

smeshL.rotation.x=Math.PI
smeshL.rotation.z=Math.PI/2
smeshL.rotation.y=Math.PI

smeshR.position.set(-1.5, -7.5, 0);
smeshL.position.set(1.5, -7.5, 0);


bodyMesh.add(smesh);
bodyMesh.add(smeshR);
bodyMesh.add(smeshL);



//wheels
const Pgeometry2 = new THREE.BoxGeometry( 0.3, 2.5, 0.3 );
const Pmaterial2 = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const pole7 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole7.position.set(-1.5, 6, 3);
pole7.rotation.x=-Math.PI/2.5
const pole8 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole8.position.set(-1.5, 5, 3);
pole8.rotation.x=Math.PI/2.5

const pole9 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole9.position.set(1.5, 6, 3);
pole9.rotation.x=-Math.PI/2.5
const pole10 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole10.position.set(1.5, 5, 3);
pole10.rotation.x=Math.PI/2.5

const wheelGeometry = new THREE.CylinderGeometry( 1, 1, 0.5, 32 );
const wheelMaterial = new THREE.MeshBasicMaterial( {color: 0x808080} );
const wheel1 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel1.position.set(-0.5,-1.5,-0.1);
wheel1.rotation.z=Math.PI/2

const wheel2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel2.position.set(0.5,-1.5,-0.1);
wheel2.rotation.z=Math.PI/2

const pole11 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole11.position.set(0, -7, 2.5);
pole11.rotation.x=-Math.PI/2.5
const pole12 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole12.position.set(0, -8, 2.5);
pole12.rotation.x=Math.PI/2.5


const wheel3 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel3.position.set(-0.5,-1.5,-0.1);
wheel3.rotation.z=Math.PI/2

pole7.add(wheel1);
pole9.add(wheel2);
pole11.add(wheel3);

bodyMesh.add(pole7);
bodyMesh.add(pole8);

bodyMesh.add(pole9);
bodyMesh.add(pole10);

bodyMesh.add(pole11);
bodyMesh.add(pole12);



  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 0, 0);
    scene.add(light);
  }
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

  function render(time) {
    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    propeller.rotation.z=time;
    //plane.rotation.z=time;

    controls.update();


    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}
main();