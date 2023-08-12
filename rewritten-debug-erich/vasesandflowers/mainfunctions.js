import * as THREE from 'three';
import * as ONE from 'one';
import * as Fit from './binPacking/src/index.js'
import { MeshBVH } from 'three-mesh-bvh';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PhysicalPathTracingMaterial, DenoiseMaterial, PathTracingRenderer, MaterialReducer, BlurredEnvMapGenerator, PathTracingSceneGenerator, mergeMeshes, PhysicalCamera } from 'three-gpu-pathtracer';
import { PathTracingSceneWorker } from './three-gpu-pathtracer/src/workers/PathTracingSceneWorker.js';
import { Line2 } from './structure/line2.js';
import { LineMaterial } from './structure/LineMaterial.js';
import { LineGeometry } from './structure/LineGeometry.js';
import Color from "./deps/color.js"
import * as GeometryUtils from './structure/GeometryUtils.js';
import {ConvexGeometry} from "./three.js-r148/examples/jsm/geometries/ConvexGeometry.js"
import {ConvexHull} from './three.js-r148/examples/jsm/math/ConvexHull.js'
import * as BufferGeometryUtils from "./three.js-r148/examples/jsm/utils/BufferGeometryUtils.js"
import CSG from "./three-csg.js"
import { VertexNormalsHelper } from 'three/addons/helpers/VertexNormalsHelper.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { FullScreenQuad } from 'three/addons/postprocessing/Pass.js';

window.PhysicalPathTracingMaterial = PhysicalPathTracingMaterial
window.DenoiseMaterial = DenoiseMaterial
window.PathTracingRenderer = PathTracingRenderer
window.MaterialReducer = MaterialReducer
window.BlurredEnvMapGenerator = BlurredEnvMapGenerator
window.PathTracingSceneGenerator = PathTracingSceneGenerator
window.mergeMeshes = mergeMeshes
window.PhysicalCamera = PhysicalCamera
window.OrbitControls = OrbitControls
window.FullScreenQuad = FullScreenQuad

// Fit = Fit
window.Fit = Fit

window.ConvexGeometry = ConvexGeometry
window.ConvexHull = ConvexHull
window.Color = Color

let cameraTarget = new THREE.Vector3(0, 0, 10)


function init(){





    // let coreNumber = navigator.hardwareConcurrency-1
    let coreNumber = Math.ceil(navigator.hardwareConcurrency/1.8)-1
    window.workers = []
    window.vaseWorkers = []
    window.dotworkers = []
    window.dotworkersflowers = []
    window.dotworkernumber = 0

    for (var i=0; i<coreNumber; i++){
      window.workers.push(new Worker('flowerworker-new-almost.js'))
      window.vaseWorkers.push(new Worker('vaseworker.js'))
      
    }


    for (var i=0; i<(totalUniqueFlowers); i++){
      window.dotworkers.push(new Worker('dotworkernew-dots.js', {type: "module"}))
    }

    for (var i=0; i<(totalUniqueFlowers); i++){
      window.dotworkersflowers.push(new Worker('dotworkernew-flower.js', {type: "module"}))
    }

window.finishedDots = []

window.finishedDotFlowers = []


// generateSpireAndHull()

function ondotflowermessage(e, precomposed=false){



// if(precomposed){

// } else {
//   window.flowersArray[e.data[0].flowerIndex].adedDots = true
// }


if(precomposed){


window.finishedDotFlowers.push([])

console.log("PRECOMPOSED", e)

// window.finishedDotFlowers.push([])

} else {



console.log("WORKER FINISHED", e.data[0])

window.finishedDotFlowers.push([])


if(e.data[0].flowerNum == 2){


let parsedGeom = new THREE.BufferGeometry();


let normals = e.data[0].dot1Flower.normal
let positions = e.data[0].dot1Flower.positions
let uvs = e.data[0].dot1Flower.uv
let indices = e.data[0].dot1Flower.index
let matrix = e.data[0].dot1Flower.matrix
let matrixWorld = e.data[0].dot1Flower.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom)
parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
parsedGeom.attributes.normal.needsUpdate = true
// console.log(parsedGeom)

let positionsFloat = new Float32Array(positions)
parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
parsedGeom.attributes.position.needsUpdate = true

// parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom.attributes.color.needsUpdate = true

// parsedGeom.attributes.color = []
// parsedGeom.attributes.color.needsUpdate = true


parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
parsedGeom.attributes.uv.needsUpdate = true
parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
parsedGeom.index.needsUpdate = true
parsedGeom.needsUpdate = true;

let matrixA = new THREE.Matrix4()
matrixA.set(matrix)

let matrixW = new THREE.Matrix4()
matrixW.set(matrixWorld)

parsedGeom.matrix = matrixA
parsedGeom.matrixWorld = matrixW

// parsedGeom.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom)



  parsedGeom.computeBoundingBox()

  let mesh = new THREE.Mesh(parsedGeom, window.flowersArray[e.data[0].flowerIndex].addedMaterials[0])




//mesh has two children, the dot child and the flower child











let parsedGeom2 = new THREE.BufferGeometry();


let normals2 = e.data[0].dot2Flower.normal
let positions2 = e.data[0].dot2Flower.positions
let uvs2 = e.data[0].dot2Flower.uv
let indices2 = e.data[0].dot2Flower.index
let matrix2 = e.data[0].dot2Flower.matrix
let matrixWorld2 = e.data[0].dot2Flower.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom2)
parsedGeom2.attributes.normal= new THREE.BufferAttribute( normals2, 3 )
parsedGeom2.attributes.normal.needsUpdate = true
// console.log(parsedGeom2)

let positionsFloat2 = new Float32Array(positions2)
parsedGeom2.attributes.position= new THREE.BufferAttribute( positionsFloat2, 3 )
parsedGeom2.attributes.position.needsUpdate = true

// parsedGeom2.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom2.attributes.color.needsUpdate = true

// parsedGeom2.attributes.color = []
// parsedGeom2.attributes.color.needsUpdate = true


parsedGeom2.attributes.uv= new THREE.BufferAttribute( uvs2, 2 )
parsedGeom2.attributes.uv.needsUpdate = true
parsedGeom2.index = new THREE.BufferAttribute( indices2, 1 )
parsedGeom2.index.needsUpdate = true
parsedGeom2.needsUpdate = true;

let matrixA2 = new THREE.Matrix4()
matrixA2.set(matrix2)

let matrixW2 = new THREE.Matrix4()
matrixW.set(matrixWorld2)

parsedGeom2.matrix = matrixA2
parsedGeom2.matrixWorld = matrixW2

// parsedGeom2.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom2)



  parsedGeom2.computeBoundingBox()

  let mesh2 = new THREE.Mesh(parsedGeom2, window.flowersArray[e.data[0].flowerIndex].addedMaterials[1])

  mesh2.position.set(e.data[0].dot2Flower.position.x, e.data[0].dot2Flower.position.y, e.data[0].dot2Flower.position.z )
  mesh.position.set(e.data[0].dot1Flower.position.x, e.data[0].dot1Flower.position.y, e.data[0].dot1Flower.position.z )

  console.log("MESHDATA", "FLOWER", e.data[0].flowerIndex, mesh)

  if(trueReduction){
    window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh)
    window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh2)
  } else {
    window.flowersArray[e.data[0].flowerIndex].object.add(mesh)
    window.flowersArray[e.data[0].flowerIndex].object.add(mesh2)
  }



window.flowersArray[e.data[0].flowerIndex].adedDots = true

} else if(e.data[0].flowerNum == 1){



let parsedGeom = new THREE.BufferGeometry();


let normals = e.data[0].dot1Flower.normal
let positions = e.data[0].dot1Flower.positions
let uvs = e.data[0].dot1Flower.uv
let indices = e.data[0].dot1Flower.index
let matrix = e.data[0].dot1Flower.matrix
let matrixWorld = e.data[0].dot1Flower.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom)
parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
parsedGeom.attributes.normal.needsUpdate = true
// console.log(parsedGeom)

let positionsFloat = new Float32Array(positions)
parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
parsedGeom.attributes.position.needsUpdate = true

// parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom.attributes.color.needsUpdate = true

// parsedGeom.attributes.color = []
// parsedGeom.attributes.color.needsUpdate = true


parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
parsedGeom.attributes.uv.needsUpdate = true
parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
parsedGeom.index.needsUpdate = true
parsedGeom.needsUpdate = true;

let matrixA = new THREE.Matrix4()
matrixA.set(matrix)

let matrixW = new THREE.Matrix4()
matrixW.set(matrixWorld)

parsedGeom.matrix = matrixA
parsedGeom.matrixWorld = matrixW

// parsedGeom.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom)



  parsedGeom.computeBoundingBox()

  let mesh = new THREE.Mesh(parsedGeom, window.flowersArray[e.data[0].flowerIndex].addedMaterials[0])

  // mesh2.position.set(e.data[0].dot2Flower.position.x, e.data[0].dot2Flower.position.y, e.data[0].dot2Flower.position.z )
  mesh.position.set(e.data[0].dot1Flower.position.x, e.data[0].dot1Flower.position.y, e.data[0].dot1Flower.position.z )


  if(trueReduction){
    window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh)
  } else {
    window.flowersArray[e.data[0].flowerIndex].object.add(mesh)
  }




window.flowersArray[e.data[0].flowerIndex].adedDots = true
}



}



// window.flowersArray[e.data[0].flowerIndex].adedDots = true


if(precomposed){
window.flowersArray[e.index].generatedFlowers = true

if(window.flowersArray[e.index].generatedDots && window.flowersArray[e.index].generatedFlowers){
window.flowersArray[e.index].generateSpireAndHull()
}
} else {
// window.flowersArray[e.data[0].flowerIndex].generatedFlowers = true
window.flowersArray[e.data[0].flowerIndex].generatedFlowers = true

if(window.flowersArray[e.data[0].flowerIndex].generatedDots && window.flowersArray[e.data[0].flowerIndex].generatedFlowers){
window.flowersArray[e.data[0].flowerIndex].generateSpireAndHull()
sendFlower(window.sendFlowerIndex)
}
}






if(window.finishedDots.length == window.totalDotNumber && window.finishedDotFlowers.length == window.totalDotNumber){
console.log("SORTANDBUILD")
sortAndBuildFlowers()
}



//store these flowers, then when the number is equal, put the meshes together?








// if(false){
// // if(window.finishedDots.length == window.totalDotNumber){

// function compareNumbers(a, b) {
// return a - b;
// }

// //ALL FLOWERS HAVE BEEN CREATED! 

// window.finishedDots = window.finishedDots.sort((a, b) => {
// if (a.index < b.index) {
// return -1;
// }
// });

// console.log(window.finishedDots)

// for(var i=0; i<window.finishedDots.length; i++){
// window.flowersArray[ window.finishedDots[i].index ].onDotWorkerMessage(window.finishedDots[i].event)
// }


// } else {
// canvasworker1.postMessage({ update: "update", message: "Placing dots: "+ Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100) + "%"})
// console.log("OPTIMIZED", (window.finishedDots.length) / window.totalDotNumber)
// // console.log("OPTIMIZED", "CHECKING WORKER MESSAGES")

// }



}




function ondotmessage(e, nodots=false){

if(nodots){

for(var i=0; i<e.meshes.length; i++){

  if(trueReduction){
    window.flowersArray[ e.index ].lowResObject.add(e.meshes[i])
  } else {
    window.flowersArray[ e.index ].object.add(e.meshes[i])
  }


}



console.log("WORKER FINISHED", "NODOTS", e)
window.finishedDots.push([])



} else {


if(e.data[0].noDots){


console.log("NO DOTS FROM THIS FLOWER!")
window.flowersArray[e.data[0].flowerIndex].adedDots = true
window.flowersArray[e.data[0].flowerIndex].generatedDots = true
window.finishedDots.push([])

window.finishedFlowersPercent = Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100)
canvasworker1.postMessage({ update: "update", message: "Placing dots: "+ Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100) + "%", percent:Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100), type:"placedot"})
console.log("PERCENTFINISHED", (window.finishedDots.length) / window.totalDotNumber)
// console.log("OPTIMIZED", "CHECKING WORKER MESSAGES")






if(window.flowersArray[e.data[0].flowerIndex].generatedDots && window.flowersArray[e.data[0].flowerIndex].generatedFlowers){
window.flowersArray[e.data[0].flowerIndex].generateSpireAndHull()
sendFlower(window.sendFlowerIndex)
}






if(window.finishedDots.length == window.totalDotNumber && window.finishedDotFlowers.length == window.totalDotNumber){
console.log("SORTANDBUILD")
sortAndBuildFlowers()
}


} else {



console.log("WORKER FINISHED", e.data[0])

window.finishedDots.push([])


if(e.data[2]){

// window.finishedDots.push({event: e, index:e.data[2]})
// console.log("FINISHED FLOWERS", window.finishedFlowers)


} 


if(e.data[0].flowerNum == 2){


let parsedGeom = new THREE.BufferGeometry();


let normals = e.data[0].dot1Dots.normal
let positions = e.data[0].dot1Dots.positions
let uvs = e.data[0].dot1Dots.uv
let indices = e.data[0].dot1Dots.index
let matrix = e.data[0].dot1Dots.matrix
let matrixWorld = e.data[0].dot1Dots.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom)
parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
parsedGeom.attributes.normal.needsUpdate = true
// console.log(parsedGeom)

let positionsFloat = new Float32Array(positions)
parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
parsedGeom.attributes.position.needsUpdate = true

// parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom.attributes.color.needsUpdate = true

// parsedGeom.attributes.color = []
// parsedGeom.attributes.color.needsUpdate = true


parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
parsedGeom.attributes.uv.needsUpdate = true
parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
parsedGeom.index.needsUpdate = true
parsedGeom.needsUpdate = true;

let matrixA = new THREE.Matrix4()
matrixA.set(matrix)

let matrixW = new THREE.Matrix4()
matrixW.set(matrixWorld)

parsedGeom.matrix = matrixA
parsedGeom.matrixWorld = matrixW

// parsedGeom.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom)



  parsedGeom.computeBoundingBox()

  let mesh = new THREE.Mesh(parsedGeom, window.flowersArray[e.data[0].flowerIndex].dotMaterials[0])
  
  // let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"red", side:THREE.DoubleSide}))



//mesh has two children, the dot child and the flower child










let parsedGeom2 = new THREE.BufferGeometry();


let normals2 = e.data[0].dot2Dots.normal
let positions2 = e.data[0].dot2Dots.positions
let uvs2 = e.data[0].dot2Dots.uv
let indices2 = e.data[0].dot2Dots.index
let matrix2 = e.data[0].dot2Dots.matrix
let matrixWorld2 = e.data[0].dot2Dots.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom2)
parsedGeom2.attributes.normal= new THREE.BufferAttribute( normals2, 3 )
parsedGeom2.attributes.normal.needsUpdate = true
// console.log(parsedGeom2)

let positionsFloat2 = new Float32Array(positions2)
parsedGeom2.attributes.position= new THREE.BufferAttribute( positionsFloat2, 3 )
parsedGeom2.attributes.position.needsUpdate = true

// parsedGeom2.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom2.attributes.color.needsUpdate = true

// parsedGeom2.attributes.color = []
// parsedGeom2.attributes.color.needsUpdate = true


parsedGeom2.attributes.uv= new THREE.BufferAttribute( uvs2, 2 )
parsedGeom2.attributes.uv.needsUpdate = true
parsedGeom2.index = new THREE.BufferAttribute( indices2, 1 )
parsedGeom2.index.needsUpdate = true
parsedGeom2.needsUpdate = true;

let matrixA2 = new THREE.Matrix4()
matrixA2.set(matrix2)

let matrixW2 = new THREE.Matrix4()
matrixW.set(matrixWorld2)

parsedGeom2.matrix = matrixA2
parsedGeom2.matrixWorld = matrixW2

// parsedGeom2.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom2)



  parsedGeom2.computeBoundingBox()

  let mesh2 = new THREE.Mesh(parsedGeom2, window.flowersArray[e.data[0].flowerIndex].dotMaterials[1])
  // let mesh2 = new THREE.Mesh(parsedGeom2, new THREE.MeshBasicMaterial({color:"red", side:THREE.DoubleSide}))




mesh2.position.set(e.data[0].dot2Dots.position.x, e.data[0].dot2Dots.position.y, e.data[0].dot2Dots.position.z )
  mesh.position.set(e.data[0].dot1Dots.position.x, e.data[0].dot1Dots.position.y, e.data[0].dot1Dots.position.z )



console.log("MESHDATA", "DOTS", e.data[0].flowerIndex, mesh)


if(trueReduction){
  // window.flowersArray[ e.index ].lowResObject.add(e.meshes[i])
  window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh)
window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh2)
} else {
  // window.flowersArray[ e.index ].object.add(e.meshes[i])
  window.flowersArray[e.data[0].flowerIndex].object.add(mesh)
window.flowersArray[e.data[0].flowerIndex].object.add(mesh2)
}









window.flowersArray[e.data[0].flowerIndex].adedDots = true
} else if(e.data[0].flowerNum == 1){


let parsedGeom = new THREE.BufferGeometry();


let normals = e.data[0].dot1Dots.normal
let positions = e.data[0].dot1Dots.positions
let uvs = e.data[0].dot1Dots.uv
let indices = e.data[0].dot1Dots.index
let matrix = e.data[0].dot1Dots.matrix
let matrixWorld = e.data[0].dot1Dots.matrixWorld
// let color = e.data[0].color[0]

// console.log(parsedGeom)
parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
parsedGeom.attributes.normal.needsUpdate = true
// console.log(parsedGeom)

let positionsFloat = new Float32Array(positions)
parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
parsedGeom.attributes.position.needsUpdate = true

// parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
// parsedGeom.attributes.color.needsUpdate = true

// parsedGeom.attributes.color = []
// parsedGeom.attributes.color.needsUpdate = true


parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
parsedGeom.attributes.uv.needsUpdate = true
parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
parsedGeom.index.needsUpdate = true
parsedGeom.needsUpdate = true;

let matrixA = new THREE.Matrix4()
matrixA.set(matrix)

let matrixW = new THREE.Matrix4()
matrixW.set(matrixWorld)

parsedGeom.matrix = matrixA
parsedGeom.matrixWorld = matrixW

// parsedGeom.applyMatrix4(matrix)

  // console.log("PARSED", e.data[0])
  // console.log("PARSED", parsedGeom)



  parsedGeom.computeBoundingBox()

  let mesh = new THREE.Mesh(parsedGeom, window.flowersArray[e.data[0].flowerIndex].dotMaterials[0])
  // let mesh = new THREE.Mesh(parsedGeom, new THREE.MeshBasicMaterial({color:"red", side:THREE.DoubleSide}))
  mesh.position.set(e.data[0].dot1Dots.position.x, e.data[0].dot1Dots.position.y, e.data[0].dot1Dots.position.z )



if(trueReduction){
  window.flowersArray[e.data[0].flowerIndex].lowResObject.add(mesh)
} else {
  window.flowersArray[e.data[0].flowerIndex].object.add(mesh)
}


window.flowersArray[e.data[0].flowerIndex].adedDots = true
}



}





if(false){



} else {
window.finishedFlowersPercent = Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100)
canvasworker1.postMessage({ update: "update", message: "Placing dots: "+ Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100) + "%", percent:Math.floor(((window.finishedDots.length) / window.totalDotNumber)*100), type:"placedot"})
console.log("PERCENTFINISHED", (window.finishedDots.length) / window.totalDotNumber)
// console.log("OPTIMIZED", "CHECKING WORKER MESSAGES")

}


if(nodots){
window.flowersArray[e.index].generatedDots = true

if(window.flowersArray[e.index].generatedDots && window.flowersArray[e.index].generatedFlowers){
window.flowersArray[e.index].generateSpireAndHull()
}
} else {

if( window.flowersArray[e.data[0].flowerIndex] === undefined){
console.log("SAVEERR", "UNDEFINED", window.flowersArray[e.data[0].flowerIndex])
} else {
console.log("SAVEERR", "DEFINED", window.flowersArray[e.data[0].flowerIndex])
window.flowersArray[e.data[0].flowerIndex].generatedDots = true



if(window.flowersArray[e.data[0].flowerIndex].generatedDots && window.flowersArray[e.data[0].flowerIndex].generatedFlowers){
window.flowersArray[e.data[0].flowerIndex].generateSpireAndHull()
sendFlower(window.sendFlowerIndex)
}
}

}





if(window.finishedDots.length == window.totalDotNumber && window.finishedDotFlowers.length == window.totalDotNumber){
console.log("SORTANDBUILD")
sortAndBuildFlowers()
}

}

}




function sortAndBuildFlowers(){

console.log("FXRAND", "SORTANDBUILD", fxrand())

// if(window.finishedDots.length == window.totalDotNumber){

//   function compareNumbers(a, b) {
// return a - b;
// }

//ALL FLOWERS HAVE BEEN CREATED! 

// if(false){



// window.flowersArray = window.flowersArray.sort((a, b) => {
// if (a.index < b.index) {
// return -1;
// }
// });





console.log("FINISHEDDOTS", window.finishedDots)

for(var i=1; i<window.flowersArray.length+1; i++){

console.log("FINISHEDFLOWERS", window.flowersArray[i])


if(window.flowersArray[ i ] === undefined){
console.log("SAVEERR", "undefined",  window.flowersArray[ i ])
} else {
console.log("SAVEERR", "defined!",  window.flowersArray[ i ])
window.flowersArray[ i ].onDotWorkerMessage()
}






}

// } else {

// console.log("SORTANDBUILDFLOWERS")


for (var i=0; i<window.dotworkers.length; i++){
if( window.dotworkers[i]){
window.dotworkers[i].terminate()
delete window.dotworkers[i]
}


// ondotmessage(e)

// }
}


for (var i=0; i<window.dotworkersflowers.length; i++){
  if( window.dotworkersflowers[i]){
    window.dotworkersflowers[i].terminate()
      delete window.dotworkersflowers[i]
  }
 

// ondotflowermessage(e)

// }
}

// delete window.vaseWorkers[i]

// }

}



let onDotWorkerMessage = function(e) {

ondotmessage(e)
 window.dotworkers[e.data[0].workerNum].terminate()
//  window.dotworkers[e.data[0].workerNum] = new Worker('dotworkernew-dots.js', {type: "module"})
//  window.dotworkers[e.data[0].workerNum].onmessage = onDotWorkerMessage

  
    }


    for (var i=0; i<window.dotworkers.length; i++){
  // window.dotworkers[i].onmessage = onDotWorkerMessage
  window.dotworkers[i].onmessage = function (e) {
    ondotmessage(e)

    if (typeof  window.dotworkers[e.data[0].workerNum] === 'undefined') {
// Your variable is undefined
console.log("TERM", 'AVOIDED ERROR')
} else {
console.log("TERM", 'SUCCESSFULLY TERMINATED')
window.dotworkers[e.data[0].workerNum].terminate()
}

//  window.dotworkers[e.data[0].workerNum].terminate()
  }
}


let onFlowerWorkerMessage = function(e) {

ondotflowermessage(e)
window.dotworkersflowers[e.data[0].workerNum].terminate()
// window.dotworkersflowers[e.data[0].workerNum] = new Worker('dotworkernew-flower.js', {type: "module"})
// window.dotworkersflowers[e.data[0].workerNum].onmessage = onFlowerWorkerMessage

  
    }


for (var i=0; i<window.dotworkersflowers.length; i++){
  // window.dotworkersflowers[i].onmessage = onFlowerWorkerMessage
  window.dotworkersflowers[i].onmessage =function (e) {
    ondotflowermessage(e)
if(e.data[0].workerNum < window.dotworkersflowers.length-1){
console.log("NTTM", "TERMINATED", window.dotworkersflowers.length, e.data[0].workerNum)
// if(e.data[0].workerNum <= window.dotworkersflowers.length-1){
console.log("TERM", e.data[0].workerNum, window.dotworkersflowers.length-1)
console.log( "TERM",window.dotworkersflowers[e.data[0].workerNum])

if (typeof window.dotworkersflowers[e.data[0].workerNum] === 'undefined') {
// Your variable is undefined
console.log("TERM", 'AVOIDED ERROR')
} else {
console.log("TERM", 'SUCCESSFULLY TERMINATED')
window.dotworkersflowers[e.data[0].workerNum].terminate()
}


// }


} else {
console.log("NTTM", "NOT TERMINATED", window.dotworkersflowers.length, e.data[0].workerNum)
}


  }
}

    // window.myWorker = new Worker('flowerworker.js');
    // window.myWorker2 = new Worker('flowerworker.js');

    window.BufferGeometryUtils = BufferGeometryUtils

    window.flowerWorkerNumber = 0;

    
    window.planePresent = false;
    window.flowerNumber = 1;
    

    function no_collisions(test_mesh, collidableMeshList) {

      let midpoint = {x:0, y:0, z:0}
let x = []
let y = []
let z = []


if (collidableMeshList.length < 1) return 1;
// console.log(test_mesh)



if(test_mesh.geometry.attributes){

  for (var vertexIndex = 0; vertexIndex < test_mesh.geometry.attributes.position.array.length; vertexIndex+=3){
    x.push(test_mesh.geometry.attributes.position.array[vertexIndex])
    y.push(test_mesh.geometry.attributes.position.array[vertexIndex+1])
    z.push(test_mesh.geometry.attributes.position.array[vertexIndex+2])
  }

  let resultx = x.reduce((a, b) => {
  return a + b;
});

let resulty = y.reduce((a, b) => {
  return a + b;
});

let resultz = z.reduce((a, b) => {
  return a + b;
});

midpoint.x = resultx
midpoint.y = resulty
midpoint.z = resultz
}

if(test_mesh.geometry.attributes){


  for (var vertexIndex = 0; vertexIndex < test_mesh.geometry.attributes.position.array.length; vertexIndex++)
{       
  var localVertex = new THREE.Vector3().fromBufferAttribute(test_mesh.geometry.attributes.position, vertexIndex).clone();
  var globalVertex = localVertex.applyMatrix4(test_mesh.matrix);


  
  var directionVector = globalVertex.sub( test_mesh.position );
  // var directionVector = globalVertex.sub(midpoint)

  var ray = new THREE.Raycaster( test_mesh.position, directionVector.clone().normalize() );
  // var ray = new THREE.Raycaster( midpoint, directionVector.clone().normalize() );
  // var ray = new THREE.Raycaster( test_mesh.position, midpoint ); //they all intersect
  var collisionResults = ray.intersectObjects( collidableMeshList );
  if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
  {

    return 0
    
  }
}
return 1;
} else if (test_mesh.geometry.vertices){
  for (var vertexIndex = 0; vertexIndex < test_mesh.geometry.vertices.length; vertexIndex++)
{       
  var localVertex = new THREE.Vector3(test_mesh.geometry.vertices[vertexIndex].x, test_mesh.geometry.vertices[vertexIndex].y, test_mesh.geometry.vertices[vertexIndex].z)
  var globalVertex = localVertex.applyMatrix4(test_mesh.matrix);
  var directionVector = globalVertex.sub( test_mesh.position );
  // var directionVector = globalVertex.sub(midpoint)

  var ray = new THREE.Raycaster( test_mesh.position, directionVector.clone().normalize() );
  // var ray = new THREE.Raycaster( midpoint, directionVector.clone().normalize() );
  // var ray = new THREE.Raycaster( test_mesh.position, midpoint ); //they all intersect
  var collisionResults = ray.intersectObjects( collidableMeshList );
  if ( collisionResults.length > 0 && collisionResults[0].distance < directionVector.length() ) 
  {

    return 0;

  }

}

return 1;
}
}



          
    
        // dat.gui controls --------------------------------------------------------
    var z0 = 5.7;


    // var dgcontrols = new function() {
    //   this.rotationSpeed = 0.00;
    //   this.cameraz = z0;
    // }
    // var gui = new dat.GUI({
    //   autoplace: false,
    //   width: 300
    // });
    // gui.add(dgcontrols, 'cameraz').min(2).max(10).step(0.1)
    //   .name("Camera position");
    // gui.add(dgcontrols, 'rotationSpeed').min(0).max(0.005)
    //   .name("Rotation speed");
    


      var pi = Math.PI;
    var scale = 0.005; //real scale?

  //  window.defaultUSteps = 200;
  //  window.defaultVSteps = 200;
  //   window.uSteps = 200
  //   window.vSteps = 200
  //   window.petalRez = 100;


  // window.defaultUSteps = 100;
  //  window.defaultVSteps = 100;
  //   window.uSteps = 50
  //   window.vSteps = 50
  //   window.petalRez = 20;

  window.defaultUSteps = 40;
   window.defaultVSteps = 40;
    window.uSteps = 50
    window.vSteps = 50
    window.petalRez = 20;



    // twenty points on the unit sphere ----------------------------------------
    var phi = (1 + Math.sqrt(5)) / 2;
    var a = 1 / Math.sqrt(3);
    var b = a / phi;
    var c = a * phi;

    
    // var points =[[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0]];
  
  // console.log(points[0])

    // translate and reorient --------------------------------------------------



    
    
    


    
    
    
    
        
function lookAwayFrom(me, target) {
    var v = new THREE.Vector3();
    v.subVectors(me.position, target).add(me.position);
    me.lookAt(v);
}
    
                           


    
   
    // three.js scene ----------------------------------------------------------
    scene = new THREE.Scene();
    

    // let camera




function sendFlower(index){

window.activeFlowers--

if(index < window.flowersArray.length-1){
switch(true){

case window.finishedFlowersPercent < 38 && window.activeFlowers<6:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 42 && window.activeFlowers<4:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 50 && window.activeFlowers<4:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;


case window.finishedFlowersPercent < 70 && window.activeFlowers<4:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 78 && window.activeFlowers<3:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 85 && window.activeFlowers<3:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 90 && window.activeFlowers<3:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;

case window.finishedFlowersPercent < 100 && window.activeFlowers<3:
window.flowersArray[ window.finishedFlowers[index].index ].onWorkerMessage(window.finishedFlowers[index].event)
window.sendFlowerIndex++
window.activeFlowers++
break;


}


}

}

window.activeFlowers = 7

function sendFlowers(){
         //  set your counter to 1

//DELAYED ONWORKERMESSAGE



function myLoop() {         //  create a loop function
setTimeout(function() {   //  call a 3s setTimeout when the loop is called
console.log('DELAYED');   //  your code here

sendFlower(window.sendFlowerIndex)

                    //  increment the counter
if (window.sendFlowerIndex < window.activeFlowers) {           //  if the counter < 10, call the loop function
  myLoop();             //  ..  again which will trigger another 
}                       //  ..  setTimeout()
}, 10)
}

myLoop();                   //  start the loop
}


for (var i=0; i<window.workers.length; i++){
  window.workers[i].onmessage = function(e) {


   if(e.data[2]){

    window.finishedFlowers.push({event: e, index:e.data[2]})
    console.log("FINISHED FLOWERS", window.finishedFlowers)

    if(window.finishedFlowers.length == totalUniqueFlowers){

        function compareNumbers(a, b) {
return a - b;
}

//ALL FLOWERS HAVE BEEN CREATED! 

window.finishedFlowers = window.finishedFlowers.sort((a, b) => {
if (a.index < b.index) {
return -1;
}
});

console.log(window.finishedFlowers)
// for(var i=0; i<window.finishedFlowers.length; i++){
// if(window.flowersArray[ window.finishedFlowers[i].index ].generateDotsval){
//     window.totalDotNumber++
//   }
// }



sendFlowers()


// for(var i=0; i<window.finishedFlowers.length; i++){
//     window.flowersArray[ window.finishedFlowers[i].index ].onWorkerMessage(window.finishedFlowers[i].event)
// }






//DISPOSE OF WORKERS

for (var i=0; i<window.workers.length; i++){
if(window.workers[i]){
window.workers[i].terminate()
}
  

  delete window.workers[i]
}


    } else {

      canvasworker1.postMessage({ update: "update", message: "Building flowers: "+ Math.floor(((window.finishedFlowers.length) / totalUniqueFlowers)*100) + "%", percent: Math.floor(((window.finishedFlowers.length) / totalUniqueFlowers)*100), type:"buildingFlowers"})

      console.log("PERCENTFINISHED", (window.finishedFlowers.length) / totalUniqueFlowers)
      // console.log("OPTIMIZED", "CHECKING WORKER MESSAGES")

    }
   } 

}
}





















// let hdrEquirect






  // window.guiControls = guiControls



  //////// GET DATA TEXTURE!! IS DELAYED THOUGH :0 SOMETIMES RENDER DOESNT TRIGGER PROPERLY



// hdrEquirect = new RGBELoader()
//   .load( './royal_esplanade_1k.hdr', function () {

    // hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

    // window.mapping = hdrEquirect

    // scene.background = window.mapping

// scene.environment = window.mapping




  // })


  //////// GET DATA TEXTURE!! IS DELAYED THOUGH :0 SOMETIMES RENDER DOESNT TRIGGER PROPERLY






// let StartColorNumber = 10












let flowerLen = 1 + totalUniqueFlowers  
window.flowerLen = flowerLen
window.workerMessageCount = 0;
window.flowerGeoms = []





if(holdFlowers){

} else {





  canvasworker1.postMessage({ update: "update", message: "Press F to debug, K for keybinds"})

setTimeout(() => {

console.log("Delayed for 2 seconds. If you wanted to set reduction to 0, you need to reload. Your time has passed.");

if(debug){


} else {
  debugDelayPassed = true
  GenerateFlowers()
}






}, "2000"); 

}
//     let rand = (fxrand()/2)+0.3
//     let max = 0.3

//     let sphere = new THREE.Mesh(new THREE.CylinderBufferGeometry(
  
//       rand*max, //radiustop //used to be 0.04
//       rand*max,  //radiusbottom //used to be 0.04
//       1.8,  //height
//       16, //radialsegments
//       1, //heightsegments
//       true //openEnded
//       ), new THREE.MeshBasicMaterial({color:"red", side:THREE.DoubleSide}))
//       sphere.rotation.x = 90*(Math.PI/180)

//       var plane = new THREE.Mesh( new THREE.PlaneGeometry( (rand*max)*2, 1.8, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00, side:THREE.DoubleSide } ) );
// // plane.visible = true;
// plane.rotation.x = 90*(Math.PI/180)
//   scene.add( plane );

//   var plane2 = new THREE.Mesh( new THREE.PlaneGeometry( (rand*max)*2, 1.8, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00, side:THREE.DoubleSide } ) );
// // plane.visible = true;
// plane2.rotation.x = 90*(Math.PI/180)
// plane2.rotation.y = 90*(Math.PI/180)
//   scene.add( plane2 );

//   var plane3 = new THREE.Mesh( new THREE.PlaneGeometry( (rand*max)*2, 1.8, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00, side:THREE.DoubleSide } ) );
// // plane.visible = true;
// plane3.rotation.x = 90*(Math.PI/180)
// plane3.rotation.y = 45*(Math.PI/180)
//   scene.add( plane3 );

//   var plane4 = new THREE.Mesh( new THREE.PlaneGeometry( (rand*max)*2, 1.8, 1, 1 ), new THREE.MeshBasicMaterial( { color: 0xffff00, side:THREE.DoubleSide } ) );
// // plane.visible = true;
// plane4.rotation.x = 90*(Math.PI/180)
// plane4.rotation.y = 135*(Math.PI/180)
//   scene.add( plane4 );


//       scene.add(sphere)

// render()

window.convexHulls = []

window.vaseIndex = 0;

let iterations = 1


      
window.GeometryLoader = new THREE.BufferGeometryLoader();
window.startFlowerColor = 300
window.flowerIteration = 1;       
window.flowerTestNum = 70 

      //total number of flowers to run
      //let lines = 1//  set your counter to 1
    
      // generateFlower();







  
    
     function worldPos(object3d){
  object3d.updateMatrixWorld();
  var worldMatrix = object3d.matrixWorld;
  var worldPos  = new THREE.Vector3().getPositionFromMatrix(worldMatrix);
  return worldPos;
}
    
    window.requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 60);
        };
    })();



    // dragging ----------------------------------------------------------------




    // render ------------------------------------------------------------------
    
    //check if there are vases or flowers or anything else then render
    // render();

    if(totalUniqueFlowers > 0){

    } else {
      // buildSceneRender()
    //   console.log("BUILDSCENERENDER")
      checkFinished()
    }


  }


  let hdrEquirect


  // let PhysicalPathTracingMaterial =  window.PhysicalPathTracingMaterial 
  // let   DenoiseMaterial =  window.DenoiseMaterial
  // let  PathTracingRenderer =  window.PathTracingRenderer 
  // let  MaterialReducer =  window.MaterialReducer 
  // let    BlurredEnvMapGenerator = window.BlurredEnvMapGenerator
  // let   PathTracingSceneGenerator =  window.PathTracingSceneGenerator
  // let  mergeMeshes =  window.mergeMeshes
  // let  PhysicalCamera =  window.PhysicalCamera



// window.guiControls = guiControls



//////// GET DATA TEXTURE!! IS DELAYED THOUGH :0 SOMETIMES RENDER DOESNT TRIGGER PROPERLY



function generateMapping(){
  let canvas = document.createElement("canvas")
let dimensionheight = 200
let dimensionwidth = 200
canvas.height = dimensionheight
canvas.width = dimensionwidth
canvas.id = "myCanvas"
document.body.appendChild(canvas)

let canvasbg = document.getElementById("myCanvas");
let ctx = canvasbg.getContext("2d");

// Create gradient

let grd

// if(stalk){
  grd = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
// } else {
  // grd = ctx.createLinearGradient(0, 0, 0, dimensionheight);
// }





//NEED TO UPDATE START COLOR
  //NEED TO UPDATE START COLOR
    //NEED TO UPDATE START COLOR
      //NEED TO UPDATE START COLOR
        //NEED TO UPDATE START COLOR
          //NEED TO UPDATE START COLOR
            //NEED TO UPDATE START COLOR
              //NEED TO UPDATE START COLOR
                //NEED TO UPDATE START COLOR


let s = 100
let l = (fxrand() * 30)+70
let canvasStartColor
let canvasSecondColor

let backgroundSchemeChoice = ["compliment", "triad1", "triad2", "quad1", "quad3", "same"]
//  let backgroundSchemeChoice = ["triad1", "triad2", "quad1", "quad3"]



let backgroundScheme = backgroundSchemeChoice[Math.floor(fxrand()*backgroundSchemeChoice.length)];

console.log("BGSCHEME", backgroundScheme)

let backgroundColor

switch(backgroundScheme){
  case "compliment":
  backgroundColor = (StartColorNumber+180)%360
    break;
    case "triad1":
  backgroundColor = (StartColorNumber+120)%360
    break;
    case "triad2":
  backgroundColor = (StartColorNumber+240)%360
    break;
    case "quad1":
  backgroundColor = (StartColorNumber+90)%360
    break;
    case "quad3":
  backgroundColor = (StartColorNumber+270)%360
    break;
    case "same":
  backgroundColor = (StartColorNumber)%360
    break;
}


//   let backgroundColor = (StartColorNumber+180)%360






canvasStartColor =  new Color(`hsl(${backgroundColor}, ${s}%, ${l}%)`) //lighter is 90
canvasSecondColor =  new Color(`hsl(${backgroundColor}, ${s}%, ${l}%)`)
// canvasStartColor =  new Color(`hsl(${StartColorNumber}, ${s}%, ${l}%)`)

let toSRGB = canvasStartColor.to("srgb")
let toSRGB2 = canvasSecondColor.to("srgb")
// console.log("COLORVALUES", toSRGB)
let colorValues = []
let colorValues2 = []

toSRGB.coords.forEach(value => { 
  
  if (value>1){
    // console.log("VALUERESET ", "TO 1", value)
    value = 1
   
  } else if (value<0){
                        // console.log("VALUERESET ", "TO 0", value)
                        value = 0
                        }
                              value = value*255
                                     
                                                      colorValues.push(value)
                                 })

                                 toSRGB2.coords.forEach(value => { 
  
  if (value>1){
    // console.log("VALUERESET ", "TO 1", value)
    value = 1
   
  } else if (value<0){
                        // console.log("VALUERESET ", "TO 0", value)
                        value = 0
                        }
                              value = value*255
                                     
                              colorValues2.push(value)
                                 })
                       
                    //   console.log("COLORVALUES", colorValues)
                    //   console.log("COLORVALUES", "2", colorValues2)



//NEED TO UPDATE START COLOR
  //NEED TO UPDATE START COLOR
    //NEED TO UPDATE START COLOR
      //NEED TO UPDATE START COLOR
        //NEED TO UPDATE START COLOR
          //NEED TO UPDATE START COLOR
            //NEED TO UPDATE START COLOR




                                                                                                          //was 95
            // canvasworker1.postMessage({ update: "updateBGColors", message: [`hsl(${backgroundColor%360}, ${26}%, ${85}%)`]})


            canvasworker1.postMessage({ update: "updateBGColors", message: [`hsl(${backgroundColor}, ${40}%, ${95}%)`]})
            // canvasworker1.postMessage({ update: "updateBGColors", message: [`rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`]})
            document.querySelector(':root').style.setProperty('--color-bg', "hsl("+(backgroundColor)%360+",40%,95%, 0.9)");
            document.querySelector(':root').style.setProperty('--page-bg', "hsl("+(backgroundColor)%360+",40%,95%, 0.9)");

            // document.querySelector(':root').style.setProperty('--color-bg', `hsl(${backgroundColor%360}, ${26}%, ${85}%, 0.9)`);
            // document.querySelector(':root').style.setProperty('--color-bg', `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`);

            document.querySelector(':root').style.setProperty('--color-bg-solid', "hsl("+(backgroundColor)%360+",40%,95%, 1)");
            document.querySelector(':root').style.setProperty('--color-bg-solid-dark', "hsl("+(backgroundColor)%360+",40%,87%, 1)");
            document.querySelector(':root').style.setProperty('--color-bg-solid-input', "hsl("+(backgroundColor)%360+",40%,92%, 1)");
            
            // document.querySelector(':root').style.setProperty('--color-bg-solid-dark', "hsl("+(backgroundColor)%360+",40%,80%, 1)");
            

//  console.log("color 1 and 2 are different colors!")
grd.addColorStop(0, `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`);
// grd.addColorStop(1, `rgb(${255}, ${255}, ${255})`);
grd.addColorStop(1, `rgb(${colorValues2[0]}, ${colorValues2[1]}, ${colorValues2[2]})`);

ctx.fillStyle = grd;
ctx.fillRect(0, 0, dimensionwidth, dimensionheight);


init();

textureBg = new THREE.CanvasTexture(canvasbg) 
textureBg.needsUpdate = true;
window.textureBg = textureBg
// window.mapping = textureBg
//SET ENV BG TO THE GRADIENT COLOR 




let index = 0;

let loader
let imgsrcs = []

//   console.log("before faceinfos for each")








document.body.removeChild(canvas)

}







function generateWindowMapping(){

  window.canvasMap = true
  let canvas = document.createElement("canvas")
  let dimensionheight = 200
  let dimensionwidth = 200
  canvas.height = dimensionheight
  canvas.width = dimensionwidth
  canvas.id = "myCanvas"
  document.body.appendChild(canvas)
  let canvasbg = document.getElementById("myCanvas");
  let ctx = canvasbg.getContext("2d");
  
  // Create gradient
  
  let grd
   grd = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
  let s = 100
  let l = 50
  let canvasStartColor
  let canvasSecondColor
  let backgroundColor
  backgroundColor = 0
  
  canvasStartColor =  new Color(`hsl(${backgroundColor}, ${s}%, ${100}%)`) //lighter is 90
  canvasSecondColor =  new Color(`hsl(${backgroundColor}, ${s}%, ${0}%)`)
  let toSRGB = canvasStartColor.to("srgb")
  let toSRGB2 = canvasSecondColor.to("srgb")
  // console.log("COLORVALUES", toSRGB)
  let colorValues = []
  let colorValues2 = []
  
  toSRGB.coords.forEach(value => { 
    
    if (value>1){
      // console.log("VALUERESET ", "TO 1", value)
      value = 1
     
    } else if (value<0){
                          // console.log("VALUERESET ", "TO 0", value)
                          value = 0
                          }
                                value = value*255
                                       
                                                        colorValues.push(value)
                                   })
  
                                   toSRGB2.coords.forEach(value => { 
    
    if (value>1){
      // console.log("VALUERESET ", "TO 1", value)
      value = 1
     
    } else if (value<0){
                          // console.log("VALUERESET ", "TO 0", value)
                          value = 0
                          }
                                value = value*255
                                       
                                colorValues2.push(value)
                                   })

  grd.addColorStop(0, `rgb(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]})`);
  grd.addColorStop(1, `rgb(${colorValues2[0]}, ${colorValues2[1]}, ${colorValues2[2]})`);
  
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
  




  // const canvas = document.getElementById('myCanvas');
  const base64Data = canvasbg.toDataURL(); // get the base64 encoded texture data of the canvas
 
  const image = new Image();
  console.log("INITIALIZED IMAGE")
  // image.onload = () => {
  
  // };

  // console.log("Base64Data!", JSON.stringify(base64Data))

  const pixels = ctx.getImageData(0, 0, canvasbg.width, canvasbg.height).data;
  const rgbEData = THREE.RGBEFormat.encode(pixels, canvasbg.width, canvasbg.height);

  const blob = new Blob([rgbEData], { type: 'application/octet-stream' });
const url = URL.createObjectURL(blob);

  // const blob = new Blob([atob(base64Data.split(',')[1])], { type: 'image/png' });

  // const image = new Image();
  // image.onload = () => {
  //   // create texture and load HDR cube map here
  // };
  // image.src = URL.createObjectURL(blob); // set the src to the blob URL
  console.log("SET SRC")
  // image.src = JSON.stringify(base64Data);

  const texture = new THREE.Texture(image);
  const loader = new RGBELoader();
  console.log("INITIALIZED LOADER")
  loader.load(url, (hdrCubeMap) => {
    console.log("LOADER LOADED")
    // use the HDR cube map in your scene


    // textureBg = new THREE.CanvasTexture(canvasbg) 
    // textureBg.needsUpdate = true;
    // textureBg.mapping = THREE.EquirectangularReflectionMapping;
  
    hdrCubeMap.needsUpdate = true
    hdrCubeMap.mapping = THREE.EquirectangularReflectionMapping;

    window.mapping = hdrCubeMap
  window.initialized = true
    
    document.body.removeChild(canvas)

    generateMapping()

  });

 


}


function generateWindowMappingPMREM(){


  
  // textureBg = new THREE.CanvasTexture(canvasbg) 
  // textureBg.needsUpdate = true;

// First, create a renderer and a scene
let renderer = new THREE.WebGLRenderer();
let scene = new THREE.Scene();

// Create a camera and add it to the scene
const cubeRenderTarget = new THREE.WebGLCubeRenderTarget( 512, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

// Create cube camera
const cubeCamera = new THREE.CubeCamera( 1, 100000, cubeRenderTarget );
// camera.position.set(0, 0, 5);
scene.add(cubeCamera);

// camera.lookAt(new THREE.Vector3(0,0,0))

scene.background = new THREE.Color(0x888888);
// Load a texture to use as a background
// let textureLoader = new THREE.TextureLoader();
// let backgroundTexture = textureLoader.load('path/to/your/texture.jpg');
// scene.background = backgroundTexture;

// Create a PMREM generator and load the background texture into it


var geometry = new THREE.SphereGeometry(2, 32, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// renderer.render()
// let pmremGenerator = new THREE.PMREMGenerator(renderer);
// renderer.render()
// pmremGenerator.compileEquirectangularShader();
// let envMap = pmremGenerator.fromScene(scene);


// create a render target with a higher bit depth


// position the cube camera in the scene
cubeCamera.position.set(0, 0, 0);

// add the cube camera to the scene
// scene.add(cubeCamera);
// cubeCamera.renderTarget.texture.generateMipmaps = false;
console.log("CUBERENDERTARGET", cubeCamera)
// render the scene from the cube camera's perspective
cubeCamera.update(renderer, scene);

// get the environment map texture
var envMap = cubeCamera.renderTarget.texture;

// use the environment map for reflective materials or lighting
material.envMap = envMap;

// use the HDR texture for reflections or other effects
// material.envMap = hdrCubeRenderTargetData;



  envMap.mapping = THREE.CubeReflectionMapping;
  // renderer.render()
  
  window.mapping = Object.freeze(envMap.texture)
  // renderer.render()
  
// console.log("ENVMAPPING", hdrCubeRenderTargetData)

  window.initialized = true
  
renderer = undefined
// scene.dispose()
camera = undefined
scene = undefined
geometry.dispose()
geometry = undefined
material.dispose()
material = undefined
sphere = undefined



}



          hdrEquirect = new RGBELoader()
          .load( './royal_esplanade_1k.hdr', function () {







            hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

            window.mapping = hdrEquirect

            // scene.background = window.mapping

          // scene.environment = window.mapping

          window.initialized = true







// generateWindowMapping()
// generateWindowMappingPMREM()

generateMapping()



})






          
