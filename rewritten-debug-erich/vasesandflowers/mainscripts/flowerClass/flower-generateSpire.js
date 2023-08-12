Flower.prototype.generateHull = function(customResolution = false){


    
    
    
    
    
       let ConvexHull =  window.ConvexHull
       let ConvexGeometry =     window.ConvexGeometry
    
       console.log("OBJECTSHULL", this.packingObject, this.flowerIndexNumber)
            console.log("OBJECTS", this.packingObject)
    
    
            this.convexHull = new ConvexHull().setFromObject( this.packingObject );
    
    
            // disposeHierarchy (this.objects[0], disposeNode);
            // this.objects[0] = undefined
    
            console.log("OBJECTS", this.convexHull)
    
        
        let vertices = []
        this.convexHull.vertices.forEach(vertex=>{
          vertices.push(vertex.point)
        })
    
    // console.log("CONVEX HULL VERTICES", vertices)
    // console.log("CONVEX HULL VERTICES", "THIS OBJECT", this.objects[0])
    
    
        
        const geometry = new ConvexGeometry( vertices );
        // this.objects.push(geometry)
    
    
        // console.log("FINDVOLUME", this.convexHull)
    // console.log("FINDVOLUME", this)
    
    //this.convexhull.vertices.point
    
    // function getVolume(vertices) {
    //   let volume = 0;
    //   for (let i = 0; i < vertices.length; i += 3) {
    //     if(vertices[i + 8]){
    //     let x1 = vertices[i].point.x;
    //     let y1 = vertices[i + 1].point.y;
    //     let z1 = vertices[i + 2].point.z;
    //     let x2 = vertices[(i + 3) % vertices.length].point.x;
    //     let y2 = vertices[(i + 4) % vertices.length].point.y;
    //     let z2 = vertices[(i + 5) % vertices.length].point.z;
    //     let x3 = vertices[(i + 6) % vertices.length].point.x;
    //     let y3 = vertices[(i + 7) % vertices.length].point.y;
    //     let z3 = vertices[(i + 8) % vertices.length].point.z;
    //     volume += x1 * y2 * z3 - x1 * y3 * z2 + y1 * z2 * x3 - y1 * x2 * z3 + z1 * x2 * y3 - z1 * y2 * x3;
    //     }
    //   }
    //   volume /= 6;
    //   return Math.abs(volume);
    // }
    
    
    function getVolume(vertices) {
        // console.log("FINDVOLUME", vertices)
      let volume = 0;
      for (let i = 0; i < vertices.length; i += 3) {
        if(vertices[i + 8]){
        let x1 = vertices[i];
        let y1 = vertices[i + 1];
        let z1 = vertices[i + 2];
        let x2 = vertices[(i + 3) % vertices.length];
        let y2 = vertices[(i + 4) % vertices.length];
        let z2 = vertices[(i + 5) % vertices.length];
        let x3 = vertices[(i + 6) % vertices.length];
        let y3 = vertices[(i + 7) % vertices.length];
        let z3 = vertices[(i + 8) % vertices.length];
        volume += x1 * y2 * z3 - x1 * y3 * z2 + y1 * z2 * x3 - y1 * x2 * z3 + z1 * x2 * y3 - z1 * y2 * x3;
        }
      }
      volume /= 6;
      return Math.abs(volume);
    }
    
    // console.log("FINDVOLUME",)
    
    // this.volume =  getVolume(this.convexHull.vertices)
    this.volume = getVolume(geometry.attributes.position.array)


    console.log("FINDVOLUME", this.volume, this.flowerIndexNumber) 
    
    
    // console.log("CONVEX HULL VERTICES", "GEOMETRY", geometry.attributes.position.array)
    
        console.log(this.objects)
    
    
    
    
    
    
    //USE geometry.attributes.position.array //IS CONVEX HULL VERTICES
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    
    
                    var pts = geometry.attributes.position.array
                    
    
    
    // const geommm = geometry
    // const hull = geometry
        const hullGeo = geometry
        // flower.objects.push(hullGeo)
        // console.log(flower.objects)
        const hullmat = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity:0.5, transparent:true, side: THREE.DoubleSide } );
        const hullCloneMesh = new THREE.Mesh( hullGeo, hullmat );
        // scene.add(hullCloneMesh)
    
    
        class MovingPoint {
        constructor(x, y, vx, vy) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
        }
    }
    
                            let vetices = []
                            let twodVerts = []
    
                            for(var i=0; i<pts.length;i+=3){
                                if(pts[i+2]){
                            vetices.push(new THREE.Vector3(pts[i], pts[i+1], 0))
                            twodVerts.push(new MovingPoint(pts[i], pts[i+1], 0, 0))
                                }
                            }
    
                            const twaodHull = convexhull.makeHull(twodVerts);
                            console.log(twaodHull)
    
                            // console.log(vetices)
    
                            let convHullVerts= []
    
                            for(var i=0; i<twaodHull.length;i++){
                                convHullVerts.push(new THREE.Vector3(twaodHull[i].x, twaodHull[i].y, 0))
                            }
    
                            
                        
    
    // shape
    console.log(convHullVerts)
    var geomShape = new THREE.ShapeGeometry(new THREE.Shape(convHullVerts));
   
    this.SHAPEVERTS = convHullVerts
    console.log("SHAPEVERTS", this.SHAPEVERTS, this.flowerIndexNumber)
    this.SHAPEGEOM = geomShape
    
    console.log(this)
    
    var matShape = new THREE.MeshBasicMaterial({color:"blue"});
    var shape = new THREE.Mesh(geomShape, matShape);
    this.SHAPEMESH = shape
    convHullVerts = undefined
    

                                this.convexHull.makeEmpty()
                                this.convexHull.cleanup()
    
                                vertices = undefined;
                                this.convexHull = undefined;
    
    
    
    //GET PROJECTED SHAPE OF THE FLOWER IN 2D TO PACK
    
    
    
    console.log("TEST1", "GENERATED HULL", this.flowerIndexNumber)



                        }

        
      
    Flower.prototype.generateSpireAndHull = function(){
      
    // if(trueReduction){
    
    //   this.generateSpire(true)
    //   this.generateHull(true)
    
    // } else {
    
      this.generatePackSpire()
      this.generateHull()

      this.generateSpire()
     
    
    // }
    
       
        
        
        
        }


Flower.prototype.generateSpire = function(customResolution = false){


// if(customResolution){
// console.log("CUSTOM RESOLUTION! generate regular hull and reduce that! watch out")
// }


    function lookAwayFrom(me, target) {
      var v = new THREE.Vector3();
      v.subVectors(me.position, target).add(me.position);
      me.lookAt(v);
  }
  
        console.log("TEST1", "generatespireandhull")
      
                
          
      let radius = 0.25
            const dropoff = 0.1 // vertical space between spiral rows
            const spacing = 4.1 //at least 1
            const interval = 1
            let position = true
            
            let object3 = new THREE.Object3D();
            let object4 = new THREE.Object3D();
            let lastPos
        
      
      
        
        
        
        //    _____ ______ _   _ ______ _____         _______ ______       _____ _____ _____ _____  ______  _____ 
        //   / ____|  ____| \ | |  ____|  __ \     /\|__   __|  ____|     / ____|  __ \_   _|  __ \|  ____|/ ____|
        //  | |  __| |__  |  \| | |__  | |__) |   /  \  | |  | |__       | (___ | |__) || | | |__) | |__  | (___  
        //  | | |_ |  __| | . ` |  __| |  _  /   / /\ \ | |  |  __|       \___ \|  ___/ | | |  _  /|  __|  \___ \ 
        //  | |__| | |____| |\  | |____| | \ \  / ____ \| |  | |____      ____) | |    _| |_| | \ \| |____ ____) |
        //   \_____|______|_| \_|______|_|  \_\/_/    \_\_|  |______|    |_____/|_|   |_____|_|  \_\______|_____/ 
                                                                                                               
                                                                                                               
                                                                                                            
                                                                                                            
        
        
        //GENERATE FLOWER SPIRES! // NEED TO COMBINE THESE INTO ONE GEOM! 
        
        
        
        
        if ((this.flowerType == "1Layer-collection1" || this.flowerType == "1Layer-collection2-scale" || this.flowerType == "1Layer-collection2" || this.flowerType=="1Layer-collection2-scale2" || this.flowerSpire || this.flowerType=="1Layer-collection2-scale-Helix") && this.hasSpired == false){
          // console.log("this.flowerType", "this.flowerType is...", this.flowerType, "!")
        
            // this.object.add()
        
            
                // var instances = 245;
                      // 20
                      let instances = (Math.ceil(this.dotrandoms[0][1]*40) + 20)
                      if (this.flowerType == "1Layer-collection2-scale-Helix"){
                      //50
                        instances = (Math.ceil(this.dotrandoms[0][1]*10)+50)
                      }
                      
                      
                          for ( let i = interval, l = instances*interval; i < l; ) {
                            // console.log("running!")
        
                            // object2.lookAt( new THREE.Vector3(0, 0, 0) );
                            let object2
                            
        
                              // console.log("false!")
                            const theta = i*spacing
                            const y = - ( i * dropoff );
      
                            console.log("OBJECT2CLONE", this.object)

                            if(trueReduction){
                                object2 = this.lowResObject.clone(); //NOW COPYING
                             } else {
                                object2 = this.object.clone(); //NOW COPYING
                             }

                             this.hasSpired = true

                          
                            // object2 = new THREE.Object3D().copy(this.object)
                            
        
                            if (this.flowerType == "1Layer-collection1"){
                             object2.position.setFromSphericalCoords( radius, theta/0.2535, y );
                             object2.updateWorldMatrix(false, true)
                             const vector2 = new THREE.Vector3();
                            vector2.x = object2.position.x  ;
                            vector2.y = object2.position.y;
                            vector2.z = object2.position.z ;
                            
                              //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                              lookAwayFrom(object2, new THREE.Vector3(0, this.object.position.y, 0))
                              object2.updateWorldMatrix(false, true)
                            }
        
                            if (this.flowerType == "1Layer-collection2-scale"){
                              //SINGLE HELIX?
                            radius = 0.25
                            if(i == l-interval){
                              radius = 0
                            }
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) ); //original
                                                                                                                //theta/0.0435 shark fin
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0455, y*((i/(192*4))+0.5) ); //makes a triple spiral thing
                                                                                                              //theta/0.0451 double helix, open bottom
                                                                                                              //theta/0.0455 triple spiral
                                                                                                              //theta/0.0244 quadruple spiral
        
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.5) ); //maybe better than original? 
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.2) ); //maybe better than original? 
                            object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.023383, y*((2/(192*4))+0.07) ); //maybe better than original? 
                            object2.updateWorldMatrix(false, true)
        
                            object2.scale.set(instances/((i+100)*(((i+10)/20)+4)),instances/((i+100)*(((i+10)/20)+4)),instances/((i+100)*(((i+10)/20)+4)))
                            object2.updateWorldMatrix(false, true)
                            const vector2 = new THREE.Vector3();
                            vector2.x = object2.position.x  ;
                            vector2.y = object2.position.y;
                            vector2.z = object2.position.z ;
                            
                              //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                              // lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0)) //original
                              lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.015*((i+1)/16)), 0))
                              object2.updateWorldMatrix(false, true)
                            }
        
        
                            if (this.flowerType == "1Layer-collection2-scale-Helix"){
                            radius = 0.5
        
                            if(i == l-interval){
                              radius = 0
                            }
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) ); //original
                                                                                                                //theta/0.0435 shark fin
                            object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0443416, y*((i/(192*4))+0.5) ); //DOUBLE HELIX
                            object2.updateWorldMatrix(false, true)
                                                                                                              //theta/0.0451 double helix, open bottom
                                                                                                              //theta/0.0455 triple spiral
                                                                                                              //theta/0.0244 quadruple spiral
                                                                                                              //theta/0.0447 pentuple spiral
                                 
                                                                                                              //theta/0.04435 imperfect hextuple
        
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.5) ); //maybe better than original? 
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.2) ); //maybe better than original? 
        
        
        
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.023383, y*((2/(192*4))+0.07) ); //maybe better than original? 
        
                            object2.scale.set(instances/((i+70)*(((i+10)/20)+2)),instances/((i+70)*(((i+10)/20)+2)),instances/((i+70)*(((i+10)/20)+2)))
                            object2.updateWorldMatrix(false, true)
                            const vector2 = new THREE.Vector3();
                            vector2.x = object2.position.x  ;
                            vector2.y = object2.position.y;
                            vector2.z = object2.position.z ;
                            
                              //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                              // lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0)) //original
                              lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.015*((i+1)/16)), 0))
                              object2.updateWorldMatrix(false, true)
                            }
        
        
                            if (this.flowerType == "1Layer-collection2-scale2"){
                            radius = 0.25
                            if(i == l-interval){
                              radius = 0
                            }
                            object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) );
                            object2.updateWorldMatrix(false, true)
                            // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*16))+0.1) );
                            object2.scale.set(instances/((i+100)*(((i+10)/20)+0.5)),instances/((i+100)*(((i+10)/20)+0.5)),instances/((i+100)*(((i+10)/20)+0.5)))
                            object2.updateWorldMatrix(false, true)
                            const vector2 = new THREE.Vector3();
                            vector2.x = object2.position.x  ;
                            vector2.y = object2.position.y;
                            vector2.z = object2.position.z ;
                            
                              //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                              lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0))
                              object2.updateWorldMatrix(false, true)
                            }
        
                            if (this.flowerType == "1Layer-collection2"){
                            object2.position.setFromCylindricalCoords( radius, theta/1.035, y );
                            object2.updateWorldMatrix(false, true)
                            const vector2 = new THREE.Vector3();
                            vector2.x = object2.position.x  ;
                            vector2.y = object2.position.y;
                            vector2.z = object2.position.z ;
                            
                              //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                              lookAwayFrom(object2, new THREE.Vector3(0, this.object.position.y, 0))
                              object2.updateWorldMatrix(false, true)
                            }
        
        
        
        
                              i +=interval
                              position = this.object.position.y
                          
        
                            // rotateAboutPoint(object2, new THREE.Vector3(0, object2.position.y, 0), object2.position, (30 * ( Math.PI / 180)))
                            object4.add(object2)
                            // targets.helix.push( object2 );
                           }
        
                          // const geometry12345 = new THREE.SphereGeometry( 0.5, 32, 16 );
                          // const material123456 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                          // const sphere1234567 = new THREE.Mesh( geometry12345, material123456 );
                          // object4.add( sphere1234567 );
        
                          object4.rotation.x = -Math.PI / 2; //90 degrees!
                          object4.updateWorldMatrix(false, true)
        
        
                          // object4.scale.set (3, 3, 3)
        
                          if (this.flowerType == "1Layer-collection2"){object4.scale.set (0.8, 0.8, 0.8)}
                          if (this.flowerType == "1Layer-collection2-scale2"){object4.scale.set (2, 2, 2)}
                          if (this.flowerType == "1Layer-collection2-scale"){object4.scale.set (3, 3, 3)} //single helix shape
                          if (this.flowerType == "1Layer-collection1"){object4.scale.set (0.5, 0.5, 0.5)}
                          if (this.flowerType == "1Layer-collection2-scale-Helix"){object4.scale.set (3, 3, 3)}
        
                          object4.updateWorldMatrix(false, true)
                          // console.log("FLOWERTYPECHECK", this.flowerType)
        
        
                        //   console.log(object4)
        
                          object3.add(object4)
                          } else {
        
                            // console.log("IS ROTATABLE")
        
                            if(trueReduction){
                                object3.add(this.lowResObject)
                             } else {
                                object3.add(this.object)
                             }

        
                            
        
                          }
        
        
            //               if(trueReduction){
      
       
            //   object3.name = "flower"+(window.flowerNumber)
            // this.object3Name =  "flower"+(window.flowerNumber)
            // window.flowerNumber++
            // console.log("PUSHED OBJ 3")
            // console.log("THISOBJECTS", this.objects)
            // this.objects.push(object3)
      
      
            // if(this.object3Name){
            //   object3.name = this.object3Name
            // this.object3Name =  this.object3Name
            // this.objects[0] = object3
      
            // }
            
      
            //               } else {
      
                            if(this.object3Name){
              object3.name = this.object3Name
            this.object3Name =  this.object3Name
            this.objects[0] = object3

            this.object = object3

            if(trueReduction){
                // this.object = object3
                this.lowResObject = object3
            }

      
            } else {
              object3.name = "flower"+(window.flowerNumber)
            this.object3Name =  "flower"+(window.flowerNumber)
            window.flowerNumber++
            console.log("PUSHED OBJ 3")
            console.log("THISOBJECTS", this.objects)
            this.objects.push(object3)

            this.object = object3

            if(trueReduction){
                // this.object = object3
                this.lowResObject = object3
            }

            }








                        //   }
      
           
            
      
           
      
      
      }


Flower.prototype.generatePackSpire = function(customResolution = false){


        if(customResolution){
        console.log("CUSTOM RESOLUTION! generate regular hull and reduce that! watch out")
        }
        
        
            function lookAwayFrom(me, target) {
              var v = new THREE.Vector3();
              v.subVectors(me.position, target).add(me.position);
              me.lookAt(v);
          }
          
                console.log("TEST1", "generatespireandhull")
              
                        
                  
              let radius = 0.25
                    const dropoff = 0.1 // vertical space between spiral rows
                    const spacing = 4.1 //at least 1
                    const interval = 1
                    let position = true
                    
                    let object3 = new THREE.Object3D();
                    let object4 = new THREE.Object3D();
                    let lastPos
                
              
              
                
                
                
                //    _____ ______ _   _ ______ _____         _______ ______       _____ _____ _____ _____  ______  _____ 
                //   / ____|  ____| \ | |  ____|  __ \     /\|__   __|  ____|     / ____|  __ \_   _|  __ \|  ____|/ ____|
                //  | |  __| |__  |  \| | |__  | |__) |   /  \  | |  | |__       | (___ | |__) || | | |__) | |__  | (___  
                //  | | |_ |  __| | . ` |  __| |  _  /   / /\ \ | |  |  __|       \___ \|  ___/ | | |  _  /|  __|  \___ \ 
                //  | |__| | |____| |\  | |____| | \ \  / ____ \| |  | |____      ____) | |    _| |_| | \ \| |____ ____) |
                //   \_____|______|_| \_|______|_|  \_\/_/    \_\_|  |______|    |_____/|_|   |_____|_|  \_\______|_____/ 
                                                                                                                       
                                                                                                                       
                                                                                                                    
                                                                                                                    
                
                
                //GENERATE FLOWER SPIRES! // NEED TO COMBINE THESE INTO ONE GEOM! 
                
                
                
                
                if ((this.flowerType == "1Layer-collection1" || this.flowerType == "1Layer-collection2-scale" || this.flowerType == "1Layer-collection2" || this.flowerType=="1Layer-collection2-scale2" || this.flowerSpire || this.flowerType=="1Layer-collection2-scale-Helix") && this.lowResSpired == false){
                  // console.log("this.flowerType", "this.flowerType is...", this.flowerType, "!")
                
                    // this.object.add()
                
                    this.lowResSpired = true
                        // var instances = 245;
                              // 20
                              let instances = (Math.ceil(this.dotrandoms[0][1]*40) + 20)
                              if (this.flowerType == "1Layer-collection2-scale-Helix"){
                              //50
                                instances = (Math.ceil(this.dotrandoms[0][1]*10)+50)
                              }
                              
                              
                                  for ( let i = interval, l = instances*interval; i < l; ) {
                                    // console.log("running!")
                
                                    // object2.lookAt( new THREE.Vector3(0, 0, 0) );
                                    let object2
                                    
                
                                      // console.log("false!")
                                    const theta = i*spacing
                                    const y = - ( i * dropoff );
              
                                    console.log("OBJECT2CLONE", this.packingObject)
                                    object2 = this.packingObject.clone(); //NOW COPYING
                                    // object2 = new THREE.Object3D().copy(this.object)
                                    
                
                                    if (this.flowerType == "1Layer-collection1"){
                                     object2.position.setFromSphericalCoords( radius, theta/0.2535, y );
                                     object2.updateWorldMatrix(false, true)
                                     const vector2 = new THREE.Vector3();
                                    vector2.x = object2.position.x  ;
                                    vector2.y = object2.position.y;
                                    vector2.z = object2.position.z ;
                                    
                                      //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                                      lookAwayFrom(object2, new THREE.Vector3(0, this.object.position.y, 0))
                                      object2.updateWorldMatrix(false, true)
                                    }
                
                                    if (this.flowerType == "1Layer-collection2-scale"){
                                      //SINGLE HELIX?
                                    radius = 0.25
                                    if(i == l-interval){
                                      radius = 0
                                    }
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) ); //original
                                                                                                                        //theta/0.0435 shark fin
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0455, y*((i/(192*4))+0.5) ); //makes a triple spiral thing
                                                                                                                      //theta/0.0451 double helix, open bottom
                                                                                                                      //theta/0.0455 triple spiral
                                                                                                                      //theta/0.0244 quadruple spiral
                
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.5) ); //maybe better than original? 
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.2) ); //maybe better than original? 
                                    object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.023383, y*((2/(192*4))+0.07) ); //maybe better than original? 
                                    object2.updateWorldMatrix(false, true)
                
                                    object2.scale.set(instances/((i+100)*(((i+10)/20)+4)),instances/((i+100)*(((i+10)/20)+4)),instances/((i+100)*(((i+10)/20)+4)))
                                    object2.updateWorldMatrix(false, true)
                                    const vector2 = new THREE.Vector3();
                                    vector2.x = object2.position.x  ;
                                    vector2.y = object2.position.y;
                                    vector2.z = object2.position.z ;
                                    
                                      //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                                      // lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0)) //original
                                      lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.015*((i+1)/16)), 0))
                                      object2.updateWorldMatrix(false, true)
                                    }
                
                
                                    if (this.flowerType == "1Layer-collection2-scale-Helix"){
                                    radius = 0.5
                
                                    if(i == l-interval){
                                      radius = 0
                                    }
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) ); //original
                                                                                                                        //theta/0.0435 shark fin
                                    object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0443416, y*((i/(192*4))+0.5) ); //DOUBLE HELIX
                                    object2.updateWorldMatrix(false, true)
                                                                                                                      //theta/0.0451 double helix, open bottom
                                                                                                                      //theta/0.0455 triple spiral
                                                                                                                      //theta/0.0244 quadruple spiral
                                                                                                                      //theta/0.0447 pentuple spiral
                                         
                                                                                                                      //theta/0.04435 imperfect hextuple
                
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.5) ); //maybe better than original? 
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.0234, y*((i/(192*4))+0.2) ); //maybe better than original? 
                
                
                
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/0.023383, y*((2/(192*4))+0.07) ); //maybe better than original? 
                
                                    object2.scale.set(instances/((i+70)*(((i+10)/20)+2)),instances/((i+70)*(((i+10)/20)+2)),instances/((i+70)*(((i+10)/20)+2)))
                                    object2.updateWorldMatrix(false, true)
                                    const vector2 = new THREE.Vector3();
                                    vector2.x = object2.position.x  ;
                                    vector2.y = object2.position.y;
                                    vector2.z = object2.position.z ;
                                    
                                      //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                                      // lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0)) //original
                                      lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.015*((i+1)/16)), 0))
                                      object2.updateWorldMatrix(false, true)
                                    }
                
                
                                    if (this.flowerType == "1Layer-collection2-scale2"){
                                    radius = 0.25
                                    if(i == l-interval){
                                      radius = 0
                                    }
                                    object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*4))+0.5) );
                                    object2.updateWorldMatrix(false, true)
                                    // object2.position.setFromCylindricalCoords( radius*(instances/((i+100)*((i/20)+1))), theta/1.035, y*((i/(192*16))+0.1) );
                                    object2.scale.set(instances/((i+100)*(((i+10)/20)+0.5)),instances/((i+100)*(((i+10)/20)+0.5)),instances/((i+100)*(((i+10)/20)+0.5)))
                                    object2.updateWorldMatrix(false, true)
                                    const vector2 = new THREE.Vector3();
                                    vector2.x = object2.position.x  ;
                                    vector2.y = object2.position.y;
                                    vector2.z = object2.position.z ;
                                    
                                      //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                                      lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y+(0.05*((i+1)/16)), 0))
                                      object2.updateWorldMatrix(false, true)
                                    }
                
                                    if (this.flowerType == "1Layer-collection2"){
                                    object2.position.setFromCylindricalCoords( radius, theta/1.035, y );
                                    object2.updateWorldMatrix(false, true)
                                    const vector2 = new THREE.Vector3();
                                    vector2.x = object2.position.x  ;
                                    vector2.y = object2.position.y;
                                    vector2.z = object2.position.z ;
                                    
                                      //  lookAwayFrom(object2, new THREE.Vector3(0, object2.position.y, 0)) //
                                      lookAwayFrom(object2, new THREE.Vector3(0, this.object.position.y, 0))
                                      object2.updateWorldMatrix(false, true)
                                    }
                
                
                
                
                                      i +=interval
                                      position = this.object.position.y
                                  
                
                                    // rotateAboutPoint(object2, new THREE.Vector3(0, object2.position.y, 0), object2.position, (30 * ( Math.PI / 180)))
                                    object4.add(object2)
                                    // targets.helix.push( object2 );
                                   }
                
                                  // const geometry12345 = new THREE.SphereGeometry( 0.5, 32, 16 );
                                  // const material123456 = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
                                  // const sphere1234567 = new THREE.Mesh( geometry12345, material123456 );
                                  // object4.add( sphere1234567 );
                
                                  object4.rotation.x = -Math.PI / 2; //90 degrees!
                                  object4.updateWorldMatrix(false, true)
                
                
                                  // object4.scale.set (3, 3, 3)
                
                                  if (this.flowerType == "1Layer-collection2"){object4.scale.set (0.8, 0.8, 0.8)}
                                  if (this.flowerType == "1Layer-collection2-scale2"){object4.scale.set (2, 2, 2)}
                                  if (this.flowerType == "1Layer-collection2-scale"){object4.scale.set (3, 3, 3)} //single helix shape
                                  if (this.flowerType == "1Layer-collection1"){object4.scale.set (0.5, 0.5, 0.5)}
                                  if (this.flowerType == "1Layer-collection2-scale-Helix"){object4.scale.set (3, 3, 3)}
                
                                  object4.updateWorldMatrix(false, true)
                                  // console.log("FLOWERTYPECHECK", this.flowerType)
                
                
                                //   console.log(object4)
                
                                  object3.add(object4)
                                  } else {
                
                                    // console.log("IS ROTATABLE")
                
                
                                    object3.add(this.packingObject)
                
                                  }
                
                
                    //               if(trueReduction){
              
               
                    //   object3.name = "flower"+(window.flowerNumber)
                    // this.object3Name =  "flower"+(window.flowerNumber)
                    // window.flowerNumber++
                    // console.log("PUSHED OBJ 3")
                    // console.log("THISOBJECTS", this.objects)
                    // this.objects.push(object3)
              
              
                    // if(this.object3Name){
                    //   object3.name = this.object3Name
                    // this.object3Name =  this.object3Name
                    // this.objects[0] = object3
              
                    // }
                    
              
                    //               } else {
              
                                    if(this.object3Name){
                    //   object3.name = this.object3Name
                    // this.object3Name =  this.object3Name
                    // this.objects[0] = object3
        
                    // this.object = object3
        
                    // if(trueReduction){
                        this.packingObject = object3
                        // this.lowResObject = object3
                    // }
        
              
                    } else {
                    //   object3.name = "flower"+(window.flowerNumber)
                    // this.object3Name =  "flower"+(window.flowerNumber)
                    // window.flowerNumber++
                    // console.log("PUSHED OBJ 3")
                    // console.log("THISOBJECTS", this.objects)
                    // this.objects.push(object3)
        
                    // this.object = object3
        
                    // if(trueReduction){
                        this.packingObject = object3
                        // this.lowResObject = object3
                    // }
        
                    }
        
        
        
        
        
        
        
        
                                //   }
              
                   
                    
              
                   
              
              
              }