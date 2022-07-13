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

if(selectedplane==1){
  plane=new MODELS.Plane();
}else if(selectedplane==2){
  plane=new MODELS.Plane2();
}

plane.mesh.scale.set(0.5, 0.5, 0.5);
plane.mesh.position.set(0, 0, -30);
scene.add(plane.mesh);

var plane1=new MODELS.Plane2();
plane1.mesh.scale.set(0.5, 0.5, 0.5);
//scene.add(plane1.mesh);
plane1.mesh.position.set(-25,0,40);

var plane2=new MODELS.Plane2();
plane2.mesh.scale.set(0.5, 0.5, 0.5);
//scene.add(plane2.mesh);
plane2.mesh.position.set(25,0,40);

var plane3=new MODELS.Plane2();
plane3.mesh.scale.set(0.5, 0.5, 0.5);
//scene.add(plane3.mesh);
plane3.mesh.position.set(0,0,15);




plane1.mesh.rotation.y=Math.PI;
plane2.mesh.rotation.y=Math.PI;
plane3.mesh.rotation.y=Math.PI;




/*
screen game area (x,z)

90,40 ______________ -90,40
  |                     |
  |                     |
  |                     |
  |                     |
  |                     |
90,-40 _____________ -90,-40


*/

//generatePlane();


enemies.push(plane1);
enemies.push(plane2);
enemies.push(plane3);

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



//Mouse control
/*
  document.addEventListener("mousemove", mouseMoveHandler);
  function mouseMoveHandler(e) {
    plane.mesh.position.x = -(e.pageX - canvas.offsetLeft);
    plane.mesh.position.z = -(e.pageY - canvas.offsetTop);
  }
*/



//Keyboard arrows controlling
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacebarPressed=false;
var R1bullets=[];
var L1bullets=[];
var sPressed=false;
var pPressed=false;



function keyDownHandler(event) {
  
  if(event.keyCode == 39) {
      rightPressed = true;
  }
  else if(event.keyCode == 37) {
      leftPressed = true;
  }
  if(event.keyCode == 40) {
    downPressed = true;
  }
  else if(event.keyCode == 38) {
    upPressed = true;
  }
  if(event.keyCode==32){
    spacebarPressed = true;
    generateBullet();
    
  }
  //pause game with key p
  if(event.keyCode==80){
    if(!pPressed){pPressed = true}

    else{pPressed = false}

    Pause();


  }

  //spawn plane key s
  if(event.keyCode==83){
    sPressed=true;
    generatePlane()
    console.log(enemies)
  }
}




function keyUpHandler(event) {
  if(event.keyCode == 39) {
      rightPressed = false;
  }
  else if(event.keyCode == 37) {
      leftPressed = false;
  }
  if(event.keyCode == 40) {
    downPressed = false;
  }
  else if(event.keyCode == 38) {
    upPressed = false;
  }
  if(event.keyCode==32){
    //spacebarPressed = false;
    
  }
}

var bulletr1, bulletl1;
function generateBullet(){
  bulletr1=new MODELS.Bullet();
  bulletr1.mesh.position.x=plane.mesh.position.x + plane.bulletr1_position_x
  bulletr1.mesh.position.y=plane.mesh.position.y + plane.bulletr1_position_y
  bulletr1.mesh.position.z=plane.mesh.position.z + plane.bulletr1_position_z
  scene.add( bulletr1.mesh );
  R1bullets.push(bulletr1);

  bulletl1=new MODELS.Bullet();
  bulletl1.mesh.position.x=plane.mesh.position.x + plane.bulletl1_position_x;
  bulletl1.mesh.position.y=plane.mesh.position.y + plane.bulletl1_position_y;
  bulletl1.mesh.position.z=plane.mesh.position.z + plane.bulletl1_position_z;
  scene.add( bulletl1.mesh );
  L1bullets.push(bulletl1);
}

var maxpointnumber=7;
function generatePlane(){
  if(randomPosition(0,1)){
    enemy=new MODELS.Plane2();
  }else{
    enemy=new MODELS.Plane();
  }
  
  //enemy.mesh.position.set(randomPosition(-40,40) , 0, randomPosition(0, 60));
  enemy.mesh.position.set(randomPosition(-70,70) , 0, randomPosition(100, 200));

  /*
  var p = enemies_positions[ randomPosition(0, maxpointnumber)];
  if(!p.taken){
    enemy.mesh.position.x=p.x;
    enemy.mesh.position.y=p.y;
    enemy.mesh.position.z=p.z;
    p.taken=true;
  enemy.positionPoint=p;
  enemies_positions.pop(p);
  maxpointnumber-=1;
  */
  enemy.mesh.scale.set(0.5, 0.5, 0.5)
  enemy.mesh.rotation.y=Math.PI;
  scene.add( enemy.mesh );
  enemies.push(enemy);
  console.log(enemies);
  //console.log(enemy.positionPoint);
  //console.log(enemies_positions);
  
}




function collision(bullet, plane){
  var c=(bullet.mesh.position.x<=plane.mesh.position.x+10 && bullet.mesh.position.x>=plane.mesh.position.x-10) &&
        (bullet.mesh.position.z<=plane.mesh.position.z+10 && bullet.mesh.position.z>=plane.mesh.position.z-10) &&
        (bullet.mesh.position.y<=plane.mesh.position.y+10 && bullet.mesh.position.y>=plane.mesh.position.y-10);
  if(c){
    //console.log(c,"Collision");
    plane.hit=true;
    //plane.positionPoint.taken=false;

    bullet.mesh.position.set(0,-10,0);
    scene.remove(bullet.mesh);
  }else{
    if(bullet.mesh.position.z>=60){
      bullet.mesh.position.set(0,-100,0);
      scene.remove(bullet.mesh);
    }
    //console.log(c,"NO collision");
  }
}
//_____________________________________________________________


var t = 3500; // Timer

        var interval;

        f1();

        function changeTimer(){
            if(t<=500){
              t-=0;
            }else if(t<=800){
              t-=5;
            }else{
              t-=100;
            }
        }

        function f1() {
          if(!pPressed){
            clearInterval(interval);
            generatePlane();
            generatePlane();
            console.log(t);
            changeTimer();
            interval = setInterval(f1, t);
          }
        }


//spawn an enemy plane each second
/*
var seconds=3000;
setInterval(function() {
  generatePlane();
  seconds-=100;
  console.log(seconds);
}, seconds);
*/





//_______________________________________________________________


const angle=Math.PI/6;

  function render(time) {
    if(!pPressed){
    time *= 0.001;  // convert time to seconds
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    const vel=1.0;
    if(rightPressed && plane.mesh.position.x>-90) {
      plane.mesh.position.x -= vel;
      if(plane.mesh.rotation.z < angle){
        plane.mesh.rotation.z+=0.05;
      }

     }
    else if(leftPressed && plane.mesh.position.x<90) {
      plane.mesh.position.x += vel;
      if(plane.mesh.rotation.z > -angle){
        plane.mesh.rotation.z-=0.05;
      }

    }
    if(downPressed && plane.mesh.position.z>-40) {
      plane.mesh.position.z -= vel;
      if(plane.mesh.rotation.x > -angle/2){
        plane.mesh.rotation.x-=0.05;
      }
    }
    else if(upPressed && plane.mesh.position.z<40) {
      plane.mesh.position.z += vel;
      if(plane.mesh.rotation.x < angle){
        plane.mesh.rotation.x+=0.05;
      }
    }

    if(!rightPressed) {
      if(plane.mesh.rotation.z > 0){
        plane.mesh.rotation.z-=0.1;
      }
    }
    if(!leftPressed) {
      if(plane.mesh.rotation.z < 0){
        plane.mesh.rotation.z+=0.1;
      }
    }
    if(!upPressed) {
      if(plane.mesh.rotation.x > 0){
        plane.mesh.rotation.x-=0.1;
      }
    }
    if(!downPressed) {
      if(plane.mesh.rotation.x < 0){
        plane.mesh.rotation.x+=0.1;
      }
    }

    var bullet_velocity=2;
    if (spacebarPressed){
      //bullet.shoot(5);
      R1bullets.forEach(b => {
        b.mesh.position.z+=bullet_velocity;
        enemies.forEach(p => {
          collision(b,p);
        });

      });
      L1bullets.forEach(b => {
        b.mesh.position.z+=bullet_velocity;
        enemies.forEach(p => {
          collision(b,p);
        });
      });
    }

    
    //movePlane(plane1);
    //movePlane(plane2);
    //plane.mesh.rotation.x=Math.PI/6;

   
    //console.log(enemies_number);

    controls.update();
    

    enemies.forEach(p => {
      //p.propeller.rotation.z=20*time;
      //p.movePlanePattern1(0.5);
      p.movePlanePattern2(0.5,0.3);
      p.destroy();
      if(p.mesh.position.y<=-100 || p.mesh.position.z<-80){
        scene.remove(p.mesh);
      }
      //movePlane(p);
    });

    
  }
    enemies.forEach(p=>{
      p.propeller.rotation.z+=0.5;
    })
    plane.propeller.rotation.z+=0.5;
    renderer.render(scene, camera);

    requestAnimationFrame(render);
  
  }
  requestAnimationFrame(render);
}



main();
