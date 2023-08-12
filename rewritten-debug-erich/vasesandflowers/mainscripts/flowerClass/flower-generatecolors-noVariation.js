Flower.prototype.generateColors = function(flowerNum, startFlowerColor=false){
      
    let Color = window.Color

  let color 
  
  if(startFlowerColor){
    color = startFlowerColor
    // startFlowerColor+=1%360
  } else {
    color = fxrand()*360
    // color = 123
    startFlowerColor = color
  }
  
  
    if(startFlowerColor){
      this.startColorHue = startFlowerColor
      this.startFlowerColor = startFlowerColor
    // this.startColorHue = window.startFlowerColor
    // window.startFlowerColor+=1%360
  } else {
    this.startColorHue = fxrand()*360
  }
  
  let color1
  let color2
  let color3
  let color4
  
  let color1Arr = []
  let color2Arr = []
  let color3Arr = []
  let color4Arr = []
  
  
  //flowerNum * 3 + stamen (3 colors)
  let rawColors = []
  
  // let l = (fxrand()*90) + 10 //was 50
  let l = 50
  let s = 60
  
  function returnLightness(){
    return  (fxrand()*90) + 10//
  }
  let posNegDir = (fxrand() < 0.5 ? -1 : 1)
  // this.increment = this.increment * posNegDir
  this.increment = fxrand()*30 * posNegDir
  // this.increment = 20 * posNegDir
   
  // let colorPatterns = ["veryColorful", "veryColorfulDark", "veryColorfulLight", "veryColorfulOffWhite", "lightCenter", "lightEdge" ]
  
  let colorPatterns = intraFlowerSchemes
  
  // let colorPatterns = ["veryColorful"]
  
  
  
  // let colorPatterns = ["lightCenter"]
  
  // let colorPatterns = ["veryColorful"]
  // let colorPatterns = ["veryColorfulLight"]
  
  
  let colorPatternType = colorPatterns[Math.floor(fxrand()*colorPatterns.length)];
  
  for (var i=0; i<(flowerNum*3);i++){
   
  
    if (i==0){
  //generate either one or two flowers worth of colors
  switch(colorPatternType){
    case "lightCenter":
  // if(flowerNum>1){
  
  // } else {
  
  // }
  
  l = 50
  s = 80;
  
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*2)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${93}%)`))
  i=i+3
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))


if(((color + this.increment*3)%360) > 70 && ((color + this.increment*3)%360) < 190 ){
let increment =  this.increment*-1
color = (color +increment*3)%360
} else {
color = (color + this.increment*3)%360
}



 


  
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${93}%)`))
  i=i+3
  
  this.flowerColorSchemes.push("lightCenter")
  
    break;
  
    case "lightEdge":
  
    l = 95
    s = 90;
  
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
      // color = (color + this.increment*1)%360
      l = l+0
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
      // color = (color + this.increment*2)%360
      l = l+0
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${50}%)`))
      i=i+3
      // color = (color + this.increment*1)%360
      l = l+0
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
      // color = (color + this.increment*1)%360
      l = l+0
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
      if(((color + this.increment*3)%360) > 70 && ((color + this.increment*3)%360) < 190 ){
let increment =  this.increment*-1
color = (color +increment*3)%360
} else {
color = (color + this.increment*3)%360
}



      l = l+0
      rawColors.push(new Color(`hsl(${color}, ${s}%, ${50}%)`))
      i=i+3
      this.flowerColorSchemes.push("lightEdge")
    break;
  
    case "darkEdge":
        // if(flowerNum>1){
  
  // } else {
  
  // }
  
  l = 35
  s = 80;
  
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*2)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${10}%)`))
  i=i+3
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))


if(((color + this.increment*3)%360) > 70 && ((color + this.increment*3)%360) < 190 ){
let increment =  this.increment*-1
color = (color +increment*3)%360
} else {
color = (color + this.increment*3)%360
}



 


  
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${23}%)`))
  i=i+3
  

    this.flowerColorSchemes.push("darkEdge")
    break;
  
    case "darkCenter":
    // if(flowerNum>1){
  
  // } else {
  
  // }
  
  l = 40
  s = 80;
  
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*2)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${10}%)`))
  i=i+3
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))
  // color = (color + increment*1)%360
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${l}%)`))


if(((color + this.increment*3)%360) > 70 && ((color + this.increment*3)%360) < 190 ){
let increment =  this.increment*-1
color = (color +increment*3)%360
} else {
color = (color + this.increment*3)%360
}



 


  
  l = l+0
  rawColors.push(new Color(`hsl(${color}, ${s}%, ${5}%)`))
  i=i+3
  
  this.flowerColorSchemes.push("darkCenter")
    break;
  
    case "veryColorful":
    l = 50
    s = 100;
  

  
    
  for (var i=0; i<flowerNum;i++){
  
  
    
  if(fxrand()<1){
    if(fxrand()<1){ //<0 is ugly
      l = 50
      // l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
                                                // `hsl(${color}, ${s}%, ${50}%)`
                                               
  
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${s}%, ${l}%)`)
    
    
    
    // this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${s}%, ${l-20}%)`)
   
   
   
    if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*(posNeg*-1)))%360)}, ${s}%, ${l-20}%)`)
} else {
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${s}%, ${l-20}%)`)
}


let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    // let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${s}%, ${l}%)`)
let c3
    if((((this.startColorHue+((this.increment*2)*posNeg))%360)%360) > 70 && (((this.startColorHue+((this.increment*2)*posNeg))%360)%360) < 190 ){
let increment =  this.increment*-1
c3 = new Color(`hsl(${((this.startColorHue+(this.increment*2*(posNeg*-1)))%360)}, ${s}%, ${l}%)`)
} else {
c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${s}%, ${l}%)`)
}


   
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb") 
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
 

    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    } else { //ugly
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    
    
    
    
    // this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
    if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*(posNeg*-1)))%360)}, ${85}%, ${l}%)`)
} else {
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
}
    
    
    // let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
    let c3 
    if((((this.startColorHue+((this.increment*2)*posNeg))%360)%360) > 70 && (((this.startColorHue+((this.increment*2)*posNeg))%360)%360) < 190 ){
let increment =  this.increment*-1
c3 = new Color(`hsl(${((this.startColorHue+(this.increment*2*(posNeg*-1)))%360)}, ${85}%, ${l}%)`)
} else {
c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
}
    
    
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    }
    
  
    
  } else {
    
    
    
            this.startColorHue = (this.startColorHue+this.increment)%360
    if (fxrand()<0){
      l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
    this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
   
   
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l-30}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l-30}%)`)
      


    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  }
      
     else {
       
       let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
 
 
 
 
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l+25}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
  
  
  
  
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
       color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
    }
      
    }
  }
  
  this.flowerColorSchemes.push("veryColorful")
    break;
  
    case "veryColorfulDark":
    l = 25
    s = 70;
  
  
  for (var i=0; i<flowerNum;i++){
  
  
  
  if(fxrand()<1){
  if(fxrand()<1){ //<0 is ugly
    // l = l+25
    
    let posNeg = fxrand() < 0.5 ? -1 : 1
    
            this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${100}%, ${l+20}%)`)


            if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*(posNeg*-1)))%360)}, ${100}%, ${l-10}%)`)
} else {
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${100}%, ${l-10}%)`)
}

 


  let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});


let c3
  if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
c3 = c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*(posNeg*-1)))%360)}, ${100}%, ${l}%)`)
} else {

c3 = c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${100}%, ${l}%)`)
}

  


  color1 = this.startFlowerColor.to("srgb") 
  color2 = this.c2.to("srgb")
  // color3 = gradient(1).to("srgb") 
    color3 = c3.to("srgb")
  color4 = gradient(1).to("srgb")
  this.flowerGeomOffset = 0.000000000000000000000001
  
  
  
  rawColors.push(color1)
  rawColors.push(color2)
  rawColors.push(color3)
  rawColors.push(color4)
  
  } else { //ugly
    
    let posNeg = fxrand() < 0.5 ? -1 : 1
    
            this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
  // this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
  // let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
 
  if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*(posNeg*-1)))%360)}, ${85}%, ${l}%)`)
} else {
this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
}

 


  // let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});


let c3
  if(((this.startColorHue+(this.increment*posNeg))%360) > 70 && ((this.startColorHue+(this.increment*posNeg))%360) < 190 ){
let increment =  this.increment*-1
c3 = c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*(posNeg*-1)))%360)}, ${85}%, ${l}%)`)
} else {

c3 = c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
}
 
 
  let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
  color1 = this.startFlowerColor.to("srgb") 
  color2 = this.c2.to("srgb")
  // color3 = gradient(1).to("srgb")
    color3 = c3.to("srgb")
  color4 = gradient(1).to("srgb")
  this.flowerGeomOffset = 0.000000000000000000000001
  
  
  
  rawColors.push(color1)
  rawColors.push(color2)
  rawColors.push(color3)
  rawColors.push(color4)
  
  }
  
  
  
  } else {
  
  
  
          this.startColorHue = (this.startColorHue+this.increment)%360
  if (fxrand()<0){
    l = l+25
    
    let posNeg = fxrand() < 0.5 ? -1 : 1
    
  this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
  this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l-30}%)`)
  let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l-30}%)`)
    
  let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
  color1 = this.startFlowerColor.to("srgb")
  color2 = this.c2.to("srgb")
  // color3 = gradient(1).to("srgb")
    color3 = c3.to("srgb")
  color4 = gradient(1).to("srgb")
  
  
  
  rawColors.push(color1)
  rawColors.push(color2)
  rawColors.push(color3)
  rawColors.push(color4)
  }
    
   else {
     
     let posNeg = fxrand() < 0.5 ? -1 : 1
    
            this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
  this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l+25}%)`)
  let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
  let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
  color1 = this.startFlowerColor.to("srgb")
  color2 = this.c2.to("srgb")
  // color3 = gradient(1).to("srgb")
     color3 = c3.to("srgb")
  color4 = gradient(1).to("srgb")
  
  
  
  rawColors.push(color1)
  rawColors.push(color2)
  rawColors.push(color3)
  rawColors.push(color4)
  }
    
  }
  }
  
  this.flowerColorSchemes.push("veryColorfulDark")
  break;
  
  
  case "veryColorfulLight":
    l = 70
    s = 100;
  
    
  for (var i=0; i<flowerNum;i++){
  
  
    
  if(fxrand()<1){
    if(fxrand()<1){ //<0 is ugly
      // l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${s}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${s}%, ${l-10}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${s}%, ${l}%)`)
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb") 
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    } else { //ugly
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    }
    
  
    
  } else {
    
    
    
            this.startColorHue = (this.startColorHue+this.increment)%360
    if (fxrand()<0){
      l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
    this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l-30}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l-30}%)`)
      
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  }
      
     else {
       
       let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l+25}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
       color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
    }
      
    }
  }
  
  this.flowerColorSchemes.push("veryColorfulLight")
    break;
  
  
    case "veryColorfulOffWhite":
    l = 50
    s = 100;
  
    if(this.startColor){
      this.startColorHue = this.startColor
      this.startFlowerColor = this.startColor
    // this.startColorHue = window.startFlowerColor
    // window.startFlowerColor+=1%360
  } else {
    this.startColorHue = fxrand()*360
  }
    
 
    
  for (var i=0; i<flowerNum;i++){
  
  
    
  if(fxrand()<1){
    if(fxrand()<1){ //<0 is ugly
      l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${s}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${s}%, ${l-10}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${s}%, ${l}%)`)
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb") 
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
  
   
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    } else { //ugly
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb") 
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    this.flowerGeomOffset = 0.000000000000000000000001
    
  
    
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  
    }
    
  
    
  } else {
    
    
    
            this.startColorHue = (this.startColorHue+this.increment)%360
    if (fxrand()<0){
      l = l+25
      
      let posNeg = fxrand() < 0.5 ? -1 : 1
      
    this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l-30}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l-30}%)`)
      
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
      color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
   
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
  }
      
     else {
       
       let posNeg = fxrand() < 0.5 ? -1 : 1
      
              this.startFlowerColor = new Color(`hsl(${this.startColorHue}, ${85}%, ${l}%)`)
    this.c2 = new Color(`hsl(${((this.startColorHue+(this.increment*posNeg))%360)}, ${85}%, ${l+25}%)`)
    let c3 = new Color(`hsl(${((this.startColorHue+((this.increment*2)*posNeg))%360)}, ${85}%, ${l}%)`)
    let gradient = this.startFlowerColor.range(this.c2, {space: "hsl", hue: "shorter"});
    color1 = this.startFlowerColor.to("srgb")
    color2 = this.c2.to("srgb")
    // color3 = gradient(1).to("srgb")
       color3 = c3.to("srgb")
    color4 = gradient(1).to("srgb")
    
  
   
    
    rawColors.push(color1)
    rawColors.push(color2)
    rawColors.push(color3)
    rawColors.push(color4)
    }
      
    }
  }
  
  this.flowerColorSchemes.push("veryColorfulOffWhite")
    break;
  
  
    case "veryColorfulReverse":
  
    break;
  
    case "normalColor":
  
    break;
  
    case "normalColorReverse":
  
    break;
  }
  
  }
  }
 
  
  
  let colorArrs = []
  let srgb = []    
  let almostFinal = []
  let finalColors = []
  
  rawColors.forEach(color => srgb.push(color.to("srgb")))
  
  srgb.forEach(color => {color.coords.forEach(value => { 
    
    if (value>1){
      // console.log("VALUERESET ", "TO 1", value)
      value = 1
     
    } else if (value<0){
                          // console.log("VALUERESET ", "TO 0", value)
                          value = 0
                          }
                                value = value*255
                                       
                                                        almostFinal.push(value)
                                   })
                         
                        
                              
  
  })
  
  for (var i =0; i<almostFinal.length; i=i+3){
    
    finalColors.push([almostFinal[i],almostFinal[i+1],almostFinal[i+2]])
  }
  
  console.log("finalColors", finalColors, colorPatternType)

  return finalColors
  
  
  
}