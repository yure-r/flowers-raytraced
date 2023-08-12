// proper initialization
if( 'function' === typeof importScripts) {
    importScripts("../three.js-r110/build/three.min.js");
    importScripts("./one.js-r100/build/one.min.js");
    importScripts("../three.js-r110/examples/js/utils/BufferGeometryUtils.js")
    // importScripts("./parametric-r100.js");
    // importScripts("../parametric-structure-r100.js");
    // importScripts("../three.js-r100/examples/js/ParametricGeometries.js");
    addEventListener('message', onMessage);
 

    function disposeNode (node)
    {
        if (node instanceof THREE.Mesh)
        {
            if (node.geometry)
            {
                node.geometry.dispose ();
            }
    
            if (node.material)
            {
                if (node.material instanceof THREE.MeshFaceMaterial)
                {
                    $.each (node.material.materials, function (idx, mtrl)
                    {
                        if (mtrl.map)               mtrl.map.dispose ();
                        if (mtrl.lightMap)          mtrl.lightMap.dispose ();
                        if (mtrl.bumpMap)           mtrl.bumpMap.dispose ();
                        if (mtrl.normalMap)         mtrl.normalMap.dispose ();
                        if (mtrl.specularMap)       mtrl.specularMap.dispose ();
                        if (mtrl.envMap)            mtrl.envMap.dispose ();
                        if (mtrl.alphaMap)          mtrl.alphaMap.dispose();
                        if (mtrl.aoMap)             mtrl.aoMap.dispose();
                        if (mtrl.displacementMap)   mtrl.displacementMap.dispose();
                        if (mtrl.emissiveMap)       mtrl.emissiveMap.dispose();
                        if (mtrl.gradientMap)       mtrl.gradientMap.dispose();
                        if (mtrl.metalnessMap)      mtrl.metalnessMap.dispose();
                        if (mtrl.roughnessMap)      mtrl.roughnessMap.dispose();
    
                        mtrl.dispose ();    // disposes any programs associated with the material
                    });
                }
                else
                {
                    if (node.material.map)              node.material.map.dispose ();
                    if (node.material.lightMap)         node.material.lightMap.dispose ();
                    if (node.material.bumpMap)          node.material.bumpMap.dispose ();
                    if (node.material.normalMap)        node.material.normalMap.dispose ();
                    if (node.material.specularMap)      node.material.specularMap.dispose ();
                    if (node.material.envMap)           node.material.envMap.dispose ();
                    if (node.material.alphaMap)         node.material.alphaMap.dispose();
                    if (node.material.aoMap)            node.material.aoMap.dispose();
                    if (node.material.displacementMap)  node.material.displacementMap.dispose();
                    if (node.material.emissiveMap)      node.material.emissiveMap.dispose();
                    if (node.material.gradientMap)      node.material.gradientMap.dispose();
                    if (node.material.metalnessMap)     node.material.metalnessMap.dispose();
                    if (node.material.roughnessMap)     node.material.roughnessMap.dispose();
    
                    node.material.dispose ();   // disposes any programs associated with the material
                }
            }
        }
    }   // disposeNode
    
    function disposeHierarchy (node, callback)
    {
        for (var i = node.children.length - 1; i >= 0; i--)
        {
            var child = node.children[i];
            disposeHierarchy (child, callback);
            callback (child);
        }
    }


    function onMessage(e) { 

let higherRes = e.data[12].highResChangeBasic


let hrNS = e.data[12].HRnonSpherical
let hrNSRows = e.data[12].HRnonSphericalRows
let hrNSCols = e.data[12].HRnonSphericalCols
let hrZinnia = e.data[12].HRzinnia
let hrZinniaRows = e.data[12].HRzinniaRows
let hrZinniaCols = e.data[12].HRzinniaCols
let hrSpherical = e.data[12].HRspherical
let hrSphericalRows = e.data[12].HRsphericalRows
let hrSphericalCols = e.data[12].HRsphericalCols

console.log(
  "nonspherical:",e.data[12].HRnonSpherical,
  e.data[12].HRnonSphericalRows,
  e.data[12].HRnonSphericalCols,
  "spherical:",e.data[12].HRspherical,
  e.data[12].HRsphericalCols,
  e.data[12].HRsphericalRows,
  "zinnia:",e.data[12].HRzinnia,
  e.data[12].HRzinniaCols,
  e.data[12].HRzinniaRows,
  "EDATA12TEST"
  )


let reducedRes = false

      // console.log("EEEEEEEE")
      // do some work here 
    //   console.log("WORKERTHREE", THREE)

      if(e.data[0]=="flower"){



        if(e.data[5]==0){
        //   console.log("WORKER 0")
          return;
        }

        let reducedReductionNumber 



        let reductionNumber = e.data[7] //regular reduction! important! 

        reducedReductionNumber = reductionNumber

        console.log("0123Reduction", reductionNumber)

        // let truereductionnumber = Object.freeze(e.data[7])
        let truereductionnumber = reductionNumber
        // console.log("REDUCTIONNUMBER", e.data[7])
        let randoms = e.data[8]

        let highResFlower = false

        // let reducedReduction = e.data[9]
        let overWriteAll = e.data[11]

        console.log("0HIGHRES", highResFlower)




        // if(reducedReduction){
        //   // reductionNumber = e.data[10]
        //   e.data[7] = e.data[10]
        //   truereductionnumber = reductionNumber
         
        //   console.log("0HIGHRES", e.data[7], reductionNumber, truereductionnumber)



        // }






        if(e.data[12].reducedReduction !== 0){

          highResFlower = true

          if(e.data[12].reducedReduction == "zero"){
            reducedReductionNumber = 0

          } else {
            reducedReductionNumber = e.data[12].reducedReduction
            console.log("REDUCEDREDUCTION", reducedReductionNumber)

          }






        }


        console.log("SPIREREDUCTION","SPIRE", e.data[12].spire)
        console.log("SPIREREDUCTION","SPIRE", e.data[12].spireReductionOverwrite)
        if(e.data[12].spire){
          if(e.data[12].spireReductionOverwrite){
            console.log("SPIREREDUCTION","SPIRE", e.data[12].spireReductionNumber)
            highResFlower = true
            reducedReductionNumber = e.data[12].spireReductionNumber
          } else {
            reducedReductionNumber = reductionNumber
          }


//if high res!!!


        }

        console.log("REDUCTIONTEST", "IS SPHERICAL", e.data[12].spherical)
        
        if(e.data[12].spherical){
          console.log("REDUCTIONTEST", "IS SPHERICAL", e.data[12].sphericalReductionNumber)
          if(e.data[12].sphericalReductionOverwrite){
            highResFlower = true
            reducedReductionNumber = e.data[12].sphericalReductionNumber
          }else{
            reducedReductionNumber = reductionNumber
          }

//if high res!!!



        }
        

      
        let hangDownMultiPlier, petalCutPow, hangDownPow, phiNumber 



      let scale = 0.005
      
        function FlowerBuffer(secondLayer=false, highRes=false){
          let v = []
          
          let geometry = new THREE.BufferGeometry()
          if(secondLayer){
            flowerparams = e.data[3][1]
          } else {
            flowerparams = e.data[3][e.data[2]]
          }

          let parameters = flowerparams

            let positions = []
            let uvs = []
            let colors = []
           

          if(parameters.flowerType !== "zinnia" && parameters.flowerType !== "dahlia" && parameters.flowerType !== "lotus" && parameters.flowerType !== "camelia" && parameters.flowerType !== "rose"){

            if(parameters.flowerType=="1Layer-collection1" || parameters.flowerType=="1Layer-collection2-scale" || parameters.flowerType=="1Layer-collection2" || parameters.flowerType=="1Layer-collection2-scale2" || parameters.flowerType == "1Layer-collection2-scale-Helix" || parameters.flowerSpire){
                reductionNumber = 0.85 //for spires
                truereductionnumber = 0.85

                if(e.data[12].spire){
                  if(e.data[12].spireReudctionOverwrite){
                    console.log("SPIREREDUCTION", true)
                    truereductionnumber = reductionNumber
                  }
                }


if(overWriteAll){
  reductionNumber = e.data[7]
  truereductionnumber = reductionNumber
}




            } else {
                if(parameters.flowerType == "1Layer"){
                    reductionNumber = e.data[7]
                    // reudctionNumber = 0.7
                    // reductionNumber = truereductionnumber
                }

                if(parameters.flowerType == "2Layer"){
                    reductionNumber = e.data[7]
                    // reudctionNumber = 0.7
                    // reductionNumber = 0.6
                    // reductionNumber = truereductionnumber
                }
                
            }

            



         

          let pLen = parameters.pLen
          let curve1 = parameters.curve1
          let curve2 = parameters.curve2
          let fHeight = parameters.fHeight
          let b = parameters.b
          let bNum = parameters.bNum
          let pNum = parameters.pNum
          let pSharp = parameters.pSharp
          let fD = parameters.fD
          
          // let rows = 20, cols = 140;
          let rows = 55, cols = 200;

          if(highRes){
            rows = 70
            cols = 250
            if(highRes){
            if(hrNS){
              rows = hrNSRows 
              cols = hrNSCols 
            }
          }


            console.log("HIGHERRESFLOWER", "INCREASED RESOLUTION")
          }

          if(reducedRes){
            rows = rows/2
            cols = cols/2
          }
            // let rows = 10, cols = 145;
          // let rows = 10, cols = 30

          //rows is y steps
          //cols is x steps

          
          
            for(theta = 0; theta < rows; theta += 1){
              v.push([]);
              for(let phi = 0; phi < cols; phi += 1){

  let r = (pLen*Math.pow(Math.abs(Math.sin((pNum/2*phi*360/cols)*(Math.PI/180))),pSharp)+fD) * theta/rows;
  let x = r * Math.cos((phi*360/cols)*(Math.PI/180));
  let y = r * Math.sin((phi*360/cols)*(Math.PI/180));
  let z = vShape(fHeight, r/100, curve1, curve2, 1.5) - 200+
    bumpiness(b, r/100, bNum, phi*360/cols);

    let pos = new THREE.Vector3(x, y, z);
    v[theta].push(pos);


             
              

                }
            }
          
            for(let theta = 0; theta < v.length; theta++){
              for(let phi = 0; phi < v[theta].length; phi++){

                if(theta < v.length-1 && phi < v[theta].length-1){

              

                 


                  positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
                  positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
                  positions.push(v[theta+1][phi].x *scale, v[theta+1][phi].y*scale, v[theta+1][phi].z*scale);
                  
                  positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
                  positions.push(v[theta][phi+1].x *scale, v[theta][phi+1].y*scale, v[theta][phi+1].z*scale);
                  positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
                  
                  
                
                  

              
                  uvs.push((phi+1)/(v[theta+1].length-1), (theta+1)/(v.length-1))
                  uvs.push((phi)/(v[theta].length-1), (theta)/(v.length-1))
                  uvs.push((phi)/(v[theta+1].length-1), (theta+1)/(v.length-1))

                  uvs.push((phi+1)/(v[theta+1].length-1), (theta+1)/(v.length-1))
                  uvs.push((phi+1)/(v[theta].length-1), (theta)/(v.length-1))
                  uvs.push((phi)/(v[theta].length-1), (theta)/(v.length-1))





                }else if(theta < v.length-1 && phi == v[theta].length-1){


                  positions.push(v[theta+1][0].x *scale, v[theta+1][0].y*scale, v[theta+1][0].z*scale);
                  positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
                  positions.push(v[theta+1][phi].x *scale, v[theta+1][phi].y*scale, v[theta+1][phi].z*scale);


                  positions.push(v[theta+1][0].x *scale, v[theta+1][0].y*scale, v[theta+1][0].z*scale);
                  positions.push(v[theta][0].x *scale, v[theta][0].y*scale, v[theta][0].z*scale);
                  positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
                  
                 
                  
                 
                 
                  


                  
                  uvs.push(0, (theta+1)/(v.length-1))
                  uvs.push(0, (theta)/(v.length-1))
                  uvs.push(0, (theta+1)/(v.length-1))

                  uvs.push(0, (theta+1)/(v.length-1))
                  uvs.push(0, (theta)/(v.length-1))
                  uvs.push(0, (theta)/(v.length-1))
                  



                }
              }
            }

          
          
          
            v = [];
          
          function vShape(A, r, a, b, c){
            return A*Math.pow(Math.E, -b*Math.pow(Math.abs(r), c))*Math.pow(Math.abs(r), a);
          }
          
          function bumpiness(A, r, f, angle){
            return 1 + A * Math.pow(r, 2) * Math.sin((f * angle)*(Math.PI/180));
          }
              
            //   console.log(v)
            
          // let faces = []
            // v = [];
              


              // let geo2 = new THREE.Geometry()
              // geo2.vertices = positions

              // for (var i =0; i<positions.length; i++){
              //   positions[i]

              //   geo2.faces.push(new THREE.Face3(positions[i], positions[i]))
              // }

              // geometry = new THREE.Geometry().fromBufferGeometry(geometry)
              // geometry = new THREE.BufferGeometry.fromGeometry(geo2)

          // geometry.attributes.position.set = new THREE.Float32BufferAttribute( typed, 3 ) 
          // geometry.attributes.position.needsUpdate = true;
              
              // console.log(geometry)




          } else {
            //for spherical flowers
            reductionNumber = 0.85

            truereductionnumber = 0.85
            if(overWriteAll){
              reductionNumber = e.data[7]
              truereductionnumber = reductionNumber
            }
            let v = []


            switch(parameters.flowerType){

              case "dahlia":

                rows = 40
                cols = 2000 //original was 7400 //rows 40

                if(highRes){
                if(hrSpherical){
                  rows = hrSphericalRows
                  cols = hrSphericalCols
                }
              }

                if(reducedRes){
                  rows = rows/2
                  cols = cols/2
                }

                // rows = 40/6
                // cols = 7400/6

                // rows = 10
                // cols = 100

                r_D = 1 / rows;
                t_D = 180*30 / cols
                

                // if(randoms[4] < 0.5){
                //     hangDownMultiPlier = 2+randoms[0]
                //     //was 2.2 originally
                // } else {
                //     hangDownMultiPlier = 0.5+randoms[0]
                //     //was 2.2 originally
                // }
                hangDownMultiPlier = 2.2

                // hangDownMultiPlier = 2.2

                petalCutPow = 4+randoms[1]
                //was  4.75 originally

                //randoms[5] < 0.5
                 if(randoms[5] < 0.5){
                    hangDownPow = ((randoms[2]/5)+0.1) + 0.5
                    // was originally 0.9
                 } else {
                    hangDownPow = ((randoms[2]/5)+0.7) + 0.6
                    // was originally 0.9
                 }



                phiNumber = (1+randoms[3])*10
                //was originally 11

                // if(randoms[5] < 0.5){
                //     if(true){
                //     phiNumber = 11
                //     hangDownPow = 0.9
                //     petalCutPow = 4.75
                //     hangDownMultiPlier = 2.2
                //     // hangDownMultiPlier = 3

                // }

                
              // noStroke();
                
                  for(let r = 0; r <= rows; r += 1){
                  // beginShape(POINTS);
                    v.push([])
                  for(let theta = 0; theta <= cols; theta += 2){
                    
                    let phi = ((180/1.75)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
                    let petalCut = 0.2+ Math.abs(Math.asin(Math.sin((petalCutPow*theta*t_D)*(Math.PI/180))*(Math.PI/180))+420*Math.sin((4.75*theta*t_D)*(Math.PI/180)))/2000;
                    let hangDown = hangDownMultiPlier*Math.pow(r*r_D, 2)*Math.pow(hangDownPow*r*r_D-1, 2)*Math.sin(phi);
              
                    if(0 < petalCut * (r*r_D * Math.sin(phi*(Math.PI/180))+hangDown*Math.cos(phi*(Math.PI/180)))){
                      let pX = (600*((randoms[6])+0.5)) * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
                      let pY = (-600*((randoms[6])+0.5)) * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
                      let pZ = (600*((randoms[6])+0.5)) * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
                      // vertex(pX, pY, pZ);
                      let pos = new THREE.Vector3(pX, pY, pZ)
                      v[Math.floor(r)].push(pos)
                    }
                  }
                  // endShape();
                }
                
                
                for (let r=0; r< v.length; r++){
                  // fill(20-r*20, 80-r*40, 60+r*40);
                  // fill(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
                  for(let theta =0; theta < v[r].length; theta++){

                    if(v.length >= r+2){
                    if(v[r+1].length >= theta+2){

                    if(r < v.length-1 && theta < v[r].length-1){



                      positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                      positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
                      positions.push(v[r+1][theta].x*scale, v[r+1][theta].y*scale, v[r+1][theta].z*scale);
                     
                      positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                      positions.push(v[r][theta+1].x*scale,v[r][theta+1].y*scale,v[r][theta+1].z*scale);
                      positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);


                      uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                      uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
                      uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))
    
                      uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                      uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
                      uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))

                    }
                  }
                  }
                  }
                }
                // geometry.rotation.y= 90/Math.PI*180

                break;

                case "camelia":
                  rows = 20
                //   cols = 3600
                cols = 2000

  if(highRes){
                if(hrSpherical){
                  rows = hrSphericalRows
                  cols = hrSphericalCols
                }
              }

                  if(reducedRes){
                    rows = rows/2
                    cols = cols/2
                  }

                  // rows = 60/2
                  // cols = 3600/2

                  // rows = 20
                  // cols = 100

                  r_D = 1 / rows;
                  t_D = 180*20 / cols



                  hangDownMultiPlier = 3

                  // hangDownMultiPlier = 1.4
  
                  petalCutPow = 1+randoms[1]
                  //was  1.75 originally
  
                  //randoms[5] < 0.5
                   if(randoms[5] < 0.5){
                      hangDownPow = ((randoms[2]/5)) + 0.9
                      // was originally 2
                   } else {
                      hangDownPow = ((randoms[2]/6)) + 1.2
                      // was originally 2
                   }

                //    hangDownPow = 1.2 

                //    let hangdownPow2 = 1.2
  
  
  
                  phiNumber = (1+randoms[3])*10

                
                  
                  // noStroke();
                    for(let r = 0; r <= rows; r += 1){
                    // beginShape(POINTS);
                      v.push([])
                    for(let theta = 0; theta <= cols; theta += 2){
                      // stroke(335, -r*r_D*5+10, r*r_D*50+50);
                      let phi = ((180/2.1)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
                      let petalCut = 0.75+ Math.abs(Math.asin(Math.sin((petalCutPow*theta*t_D)*(Math.PI/180))*(Math.PI/180))+80*Math.sin((4.75*theta*t_D)*(Math.PI/180)))/480;
                      let hangDown = hangDownMultiPlier*Math.pow(r*r_D, 2)*Math.pow(hangDownPow*r*r_D-1, 2)*Math.sin(phi);
                
                      if(0 < petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi))){
                        let pX = 300 * (1- theta*t_D/6000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
                        let pY = (-300*((randoms[6]/2.5)+0.8)) * (1- theta*t_D/6000) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
                        let pZ = (300) * (1- theta*t_D/6000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
                        // vertex(pX, pY, pZ);
                        let pos = new THREE.Vector3(pX, pY, pZ)
                        v[Math.floor(r)].push(pos)
                      }
                    }
                    // endShape();
                  }
                  
                
                  for (let r=0; r< v.length; r++){
                    // fill(20-r*20, 80-r*40, 60+r*40);
                    // fill(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
                    for(let theta =0; theta < v[r].length; theta++){
  
                      if(v.length >= r+2){
                      if(v[r+1].length >= theta+2){
  
                      if(r < v.length-1 && theta < v[r].length-1){
  
  
  
                        positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                        positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
                        positions.push(v[r+1][theta].x*scale, v[r+1][theta].y*scale, v[r+1][theta].z*scale);
                       
                        positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                        positions.push(v[r][theta+1].x*scale,v[r][theta+1].y*scale,v[r][theta+1].z*scale);
                        positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
  
  
                        uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                        uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
                        uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))
      
                        uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                        uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
                        uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
  
                      }
                    }
                    }
                    }
                  }

                  break;
                  // geometry.rotation.y= 90/Math.PI*180
  

                case "zinnia":
                  rows = 50
                  cols = 2700 //original was 2700


                  if(reducedRes){
                    rows = rows/2
                    cols = cols/2
                  }

                  // rows = 50/2
                  // cols = 2700/2

                  // rows = 20
                  // cols = 100

//begin zinnia code
        // r_D = 1 / rows;
        // t_D = 180*15 / cols
        
        // // noStroke();
        //   for(let r = 0; r <= rows; r += 1){
        //   // beginShape(POINTS);
        //     v.push([])
        //   for(let theta = -2*180; theta <= cols; theta += 2){
        //     // fill(335, -r*r_D*40+100, r*r_D*50+50);
        //     let phi = ((180/2)*Math.exp(-theta/(16*180)))*(Math.PI/180);
        //     let petalCut = 1 - (1/2) * Math.pow((5/4)*Math.pow(1-((10.4*theta%360)/180), 2)-1/12, 2);
        //     let hangDown = 1.3*Math.pow(r*r_D, 2)*Math.pow(1.25*r*r_D-1, 2)*Math.sin(phi);
      
        //     if(0 < petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi))){
        //       let pX = 300 * (1- theta/6500) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin(theta*(Math.PI/180));
        //       let pY = -300 * (1- theta/6500) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
        //       let pZ = 300 * (1- theta/6500) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos(theta*(Math.PI/180));
        //       // vertex(pX, pY, pZ);
        //       let pos = new THREE.Vector3(pX, pY, pZ)
        //       v[Math.floor(r)].push(pos)
        //     }
        //   }
        //   // endShape();
        // }




                                        //BEGIN DAHLIA CODE
                                                rows = 20
                                                cols = 4000 //original was 7400 //rows 40
                                                if(highRes){
                                                if(hrZinnia){
                                                  rows = hrZinniaRows
                                                  cols = hrZinniaCols
                                                }
                                              }
                              
                                
                                                if(reducedRes){
                                                  rows = rows/2
                                                  cols = cols/2
                                                }
                                
                                                // rows = 40/6
                                                // cols = 7400/6
                                
                                                // rows = 10
                                                // cols = 100
                                
                                                r_D = 1 / rows;
                                                t_D = 180*30 / cols
                                                
                                                
                                              // noStroke();

                                              hangDownMultiPlier = 1+randoms[0]
                                             //was 1.8 originally

                                            //  petalCutPow = 10+randoms[1]
                                            petalCutPow = 10.4
                                             //was 10.4 originally

                                             hangDownPow = 1+randoms[2]
                                             // was originally 1.25

                                             phiNumber = (1+randoms[3])*10
                                            // phiNumber = 16
                                             //was originally 16
                                                
                                                  for(let r = 0; r <= rows; r += 1){
                                                  // beginShape(POINTS);
                                                    v.push([])
                                                  for(let theta = 0; theta <= cols; theta += 2){
                                                    
                                                    // let phi = ((180/2)*Math.exp(-theta/(16*180)))*(Math.PI/180);
                                                    let phi = ((180/2)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
                                                    let petalCut = 1 - (1/2) * Math.pow((5/4)*Math.pow(1-((petalCutPow*theta%360)/180), 2)-1/12, 2);
                                                    let hangDown = hangDownMultiPlier*Math.pow(r*r_D, 2)*Math.pow(hangDownPow*r*r_D-1, 2)*Math.sin(phi);
                                              
                                                    if(0 < petalCut * (r*r_D * Math.sin(phi*(Math.PI/180))+hangDown*Math.cos(phi*(Math.PI/180)))){
                                                      let pX = 200 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
                                                      let pY = -150 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
                                                      let pZ = 200 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
                                                      // vertex(pX, pY, pZ);
                                                      let pos = new THREE.Vector3(pX, pY, pZ)
                                                      v[Math.floor(r)].push(pos)
                                                    }
                                                  }
                                                  // endShape();
                                                }



                  for (let r=0; r< v.length; r++){
                    // fill(20-r*20, 80-r*40, 60+r*40);
                    // fill(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
                    for(let theta =0; theta < v[r].length; theta++){
  
                      if(v.length >= r+2){
                      if(v[r+1].length >= theta+2){
  
                      if(r < v.length-1 && theta < v[r].length-1){
  
  
  
                        positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                        positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
                        positions.push(v[r+1][theta].x*scale, v[r+1][theta].y*scale, v[r+1][theta].z*scale);
                       
                        positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
                        positions.push(v[r][theta+1].x*scale,v[r][theta+1].y*scale,v[r][theta+1].z*scale);
                        positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
  
  
                        uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                        uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
                        uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))
      
                        uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
                        uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
                        uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
  
                      }
                    }
                    }
                    }
                  }

                  break;

                  case "lotus":

// let v = []
    rows = 50
    cols = 2400

    if(highRes){
    if(hrSpherical){
      rows = hrSphericalRows
      cols = hrSphericalCols
    }
  }

    if(reducedRes){
      rows = rows/2
      cols = cols/2
    }

    // rows = 50/2
    // cols = 2400/2

    // rows = 10
    // cols = 100

    r_D = 1 / rows;
    t_D = 180*20 / cols




    hangDownMultiPlier = 1.5+randoms[0] // was 2.3
    // hangDownMultiPlier = 2.3
    //was 1.8 originally

    petalCutPow = 10+randoms[1]
  //  petalCutPow = 10.4
    //was 10.4 originally

    hangDownPow = 0.4+randoms[2] // was 0.8
    // hangDownPow = 0.8
    // was originally 1.25

    phiNumber = (randoms[3] + 0.3)*10 // was 6.5
    // phiNumber = 6.5
  //  // phiNumber = 16
  //   //was originally 16
       
  //        for(let r = 0; r <= rows; r += 1){
  //        // beginShape(POINTS);
  //          v.push([])
  //        for(let theta = 0; theta <= cols; theta += 2){
           
  //          // let phi = ((180/2)*Math.exp(-theta/(16*180)))*(Math.PI/180);
  //          let phi = ((180/2)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
  //          let petalCut = 1 - (1/2) * Math.pow((5/4)*Math.pow(1-((petalCutPow*theta%360)/180), 2)-1/12, 2);
  //          let hangDown = hangDownMultiPlier*Math.pow(r*r_D, 2)*Math.pow(hangDownPow*r*r_D-1, 2)*Math.sin(phi);
     
  //          if(0 < petalCut * (r*r_D * Math.sin(phi*(Math.PI/180))+hangDown*Math.cos(phi*(Math.PI/180)))){
  //            let pX = 200 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
  //            let pY = -150 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
  //            let pZ = 200 * (1- theta*t_D/20000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
  //            // vertex(pX, pY, pZ);
  //            let pos = new THREE.Vector3(pX, pY, pZ)
  //            v[Math.floor(r)].push(pos)
  //          }
  //        }
  //        // endShape();
  //      }

    
    // noStroke();
    
      for(let r = 0; r <= rows; r += 1){
        v.push([])
      // beginShape(POINTS);
      for(let theta = 0; theta <= cols; theta += 2){
        // stroke(310, (r*50-30)*3+5, r*50+50);
        // fill(310, (r*50-30)*3+5, r*50+50);
        let phi = ((180/2.5)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
        let petalCut = 0.5+ Math.abs(Math.asin(Math.sin((2.25*theta*t_D)*(Math.PI/180))*(Math.PI/180))+120*Math.sin((2.25*theta*t_D)*(Math.PI/180)))/360;
        let hangDown = hangDownMultiPlier*Math.pow(r*r_D, 2)*Math.pow(hangDownPow*r*r_D-1, 2)*Math.sin(phi);
  
        if(0 < petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi))){
          let pX = 300 * (1- theta*t_D/10000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
          let pY = -300 * (1- theta*t_D/10000) * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
          let pZ = 300 * (1- theta*t_D/10000) * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
          // vertex(pX, pY, pZ);
          let pos = new THREE.Vector3(pX, pY, pZ)
          v[Math.floor(r)].push(pos)
        }
      }
      // endShape();
    }
    
  
    for (let r=0; r< v.length; r++){
      // fill(20-r*20, 80-r*40, 60+r*40);
      // fill(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
      for(let theta =0; theta < v[r].length; theta++){

        if(v.length >= r+2){
        if(v[r+1].length >= theta+2){

        if(r < v.length-1 && theta < v[r].length-1){
          // beginShape();

          // console.log("loop")

          // console.log(r, theta)
          // console.log(v)
          // console.log(v[r][theta])
          // console.log(v[r+1][theta+1].x)

          // positions.push(v[r+1][theta+1].x,v[r+1][theta+1].y,v[r+1][theta+1].z);
          // positions.push(v[r][theta].x, v[r][theta].y, v[r][theta].z);
          // positions.push(v[r+1][theta].x, v[r+1][theta].y, v[r+1][theta].z);

          // positions.push(v[r+1][theta+1].x,v[r+1][theta+1].y,v[r+1][theta+1].z);
          // positions.push(v[r][theta+1].x,v[r][theta+1].y,v[r][theta+1].z);
          // positions.push(v[r][theta].x, v[r][theta].y, v[r][theta].z);

         

  
          // uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          // uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
          // uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))

          // uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          // uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
          // uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))

          positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
          positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
          positions.push(v[r+1][theta].x*scale, v[r+1][theta].y*scale, v[r+1][theta].z*scale);
         
          positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
          positions.push(v[r][theta+1].x*scale,v[r][theta+1].y*scale,v[r][theta+1].z*scale);
          positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);


          uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
          uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))

          uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
          uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))

          // positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
          // positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
          // positions.push(v[theta+1][phi].x *scale, v[theta+1][phi].y*scale, v[theta+1][phi].z*scale);
          
          // positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
          // positions.push(v[theta][phi+1].x *scale, v[theta][phi+1].y*scale, v[theta][phi+1].z*scale);
          // positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);


          // endShape(CLOSE);
        }
      }
      }
      }
    }
                    break;

                    case "rose":
                      rows = 20
                      cols = 2700

                      if(highRes){
                if(hrSpherical){
                  rows = hrSphericalRows
                  cols = hrSphericalCols
                }
              }

                      if(reducedRes){
                        rows = rows/2
                        cols = cols/2
                      }


                      r_D = 1 / rows;
                      t_D = 180*20 / cols
    
    
    
                      hangDownMultiPlier = 3
    
                      // hangDownMultiPlier = 1.4
      
                      petalCutPow = 1+randoms[1]
                      //was  1.75 originally
      
                      //randoms[5] < 0.5
                       if(randoms[5] < 0.5){
                          hangDownPow = ((randoms[2]/5)) + 0.9
                          // was originally 2
                       } else {
                          hangDownPow = ((randoms[2]/6)) + 1.2
                          // was originally 2
                       }
    
                    //    hangDownPow = 1.2 
    
                    //    let hangdownPow2 = 1.2
      
      
      
                      phiNumber = (0.4+(randoms[3]/2))*10


                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      ///IMPORTANT TO-DO
                      /// add more modularity, rihgt now phiNumber ist he only one being used, use the other variables in their places,
                      //make it so the petal number changes, etc. 
                      //the droop of the petals etc. 



                      // rows = 50
                      // cols = 2700

                      // rows = 25
                      // cols = 100

                      r_D = 1 / rows;
                      t_D = 180*15 / cols
                      
                      // noStroke();
                      
                        for(let r = 0; r <= rows; r += 1){
                          v.push([])
                        // beginShape(POINTS);
                        for(let theta = -2*180; theta <= cols; theta += 2){
                          // stroke(205, -r*r_D*50+100, r*r_D*50+50);
                          let phi = ((180/2)*Math.exp(-theta*t_D/(phiNumber*180)))*(Math.PI/180);
                          let petalCut = 1 - (1/2) * Math.pow((5/4)*Math.pow(1-((3.6*theta*t_D%360)/180), 2)-1/4, 2);
                          let hangDown = 2*Math.pow(r*r_D, 2)*Math.pow(1.3*r*r_D-1, 2)*Math.sin(phi);
                    
                          if(0 < petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi))){
                            let pX = 300 * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.sin((theta*t_D)*(Math.PI/180));
                            let pY = -300 * petalCut * (r*r_D * Math.cos(phi)-hangDown*Math.sin(phi));
                            let pZ = 300 * petalCut * (r*r_D * Math.sin(phi)+hangDown*Math.cos(phi)) * Math.cos((theta*t_D)*(Math.PI/180));
                            // vertex(pX, pY, pZ);
                                    let pos = new THREE.Vector3(pX, pY, pZ)
                            v[Math.floor(r)].push(pos)
                          }
                        }
                        // endShape();
                      }

                      
    for (let r=0; r< v.length; r++){
      // fill(20-r*20, 80-r*40, 60+r*40);
      // fill(20-r*r_D*20, 80-r*r_D*40, 60+r*r_D*40);
      for(let theta =0; theta < v[r].length; theta++){

        if(v.length >= r+2){
        if(v[r+1].length >= theta+2){

        if(r < v.length-1 && theta < v[r].length-1){
          // beginShape();

          // console.log("loop")

          // console.log(r, theta)
          // console.log(v)
          // console.log(v[r][theta])
          // console.log(v[r+1][theta+1].x)

          // positions.push(v[r+1][theta+1].x,v[r+1][theta+1].y,v[r+1][theta+1].z);
          // positions.push(v[r][theta].x, v[r][theta].y, v[r][theta].z);
          // positions.push(v[r+1][theta].x, v[r+1][theta].y, v[r+1][theta].z);

          // positions.push(v[r+1][theta+1].x,v[r+1][theta+1].y,v[r+1][theta+1].z);
          // positions.push(v[r][theta+1].x,v[r][theta+1].y,v[r][theta+1].z);
          // positions.push(v[r][theta].x, v[r][theta].y, v[r][theta].z);

         

  
          // uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          // uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
          // uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))

          // uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          // uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
          // uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))

          positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
          positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);
          positions.push(v[r+1][theta].x*scale, v[r+1][theta].y*scale, v[r+1][theta].z*scale);
         
          positions.push(v[r+1][theta+1].x*scale,v[r+1][theta+1].y*scale,v[r+1][theta+1].z*scale);
          positions.push(v[r][theta+1].x*scale,v[r][theta+1].y*scale,v[r][theta+1].z*scale);
          positions.push(v[r][theta].x*scale, v[r][theta].y*scale, v[r][theta].z*scale);


          uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))
          uvs.push((theta)/(v[r+1].length-1), (r+1)/(v.length-1))

          uvs.push((theta+1)/(v[r+1].length-1), (r+1)/(v.length-1))
          uvs.push((theta+1)/(v[r].length-1), (r)/(v.length-1))
          uvs.push((theta)/(v[r].length-1), (r)/(v.length-1))

          // positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
          // positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);
          // positions.push(v[theta+1][phi].x *scale, v[theta+1][phi].y*scale, v[theta+1][phi].z*scale);
          
          // positions.push(v[theta+1][phi+1].x *scale, v[theta+1][phi+1].y*scale, v[theta+1][phi+1].z*scale);
          // positions.push(v[theta][phi+1].x *scale, v[theta][phi+1].y*scale, v[theta][phi+1].z*scale);
          // positions.push(v[theta][phi].x *scale, v[theta][phi].y*scale, v[theta][phi].z*scale);


          // endShape(CLOSE);
        }
      }
      }
      }
    }
                      break;

            }

          }



          let typed = new Float32Array(positions);
          // console.log(geometry)

          geometry.attributes.position= new THREE.BufferAttribute( typed, 3 )
          geometry.attributes.position.needsUpdate = true


          let colorBufferArray = new Uint8Array(colors)
          geometry.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);
          geometry.attributes.color.needsUpdate = true

          let uvArray = new Float32Array(uvs)
          geometry.attributes.uv = new THREE.BufferAttribute(uvArray, 2);
          geometry.attributes.uv.needsUpdate = true



return geometry

        }




        function optimizeMesh(mesh, highRes=false){


console.log("OPTIMIZEMESH123", mesh.attributes)
console.log("OPTIMIZEMESH123", mesh.index)



          var globalGeometry;

          var cb = new ONE.Vector3(),
            ab = new ONE.Vector3();
          
          function pushIfUnique(array, object) {
            if (array.indexOf(object) === -1) array.push(object);
          }
          
          function removeFromArray(array, object) {
            var k = array.indexOf(object);
            if (k > -1) array.splice(k, 1);
          }
          
          function computeEdgeCollapseCost(u, v) {
            // if we collapse edge uv by moving u to v then how
            // much different will the model change, i.e. the "error".
          
            var edgelength = v.position.distanceTo(u.position);
            var curvature = 0;
          
            var sideFaces = [];
            var i,
              uFaces = u.faces,
              il = u.faces.length,
              face,
              sideFace;
          
            // find the "sides" triangles that are on the edge uv
            for (i = 0; i < il; i++) {
              face = u.faces[i];
          
              if (face.hasVertex(v)) {
                sideFaces.push(face);
              }
            }
          
            // use the triangle facing most away from the sides
            // to determine our curvature term
            for (i = 0; i < il; i++) {
              var minCurvature = 1;
              face = u.faces[i];
          
              for (var j = 0; j < sideFaces.length; j++) {
                sideFace = sideFaces[j];
                // use dot product of face normals.
                var dotProd = face.normal.dot(sideFace.normal);
                minCurvature = Math.min(minCurvature, (1.001 - dotProd) / 2);
              }
          
              curvature = Math.max(curvature, minCurvature);
            }
          
            // crude approach in attempt to preserve borders
            // though it seems not to be totally correct
            var borders = 0;
            if (sideFaces.length < 2) {
              // we add some arbitrary cost for borders,
              // borders += 10;
              curvature = 1;
            }
          
            var amt = edgelength * curvature + borders;
          
            return amt;
          }
          
          function computeEdgeCostAtVertex(v) {
            // compute the edge collapse cost for all edges that start
            // from vertex v.  Since we are only interested in reducing
            // the object by selecting the min cost edge at each step, we
            // only cache the cost of the least cost edge at this vertex
            // (in member variable collapse) as well as the value of the
            // cost (in member variable collapseCost).
          
            if (v.neighbors.length === 0) {
              // collapse if no neighbors.
              v.collapseNeighbor = null;
              v.collapseCost = -0.01;
          
              return;
            }
          
            v.collapseCost = 100000;
            v.collapseNeighbor = null;
          
            // search all neighboring edges for "least cost" edge
            for (var i = 0; i < v.neighbors.length; i++) {
              var collapseCost = computeEdgeCollapseCost(v, v.neighbors[i]);
          
              if (!v.collapseNeighbor) {
                v.collapseNeighbor = v.neighbors[i];
                v.collapseCost = collapseCost;
                v.minCost = collapseCost;
                v.totalCost = 0;
                v.costCount = 0;
              }
          
              v.costCount++;
              v.totalCost += collapseCost;
          
              if (collapseCost < v.minCost) {
                v.collapseNeighbor = v.neighbors[i];
                v.minCost = collapseCost;
              }
            }
          
            // we average the cost of collapsing at this vertex
            v.collapseCost = v.totalCost / v.costCount;
            // v.collapseCost = v.minCost;
          }
          
          function removeVertex(v, vertices) {
            console.assert(v.faces.length === 0);
          
            while (v.neighbors.length) {
              var n = v.neighbors.pop();
              removeFromArray(n.neighbors, v);
            }
          
            removeFromArray(vertices, v);
          }
          
          function removeFace(f, faces) {
            removeFromArray(faces, f);
          
            if (f.v1) removeFromArray(f.v1.faces, f);
            if (f.v2) removeFromArray(f.v2.faces, f);
            if (f.v3) removeFromArray(f.v3.faces, f);
          
            // TODO optimize this!
            var vs = [f.v1, f.v2, f.v3];
            var v1, v2;
          
            for (var i = 0; i < 3; i++) {
              v1 = vs[i];
              v2 = vs[(i + 1) % 3];
          
              if (!v1 || !v2) continue;
              v1.removeIfNonNeighbor(v2);
              v2.removeIfNonNeighbor(v1);
            }
          }
          let max = 100;
          function collapse(vertices, faces, u, v, preserveTexture) {
            // u and v are pointers to vertices of an edge
            // Collapse the edge uv by moving vertex u onto v
          
            if (!v) {
              // u is a vertex all by itself so just delete it..
              removeVertex(u, vertices);
              return;
            }
          
            var i;
            var tmpVertices = [];
          
            for (i = 0; i < u.neighbors.length; i++) {
              tmpVertices.push(u.neighbors[i]);
            }
          
            var moveToThisUvsValues = [];
          
            // delete triangles on edge uv:
            for (i = u.faces.length - 1; i >= 0; i--) {
              if (u.faces[i].hasVertex(v)) {
                if (preserveTexture) moveToThisUvsValues = getUVsOnVertex(u.faces[i], v);
                removeFace(u.faces[i], faces);
              }
            }
          
            if (preserveTexture) {
              for (i = u.faces.length - 1; i >= 0; i--) {
                var face = u.faces[i];
                if (max > 0) {
                  const dist1 = face.v1.position.distanceTo(face.v2.position);
                  const dist2 = face.v2.position.distanceTo(face.v3.position);
                  const dist3 = Math.sqrt(dist1 * dist1 + dist2 * dist2);
                  const angles = getTriangleAnglesFromDistances(dist1, dist2, dist3);
                  const anglesUV = getAnglesFromPoints(face.faceVertexUvs);
                  // console.log(angles, anglesUV);
                  max--;
                }
                var faceVerticeUVs = getUVsOnVertex(u.faces[i], u);
                // console.log(faceVerticeUVs)
          
                var verticeDistance = u.position.distanceTo(v.position);
                var size = globalGeometry.boundingSphere.radius * 2;
                var percentageChangeVertexShift = 100 / size * verticeDistance;
          
                var deltaX = Math.abs(100 * (moveToThisUvsValues.x - faceVerticeUVs.x));
                var deltaY = Math.abs(100 * (moveToThisUvsValues.y - faceVerticeUVs.y));
                var percentageChangeTextureCorrds = Math.max(deltaX, deltaY);
          
                // safety check from strange results:
                // if texture shift percentage is much higher than
                // vertex position shift in relation to object size
                if (
                  Math.abs(percentageChangeTextureCorrds - percentageChangeVertexShift) >
                  5
                ) {
                  continue;
                }
          
                faceVerticeUVs.x = moveToThisUvsValues.x;
                faceVerticeUVs.y = moveToThisUvsValues.y;
              }
              // console.log("looped thru faces")
            }
          
            // update remaining triangles to have v instead of u
            for (i = u.faces.length - 1; i >= 0; i--) {
              u.faces[i].replaceVertex(u, v);
            }
          
            removeVertex(u, vertices);
          
            // recompute the edge collapse costs in neighborhood
            for (i = 0; i < tmpVertices.length; i++) {
              computeEdgeCostAtVertex(tmpVertices[i]);
            }
          }
          
          function getUVsOnVertex(face, vertex) {
            return face.faceVertexUvs[getVertexIndexOnFace(face, vertex)];
          }
          
          function getVertexIndexOnFace(face, vertex) {
            return [face.v1, face.v2, face.v3].indexOf(vertex);
          }
          
          function minimumCostEdge(vertices) {
            // O(n * n) approach. TODO optimize this
          
            var least = vertices[0];
          
            for (var i = 0; i < vertices.length; i++) {
              if (vertices[i].collapseCost < least.collapseCost) {
                least = vertices[i];
              }
            }
          
            return least;
          }
          
          // we use a triangle class to represent structure of face slightly differently
          
          function Triangle(v1, v2, v3, a, b, c, fvuv, materialIndex) {
            this.a = a;
            this.b = b;
            this.c = c;
          
            this.v1 = v1;
            this.v2 = v2;
            this.v3 = v3;
          
            this.normal = new ONE.Vector3();
            this.faceVertexUvs = fvuv;
            this.materialIndex = materialIndex;
          
            this.computeNormal();
          
            v1.faces.push(this);
            v1.addUniqueNeighbor(v2);
            v1.addUniqueNeighbor(v3);
          
            v2.faces.push(this);
            v2.addUniqueNeighbor(v1);
            v2.addUniqueNeighbor(v3);
          
            v3.faces.push(this);
            v3.addUniqueNeighbor(v1);
            v3.addUniqueNeighbor(v2);
          }
          
          Triangle.prototype.computeNormal = function() {
            var vA = this.v1.position;
            var vB = this.v2.position;
            var vC = this.v3.position;
          
            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab).normalize();
          
            this.normal.copy(cb);
          };
          
          Triangle.prototype.hasVertex = function(v) {
            return v === this.v1 || v === this.v2 || v === this.v3;
          };
          
          Triangle.prototype.replaceVertex = function(oldv, newv) {
            if (oldv === this.v1) this.v1 = newv;
            else if (oldv === this.v2) this.v2 = newv;
            else if (oldv === this.v3) this.v3 = newv;
          
            removeFromArray(oldv.faces, this);
            newv.faces.push(this);
          
            oldv.removeIfNonNeighbor(this.v1);
            this.v1.removeIfNonNeighbor(oldv);
          
            oldv.removeIfNonNeighbor(this.v2);
            this.v2.removeIfNonNeighbor(oldv);
          
            oldv.removeIfNonNeighbor(this.v3);
            this.v3.removeIfNonNeighbor(oldv);
          
            this.v1.addUniqueNeighbor(this.v2);
            this.v1.addUniqueNeighbor(this.v3);
          
            this.v2.addUniqueNeighbor(this.v1);
            this.v2.addUniqueNeighbor(this.v3);
          
            this.v3.addUniqueNeighbor(this.v1);
            this.v3.addUniqueNeighbor(this.v2);
          
            this.computeNormal();
          };
          
          function Vertex(v, id) {
            this.position = v;
          
            this.id = id; // old index id
          
            this.faces = []; // faces vertex is connected
            this.neighbors = []; // neighbouring vertices aka "adjacentVertices"
          
            // these will be computed in computeEdgeCostAtVertex()
            this.collapseCost = 0; // cost of collapsing this vertex, the less the better. aka objdist
            this.collapseNeighbor = null; // best candinate for collapsing
          }
          
          Vertex.prototype.addUniqueNeighbor = function(vertex) {
            pushIfUnique(this.neighbors, vertex);
          };
          
          Vertex.prototype.removeIfNonNeighbor = function(n) {
            var neighbors = this.neighbors;
            var faces = this.faces;
          
            var offset = neighbors.indexOf(n);
            if (offset === -1) return;
            for (var i = 0; i < faces.length; i++) {
              if (faces[i].hasVertex(n)) return;
            }
          
            neighbors.splice(offset, 1);
          };
          
          /**
           * modify - will reduce vertices and faces count
           * mergeVertices might be needed prior
           * @param count int how many vertices to remove ie. 60% removal Math.round(geo.vertices.count * 0.6)
           **/
          
          const lowerLimit = 51;
          function simplifyMesh(geometryRaw, percentage, preserveTexture) {
            let isBufferGeometry = false;
            let geometry = geometryRaw;
          
            if (
              geometry instanceof ONE.BufferGeometry &&
              !geometry.vertices &&
              !geometry.faces
            ) {
              if (geometry.attributes.position.count < lowerLimit * 3) {
                return geometry;
              }
          
              // console.log("converting BufferGeometry to Geometry");
              geometry = new ONE.Geometry().fromBufferGeometry(geometry);
              isBufferGeometry = true;
              // console.log(geometry)
            }
          
            globalGeometry = geometry;
            if (!globalGeometry.boundingSphere) {
              globalGeometry.computeBoundingSphere();
            }
          
            if (geometry.vertices.length < 50) {
              return geometryRaw;
            }
          
            geometry.mergeVertices();
            geometry.computeVertexNormals();
          
            var oldVertices = geometry.vertices; // Three Position
            var oldFaces = geometry.faces; // Three Face
            var oldFaceUVs = geometry.faceVertexUvs[0];
          
            // conversion
            var vertices = new Array(oldVertices.length); // Simplify Custom Vertex Struct
            var faces = new Array(oldFaces.length); // Simplify Custom Traignle Struct
            var faceUVs = []; // rebuild UVs
          
            var i, il, face;
          
            //
            // put data of original geometry in different data structures
            //
          
            // add vertices
            for (i = 0, il = oldVertices.length; i < il; i++) {
              vertices[i] = new Vertex(oldVertices[i], i);
            }
          
            if (preserveTexture && oldFaceUVs.length) {
              // add UVs
              for (i = 0; i < oldFaceUVs.length; i++) {
                const faceUV = oldFaceUVs[i];
          
                faceUVs.push([
                  new ONE.Vector2(faceUV[0].x, faceUV[0].y),
                  new ONE.Vector2(faceUV[1].x, faceUV[1].y),
                  new ONE.Vector2(faceUV[2].x, faceUV[2].y)
                ]);
              }
            }
          
            // add faces
            for (i = 0, il = oldFaces.length; i < il; i++) {
              face = oldFaces[i];
              faces[i] = new Triangle(
                vertices[face.a],
                vertices[face.b],
                vertices[face.c],
                face.a,
                face.b,
                face.c,
                faceUVs[i],
                face.materialIndex
              );
            }
          
            // compute all edge collapse costs
            for (i = 0, il = vertices.length; i < il; i++) {
              computeEdgeCostAtVertex(vertices[i]);
            }
          
            var nextVertex;
            var z = Math.round(geometry.vertices.length * percentage);
          
            // console.time('z')
            // console.profile('zz');
          
            while (z--) {
              nextVertex = minimumCostEdge(vertices);
              if (!nextVertex) {
                // console.log("no next vertex");
                break;
              }
          
              collapse(
                vertices,
                faces,
                nextVertex,
                nextVertex.collapseNeighbor,
                preserveTexture
              );
            }
          
            // console.profileEnd('zz');
            // console.timeEnd('z')
          
            // TODO convert to buffer geometry.
            var newGeo = new ONE.Geometry();
            if (oldFaceUVs.length) newGeo.faceVertexUvs[0] = [];
          
            for (i = 0; i < vertices.length; i++) {
              var v = vertices[i];
              newGeo.vertices.push(v.position);
            }
            for (i = 0; i < faces.length; i++) {
              var tri = faces[i];
              newGeo.faces.push(
                new ONE.Face3(
                  vertices.indexOf(tri.v1),
                  vertices.indexOf(tri.v2),
                  vertices.indexOf(tri.v3),
                  undefined,
                  undefined,
                  tri.materialIndex
                )
              );
          
              if (oldFaceUVs.length) newGeo.faceVertexUvs[0].push(faces[i].faceVertexUvs);
            }
          
            newGeo.mergeVertices();
            newGeo.computeVertexNormals();
            newGeo.computeFaceNormals();
            newGeo.name = geometry.name;
          
          //   document.getElementById("before-after").innerHTML = `Before ${
          //     oldVertices.length
          //   }<br>
          //   After ${newGeo.vertices.length}`;
          
            // console.log(`face change from ${geometry.faces.length} to ${newGeo.faces.length}`);
          
            return isBufferGeometry ? new ONE.BufferGeometry().fromGeometry(newGeo) : newGeo;
          }
          
          // export default simplifyMesh;
          
          function getTriangleAnglesFromDistances(a, b, c) {
            var A, B, C, R, s, pi, area;
            pi = Math.PI;
          
            s = (a + b + c) / 2;
          
            area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
          
            R = a * b * c / (4 * area);
          
            A = 180 / pi * Math.asin(a / (2 * R));
            B = 180 / pi * Math.asin(b / (2 * R));
            C = 180 / pi * Math.asin(c / (2 * R));
          
            return [A, B, C];
          }
          
          function getAnglesFromPoints(uvs) {
            const pointA = uvs[0];
            const pointB = uvs[1];
            const pointC = uvs[2];
          
            const dist1 = Math.sqrt(
              Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
            );
            const dist2 = Math.sqrt(
              Math.pow(pointB.x - pointC.x, 2) + Math.pow(pointB.y - pointC.y, 2)
            );
            const dist3 = Math.sqrt(dist1 * dist1 + dist2 * dist2);
            return getTriangleAnglesFromDistances(dist1, dist2, dist3);
          }



          // postMessage( 
            
          // [{color: [message.attributes.color.array], 
          // normal: [message.attributes.normal.array], 
          // position: [message.attributes.position.array], 
          // uv:[message.attributes.uv.array], 
          // index:[message.index.array]}, e.data[1], e.data[5], 
          // {color: [message2.attributes.color.array], 
          // normal: [message2.attributes.normal.array], 
          // position: [message2.attributes.position.array], 
          // uv:[message2.attributes.uv.array], 
          // index:[message2.index.array]}] ); //add to worker B) //don't use .toNonIndexed()
//           mesh.computeVertexNormals();
//           mesh.computeFaceNormals();

// console.log(mesh)

let color = mesh.attributes.color.array
let normal =  mesh.attributes.normal.array
let position = mesh.attributes.position.array
let uv = mesh.attributes.uv.array
let index = mesh.index.array


          // console.log(ONE)

          // let object = new ONE.Object3D();
          let buffer = new ONE.BufferGeometry()
          
          
          buffer.attributes.normal= new ONE.BufferAttribute( normal, 3 )
              buffer.attributes.normal.needsUpdate = true
              // console.log(buffer)
              
              let positionsFloat = new Float32Array(position)
              buffer.attributes.position= new ONE.BufferAttribute( positionsFloat, 3 )
              buffer.attributes.position.needsUpdate = true
              
              // buffer.attributes.color = new ONE.BufferAttribute(color, 3)
              // buffer.attributes.color.needsUpdate = true
              
              // buffer.attributes.color = []
              // buffer.attributes.color.needsUpdate = true
              
              
              buffer.attributes.uv= new ONE.BufferAttribute( uv, 2 )
              buffer.attributes.uv.needsUpdate = true
              buffer.index = new ONE.BufferAttribute( index, 1 )
              buffer.index.needsUpdate = true
              buffer.needsUpdate = true;
          
              // console.log("BUFFER", buffer)
              
                // console.log("PARSED", e.data[0])
                // console.log("PARSED", buffer)
              
              
              
                buffer.computeBoundingBox()
          
                          // function optimizeModel() {
                        // scene.remove(elfOptimized);
                        // let elfOptimized = buffer.clone();

                        // reductionNumber = 0.8
let optimized
                        if(highRes){
                          console.log("REDUCTIONTEST", reducedReductionNumber)
                          optimized = simplifyMesh(
                            buffer,
                            reducedReductionNumber, //OPTIMIZE NUMBER //PERCENT //RATE //1 = 100% 0.3 = 30% //SIMPLIFY NUMBER
                            true
                          );
                        } else {

                          // if(overWriteAll){
                          //   truereductionnumber = e.data[7]
                          // }

                          console.log("REDUCTIONTEST", truereductionnumber)


                          if(truereductionnumber==0){
                          } else {

                          
                            // optimized = buffer
                          // } else {
                            optimized = simplifyMesh(
                              buffer,
                              truereductionnumber, //OPTIMIZE NUMBER //PERCENT //RATE //1 = 100% 0.3 = 30% //SIMPLIFY NUMBER
                              true
                            );


                          


                    
                        }
                      }


          
                        // console.log("OPTIMIZED", optimized)
                        // console.log("OPTIMIZED", optimized.attributes)
                        // console.log("OPTIMIZED", optimized.attributes.position)
                        // console.log("OPTIMIZED", optimized.index)
                        let geometry, typed, colorBufferArray, uvArray
                        if(e.data[7] == 0){
                        } else {

                        

                        geometry = new THREE.BufferGeometry()
                        typed = new Float32Array(optimized.attributes.position.array);
                        // console.log(geometry)
              
                        geometry.attributes.position= new THREE.BufferAttribute( typed, 3 )
                        geometry.attributes.position.needsUpdate = true
              
              
                        colorBufferArray = new Uint8Array(optimized.attributes.color.array)
                        geometry.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);
                        geometry.attributes.color.needsUpdate = true
              
                        uvArray = new Float32Array(optimized.attributes.uv.array)
                        geometry.attributes.uv = new THREE.BufferAttribute(uvArray, 2);
                        geometry.attributes.uv.needsUpdate = true

                        }

                        if(reducedReductionNumber == 0 && highRes){
//                           let color = mesh.attributes.color.array
// let normal =  mesh.attributes.normal.array
// let position = mesh.attributes.position.array
// let uv = mesh.attributes.uv.array
// let index = mesh.index.array


                          geometry = new THREE.BufferGeometry() 

                          typed = new Float32Array(position);
                          console.log("POSITIONTEST",position)
                          // console.log(geometry)
                
                          geometry.attributes.position= new THREE.BufferAttribute( typed, 3 )
                          geometry.attributes.position.needsUpdate = true
                
                
                          colorBufferArray = new Uint8Array(color)
                          geometry.attributes.color = new THREE.BufferAttribute(colorBufferArray, 3);
                          geometry.attributes.color.needsUpdate = true
                
                          uvArray = new Float32Array(uv)
                          geometry.attributes.uv = new THREE.BufferAttribute(uvArray, 2);
                          geometry.attributes.uv.needsUpdate = true
                        }

                        return geometry


        }
  





if(highResFlower){
// highResFlower




console.log("RESTEST","FlowerBuffer")
  let message = new FlowerBuffer()
  message = THREE.BufferGeometryUtils.mergeVertices(message)
  message.computeVertexNormals()
  // message.mergeVertices()

  // console.log(message)
  let optimizedMessage = optimizeMesh(message)
    //  disposeNode (message);
  optimizedMessage = THREE.BufferGeometryUtils.mergeVertices(optimizedMessage)
  optimizedMessage.computeVertexNormals()


  // let optimizedMessageLowRes = 

  let optimizedMessageLowRes

  if(higherRes){
    console.log("RESTEST","higher res!!")
    console.log("RESTEST","FlowerBuffer")
    let highResMessage = new FlowerBuffer(false, true)
    highResMessage = THREE.BufferGeometryUtils.mergeVertices(highResMessage)
    highResMessage.computeVertexNormals()

console.log("HIGHRESMESH123", highResMessage)

    optimizedMessageLowRes = optimizeMesh(highResMessage, highResFlower)
    //TODO: new flowerBuffer with higherres
  } else {

    console.log("RESTEST","not higher res but still optimized!!")
    optimizedMessageLowRes = optimizeMesh(message, highResFlower)
  }


  disposeNode (message);
optimizedMessageLowRes = THREE.BufferGeometryUtils.mergeVertices(optimizedMessageLowRes)
optimizedMessageLowRes.computeVertexNormals()

  let message2

  if(e.data[6] == "is2Layer"){
    // message2 = new THREE.ParametricGeometry(g(true), e.data[3][1].uSteps, e.data[3][1].vSteps)
    // message2 = new THREE.BufferGeometry().fromGeometry(message2)
    console.log("RESTEST","FlowerBuffer")
    message2 = new FlowerBuffer(true)
    message2 = THREE.BufferGeometryUtils.mergeVertices(message2)
       
    message2.computeVertexNormals()
    // message2.mergeVertices()
    
    // console.log(message2)
    // console.log(message2)
  
    // let optimizedMessage2



    let optimizedMessage2 = optimizeMesh(message2)
    // disposeNode (message2)
    optimizedMessage2 = THREE.BufferGeometryUtils.mergeVertices(optimizedMessage2)
    optimizedMessage2.computeVertexNormals()

    let optimizedMessage2LowRes

    if(higherRes){
      console.log("RESTEST","higher res!!")
      console.log("RESTEST","FlowerBuffer")
      let highResMessage2 = new FlowerBuffer(true, true)
      highResMessage2 = THREE.BufferGeometryUtils.mergeVertices(highResMessage2)
      highResMessage2.computeVertexNormals()
      optimizedMessage2LowRes = optimizeMesh(highResMessage2, highResFlower)
      //TODO: new flowerBuffer with higherres
    } else {
      console.log("RESTEST","not higher res but still optimized!!")
      optimizedMessage2LowRes = optimizeMesh(message2, highResFlower)
    }


    disposeNode (message2)
    optimizedMessage2LowRes = THREE.BufferGeometryUtils.mergeVertices(optimizedMessage2LowRes)
    optimizedMessage2LowRes.computeVertexNormals()
  
  // console.log("OPTIMIZED", "posting message")
            postMessage( [
              
              {color: [optimizedMessage.attributes.color.array], 
              normal: [optimizedMessage.attributes.normal.array], 
              position: [optimizedMessage.attributes.position.array], 
              uv:[optimizedMessage.attributes.uv.array], 
              index:[optimizedMessage.index.array]}, 
  
              e.data[1], 
              e.data[5], 
  
              {color: [optimizedMessage2.attributes.color.array], 
                normal: [optimizedMessage2.attributes.normal.array], 
                position: [optimizedMessage2.attributes.position.array], 
                uv:[optimizedMessage2.attributes.uv.array], 
                index:[optimizedMessage2.index.array]},

                {color: [optimizedMessageLowRes.attributes.color.array], 
                  normal: [optimizedMessageLowRes.attributes.normal.array], 
                  position: [optimizedMessageLowRes.attributes.position.array], 
                  uv:[optimizedMessageLowRes.attributes.uv.array], 
                  index:[optimizedMessageLowRes.index.array]},

                  {color: [optimizedMessage2LowRes.attributes.color.array], 
                    normal: [optimizedMessage2LowRes.attributes.normal.array], 
                    position: [optimizedMessage2LowRes.attributes.position.array], 
                    uv:[optimizedMessage2LowRes.attributes.uv.array], 
                    index:[optimizedMessage2LowRes.index.array]}

         
              
              ] ); //add to worker B) //don't use .toNonIndexed()
  
            disposeNode (optimizedMessage2)
            disposeNode (optimizedMessage2LowRes)
            disposeNode (optimizedMessage)
            disposeNode (optimizedMessageLowRes)
          } else {
          // console.log(message)
          // console.log("OPTIMIZED", "posting message2")
           postMessage( [
            
            {color: [optimizedMessage.attributes.color.array], 
            normal: [optimizedMessage.attributes.normal.array], 
            position: [optimizedMessage.attributes.position.array], 
            uv:[optimizedMessage.attributes.uv.array], 
            index:[optimizedMessage.index.array]}, 
  
            e.data[1], 
            e.data[5],
          0,
          {color: [optimizedMessageLowRes.attributes.color.array], 
            normal: [optimizedMessageLowRes.attributes.normal.array], 
            position: [optimizedMessageLowRes.attributes.position.array], 
            uv:[optimizedMessageLowRes.attributes.uv.array], 
            index:[optimizedMessageLowRes.index.array]}
            
        
        ] ); //add to worker B) //don't use .toNonIndexed()
  
           disposeNode (optimizedMessage)
           disposeNode (optimizedMessageLowRes)
          }
          
  


} else { //MESH CASE IS NORMAL, NOT HIGH RES

  console.log("RESTEST", "ELSE")

  console.log("RESTEST","FlowerBuffer")
  let message = new FlowerBuffer()
  message = THREE.BufferGeometryUtils.mergeVertices(message)
  message.computeVertexNormals()
  // message.mergeVertices()

  // console.log(message)
  let optimizedMessage = optimizeMesh(message)
     disposeNode (message);
  optimizedMessage = THREE.BufferGeometryUtils.mergeVertices(optimizedMessage)
  optimizedMessage.computeVertexNormals()

  let message2

  if(e.data[6] == "is2Layer"){
    // message2 = new THREE.ParametricGeometry(g(true), e.data[3][1].uSteps, e.data[3][1].vSteps)
    // message2 = new THREE.BufferGeometry().fromGeometry(message2)
    console.log("RESTEST","FlowerBuffer")
    message2 = new FlowerBuffer(true)
    message2 = THREE.BufferGeometryUtils.mergeVertices(message2)
       
    message2.computeVertexNormals()
    // message2.mergeVertices()
    
    // console.log(message2)
    // console.log(message2)
  
  
    let optimizedMessage2 = optimizeMesh(message2)
    disposeNode (message2)
    optimizedMessage2 = THREE.BufferGeometryUtils.mergeVertices(optimizedMessage2)
    optimizedMessage2.computeVertexNormals()
  
  // console.log("OPTIMIZED", "posting message")
            postMessage( [
              
              {color: [optimizedMessage.attributes.color.array], 
              normal: [optimizedMessage.attributes.normal.array], 
              position: [optimizedMessage.attributes.position.array], 
              uv:[optimizedMessage.attributes.uv.array], 
              index:[optimizedMessage.index.array]}, 
  
              e.data[1], 
              e.data[5], 
  
              {color: [optimizedMessage2.attributes.color.array], 
                normal: [optimizedMessage2.attributes.normal.array], 
                position: [optimizedMessage2.attributes.position.array], 
                uv:[optimizedMessage2.attributes.uv.array], 
                index:[optimizedMessage2.index.array]}
              
              ] ); //add to worker B) //don't use .toNonIndexed()
  
            disposeNode (optimizedMessage2)
            disposeNode (optimizedMessage)
          } else {
          // console.log(message)
          // console.log("OPTIMIZED", "posting message2")
           postMessage( [
            
            {color: [optimizedMessage.attributes.color.array], 
            normal: [optimizedMessage.attributes.normal.array], 
            position: [optimizedMessage.attributes.position.array], 
            uv:[optimizedMessage.attributes.uv.array], 
            index:[optimizedMessage.index.array]}, 
  
            e.data[1], 
            e.data[5]] ); //add to worker B) //don't use .toNonIndexed()
  
           disposeNode (optimizedMessage)
          }
          
  
}



        // message.dispose();
        // disposeHierarchy (message, disposeNode);


      }
    }    
 }

