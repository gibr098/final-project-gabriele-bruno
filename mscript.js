//import * as THREE from 'three';
import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js'
import { Vector3 } from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
//import { randFloat } from 'three/src/math/MathUtils';
import { randomPosition } from './functions.js';
//import * as WATER from 'Water';

//PLANE 1
export var Plane=function(){
  this.mesh = new THREE.Object3D();

  //cilinder for the body
  const bodyGeometry = new THREE.CylinderGeometry(3, 1.5 , 20, 9, 25);
  const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});
  const bodyMesh = new THREE.Mesh(bodyGeometry, bodyMaterial);

  bodyMesh.position.y = 1.4;
  bodyMesh.rotation.x=Math.PI/2
  bodyMesh.castShadow = true;
  this.mesh.add(bodyMesh);


  const torusGeometry = new THREE.TorusGeometry( 2.6, 0.5, 6, 9 );
  const torusMaterial = new THREE.MeshPhongMaterial( { color: 0x6688AA } );
  const torus = new THREE.Mesh( torusGeometry, torusMaterial );
  torus.position.set(0,10,0);
  torus.rotation.x=Math.PI/2
  torus.rotation.z=Math.PI/2
  torus.castShadow = true;
  bodyMesh.add( torus );


  const tipGeometry = new THREE.CylinderGeometry( 0.8, 1.3, 3, 9 );
  const tipMaterial = new THREE.MeshPhongMaterial( {color: 0xff0000} );
  const tipCylinder = new THREE.Mesh( tipGeometry, tipMaterial );
  tipCylinder.position.set(0,10,0);
  bodyMesh.add( tipCylinder );


  const geometry = new THREE.ConeGeometry( 1, 1, 9 );
  const material = new THREE.MeshPhongMaterial( {color: 0xffff00} );
  const cone = new THREE.Mesh( geometry, material );
  cone.position.set(0,2,0);
  tipCylinder.add( cone );


  //propeller
  const propGeometry = new THREE.BoxGeometry( 1, 10, 0.2 );
  const propMaterial = new THREE.MeshPhongMaterial( {color: 0x7CFC00} );
  this.propeller = new THREE.Mesh( propGeometry, propMaterial );
  this.propeller.position.set(0,1.35,11.5);
  this.mesh.add(this.propeller);


  //wings
  const wingGeometry = new THREE.BoxGeometry( 0.7, 4, 25 );
  const wingMaterial = new THREE.MeshPhongMaterial( {color: 0xffa500} );
  const wing1 = new THREE.Mesh( wingGeometry, wingMaterial );
  const wing2 = new THREE.Mesh( wingGeometry, wingMaterial );
  wing1.rotation.y=Math.PI/2
  wing1.position.set(0 ,5.5, 1);
  wing2.rotation.y=Math.PI/2
  wing2.position.set(0, 5.5, -3.5);

  const wgeometryA = new THREE.CylinderGeometry( 2, 2, 0.7, 5, 1, false, 0, Math.PI );
  const wmaterialA = new THREE.MeshPhongMaterial( {color: 0xffff00} );
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
  const wmaterialB = new THREE.MeshPhongMaterial( {color: 0xffff00} );
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
  const Pmaterial = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
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
  const Pmaterial1 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
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
                      spoiler.moveTo( 2, 0 )
                      spoiler.lineTo( 0, 0 )
                      spoiler.lineTo( 1.8, 2 )
                      spoiler.lineTo( 2, 2 ); // close path
  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 0,
    steps: 2,
    bevelSize: 0.5,
  }

  const sgeometry = new THREE.ExtrudeGeometry( spoiler, extrudeSettings );
  const smaterial = new THREE.MeshPhongMaterial( {color: 0xff0000} );

  const smesh = new THREE.Mesh( sgeometry, smaterial );
  const smeshR = new THREE.Mesh( sgeometry, smaterial );
  const smeshL = new THREE.Mesh( sgeometry, smaterial );
  smesh.position.set(-0.25, -7.5, -1.8);
  smesh.rotation.y=Math.PI/2
  smesh.rotation.x=-Math.PI/2

  smeshR.rotation.x=Math.PI
  smeshR.rotation.z=Math.PI/2

  smeshL.rotation.x=Math.PI
  smeshL.rotation.z=Math.PI/2
  smeshL.rotation.y=Math.PI

  smeshR.position.set(-1.5, -7.5, 0);
  smeshL.position.set(1.5, -7.5, -0.5);


  bodyMesh.add(smesh);
  bodyMesh.add(smeshR);
  bodyMesh.add(smeshL);



  //wheels
  const Pgeometry2 = new THREE.BoxGeometry( 0.3, 2.5, 0.3 );
  const Pmaterial2 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
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
  const wheelMaterial = new THREE.MeshPhongMaterial( {color: 0x808080} );
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

  //guns
  const gunGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 3.5, 32 );
  const gunMaterial = new THREE.MeshPhongMaterial( {color: 0x505050} );
  const gunR = new THREE.Mesh( gunGeometry, gunMaterial );
  gunR.position.set(1, -0.8, 0);
  gunR.rotation.z=Math.PI/2
  const gunL = new THREE.Mesh( gunGeometry, gunMaterial );
  gunL.position.set(1, 0.8 , 0);
  gunL.rotation.z=Math.PI/2

  const Pmaterial3 = new THREE.MeshPhongMaterial( {color: 0x505050} );
  const pole14 = new THREE.Mesh( Pgeometry2, Pmaterial3 );
  const pole15 = new THREE.Mesh( Pgeometry2, Pmaterial3 );
  pole14.position.set(3, 6.5,-1);
  pole14.rotation.z=Math.PI/2;
  pole15.position.set(-3, 6.5,-1);
  pole15.rotation.z=Math.PI/2;

  pole14.add(gunR);
  pole15.add(gunL);

  bodyMesh.add(pole14);
  bodyMesh.add(pole15);

  this.bulletr1_position_x= -2;
  this.bulletr1_position_y= 0;
  this.bulletr1_position_z= 3.5;
  this.bulletl1_position_x= 2;
  this.bulletl1_position_y= 0;
  this.bulletl1_position_z= 3.5;

  this.hit=false;

  this.R1bullets=[];
  this.L1bullets=[];

  this.R1bullets=[];
  this.L1bullets=[];

var bullet_velocity=2;


this.shoot=function(){
this.R1bullets.forEach(b => {
  b.mesh.position.z-=bullet_velocity;
  });


this.L1bullets.forEach(b => {
  b.mesh.position.z-=bullet_velocity;
});
}
  
  this.destroy=function(){
    if(this.hit){
      //this.mesh.position.y-=0.002*this.mesh.position.z*this.mesh.position.z;
      this.mesh.position.y-=0.002*125;
      this.mesh.position.z-=0.5;
      this.mesh.rotation.x-=0.02;
      this.mesh.rotation.z+=0.1;
    }
  }

  this.movePlanePattern1=function(vel){
    this.mesh.position.z-=vel;
  }

  var flag=true;
  this.ll=randomPosition(-90,90);
 
  this.movePlanePattern2=function(velz, velx){
    this.mesh.position.z-=velz;
    if(this.mesh.position.x < this.ll && flag==true){
      this.mesh.position.x+=velx;

      if( this.mesh.position.x >= this.ll){ flag=false}
    }else if(this.mesh.position.x > this.ll-30 && flag==false){
      this.mesh.position.x-=velx;
      if( this.mesh.position.x <= this.ll-30){ flag=true}
    }
  }

}













//PLANE 2
export var Plane2 = function(){
this.mesh= new THREE.Object3D();
const bodyGeometryp2 = new THREE.CylinderGeometry(3, 1 , 20, 9, 25);
const bodyMaterialp2= new THREE.MeshPhongMaterial({color: 0x00ff00});
const bodyMeshp2 = new THREE.Mesh(bodyGeometryp2, bodyMaterialp2);

bodyMeshp2.position.y = 1.4;
bodyMeshp2.rotation.x=Math.PI/2
bodyMeshp2.castShadow = true;
this.mesh.add(bodyMeshp2);

const tipGeometryp2 = new THREE.CylinderGeometry( 1.5, 3, 2, 9 );
const tipMaterialp2 = new THREE.MeshPhongMaterial( {color: 0xff0000} );
const tipCylinderp2 = new THREE.Mesh( tipGeometryp2, tipMaterialp2 );
tipCylinderp2.position.set(0,11,0);
bodyMeshp2.add( tipCylinderp2 );

const geometry4 = new THREE.ConeGeometry( 1.5, 1, 9 );
const material4 = new THREE.MeshPhongMaterial( {color: 0xffff00} );
const cone4 = new THREE.Mesh( geometry4, material4 );
cone4.position.set(0,1.5,0);
tipCylinderp2.add( cone4 );


//propeller
const propGeometryp = new THREE.BoxGeometry( 1, 10, 0.2 );
const propMaterialp = new THREE.MeshPhongMaterial( {color: 0x7CFC00} );
this.propeller = new THREE.Mesh( propGeometryp, propMaterialp );
const propellerp2 = new THREE.Mesh( propGeometryp, propMaterialp );
this.propeller.position.set(0, 1.35, 12);
propellerp2.position.set(0, 0,0 );
propellerp2.rotation.z=Math.PI/2
this.propeller.add( propellerp2 );
this.mesh.add( this.propeller );

//wings
const wings = new THREE.Shape();
					wings.moveTo( 20, 0 );
					wings.lineTo( 0, 0 );
					wings.lineTo( 0, 3 );
					wings.lineTo( 16, 6 );
          wings.lineTo( 24, 6 );
          wings.lineTo( 40, 3 );
          wings.lineTo( 40, 0 );

const extrudeSettingsW = {
  depth: 0.5,
  bevelEnabled: true,
  bevelSegments: 0,
  steps: 2,
  bevelSize: 0.5,
  bevelOffset: 0,
	bevelSegments: 1
}

const wgeometry = new THREE.ExtrudeGeometry( wings, extrudeSettingsW );
const wmaterial = new THREE.MeshPhongMaterial( {color: 0xff0000} );
const wmesh = new THREE.Mesh( wgeometry, wmaterial );

wmesh.scale.set(1,1,0.05);
wmesh.position.set(-20, 2, 1.5);
bodyMeshp2.add(wmesh);

//wheels
const Pgeometry2 = new THREE.BoxGeometry( 0.3, 2.5, 0.3 );
const Pmaterial2 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const pole7 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole7.position.set(-1.5, 6, 3);
pole7.rotation.x=-Math.PI/2.5
const pole8 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole8.position.set(-1.5, 5, 3);
pole8.rotation.x=Math.PI/2.5
const wheelGeometry = new THREE.CylinderGeometry( 1, 1, 0.5, 32 );
const wheelMaterial = new THREE.MeshPhongMaterial( {color: 0x808080} );
const wheel1 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel1.position.set(-0.5,-1.5,-0.1);
wheel1.rotation.z=Math.PI/2

const wheel2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheel2.position.set(0.5,-1.5,-0.1);
wheel2.rotation.z=Math.PI/2
const pole9 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole9.position.set(1.5, 6, 3);
pole9.rotation.x=-Math.PI/2.5
const pole10 = new THREE.Mesh( Pgeometry2, Pmaterial2 );
pole10.position.set(1.5, 5, 3);
pole10.rotation.x=Math.PI/2.5

pole7.add(wheel1);
pole9.add(wheel2);


bodyMeshp2.add(pole7);
bodyMeshp2.add(pole8);

bodyMeshp2.add(pole9);
bodyMeshp2.add(pole10);


const wheelp2 = new THREE.Mesh( wheelGeometry, wheelMaterial );
wheelp2.position.set(0,-8,1.2);
wheelp2.rotation.z=Math.PI/2
bodyMeshp2.add(wheelp2);




//spoilers
const sgeometry2 = new THREE.BoxGeometry( 11, 1.5, 0.5 );
const smaterial2 = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
const spoilerp2 = new THREE.Mesh( sgeometry2, smaterial2 );
spoilerp2.position.set(0,-9,-0.5);
bodyMeshp2.add( spoilerp2 );
const spoiler = new THREE.Shape()
                      spoiler.moveTo( 2, 0 )
                      spoiler.lineTo( 0, 0 )
                      spoiler.lineTo( 1.8, 2 )
                      spoiler.lineTo( 2, 2 ); // close path
  const extrudeSettings = {
    depth: 0.5,
    bevelEnabled: true,
    bevelSegments: 0,
    steps: 2,
    bevelSize: 0.5,
  }
const sgeometry = new THREE.ExtrudeGeometry( spoiler, extrudeSettings );
const smaterial = new THREE.MeshPhongMaterial( {color: 0xff0000} );
const smesh2 = new THREE.Mesh( sgeometry, smaterial );
smesh2.position.set(-0.25,-7.5,-1.4);
smesh2.rotation.y=Math.PI/2
smesh2.rotation.x=-Math.PI/2
bodyMeshp2.add(smesh2);


//cabin
const cgeometry = new THREE.TorusGeometry( 2, 1.5, 16, 100, Math.PI );
const cmaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );
const cabin = new THREE.Mesh( cgeometry, cmaterial );
cabin.rotation.y=Math.PI/2
cabin.rotation.x=-Math.PI/2
cabin.position.set(0,0,0);
bodyMeshp2.add( cabin );

//guns
const Pmaterial3 = new THREE.MeshPhongMaterial( {color: 0x505050} );
const pole14 = new THREE.Mesh( Pgeometry2, Pmaterial3 );
const pole15 = new THREE.Mesh( Pgeometry2, Pmaterial3 );
pole14.position.set(3, 6.5,-1);
pole14.rotation.z=Math.PI/2;
pole15.position.set(-3, 6.5,-1);
pole15.rotation.z=Math.PI/2;

const gunGeometry = new THREE.CylinderGeometry( 0.5, 0.5, 3.5, 32 );
const gunMaterial = new THREE.MeshPhongMaterial( {color: 0x505050} );
const gunR2 = new THREE.Mesh( gunGeometry, gunMaterial );
gunR2.position.set(-1.2 , 7, -2);
gunR2.rotation.x=-Math.PI/24
const gunL2 = new THREE.Mesh( gunGeometry, gunMaterial );
gunL2.position.set(1.2 , 7 , -2);
gunL2.rotation.x=-Math.PI/24
bodyMeshp2.add( gunR2 );
bodyMeshp2.add( gunL2 );


const gunR = new THREE.Mesh( gunGeometry, gunMaterial );
gunR.position.set(1, -0.8, 0);
gunR.rotation.z=Math.PI/2
const gunL = new THREE.Mesh( gunGeometry, gunMaterial );
gunL.position.set(1, 0.8 , 0);
gunL.rotation.z=Math.PI/2


pole14.add(gunR);
pole15.add(gunL);

const gunR3 = pole14.clone();
const gunR4 = pole14.clone();
const gunL3= pole15.clone();
const gunL4 = pole15.clone();
gunR3.rotation.y=-Math.PI/2
gunR3.position.set(-9,3,2.6);
gunR4.rotation.y=-Math.PI/2
gunR4.position.set(-18,3,2.6);
gunL3.rotation.y=Math.PI/2
gunL3.position.set(9,3,2.6);
gunL4.rotation.y=Math.PI/2
gunL4.position.set(18,3,2.6);
bodyMeshp2.add( gunR3 );
bodyMeshp2.add( gunL3 );
bodyMeshp2.add( gunR4 );
bodyMeshp2.add( gunL4 );

this.hit=false;
  
  this.destroy=function(){
    if(this.hit){
      //this.mesh.position.y-=1;
      //this.mesh.rotation.z+=0.1;
      //this.mesh.position.y-=0.002*this.mesh.position.z*this.mesh.position.z;
      this.mesh.position.y-=0.002*125;
      this.mesh.position.z-=0.5;
      this.mesh.rotation.x-=0.01;
      this.mesh.rotation.z-=0.05;

    }
  }
  this.movePlanePattern1=function(vel){
    this.mesh.position.z-=vel;
  }

  this.rotate=function(){
    if(this.mesh.rotation.z<2*Math.PI){
      this.mesh.rotation.z+=0.1;
    }
  }

  var flag=true;
  this.ll=randomPosition(-90,90);
 
  this.movePlanePattern2=function(velz, velx){
    this.mesh.position.z-=velz;
    if(this.mesh.position.x < this.ll && flag==true){
      this.mesh.position.x+=velx;

      if( this.mesh.position.x >= this.ll){ flag=false}
    }else if(this.mesh.position.x > this.ll-30 && flag==false){
      this.mesh.position.x-=velx;
      if( this.mesh.position.x <= this.ll-30){ flag=true}
    }
  }



//Bullets

//const BulletGeometry = new THREE.BoxGeometry( 0.5, 2.5, 0.5 );
//const BulletMaterial = new THREE.MeshPhongMaterial( {color: 0xD4AF37} );
//this.bullet = new THREE.Mesh( BulletGeometry, BulletMaterial );
this.bulletr1_position_x= -9;
this.bulletr1_position_y= 0;
this.bulletr1_position_z= 3.5;
this.bulletl1_position_x= 9;
this.bulletl1_position_y= 0;
this.bulletl1_position_z= 3.5;
//this.bullet=new Bullet();
//this.bullet.mesh.position.set(-9,5, 3.5);
//this.mesh.add( this.bullet.mesh );

this.positionPoint=null;

this.R1bullets=[];
this.L1bullets=[];

var bullet_velocity=2;


this.shoot=function(){
this.R1bullets.forEach(b => {
  b.mesh.position.z-=bullet_velocity;
  });


this.L1bullets.forEach(b => {
  b.mesh.position.z-=bullet_velocity;
});
}
}


export var Bullet = function(){
  const BulletGeometry = new THREE.BoxGeometry( 0.5, 2.5, 0.5 );
  const BulletMaterial = new THREE.MeshPhongMaterial( {color: 0xD4AF37} );
  this.mesh= new THREE.Mesh( BulletGeometry, BulletMaterial );
  this.mesh.rotation.x=Math.PI/2;

  this.shoot=function(vel){
    this.mesh.position.z+=vel;
  }
  this.stop=function(){
    this.mesh.position.z+=0;
  }

}

export var Position = function(x, y, z){

  this.taken=false;
  this.x=x;
  this.y=y;
  this.z=z;

  return new Vector3(x,y,z);


}


/*
export var Pause= function(){
  const loader = new THREE.FontLoader();

loader.load('https://threejsfundamentals.org/threejs/examples/jsm/loaders/FontLoader.js', (font) => {
  const text = 'PAUSE';  // ui: text
  const material = new THREE.MeshPhongMaterial( {color: 0xD4AF37} );
  const geometry = new THREE.TextGeometry(text, {
    font: font,
    size: 3,  // ui: size
    height: 0.2,  // ui: height
    curveSegments: 12,  // ui: curveSegments
    bevelEnabled: true,  // ui: bevelEnabled
    bevelThickness: 0.15,  // ui: bevelThickness
    bevelSize: 0.3,  // ui: bevelSize
    bevelSegments: 5,  // ui: bevelSegments
  });

  this.mesh= new THREE.Mesh( geometry, material );
});
}*/


