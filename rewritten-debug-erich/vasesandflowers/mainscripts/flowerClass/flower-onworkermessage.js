Flower.prototype.onWorkerMessage = function(e){

  // let antherResolution = 40

  if(document.getElementById("antherResolution").value !== ""){
    // antherResolution = document.getElementById("antherResolution").value
    console.log("ANTHERRESOLUTION", antherResolution, highResStamen)
  }

    // console.log(ONE)

    console.log("WORKERMESSAGE123")
  //OPTIMIZE MESH?
  this.workerMessageEvent = e
  this.lowResLayers = []
  this.lowResObject = new THREE.Object3D();

  this.packingLayers = []
  this.packingObject = new THREE.Object3D();

  if(trueReduction){ //INCLUDE THE REGULAR REDUCED MESH FOR CONVEX HULL, THEN HIGH RES FOR FINAL RENDER
  
    console.log("WORKERMESSAGE123", trueReduction)


  
  this.object = new THREE.Object3D();
  
    const geometriesLoader = window.GeometryLoader
    let parsedGeom = new THREE.BufferGeometry();
  
    let normals = e.data[0].normal[0]
    let positions = e.data[0].position[0]
    let uvs = e.data[0].uv[0]
    let indices = e.data[0].index[0]
    let color = e.data[0].color[0]
    parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom.attributes.normal.needsUpdate = true
    normals = undefined
    let positionsFloat = new Float32Array(positions)
    parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom.attributes.position.needsUpdate = true
    positions = undefined
    parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom.attributes.uv.needsUpdate = true
    parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom.index.needsUpdate = true
    parsedGeom.needsUpdate = true;
    uvs = undefined
    indices = undefined
    parsedGeom.computeBoundingBox()

    console.log("WORKERMESSAGE123, REGULAR", parsedGeom)
    this.layers.push(parsedGeom)
  
    this.packingLayers.push(parsedGeom)
  
    console.log("WORKERMESSAGE123", this.layers)

    let reducedGeom = new THREE.BufferGeometry();
    //e.data[4] // is 1Layer original reduced resolution
    let Reducednormals = e.data[4].normal[0]
    let Reducedpositions = e.data[4].position[0]
    let Reduceduvs = e.data[4].uv[0]
    let Reducedindices = e.data[4].index[0]
    // let color = e.data[4].color[0]
    reducedGeom.attributes.normal= new THREE.BufferAttribute( Reducednormals, 3 )
    reducedGeom.attributes.normal.needsUpdate = true
    Reducednormals = undefined
    let ReducedpositionsFloat = new Float32Array(Reducedpositions)
    reducedGeom.attributes.position= new THREE.BufferAttribute( ReducedpositionsFloat, 3 )
    reducedGeom.attributes.position.needsUpdate = true
    Reducedpositions = undefined
    reducedGeom.attributes.uv= new THREE.BufferAttribute( Reduceduvs, 2 )
    reducedGeom.attributes.uv.needsUpdate = true
    reducedGeom.index = new THREE.BufferAttribute( Reducedindices, 1 )
    reducedGeom.index.needsUpdate = true
    reducedGeom.needsUpdate = true;
    Reduceduvs = undefined
    Reducedindices = undefined
    reducedGeom.computeBoundingBox()
    
    reducedGeom.computeBoundingBox()
  
    this.lowResLayers.push(reducedGeom)
  
    console.log("WORKERMESSAGE123", this.lowResLayers)
  
      if(this.flowerLayers == "is2Layer"){
        let parsedGeom2 = new THREE.BufferGeometry();
    let normals = e.data[3].normal[0]
    let positions = e.data[3].position[0]
    let uvs = e.data[3].uv[0]
    let indices = e.data[3].index[0]
    let color = e.data[3].color[0]
    parsedGeom2.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom2.attributes.normal.needsUpdate = true
    normals = undefined
    let positionsFloat = new Float32Array(positions)
    parsedGeom2.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom2.attributes.position.needsUpdate = true
    positions = undefined
    positionsFloat = undefined
    parsedGeom2.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom2.attributes.uv.needsUpdate = true
    parsedGeom2.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom2.index.needsUpdate = true
    parsedGeom2.needsUpdate = true;
    uvs = undefined
    indices = undefined
    
    
    
      parsedGeom2.computeBoundingBox()
      // console.log("LAYERS",layers, layers.length)
      parsedGeom2.name = "parsedGeom2"
      this.layers.push(parsedGeom2)
        
    this.packingLayers.push(parsedGeom2)
      // console.log("parsedgeom2", this.layers)
    
  
      console.log("WORKERMESSAGE123", this.layers[0])
  
  let reducedGeom2 = new THREE.BufferGeometry()
  
       //e.data[5] // is 2Layer original reduced resolution
  
       let Reducednormals = e.data[5].normal[0]
    let Reducedpositions = e.data[5].position[0]
    let Reduceduvs = e.data[5].uv[0]
    let Reducedindices = e.data[5].index[0]
    // let color = e.data[5].color[0]
    reducedGeom2.attributes.normal= new THREE.BufferAttribute( Reducednormals, 3 )
    reducedGeom2.attributes.normal.needsUpdate = true
    Reducednormals = undefined
    let ReducedpositionsFloat = new Float32Array(Reducedpositions)
    reducedGeom2.attributes.position= new THREE.BufferAttribute( ReducedpositionsFloat, 3 )
    reducedGeom2.attributes.position.needsUpdate = true
    Reducedpositions = undefined
    ReducedpositionsFloat = undefined
    reducedGeom2.attributes.uv= new THREE.BufferAttribute( Reduceduvs, 2 )
    reducedGeom2.attributes.uv.needsUpdate = true
    reducedGeom2.index = new THREE.BufferAttribute( Reducedindices, 1 )
    reducedGeom2.index.needsUpdate = true
    reducedGeom2.needsUpdate = true;
    Reduceduvs = undefined
    Reducedindices = undefined
  
    reducedGeom2.computeBoundingBox()
  //push low res 2 layer
  
  this.lowResLayers.push(reducedGeom2)

  console.log("WORKERMESSAGE123", this.lowResLayers[0])
  
      }
  
  } else {
  this.object = new THREE.Object3D();
    
    const geometriesLoader = window.GeometryLoader
    // const parsedGeom = geometriesLoader.parse(e.data[0]);
    let parsedGeom = new THREE.BufferGeometry();
    
    
    let normals = e.data[0].normal[0]
    let positions = e.data[0].position[0]
    let uvs = e.data[0].uv[0]
    let indices = e.data[0].index[0]
    let color = e.data[0].color[0]
    
    // console.log(parsedGeom)
    parsedGeom.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom.attributes.normal.needsUpdate = true
  
    normals = undefined
    // console.log(parsedGeom)
    
    let positionsFloat = new Float32Array(positions)
    parsedGeom.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom.attributes.position.needsUpdate = true
    
    positions = undefined
    // parsedGeom.attributes.color = new THREE.BufferAttribute(color, 3)
    // parsedGeom.attributes.color.needsUpdate = true
    
    // parsedGeom.attributes.color = []
    // parsedGeom.attributes.color.needsUpdate = true
    
    
    parsedGeom.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom.attributes.uv.needsUpdate = true
    parsedGeom.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom.index.needsUpdate = true
    parsedGeom.needsUpdate = true;
  
  
    uvs = undefined
  
    indices = undefined
    
      // console.log("PARSED", e.data[0])
      // console.log("PARSED", parsedGeom)
    
    
    
      parsedGeom.computeBoundingBox()
  
  
  
  // optimize
  // let object = {normals: normals, 
  // positions: positions, uvs: uvs, indices: indices, color: color}
  // let optimized = this.optimizeMesh(object)
  
      // console.log("LAYERS",layers, layers.length)
      console.log("WORKERMESSAGE123, REGULAR", parsedGeom)
      this.layers.push(parsedGeom)
    this.packingLayers.push(parsedGeom)
    //   this.lowResLayers.push(parsedGeom)
      // console.log("parsedGeom", parsedGeom)
    
    
      if(this.flowerLayers == "is2Layer"){
        let parsedGeom2 = new THREE.BufferGeometry();
    
    
    let normals = e.data[3].normal[0]
    let positions = e.data[3].position[0]
    let uvs = e.data[3].uv[0]
    let indices = e.data[3].index[0]
    let color = e.data[3].color[0]
    
    // console.log(parsedGeom2)
    parsedGeom2.attributes.normal= new THREE.BufferAttribute( normals, 3 )
    parsedGeom2.attributes.normal.needsUpdate = true
    // console.log(parsedGeom2)
  
    normals = undefined
    
    let positionsFloat = new Float32Array(positions)
    parsedGeom2.attributes.position= new THREE.BufferAttribute( positionsFloat, 3 )
    parsedGeom2.attributes.position.needsUpdate = true
  
    positions = undefined
    positionsFloat = undefined
    
    // parsedGeom2.attributes.color = new THREE.BufferAttribute(color, 3)
    // parsedGeom2.attributes.color.needsUpdate = true
    
    // parsedGeom2.attributes.color = []
    // parsedGeom2.attributes.color.needsUpdate = true
    
    parsedGeom2.attributes.uv= new THREE.BufferAttribute( uvs, 2 )
    parsedGeom2.attributes.uv.needsUpdate = true
    parsedGeom2.index = new THREE.BufferAttribute( indices, 1 )
    parsedGeom2.index.needsUpdate = true
    parsedGeom2.needsUpdate = true;
    
  
    uvs = undefined
    indices = undefined
      // console.log("PARSED", e.data[0])
      // console.log("PARSED", parsedGeom2)
    
    
    
      parsedGeom2.computeBoundingBox()
      // console.log("LAYERS",layers, layers.length)
      parsedGeom2.name = "parsedGeom2"
      this.layers.push(parsedGeom2)
    this.packingLayers.push(parsedGeom2)

    //   this.lowResLayers.push(parsedGeom2)
      // console.log("parsedgeom2", this.layers)
    
    
    
      
      }
  }
  
  
  class CustomSinCurve extends THREE.Curve {
      
      constructor( scale = 1, 
                    offset=0, 
                    smallRadius=0, 
                    withStamen=true, 
                    initialHorizontalMultiplier=1, 
                    largerSmaller=0.5, 
                    horizSubtractor=0.5, 
                    twirl=false ,
                    vertMultiplier = 1,
                    noBow = true,
                    radius = 2
                   
                   ) {
      
        super();
      
        this.scale = scale;
        this.Vertoffset = offset;
        this.smallRadius = smallRadius;
        this.withStamen = withStamen;
        this.initialHorizontalMultiplier = initialHorizontalMultiplier
        this.largerSmaller = largerSmaller
        this.horizSubtractor = horizSubtractor
        this.twirl = twirl
        this.vertMultiplier = vertMultiplier
        this.noBow = noBow
        this.radius = radius
        
      
      }
      
      getPoint( t, optionalTarget = new THREE.Vector3() ) {
      
        if(this.withStamen){  
          
          let tx
                if(this.noBow){
            tx = t*(this.radius/20)
                } else {
           tx = Math.sin( this.initialHorizontalMultiplier * (Math.sin(t*this.largerSmaller )-Math.sin(t*this.horizSubtractor))/1)*(this.radius); 
                }
          
          let ty
          if(this.twirl){
            ty = Math.pow(Math.sin(t), 1/tx)
          } else {
            ty = 0;
          }
          
        
          
      
        const tz = (((Math.sin(t/(t+this.smallRadius))+0.00001))/1.6)*this.vertMultiplier+this.Vertoffset;    
      
        // tz = ((t/4) * 2.1);
          
          
        
      
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
        } else {
          
          let tx 
          if(this.noBow){
            tx = Math.sin(t/10+0.00001)*this.radius
          } else {
        tx = (Math.sin( this.initialHorizontalMultiplier * (t/this.largerSmaller) )-(t*this.horizSubtractor))*(this.radius); //first one (t/) is wideness second is height
          }
          
                let ty
          if(this.twirl){
            ty = Math.pow(Math.sin(t), 1/tx)
          } else {
            ty = 0;
          }
      
        // const tz = (((t+0.1)/((t+0.4)/0.2)) * this.vertMultiplier) +this.Vertoffset;
          
          let tz = ((Math.sin(t+0.1)/(Math.sin(t+0.8)/0.2)) * this.vertMultiplier) +this.Vertoffset;
          
          
          if (this.betterTwirl){
      
          
                let ty
            
            tx = (Math.sin( this.initialHorizontalMultiplier * (t/this.largerSmaller) )-(t*this.horizSubtractor))*(this.radius); //first one (t/) is wideness second is height
            ty = Math.pow(Math.sin(t), 1/tx)
            tz = ((Math.sin(t+0.1)/(Math.sin(t+0.8)/0.2)) * this.vertMultiplier) +this.Vertoffset;
            
          }
          
          
      
        return optionalTarget.set( tx, ty, tz ).multiplyScalar( this.scale );
          
        }
      
      
      }
      
      }
  
  
  
  this.lowResStamenAntherLayers = []
  this.lowResStamenTubeLayers = []
  
  
    // console.log("WORKERDATA", e.data)
    // console.log('Message received from worker');
        
        
        //GENERATE THE FLOWER GEOMETRY ^^
        
        // layers.push(new THREE.BoxGeometry( 1, 1, 1 ));
        
        // console.log("RESOLUTION CHANGED", "pushed geom", window.parameters[e.data[1]].uSteps, window.parameters[e.data[1]].vSteps)
  
        for (var k=0; k<this.layers.length; k++){
  
        
        this.layers[k].computeBoundingBox();
        this.layers[k].computeBoundingSphere();
        
        //GENERATE MATERIAL SETTINGS FROM window.parameters[e.data[1]].materialSettings
        
        // this.flowerParameters[e.data[1]].materialSettings
        
        this.rawMaterials.push(      {
    bbMin: {value: this.layers[k].boundingBox.min},
    bbMax: {value: this.layers[k].boundingBox.max},
    color1: {value: new THREE.Color(this.flowerParameters[k].materialSettings.color1)},
    color2: {value: new THREE.Color(this.flowerParameters[k].materialSettings.color2)},
    color3: {value: new THREE.Color(this.flowerParameters[k].materialSettings.color3)},
    color4: {value: new THREE.Color(this.flowerParameters[k].materialSettings.color4)},
    vertOffset: {value: this.flowerParameters[k].materialSettings.vertOffset},
     //changes vertical gradient intensity! moves from -1 to +1
    centerSize: {value: this.flowerParameters[k].materialSettings.centerSize},
        //controls central gradient position!
        //the lower the larger?
        //0-20
    centerSize2: {value: this.flowerParameters[k].materialSettings.centerSize2},
      // the lower the larger
    f3Offset: {value: this.flowerParameters[k].materialSettings.f3Offset},
    //controls scale of lowlights, the lower the larger
    topf2: {value:this.flowerParameters[k].materialSettings.topf2},
    vertCenterGradient: {value:this.flowerParameters[k].materialSettings.vertCenterGradient},
    lowlights: {value:this.flowerParameters[k].materialSettings.lowlights},
    subtleFade: {value:this.flowerParameters[k].materialSettings.subtleFade},
    defaultFade: {value:this.flowerParameters[k].materialSettings.defaultFade}} )
      
    this.layers[k].computeBoundingBox();
        this.layers[k].computeBoundingSphere();
  
        this.rawMaterials[k].bbMin.value = this.layers[k].boundingBox.min
        this.rawMaterials[k].bbMax.value = this.layers[k].boundingBox.max
        this.materialSettings.push(this.rawMaterials[k])  
  
        }
  
  
      
                  for (var i=0; i<this.stamenGeomParams.length;i++){
                    let geomSize = fxrand()*0.3
    this.stamenEndCaps.push(new THREE.SphereGeometry( ((this.stamenGeomParams[i].sinCurveScale)/this.stamenGeomParams[i].endCapDiv)*((geomSize)+0.4), 10, 10 ))   
    



    this.lowResStamenAntherLayers.push(new THREE.SphereGeometry( ((this.stamenGeomParams[i].sinCurveScale)/this.stamenGeomParams[i].endCapDiv)*((geomSize)+0.4), antherResolution, antherResolution ))
    // this.stamenEndCaps.push(new THREE.SphereGeometry( 2, 20, 20 )); 
    // console.log("ENDCAPS", this.stamenEndCaps)
                    
    
  const path2 = new CustomSinCurve(
                                   this.stamenGeomParams[i].sinCurveScale,
                                   this.stamenGeomParams[i].vertOffset,
                                   this.stamenGeomParams[i].smallRadius, 
                                   this.stamenGeomParams[i].withStamen, 
                                   this.stamenGeomParams[i].initialHorizontalMultiplier,
                                   this.stamenGeomParams[i].largerSmaller,
                                   this.stamenGeomParams[i].horizSubtractor,
                                   this.stamenGeomParams[i].twirl,
                                   this.stamenGeomParams[i].vertMultiplier,
                                   this.stamenGeomParams[i].noBow,
                                   this.stamenGeomParams[i].radius
                                  );
  let tubeSegments = this.stamenGeomParams[i].tubeSegments
  const geometry2 = new THREE.TubeGeometry( path2, tubeSegments, 1, 8, false ); //ONE STAMEN 3D
  // console.log(geometry2)
  let pos = geometry2.attributes.position;
  let endPoints = [];
  for (let j = (geometry2.parameters.radialSegments + 1) * geometry2.parameters.tubularSegments; j < pos.count; j++){
    endPoints.push(new THREE.Vector3().fromBufferAttribute(pos, j));
  }
  
  
    var pointsEnd = new THREE.Points( new THREE.BufferGeometry().setFromPoints(endPoints), new THREE.PointsMaterial({color: "magenta", size: 0.25}));
    let centerEnd = this.CalculateCircleCenter(pointsEnd.geometry.attributes.position.array)
    
    // var pointsBegin = new THREE.Points( new THREE.BufferGeometry().setFromPoints(endPoints), new THREE.PointsMaterial({color: "magenta", size: 0.25}));
    // let centerBegin = CalculateCircleCenter(pointsBegin.geometry.attributes.position.array)
    
  let centerBegin = path2.getPoint(0)
  
    this.stamenGeomParams[i].centerEnd = centerEnd
                  //   console.log(this.stamenEndCaps)
        for (var j=0; j<this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array.length; j=j+3){
        this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j]=this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j]+((centerEnd.x)) //offset
        this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j+1]=this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j+1]+((centerEnd.y))
        this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j+2]=this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.array[j+2]+((centerEnd.z)) //height?
        this.stamenEndCaps[this.stamenEndCaps.length-1].attributes.position.needsUpdate = true;
      }        
                    this.stamenEndCaps[i].computeBoundingBox();
                    


                    for (var j=0; j<this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array.length; j=j+3){
                      this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j]=this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j]+((centerEnd.x)) //offset
                      this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j+1]=this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j+1]+((centerEnd.y))
                      this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j+2]=this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.array[j+2]+((centerEnd.z)) //height?
                      this.lowResStamenAntherLayers[this.lowResStamenAntherLayers.length-1].attributes.position.needsUpdate = true;
                    }        
                                  this.lowResStamenAntherLayers[i].computeBoundingBox();

                    

                    
                    //MAYBE LATER: FIX: we'll rotate it!  
    // console.log(this.stamenGeomParams[i])
                    
  
  
        
            // console.log("BUFFER", buffer)
            
              // console.log("PARSED", e.data[0])
              // console.log("PARSED", buffer)
            
            
            
              // buffer.computeBoundingBox()
  
              // console.log(geometry2)
  
              // console.log("BUFGEOM2", "GEO3", geometry2)
              // geometry2.toNonIndexed()
              let geometry3 = optimizeMesh(geometry2)
              let unReducedGeometry = geometry2

              geometry2.computeBoundingBox()
              this.lowResStamenTubeLayers.push(geometry2.clone())
              this.lowResStamenTubeLayers[i].computeBoundingBox()

  // console.log(geometry3, "BUFGEOM3", "GEO3")
  
  // console.log
  
    // let geometry3 = simplifyMesh(
    //   buffer,
    //                     0.85, //OPTIMIZE NUMBER //PERCENT //RATE //1 = 100% 0.3 = 30% //SIMPLIFY NUMBER
    //                     true
    //                   );
  
  
        geometry3.computeBoundingBox();
        this.stamenGeomLayers.push(geometry3);
        this.stamenGeomLayers[i].computeBoundingBox();
  
                          this.stamenGeomMaterialParams.push(      {
    centerBegin: centerBegin,
    bbMin: {value: this.stamenGeomLayers[0].boundingBox.min},
    bbMax: {value: this.stamenGeomLayers[0].boundingBox.max},
    color1: {value: new THREE.Color(this.stamenGeomParams[i].materialSettings.color1)},
    color2: {value: new THREE.Color(this.stamenGeomParams[i].materialSettings.color2)},
    color3: {value: new THREE.Color(this.stamenGeomParams[i].materialSettings.color3)},
    color4: {value: new THREE.Color(this.stamenGeomParams[i].materialSettings.color4)},
    vertOffset: {value: this.stamenGeomParams[i].materialSettings.vertOffset},
     //changes vertical gradient intensity! moves from -1 to +1
    centerSize: {value: this.stamenGeomParams[i].materialSettings.centerSize},
        //controls central gradient position!
        //the lower the larger?
        //0-20
    centerSize2: {value: this.stamenGeomParams[i].materialSettings.centerSize2},
      // the lower the larger
    f3Offset: {value: this.stamenGeomParams[i].materialSettings.f3Offset},
    //controls scale of lowlights, the lower the larger
    topf2: {value:this.stamenGeomParams[i].materialSettings.topf2},
    vertCenterGradient: {value:this.stamenGeomParams[i].materialSettings.vertCenterGradient},
    lowlights: {value:this.stamenGeomParams[i].materialSettings.lowlights},
    subtleFade: {value:this.stamenGeomParams[i].materialSettings.subtleFade},
    defaultFade: {value:this.stamenGeomParams[i].materialSettings.defaultFade}} )
                    
                    
        
                    
                    
                    
      }
      
      
  
      
      // console.log("addMaterial!", materialSettings, window.materialIndex, materials)
      
      // console.log("flower", this)
      
      // console.log(this.materials, "materials!")
  
      
  for (let x=0; x<this.stamenGeomParams.length;x++){
    
  
      let stamenNumber = this.stamenGeomParams[x].stamenNumber;
    let angle, step
    if(this.stamenGeomParams[x].alternate == true){
      stamenNumber = stamenNumber/2
      step = (4*Math.PI) * (360/stamenNumber), angle = step
    } else if (this.stamenGeomParams[x].otherAlternate == true){
      stamenNumber = stamenNumber/2
      step = (4*Math.PI) * (360/stamenNumber), angle = 0
    } else {
      angle = 0, step = (2*Math.PI) * (360/stamenNumber);
    }
    
    if (this.stamenGeomParams[x].offset == true){
      stamenNumber = stamenNumber
      step = (2*Math.PI) * (360/stamenNumber), angle = 180/stamenNumber
    } else {
      angle = 0
    }
      
      let p_angle = 360
    
  
      
  let wholestamenGroup = new THREE.Object3D()
  wholestamenGroup.name = "wholestamenGroup"

  let highResStamenGroup = new THREE.Object3D()
  highResStamenGroup.name = "highResStamenGroup"
  
  let stamenGeomIndex = Object.freeze(0) //REDO TO FIX MATERIAL
  
  let meshMaterial = this.getMaterial({
    bbMin: {value: this.stamenGeomLayers[stamenGeomIndex].boundingBox.min},
    bbMax: {value: this.stamenGeomLayers[stamenGeomIndex].boundingBox.max},
    color1: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color1)},
    color2: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color2)},
    color3: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color3)},
    color4: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color4)},
    vertOffset: {value: this.stamenGeomParams[x].materialSettings.vertOffset},
     //changes vertical gradient intensity! moves from -1 to +1
    centerSize: {value: this.stamenGeomParams[x].materialSettings.centerSize},
        //controls central gradient position!
        //the lower the larger?
        //0-20
    centerSize2: {value: this.stamenGeomParams[x].materialSettings.centerSize2},
      // the lower the larger
    f3Offset: {value: this.stamenGeomParams[x].materialSettings.f3Offset},
    //controls scale of lowlights, the lower the larger
    topf2: {value:this.stamenGeomParams[x].materialSettings.topf2},
    vertCenterGradient: {value:this.stamenGeomParams[x].materialSettings.vertCenterGradient},
    lowlights: {value:this.stamenGeomParams[x].materialSettings.lowlights},
    subtleFade: {value:this.stamenGeomParams[x].materialSettings.subtleFade},
    defaultFade: {value:this.stamenGeomParams[x].materialSettings.defaultFade}
              }, true)
  
              meshMaterial.name = "meshMaterial" + fxrand()
  
  
    //           let ECMaterial = getMaterial({
    // bbMin: {value: this.stamenEndCaps[x].boundingBox.min},
    // bbMax: {value: this.stamenEndCaps[x].boundingBox.max},
    // color1: {value: new THREE.Color(this.stamenGeomParams[x].endCapMaterialSettings.color1)},
    // color2: {value: new THREE.Color(this.stamenGeomParams[x].endCapMaterialSettings.color2)},
    // color3: {value: new THREE.Color(this.stamenGeomParams[x].endCapMaterialSettings.color3)},
    // color4: {value: new THREE.Color(this.stamenGeomParams[x].endCapMaterialSettings.color4)},
    // vertOffset: {value: this.stamenGeomParams[x].endCapMaterialSettings.vertOffset},
    //  //changes vertical gradient intensity! moves from -1 to +1
    // centerSize: {value: this.stamenGeomParams[x].endCapMaterialSettings.centerSize},
    //     //controls central gradient position!
    //     //the lower the larger?
    //     //0-20
    // centerSize2: {value: this.stamenGeomParams[x].endCapMaterialSettings.centerSize2},
    //   // the lower the larger
    // f3Offset: {value: this.stamenGeomParams[x].endCapMaterialSettings.f3Offset},
    // //controls scale of lowlights, the lower the larger
    // topf2: {value:this.stamenGeomParams[x].endCapMaterialSettings.topf2},
    // vertCenterGradient: {value:this.stamenGeomParams[x].endCapMaterialSettings.vertCenterGradient},
    // lowlights: {value:this.stamenGeomParams[x].endCapMaterialSettings.lowlights},
    // subtleFade: {value:this.stamenGeomParams[x].endCapMaterialSettings.subtleFade},
    // defaultFade: {value:this.stamenGeomParams[x].endCapMaterialSettings.defaultFade}
    //           })
  
  
  //   console.log("SGPARAMS", this.stamenGeomParams[x].endCapMaterialSettings)
  //   console.log("SECONDPARAM", this.stamenGeomParams[x].materialSettings.color2)
  
                let ECMaterial = this.getMaterial({
    bbMin: {value:  this.stamenEndCaps[x].boundingBox.min},
    bbMax: {value:  this.stamenEndCaps[x].boundingBox.max},
    color1: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color3)},
    color2: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color3)},
    color3: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color1)},
    color4: {value: new THREE.Color(this.stamenGeomParams[x].materialSettings.color2)},
    vertOffset: {value: this.stamenGeomParams[x].endCapMaterialSettings.vertOffset},
     //changes vertical gradient intensity! moves from -1 to +1
    centerSize: {value: this.stamenGeomParams[x].endCapMaterialSettings.centerSize},
        //controls central gradient position!
        //the lower the larger?
        //0-20
    centerSize2: {value: this.stamenGeomParams[x].endCapMaterialSettings.centerSize2},
      // the lower the larger
    f3Offset: {value: this.stamenGeomParams[x].endCapMaterialSettings.f3Offset},
    //controls scale of lowlights, the lower the larger
    topf2: {value:this.stamenGeomParams[x].endCapMaterialSettings.topf2},
    vertCenterGradient: {value:this.stamenGeomParams[x].endCapMaterialSettings.vertCenterGradient},
    lowlights: {value:this.stamenGeomParams[x].endCapMaterialSettings.lowlights},
    subtleFade: {value:this.stamenGeomParams[x].endCapMaterialSettings.subtleFade},
    defaultFade: {value:this.stamenGeomParams[x].endCapMaterialSettings.defaultFade}
              })
  
    // this.stamenGeomLayers[stamenGeomIndex]
  
              ECMaterial.name = "ECMaterial" + fxrand()
  
  // let ECMaterial = meshMaterial
  
        
            for (let y =0; y<stamenNumber;y++){
        if(y==0){
           step = 0
        } else {
           step = (360/stamenNumber)
        }
        
          angle += step;
        
        // console.log(angle, "degrees")
        let radian = 2 * Math.PI * (angle / 360);
        // console.log(radian, "radian")
        let wholeStamen = new THREE.Object3D();
        let packingWholeStamen = new THREE.Object3D();
  
  
  
     
        let stamenMesh = new THREE.Mesh(this.stamenGeomLayers[x], meshMaterial)
  
  
              let endCapMesh = new THREE.Mesh(this.stamenEndCaps[x], ECMaterial)
  
  
  
  
  
        // wholeStamen.name = "wholestamen"
              // console.log(this.stamenGeomParams[x].material)
              // console.log(this.stamenGeomParams[x].endCapMaterial)
              // let stamenGeomIndex = Object.freeze(sGMP)
  
        // stamenMesh.scale.set(scale,scale,scale)
        
        // stamenMesh.updateMatrix();
  // Then do this:
  
  // var vector0 = new THREE.Vector3();
  
  // vector0.copy( stamenMesh.geometry.vertices[ 0 ] );
  
  // vector0.applyMatrix4( stamenMesh.matrix );
        
  stamenMesh.name = "stamenMesh"
        wholeStamen.add(stamenMesh)

        this.lowResStamenTubeLayers[x].computeBoundingBox()

        console.log("HIGHRESSTAMEN", this.lowResStamenTubeLayers[x])

        // packingWholeStamen.add(new THREE.Mesh(this.lowResStamenTubeLayers[x], meshMaterial))
        packingWholeStamen.add(new THREE.Mesh(this.lowResStamenTubeLayers[x], meshMaterial))



              // stamenEndCaps[x].scale(this.stamenGeomParams[x].endCapSaclex, this.stamenGeomParams[x].endCapSacley, this.stamenGeomParams[x].endCapSaclez)
        // let endCapIndex = Object.freeze(sECMP)
        let endCapIndex = Object.freeze(0) //REDO TO FIX
        

        endCapMesh.name = "endCapMesh"

  
        wholeStamen.add(endCapMesh)   
        console.log("HIGHRESSTAMEN", this.lowResStamenAntherLayers[x])
        packingWholeStamen.add(new THREE.Mesh(this.lowResStamenAntherLayers[x], ECMaterial))
  
  
        wholeStamen.scale.set(this.scale,this.scale,this.scale)
        packingWholeStamen.scale.set(this.scale,this.scale,this.scale)

        wholeStamen.rotation.z = radian;
        packingWholeStamen.rotation.z = radian;
  
        wholeStamen.updateMatrix();
        packingWholeStamen.updateMatrix();
      
              
                    if(this.stamenGeomParams[x].at0){
                      // console.log("AT 0 TRUE")
                      
                      let centerBegin = this.stamenGeomMaterialParams[x].centerBegin.z * this.scale
                      
                      // scene.add(wholeStamen)
          
  
            
            // scene.remove(wholeStamen)
            
            if(centerBegin > 0){
              wholeStamen.position.z = (wholeStamen.position.z-centerBegin) + 0.000001
              packingWholeStamen.position.z = (packingWholeStamen.position.z-centerBegin) + 0.000001
              wholeStamen.updateWorldMatrix(false, true)
              packingWholeStamen.updateWorldMatrix(false, true)
              // console.log("zpoint > 0")
            } else if (centerBegin < 0){
              wholeStamen.position.z = (wholeStamen.position.z+Math.abs(centerBegin)) + 0.000001
              packingWholeStamen.position.z = (packingWholeStamen.position.z+Math.abs(centerBegin)) + 0.000001
              wholeStamen.updateWorldMatrix(false, true)
              packingWholeStamen.updateWorldMatrix(false, true)
              // console.log("zpoint < 0")
            } else {
              // mesh.position.y = mesh.position.y+window.parameters[j].flowerGeomOffset
              // console.log("zpoint is 0", zPoint)
            }
  
          
        }
              
        wholeStamen.position.z = wholeStamen.position.z + this.lastBboxMin + 0.15
        packingWholeStamen.position.z = packingWholeStamen.position.z + this.lastBboxMin + 0.15
        wholeStamen.updateWorldMatrix(false, true)
        packingWholeStamen.updateWorldMatrix(false, true)
  
  //       wholeStamen.updateMatrix();
  // wholeStamen.applyMatrix( wholeStamen.matrix );
  // wholeStamen.position.set( 0, 0, 0 );
  // wholeStamen.rotation.set( 0, 0, 0 );
  // // wholeStamen.scale.set( 1, 1, 1 );
  // wholeStamen.updateMatrix();
  
  
  
        this.object.updateMatrix()
        if(trueReduction){ 
          this.lowResObject.updateMatrix()
        }
          this.packingObject.updateMatrix()
        // }
  
  
        wholeStamen.name = "wholeStamen"

        if(highResStamen){
          console.log("HIGHRESSTAMENNNN")
          wholestamenGroup.add(packingWholeStamen)
        } else {
          wholestamenGroup.add(wholeStamen)
        }
    


        // this.object.add(wholeStamen)
  
        wholeStamen.updateMatrix();
        wholeStamen.updateWorldMatrix(true,true);


        highResStamenGroup.add(packingWholeStamen)
        packingWholeStamen.updateMatrix();
        packingWholeStamen.updateWorldMatrix(true,true);

  // Then do this:
  
  // var vector2 = new THREE.Vector3();
  
  // vector2.copy( wholeStamen.geometry.vertices[ 0 ] );
  
  // vector2.applyMatrix4( wholeStamen.matrix );
  
  // console.log( vector );
        
      }
  
      if(highResStamen){
        this.object.add(highResStamenGroup.clone())
      } else {
        this.object.add(wholestamenGroup.clone())
      }

     


  
      if(trueReduction){
         this.lowResObject.add(wholestamenGroup.clone()) //TODO!!!
       
      }

      this.packingObject.add(highResStamenGroup.clone()) //TODO!!!
    
    //  console.log("params", "stamenParams", this.stamenGeomParams[x])
    
    // sECMP++
    // sGMP++
  
        
      
    
  } // end stamen geom params length 
  
  
  if(this.flowerType == "zinnia" || this.flowerType == "dahlia" || this.flowerType == "lotus" || this.flowerType == "camelia" || this.flowerType == "rose"){
  // console.log("IS ROTATABLE", this)
    this.object.rotation.x = -Math.PI / 2;
    this.object.updateWorldMatrix(false, true)
  
    if(trueReduction){
      this.lowResObject.rotation.x = -Math.PI / 2;
      this.lowResObject.updateWorldMatrix(false, true)
    }

      this.packingObject.rotation.x = -Math.PI / 2;
      this.packingObject.updateWorldMatrix(false, true)
    // }
    // wholeStamen.rotation.x = Math.PI / 2;
  }
      
  // this.object.updateMatrix()
      
  
  // console.log("flowerType", this.flowerType)
  var points =[[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0],[0.00001, 0, 0]];
     
  var axis = new THREE.Vector3(0, 0, 1);
  
  // const radius = 0.05
  let vector = new THREE.Vector3().fromArray(points[i]);
  
      // console.log("LAYERS", this.layers)
      //1 or 2 layers, depending on 1 or 2 layer flower.
  
  
  
  
  let generateDots = this.generateDotsval
  let generateDotsTrue = this.generateDotsValTrue
  
  
  let dotParams = [
  // {dotNumber: 50, maxSize: 0.17},
  // {dotNumber: 50, maxSize: 0.1},
  {dotNumber: 30, maxSize: 0.2},
  {dotNumber: 100, maxSize: 0.07},
  
  // {dotNumber: 100, maxSize: 0.07}, 
  // {dotNumber: 100, maxSize: 0.07}, 
  // {dotNumber: 100, maxSize: 0.07},
  // {dotNumber: 100, maxSize: 0.07}, //used to be 0.4
  // {dotNumber: 100, maxSize: 0.07}, 
  // {dotNumber: 100, maxSize: 0.07} // used to be 0.5
  ] 
  let paramChoice = dotParams[Math.floor(fxrand()*dotParams.length)];
  

  if(this.spherical){

switch(this.flowerType){
    case "dahlia":
        // paramChoice.dotNumber = 1
        paramChoice = {dotNumber: 0, maxSize: 0, nodots:true}
  break;

  case "zinnia":


    break;

    case "camelia":
        // paramChoice.dotNumber = 0
        paramChoice = {dotNumber: 0, maxSize: 0, nodots:true}
  break;

  case "rose":


    break;

    case "lotus":
        // paramChoice.dotNumber = 0
        paramChoice = {dotNumber: 0, maxSize: 0, nodots:true}

    break;
}

    // paramChoice.dotNumber = 0
    // paramChoice.maxSize = 2
  }

  
  if(!generateDotsTrue){
  paramChoice = {dotNumber: 0, maxSize: 0, nodots:true}
  }
  



  this.dotsSettings = paramChoice
  
  
  
  
  
  
  
  this.preDots = []
  
  this.fordotworkers = []
  this.addedMaterials = []
  if(generateDots){
  this.dotMaterials = []
  }
  
      for (let j=0; j<this.layers.length;j++){
          // console.log("material!", this.materials[j])
          // console.log("material!", this.materialSettings)
          //     console.log("material!",this.materials)
          //     console.log(this.layers)
          //     console.log(this.materials)
          //     console.log(j)
          // console.log(this.materials[j])
  
          this.materialSettings[j].generateDots = generateDots
  
          let addedMaterial = this.addMaterialNew(this.materialSettings[j], j, this.layers[j], this)
        this.addedMaterials.push(addedMaterial)
  
  
          this.addTransReorientedMesh(this.layers[j], addedMaterial, this.object, axis ,vector, j, this) //add flower with material
  
          if(trueReduction){ 
            this.addTransReorientedMeshLowRes(this.lowResLayers[j], addedMaterial, this.lowResObject, axis ,vector, j, this) //add flower with material
          }
  
        this.addPackingMesh(this.packingLayers[j], addedMaterial, this.packingObject, axis ,vector, j, this) //add flower with material
  
  
          // this.generateDots()
  
          // console.log("FLOWERMAT", getMaterial(this.materialSettings[0]))
                // this.addTransReorientedMesh(this.layers[j], getMaterial(this.materialSettings[0]), this.object, axis ,vector, j) //add flower with material
  
          // addTransReorientedMesh(layers[j], new THREE.MeshPhongMaterial({color:0xffffff}), object, axis ,vector, j)
        }
  
  
        //CHOOSE DOT COLOR!!!!
        if(generateDots){
          for (let j=0; j<this.layers.length;j++){
            let settings = this.materialSettings[j]
      let colorChoiceArray = [ settings.color3Prod, settings.color1Prod, settings.color2Prod ]
      // let colorChoiceArray = [ settings.color3Prod]
  
      // let colorChoiceArray =  this.colorChoiceArr
  
  
      // this.colorChoiceArr = stripeColorChoiceArr
  
     let colorChoice = colorChoiceArray[Math.floor(fxrand()*colorChoiceArray.length)];
     let dotMaterial = new THREE.MeshPhysicalMaterial({color:new THREE.Color(colorChoice), side:THREE.DoubleSide})
     dotMaterial.name = "dotMaterial" + fxrand()
     this.dotMaterials.push(dotMaterial)
          }
        }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  let newmesh = []
        // for (var k=0; k<this.preDots.length; k++){
          if(this.materialSettings[0].generateDots){
  
            for (var k=0; k<this.preDots.length; k++){
              
let dotrandoms = this.dotrandomsArr[k]
  
  newmesh.push([this.preDots[k], dotrandoms])
  
console.log("NEWMESH123", newmesh, this.flowerIndexNumber)

            }
  
  
    //         if(!window.dotCompute){
    //         let dotmesh = this.generateDots(this.preDots[0],this.addedMaterials[0],this.materialSettings[0], this.dotsSettings, this )
    //   console.log("NEWMESH", "DOTMESH", dotmesh)
    //   window.dotCompute = true
    // }
  
            // this.fordotworkers.push([newmesh])
            // this.object.add(newmesh)
  
let dotResolution = document.getElementById("dotResolution").value
console.log("DOTRESOLUTION", dotResolution)
if(dotResolution !== ""){
  highResDots = true
}

  if(newmesh.length == 1){
  
  window.dotworkers[window.dotworkernumber%window.dotworkers.length].postMessage(["makedot",
             {index: this.flowerIndexNumber,
               flowerNum:this.flowerNum, 
               workerNum: window.dotworkernumber%window.dotworkers.length,
                geometry0data:{
                  normal: newmesh[0][0].geometry.attributes.normal.array,
                  positions:newmesh[0][0].geometry.attributes.position.array,
                  uv:newmesh[0][0].geometry.attributes.uv.array,
                  index:newmesh[0][0].geometry.index.array,
                  matrix:newmesh[0][0].matrix.elements,
                  matrixWorld:newmesh[0][0].matrixWorld.elements,
                  name:newmesh[0][0].name,
                  position:newmesh[0][0].position,
                  up:newmesh[0][0].up,
                  randoms:newmesh[0][1],
                  materialSettings:this.materialSettings[0],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[0].attributes.position.array}, normal:{array:this.packingLayers[0].attributes.normal.array}}},
                  highResDots: highResDots,
                  hrDotResolution: dotResolution
                }
  
  
                
               
              
              }])
  
  
  
              window.dotworkersflowers[window.dotworkernumber%window.dotworkers.length].postMessage(["makedot",
             {index: this.flowerIndexNumber,
               flowerNum:this.flowerNum, 
               workerNum: window.dotworkernumber%window.dotworkers.length,
                geometry0data:{
                  normal: newmesh[0][0].geometry.attributes.normal.array,
                  positions:newmesh[0][0].geometry.attributes.position.array,
                  uv:newmesh[0][0].geometry.attributes.uv.array,
                  index:newmesh[0][0].geometry.index.array,
                  matrix:newmesh[0][0].matrix.elements,
                  matrixWorld:newmesh[0][0].matrixWorld.elements,
                  name:newmesh[0][0].name,
                  position:newmesh[0][0].position,
                  up:newmesh[0][0].up,
                  randoms:newmesh[0][1],
                  materialSettings:this.materialSettings[0],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[0].attributes.position.array}, normal:{array:this.packingLayers[0].attributes.normal.array}}},
                  highResDots: highResDots,
                  hrDotResolution: dotResolution
                }
  
  
                
               
              
              }])
  
              this.addedDots = true
              this.dotArray = []
              this.flowerDotArray = []
  
  
  } else if (newmesh.length==2){
  
    console.log("DOTRANDOMS123", this.flowerIndexNumber)
    console.log("DOTRANDOMS123", this.packingLayers)


            window.dotworkers[window.dotworkernumber%window.dotworkers.length].postMessage(["makedot",
             {index: this.flowerIndexNumber,
               flowerNum:this.flowerNum, 
               workerNum: window.dotworkernumber%window.dotworkers.length,
               
               geometry0data:{
                  normal: newmesh[0][0].geometry.attributes.normal.array,
                  positions:newmesh[0][0].geometry.attributes.position.array,
                  uv:newmesh[0][0].geometry.attributes.uv.array,
                  index:newmesh[0][0].geometry.index.array,
                  matrix:newmesh[0][0].matrix.elements,
                  matrixWorld:newmesh[0][0].matrixWorld.elements,
                  name:newmesh[0][0].name,
                  position:newmesh[0][0].position,
                  up:newmesh[0][0].up,
                  randoms:newmesh[0][1],
                  materialSettings:this.materialSettings[0],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[0].attributes.position.array}, normal:{array:this.packingLayers[0].attributes.normal.array}}},
                  highResDots: highResDots,
                  hrDotResolution: dotResolution
                },
                geometry1data:{
                  normal: newmesh[1][0].geometry.attributes.normal.array,
                  positions:newmesh[1][0].geometry.attributes.position.array,
                  uv:newmesh[1][0].geometry.attributes.uv.array,
                  index:newmesh[1][0].geometry.index.array,
                  matrix:newmesh[1][0].matrix.elements,
                  matrixWorld:newmesh[1][0].matrixWorld.elements,
                  name:newmesh[1][0].name,
                  position:newmesh[1][0].position,
                  up:newmesh[1][0].up,
                  randoms:newmesh[1][1],
                  materialSettings:this.materialSettings[1],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[1].attributes.position.array}, normal:{array:this.packingLayers[1].attributes.normal.array}}}
                },
              
              }])
  
  
  
            window.dotworkersflowers[window.dotworkernumber%window.dotworkers.length].postMessage(["makedot",
             {index: this.flowerIndexNumber,
               flowerNum:this.flowerNum, 
               workerNum: window.dotworkernumber%window.dotworkers.length,
               
               geometry0data:{
                  normal: newmesh[0][0].geometry.attributes.normal.array,
                  positions:newmesh[0][0].geometry.attributes.position.array,
                  uv:newmesh[0][0].geometry.attributes.uv.array,
                  index:newmesh[0][0].geometry.index.array,
                  matrix:newmesh[0][0].matrix.elements,
                  matrixWorld:newmesh[0][0].matrixWorld.elements,
                  name:newmesh[0][0].name,
                  position:newmesh[0][0].position,
                  up:newmesh[0][0].up,
                  randoms:newmesh[0][1],
                  materialSettings:this.materialSettings[0],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[0].attributes.position.array}, normal:{array:this.packingLayers[0].attributes.normal.array}}},
                  highResDots: highResDots,
                  hrDotResolution: dotResolution
                },
                geometry1data:{
                  normal: newmesh[1][0].geometry.attributes.normal.array,
                  positions:newmesh[1][0].geometry.attributes.position.array,
                  uv:newmesh[1][0].geometry.attributes.uv.array,
                  index:newmesh[1][0].geometry.index.array,
                  matrix:newmesh[1][0].matrix.elements,
                  matrixWorld:newmesh[1][0].matrixWorld.elements,
                  name:newmesh[1][0].name,
                  position:newmesh[1][0].position,
                  up:newmesh[1][0].up,
                  randoms:newmesh[1][1],
                  materialSettings:this.materialSettings[1],
                  dotsSettings: this.dotsSettings,
                  nonIndexed: {attributes:{position:{array:this.packingLayers[1].attributes.position.array}, normal:{array:this.packingLayers[1].attributes.normal.array}}}
                }
              
              }])
  
              this.addedDots = true
              this.dotArray = []
              this.flowerDotArray = []
  
  }
  
  
  for (var k=0; k<newmesh.length; k++){
  console.log("NEWMESHCHILDREN", newmesh[k][0])
  // newmesh[k][0].geometry.dispose()
  // this.preDots[k].geometry.dispose()
  // this.layers[k].dispose()
  
  
  //TODO
  // disposeNode ( newmesh[k][0])
  // disposeNode (this.preDots[k])
  // disposeNode (this.layers[k])
  }
  console.log("PREDOTS", this.preDots)
  
  this.preDots.length = 0
  this.layers.length=0
       
  
       
       
            window.dotworkernumber++
       
        if(window.dotworkernumber > window.dotworkers.length-1){
         window.dotworkernumber = 0
        }
          
          } else {
  
  
            for (var k=0; k<this.preDots.length; k++){
              newmesh.push(this.preDots[k])
              // this.preDots[k].geometry.dispose()
              // this.preDots[k].material.dispose()
              // this.layers[k].dispose()
  disposeNode( this.preDots[k])
  
  disposeNode(this.layers[k])
            }
            this.layers.length = 0
            this.preDots.length = 0
  
            // console.log("NEWMESH", newmesh)
  
            ondotmessage({
            meshes: newmesh,
            index: this.flowerIndexNumber
            
          }, true)
  
          ondotflowermessage({
            index: this.flowerIndexNumber
          }, true)
  
  
  
  
           
  
          }
       
        //  this.generateRest()
  
  
  
  
  
      }