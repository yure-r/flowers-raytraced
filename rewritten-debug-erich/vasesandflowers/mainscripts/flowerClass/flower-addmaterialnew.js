  
Flower.prototype.addMaterialNew = function(params, j, object=false, that){
  
    // console.log("MATERIALOP", "add material new!")

  
    if(!window.generateShaderMaterials){


      if(window.generateMaterials){

      

    



  let canvas = document.createElement("canvas")
  let dimensionheight = 200
  let dimensionwidth = 200
  canvas.height = dimensionheight
  canvas. width = dimensionwidth
  canvas.id = "myCanvas"
  document.body.appendChild(canvas)




console.log("PARAMS", params)



// let colorBufferArray = new Uint8Array(colorBuffer)
// geometry.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);

// var uvTex	= new THREE.TextureLoader().load( "https://threejs.org/examples/textures/uv_grid_opengl.jpg" );



  // var material01 = new THREE.MeshBasicMaterial( {  map: uvTex,   side: THREE.DoubleSide, } );


var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

// Create gradient
var grd = ctx.createLinearGradient(0, 0, 0, dimensionheight);

// context.drawImage(img, 0, 0, img.width, img.height, 0,0, img.width, img.height);
// context.globalCompositeOperation = "destination-out";




// if(params.color1.value.r == params.color2.value.r && params.color1.value.g == params.color2.value.g && params.color1.value.b == params.color2.value.b){

//   if (params.color1.value.r != params.color3.value.r || params.color1.value.g != params.color3.value.g || params.color1.value.b != params.color3.value.b){
//   console.log("color 1 and 3 are different colors!")
//   grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
//   grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
//   } else {
//     console.log("all colors are the same")
//   }


// } else if (params.color1.value.r == params.color3.value.r && params.color1.value.g == params.color3.value.g && params.color1.value.b == params.color3.value.b){
//   // console.log("color 1 and 3 are the same colors!")
//   if (params.color1.value.r != params.color2.value.r || params.color1.value.g != params.color2.value.g || params.color1.value.b != params.color2.value.b){
//     console.log("color 1 and 2 are different colors!")
//   grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
// grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
//   }
// } else {



// }

if(this.spherical){


  if (params.color1.value.r !== params.color3.value.r || params.color1.value.g !== params.color3.value.g || params.color1.value.b !== params.color3.value.b){
//   console.log("color 1 and 3 are different colors!")
  grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  params.color1Prod = `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`
  grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
  params.color2Prod = `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`
  params.color3Prod = `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`
  ctx.fillStyle = grd;
ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

// let horizgradient = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
// horizgradient.addColorStop(0, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.8)`);
// horizgradient.addColorStop(1, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.0)`);
// ctx.fillStyle = horizgradient;
// ctx.fillRect(0, 0, dimensionwidth, dimensionwidth);

  } else if (params.color1.value.r !== params.color2.value.r || params.color1.value.g !== params.color2.value.g || params.color1.value.b !== params.color2.value.b){
    // console.log("color 1 and 2 are different colors!")
  grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  params.color1Prod = `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`
  grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
  params.color2Prod = `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`
  params.color3Prod = `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`
  ctx.fillStyle = grd;
ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

// let horizgradient = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
// horizgradient.addColorStop(0, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.8)`);
// horizgradient.addColorStop(1, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.0)`);
// ctx.fillStyle = horizgradient;
// ctx.fillRect(0, 0, dimensionwidth, dimensionwidth);

  } else {
    // console.log("all colors are the same")
  }

} else {

// console.log("NOT SPHERICAL")

if (params.color1.value.r !== params.color3.value.r || params.color1.value.g !== params.color3.value.g || params.color1.value.b !== params.color3.value.b){
//   console.log("color 1 and 3 are different colors!")
  grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  params.color1Prod = `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`
  grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
  params.color2Prod = `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`
  params.color3Prod = `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`
  ctx.fillStyle = grd;
ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

// let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
// horizgradient.addColorStop(0, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
// horizgradient.addColorStop(0.5, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.0)`);
// horizgradient.addColorStop(1, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
// ctx.fillStyle = horizgradient;
// ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

  } else if (params.color1.value.r !== params.color2.value.r || params.color1.value.g !== params.color2.value.g || params.color1.value.b !== params.color2.value.b){
    // console.log("color 1 and 2 are different colors!")
  grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  params.color1Prod = `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`
  grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
  params.color2Prod = `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`
  params.color3Prod = `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`

  ctx.fillStyle = grd;
ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

// let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
// horizgradient.addColorStop(0, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
// horizgradient.addColorStop(0.5, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.0)`);
// horizgradient.addColorStop(1, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
// ctx.fillStyle = horizgradient;
// ctx.fillRect(0, 0, dimensionwidth, dimensionheight);

  } else {
    // console.log("all colors are the same")
  }

}





                               // BEGIN HORIZ LINES
                        //        for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/10)) {
                        // ctx.beginPath(); // Start a new path
                        // ctx.moveTo(0, 6+i); // Move the pen to (30, 50)
                        // ctx.lineTo(dimensionwidth, 6+i); // Draw a line to (150, 100)
                        // ctx.lineWidth = 10;
                        // ctx.strokeStyle = "white";
                        // ctx.stroke(); // Render the path
                        // 	}


    // for (var i = 1; i <=dimension; i+=(dimension/((fxrand()*100)+20))) {
    // ctx.beginPath(); // Start a new path
    // ctx.moveTo(60+i, 0); // Move the pen to (30, 50)
    // ctx.lineTo(60+i, dimension); // Draw a line to (150, 100)
    // ctx.lineWidth = 10;
    // ctx.strokeStyle = "white";
    // ctx.stroke(); // Render the path
    // 	}

                    //BEGIN VERT LINES
let stripeNumber = Math.ceil(fxrand()*10)+2
let stripWeight = Math.ceil(fxrand()*100)+40

let stripeColorChoiceArr = [params.color3Prod, params.color1Prod, params.color2Prod, `rgb(255, 255, 255)`]
this.colorChoiceArr = stripeColorChoiceArr
let stripeColorChoice = stripeColorChoiceArr[Math.floor(fxrand()*stripeColorChoiceArr.length)];

                    if(this.spherical){
                        //        for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/10)) {
                        // // ctx.shadowBlur = 5;
                        // // ctx.beginPath(); // Start a new path
                        // // ctx.moveTo(6+i, dimensionwidth); // Move the pen to (30, 50)
                        // // ctx.lineTo(6+i, 0); // Draw a line to (150, 100)
                        // // ctx.lineWidth = 4;
                        // // ctx.strokeStyle = "white";
                        // // ctx.stroke(); // Render the path


                        // ctx.shadowBlur = 5;
                        // ctx.shadowColor = "white";
                        // ctx.beginPath(); // Start a new path) {
                        // ctx.beginPath(); // Start a new path
                        // ctx.moveTo(6+i, 0); // Move the pen to (30, 50)
                        // ctx.lineTo(6+i, dimensionheight); // Draw a line to (150, 100)
                        // ctx.lineWidth = 4;
                        // ctx.strokeStyle = "white";
                        // ctx.stroke(); // Render the path
                        // 	}

                               for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/(stripeNumber*10))) {
                                ctx.shadowBlur = 0;
                        ctx.shadowColor = stripeColorChoice;
                        ctx.beginPath(); 
                        ctx.beginPath(); // Start a new path
                        ctx.moveTo(i, 0 ); // Move the pen to (30, 50)
                        ctx.lineTo(i, dimensionwidth ); // Draw a line to (150, 100)
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = stripeColorChoice;
                        ctx.stroke(); // Render the path
                            }
                            
                            

                        } else {
                            for (var i = 1; i <=dimensionheight; i+=(dimensionheight/stripeNumber)) {
                        ctx.shadowBlur = 5;
                        ctx.shadowColor = stripeColorChoice;
                        ctx.beginPath(); // Start a new path) {
                        ctx.beginPath(); // Start a new path
                        ctx.moveTo(i, 0); // Move the pen to (30, 50)
                        ctx.lineTo(i, dimensionheight); // Draw a line to (150, 100)
                        ctx.lineWidth = (stripWeight*(1/stripeNumber));
                        ctx.strokeStyle = stripeColorChoice;
                        ctx.stroke(); // Render the path


   
                        // if(((i)+((140*(1/stripeNumber)))/2) > dimensionwidth){
                            ctx.shadowBlur = 5;
                        ctx.shadowColor = stripeColorChoice;
                        ctx.beginPath(); // Start a new path) {
                        ctx.beginPath(); // Start a new path
                        ctx.moveTo(0, 0); // Move the pen to (30, 50)
                        ctx.lineTo(0, dimensionheight); // Draw a line to (150, 100)
                        ctx.lineWidth = (stripWeight*(1/stripeNumber));
                        ctx.strokeStyle = stripeColorChoice;
                        ctx.stroke(); // Render the path


                        ctx.shadowBlur = 5;
                        ctx.shadowColor = stripeColorChoice;
                        ctx.beginPath(); // Start a new path) {
                        ctx.beginPath(); // Start a new path
                        ctx.moveTo(dimensionwidth, 0); // Move the pen to (30, 50)
                        ctx.lineTo(dimensionwidth, dimensionheight); // Draw a line to (150, 100)
                        ctx.lineWidth = (stripWeight*(1/stripeNumber));
                        ctx.strokeStyle = stripeColorChoice;
                        ctx.stroke(); // Render the path
                        // }

                            }

                        //        for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/10)) {
                        // ctx.beginPath(); // Start a new path
                        // ctx.moveTo(0, 6+i); // Move the pen to (30, 50)
                        // ctx.lineTo(dimensionwidth, 6+i); // Draw a line to (150, 100)
                        // ctx.lineWidth = 10;
                        // ctx.strokeStyle = "white";
                        // ctx.stroke(); // Render the path
                        // 	}


                        }


// Fill with gradient




//DEFINE RULES FOR DOTS!! 
//SEE WHAT HAPEPNS ;0
                          // if(fxrand()<0.5){

                          //     //50 percent chance to add dots!!!
                          //     //dot texture!!

                          // for (var i = 0; i <=100; i++) {
                          //   let radius = fxrand()*dimensionwidth/25 
                          //   let x = fxrand()*dimensionwidth
                          //   let y = fxrand()*dimensionheight
                          //   var radgrad = ctx.createRadialGradient(x,y,0,x,y,radius);
                          //   radgrad.addColorStop(0, 'rgba(255,255,255,1)');
                          //   radgrad.addColorStop(0.5, 'rgba(255,255,255,.5)');
                          //   radgrad.addColorStop(1, 'rgba(255,255,255,0)');
                            
                          //   // draw shape
                          //   ctx.fillStyle = radgrad;
                          //   ctx.fillRect(0,0,dimensionwidth,dimensionheight);

                          // if(x < radius){
                          //   var radgrad2 = ctx.createRadialGradient(x+dimensionwidth,y,0,x+dimensionwidth,y,radius);
                          //   radgrad2.addColorStop(0, 'rgba(255,255,255,1)');
                          //   radgrad2.addColorStop(0.5, 'rgba(255,255,255,.5)');
                          //   radgrad2.addColorStop(1, 'rgba(255,255,255,0)');
                            
                          //   // draw shape
                          //   ctx.fillStyle = radgrad2;
                          //   ctx.fillRect(0,0,dimensionwidth,dimensionheight);
                          // }

                          // if(x-dimensionwidth < radius){


                          //   var radgrad3 = ctx.createRadialGradient(x-dimensionwidth,y,0,x-dimensionwidth,y,radius);
                          //   radgrad3.addColorStop(0, 'rgba(255,255,255,1)');
                          //   radgrad3.addColorStop(0.5, 'rgba(255,255,255,.5)');
                          //   radgrad3.addColorStop(1, 'rgba(255,255,255,0)');
                            
                          //   // draw shape
                          //   ctx.fillStyle = radgrad3;
                          //   ctx.fillRect(0,0,dimensionwidth,dimensionheight);
                          // }


                          //   }

                          // }



  // ctx.beginPath(); // Start a new path
  // ctx.moveTo(16384, 0); // Move the pen to (30, 50)
  // ctx.lineTo(16384, 16384); // Draw a line to (150, 100)
  // ctx.lineWidth = 10;
  // ctx.strokeStyle = "red";
  // ctx.stroke(); // Render the path




  // ctx.filter = 'blur(10px)';


  // for (var i = 0; i <=100; i++) {
  // let radius = fxrand()*200 
  // ctx.beginPath();
  // var rand_x = Math.random(i) * 16384;
  // var rand_y = Math.random(i) * 16384;
  // ctx.arc(rand_x, rand_y, radius, 1, 2*Math.PI);
  // ctx.fillStyle ="white";
  // ctx.fill();
  // ctx.closePath();   
  // }





// 	for (var i = 1; i <=16384; i+=(16384/100)) {
// ctx.beginPath(); // Start a new path
// ctx.moveTo(0, 60+i); // Move the pen to (30, 50)
// ctx.lineTo(16384, 60+i); // Draw a line to (150, 100)
// ctx.lineWidth = 10;
// ctx.strokeStyle = "white";
// ctx.stroke(); // Render the path
// 	}


// for (var i = 1; i <=16384; i+=(16384/((fxrand()*100)+20))) {
// 		ctx.beginPath(); // Start a new path
// 		ctx.moveTo(60+i, 0); // Move the pen to (30, 50)
// 		ctx.lineTo(60+i, 16384); // Draw a line to (150, 100)
// 		ctx.lineWidth = fxrand()*100;
// 		ctx.strokeStyle = "white";
// 		ctx.stroke(); // Render the path
// 			}


var texture = new THREE.CanvasTexture(c) 
    texture.needsUpdate = true;


    document.body.removeChild(canvas)

// return new THREE.MeshBasicMaterial({
//   // color: new THREE.Color("red"),
//   // vertexColors: THREE.VertexColors,
//   // wireframe: true
//   flatShading: false,
//   map: texture,
//   side: THREE.DoubleSide
// });

return new THREE.MeshPhysicalMaterial({
  // color: new THREE.Color("red"),
  // vertexColors: THREE.VertexColors,
        roughness: 1,
      metalness: 0,
  // wireframe: true
  flatShading: false,
  map: texture,
  side: THREE.DoubleSide,
  name:"physicalMaterial" + fxrand()
});

    } else { //generate the shader materials 

      return new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("gray"),
  // vertexColors: THREE.VertexColors,
        roughness: 1,
      metalness: 0,
  // wireframe: true
  flatShading: false,
  // map: texture,
  side: THREE.DoubleSide
});

    }

  } else {

    let vertexShader = `#include <common>
#include <uv_pars_vertex>
#include <uv2_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
  #include <uv_vertex>
  #include <uv2_vertex>
  #include <color_vertex>
  #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
    #include <beginnormal_vertex>
    #include <morphnormal_vertex>
    #include <skinbase_vertex>
    #include <skinnormal_vertex>
    #include <defaultnormal_vertex>
  #endif
  #include <begin_vertex>
  #include <morphtarget_vertex>
  #include <skinning_vertex>
  #include <project_vertex>
  #include <logdepthbuf_vertex>
  #include <clipping_planes_vertex>
  #include <worldpos_vertex>
  #include <envmap_vertex>
  #include <fog_vertex>
}`;

let fragmentShader = `
uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
  varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <uv2_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
  #include <clipping_planes_fragment>
  vec4 diffuseColor = vec4( diffuse, opacity );
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <specularmap_fragment>
  ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
  #ifdef USE_LIGHTMAP
    vec4 lightMapTexel= texture2D( lightMap, vUv2 );
    reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity;
  #else
    reflectedLight.indirectDiffuse += vec3( 1.0 );
  #endif
  #include <aomap_fragment>
  reflectedLight.indirectDiffuse *= diffuseColor.rgb;
  vec3 outgoingLight = reflectedLight.indirectDiffuse;
  #include <envmap_fragment>
  #include <output_fragment>
  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>
}`;


vertexShader = `
        varying vec2 vUv;
        varying vec3 vPos;
        uniform float u_time;
      ${vertexShader}
    `.replace(
          `#include <begin_vertex>`,
          `#include <begin_vertex>
    vPos = transformed;
    vUv = uv;
    `
        );


        fragmentShader = `
        uniform bool spherical;
      uniform vec3 bbMin;
      uniform bool vertCenterGradient;
      uniform bool lowlights;
      uniform bool subtleFade;
      uniform bool topf2;
      uniform bool defaultFade;
      uniform bool effectColor;
      uniform float effectColorReverse;
      uniform bool concentric;
      uniform bool dots;
      uniform bool stripes;
      uniform float effectScale;
      uniform float effect2Scale;
      uniform bool noise;
      uniform vec3 bbMax;
      uniform vec3 color1;
      uniform vec3 color2;
      uniform vec3 color3;
      uniform vec3 color4;
      uniform float vertOffset;
      uniform float centerSize; 
      uniform float centerSize2;
      uniform float u_time;
      uniform float f3Offset;
      varying vec2 vUv;
      varying vec3 vPos;
      uniform float M_PI;
      
      ${fragmentShader}
    `.replace(
          `void main() {
  #include <clipping_planes_fragment>
  vec4 diffuseColor = vec4( diffuse, opacity );`,
          `
          
    // This was found at:
// https://github.com/BrianSharpe/GPU-Noise-Lib
// https://briansharpe.wordpress.com/2011/12/24/polkadot-and-star-noises/


// Author: Stefan Gustavson
// Title: Worley noise 2x2x2

#ifdef GL_ES
precision mediump float;
#endif

// Cellular noise ("Worley noise") in 3D in GLSL.
// Copyright (c) Stefan Gustavson 2011-04-19. All rights reserved.
// This code is released under the conditions of the MIT license.
// See LICENSE file for details.

// Permutation polynomial: (34x^2 + x) mod 289
vec4 permute(vec4 x) {
  return mod((34.0 * x + 1.0) * x, 289.0);
}
vec3 permute(vec3 x) {
  return mod((34.0 * x + 1.0) * x, 289.0);
}

// Cellular noise, returning F1 and F2 in a vec2.
// Speeded up by using 2x2x2 search window instead of 3x3x3,
// at the expense of some pattern artifacts.
// F2 is often wrong and has sharp discontinuities.
// If you need a good F2, use the slower 3x3x3 version.
vec2 cellular2x2x2(vec3 P) {
  #define K 0.142857142857 // 1/7
  #define Ko 0.428571428571 // 1/2-K/2
  #define K2 0.020408163265306 // 1/(7*7)
  #define Kz 0.166666666667 // 1/6
  #define Kzo 0.416666666667 // 1/2-1/6*2
  #define jitter 0.8 // smaller jitter gives less errors in F2
  vec3 Pi = mod(floor(P), 289.0);
   vec3 Pf = fract(P);
  vec4 Pfx = Pf.x + vec4(0.0, -1.0, 0.0, -1.0);
  vec4 Pfy = Pf.y + vec4(0.0, 0.0, -1.0, -1.0);
  vec4 p = permute(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));
  p = permute(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));
  vec4 p1 = permute(p + Pi.z); // z+0
  vec4 p2 = permute(p + Pi.z + vec4(1.0)); // z+1
  vec4 ox1 = fract(p1*K) - Ko;
  vec4 oy1 = mod(floor(p1*K), 7.0)*K - Ko;
  vec4 oz1 = floor(p1*K2)*Kz - Kzo; // p1 < 289 guaranteed
  vec4 ox2 = fract(p2*K) - Ko;
  vec4 oy2 = mod(floor(p2*K), 7.0)*K - Ko;
  vec4 oz2 = floor(p2*K2)*Kz - Kzo;
  vec4 dx1 = Pfx + jitter*ox1;
  vec4 dy1 = Pfy + jitter*oy1;
  vec4 dz1 = Pf.z + jitter*oz1;
  vec4 dx2 = Pfx + jitter*ox2;
  vec4 dy2 = Pfy + jitter*oy2;
  vec4 dz2 = Pf.z - 1.0 + jitter*oz2;
  vec4 d1 = dx1 * dx1 + dy1 * dy1 + dz1 * dz1; // z+0
  vec4 d2 = dx2 * dx2 + dy2 * dy2 + dz2 * dz2; // z+1

  // Sort out the two smallest distances (F1, F2)
#if 0
  // Cheat and sort out only F1
  d1 = min(d1, d2);
  d1.xy = min(d1.xy, d1.wz);
  d1.x = min(d1.x, d1.y);
  return sqrt(d1.xx);
#else
  // Do it right and sort out both F1 and F2
  vec4 d = min(d1,d2); // F1 is now in d
  d2 = max(d1,d2); // Make sure we keep all candidates for F2
  d.xy = (d.x < d.y) ? d.xy : d.yx; // Swap smallest to d.x
  d.xz = (d.x < d.z) ? d.xz : d.zx;
  d.xw = (d.x < d.w) ? d.xw : d.wx; // F1 is now in d.x
  d.yzw = min(d.yzw, d2.yzw); // F2 now not in d2.yzw
  d.y = min(d.y, d.z); // nor in d.z
  d.y = min(d.y, d.w); // nor in d.w
  d.y = min(d.y, d2.x); // F2 is now in d.y
  return sqrt(d.xy); // F1 and F2
#endif
}


  float random(vec2 st) 
{
    return fract(sin(dot(st.xx*st.yy*0.15,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float Circle(vec2 uv, float radius, float blur)
{
    return smoothstep(radius, radius-blur, length(uv))/
    smoothstep(radius*.01, radius+blur, length(uv)*.2);
}

vec2 rotate(vec2 v, float a) {
  float s = sin(a);
  float c = cos(a);
  mat2 m = mat2(c, -s, s, c);
  return m * v;
}


float g_circle_fill(vec2 p, vec2 center, float radius)
{
  return smoothstep(radius + p.x * 0.01, radius, length(p - center));
}

// line 
float g_circle_line(vec2 p, vec2 center, float radius, float th)
{
    float delta = p.x * 0.01;
    float rad1 = radius - th;
    float rad2 = radius + th;
    float l = length(p - center);
  return min(smoothstep(rad1 - delta, rad1, l),
              smoothstep(rad2 + delta, rad2, l));
}

float g_circle_line(vec2 p, vec2 center, float radius){
  return g_circle_line(p, center, radius, 0.); 
}

// ------ POLAR

vec2 plr(float x, float y) { return vec2(length(vec2(x, y)), atan(y, x)); }
vec2 plr(vec2 p) { return plr(p.x, p.y); }

// ------ MATH

#define snap(v,s) ((v/s) * s)    //commenting "round" got the shaders to work in r100

// ----- MAIN_IMAGE
          
          
          void main() {
  #include <clipping_planes_fragment>
    
     vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
     vec4 red = vec4(1.0, 0.0, 0.0, 1.0);
     vec4 blue = vec4(0.0, 0.0, 1.0, 1.0);
     vec4 green = vec4(0.0, 1.0, 0.0, 1.0);
      float f2 = 0.0;
      float f = clamp((vPos.z - bbMin.z) / (bbMax.z - bbMin.z)+vertOffset, 0., 1.);
      //                                                      + is slider for vertical color position, -1 to 1
      float linear_modifier = (1.00 * abs(1.) * f);
      //vertical gradient position!!
      //moves from 0-10?
      
      vec3 col = mix(color1, color2, linear_modifier);
      

      
     
      vec2 pos_ndc = vPos.xy*centerSize2;
      
      float dist = length(pos_ndc*centerSize);
      //controls central gradient position!
      //the lower the larger?
      //0-20
      

      
      if(vertCenterGradient) col = mix(color3, col, dist);
      //NOT USING DIST REMOVES VERTICAL CENTRAL GRADIENT
      
      
      
      // vec4 diffuseColor = vec4( col, opacity );
      

      
      float f3 = clamp(vUv.x+f3Offset, 0., 1.);
      //                    ^ THIS controls brightness of lowlights. lower the more intense.
      
      if (lowlights) col = mix(color3, col, f3); 
      //not using this removes LOWLIGHTS
      
      //f3 is subtle fade
      
      if(subtleFade) col = mix(color3, col, f3);

      
if(spherical){
  if(defaultFade){
      
      if(topf2){
        f2 = clamp((vPos.x - bbMin.x) / (bbMax.x - bbMin.x), 0., 1.);
      } else {
        f2 = clamp(vUv.x, 0., 1.);
      }
    
      col = mix(color3, col, f2);
      //f2 is default
    }
} else {
  if(defaultFade){
      
      if(topf2){
        f2 = clamp((vPos.y - bbMin.y) / (bbMax.y - bbMin.y), 0., 1.);
      } else {
        f2 = clamp(vUv.y, 0., 1.);
      }
    
      col = mix(color3, col, f2);
      //f2 is default
    }
}

     
      
      
      

      vec2 newUv = clamp((vPos.xy - bbMin.xy) / (bbMax.xy - bbMin.xy), 0., 1.) * (bbMax.x/bbMax.y);

      if(bbMax.x > bbMax.y){
        newUv = clamp((vPos.xy - bbMin.xy) / (bbMax.xy - bbMin.xy), 0., 1.) * (bbMax.y/bbMax.x);
      }
       
       
      
    vec2 uv2 = newUv;

                 
      
          
          
          
          //BEGIN DOTS 
          

              
               
                   vec2 uv = newUv;
              
              
  
  vec2 st = uv; 
  st *= effectScale; //NUMBER OF DOTS AND SCALE // the lower the bigger
  vec2 F = cellular2x2x2(vec3(st, 20.0));
  float n = smoothstep(0.5, 0.29, F.x);
  
  vec2 st2 = uv; 
  st2 *= effect2Scale; //NUMBER OF DOTS AND SCALE
  vec2 F2 = cellular2x2x2(vec3(st2,5.0));
  float n2 = smoothstep(0.1, 0.3, F2.x);
  //vec3 dotColor = vec3(n, n, n);
              
              
              
              
        
        //END DOTS
          
      
      

      
      
      
      
      
      //vec4 diffuseColor = vec4( col, opacity ); //NOT DOTS
      
      //vec4 preDiffuseColor = vec4( color, 1 );
      //vec4 diffuseColor = vec4( color, 1 ); //DOTS
      
     // vec3 prePreDiffuseColor = mix(color, colorSmall, f2);
      //vec3 preDiffuseColor = mix( prePreDiffuseColor, col, f2); //dots are on the inside
      //vec3 preDiffuseColor = mix( color, col, f2); //dots are on the inside
      
      
    
      vec4 diffuseColor = vec4( col, opacity );
     
     //begin noise
      vec3 noiseColor = col;
      if(noise){
 float iTimeNew = 2.9;
    // Normalized pixel coordinates (from 0 to 1)
    //vec2 uv = fragCoord/iResolution.xy;
    //uv -= 0.5;
    //uv.x *= iResolution.x / iResolution.y;

    // Time varying pixel color
    vec3 noiseColorReal = vec3(0., 0., 0.);
    
    uv *= uv * (100. + (cos(iTimeNew*.1) * sin(iTimeNew*.2) * 100.))*0.2;
    uv.x = abs(uv.x);
    
    //uv.x = fract(uv.x);
    uv = rotate(uv, sin(iTimeNew*0.01)*180.);
    
    float choice = random(uv)*5.;
    vec2 dotProdChoice = vec2(0.);
    
    if (choice < (sin(iTimeNew)*3.)+3.)
        dotProdChoice = uv.yy;
    else
        dotProdChoice = uv.yx;
    
    
    uv.y = dot(dotProdChoice, uv.xy) * random(uv);
    
    
    float x = uv.x*.1;
    float m = ((x+-1. * .2) * (x-cos(iTimeNew))*20. ) / sin(iTimeNew);
    m += m * 0.1;
    float y = uv.y + sin(m)*cos(m)*2.;
      
    y = pow(y, random(uv)*2.)*0.1 ;
    noiseColorReal += Circle(vec2(x,y) * 0.2 , ((.5 + sin(iTimeNew*.01))*0.3), 0.7);
    
    // Output to screen
    noiseColor = noiseColorReal;  
    col = mix(col, vec3(0.0,0.0,0.0), noiseColorReal);
      }
      
     //end noise 
      
      
      vec3 concentricColor = vec3(0.0);
      if(concentric){
     // 	vec2 uv = fragCoord.xy / iResolution.xy;
    // origin
    //if (UV_CENTERIZE) {
        float uvSize = 1.2;
        uv = -uvSize + 2. * uvSize * uv;
       // uv.x *= iResolution.x / iResolution.y;
    //}
    
    vec2 p = plr(uv);
    vec4 O = vec4(0.);
    
    vec3 c_red = vec3(1., 1., 1.);
    
    float st1 = 0.05;
    
    float dt1 = mod(1.0 * .1, st1);
    float sdt1 = (dt1 < 0.05 ? dt1 : .1 - dt1) ;

    for (float i = -1.; i < 2.; i += 1.)
      O.rgb += c_red * g_circle_line(uv, vec2(0.), snap(p.x, st1) + st1*i + dt1);
    
    //O.rgb = max(O.rgb, c_red * g_circle_fill(uv, vec2(0.), .01 + sdt1));
    
  //fragColor = O;
  concentricColor = O.rgb;
  col = mix(col, vec3(0.0), concentricColor);
      }


      vec3 stripeColor = vec3(1.0);
      if(stripes){

        //BEGIN RADIAL STRIPES
 

        float angle = atan(newUv.y - 0.5,newUv.x - 0.5);
  //float intensity = pow(sin(angle*amount) * 0.5 + 0.5, 2.0);
  float stripeSize = 1.5; //the lower the larger
  float intensity = pow(sin(angle*3.0) * 0.5 + stripeSize, 2.0);
  vec3 isy = vec3(intensity);

  //vec3 stripe = mix(color1, color2, intensity);
  //gl_FragColor = vec4(col, 1.0);
   stripeColor = mix(vec3(0.0), vec3(1.0), intensity);   
 
   vec3 stripeMask = mix(vec3(0.0), vec3(1.0), stripeColor);
   col = mix(col, color3, stripeColor);


      }
      
      
      if(dots){
      vec3 preDiffuseColor = mix( col, vec3(0.0,0.0,0.0), n);
      vec3 preDiffuseColor2 = mix( vec3(0.0,0.0,0.0), preDiffuseColor, n2);
      
      
        if(effectColor) {
         // if(true){

          if(effectColorReverse == 1.0){
            preDiffuseColor = mix( col, color1, n); //dots are on the OUTSIDE
         preDiffuseColor2 = mix( color1, preDiffuseColor, n2);

          } else if (effectColorReverse == 2.0){
            preDiffuseColor = mix( col, color2, n); //dots are on the OUTSIDE
         preDiffuseColor2 = mix( color2, preDiffuseColor, n2);
            
          } else if (effectColorReverse == 3.0){
            preDiffuseColor = mix( col, color3, n); //dots are on the OUTSIDE
         preDiffuseColor2 = mix( color3, preDiffuseColor, n2);

          }
         
        
        } else {
        
       //preDiffuseColor = mix( col, color3, n); //dots are on the OUTSIDE
       //preDiffuseColor2 = mix( color3, preDiffuseColor, n2);
          
        }
        
      vec3 DiffuseColorReal = mix(preDiffuseColor, preDiffuseColor2, f2);
      diffuseColor = vec4(preDiffuseColor2, opacity );
        
        } else {
      diffuseColor = vec4( col, opacity );
        
        }
      `);



  let colorStates = ["1", "2", "3"]

  return new THREE.ShaderMaterial({
    color:0xffffff,
    side: THREE.DoubleSide,
      // roughness: 1,
      // metalness: 0,

uniforms:{
        spherical: {value: true},
        bbMin:params.bbMin,
        bbMax:params.bbMax,
        color1:params.color1,
        color2:params.color2,
        color3:params.color3,
        // color3:{value: new THREE.Color("rgb(255,255,255")},
        color4:params.color4,
        vertOffset:params.vertOffset,
        centerSize:params.centerSize,
        centerSize2:params.centerSize2,
        f3Offset:params.f3Offset,
        topf2:params.topf2, // conditional
        vertCenterGradient:params.vertCenterGradient, // conditional
        lowlights:params.lowlights, //conditional
        subtleFade:params.subtleFade, //conditional
        defaultFade:params.defaultFade, // conditional
        M_PI:Math.PI,
        // effectColor:{value: fxrand() < 0.5 ? true : false}, //conditional
        effectColor:{value: true}, //conditional
        effectColorReverse:{value: colorStates[Math.floor(fxrand()*colorStates.length)]},
        dots:{value: fxrand() < 0.5 ? true : false}, //conditional
        // dots:{value: fxrand() < 0.5 ? true : true}, 
        effectScale:{value: (fxrand()*5)+5},
                                              //20
        effec2Scale:{value: (fxrand()*5)+5},
        noise:{value: false},
        concentric:{value: false},
        stripes:{value: fxrand() < 0 ? false : false}
},

vertexShader: vertexShader,
fragmentShader: fragmentShader

  }
          
        );

  }

console.log("GEO", geometry)

}