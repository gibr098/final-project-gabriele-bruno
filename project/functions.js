import * as THREE from 'three';

  export function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  export function randomPosition(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  export function makeElementObject(type, width, height) {
    const obj = new THREE.Object3D

    const element = document.createElement( type );
    element.style.width = width+'px';
    element.style.height = height+'px';
    element.style.opacity = 0.999;
    element.style.background = new THREE.Color(
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039,
        Math.random() * 0.21568627451 + 0.462745098039,
    ).getStyle();


    var css3dObject = new THREE.CSS3DObject( element );
    obj.css3dObject = css3dObject
    obj.add(css3dObject)

    // make an invisible plane for the DOM element to chop
    // clip a WebGL geometry with it.
    var material = new THREE.MeshPhongMaterial({
        opacity	: 0.15,
        color	: new THREE.Color( 0x111111 ),
        blending: THREE.NoBlending,
        side	: THREE.DoubleSide,
    });
    var geometry = new THREE.BoxGeometry( width, height, 1 );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    obj.lightShadowMesh = mesh
    obj.add( mesh );

    return obj
}

export function Pause() {
  var x = document.getElementById("pause");
  if (x.style.display == "block") {
    x.style.display = "none";
  }else{
    x.style.display = "block";
  }
}