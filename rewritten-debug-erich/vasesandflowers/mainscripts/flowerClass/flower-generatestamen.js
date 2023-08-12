Flower.prototype.generateStamen = function(){
  
  
    function checkAllfdf(fdf){
    // console.log("STAMENHEIGHT", fdf)
    
    
    
    switch(true){
    
      // case fdf >7:
      // fdf = fdf-1
      //   break;
    
      //   case fdf >8:
      // fdf = fdf-1
      //   break;
    
    
      //   case fdf >9:
      // fdf = fdf-1.5
      //   break;
    
    
      //   case fdf >10:
      // fdf = fdf-2
      //   break;
    
        case fdf >12:
      fdf = fdf-2
        break;
    
    
    }
    
    if(fdf > 7){
      fdf = fdf-2
    }
    
    
    
    // if(fdf > 8){
    //   fdf = fdf-2
    // }
    
    // if(fdf > 9){
    //   fdf = fdf-2
    // }
    
    // if(fdf > 10){
    //   fdf = fdf-2
    // }
    
      return fdf
    }
    
          function checkfdf(fdf){
    
            // console.log("STAMENHEIGHT", fdf)
    
    if(fdf < 5){
      fdf = fdf /2
    }
    
                    if(fdf > 35){
                fdf = fdf/6
                // fdf = 0
               }
    
               if(fdf > 25){
                fdf = fdf/5.5
                // fdf = 0
               }
    
               if(fdf > 15){
                fdf = fdf/4
                  // fdf = fdf/6
                  // fdf = 0
               }
    
               if(fdf > 10){
                // fdf = fdf/1.5
                  fdf = fdf/2
                  // fdf = 0
               }
              //  console.log("STAMENHEIGHT", fdf)
    
              //  if(fdf > 10){
              //   // fdf = fdf/1.5
              //    fdf = fdf - 4
              //  }
        
    return fdf
    
          }
    
                
                let alternateChance = this.randoms[0] < 0.5 ? true : false
                
             
                
                if (alternateChance){
                  
                let sinCurveScale= 800
                let endCapDiv = 120
                let at0 = true
                let tubeSegments = 50
                let ECS = (this.randoms[6]*0.7) + 0.3
                let endCapScalex = ECS
                let endCapScaley = ECS
                let endCapScalez = ECS
                let stamenNumber = Math.floor(this.randoms[1]*3)+3
                // let withStamen = fxrand() < 0.5 ? true : false;
                let withStamen = true;
                let noBow = true
                // let twirl = fxrand() < 0.5 ? true : false;
                let twirl = false;
                let smallRadius = this.flowerParameters[this.flowerParameters.length-1].fHeight / 500
                let vertOffset = 0
                let alternate = false
                let otherAlternate = false
                let initialHorizontalMultiplier = (this.flowerParameters[this.flowerParameters.length-1].fHeight.pLen/150)
                let largerSmaller = 0.8
                let horizSubtractor = 0.83
                let vertMultiplier
                let vertMultiplier2
                let fdfHeight = this.flowerParameters[this.flowerParameters.length-1].fHeight / this.flowerParameters[this.flowerParameters.length-1].fD
               
    
                if(this.flowerParameters.length == 1){
                  // console.log("STAMENHEIGHT", this.flowerParameters[0].flowerType)
                  if ( this.flowerParameters[0].flowerType == "1Layer-collection1" || this.flowerParameters[0].flowerType == "1Layer-collection2-scale" || this.flowerParameters[0].flowerType == "1Layer-collection2" || this.flowerParameters[0].flowerType=="1Layer-collection2-scale2" || this.flowerParameters[0].flowerType=="1Layer-collection2-scale-Helix"){
                   fdfHeight = checkfdf(fdfHeight)
               
                // console.log("STAMENHEIGHT", this.flowerParameters)
                  } else {
                    fdfHeight = checkAllfdf(fdfHeight)
                  }
                } else {
    
    
                  if ( this.flowerParameters[1].flowerType == "1Layer-collection1" || this.flowerParameters[1].flowerType == "1Layer-collection2-scale" || this.flowerParameters[1].flowerType == "1Layer-collection2" || this.flowerParameters[1].flowerType=="1Layer-collection2-scale2" || this.flowerParameters[1].flowerType=="1Layer-collection2-scale-Helix"){
                   fdfHeight = checkfdf(fdfHeight)
               
                // console.log("STAMENHEIGHT", this.flowerParameters)
                  } else {
                    fdfHeight = checkAllfdf(fdfHeight)
                  }
    
                  // console.log("STAMENHEIGHT", this.flowerParameters[1].flowerType)
                }
    
    
    
                         let curveDivider = 0;
                if (((this.flowerParameters[this.flowerParameters.length-1].curve1+this.flowerParameters[this.flowerParameters.length-1].curve2)/1.5) > 1){
                  curveDivider = (this.flowerParameters[this.flowerParameters.length-1].curve1+this.flowerParameters[this.flowerParameters.length-1].curve2)/1.5
                } else {
                  curveDivider = 1.5
                }
                  
               
                
                  
                            // if(twirl){
                    curveDivider = curveDivider/2
                  // }
                
                vertMultiplier = (fdfHeight/2)/curveDivider
                  
                  //  console.log("curveDivider", curveDivider)
        
                  if(vertMultiplier > 1.5){
                    vertMultiplier = vertMultiplier/1.5
                  }
                  
                  vertMultiplier2 = vertMultiplier*1.2
                  //TODO: used to be 0.9, but some stamens clipped thru the walls of flowers that way 
                  
                  
        
                  
        
                
                
                let offset = true
                let radius = (this.flowerParameters[this.flowerParameters.length-1].fD)/80
                
        //         let color1 = "red"
        //         let color2 = "blue"
        //         let color3 = "red"
        //         let color4 = "red"
                let vertOffsetColor = 0
                let centerSizeColor = 14
                let centerSizeColor2 = 6.4
                let f3ColorOffset = 0.4
                let topf2 = false
                
                      this.stamenGeomParams.push({sinCurveScale: sinCurveScale,
               endCapDiv: endCapDiv,
               at0: at0,
               tubeSegments: tubeSegments,
               endCapScalex: endCapScalex,
               endCapScaley: endCapScaley,
               endCapScalez:endCapScalez,
               stamenNumber: stamenNumber*2,
               withStamen: withStamen,
               noBow: noBow,
               twirl: twirl,
               smallRadius: smallRadius,
               vertOffset: vertOffset,
               alternate:true,
               otherAlternate: false,
               initialHorizontalMultiplier: initialHorizontalMultiplier,
               largerSmaller: largerSmaller,
               horizSubtractor: horizSubtractor,
               vertMultiplier: vertMultiplier,
               offset: false,
               radius: radius,
               materialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-3][0])},${Math.round(this.flowerColors[this.flowerColors.length-3][1])},${Math.round(this.flowerColors[this.flowerColors.length-3][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-2][0])},${Math.round(this.flowerColors[this.flowerColors.length-2][1])},${Math.round(this.flowerColors[this.flowerColors.length-2][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                         vertOffset: vertOffsetColor,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: centerSizeColor,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: centerSizeColor2,
                         f3Offset: f3ColorOffset,
                          //controls scale of lowlights, the lower the larger
                         topf2:topf2,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: false,
                         },
                         endCapMaterialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][0])})`),
                         vertOffset: 0,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: 14,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: 6.4,
                         f3Offset: 0.4,
                          //controls scale of lowlights, the lower the larger
                         topf2:true,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: true,
                         },
                           material:[],
                           endCapMaterial:[]
              })
                  
                  
                         // radius = radius/5
                         // horizSubtractor + 0.5
                         
                  
                  
                                this.stamenGeomParams.push({sinCurveScale: sinCurveScale,
               endCapDiv: endCapDiv,
               at0: at0,
               tubeSegments: tubeSegments,
               endCapScalex: endCapScalex,
               endCapScaley: endCapScaley,
               endCapScalez:endCapScalez,
               stamenNumber: stamenNumber*2,
               withStamen: withStamen,
               noBow: true,
               twirl: twirl,
               smallRadius: smallRadius,
               vertOffset: vertOffset,
               alternate:true,
               otherAlternate: false,
               initialHorizontalMultiplier: initialHorizontalMultiplier,
               largerSmaller: largerSmaller,
               horizSubtractor: horizSubtractor,
               vertMultiplier: vertMultiplier2,
               offset: true,
               radius: radius*1.65,
               materialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-3][0])},${Math.round(this.flowerColors[this.flowerColors.length-3][1])},${Math.round(this.flowerColors[this.flowerColors.length-3][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-2][0])},${Math.round(this.flowerColors[this.flowerColors.length-2][1])},${Math.round(this.flowerColors[this.flowerColors.length-2][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                         vertOffset: vertOffsetColor,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: centerSizeColor,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: centerSizeColor2,
                         f3Offset: f3ColorOffset,
                          //controls scale of lowlights, the lower the larger
                         topf2:topf2,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: false,
                         },
                         endCapMaterialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][0])})`),
                         vertOffset: 0,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: 14,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: 6.4,
                         f3Offset: 0.4,
                          //controls scale of lowlights, the lower the larger
                         topf2:true,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: true,
                         },
                           material:[],
                           endCapMaterial:[]
              })
                  
                  
                } else {
                  
                
        
                
                let sinCurveScale= 800
                let endCapDiv = 120
                let at0 = true
                let tubeSegments = 50
                let ECS = (this.randoms[3] * 0.7) + 0.3
                let endCapScalex = ECS
                let endCapScaley = ECS
                let endCapScalez = ECS
                let stamenNumber = Math.floor(this.randoms[4]*3)+3
                // let withStamen = this.randoms[] < 0.5 ? true : false;
                let withStamen = true;
                let noBow = true
                let twirl = this.randoms[5] < 0.5 ? false : false;
                                            //true
                let smallRadius = this.flowerParameters[this.flowerParameters.length-1].fHeight / 500
                let vertOffset = 0
                let alternate = false
                let otherAlternate = false
                let initialHorizontalMultiplier = (this.flowerParameters[this.flowerParameters.length-1].fHeight.pLen/150)
                let largerSmaller = 0.8
                let horizSubtractor = 0.83
                let vertMultiplier
                // let vertMultiplier2
                 let fdfHeight = this.flowerParameters[this.flowerParameters.length-1].fHeight / this.flowerParameters[this.flowerParameters.length-1].fD
                
    
    
    
                 if(this.flowerParameters.length == 1){
                  // console.log("STAMENHEIGHT", this.flowerParameters[0].flowerType)
                  if ( this.flowerParameters[0].flowerType == "1Layer-collection1" || this.flowerParameters[0].flowerType == "1Layer-collection2-scale" || this.flowerParameters[0].flowerType == "1Layer-collection2" || this.flowerParameters[0].flowerType=="1Layer-collection2-scale2" || this.flowerParameters[0].flowerType=="1Layer-collection2-scale-Helix"){
                   fdfHeight = checkfdf(fdfHeight)
               
                // console.log("STAMENHEIGHT", this.flowerParameters)
                  } else {
                    fdfHeight = checkAllfdf(fdfHeight)
                  }
                } else {
    
    
                  if ( this.flowerParameters[1].flowerType == "1Layer-collection1" || this.flowerParameters[1].flowerType == "1Layer-collection2-scale" || this.flowerParameters[1].flowerType == "1Layer-collection2" || this.flowerParameters[1].flowerType=="1Layer-collection2-scale2" || this.flowerParameters[1].flowerType=="1Layer-collection2-scale-Helix"){
                   fdfHeight = checkfdf(fdfHeight)
               
                // console.log("STAMENHEIGHT", this.flowerParameters)
                  } else {
                    fdfHeight = checkAllfdf(fdfHeight)
                  }
    
                  // console.log("STAMENHEIGHT", this.flowerParameters[1].flowerType)
                }
    
    
    
    
                         let curveDivider = 0;
                if (((this.flowerParameters[this.flowerParameters.length-1].curve1+this.flowerParameters[this.flowerParameters.length-1].curve2)/1.5) > 1){
                  curveDivider = (this.flowerParameters[this.flowerParameters.length-1].curve1+this.flowerParameters[this.flowerParameters.length-1].curve2)/1.5
                } else {
                  curveDivider = 1.5
                }
                  
                  // if(twirl){
                    curveDivider = curveDivider/2
                  // }
                  
                  // console.log("curveDivider", curveDivider)
                
                vertMultiplier = (fdfHeight/2)/curveDivider
                  
                  if(vertMultiplier > 1.5){
                    vertMultiplier = vertMultiplier/1.5
                  }
                 
        
                
                
                let offset = true
                let radius = (this.flowerParameters[this.flowerParameters.length-1].fD)/80
                
                // let color1 = "red"
                // let color2 = "blue"
                // let color3 = "red"
                // let color4 = "red"
                let vertOffsetColor = 0
                let centerSizeColor = 14
                let centerSizeColor2 = 6.4
                let f3ColorOffset = 0.4
                let topf2 = false
                
                //-b = curve2
                //a = curve1
                //A = ?
                
                
                //A*pow(Math.E, -b*pow(abs(r), c))*pow(abs(r), a)
                
                
                
                      this.stamenGeomParams.push({sinCurveScale: sinCurveScale,
               endCapDiv: endCapDiv,
               at0: at0,
               tubeSegments: tubeSegments,
               endCapScalex: endCapScalex,
               endCapScaley: endCapScaley,
               endCapScalez:endCapScalez,
               stamenNumber: stamenNumber,
               withStamen: withStamen,
               noBow: noBow,
               twirl: twirl,
               smallRadius: smallRadius,
               vertOffset: vertOffset,
               alternate:alternate,
               otherAlternate: otherAlternate,
               initialHorizontalMultiplier: initialHorizontalMultiplier,
               largerSmaller: largerSmaller,
               horizSubtractor: horizSubtractor,
               vertMultiplier: vertMultiplier,
               offset: offset,
               radius: radius,
               materialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-3][0])},${Math.round(this.flowerColors[this.flowerColors.length-3][1])},${Math.round(this.flowerColors[this.flowerColors.length-3][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-2][0])},${Math.round(this.flowerColors[this.flowerColors.length-2][1])},${Math.round(this.flowerColors[this.flowerColors.length-2][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                         vertOffset: vertOffsetColor,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: centerSizeColor,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: centerSizeColor2,
                         f3Offset: f3ColorOffset,
                          //controls scale of lowlights, the lower the larger
                         topf2:topf2,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: false,
                         },
                         endCapMaterialSettings:{color1: new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color2:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color3:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                                                    color4:  new THREE.Color(`rgb(${Math.round(this.flowerColors[this.flowerColors.length-1][0])},${Math.round(this.flowerColors[this.flowerColors.length-1][1])},${Math.round(this.flowerColors[this.flowerColors.length-1][2])})`),
                         vertOffset: 0,
                          //changes vertical gradient intensity! moves from -1 to +1
                         centerSize: 14,
                          //controls central gradient position!
                          //the lower the larger?
                          //0-20
                         centerSize2: 6.4,
                         f3Offset: 0.4,
                          //controls scale of lowlights, the lower the larger
                         topf2:true,
                         vertCenterGradient:false,
                         lowlights:false,
                         subtleFade:false,
                         defaultFade: true,
                         },
                           material:[],
                           endCapMaterial:[]
              })
                
                  
                }
      }