function finishWorker(e){



    canvasworker1.postMessage({ update: "update", message: "Deleting workers...", type: "delWorker1" })




    setTimeout( ()=>{



        window.packingworker.postMessage(["closeWorker"])

        console.log("packingworker", packingworker)
        window.packingworker.onmessage = null
        window.packingworker.onerror = null
        delete window.packingworker.onmessage;
        delete window.packingworker.onerror;
        window.packingworker.terminate()
        delete window.packingworker
        window.packingworker = null
        // packingworker.terminate()
       
    //    packingworker.onmessage = null
    //    packingworker.onerror = null
    //    packingworker = null
    //     delete packingworker
        
    
    
        console.log("packingworker", window.packingworker)
        console.log("packingworker", packingworker)
        // window.packingworker =  new Worker('packing-worker.js', {type:"module"})


        canvasworker1.postMessage({ update: "update", message: "Deleting workers... :)", type:"delWorker2" })

        setTimeout( ()=>{

    console.log("DELETED packingworker", e)

let completeEvent = e.data[1]
let flowerPlacementIndex = e.data[2]

    scene.updateMatrixWorld(true)

// console.log(window.flowerGeoms)



completeEvent.placements.sort((a, b) => parseFloat(a.part) - parseFloat(b.part));
// console.log(completeEvent.placements)
// homes

//used to be completeEvent.placements, but that includes unplaced flowers.

let positions = []
let clonesContainer = new THREE.Object3D()
let distances = []

for (var i=0; i<completeEvent.placements.length;i++){

if(completeEvent.placements[i].bin == 0){



let placementsIndex = 0
for (var j=0; j<flowerPlacementIndex.length;j++){

if(flowerPlacementIndex[j].id == completeEvent.placements[i].part){
placementsIndex = j

}

}


let indexNumberFlower = (flowerPlacementIndex[placementsIndex].flowerNumber)-1
// console.log(indexNumberFlower)
let flowerWindow = window.flowersArray[indexNumberFlower]
// console.log(flowerWindow)

// if(add2DHull){
let shapeClone = flowerWindow.SHAPEMESH.clone()
shapeClone.scale.x = flowerPlacementIndex[placementsIndex].scale
shapeClone.scale.y = flowerPlacementIndex[placementsIndex].scale
shapeClone.scale.z = flowerPlacementIndex[placementsIndex].scale
//shapeClone.name = "shapeClone"

clonesContainer.add(shapeClone)
shapeClone.position.x = completeEvent.placements[i].position.x/100
shapeClone.position.y = completeEvent.placements[i].position.y/100
shapeClone.rotation.z = completeEvent.placements[i].rotation

positions.push({x:completeEvent.placements[i].position.x/100, y:completeEvent.placements[i].position.y/100})

}




}



let borderCoords = {}

function getCenterPoint(mesh) {
var bbox = new THREE.Box3().setFromObject(mesh);
var middle = new THREE.Vector3();
// var geometry = mesh.geometry;

// geometry.computeBoundingBox();

borderCoords = {maxX:bbox.max.x, maxY:bbox.max.y, minX:bbox.min.x, minY:bbox.min.y}

middle.x = (bbox.max.x + bbox.min.x) / 2;
middle.y = (bbox.max.y + bbox.min.y) / 2;
middle.z = (bbox.max.z + bbox.min.z) / 2;

mesh.localToWorld( middle );
return middle;
}

scene.add(clonesContainer)
let center = getCenterPoint(clonesContainer)

// console.log("CENTER", center)

scene.remove(clonesContainer)
clonesContainer = 0

let biggestDist
if(DISPLACE3D){



for (var i=0; i<positions.length;i++){
// positions[i].x = positions[i].x -center.x
// positions[i].y = positions[i].y -center.x

distances.push(Math.sqrt(Math.pow(positions[i].x-center.x, 2)+Math.pow(positions[i].y-center.y, 2)))

}



function largest(arr) { 
let i; 

// Initialize maximum element 
let max = arr[0]; 

// Traverse array elements  
// from second and compare 
// every element with current max  
for (i = 1; i < arr.length; i++) {
    if (arr[i] > max) 
        max = arr[i]; 
} 
  
return max; 
} 

biggestDist = largest(distances)

}



let maxY = 0


for (var i=0; i<completeEvent.placements.length;i++){

if(completeEvent.placements[i].bin == 0){



let placementsIndex = 0
for (var j=0; j<flowerPlacementIndex.length;j++){

if(flowerPlacementIndex[j].id == completeEvent.placements[i].part){
placementsIndex = j

}

}


let indexNumberFlower = (flowerPlacementIndex[placementsIndex].flowerNumber)-1
// console.log(indexNumberFlower)
let flowerWindow = window.flowersArray[indexNumberFlower]
// console.log(flowerWindow)



let flowerClone 

console.log("FLOWERWINDOW", flowerWindow)

         if(trueReduction){

            flowerClone = flowerWindow.lowResObject.clone()

            //  flowerClone = flowerWindow.objects[0].clone()

            // const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
            // const material = new THREE.MeshBasicMaterial( { color: "red" } );
            // const sphere = new THREE.Mesh( geometry, material );


            // flowerClone = sphere


         } else {

            flowerClone = flowerWindow.objects[0].clone()

            // const geometry = new THREE.SphereGeometry( 0.5, 32, 16 );
            // const material = new THREE.MeshBasicMaterial( { color: "blue" } );
            // const sphere = new THREE.Mesh( geometry, material );

            // flowerClone = sphere

         }



let distanceThreshold = width/200



function placeFlowers(){

let shapeClone
if(add2DHull){
shapeClone = flowerWindow.SHAPEMESH.clone()

scene.add(shapeClone)
shapeClone.position.x = (completeEvent.placements[i].position.x/100)-center.x
shapeClone.position.y = (completeEvent.placements[i].position.y/100)-center.y
shapeClone.rotation.z = (completeEvent.placements[i].rotation) //* (Math.PI/180)
shapeClone.scale.x = flowerPlacementIndex[placementsIndex].scale
shapeClone.scale.y = flowerPlacementIndex[placementsIndex].scale
shapeClone.scale.z = flowerPlacementIndex[placementsIndex].scale
}


scene.add(flowerClone)

// console.log("DISTANCE", Math.sqrt(Math.pow((completeEvent.placements[i].position.x/100)-center.x, 2)+Math.pow((completeEvent.placements[i].position.y/100)-center.y, 2)))

flowerClone.position.x = (completeEvent.placements[i].position.x/100)-center.x
flowerClone.position.y = (completeEvent.placements[i].position.y/100)-center.y

flowerClone.scale.x = flowerPlacementIndex[placementsIndex].scale
flowerClone.scale.y = flowerPlacementIndex[placementsIndex].scale
flowerClone.scale.z = flowerPlacementIndex[placementsIndex].scale

if(DISPLACE3D){
flowerClone.position.z = DISPLACEFACTOR*(-1*Math.sqrt(Math.pow((completeEvent.placements[i].position.x/100)-center.x, 2)+Math.pow((completeEvent.placements[i].position.y/100)-center.y, 2))) + (biggestDist*DISPLACEFACTOR)

if(add2DHull){
shapeClone.position.z = DISPLACEFACTOR*(-1*Math.sqrt(Math.pow((completeEvent.placements[i].position.x/100)-center.x, 2)+Math.pow((completeEvent.placements[i].position.y/100)-center.y, 2))) + (biggestDist*DISPLACEFACTOR)
}

}
flowerClone.rotation.z = completeEvent.placements[i].rotation  //* (Math.PI/180) //ROTATE PLACED FLOWERS



function lookAwayFrom2(me, target) {

let oldZ = me.rotation.z

// console.log("lookAwayFrom", me, target)

var bbox = new THREE.Box3().setFromObject(me);
// var middle = new THREE.Vector3();
// var geometry = mesh.geometry;

// geometry.computeBoundingBox();

// borderCoords = {maxX:bbox.max.x, maxY:bbox.max.y, minX:bbox.min.x, minY:bbox.min.y}

// middle.x = (bbox.max.x + bbox.min.x) / 2;
// middle.y = (bbox.max.y + bbox.min.y) / 2;
// middle.z = (bbox.max.z + bbox.min.z) / 2;

let position = new THREE.Vector3()
position.x = me.position.x 
position.y = me.position.y
position.z = bbox.min.z

  var v = new THREE.Vector3();
  v.subVectors(position, target).add(position);
  me.lookAt(v);

  me.rotation.z = oldZ

}


if(DISPLACE3D){
if(add2DHull){
if(lookAway){
lookAwayFrom2(shapeClone, new THREE.Vector3(0, 0, flowerClone.position.z-5))
}
} else {
}
if(lookAway){
lookAwayFrom2(flowerClone, new THREE.Vector3(0, 0, flowerClone.position.z-5))
}
} else {
if(add2DHull){
if(lookAway){
lookAwayFrom2(shapeClone, new THREE.Vector3(0, 0, -10)) 
}
}

if(lookAway){
lookAwayFrom2(flowerClone, new THREE.Vector3(0, 0, -10))  
}

}


const box = new THREE.Box3().setFromObject(flowerClone);






// ...

// in the animation loop, compute the current bounding box with the world matrix

let median = (box.max.z + box.min.z)/2

// console.log("BOUNDINGBOX", box)
if (maxY < median) maxY = median


}

if(TRIMCIRCLE){



if(Math.sqrt(Math.pow(((completeEvent.placements[i].position.x/100)-center.x)-borderCoords.maxX, 2)+Math.pow(((completeEvent.placements[i].position.y/100)-center.y)-borderCoords.maxY, 2))>distanceThreshold && 
Math.sqrt(Math.pow(((completeEvent.placements[i].position.x/100)-center.x)-borderCoords.minX, 2)+Math.pow(((completeEvent.placements[i].position.y/100)-center.y)-borderCoords.maxY, 2))>distanceThreshold && 
Math.sqrt(Math.pow(((completeEvent.placements[i].position.x/100)-center.x)-borderCoords.minX, 2)+Math.pow(((completeEvent.placements[i].position.y/100)-center.y)-borderCoords.minY, 2))>distanceThreshold &&  
Math.sqrt(Math.pow(((completeEvent.placements[i].position.x/100)-center.x)-borderCoords.maxX, 2)+Math.pow(((completeEvent.placements[i].position.y/100)-center.y)-borderCoords.minY, 2))>distanceThreshold
){



} else {

placeFlowers();


}

} else {

placeFlowers();

}








}




}



// window.realY = maxY

if(maxY > 6 && gridSize < 1001){
multiplier = 0.9
// console.log("MAX y IS LARGER")
} else {
multiplier = 0

if(window.flowerSpire){

    console.log("CAMERAPOS123", "spire")

if(gridSize < 1001){
    console.log("CAMERAPOS123", "< 1001")
multiplier = maxY/6.2
console.log("CAMERAPOS123", multiplier, maxY)
if(multiplier > 1){
multiplier = 1
}
} else if (gridSize < 3001){
    console.log("CAMERAPOS123", "< 3001")
multiplier = maxY/10
if(multiplier > 1){
multiplier = 1
}
}

} else {
multiplier = 0
}

}

defaultZ = (maxY*multiplier)
centerStalkZ = (maxY*multiplier)

// console.log("maxY", maxY)

//SET REAL CAMERA Y TARGET



//   if(window.vaseIndex == vaseIndexNumber){
    // console.log("GENERATE", "BUILDING!")
    // console.log("BUILDSCENERENDER")
buildSceneRender()
//   } else {
    window.lastWorkerMessage = true;
    // console.log("GENERATE", "not building scene yet! vases aren't ready!")
//   }

  console.log("will save and loop png", savePngAuto)
console.log("should be rendering!")
snap = true
}, window.packerTimeout)


}, window.packerTimeout)
}


window.packingworker.onmessage = function (e) {


if(e.data[0] == "closed"){
    // finishWorker(window.completedEvent)
}


if(e.data[0]=="completed"){



// window.completedEvent = e




//end setTimeout

finishWorker(e)




  } else if (e.data[0]=="progress"){

    // console.log("PACKINGPERCENT", e.data[2])
    canvasworker1.postMessage({ update: "update", message: e.data[1], percent: e.data[2], type: "packing"})

    //TODO
//send message to canvasworker for progress

  }
}



function packFlowers(threeJSShapes, flowerPlacementIndex, reductionNumber){

    // new Worker('dotworkernew-dots.js', {type: "module"})


// let flowerPlacementIndex = []
// let generation = 0;
function startPacking(){
    let packer = new Fit.Packer()
      let root = document.getElementById('playground')

      function createDebugRect(id, size = 100, options = {}) {
        let points = []
        points.push(new Fit.Vector(0, size))
        points.push(new Fit.Vector(0, 0))
        points.push(new Fit.Vector(size, 0))
        points.push(new Fit.Vector(size, size))
        return new Fit.Part(id, points, options)
      }

      function createDebugPart(id, vertices = 6, minRadius = 50, maxRadius = 100, dx = 0, dy = 0, options = {}) {
        let points = []

        let interval = maxRadius - minRadius

        for (let i = 0; i < vertices; i++) {
          let r = (i / vertices) * Math.PI * 2
          let x = maxRadius + Math.cos(r) * (fxrand() * interval + minRadius) + dx
          let y = maxRadius + Math.sin(r) * (fxrand() * interval + minRadius) + dy
          points.push(new Fit.Vector(x, y))
        }

        return new Fit.Part(id, points, options)
      }




   
      let w = Math.floor(root.getBoundingClientRect().width * 0.5 ) - 20


      let start = () => {

let randoms = []

for (var i=0; i<5000; i++){
    randoms.push(fxrand())
}


        window.packingworker.postMessage(["makePack", {

            width: width,
            height: height,
            threeJSShapes: threeJSShapes,
            flowerPlacementIndex: flowerPlacementIndex,
            spacing: spacing,
            randoms: randoms,
            reductionNumber: reductionNumber

        }])


      }

    //   document.getElementById('reset-button').addEventListener('click', (e) => {
    //     packer.stop()
    //     start()
    //   })
      start()
}


    startPacking()



}




