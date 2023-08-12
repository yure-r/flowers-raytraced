// proper initialization
if( 'function' === typeof importScripts) {
    importScripts("../three.js-r110/build/three.min.js");
    importScripts("../three.js-r110/examples/js/utils/BufferGeometryUtils.js")
    // importScripts("./parametric-r100.js");
    // importScripts("../parametric-structure-r100.js");
    // importScripts("../three.js-r100/examples/js/ParametricGeometries.js");
    addEventListener('message', onMessage);
 
    function onMessage(e) { 

      let segmentss = 360


      if(e.data[0]=="vase"){

        console.log("VASE!!", e.data)
  



      let scale = 0.005
      


      var VaseGeometry = function VaseGeometry(count, segments, heightVar, sinVar, cosVar, divVar, scaleVar, guiControls) {
        // _classCallCheck(this, VaseGeometry);
     
        this.segments = segments;
        console.log(this.segments);
        // this.vasePoints = new VasePoints();
        this.count = count;
        this.heightVar = heightVar;
        this.sinVar = sinVar;
        this.cosVar = cosVar;
        this.divVar = divVar;
        this.scaleVar = scaleVar;
        this.phiStart = 0;
        this.phiLength = 2 * Math.PI;
        this.geometryOuter = {};
        this.geometryInner = {};
     
        // this.vasePoints.setPoints(this.count, this.sinVar, this.cosVar, this.heightVar, this.divVar, this.scaleVar);
     
     
        function getPointsAtHeight(height, s, th) {
     
           function deg2rad(k)
     {
         return k * 0.0174532925;
     }
     
     

     
     let hauteur = guiControls.hauteur
     let rayon = guiControls.rayon
     let plage = guiControls.plage
     let offsetv = guiControls.offsetvertical
     let offseth = guiControls.offsethorizontal
     let varrad0 = guiControls.varrad0/100.0
     let varrad1 = guiControls.varrad1/100.0
     let amplitude = guiControls.amplitude/100
     let varlin0 = guiControls.varlin0/100
     let varlin1 = guiControls.varlin1/100
     let varsinp = guiControls.varsinp
     let varsino = guiControls.varsino
     let periodes = Math.ceil(guiControls.periodes)
     let revolution = guiControls.revolution
     
    //  console.log(hauteur, rayon, plage, offsetv, offseth, varrad0, varrad1, amplitude, 
    //     varlin0, varlin1, varsinp, varsino, periodes, revolution)
     
     // let hauteur = parseFloat(document.getElementById("hauteur").value);
     // let rayon = parseFloat(document.getElementById("rayon").value);
     // let plage = parseFloat(document.getElementById("plage").value);
     // let offsetv = parseFloat(document.getElementById("offsetvertical").value);
     // let offseth = parseFloat(document.getElementById("offsethorizontal").value);
     // let varrad0 = parseFloat(document.getElementById("varrad0").value);
     // let varrad1 = parseFloat(document.getElementById("varrad1").value);
     // let amplitude = parseFloat(document.getElementById("amplitude").value);
     // let varlin0 = parseFloat(document.getElementById("varlin0").value);
     // let varlin1 = parseFloat(document.getElementById("varlin1").value);
     // let varsinp = parseFloat(document.getElementById("varsinp").value);
     // let varsino = parseFloat(document.getElementById("varsino").value);
     // let periodes = parseFloat(document.getElementById("periodes").value);
     // let revolution = parseFloat(document.getElementById("revolution").value);
     let varr = varrad1 - varrad0;
     let varlin = varlin1 - varlin0;
     
     // var fh2 = (hauteurvisible / hauteur)
     var fh2 = height/hauteur
     var tmpray = rayon * (fh2 * varr + varrad0) * (1.0 + Math.cos(deg2rad((fh2 * plage) + offsetv)));;	// rayon;
     var tmpamp = amplitude * (fh2 * varlin + varlin0) * (Math.cos(deg2rad((fh2 * varsinp)  + varsino)));;	// amplitude
     var tmpdan = fh2 * revolution;	// delta angle
     
     var fh3 = height/hauteur
     var tmpray3 = rayon * (fh3 * varr + varrad0) * (1.0 + Math.cos(deg2rad((fh3 * plage) + offsetv)));;	// rayon;
     var tmpamp3 = amplitude * (fh3 * varlin + varlin0) * (Math.cos(deg2rad((fh3 * varsinp)  + varsino)));;	// amplitude
     var tmpdan3 = fh3 * revolution;	// delta angle
     
     let ring = []
     let uvs = []
     
     
     for(let n=0 ; n<segmentss ; n++) //segmentss degrees!
     {
        // if(n==0) 
        // else pref="L ";
        let ray = tmpray + offseth + tmpamp * Math.sin(deg2rad(n * periodes));
        
        // cercle1 += pref+(150.0 +  ((tmpray + offseth) * Math.sin(deg2rad(n + tmpdan)))) + " " + (80.0 + ((tmpray+offseth) * Math.cos(deg2rad(n + tmpdan)))) + " ";
        // cercle2 += pref+(150.0 +  (ray * Math.sin(deg2rad(n + tmpdan)))) + " " + (80.0 +(ray * Math.cos(deg2rad(n + tmpdan)))) + " ";
     
        // i+=(totalHeight/segements
        
     ring.push(new THREE.Vector3((ray * Math.sin(deg2rad(n + tmpdan))) , (ray * Math.cos(deg2rad(n + tmpdan))), height))
     uvs.push({u: n/segmentss, v: fh2})
     
     }
     
     // for(let n=0 ; n<segmentss ; n++) //segmentss degrees!
     // {
     // let ray3 = tmpray3 + offseth + tmpamp3 * Math.sin(deg2rad(n * periodes));
     // ring.push(new THREE.Vector3((ray3 * Math.sin(deg2rad(n + tmpdan3))) , (ray3 * Math.cos(deg2rad(n + tmpdan3))), (height+th/s)))
     
     // }
     
     // let x =
     // let y =
     
     return [ring, uvs]
        
     }
     
     
        // function g() {
             
     
    
             
             
        //    }
        
        function getPoints(segments, totalHeight){
           let points = []
           let uvs = []
           let indexedPoints = []
           let indexedUVs = []
           // let segements = 300
     for (var i=0; i<totalHeight; i+=(totalHeight/segments)){
        
        let morepoints = getPointsAtHeight(i, segments, totalHeight)
        indexedPoints.push(morepoints[0])
        indexedUVs.push(morepoints[1])
        // for (var j =0; j<morepoints[0].length; j++){
        //    points.push(morepoints[0][j])
        // }
     
        
        // for (var j =0; j<morepoints[1].length; j++){
        //    uvs.push(morepoints[1][j])
        // }
     
     }
     
     
           
     
           return [points, uvs, indexedPoints, indexedUVs]
        }
     
     let Hsegments = 300
     let points = getPoints(Hsegments, guiControls.hauteur)
     
     console.log(points)
     
     
     // const geometry = new THREE.BufferGeometry();
     
     var vertices = points[0]
     var uvs = points[1]
     let indexedPoints = points[2]
     let indexedUvs = points[3]
     console.log("IP", indexedPoints)
     var holes = [];
     var triangles
     var triangulatedGeo = new THREE.BufferGeometry();
     // var material = new THREE.MeshBasicMaterial();
     let interimVertices = []
     let interimUVs = []
     
     // console.log(Hsegments*segmentss, vertices)
     
     for (var j=0; j<Hsegments-1;j++){
     
        for (var i=0; i<segmentss-1;i++){
     
           if(indexedPoints[j+1][i+1]){
     
     
    
             if(j==0){
    
                if(i==segmentss-2){
                   
                   interimVertices.push(0, 0, 0)
                   interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
                   interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
    
                   // interimVertices.push(indexedPoints[j][i-1].x, indexedPoints[j][i-1].y, indexedPoints[j][i-1].z)
                   // interimVertices.push(0, 0, 0)
                   // interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
          
                   interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
                   interimVertices.push(0, 0, 0)
                   interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
       
       
                   interimUVs.push(0, 0)
                   interimUVs.push(0, 0)
                   interimUVs.push(0, 0)
          
       
                   interimUVs.push(0, 0)
                   interimUVs.push(0, 0)
                   interimUVs.push(0, 0)
                }
    
                // } else {
    
                
    
                interimVertices.push(0, 0, 0)
                interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
                interimVertices.push(0, 0, 0)
       
                interimVertices.push(indexedPoints[j][i+1].x, indexedPoints[j][i+1].y, indexedPoints[j][i+1].z)
                interimVertices.push(0, 0, 0)
                interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
    
    
                interimUVs.push(0, 0)
                interimUVs.push(0, 0)
                interimUVs.push(0, 0)
       
    
                interimUVs.push(0, 0)
                interimUVs.push(0, 0)
                interimUVs.push(0, 0)
    
                // }
    
    
             }
    
     
     
              interimVertices.push(indexedPoints[j+1][i].x, indexedPoints[j+1][i].y, indexedPoints[j+1][i].z)
              interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
              interimVertices.push(indexedPoints[j+1][i+1].x, indexedPoints[j+1][i+1].y, indexedPoints[j+1][i+1].z)
     
              interimVertices.push(indexedPoints[j][i+1].x, indexedPoints[j][i+1].y, indexedPoints[j][i+1].z)
              interimVertices.push(indexedPoints[j+1][i+1].x, indexedPoints[j+1][i+1].y, indexedPoints[j+1][i+1].z)
              interimVertices.push(indexedPoints[j][i].x, indexedPoints[j][i].y, indexedPoints[j][i].z)
     
     
     
                 
     
                
                
           
           
              interimUVs.push(indexedUvs[j+1][i].u, indexedUvs[j+1][i].v)
              interimUVs.push(indexedUvs[j][i].u, indexedUvs[j][i].v)
              interimUVs.push(indexedUvs[j+1][i+1].u, indexedUvs[j+1][i+1].v)
     
              interimUVs.push(indexedUvs[j][i+1].u, indexedUvs[j][i+1].v)
              interimUVs.push(indexedUvs[j+1][i+1].u, indexedUvs[j+1][i+1].v)
     
              interimUVs.push(indexedUvs[j][i].u, indexedUvs[j][i].v)
     
     
     
     
                       
                 
           
     
     
              // }
     
     
     
     if(i==segmentss-1){
    console.log("MINUS1") //does not log!
     }
     
     
     
              if(i==segmentss-2){
     
                 interimVertices.push(indexedPoints[j+1][0].x, indexedPoints[j+1][0].y, indexedPoints[j+1][0].z)
                 interimVertices.push(indexedPoints[j][segmentss-1].x, indexedPoints[j][segmentss-1].y, indexedPoints[j][segmentss-1].z)
                 interimVertices.push(indexedPoints[j+1][segmentss-1].x, indexedPoints[j+1][segmentss-1].y, indexedPoints[j+1][segmentss-1].z)
     
                 interimVertices.push(indexedPoints[j+1][0].x, indexedPoints[j+1][0].y, indexedPoints[j+1][0].z)
                 interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
                 interimVertices.push(indexedPoints[j][segmentss-1].x, indexedPoints[j][segmentss-1].y, indexedPoints[j][segmentss-1].z)
           
                 
                // interimVertices.push(interimVertices)
           
           
           
                 interimUVs.push(1, indexedUvs[j+1][0].v)
                 interimUVs.push(1, indexedUvs[j][segmentss-1].v)
                 interimUVs.push(1, indexedUvs[j+1][segmentss-1].v)
     
     
                 interimUVs.push(1, indexedUvs[j+1][0].v)
                 interimUVs.push(1, indexedUvs[j][0].v)
                 interimUVs.push(1, indexedUvs[j][segmentss-1].v)
    
    
    
    
                                                       //  interimVertices.push(indexedPoints[j+1][1].x, indexedPoints[j+1][1].y, indexedPoints[j+1][1].z)
                                                       //  interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
                                                       //  interimVertices.push(indexedPoints[j+1][0].x, indexedPoints[j+1][0].y, indexedPoints[j+1][0].z)
                                           
                                                       //  interimVertices.push(indexedPoints[j+1][1].x, indexedPoints[j+1][1].y, indexedPoints[j+1][1].z)
                                                       //  interimVertices.push(indexedPoints[j][1].x, indexedPoints[j][1].y, indexedPoints[j][1].z)
                                                       //  interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
                                                 
                                                       
                                                       // // interimVertices.push(interimVertices)
                                                 
                                                 
                                                 
                                                 
                                                    
                                                       
                                                 
                                                       //  interimUVs.push(1, indexedUvs[j+1][0].v)
                                                       //  interimUVs.push(1, indexedUvs[j][0].v)
                                                       //  interimUVs.push(1, indexedUvs[j+1][0].v)
                                           
                                           
                                                       //  interimUVs.push(1, indexedUvs[j+1][0].v)
                                                       //  interimUVs.push(1, indexedUvs[j][0].v)
                                                       //  interimUVs.push(1, indexedUvs[j][0].v)
     
     
                 // interimUVs.push(1, 1)
                 // interimUVs.push(1, 1)
                 // interimUVs.push(1, 1)
                 
           
                 // interimUVs.push(1, 1)
                 // interimUVs.push(1, 1)
                 // interimUVs.push(1, 1)
               } 
     
     
           } else {
     
              if(indexedPoints[j][i+1]){
     
     
                 
              } else if(indexedPoints[j+1][i]){
     
     
              // console.log("ELSE!")
     
             //  interimVertices.push(indexedPoints[j+1][0].x, indexedPoints[j+1][0].y, indexedPoints[j+1][0].z)
             //  interimVertices.push(indexedPoints[j][0].x, indexedPoints[j][0].y, indexedPoints[j][0].z)
             //  interimVertices.push(indexedPoints[j][segmentss].x, indexedPoints[j][segmentss].y, indexedPoints[j][segmentss].z)
        
             //  interimVertices.push(indexedPoints[j+1][0].x, indexedPoints[j+1][0].y, indexedPoints[j+1][0].z)
             //  interimVertices.push(indexedPoints[j][segmentss].x, indexedPoints[j][segmentss].y, indexedPoints[j][segmentss].z)
             //  interimVertices.push(indexedPoints[j+1][segmentss].x, indexedPoints[j+1][segmentss].y, indexedPoints[j+1][segmentss].z)
        
        
        
             //  interimUVs.push(indexedUvs[j+1][0].u, indexedUvs[j+1][0].v)
             //  interimUVs.push(indexedUvs[j][0].u, indexedUvs[j][0].v)
             //  interimUVs.push(indexedUvs[j][segmentss].u, indexedUvs[j][segmentss].v)
        
             //  interimUVs.push(indexedUvs[j+1][0].u, indexedUvs[j+1][0].v)
     
             //  // interimUVs.push(indexedUvs[j+1][segmentss].u, indexedUvs[j+1][segmentss].v)
              
     
              
        
             //  interimUVs.push(indexedUvs[j][segmentss].u, indexedUvs[j][segmentss].v)
              
             //  interimUVs.push(indexedUvs[j+1][segmentss].u, indexedUvs[j+1][segmentss].v)
              
     
     
     
              }
     
           }
     
     
        }
     
     }
     
     
     
     
     let typed = new Float32Array(interimVertices)
     
     triangulatedGeo.attributes.position = new THREE.BufferAttribute(typed,3);
     console.log(vertices)
     
     let typedUVS = new Float32Array(interimUVs)
     triangulatedGeo.attributes.uv = new THREE.BufferAttribute(typedUVS,2);
     
     
     
           console.log(triangulatedGeo)
     
     
     console.log(triangulatedGeo)
     
        
     triangulatedGeo =  THREE.BufferGeometryUtils.mergeVertices(triangulatedGeo)
     triangulatedGeo.computeVertexNormals()
     
     this.geometryOuter = triangulatedGeo
     
     // this.geometryOuter = new THREE.ConvexGeometry( points )
     
     console.log(this.geometryOuter)
     
        //use parametric instead 🤔 because now you'll have ALL the points
        // this.geometryOuter = new THREE.LatheGeometry(this.vasePoints.getPointsOuter(), this.segments, this.phiStart, this.phiLength);
        
       //  this.geometryInner = new THREE.LatheGeometry(this.vasePoints.getPointsInner(), this.segments, this.phiStart, this.phiLength);
    
    
                      //ADD AN INNER GEOMETRY!!
                                        //    this.geometryInner = this.geometryOuter.clone()
                                        //   let innerPositions = this.geometryInner.attributes.position.array
    
                                        //   console.log(innerPositions, "InnerPositions")
    
                                        //   for (var i=0; i<innerPositions.length; i+=3){
                                        //    innerPositions[i] = innerPositions[i] * 0.9
                                        //    innerPositions[i+1] = innerPositions[i+1] * 0.9
                                        //    // innerPositions[i+2] = innerPositions[i+2] * 0.8
                                        //   }
    
                                        //   this.geometryInner.attributes.position = new THREE.BufferAttribute(new Float32Array(innerPositions),3)
                                        //   this.geometryInner.attributes.position.needsUpdate = true
                                        
                                        //   this.geometryOuter = window.BufferGeometryUtils.mergeBufferGeometries([this.geometryOuter, this.geometryInner]);
                                        
                                        //   this.geometryOuter =  window.BufferGeometryUtils.mergeVertices(this.geometryOuter)
                                        //  this.geometryOuter.computeVertexNormals()
     
        return this.geometryOuter;
     };

  
        // console.log(e.data[3][e.data[1]].uSteps, e.data[3][e.data[1]].vSteps)
        // let message = new THREE.ParametricGeometry(g(), e.data[3][e.data[1]].uSteps, e.data[3][e.data[1]].vSteps)
        let params = e.data[1]
        let message = new VaseGeometry(params.countVar, params.segments, params.heightVar, params.sinVar, params.cosVar, params.divVar, params.scaleVar, params);
        console.log("MESSAGE", message)
        message = THREE.BufferGeometryUtils.mergeVertices(message)
        message.computeVertexNormals()
        // message.mergeVertices()




        console.log(message)
         postMessage( [{ normal: [message.attributes.normal.array], position: [message.attributes.position.array], uv:[message.attributes.uv.array], index:[message.index.array]}, e.data[1].index] ); //add to worker B) //don't use .toNonIndexed()
       
        


        message.dispose();

      }
    }    
 }

