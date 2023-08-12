Flower.prototype.generateFlowerGeometry = function(){
    // window.myWorker.postMessage(["flower", 0, this.flowerIndexNumber, this.flowerParameters, this.scale])
    // console.log("posted message!")
  console.log("THISLOGGING", this, window.overWriteAll)





console.log("REDUCTIONTEST", this.spherical)

  

    window.workers[window.flowerWorkerNumber%window.workers.length].postMessage(
      ["flower", 
    0, 
    0, 
    this.flowerParameters, 
    this.scale, 
    this.flowerIndexNumber, 
    this.flowerLayers, 
    totalUniqueFlowerChoice.reduction, //regular reduction!
    this.randoms, 
    this.reductionCase, 
    this.reductionNumber, 
    window.overWriteAll,
   
    {reducedReduction: this.reducedReduction,
    highResChangeBasic: this.highResChangeBasic,
    sphericalReductionOverwrite: this.sphericalReductionOverwrite, //true or false
    sphericalReductionNumber: this.sphericalReductionNumber, //a number 0—1
    spireReductionOverwrite: this.spireReductionOverwrite, //true or false
    spireReductionNumber: this.spireReductionNumber,// 0—1
    spherical: this.spherical,
    spire: this.flowerSpire,

    HRnonSpherical: this.customNSRes,
    HRnonSphericalRows: this.customNSRows,
    HRnonSphericalCols: this.customNSCols,

    HRspherical: this.customSphericalRes,
    HRsphericalCols: this.customSphericalCols,
    HRsphericalRows: this.customSphericalRows,

    HRzinnia: this.customZinniaRes,
    HRzinniaCols: this.customZinniaCols,
    HRzinniaRows: this.customZinniaRows
    
  
  }
  
  ])
  
    // if(window.flowerWorkerNumber%2 == 0){
    //   window.myWorker.postMessage(["flower", 0, 0, this.flowerParameters, this.scale, this.flowerIndexNumber, this.flowerLayers])
    // } else {
    //   window.myWorker2.postMessage(["flower", 0, 0, this.flowerParameters, this.scale, this.flowerIndexNumber, this.flowerLayers])
    // }
    window.flowerWorkerNumber++
  
    if(window.flowerWorkerNumber > window.workers.length-1){
      window.flowerWorkerNumber = 0
    }
  
    }

Flower.prototype.getCenterPoint = function(mesh) {
    let middle = new THREE.Vector3();
    let geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
    }

Flower.prototype.CalculateCircleCenter = function(points){
  
  let centerX = 0
  let centerY = 0
  let centerZ = 0

  for (var i=0; i<points.length;i=i+3){
    centerX = centerX + points[i]
    centerY = centerY + points[i+1]
    centerZ = centerZ + points[i+2]
  }
  
  centerX = centerX/(points.length/3)
  centerY = centerY/(points.length/3)
  centerZ = centerZ/(points.length/3)
  
    return {x:centerX, y:centerY, z:centerZ};


    }

Flower.prototype.generateRandomFlower = function(a, flowerType="2Layer"){
  
  this.a = a
  this.flowerType = flowerType
  

let dotChance
let stripeChance

  if(!includesDots){
dotChance = 0
  } else {
    dotChance = 0.75
   if(this.flowerType == "1Layer-collection2-scale2"){
    dotChance = 0.4
   }
  }

//   dotChance = 1


  if(!includesStripes){
stripeChance = 0
  } else {
    stripeChance = 0.75
   if(this.flowerType == "1Layer-collection2-scale2"){
    stripeChance = 0.75
   }
  }

//   stripeChance = 1

   
   this.generateDotsValTrue = fxrand() < dotChance ? true : false; // the real generate dots value
   this.generateDotsval = true //controls whether or not the flower is sent to the worker, has little to do with dots at this point but only set to true


   this.generateStripesVal = fxrand() < stripeChance ? true : false;

  //  console.log("INCLUDESDOTS", this.generateDotsValTrue)

  // this.flowerType = "2Layer"
  
  let posNeg = this.posNeg

if(this.flowerHeight == 0 ){



  

  this.bValue = 5;
  // this.rotation = 10;
  this.flowerDiameer = fxrand()*100+140
  // flowerDiameer = 200
  // flowerHeight = 460
  this.flowerHeight = 100 + fxrand()*400
  this.curve1 = (fxrand()*4) + 1
  // curve1 = 3
  // curve2 = 1.3
  
  if(this.flowerType == "1Layer"){
    this.curve2 = this.curve1/2 - 0.2
  } else if(this.flowerType == "1Layer-collection1") { 
    this.curve1 = (fxrand()*2) + 1
    this.curve2 =this.curve1/3

  } else {

  

  if(fxrand() <0.5){
    this.curve2 = this.curve1/2 - 0.2
  } else {
    this.curve2 = this.curve1/3 - 0.2
  }
}
 
  
  this.petalNumber = 1+Math.floor(fxrand()*5);
     
window.uSteps = window.defaultUSteps + (window.petalRez*this.petalNumber)
window.vSteps = window.defaultVSteps + (window.petalRez*this.petalNumber)
  // console.log("RESOLUTION CHANGED", window.uSteps)
  // console.log("RESOLUTION CHANGED", window.vSteps)
  
  this.petalLength = Math.floor(fxrand()*300);
  
  // console.log("colorArrs", this.color1Arr,this.color2Arr,this.color3Arr,this.color4Arr)
    

  if(this.flowerType == "1Layer"){
    



    this.bValue = 5
    // this.flowerGeomOffset = this.flowerGeomOffset + 0.0001
    // this.rotation = this.rotation+90;
    this.flowerHeight = this.flowerHeight*2;
  this.flowerDiameer = this.flowerDiameer/2
  // curve1 = Math.ceil(fxrand()*2)+1
  // curve2 = curve2/((fxrand()*0.3)+0.8)
  this.curve2 = this.curve2/1.1
  this.petalNumber = Math.ceil(fxrand()*5)
window.uSteps = window.defaultUSteps + (window.petalRez*this.petalNumber)
window.vSteps = window.defaultVSteps + (window.petalRez*this.petalNumber)
  //         console.log("RESOLUTION CHANGED", window.uSteps)
  // console.log("RESOLUTION CHANGED", window.vSteps)
  this.petalLength =  Math.ceil(fxrand()*40)+40;
  } else if (this.flowerType=="1Layer-collection1" || this.flowerType=="1Layer-collection2-scale" || this.flowerType=="1Layer-collection2" || this.flowerType=="1Layer-collection2-scale2" || this.flowerSpire || this.flowerType == "1Layer-collection2-scale-Helix"){


    this.bValue = 1
    this.flowerGeomOffset = this.flowerGeomOffset + 0.0001
    // this.rotation = this.rotation+90;
            this.flowerHeight = this.flowerHeight*2;
            this.flowerDiameer = this.flowerDiameer/2
            // curve1 = Math.ceil(fxrand()*2)+1
            // curve2 = curve2/((fxrand()*0.3)+0.8)
            this.curve2 = this.curve2/1.1
            this.petalNumber = Math.ceil(fxrand()*4)
          window.uSteps = window.defaultUSteps + (window.petalRez*this.petalNumber)
          window.vSteps = window.defaultVSteps + (window.petalRez*this.petalNumber)
            //         console.log("RESOLUTION CHANGED", window.uSteps)
            // console.log("RESOLUTION CHANGED", window.vSteps)
            this.petalLength =  Math.ceil(fxrand()*10)+20;


  }
  

  
} else {
  

  
  
  this.bValue = 5
  // this.flowerGeomOffset = this.flowerGeomOffset + 0.0001
  // this.rotation = this.rotation+90;
  this.flowerHeight = this.flowerHeight*2;
  this.flowerDiameer = this.flowerDiameer/2
  // curve1 = curve1
  this.curve2 = this.curve2/1.1
  this.petalNumber = 1+Math.floor(fxrand()*3)
window.uSteps = window.defaultUSteps + (window.petalRez*this.petalNumber)
window.vSteps = window.defaultVSteps + (window.petalRez*this.petalNumber)
  //         console.log("RESOLUTION CHANGED", window.uSteps)
  // console.log("RESOLUTION CHANGED", window.vSteps)
  this.petalLength = this.petalLength/3
  
  


  
}
    
  
  

    let lowlights = false
    let subtlefade = false
    let colorsMatch = false
    let vertCenterGradient = false
    let f3Offset = 0;
    let centerSize2 = 6.4;
    let centerSize = 14;
    let vertOffset = -0.5;
    let color1
    let color2
    let color3
    let color4
    
    // console.log("flowerColors", this.flowerColors)
     color1 =  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+0][0])},${Math.round(this.flowerColors[(a*3)+0][1])},${Math.round(this.flowerColors[(a*3)+0][2])})`)
     color2 =  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+1][0])},${Math.round(this.flowerColors[(a*3)+1][1])},${Math.round(this.flowerColors[(a*3)+1][2])})`)
     color3 =  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+2][0])},${Math.round(this.flowerColors[(a*3)+2][1])},${Math.round(this.flowerColors[(a*3)+2][2])})`)
     color4 =  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+2][0])},${Math.round(this.flowerColors[(a*3)+2][1])},${Math.round(this.flowerColors[(a*3)+2][2])})`)
    
    
if(color2.r == color1.r && color2.g == color1.g && color2.b == color1.b){
    // if(true){
  // console.log("COLORSMATCH")  
  
    lowlights = true
    subtlefade = true
    colorsMatch = true
    
 
                                     
  
}
    

    if(flowerType=="dahlia"){

      if(window.lowResTest){
      window.uSteps = 400
      window.vSteps = 400
      } else {
        window.uSteps = 1000
      window.vSteps = 1000
      }

      if(colorsMatch){
        // console.log("colorsMatch!")
          //update settings for material to include chicdahlia
      }
    } else if (flowerType=="zinnia"){


      if(window.lowResTest){
      window.uSteps = 400
      window.vSteps = 400
      } else {
        window.uSteps = 500
      window.vSteps = 500
      }
      if(colorsMatch){
        // console.log("colorsMatch!")
            //TODO: update settings for material to include chiczinnia

            // let params = {bbMin: {value: bufGeom.boundingBox.min},
            // bbMax: {value: bufGeom.boundingBox.max},
            //         color1: {value: new THREE.Color('blue')},
            //         color2: {value: new THREE.Color('magenta')},
            //         color3: {value: new THREE.Color('white')},
            //         color4: {value: new THREE.Color('red')},
            //         vertOffset: {value: 0.1},
            //          //changes vertical gradient intensity! moves from -1 to +1
            //         centerSize: {value: -10},
            //             //controls central gradient position!
            //             //the lower the larger?
            //             //0-20
            //         centerSize2: {value: -10},
            //           // the lower the larger
            //         f3Offset: {value: -0.85},
            //         //controls scale of lowlights, the lower the larger
            //         topf2: {value:false},
            //         vertCenterGradient: {value:true},
            //         lowlights: {value:true},
            //         subtleFade: {value:true},
            //         defaultFade: {value:true}}
            f3Offset = -0.85;
            centerSize2 = -10;
            centerSize = -10;
            vertOffset = 0.1;
            vertCenterGradient = true;
            lowlights = true;
            subtlefade = true;

      }
    } else {

    }
    
    

return {
  uSteps:  Object.freeze(window.uSteps),
  vSteps:  Object.freeze(window.vSteps),
flowerGeomOffset: this.flowerGeomOffset,
rotation: this.rotation,
petalNoAlign:10.4, //not in use!
thetaPi:2,
// get theta(){return this.thetaPi * Math.PI * this.u},
theta: 2*Math.PI,
phi: Math.PI / 1.5,
pLen:this.petalLength,
curve1:this.curve1,
curve2:this.curve2,
fHeight:this.flowerHeight,
b:this.bValue,
bNum:Math.floor(fxrand()*7)+3,
pNum:this.petalNumber,
pSharp:fxrand()*10,
  startColorHue: this.startColorHue,
  increment: this.increment,
  flowerType: this.flowerType,
  scaleNumber: ((fxrand()*180)+100), //is only used if flowerType is zinnia for now
fD:this.flowerDiameer,
                     materialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+0][0])},${Math.round(this.flowerColors[(a*3)+0][1])},${Math.round(this.flowerColors[(a*3)+0][2])})`),
                                      color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+1][0])},${Math.round(this.flowerColors[(a*3)+1][1])},${Math.round(this.flowerColors[(a*3)+1][2])})`),
                                      color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+2][0])},${Math.round(this.flowerColors[(a*3)+2][1])},${Math.round(this.flowerColors[(a*3)+2][2])})`),
                                      color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[(a*3)+2][0])},${Math.round(this.flowerColors[(a*3)+2][1])},${Math.round(this.flowerColors[(a*3)+2][2])})`),
                                      vertOffset: vertOffset,
                                      centerSize: centerSize,
                                      centerSize2: centerSize2,
                                      f3Offset: f3Offset,
                                      topf2:false,
                                      vertCenterGradient:vertCenterGradient,
                                      lowlights:lowlights,
                                      subtleFade:subtlefade,
                                      defaultFade: true,
                                      }
                  }
    }

Flower.prototype.optimizeMesh = function(object){

// import * as ONE from "one";
//ONE SHOULD BE THREE, r100

// console.log(ONE)

// // let object = new ONE.Object3D();
// let buffer = new ONE.BufferGeometry()


// buffer.attributes.normal= new ONE.BufferAttribute( object.normals, 3 )
//     buffer.attributes.normal.needsUpdate = true
//     // console.log(buffer)

//     let positionsFloat = new Float32Array(object.positions)
//     buffer.attributes.position= new ONE.BufferAttribute( positionsFloat, 3 )
//     buffer.attributes.position.needsUpdate = true

//     // buffer.attributes.color = new ONE.BufferAttribute(color, 3)
//     // buffer.attributes.color.needsUpdate = true

//     // buffer.attributes.color = []
//     // buffer.attributes.color.needsUpdate = true


//     buffer.attributes.uv= new ONE.BufferAttribute( object.uvs, 2 )
//     buffer.attributes.uv.needsUpdate = true
//     buffer.index = new ONE.BufferAttribute( object.indices, 1 )
//     buffer.index.needsUpdate = true
//     buffer.needsUpdate = true;

//     console.log("BUFFER", buffer)

//       // console.log("PARSED", e.data[0])
//       // console.log("PARSED", buffer)



//       buffer.computeBoundingBox()

//                 // function optimizeModel() {
//               // scene.remove(elfOptimized);
//               let elfOptimized = buffer.clone();
//                let optimized = simplifyMesh(
//                 elfOptimized,
//                 0.6,
//                 true
//               );

//               console.log(optimized)
          // elfOptimized.position.x = 2.5;
          // scene.add(elfOptimized);
        // }

        // var elf, elfOptimized;
        // var loadingManager = new THREE.LoadingManager(function() {
        //   scene.add(elf);
        //   optimizeModel();

        //   elf.position.x = -2.5;
        // });


  // return {normals: normals, positions: positions, uvs:uvs, indices:indices, color:color}
    }

Flower.prototype.onDotWorkerMessage = function(){
    
    console.log("onDotWorkerMessage")
    
      this.generateRest()
    }
           

  
Flower.prototype.generateRest = function(){
  
  
  
  
  
  
  
          // console.log(this.object);
      
      
         
          
          // console.log(this)
          console.log("TEST1", "GENERATING REST" , this.flowerIndexNumber)
          console.log(this.object)
          console.log(this.objects)
      
          this.objects[0].traverse(n => { if ( n.isMesh ) {
            // n.material.shading = THREE.SmoothShading;
        n.castShadow = true; 
        // n.receiveShadow = true;
        if(n.material.map) n.material.map.anisotropy = 16; 
      }});
      
          // this.objects[0].castShadow = true;
      
            // scene.add(this.objects[0])
      
           
      
            if (GENERATORSTALK){
      
      
              this.finished = true;
              // window.flowersArray.push(this)
              checkFinished();
             
            
            } else if (PACK2D){
            this.finished = true;
            checkFinished();
            } else {
              console.log("addToScene!")
              this.addToScene(this.objects[0], this.coords, this)
            }
      
            
      window.workerMessageCount++
  
      // console.log("workermessage")
      // console.log(window.workerMessageCount)
      
      if(window.flowerLen-1 == window.workerMessageCount && !GENERATORSTALK){
      //   console.log("LAST WORKER MESSAGE!")
        window.lastWorkerMessage = true;
      
        // buildSceneRender()
        console.log("checkFinished!")
      checkFinished()
      
      
      
      
      
      
      }
                      // for (var i=0; i<window.parameters.length;i++){
      
              //                   if(window.workerIndex < window.parameters.length){
              //                   // console.log('tryingtosend', THREE)
              // window.parametersNum = window.parametersNum+1
              // console.log("FLOWERPARAMSCLIENT", window.parameters)
              // window.myWorker.postMessage(["flower", window.workerIndex, window.parametersNum, window.parameters, scale])
              // window.workerIndex++
              //                   }
      
                      
    }
      
Flower.prototype.addToScene = function(flower, coords=false, wholeFlower){
      //   console.log("ADDING", flower)
      scene.add(flower)
  
  
      
      
      // console.log("added")
      if(coords){
        flower.position.x = coords.x
        flower.position.y = coords.y
        flower.position.z = coords.z
  
  
  //ADD SHAPE SHADOW TO THE SCENE!!! 
  
  
      //   if(wholeFlower.SHAPEMESH){
      //     scene.add(wholeFlower.SHAPEMESH)
      //     wholeFlower.SHAPEMESH.position.x = coords.x
      //     wholeFlower.SHAPEMESH.position.y = coords.y
      //     wholeFlower.SHAPEMESH.position.z = coords.z
      // } //ADD SHAPE
  
      
      
        flower.updateWorldMatrix(false, true)
      
      //   let sphere = new THREE.SphereGeometry(0.1,10,10)
      //   let mesh = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color:new THREE.Color("red")}))
      // scene.add(mesh)
      // mesh.postiion.x = 0
      // mesh.postiion.y = 0
      // mesh.postiion.z = 0
      // console.log("added")
      }
      
    }
      
Flower.prototype.translateAndReorient = function(axis, vector){
        var vX1 = axis.normalize();
            var vX2 = vector.normalize();
            var vY = vX1.clone().cross(vX2).normalize();
            var vZ1 = vX1.clone().cross(vY).normalize();
            var vZ2 = vX2.clone().cross(vY).normalize();
            var M1array = [vX1.x, vX1.y, vX1.z, vY.x, vY.y, vY.z, vZ1.x, vZ1.y, vZ1.z];
            var M1 = new THREE.Matrix3().fromArray(M1array);
            var M2array = [vX2.x, vY.x, vZ2.x, vX2.y, vY.y, vZ2.y, vX2.z, vY.z, vZ2.z];
            var M2 = new THREE.Matrix3().fromArray(M2array);
            var M = M1.clone().multiply(M2);
            var elems = M.elements;
            var A = new THREE.Matrix4();
            A.set(elems[0], elems[1], elems[2], vector.x,
              elems[3], elems[4], elems[5], vector.y,
              elems[6], elems[7], elems[8], vector.z,
              0, 0, 0, 1);
            return A;
    }
  
Flower.prototype.addTransReorientedMeshLowRes = function(geom, material, object, axis, vector, j, that) {
           
                
  
  
        
        var mesh = new THREE.Mesh(geom, material);
          //  var transfoMatrix = this.translateAndReorient(axis, vector);
          //  mesh.matrix = transfoMatrix;
           mesh.matrixAutoUpdate = true;
           
               let name = Date.now()+this.randoms[6]
           mesh.name = name
               
          //  console.log(window.parameters)
          //  console.log(window.parameters[j])
      
          //  console.log(j)
          //  console.log("ADD MESH")
      
          // if(that.flowerType == "zinnia" && that.flowerType == "dahlia" && that.flowerType == "lotus" && that.flowerType == "camelia" && that.flowerType == "rose"){
          //   // mesh.rotation.y =  mesh.rotation.y +(270 / (Math.PI * 180)) 
          //   mesh.up.set(0,1,0)
          // } else {
            mesh.rotation.z =  2 * Math.PI * (this.flowerParameters[j].rotation / 360);    
            mesh.updateWorldMatrix(false, true)
          // }
      
      
          
              //  console.log('yeehoo!')
           scene.add(mesh)
           
           const raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1));
          
           const intersects = raycaster.intersectObjects( scene.children );
      
               let zPoint = 0;
               
       for ( let i = 0; i < intersects.length; i ++ ) {
      
         if (intersects[i].object.name = name){
      
         zPoint = intersects[i].point.z
         }
      
       }
               console.log("ZPOINT", zPoint)
               
       if (this.flowerType !== "zinnia" && this.flowerType !== "dahlia" && this.flowerType !== "lotus" && this.flowerType !== "camelia" && this.flowerType !== "rose"){
        if(zPoint > 0){
                 mesh.position.z = mesh.position.z-zPoint + this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               } else if (zPoint < 0){
                 mesh.position.z = mesh.position.z+Math.abs(zPoint-0.1) + this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               } else {
                 mesh.position.z = mesh.position.z+this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               }
      
              //  console.log("BBOX", this.lastBboxMin)
                       if(this.lastBboxReducedMin!=0){
                        mesh.position.z = mesh.position.z + Math.abs(this.lastBboxReducedMin/100)
                        mesh.updateWorldMatrix(false, true)
               
              //  if(this.lastBboxReducedMin > geom.boundingBox.min.z){
              // //   console.log("BBOX", true)
              //    mesh.position.z = mesh.position.z + Math.abs(this.lastBboxReducedMin - geom.boundingBox.min.z) + 0.02
              //    mesh.updateWorldMatrix(false, true)
              //  }
                         
                         this.lastBboxReducedMin = geom.boundingBox.min.z
               
             } else {
               this.lastBboxReducedMin = geom.boundingBox.min.z
             }
       }        
      
       
               
               
           let cneterPoint = this.getCenterPoint(mesh)
          //  console.log(cneterPoint)
      
               
          // console.log("MATSETTINGS", )
  
          if(that.materialSettings[j].generateDots){
            // scene.remove(mesh)
          //  let newmesh = that.generateDots(mesh,material,that.materialSettings[j], that.dotsSettings, that )
          //  scene.remove(mesh)
          //  mesh.geometry.dispose()
           this.preDots.push(mesh)
           scene.remove(mesh)
          //  disposeHierarchy (mesh, disposeNode);
          //  this.object.add(newmesh);
                                      // this.lowResObject.add(mesh)
          // this.object.add(mesh) 
          //TODO
          //IMPORTANT
          //PACKING
          } else {
            this.preDots.push(mesh)

            // this.object.add(mesh);
                                      // this.lowResObject.add(mesh)
            // this.object.add(mesh)
  
  // console.log("THISOBJECT", this.object)
  
  scene.remove(mesh)
          }
          
  
  
  
      
    }
      


    Flower.prototype.addPackingMesh = function(geom, material, object, axis, vector, j, that) {
           
      var mesh = new THREE.Mesh(geom, material);
     //  var transfoMatrix = this.translateAndReorient(axis, vector);
     //  mesh.matrix = transfoMatrix;
      mesh.matrixAutoUpdate = true;
      
          let name = Date.now()+this.randoms[6]
      mesh.name = name
          
       mesh.rotation.z =  2 * Math.PI * (this.flowerParameters[j].rotation / 360);    
       mesh.updateWorldMatrix(false, true)
     // }
 
 
     
         //  console.log('yeehoo!')
      scene.add(mesh)
      
      const raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1));
     
      const intersects = raycaster.intersectObjects( scene.children );
 
          let zPoint = 0;
          
  for ( let i = 0; i < intersects.length; i ++ ) {
 
    if (intersects[i].object.name = name){
 
    zPoint = intersects[i].point.z
    }
 
  }
          console.log("ZPOINT", zPoint)
          
  if (this.flowerType !== "zinnia" && this.flowerType !== "dahlia" && this.flowerType !== "lotus" && this.flowerType !== "camelia" && this.flowerType !== "rose"){
   if(zPoint > 0){
            mesh.position.z = mesh.position.z-zPoint + this.flowerParameters[j].flowerGeomOffset
            mesh.updateWorldMatrix(false, true)
          } else if (zPoint < 0){
            mesh.position.z = mesh.position.z+Math.abs(zPoint-0.1) + this.flowerParameters[j].flowerGeomOffset
            mesh.updateWorldMatrix(false, true)
          } else {
            mesh.position.z = mesh.position.z+this.flowerParameters[j].flowerGeomOffset
            mesh.updateWorldMatrix(false, true)
          }
 
         //  console.log("BBOX", this.lastBboxMin)
                  if(this.lastBboxMin!=0){
                   mesh.position.z = mesh.position.z + Math.abs(this.lastBboxMin/100)
                   mesh.updateWorldMatrix(false, true)
          
          if(this.lastBboxMin > geom.boundingBox.min.z){
         //   console.log("BBOX", true)
            mesh.position.z = mesh.position.z + Math.abs(this.lastBboxMin - geom.boundingBox.min.z) + 0.02
            mesh.updateWorldMatrix(false, true)
          }
                    
                    this.lastBboxMin = geom.boundingBox.min.z
          
        } else {
          this.lastBboxMin = geom.boundingBox.min.z
        }
  }        
 
  
          
          
      let cneterPoint = this.getCenterPoint(mesh)
     //  console.log(cneterPoint)
 
          
     // console.log("MATSETTINGS", )

     if(that.materialSettings[j].generateDots){
       // scene.remove(mesh)
     //  let newmesh = that.generateDots(mesh,material,that.materialSettings[j], that.dotsSettings, that )
     //  scene.remove(mesh)
     //  mesh.geometry.dispose()
    //  if(trueReduction){
    //    this.object.add(mesh);    //does not move to the worker
    //  } else {
       this.packingObject.add(mesh); //will be packed
      //  this.packingObject.push(mesh)   //later moves to the worker and has dots put on it
       // this.object.add(mesh);
    //  }
     
      
      scene.remove(mesh)
     //  disposeHierarchy (mesh, disposeNode);
     //  this.object.add(newmesh);
     } else {


      //  if(trueReduction){
      //    this.object.add(mesh);   //does not move to the worker
      //  } else {
         this.packingObject.add(mesh); //will be packed
        //  this.preDots.push(mesh)  //later moves to the worker and has dots put on it
         // this.object.add(mesh);
      //  }
       // this.object.add(mesh);

// console.log("THISOBJECT", this.object)

scene.remove(mesh)
     }
     



 
}



Flower.prototype.addTransReorientedMesh = function(geom, material, object, axis, vector, j, that) {
           
                
  
  
        
           var mesh = new THREE.Mesh(geom, material);
          //  var transfoMatrix = this.translateAndReorient(axis, vector);
          //  mesh.matrix = transfoMatrix;
           mesh.matrixAutoUpdate = true;
           
               let name = Date.now()+this.randoms[6]
           mesh.name = name
               
          //  console.log(window.parameters)
          //  console.log(window.parameters[j])
      
          //  console.log(j)
          //  console.log("ADD MESH")
      
          // if(that.flowerType == "zinnia" && that.flowerType == "dahlia" && that.flowerType == "lotus" && that.flowerType == "camelia" && that.flowerType == "rose"){
          //   // mesh.rotation.y =  mesh.rotation.y +(270 / (Math.PI * 180)) 
          //   mesh.up.set(0,1,0)
          // } else {
            mesh.rotation.z =  2 * Math.PI * (this.flowerParameters[j].rotation / 360);    
            mesh.updateWorldMatrix(false, true)
          // }
      
      
          
              //  console.log('yeehoo!')
           scene.add(mesh)
           
           const raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,-1));
          
           const intersects = raycaster.intersectObjects( scene.children );
      
               let zPoint = 0;
               
       for ( let i = 0; i < intersects.length; i ++ ) {
      
         if (intersects[i].object.name = name){
      
         zPoint = intersects[i].point.z
         }
      
       }
               console.log("ZPOINT", zPoint)
               
       if (this.flowerType !== "zinnia" && this.flowerType !== "dahlia" && this.flowerType !== "lotus" && this.flowerType !== "camelia" && this.flowerType !== "rose"){
        if(zPoint > 0){
                 mesh.position.z = mesh.position.z-zPoint + this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               } else if (zPoint < 0){
                 mesh.position.z = mesh.position.z+Math.abs(zPoint-0.1) + this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               } else {
                 mesh.position.z = mesh.position.z+this.flowerParameters[j].flowerGeomOffset
                 mesh.updateWorldMatrix(false, true)
               }
      
              //  console.log("BBOX", this.lastBboxMin)
                       if(this.lastBboxMin!=0){
                        mesh.position.z = mesh.position.z + Math.abs(this.lastBboxMin/100)
                        mesh.updateWorldMatrix(false, true)
               
               if(this.lastBboxMin > geom.boundingBox.min.z){
              //   console.log("BBOX", true)
                 mesh.position.z = mesh.position.z + Math.abs(this.lastBboxMin - geom.boundingBox.min.z) + 0.02
                 mesh.updateWorldMatrix(false, true)
               }
                         
                         this.lastBboxMin = geom.boundingBox.min.z
               
             } else {
               this.lastBboxMin = geom.boundingBox.min.z
             }
       }        
      
       
               
               
           let cneterPoint = this.getCenterPoint(mesh)
          //  console.log(cneterPoint)
      
               
          // console.log("MATSETTINGS", )
  
          if(that.materialSettings[j].generateDots){
            // scene.remove(mesh)
          //  let newmesh = that.generateDots(mesh,material,that.materialSettings[j], that.dotsSettings, that )
          //  scene.remove(mesh)
          //  mesh.geometry.dispose()
          if(trueReduction){
            this.object.add(mesh);    //does not move to the worker
          } else {
            this.lowResObject.add(mesh); //will be packed
            this.preDots.push(mesh)   //later moves to the worker and has dots put on it
            // this.object.add(mesh);
          }
          
           
           scene.remove(mesh)
          //  disposeHierarchy (mesh, disposeNode);
          //  this.object.add(newmesh);
          } else {


            if(trueReduction){
              this.object.add(mesh);   //does not move to the worker
            } else {
              this.lowResObject.add(mesh); //will be packed
              this.preDots.push(mesh)  //later moves to the worker and has dots put on it
              // this.object.add(mesh);
            }
            // this.object.add(mesh);
  
  // console.log("THISOBJECT", this.object)
  
  scene.remove(mesh)
          }
          
  
  
  
      
    }
      
Flower.prototype.generateDots = function(mesh, meshMaterial, settings, paramChoice, that){
          console.log("SETTINGS", settings)
  
  
  
  //COLOR GUIDANCE:
  //settings.color3 is the accent color, it is NOT present already on the flower.
  //settings.color1 is the first gradient color
  //settings.color2 is the second gradient color
  
  
         let colorChoiceArray = [ settings.color3Prod, settings.color1Prod, settings.color2Prod ]
         let colorChoice = colorChoiceArray[Math.floor(fxrand()*colorChoiceArray.length)];
         let dotMaterial = new THREE.MeshPhysicalMaterial({color:new THREE.Color(colorChoice), side:THREE.DoubleSide})
         
         dotMaterial.name = "dotMaterial" + fxrand()
  
  
  //         const box = new THREE.Box3();
  //         mesh.geometry.computeBoundingBox();
  //         box.copy( mesh.geometry.boundingBox ).applyMatrix4( mesh.matrixWorld );
  // console.log("BBOX", box)
  
  let nonIndexed = mesh.geometry //.toNonIndexed()
  console.log(nonIndexed)
  
  
  let clone = new THREE.Object3D()
  
  let dotsNumber = paramChoice.dotNumber
  let max = paramChoice.maxSize
  
  
  for (var i=0; i<dotsNumber; i++){
  
  let sphereContainer = new THREE.Object3D()
  
  
  let randIndex = Math.floor(fxrand()*(nonIndexed.attributes.position.array.length/3))
  console.log(randIndex)
  
  let rand = (fxrand()/2)+0.3
  
  //SPHERE IS A CYLINDER THAT INTERSECTS WITH THE FLOWER TO FORM THE DOTS
  
          let sphere = new THREE.Mesh(new THREE.CylinderBufferGeometry(
            
            rand*max, //radiustop //used to be 0.04
            0.001,  //radiusbottom //used to be 0.04
            0.8,  //height
            16, //radialsegments
            1, //heightsegments
            true //openEnded
            ), dotMaterial)
        
  sphere.rotation.x = 90*(Math.PI/180)
  sphereContainer.add(sphere)
  
  
  sphereContainer.lookAt(nonIndexed.attributes.normal.array[(randIndex*3)+0], 
  nonIndexed.attributes.normal.array[(randIndex*3)+1], 
  nonIndexed.attributes.normal.array[(randIndex*3)+2])
  
          
  sphereContainer.position.z = nonIndexed.attributes.position.array[(randIndex*3)+2]+mesh.position.z
          // console.log(nonIndexed.attributes.position.array[(randIndex*3)+2])
          sphereContainer.position.y = nonIndexed.attributes.position.array[(randIndex*3)+1]+mesh.position.y
          sphereContainer.position.x = nonIndexed.attributes.position.array[(randIndex*3)]+mesh.position.x
          // console.log(nonIndexed.attributes.position.array[(randIndex*3)+1])
          sphereContainer.updateMatrix();
          // console.log(sphereContainer)
  
  clone.add(sphereContainer)
  }
  
  
  let newmesh = new THREE.Object3D()
  
  
          let geoms=[]
          let meshes=[]
          clone.updateMatrixWorld(true,true)
          clone.traverse(e=>e.isMesh && meshes.push(e) && (geoms.push(( e.geometry.index ) ? e.geometry.toNonIndexed() : e.geometry().clone())))
          geoms.forEach((g,i)=>g.applyMatrix4(meshes[i].matrixWorld));
          let gg = BufferGeometryUtils.mergeBufferGeometries(geoms,true)
          gg.applyMatrix4(clone.matrix.clone().invert());
          gg.userData.materials = meshes.map(m=>m.material)
  
  
  
  let sphere = new THREE.Mesh(gg, dotMaterial)
      
  console.log(gg)
  
  geoms.forEach(geom => {
    // geom.dispose()
    // disposeHierarchy (geom, disposeNode);
    
  })
  
  meshes.forEach(mesh=>{
    // mesh.geometry.dispose()
    // mesh.material.dispose()
    disposeHierarchy (mesh, disposeNode);
    mesh = 0
  })
  
  clone = 0
  
  
  
          function doCSG(a,b,op,mat,mat1=mat){
          let bspA = CSG.fromMesh( a, 0);
          let bspB = CSG.fromMesh( b, 1);
          let bspC = bspA[op]( bspB );
          // console.log(bspC)
          let result = CSG.toMesh( bspC, a.matrix );
          result.material = mat;
          // result.castShadow  = result.receiveShadow = true;
  
          return result;
          
      }
  
  
      let before4 = Date.now()
  let newunion = doCSG(mesh,sphere,'newunion',meshMaterial)
  
          let after4 = Date.now()
          console.log("NEWUNION", "TIME", after4 - before4, that.flowerType)
  
  
          let before6 = Date.now()
  let newintersect = doCSG(mesh,sphere,'newintersect',dotMaterial)
      let after6 = Date.now()
      console.log("NEWINTERSECT", "TIME", after6 - before6, that.flowerType)
  
  
      // sphere.geometry.dispose()
      // sphere.material.dispose()
      disposeHierarchy (sphere, disposeNode);
  sphere = 0;
  // mesh.geometry.dispose()
  // mesh.material.dispose()
  disposeHierarchy (mesh, disposeNode);
  mesh = 0;
  
          newmesh.add(newintersect)
          newmesh.add(newunion)
  
    // }
  
  
  
          // console.log("GENERATEDOTS", mesh)
  
          return newmesh
    }
      
Flower.prototype.chooseStructure = function(){
        let structureType
        // let sphereical = fxrand() < 0.5 ? true : false;
            let flowerType = "2Layer"
            this.flowerLayers = "is2Layer"
            this.flowerNum=2
            // if (sphereical){
            //   let dahlia = fxrand() < 0.5 ? true : false;
            //   if (dahlia){
            //   this.flowerNum = 1
            //   flowerType = "dahlia"
            //   this.flowerLayers = ""
            //   } else {
            //   this.flowerNum = 1
            //   flowerType = "zinnia"
            //   this.flowerLayers = ""
            //   }
            // } else {
            //   let oneLayer = fxrand() < 0.5 ? true : false;
            //   if(oneLayer){
            //     flowerType="1Layer"
            //     this.flowerLayers = ""
            //     this.flowerNum = 1
            //   } else {
      
            //     let collection = fxrand() < 0 ? true : false;
            //     if (collection){
      
            //       // let collectionType = fxrand()
            //       // let Layer1 = collectionType < 0.3333333333333 ? true : false;
            //       // let Layer2 = collectionType > 0.3333333333333 && collectionType < 0.66666666666666 ? true : false;
            //       // let Layer2Scale = collectionType > 0.66666666666666 ? true : false;
      
            //       // Layer1 = false
            //       // Layer2 = false
            //       // Layer2Scale = true
      
            //       // if(Layer1){
            //       //   flowerType="1Layer-collection1"
            //       // }
      
            //       // if(Layer2Scale){
            //       //   flowerType="1Layer-collection2-scale"
            //       // }
      
            //       // if(Layer2){
            //       //   flowerType="1Layer-collection2"
            //       // }
      
            //       // let collectionTypes = ["1Layer-collection1", "1Layer-collection2-scale", "1Layer-collection2", "1Layer-collection2-scale2"]
                  
            //       // let FlowerTypeChoice = ["1Layer-collection2-scale", "1Layer-collection2", "1Layer-collection2-scale2", "1Layer", "dahlia", "zinnia", "2Layer"]
                  
            //       let collectionTypes = ["1Layer-collection2-scale", "1Layer-collection2", "1Layer-collection2-scale2"]
            //       flowerType = collectionTypes[Math.floor(fxrand()*collectionTypes.length)];
            //       this.flowerLayers = ""
            //       this.flowerSpire = true;
                  
            //       this.flowerNum = 1
            //     } else {
            //       //do nothing, flower is 2layer
            //       flowerType = "2Layer"
            //       this.flowerNum = 2
            //       this.flowerLayers = "is2Layer"
      
      
      
            //     }
      
                
            //   }
      
              
            // }
      
      
            // this.flowerNum = 2
            // flowerType = "2Layer"
      
           // "1Layer-collection2" // not very good
      
            // flowerType = "1Layer-collection2-scale-Helix"
            // flowerType = "1Layer-collection2-scale2" //good
            //"1Layer-collection2-scale" //single helix?!?!
      
      
            // flowerType = "2Layer"
            // this.flowerSpire = false;
            //     this.flowerNum = 2
            //     this.flowerLayers = "is2Layer"
      
      
      
            // flowerType = "1Layer-collection2-scale2"
            // this.flowerSpire = true;
            // this.flowerNum = 1
            // this.flowerLayers = ""
      
      
            // let FlowerTypeChoice = ["1Layer-collection2-scale", "1Layer-collection2", "1Layer-collection2-scale2", "1Layer", "dahlia", "zinnia", "2Layer"]
            
      
            // let FlowerTypeChoice = ["1Layer"]
            // let FlowerTypeChoice = ["1Layer", "2Layer"]
      
            let FlowerTypeChoice = flowerForms
      
            //  let FlowerTypeChoice = [ "1Layer-collection2-scale2",  "1Layer-collection2-scale-Helix", "1Layer", "2Layer", "dahlia", "zinnia", "rose", "camelia" ] //"lotus"
                  
            //below is all flowers
            // let FlowerTypeChoice = [ "1Layer-collection2-scale2",  "1Layer-collection2-scale-Helix", "1Layer", "2Layer", "dahlia", "zinnia", "rose", "camelia", "lotus" ] 
                 
                 
                   // let FlowerTypeChoice = ["1Layer", "2Layer", "dahlia", "zinnia", "rose", "camelia", "lotus"]
            // let FlowerTypeChoice = [ "1Layer-collection2-scale2", "1Layer-collection2-scale-Helix" ] //"lotus"     "1Layer-collection2-scale-Helix" -> DOES NOT GENERATE PROPERLY
            // let FlowerTypeChoice = ["1Layer-collection2-scale2"]
      
            // let FlowerTypeChoice = [ "1Layer-collection2-scale2",  "1Layer-collection2-scale-Helix" ]
      
      
      
      //"1Layer-collection1", "1Layer-collection2-scale", "1Layer-collection2",
            // let FlowerTypeChoice = ["1Layer-collection2-scale", "1Layer-collection2", "1Layer-collection2-scale2", "1Layer-collection1", "1Layer-collection2-scale-Helix", "1Layer", "2Layer", ]
            flowerType = FlowerTypeChoice[Math.floor(fxrand()*FlowerTypeChoice.length)];
      
      
            if (fxrand()<0.5){
                     this.flowerNum = 2
            this.flowerLayers = "is2Layer"
            } else {
                    this.flowerNum = 1
            this.flowerLayers = ""
            }
      
      
            switch(flowerType){
              case "1Layer-collection2-scale":
                      this.flowerSpire = true;
                      window.flowerSpire = true;
            this.flowerNum = 1
            this.flowerLayers = ""
                break;
      
                case "1Layer-collection2":
                        this.flowerSpire = true;
                        window.flowerSpire = true;
            this.flowerNum = 1
            this.flowerLayers = ""
                  break;
      
                  case "1Layer-collection2-scale2":
                          this.flowerSpire = true;
                          window.flowerSpire = true;
            this.flowerNum = 1
            this.flowerLayers = ""
                    break;
  
                    case "1Layer-collection2-scale-Helix":
                    this.flowerSpire = true;
                          window.flowerSpire = true;
            // this.flowerNum = 1
            // this.flowerLayers = ""
                      break;
      
                    case "1Layer":
            this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
                      break;
      
                      case "dahlia":
                              this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
            this.spherical = true;
                        break;
      
                        case "zinnia":
                                this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
            this.spherical = true;
      
                          break;
      
                          case "camelia":
                              this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
            this.spherical = true
                        break;
      
                        case "rose":
                                this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
            this.spherical = true
      
                          break;
      
                          case "lotus":
                                this.flowerSpire = false;
            this.flowerNum = 1
            this.flowerLayers = ""
            this.spherical = true
      
                          break;
      
                          case "2Layer":
                                  this.flowerSpire = false;
            this.flowerNum = 2
            this.flowerLayers = "is2Layer"
                            break;
                        
      
            }
      
            // this.flowerNum = 2
            // this.flowerLayers = "is2Layer"
      
      
            //       flowerType = "1Layer-collection1"
            // this.flowerSpire = true;
            // this.flowerNum = 1
            // this.flowerLayers = ""
      
              //       this.flowerNum = 1
              // // flowerType = "dahlia"
              // flowerType = "dahlia"
              // this.flowerLayers = ""
              // this.flowerSpire =false
      
      
            //   this.flowerSpire = false;
            // this.flowerNum = 1
            // this.flowerLayers = ""
            // this.spherical = false
            // this.flowerType = "1Layer"
            // flowerType = "1Layer"
      
            structureType = flowerType
        return structureType
    }
      
Flower.prototype.chooseFlower = function(){
      
    }
      
Flower.prototype.chooseCollection = function(){
      
    }
      
Flower.prototype.generateGeometry = function(){
      
    }
         
Flower.prototype.getMaterial = function(params, stalk=false){
      
      
      
      
        if(!window.generateShaderMaterials){
      
      
      if(window.generateMaterials){
      
      
      
      
      
      
      
      let canvas = document.createElement("canvas")
      let dimensionheight = 200
      let dimensionwidth = 200
      canvas.height = dimensionheight
      canvas. width = dimensionwidth
      canvas.id = "myCanvas"
      document.body.appendChild(canvas)
      
      
      
      
      // console.log("PARAMS", params)
      
      
      
      // let colorBufferArray = new Uint8Array(colorBuffer)
      // geometry.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);
      
      // var uvTex	= new THREE.TextureLoader().load( "https://threejs.org/examples/textures/uv_grid_opengl.jpg" );
      
      
      
      // var material01 = new THREE.MeshBasicMaterial( {  map: uvTex,   side: THREE.DoubleSide, } );
      
      
      var c = document.getElementById("myCanvas");
      var ctx = c.getContext("2d");
      
      // Create gradient
      
      let grd
      
      if(stalk){
        grd = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
      } else {
        grd = ctx.createLinearGradient(0, 0, 0, dimensionheight);
      }
      
      
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
      
      // if(this.spherical){
      
      
      // if (params.color1.value.r !== params.color3.value.r || params.color1.value.g !== params.color3.value.g || params.color1.value.b !== params.color3.value.b){
      // console.log("color 1 and 3 are different colors!")
      // grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      // grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
      // ctx.fillStyle = grd;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // let horizgradient = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
      // horizgradient.addColorStop(0, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.8)`);
      // horizgradient.addColorStop(1, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.0)`);
      // ctx.fillStyle = horizgradient;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionwidth);
      
      // } else if (params.color1.value.r !== params.color2.value.r || params.color1.value.g !== params.color2.value.g || params.color1.value.b !== params.color2.value.b){
      // console.log("color 1 and 2 are different colors!")
      // grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      // grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
      // ctx.fillStyle = grd;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // let horizgradient = ctx.createLinearGradient(0, 0, dimensionwidth, 0);
      // horizgradient.addColorStop(0, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.8)`);
      // horizgradient.addColorStop(1, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.0)`);
      // ctx.fillStyle = horizgradient;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionwidth);
      
      // } else {
      // console.log("all colors are the same")
      // }
      
      // } else {
      
      // console.log("NOT SPHERICAL")
      
      if(stalk){
        if (params.color1.value.r !== params.color3.value.r || params.color1.value.g !== params.color3.value.g || params.color1.value.b !== params.color3.value.b){
      // console.log("color 1 and 3 are different colors!")
      grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
      horizgradient.addColorStop(0, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
      horizgradient.addColorStop(0.5, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.0)`);
      horizgradient.addColorStop(1, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
      // ctx.fillStyle = horizgradient;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      } else if (params.color1.value.r !== params.color2.value.r || params.color1.value.g !== params.color2.value.g || params.color1.value.b !== params.color2.value.b){
      // console.log("color 1 and 2 are different colors!")
      grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
      horizgradient.addColorStop(0, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
      horizgradient.addColorStop(0.5, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.0)`);
      horizgradient.addColorStop(1, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
      // ctx.fillStyle = horizgradient;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      } else {
      // console.log("all colors are the same")
      }
      } else {
      //   if (params.color1.value.r !== params.color3.value.r || params.color1.value.g !== params.color3.value.g || params.color1.value.b !== params.color3.value.b){
      // console.log("color 1 and 3 are different colors!")
      // grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      // grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
      // ctx.fillStyle = grd;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
      // horizgradient.addColorStop(0, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
      // horizgradient.addColorStop(0.5, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 0.0)`);
      // horizgradient.addColorStop(1, `rgba(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255}, 1.0)`);
      // // ctx.fillStyle = horizgradient;
      // // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // } else if (params.color1.value.r !== params.color2.value.r || params.color1.value.g !== params.color2.value.g || params.color1.value.b !== params.color2.value.b){
      // console.log("color 1 and 2 are different colors!")
      grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
      grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // let horizgradient = ctx.createLinearGradient(0, 0, 16384, 0);
      // horizgradient.addColorStop(0, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
      // horizgradient.addColorStop(0.5, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 0.0)`);
      // horizgradient.addColorStop(1, `rgba(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255}, 1.0)`);
      // ctx.fillStyle = horizgradient;
      // ctx.fillRect(0, 0, dimensionwidth, dimensionheight);
      
      // } else {
      // console.log("all colors are the same")
      
      }
  
  
  
  
      //STAMEN STRIPES
                                  // BEGIN VERT LINES
                              // 	for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/10)) {
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
  
                          //BEGIN HORIZ LINES
                              // for (var i = 1; i <=dimensionwidth; i+=(dimensionwidth/10)) {
                              // ctx.beginPath(); // Start a new path) {
                              // ctx.beginPath(); // Start a new path
                              // ctx.moveTo(6+i, 0); // Move the pen to (30, 50)
                              // ctx.lineTo(6+i, dimensionwidth); // Draw a line to (150, 100)
                              // ctx.lineWidth = 10;
                              // ctx.strokeStyle = "white";
                              // ctx.stroke(); // Render the path
                              // 	}
      
      
      
      // }
      
      
      
      
      // Fill with gradient
      
      
      
      
      
      
      
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
      } else {
      
      
      console.log("ERROR!!","YOU NEED TO UPDATE THIS TO GENERATE A BLANK MATERIAL!!")
      
      
      }
      
      } else {
      
      
      
      
      //   console.log("MATERIALOP", "get material!")
      
        return new THREE.MeshPhysicalMaterial({
            // roughness: 1,
            // metalness: 0,
            side: THREE.DoubleSide,
            onBeforeCompile: shader => {
              shader.uniforms.bbMin = params.bbMin;
              shader.uniforms.bbMax = params.bbMax;
              shader.uniforms.color1 = params.color1;
              shader.uniforms.color2 = params.color2;
              shader.uniforms.color3 = params.color3;
              shader.uniforms.color4 = params.color4;
              shader.uniforms.vertOffset = params.vertOffset;
              shader.uniforms.centerSize = params.centerSize;
              shader.uniforms.centerSize2 = params.centerSize2;
              shader.uniforms.f3Offset = params.f3Offset;
              shader.uniforms.topf2 = params.topf2; // conditional
              shader.uniforms.vertCenterGradient = params.vertCenterGradient; // conditional
              shader.uniforms.lowlights = params.lowlights; //conditional
              shader.uniforms.subtleFade = params.subtleFade; //conditional
              shader.uniforms.defaultFade = params.defaultFade; // conditional
              // console.log(shader.uniforms)
              shader.vertexShader = `
              varying vec2 vUv;
              varying vec3 vPos;
              uniform float u_time;
            ${shader.vertexShader}
          `.replace(
                `#include <begin_vertex>`,
                `#include <begin_vertex>
          vPos = transformed;
          vUv = uv;
          `
              );
              shader.fragmentShader = `
            uniform vec3 bbMin;
            uniform bool vertCenterGradient;
            uniform bool lowlights;
            uniform bool subtleFade;
            uniform bool topf2;
            uniform bool defaultFade;
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
            
            ${shader.fragmentShader}
          `.replace(
                `vec4 diffuseColor = vec4( diffuse, opacity );`,
                `
            
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
      
            
            if(defaultFade){
            
              if(topf2){
                f2 = clamp((vPos.x - bbMin.x) / (bbMax.x - bbMin.x), 0., 1.);
              } else {
                f2 = clamp(vUv.x, 0., 1.);
              }
            
              col = mix(color3, col, f2);
              //f2 is default
            }
            
            
            
            
            
                vec4 diffuseColor = vec4( col, opacity );`
                
              );
      
      
      
            }
          })
      }    
          
    }
      
      