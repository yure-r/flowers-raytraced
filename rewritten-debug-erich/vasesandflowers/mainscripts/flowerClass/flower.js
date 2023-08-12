class Flower {
    constructor(
      flowerIndexNumber, 
      startColor=fxrand()*360,
       coords=false, 
       randoms,
        reductionCase, 
        reductionNumber, 
        reducedReductionNo,
        highResChange,
        overWriteSettings
        ){



          this.spherical = false



          this.lastBboxReducedMin = 0
          this.highResChangeBasic = highResChange
    
        if(coords){
          this.coords = coords
        }
        
        this.reductionCase = false

        if(reductionCase){
          this.reductionCase = true
          console.log("0HIGHRES", true)
          this.reductionNumber = reductionNumber
        }
  
        this.reducedReduction = reducedReductionNo
console.log("REDUCEDREDUCTION", this.reducedReduction)

this.dotrandomsArr = []
this.dotrandoms = []

for (var i=0; i<2;i++){

  // console.log("PREDOTSLENGTH", this.preDots.length)
                    
  // console.log("NEWMESH", newmesh)


//   let dotMaxArr = []
// dotParams.forEach(param=>{
// dotMaxArr.push(param.dotNumber)
// })

let dotMax = 100*10

let dotrandoms = []

for (var n=0; n<dotMax;n++){
dotrandoms.push([fxrand(), fxrand()])
}

// this.dotrandoms = dotrandoms

dotrandoms.push(fxrand())

  this.dotrandomsArr.push(dotrandoms)

this.dotrandoms = dotrandoms

}

                             


    this.hasSpired = false
    this.lowResSpired = false
    this.object3Name = false
    this.randoms = randoms
    this.finished = false;
    this.flowerColorSchemes = []
    this.flowerSpire = false
    this.flowerLayers = "is2Layer"
    this.objects = []
    this.flowerIndexNumber = flowerIndexNumber
    this.flowerParameters = [];
    this.flowerColors = [] 
    this.object = new THREE.Object3D();
    this.layers = []
    this.materialSettings = []
    this.materials = []
    this.parameters = []
    this.flowerHeight = 0;
    this.flowerDiameer = 0;
    this.curve1 = 0;
    this.curve2 = 0;
    this.petalNumber = 0;
    this.petalLength = 0;
    this.rotation = 0;
    this.bValue = 0;
    this.color1 = 0;
    this.color2 = 0;
    this.color3 = 0;
    this.color4 = 0;
    this.startColor = startColor;
    this.startColorHue = startColor
    this.c2=null;
    this.scale = 0.005
    this.l = 50
    this.flowerGeomOffset = 0;
    this.lastBboxMin = 0;
    this.color1Arr = []
    this.color2Arr = []
    this.color3Arr = []
    this.color4Arr = []
    this.toWhite = fxrand() < 0.5 ? true : false;
    this.parametersNum = -1
    this.rawMaterials = []
    this.stamenEndCaps = []
    this.stamenGeomMaterialParams = []
    this.stamenGeomParams = []
    this.stamenGeomLayers = []
    this.stamenEndCapMaterialParams = []
    this.sGMP = 0
    this.sECMP = 0
    this.MaterialIndex = {count:0, name:"MaterialIndex"};
    this.stamenMaterialIndex = {count:0, name:"stamenMaterialIndex"};
    this.stamenECMaterialIndex = {count:0, name:"stamenECMaterialIndex"};
    this.posNeg = fxrand() < 0.5 ? -1 : 1
    this.flowerNum = 2
    this.structure = this.chooseStructure();
      // this.flowerColors = this.generateColors(this.startColorHue) //anti-green technology
    this.flowerColors = this.generateColors(this.flowerNum, this.startColor)


  
  
      for (var a=0; a<this.flowerNum; a++){
          // console.log("indexA",a)
          
         this.flowerParameters.push( this.generateRandomFlower(a, this.structure))
  
         
          // console.log("params", window.parameters[window.parameters.length-1])
        }




                  // {sphericalReudctionOverWite: window.sphericalReudctionOverWite,
          //   sphericalReudctionNumber: window.sphericalReudctionNumber,
          //   spireReductionOverWrite: window.spireReductionOverWrite,
          //   spireReductionNumber: window.spireReductionNumber


          // hrZinnia: window.customZinniaChecked,
          // hrZinniaRows: window.zinniaRows,
          // hrZinniaCols: window.zinniaoOls,
          // hrNonspherical: window.customNonsphericalChecked,
          // hrNonsphericalRows:  window.nonSphericalRows,
          // hrNonsphericalCols: window.nonSphericalCols,
          // hrSpherical: window.customSphericalChecked,
          // hrSphericalRows: window.sphericalRows,
          // hrSphericalCols: window.sphericalCols

          this.customZinniaRes = false
          this.customZinniaRows = 0
          this.customZinniaCols = 0
          this.customNSRes= false
          this.customNSRows = 0
          this.customNSCols = 0

          this.customSphericalRes = false
          this.customSphericalRows = 0
          this.customSphericalCols = 0


          this.sphericalReductionOverwrite = false
          this.sphericalReductionNumber = 0
          this.spireReductionOverwrite = false
          this.spireReductionNumber = 0
      
      
          if(this.spherical){
            console.log("REDUCTIONTEST", "SPHERICAL")
          this.sphericalReductionOverwrite = overWriteSettings.sphericalReudctionOverWite
          this.sphericalReductionNumber = overWriteSettings.sphericalReudctionNumber
         
          if(this.flowerType == "zinnia"){
            // console.log("REDUCTIONTEST", "ZINNIA"
            // )
            this.customZinniaRes = overWriteSettings.hrZinnia
            this.customZinniaRows = overWriteSettings.hrZinniaRows
            this.customZinniaCols = overWriteSettings.hrZinniaCols

          } else {
            this.customSphericalRes = overWriteSettings.hrSpherical
            this.customSphericalRows = overWriteSettings.hrSphericalRows
            this.customSphericalCols = overWriteSettings.hrSphericalCols

          }

        } else {
          this.customNSRes = overWriteSettings.hrNonspherical
          this.customNSRows = overWriteSettings.hrNonsphericalRows
          this.customNSCols = overWriteSettings.hrNonsphericalCols
        }
         
      
          if(this.flowerSpire){
            
          this.spireReductionOverwrite = overWriteSettings.spireReductionOverWrite
          this.spireReductionNumber = overWriteSettings.spireReductionNumber
          console.log("SPIREREDUCTION", this.spireReductionOverwrite)
      
          }

          console.log("REDUCTIONTEST", "precheck")
  
        if(this.spherical){
  
        } else {
          this.generateStamen();
        }
  
  
  
        // console.log("posted message!")
        console.log("REDUCTIONTEST", "geneate geometry")
        this.generateFlowerGeometry();
        
  
  
  }
}