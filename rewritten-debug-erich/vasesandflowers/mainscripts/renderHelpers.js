function savePngOld(){
  
  console.log("savePngOld")
  let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', `${document.getElementById("hash").innerText}.png`);
    let canvas = document.getElementById('threeJsCanvas');
    // var context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }

function render() {

  document.getElementById("sampleCount").innerText = ptRenderer.samples

if(savePngAuto){

  if(window.ptReady){
          if(samples > maxSamplerefresh){
            // console.log("more than 10 samples")
           
            if(window.pngSaved){
              console.log("save png already")


            } else {
              console.log("saving new png")
              savePngOld();
            }
            
            // window.readySave = true
                  location.reload();
                  window.location.href = window.location.href;
                  history.go(0);
                  window.pngSaved = true
            // samples = 0;
          }

          samples++
        

        }
        }
    
          controls.update();
          // for(var i=0; i<2; i++){
    
            if(window.raytrace){
              if(window.ptReady){

              
    
              // requestAnimationFrame( animate );
    
    camera.updateMatrixWorld();
    
    // if ( window.raytrace ) {
    
    camera.focusDistance = camera.position.distanceTo( focusPoint ) - camera.near;
    
    // }
    
    ptRenderer.material.materials.updateFrom( sceneInfo.materials, sceneInfo.textures );
    ptRenderer.material.physicalCamera.updateFrom( camera );
    
    
    ptRenderer.update();
    
    if ( ptRenderer.samples < 1 ) {
    
      renderer.render( scene, camera );
    
    }
    
    
    
    renderer.autoClear = false;
    fsQuad.material.map = ptRenderer.target.texture;  
    fsQuad.render( renderer );
    renderer.autoClear = true;
  }
                    } else {
  
                      //render the scene in normal threejs.
  
      renderer.render(scene, camera);
            }
    
    
    
    if(window.ptReady){

    
            requestAnimFrame(render);
    } else {
      renderer.render(scene, camera);
    }
    
          // controls.update();
         


            
          if(snap) {
            snap = false;


            const cav = document.querySelector('#threeJsCanvas');
            const base64 = cav.toDataURL('img/png');
            let image = document.createElement("img")

            // image.src = base64;
            // document.body.appendChild(image)
            console.log("saved image!")

            const base641 = base64.split(',')[1];
            // console.log('Base64 is', base641); // Base64 is iVBORw0KGgoAAAANSUh...
            const bytes = atob(base641); // Base64 Decode
            // console.log('Bytes are', bytes); // Bytes are <Some binary data>
            const png = new PNGReader(bytes);
            png.parse((err, png) => {
              console.log('Pixels are', png); // Pixels are Buffer{0: 255, 1: 0, 2: 65, ...
              document.querySelector(':root').style.setProperty('--page-bg', "rgb("+png.pixels[0]+","+png.pixels[1]+","+png.pixels[2] +")");
            });





            snap = false;
          }

        }


async function buildSceneRender(){

  window.ptReady = true

if(window.flowerSpire){
      //if the scene contains a spire:



      resettoDefReal()


} else {

      //if the scene does not contain a spire: 
      resettoDef()
}
// resettoDefReal()


  
  
      // scene.background = new THREE.Color( 0xff0000 );
  
    //   console.log("GENERATE", "BUILDING!")
    
    
      if(!window.planePresent && generatePlane){
      var geo = new THREE.PlaneBufferGeometry(window.planeSize, window.planeSize, 1, 1);
    var mat = new THREE.MeshLambertMaterial({ color: 0xaeaeae, side: THREE.DoubleSide, receiveShadow: true, castShadow: true });
    mat.name = "planeMaterial"
    // console.log("MATERIALOP", "new!")
    var plane = new THREE.Mesh(geo, mat);
    plane.position.z = -0.6
    plane.receiveShadow = true;
    
    console.log("added plane!")
    scene.add(plane); 
    window.planePresent = true;



    const sphere1 = new THREE.SphereGeometry( 0.3, 32, 16 );
    const material2 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    console.log("MATERIALOP", "new!")

    // const sphere1 = new THREE.SphereGeometry( 1, 32, 16 );
    const sphere1Mesh = new THREE.Mesh( sphere1,material2 );
    scene.add( sphere1Mesh );
    sphere1Mesh.position.set(window.planeSize/2, -window.planeSize/2, -0.6)
    const sphere2Mesh = new THREE.Mesh( sphere1,material2 );
    sphere2Mesh.position.set(-window.planeSize/2, window.planeSize/2, -0.6)
    scene.add( sphere2Mesh );
    const sphere3Mesh = new THREE.Mesh( sphere1,material2 );
    sphere3Mesh.position.set(window.planeSize/2, window.planeSize/2, -0.6)
    scene.add( sphere3Mesh );
    const sphere4Mesh = new THREE.Mesh( sphere1,material2 );
    sphere4Mesh.position.set(-window.planeSize/2, -window.planeSize/2, -0.6)
    scene.add( sphere4Mesh );





    }
    
    let sceneMaterials = []
    
    let sceneMaterialNames = []
    let uniqueMaterials = []
    let uniqueUUIDS = []
    
    let uniqueMaterialNames = []
    
    scene.traverse(n => { 
                  
                  if(n.type=="Mesh"){
    
                    sceneMaterials.push(n.material)
    
                    if(!sceneMaterialNames.includes(n.material.name)){
                      uniqueMaterialNames.push(n.material.name)
                      uniqueUUIDS.push(n.material.uuid)
                      uniqueMaterials.push(n.material)
                      sceneMaterialNames.push(n.material.name)
                    } else {
                      // n.material = 
    
                      // console.log(n.material)
                      let materialname = Object.freeze(n.material.name)
    
                      // n.material.dispose()
                      disposeHierarchy (n, disposeNode);
                      // console.log(n.material)
                      n.material = uniqueMaterials[uniqueMaterialNames.indexOf(materialname)]
                      // console.log(n.material.uuid)
                      // console.log("replaced materials")
                      sceneMaterialNames.push(materialname)
    
                    }
    
                    
    
    
                // scene.remove(n)
                // sceneitems.push(n)
                  }
                    })
    
                    window.uniqueUUIDS = uniqueUUIDS
                    window.uniqueMaterials = uniqueMaterials
    
    
                    console.log("UNIQUEMATERIALS", uniqueMaterials)
                    console.log("UNIQUENAMES", uniqueMaterialNames)
                    // console.log("SCENEMATERIALS", sceneMaterials)
    
              // a = scene.materials
    
              // for (var z=0; z<a.length;z++){
              //         if(a[z].name==""){
              //             a[z].name = "unnamed"
              //         }
              //         console.log(a[z].name)
              //     }
    
              //     // console.log()
    
              // console.log(scene)
    
    
    //merge all of these things into one geometry?
    
    
    window.flowersArray.length = 0;
    window.finishedFlowers.length = 0;
    
    // console.log("DONE PLACING FLOWERS")
    // console.log("finished flower placement")
    
    
    // window.workers.forEach(worker=>{
    //   worker.terminate();
    //   delete worker;
    // })
    

    


      

      // delete window.dotworkers[i]
    // }

    for (var i=0; i<window.vaseWorkers.length; i++){
        if(window.vaseWorkers[i]){
      window.vaseWorkers[i].terminate()
        }
      delete window.vaseWorkers[i]
    }
    
    // console.log('deleted workers!')
    
    document.getElementById("loading").style.display = "none"
    
    // window.vaseWorkers.forEach()
    
    if(window.raytrace){
      // if(false){ //REMOVE THIS LINE AND UNCOMMENT ABOVE LINE TO RENDER PROPERLY // TODO
    
      window.convexHulls.forEach(hull => {
      scene.remove(hull)

    })
    
    //   console.log("raytrace is true!")
    
    
    scene.updateMatrixWorld();
    
    // console.log("updated scene matrix")
    
    // initialize the scene and update the material properties with the bvh, materials, etc
    const generator1 = new BlurredEnvMapGenerator( renderer );
    // console.log("updated map generator")
    // console.log(window.mapping)
    const blurredEnvMap = generator1.generate( window.mapping, 0 );
    // console.log("blurred")
    
    const generator = new PathTracingSceneGenerator();
//USING WORKER: TODO: if worker not working, you know, lol.
//  const generator = new PathTracingSceneWorker();



    // console.log("generator")
    // console.log(scene)
    let lastpercent
    
    
    canvasworker1.postMessage({ update: "update", message: "Init BVH Generator" })

          // A 'slowDown' message we can catch in the worker to start heavy work
    


    const { bvh, textures, materials, lights } = await generator.generate( scene, { onProgress: v => {
    
    const percent = Math.floor( 100 * v );
    
    
    if(percent != lastpercent){
      // loading.innerText = `Building BVH : ${ percent }%`;
      // console.log(`Building BVH : ${ percent }%`);
      canvasworker1.postMessage({ update: "update", message: "Building BVH: " + percent + "%", type:"buildBVH", percent: percent})
    
    }
    
    
    if(percent == 100){
    //   console.log("removing canvas!")
      document.getElementById("loading").style.display = "none"
    //   canvasworker1.terminate()
    
    }
    
    lastpercent = percent
    
    } 
    
    } );
    
    sceneInfo = { bvh, textures, materials, lights }
    ptMaterial.bvh.updateFrom( bvh );
    ptMaterial.attributesArray.updateFrom(
      bvh.geometry.attributes.normal,
      bvh.geometry.attributes.tangent,
      bvh.geometry.attributes.uv,
      bvh.geometry.attributes.color,
    );
    
    ptMaterial.materialIndexAttribute.updateFrom( bvh.geometry.attributes.materialIndex );
    ptMaterial.textures.setTextures( renderer, 2048, 2048, textures );
    ptMaterial.materials.updateFrom( materials, textures );
    ptMaterial.lights.updateFrom( lights );

    ptRenderer.material.envMapInfo.updateFrom( window.mapping );
  
  if(transparentBG){
    ptRenderer.material.backgroundAlpha = 0;

  } else {

    //SET SCENE BACKGROUND MAP
  
    ptRenderer.material.envMapInfo.updateFrom( blurredEnvMap );
    // ptRenderer.material.envMapInfo.updateFrom( window.mapping );
    // 
  
    console.log("ENVMAPROTATION", ptRenderer.material.environmentRotation)
    
    
    
                ptRenderer.material.backgroundMap = window.textureBg
                ptRenderer.material.backgroundBlur = 0;

  }
  
  
      
scene.bakckground = null;
scene.environment = null;


if(transparentBG){

} else {
  scene.background = new THREE.Color( 0xffffff );
}




window.convexHulls.forEach(hull => {
scene.remove(hull)
})

render();
    
  
  
  
    // console.log("set env map")
    
    } else {
      //if window.not raytrace?
  
   
    }
    
    
    
    
    
    
    
    // } else {
    
  
    
    
  if (window.bvhInScene){
    
    
    
    
      window.convexHulls.forEach(hull => {
      scene.remove(hull)
    })
    
    
    const reggenerator = new PathTracingSceneGenerator();
    const { bvh, textures, materials, lights } = reggenerator.generate( scene );
    
    console.log(bvh, textures, materials, lights)
    
    
    let sceneitems = []
    
    scene.traverse(n => { 
                  
      if(n.type!="Scene" && n.type!="AmbientLight" && n.type!="HemisphereLight" && n.type!="SpotLight"){
    // scene.remove(n)
    sceneitems.push(n)
      }
     
                          // n.updateMatrix() 
                          // n.updateWorldMatrix(true, true)
            
            
                          // if ( n.name=="stamenMesh" ) {
                        // n.material.shading = THREE.SmoothShading;
                    // scene.remove(n)
                    // console.log(n)
                    // stamenGeoms.push(n.geometry)
                    // n.receiveShadow = true;
    
                  })
    
    sceneitems.forEach(item=>{

      if(item.type=="Mesh"){
        // item.geometry.dispose()
        disposeHierarchy (item, disposeNode);
        
      }

      scene.remove(item)

      item = 0;
    })
                  // console.log(sceneitems)
    
                  console.log("removed scene items!")
    
    let bvhgeometry = bvh.geometry
    let lastgroup = bvhgeometry.attributes.materialIndex.array[0]
    let lastindex = 0
    
    for (let i=0; i<bvhgeometry.attributes.materialIndex.array.length; i++){
    
      if(bvhgeometry.attributes.materialIndex.array[i]==lastgroup){
    
      } else {
        // console.log('NEW GROUP')
        bvhgeometry.addGroup(lastindex*3, (i*3)-(lastindex*3), lastgroup)
        // console.log(lastindex, i, lastgroup, bvhgeometry.attributes.materialIndex.array[i])
        lastindex = i
        lastgroup = bvhgeometry.attributes.materialIndex.array[i]
      }
    
    }
    
    // let serialized = MeshBVH.serialize(bvh)
    // console.log(serialized)
    
    // let bvhmesh = new THREE.Mesh(bvh.geometry, materials)
    console.log(bvhgeometry)
    let bvhmesh = new THREE.Mesh(bvhgeometry, materials)
    
    // let serialized = 
    // bvh.geometry.
    
    scene.add(bvhmesh)
    
    
    // exporter.parse(
    //   scene,
    //   // called when the gltf has been generated
    //   function ( gltf ) {
    
    //     console.log( gltf );
    //     // downloadJSON( gltf );
    
    //   },
    //   // called when there is an error in the generation
    //   function ( error ) {
    
    //     console.log( 'An error happened' );
    
    //   },
    //   // options
    // );
    
    
    const geometry = new THREE.SphereGeometry( 1, 32, 16 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    console.log("MATERIALOP", "new!")
    const sphere = new THREE.Mesh( geometry, material );
    scene.add( sphere );
    
                  
    render()
    
    
    
    
    } else {
  
  

      if(!window.raytrace){ //IMPORTANT: REMOVE IF YOU WANT THIS TO RENDER PROPERLY TODO


  
scene.bakckground = null;
scene.environment = null;


if(transparentBG){

} else {
  scene.background = new THREE.Color( 0xffffff );
}




window.convexHulls.forEach(hull => {
scene.remove(hull)
})

render();

}

    }
    
    
    
    
    
    
    // }
    
    
    
    
    
    
    



    canvasworker1.postMessage({ update: "update", message: [true], type:"rendering"})

    
    }
   
   function checkFinished(isVase = false){

    console.log("checkFinished!")

    let Fit = window.Fit
    
    //   console.log("GENERATE", "check finished!")
    
      if(isVase){
    window.vaseIndex++
    // console.log("GENERATE", "incrementing vases")
      }
    
      let states = []
      window.flowersArray.forEach((flower)=>{states.push(flower.finished)})
    
    //   console.log("flower finished!")
    //   console.log(states)
    
      function getOccurrence(array, value) {
        var count = 0;
        array.forEach((v) => (v === value && count++));
        return count;
    }
    
    // console.log(getOccurrence(states, true))
    
    // if ((window.flowersArray.length==(flowerLen) && getOccurrence(states, true)==flowerLen-1) || window.vaseWorkerStates.length == vaseIndexNumber){ //FOR VASES
      
      if(totalUniqueFlowers > 0 || vaseIndexNumber > 0){
        // console.log("GENERATE", "more than 0 flowers and vases")
      if ((window.flowersArray.length==(flowerLen) && getOccurrence(states, true)>=flowerLen-1)){
        // console.log("GENERATE", "placing flowers")
    



        if(PACK2D){

            let threeJSShapes = []

            window.flowersArray.shift();

            let flowerPlacementIndex = []

window.flowersArray.forEach(
    

    (flower)=>{ 
        
        // scene.add()
        // console.log(flower.SHAPEMESH)
        if(flower.SHAPEMESH != undefined){



            
            // scene.add(flower.SHAPEMESH)
        } else {
            // console.log("FLOWER UNDEFINED", Object.freeze(flower))
            // console.log("FLOWER UNDEFINED", Object.freeze(window.flowersArray))
        }
      


//SET DUPLICATE NUMBER OF FLOWERS 



        // if(flower.volume > 3){
        //     flower.duplicateNumber = 10
        // } else {
        //     flower.duplicateNumber = 20
            
        // }



        //flower.spherical
        //flower.flowerSpire
        //flower.flowerType

        if(gridSize < 801){

          //           switch(true){

          // case flower.volume>3:
          // // flower.duplicateNumber = 4
          // flower.duplicateNumber = 2
          // break;

          // case flower.volume<1:
          // // flower.duplicateNumber = 15
          // flower.duplicateNumber = 2
          // break;

          // case flower.volume<2:
          // // flower.duplicateNumber = 8
          // flower.duplicateNumber = 2
          // break;

          // case flower.volume<3:
          // // flower.duplicateNumber = 6
          // flower.duplicateNumber = 2
          // break;

          // case flower.volume<4:
          // flower.duplicateNumber = 2
          // // flower.duplicateNumber = 20
          // break;


          //       }

          switch(true){

case flower.volume>3:
// flower.duplicateNumber = 4
flower.duplicateNumber = 4 //used to be 3
break;

case flower.volume<1:
// flower.duplicateNumber = 15
flower.duplicateNumber = 14 //used to be 10
break;

case flower.volume<2:
// flower.duplicateNumber = 8
flower.duplicateNumber = 10 // used to be 8
break;

case flower.volume<3:
// flower.duplicateNumber = 6
flower.duplicateNumber = 4 //used to be 3
break;

case flower.volume<4:
flower.duplicateNumber = 3 // used to be 2
// flower.duplicateNumber = 20
break;


      }


        } else {
          switch(true){

case flower.volume>3:
// flower.duplicateNumber = 4
flower.duplicateNumber = 3
break;

case flower.volume<1:
// flower.duplicateNumber = 15
flower.duplicateNumber = 10
break;

case flower.volume<2:
// flower.duplicateNumber = 8
flower.duplicateNumber = 8
break;

case flower.volume<3:
// flower.duplicateNumber = 6
flower.duplicateNumber = 3
break;

case flower.volume<4:
flower.duplicateNumber = 2
// flower.duplicateNumber = 20
break;


      }
        }


        if(smallFlowers && gridSize > 1001){
          // console.log("MORE FLOWERS")

          switch(true){

case flower.volume>3:
// flower.duplicateNumber = 4
flower.duplicateNumber = 4
break;

case flower.volume<1:
// flower.duplicateNumber = 15
flower.duplicateNumber = 15
break;

case flower.volume<2:
// flower.duplicateNumber = 8
flower.duplicateNumber = 12
break;

case flower.volume<3:
// flower.duplicateNumber = 6
flower.duplicateNumber = 5
break;

case flower.volume<4:
flower.duplicateNumber = 4
// flower.duplicateNumber = 20
break;


      }

        }





        // console.log("SHAPE", flower.SHAPEVERTS)
        for(var i=0; i<flower.duplicateNumber; i++){
          let scale = Math.round(((fxrand()/2)+0.8)*10)/10
          // let scale = 0.5
          // console.log("SCALE", scale)

let shapeClone = flower.SHAPEVERTS
// console.log(shapeClone)
let shape = []

shapeClone.forEach(vertex=>{
shape.push({x:vertex.x, y:vertex.y, z:vertex.z})
})



// console.log(flower.SHAPEVERTS)

shape.forEach(vertex=>{
  vertex.x = vertex.x*scale
  vertex.y = vertex.y*scale
  vertex.z = vertex.z*scale
})

        threeJSShapes.push({shape:shape, scale:scale})
        flowerPlacementIndex.push({flowerNumber:flower.flowerIndexNumber, duplicates:flower.duplicateNumber, scale: scale})
        }


        // console.log("SHAPE", flower.SHAPEVERTS)

    })




let reductionNumberShape



if(smallFlowers && gridSize > 1000){
  reductionNumberShape = 0.3
} else {
  reductionNumberShape = 0.15
}



//default was 0.1




packFlowers(threeJSShapes, flowerPlacementIndex, reductionNumberShape)



} else if (GENERATORSTALK){






      window.flowersArray.shift();
    
      //first one used to be 2
    let boquetRadius = fxrand() < 0.5 ? RBR1 : RBR2
    




    //        _____  _               _____ _____ _   _  _____       ______ _      ______          ________ _____   _____  
    //       |  __ \| |        /\   / ____|_   _| \ | |/ ____|     |  ____| |    / __ \ \        / /  ____|  __ \ / ____| 
    //       | |__) | |       /  \ | |      | | |  \| | |  __      | |__  | |   | |  | \ \  /\  / /| |__  | |__) | (___   
    //       |  ___/| |      / /\ \| |      | | | . ` | | |_ |     |  __| | |   | |  | |\ \/  \/ / |  __| |  _  / \___ \  
    //       | |    | |____ / ____ \ |____ _| |_| |\  | |__| |     | |    | |___| |__| | \  /\  /  | |____| | \ \ ____) | 
    //       |_|    |______/_/    \_\_____|_____|_| \_|\_____|     |_|    |______\____/   \/  \/   |______|_|  \_\_____/  


    


//PLACING FLOWERS
//opportunity to sort flowers here, if you want to organize by volume, this is your chance :0
//maybe time to organize them spatially as well!!






      window.flowersArray.forEach(
        

    (flower)=>{

        canvasworker1.postMessage({ update: "update", message: "Placing flower: " + flower.flowerIndexNumber
 })

        // console.log("FLOWERFOREACH", flower)

    let generatorPosX = fxrand()*window.planeSize
    let generatorPosY = fxrand()*window.planeSize
    
    var a = window.planeSize/2 - generatorPosX;
    var b = window.planeSize/2 - generatorPosY;
    
    var c = Math.sqrt( a*a + b*b );
    
    var a1 = window.planeSize/2 - window.planeSize;
    var b1 = window.planeSize/2 - window.planeSize;
    
    var c1 = Math.sqrt( a1*a1 + b1*b1 );
    
    
    let copies = 1; // BUG: 
    let perStem = Math.ceil(fxrand()*1);
    // perStem = 2
    
    
    let heightRange = (fxrand()*5)+fxrand()*5;
    // let heightRange = (c1-c)/4
    
    // let heightRange = 10
    
    
    // let flowerScale = Math.floor(((((c1-c)/4)/120)/0.02)-0.015) + 0.01
    let flowerScale = 1
    
    // console.log("SCALESET", flowerScale, c1)
    let angleRange = (0.001)*(heightRange/3);
    // let angleRange = 0.00001
    // let angleRange = 0.0000000000001
    // let growthIter = 3000;
    let growthIter = heightRange*1000
    // let growthIter = (fxrand()*3000)
    // let growthIter = (fxrand()*3000) + 3000
    
    // d=√((x2 – x1)² + (y2 – y1)²)
    
    let stemPosition = {x: generatorPosX, y:generatorPosY}
    
    // console.log("CENTERDIST", this.coords.x, this.coords.y, )
    // console.log(window.flowersArray)
    
    // let generator = new Generator(scene, renderer, camera, window.flowersArray[0].objects[0], copies, perStem, angleRange, heightRange, growthIter, stemPosition, flowerScale, window.flowersArray[0].coords); //MAKE STEMS!s
    
    let meshes = []
    
    
    
    // console.log("THE FLOWER OBJECT", flower.objects[0])
    
    
    // scene.add(flower.objects[0])
    
    // console.log("flowerobjects", flower.objects)
    // console.log(flower.objects.length)
    
    






    
    
    
    // const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, opacity:0.3, transparent:true } );
    // const mesh = new THREE.Mesh( geometry, material );
    // scene.add( mesh );
    
    // consoledwo.log(singleGeometry)
    
    // console.log(cylinderCoords)
    
    function lookAwayFrom(me, target) {
        // console.log("lookAwayFrom", me, target)
        
          var v = new THREE.Vector3();
          v.subVectors(me.position, target).add(me.position);
          me.lookAt(v);
        }
    
        // var convexHull = new THREE.QuickHull().setFromObject( flower.objects[0] );

    //is this.objects[1] when pushed!
    let hull = flower.objects[1]
    const hullGeo = hull
    // flower.objects.push(hullGeo)
    // console.log(flower.objects)
    const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, opacity:0.0, transparent:true } );
    const hullCloneMesh = new THREE.Mesh( hullGeo, material );
    
    
    
    let objectMArker = new THREE.SphereGeometry( 0.2, 10, 10 );
      // flower.objects.push(objectMArker)
      // console.log(flower.objects)
      let objMat = new THREE.MeshPhongMaterial( { color: 0x0000ff, opacity:1, transparent:false } );
      let markermesh = new THREE.Mesh( objectMArker, objMat );
      // scene.add( markermesh );        
    
                       if(!cylinderCoords){
                        let radius = 10
                          let dropoff = 0.1 // vertical space between spiral rows
                          let spacing = 4.1 //at least 1
                          let interval = 1
                          let instances = 15*(boquetRadius)
                          let jitter =  cylindernum
                          let smalljitter = 1
    
                          // for ( let i = interval, l = instances*interval; i < l; ) {
                                    let l = 0
    
                                    let multiplier = 9 + (4*boquetRadius)
    



    //BEGIN INSTANCES LOOP
                                        for ( let i = interval*multiplier, l = instances*interval; i < l; ) {
                                          let theta = i*spacing
                                          let y = - ( i * dropoff );
    
                                          //  object2.position.setFromSphericalCoords( radius, theta/0.2535, y );
    
                                          
                                          // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) ); //original
                                                                                                                              //theta/0.0435 shark fin
                                          // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0455, y*((i/(192*4))+0.5) ); //makes a triple spiral thing
                                                                                                                            //theta/0.0451 double helix, open bottom
                                                                                                                            //theta/0.0455 triple spiral
                                                                      //theta/0.0244 quadruple spiral
    
                                          // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.5) ); //maybe better than original? 
                                          // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.2) ); //maybe better than original? 
                                         
                                          // markermesh.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.023383, y*((2/(192*4))+0.07) ); //maybe better than original? 
                                          
                                          //  flower.objects[0].position.setFromCylindricalCoords( ((radius*(instances/((i/100)*((1)))))/30)*jitter, (theta/0.23383)*jitter, (((y*((2/(192*4))+0.07))*i*10)-10)*-1 ); //maybe better than original? 
                                       
                                       
                                          //let iNum = instances*interval //makes it go VERTICAL!!! the flower height ALMOST gets to be near the top and at a very similar level, the boquet feels more real this way but too constrained 
                                       let iNum = ((fxrand()*0.5)+0.5)*instances*interval //maybe doing it halfway is good?
                                      //  let iNum = ((fxrand())*instances*interval //fully random (*1) is a ittle too chaotic, get too much droop
                                          
                                      //  let randomscale = fxrand()*(fxrand()*4/cylindernum)
                                      let randomscale = 1
                                      let posNeg = fxrand() < 0.5 ? -1 : 1
                                       let randomMotion = (fxrand()*6)*posNeg
    
    
                                       flower.objects[0].position.setFromCylindricalCoords( radius*(instances/((iNum+20)*((i/10)+1)))*boquetRadius, theta/1.035*boquetRadius, (((y*((iNum/(192*2))+0.5)*iNum*5)-10)*-0.2)/(boquetRadius))
                                          //  flower.objects[0].position.setFromCylindricalCoords( (((radius*(instances/((10/100)*((1)))))/30)*jitter)/20, (theta/iNum)/20, ((((y*((2/(192*4))+0.07))*iNum*40)-10)*-1)/2 ); //maybe better than original? 
                                       
                                          let markey = flower.objects[0].position.y
                                           flower.objects[0].position.y = (flower.objects[0].position.z)+ (randomMotion* (fxrand() < 0.5 ? -1 : 1))
                                           flower.objects[0].position.z = (markey) //+ (randomMotion * (fxrand() < 0.5 ? -1 : 1))
                                           flower.objects[0].position.x =  flower.objects[0].position.x + (randomMotion* (fxrand() < 0.5 ? -1 : 1))
                                           
                                           markermesh.position.set(flower.objects[0].position.x, flower.objects[0].position.y, flower.objects[0].position.z)
                                           
    
                                           flower.objects[0].scale.set(randomscale, randomscale, randomscale)
    
                                           hullCloneMesh.position.x= flower.objects[0].position.x
                                           hullCloneMesh.position.y= flower.objects[0].position.y
                                           hullCloneMesh.position.z= flower.objects[0].position.z
                                           hullCloneMesh.scale.set(randomscale,randomscale,randomscale)
                                          
                                           lookAwayFrom(flower.objects[0], new THREE.Vector3(0, 0, 0))
                                           lookAwayFrom(hullCloneMesh, new THREE.Vector3(0, 0, 0))
                                           lookAwayFrom(markermesh, new THREE.Vector3(0, 0, 0))
                                           
                                           let rotation = fxrand()*360
                                          // hullCloneMeshClone.rotation.set(rotation* Math.PI/180,0,0
                                          
                                          
                                           let states = []
    
      states.push(no_collisions(hullCloneMesh, window.collidable))
      // console.log(states)
      if(!states.includes(0)){
    
        // console.log(hullCloneMesh)
        // console.log(hullCloneMesh.clone())
    let clone = hullCloneMesh.clone() //NOW COPYING
    // let clone = new THREE.Object3D().copy(hullCloneMesh)
    
    //ADD FLOWER TO SCENE
        window.collidable.push(clone)
            scene.add(clone)
            window.convexHulls.push(clone)
            clone.position.z = clone.position.z //+ (window.guiControls.hauteur/170)
            let markermeshClone = markermesh.clone() //NOW COPYING
            // let markermeshClone = new THREE.Object3D().copy(markermesh)
    
            // scene.add(markermeshClone)
            markermeshClone.position.z = markermeshClone.position.z //+ (window.guiControls.hauteur/170)
            
            // console.log("CLONECHECK", flower.objects[0])
            let flowerobjectsclone = flower.objects[0].clone()// NOW COPYING
            // let flowerobjectsclone = new THREE.Object3D().copy(flower.objects[0])
            // console.log("CLONECHECK", flowerobjectsclone)
    
            scene.add(flowerobjectsclone) //add the real flower to the scene
            flowerobjectsclone.position.z = flowerobjectsclone.position.z //+ (window.guiControls.hauteur/170)
    
            window.flowerGeoms[flower.flowerIndexNumber].push(flowerobjectsclone) //will merge these!
    
            // this.meshGroup.add(flowerClone);
            // this.scene.add(this.meshGroup)
    } else{
    //   console.log("DID NOT INCLUDE FLOWER! COLLISION!")
    
      //maybe find a way to fit it in????
    
    }
    
    
                                          i +=interval


                                        } //END FOR LOOP




                        // cylinderCoords = true
                        cylindernum++
                      }
    
    
    
    
    
    // let generator = new Generator(scene, renderer, camera, flower.objects, copies, perStem, angleRange, heightRange, growthIter, stemPosition, flowerScale, flower.coords); //MAKE STEMS!s
    
    }
    
    
    )
    
    
    
    
    //   _____   ____  _   _ ______       _____  _               _____ _____ _   _  _____       ______ _      ______          ________ _____   _____  
    //  |  __ \ / __ \| \ | |  ____|     |  __ \| |        /\   / ____|_   _| \ | |/ ____|     |  ____| |    / __ \ \        / /  ____|  __ \ / ____| 
    //  | |  | | |  | |  \| | |__        | |__) | |       /  \ | |      | | |  \| | |  __      | |__  | |   | |  | \ \  /\  / /| |__  | |__) | (___   
    //  | |  | | |  | | . ` |  __|       |  ___/| |      / /\ \| |      | | | . ` | | |_ |     |  __| | |   | |  | |\ \/  \/ / |  __| |  _  / \___ \  
    //  | |__| | |__| | |\  | |____      | |    | |____ / ____ \ |____ _| |_| |\  | |__| |     | |    | |___| |__| | \  /\  /  | |____| | \ \ ____) | 
    //  |_____/ \____/|_| \_|______|     |_|    |______/_/    \_\_____|_____|_| \_|\_____|     |_|    |______\____/   \/  \/   |______|_|  \_\_____/  
                                                                                                                                                   
                                                                                                                                                   
    
    
    
    scene.updateMatrixWorld(true)
    
    // console.log(window.flowerGeoms)
    
    
                              //merge all of the stamens first!!
    
    
                              // .applyMatrix4
    
                              // window.flowerGeoms.forEach(flower =>{
                              //   if (flower.length >0){
    
                              // let stamenGeoms = []
                              // let stamenEndCaps = []
    
                              // flower.forEach(flowerObj =>{
    
                              //   flowerObj.traverseAncestors(n => { 
    
                              //     if(n.type == "Object3D"){
    
                              //       n.updateMatrixWorld(true)
                              //       n.updateWorldMatrix(true, true)
                                  
                              //     if(n.children.length>0){
                              //         n.children.forEach(child=>{
                              //           child.applyMatrix4(n.matrix)
                              //         })
                              //       }
    
                              //     }
    
                              //   })
    
                              // })
    
                              //   }
                              // })
    
    // console.log(mergeMeshes(scene))
    
          window.flowerGeoms.forEach(flower =>{
    
            if (flower.length >0){
    
              let stamenGeoms = []
              let stamenEndCaps = []
    
              // MergeMeshes
    
              
    
              flower.forEach(flowerObj =>{
    
                // console.log(flowerObj.isMesh)
    
          //       flowerObj.traverse(n => { 
                  
          //         // n.updateMatrix() 
          //         n.updateWorldMatrix(true, true)
    
    
          //         if ( n.name=="stamenMesh" ) {
          //       // n.material.shading = THREE.SmoothShading;
          //   // scene.remove(n)
          //   // console.log(n)
          //   stamenGeoms.push(n.geometry)
          //   // n.receiveShadow = true;
          //   // if(n.material.map) n.material.map.anisotropy = 16; 
    
          //     }
    
          //     if ( n.name=="endCapMesh" ) {
          //       // n.material.shading = THREE.SmoothShading;
          //   // scene.remove(n)
          //   // console.log(n)
    
          //   stamenEndCaps.push(n.geometry)
    
          //   // n.receiveShadow = true;
          //   // if(n.material.map) n.material.map.anisotropy = 16; 
    
          //     }
              
    
    
          // })
    
    
              })
    
    
          // console.log(stamenGeoms, stamenEndCaps)
              // let geoms = BufferGeometryUtils.mergeBufferGeometries(stamenGeoms)
              // let endCaps = BufferGeometryUtils.mergeBufferGeometries(stamenEndCaps)
    
    
              // scene.add(new THREE.Mesh(geoms, stamenGeoms[0].material))
              // scene.add(new THREE.Mesh(endCaps, stamenEndCaps[0].material))
    
            }
    
          })
    
    
    
          if(window.vaseIndex == vaseIndexNumber){
            // console.log("GENERATE", "BUILDING!")
            console.log("BUILDSCENERENDER")
    buildSceneRender()
          } else {
            window.lastWorkerMessage = true;
            // console.log("GENERATE", "not building scene yet! vases aren't ready!")
          }
    
    console.log("should be rendering!")
    

        }













        } else {
    
          console.log("GENERATE", "ELSE")
    
          // if(window.vaseIndex == vaseIndexNumber){
    
            // console.log("GENERATE", totalUniqueFlowers, vaseIndexNumber)
            // console.log("GENERATE", window.vaseIndex)
            // console.log("GENERATE", window.flowersArray.length)
            // console.log("GENERATE", flowerLen)
            // (window.flowersArray.length==(flowerLen) && getOccurrence(states, true)==flowerLen-1)
    
            if(window.lastWorkerMessage){
                console.log("BUILDSCENERENDER")
                if(!PACK2D){
                    buildSceneRender()
                }
              
            }
            
    
          // } else {
            // console.log("GENERATE", "not building scene yet! vases aren't ready!")
          // }
    
        }
    } else {
    
      console.log("GENERATE", "0 VASES AND 0 FLOWERS")
      scene.updateMatrixWorld(true)
      console.log("BUILDSCENERENDER")
      buildSceneRender()
      
    
    }
    
      
    
    
    }
    

