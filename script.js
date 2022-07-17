import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js'
import * as MODELS from './mscript.js';
//import * as FLOOR  from './script1.js';
import {GLTFLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/GLTFLoader.js'
//import * as FUNCTIONS from './models.js';
import { Water } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/objects/Water.js'
import { randomPosition, Pause } from './functions.js';





//import * as CONTROLS from './inputHandler.js'
const sizes = {width: document.body.clientWidth, height: document.body.clientHeight}
var enemyId=0;
var ud=1;
var uds=0;
var mill
var shark
var myObj
const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({canvas});


  
  function makeCamera(fov = 40) {
    const aspect = sizes.width / sizes.height;  // the canvas default
    const zNear = 0.1;
    const zFar = 1000;
    return new THREE.PerspectiveCamera(fov, aspect, zNear, zFar);
  }
  const camera = makeCamera();
  camera.position.set(0, 140, -30)
  camera.lookAt(0, 0, 0);



  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x92FFF8);

  renderer.setSize(sizes.width, sizes.height)
  //renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
 // renderer.shadowMap.enabled = true
  renderer.gammaOuput = true
  renderer.render(scene, camera)


{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-20, 20,20);
    scene.add(light);
}



  const loader = new GLTFLoader()
  loader.load( 'assets/island.glb', function ( glb ) {

      //const root = glb.scene
      myObj = glb.scene
      myObj.position.z +=80
      myObj.position.x +=60
      myObj.position.y -=70
      myObj.scale.set(2,2,2);
      scene.add(myObj);
    })

    const load = new GLTFLoader()
    load.load( 'assets/mill.glb', function ( glb ) {


        mill = glb.scene
        mill.position.z +=150
        mill.position.x -=40
        mill.position.y -=70
        mill.scale.set(30,30,30);
        scene.add(mill);
      })


      const loaderIsl = new GLTFLoader()
  loaderIsl.load( 'assets/shark.glb', function ( glb ) {
      console.log(glb)

      shark = glb.scene;
      shark.position.z +=50;
      shark.scale.set(10,10,10);
      shark.rotation.y=- Math.PI/2;
      shark.rotation.x += 0.5
      shark.position.y -=70

      scene.add(shark);
    })


    var waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

var water = new Water(
  waterGeometry,
  {
    //textureWidth: 512,
    //textureHeight: 512,
    waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {

      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    } ),
    sunDirection: new THREE.Vector3(),
    sunColor: 0xffffff,
    waterColor: 0x001e0f,
    distortionScale: 3.7,
    fog: scene.fog !== undefined
  }
);
water.rotation.x = - Math.PI / 2;
water.position.y -= 70;
scene.add(water)




var heart1= new MODELS.Heart();
var heart2= new MODELS.Heart();
var heart3= new MODELS.Heart();
heart1.mesh.scale.set(0.3,0.3,0.3)
heart2.mesh.scale.set(0.3,0.3,0.3)
heart3.mesh.scale.set(0.3,0.3,0.3)
heart1.mesh.position.set(85,20,35);
heart2.mesh.position.set(80,20,35);
heart3.mesh.position.set(75,20,35);


scene.add(heart1.mesh);
scene.add(heart2.mesh);
scene.add(heart3.mesh);



var enemies=[];
var enemy;


var plane;
var selectedplane=localStorage.getItem("plane");

if(selectedplane==1){
  plane=new MODELS.Plane();
}else if(selectedplane==2){
  plane=new MODELS.Plane2();
}

plane.mesh.scale.set(0.5, 0.5, 0.5);
plane.mesh.position.set(0, 0, -30);
scene.add(plane.mesh);

plane.playerLives=3;



var plane1=new MODELS.Plane2();
plane1.mesh.scale.set(0.5, 0.5, 0.5);
scene.add(plane1.mesh);
plane1.mesh.position.set(-250,0,40);

var plane2=new MODELS.Plane2();
plane2.mesh.scale.set(0.5, 0.5, 0.5);
//scene.add(plane2.mesh);
//plane2.mesh.position.set(25,0,40);

var plane3=new MODELS.Plane2();
plane3.mesh.scale.set(0.5, 0.5, 0.5);
//scene.add(plane3.mesh);
//plane3.mesh.position.set(0,0,15);


plane1.mesh.rotation.y=Math.PI;
plane2.mesh.rotation.y=Math.PI;
plane3.mesh.rotation.y=Math.PI;

enemies.push(plane1);
//enemies.push(plane2);
//enemies.push(plane3);





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



//Keyboard arrows controlling
document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var pPressed = false;
var spacebarPressed=false;
var R1bullets=[];
var L1bullets=[];
var gameover=false;



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
    if(!gameover){

    if(!pPressed){pPressed = true}

    else{pPressed = false}

    Pause();
    }

  }

}


document.getElementById("ResumeButton").onclick=function(){
  if(pPressed){pPressed=false;}
  Pause();
  
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

var bulletr1E, bulletl1E;
function generateEnemyBullet(enemy){
  bulletr1E=new MODELS.Bullet();
  bulletr1E.mesh.position.x=enemy.mesh.position.x - enemy.bulletr1_position_x
  bulletr1E.mesh.position.y=enemy.mesh.position.y - enemy.bulletr1_position_y
  bulletr1E.mesh.position.z=enemy.mesh.position.z - enemy.bulletr1_position_z
  scene.add( bulletr1E.mesh );
  enemy.R1bullets.push(bulletr1E);

  bulletl1E=new MODELS.Bullet();
  bulletl1E.mesh.position.x=enemy.mesh.position.x - enemy.bulletl1_position_x;
  bulletl1E.mesh.position.y=enemy.mesh.position.y - enemy.bulletl1_position_y;
  bulletl1E.mesh.position.z=enemy.mesh.position.z - enemy.bulletl1_position_z;
  scene.add( bulletl1E.mesh );
  enemy.L1bullets.push(bulletl1E);
}


function generatePlane(){
  enemyId++;
  if(randomPosition(0,1)){
    enemy=new MODELS.Plane2();
  }else{
    enemy=new MODELS.Plane();
  }
  
  //enemy.mesh.position.set(randomPosition(-40,40) , 0, randomPosition(0, 60));
  enemy.mesh.position.set(randomPosition(-70,70) , 0, randomPosition(100, 200));

  enemy.mesh.scale.set(0.5, 0.5, 0.5)
  enemy.mesh.rotation.y=Math.PI;
  
  enemies.push(enemy);
  //setInterval(function() {generateEnemyBullet(enemies[enemies.length-1])}, 2000);
  console.log(enemies);
  var a = enemies[enemyId]
  setInterval(function() {
    if(!pPressed){
    generateEnemyBullet(a)
    }
  }, 2000);
  scene.add( enemy.mesh );

  
  
  
}

function collision(bullet, plane){
  var c=(bullet.mesh.position.x<=plane.mesh.position.x+10 && bullet.mesh.position.x>=plane.mesh.position.x-10) &&
        (bullet.mesh.position.z<=plane.mesh.position.z+10 && bullet.mesh.position.z>=plane.mesh.position.z-10) &&
        (bullet.mesh.position.y<=plane.mesh.position.y+10 && bullet.mesh.position.y>=plane.mesh.position.y-10);
  if(c){
    plane.hit=true;
    bullet.mesh.position.set(0,-10,0);
    scene.remove(bullet.mesh);
  }else{
    if(bullet.mesh.position.z>=60){
      bullet.mesh.position.set(0,-100,0);
      scene.remove(bullet.mesh);
    }
  }
}





function playerCollision(bullet, plane){
  var cb=(bullet.mesh.position.x<=plane.mesh.position.x+10 && bullet.mesh.position.x>=plane.mesh.position.x-10) &&
        (bullet.mesh.position.z<=plane.mesh.position.z+10 && bullet.mesh.position.z>=plane.mesh.position.z-10) &&
        (bullet.mesh.position.y<=plane.mesh.position.y+10 && bullet.mesh.position.y>=plane.mesh.position.y-10);

  if(cb){
    plane.playerHit=true;
    plane.removelife();
    bullet.mesh.position.set(0,-10,0);
    scene.remove(bullet.mesh);
  }
}

function enemyCollision(plane, enemy){
  var cp=(plane.mesh.position.x<=enemy.mesh.position.x+10 && plane.mesh.position.x>=enemy.mesh.position.x-10) &&
  (plane.mesh.position.z<=enemy.mesh.position.z+10 && plane.mesh.position.z>=enemy.mesh.position.z-10) &&
  (plane.mesh.position.y<=enemy.mesh.position.y+10 && plane.mesh.position.y>=enemy.mesh.position.y-10);

  if(cp){
    plane.playerHit=true;
    plane.removelife();
  }
}

function dropHearts(p,h1,h2,h3){
  if (p.playerLives==2){ h1.fall()}
  else if (p.playerLives==1){h2.fall();h1.fall()}
  else if(p.playerLives<=0){
    h3.fall();h2.fall();h1.fall();
    document.getElementById("gameover").style.display="block";
    gameover=true;
    setTimeout(function(){
      window.location.href = './index.html';
   }, 4000);

  }

}

//_____________________________________________________________
//gradually spawn enemies


var t = 3500; // Timer

        var interval;

        f1();

        function changeTimer(){
            if(t<=500){
              t-=0;
            }else if(t<=800){
              t-=5;
            }else{
              t-=50;
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
//setInterval(function() {generatePlane();}, 2000);



//_______________________________________________________________



console.log(plane.playerLives);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    render()
}
onWindowResize()


//const angle=Math.PI/6;
  
  //requestAnimationFrame(render);
  /*
  enemies.forEach(p => {
    setInterval(function() {generateEnemyBullet(p)}, 2000);
  
  });*/


const angle=Math.PI/6;

function render() {
  if(!pPressed){

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

  water.material.uniforms[ 'time' ].value += 0.5 / 60.0;

   }
}

function animate(){
console.log(pPressed);
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    const time = performance.now() * 0.001;
    plane.propeller.rotation.z=20*time;
    heart1.mesh.rotation.y+=0.03;
    heart2.mesh.rotation.y+=0.03;
    heart3.mesh.rotation.y+=0.03;
    dropHearts(plane,heart1,heart2,heart3);
    console.log(plane.playerLives);
    plane.destroy();
    enemies.forEach(p=>{
      p.propeller.rotation.z+=0.5;
    })
    if(!pPressed){
    enemies.forEach(p => {
      p.movePlanePattern2(0.5,0.3);
      p.shoot();
      p.destroy();
      //enemyCollision(plane,p);
      p.R1bullets.forEach(br1=>{
        playerCollision(br1,plane);
        if(br1.mesh.position.z<-80){
          scene.remove(br1.mesh);
        }
      });

      p.L1bullets.forEach(bl1=>{
        playerCollision(bl1,plane);
        if(bl1.mesh.position.z<-80){
          scene.remove(bl1.mesh);
        }
      });

      if(p.mesh.position.y<=-100 || p.mesh.position.z<-80){
        scene.remove(p.mesh);
      } 
      
    });
    
    ud+=0.1;
    uds+=0.1;
    if(shark.position.z>-90){
    shark.position.z -= 0.4;
    }
    else{
      shark.position.z = 115;
    }
    shark.rotation.x -= Math.sin(uds)*0.04
    shark.position.y += Math.sin(ud);
    if(myObj.position.z>-80){
    myObj.position.z -= 0.2;
    }
    else{
      myObj.position.z= 150;
    }
    if(mill.position.z>-80){
      mill.position.z -= 0.2;
      }
      else{
        mill.position.z= 150;
      }

    render();
    }

}

animate()

