
function updateRes(){
    
    canvasworker1.postMessage({ update: "update", message: "SET RESOLUTION"})
        window.highRes = true
        if(window.highRes){
          reducedReductionCase = true
          trueReduction = true;
          console.log("0HIGHRES", "SET")
    // totalUniqueFlowerChoice.reduction = 0
    
  }
  }


document.body.addEventListener("keydown", (event) => {



    
        switch(true){

            case event.code == "KeyK":

                document.getElementById("keybindSettings").classList.toggle("invisible")
                console.log("TOGGLED")
                debug = true
                canvasworker1.postMessage({ update: "update", message: "Paused, press C to generate"})
              

             break;

    
          case event.code == "KeyF":

// console.log("press F")

          if(window.debugOpen){
            window.debugOpen = false
            document.getElementById("debugSettings").classList.toggle("invisible")
        } else {

        
          
if(debugDelayPassed == false && window.debugOpen == false){
    // document.getElementById("controls").classList.toggle("invisible")
    // console.log("TOGGLED")
    document.getElementById("debugSettings").classList.toggle("invisible")
    // console.log("TOGGLED")
    
    debug = true
    canvasworker1.postMessage({ update: "update", message: "Paused, press C to generate"})
    window.debugOpen = true
}

        }



   
    break;
    
    
    case event.code == "KeyQ":
    
    cameraX = cameraX - document.getElementById("cameraIncrement").value
    
      
    
    updateCamera()
    
    console.log("XCHANGE", cameraX);
    break;
    
    case event.code == "KeyH":
    
    
    if(highResDots == false){
        highResDots = true;
        canvasworker1.postMessage({ update: "update", message: "High res dots engaged!!"})
        console.log("set true")

        document.getElementById('hrDots').checked = true
    } else {
        highResDots = false;
        canvasworker1.postMessage({ update: "update", message: "High res dots disengaged!!"})
        console.log("set false")
        document.getElementById('hrDots').checked = false
    }

    
    break;
    
    case event.code == "KeyJ":
    
    if(highResStamen == false){
    highResStamen = true;
    canvasworker1.postMessage({ update: "update", message: "High res stamen engaged!!"})
    console.log("set true")   
    document.getElementById('hrStamen').checked = true
} else {
    highResStamen = false;
    canvasworker1.postMessage({ update: "update", message: "High res stamen disengaged!!"})
    console.log("set false")
    document.getElementById('hrStamen').checked = false
    }
    
    break;
    
    
    // case event.code == "KeyG":
    // console.log("default value!")

    // document.getElementsByClassName("reductionRadio")[10].checked = true

   
    //       window.highRes = false
    //         reducedReductionCase = false
    //         trueReduction = false;
    //         totalUniqueFlowerChoice.reducedReduction = 0

    
    
    // break;
    
    case event.code == "KeyE":
    cameraX = cameraX - (document.getElementById("cameraIncrement").value*-1)
        
    
        updateCamera()
    
        console.log("XCHANGE",cameraX);
    break;
    
    case event.code == "KeyD":
    cameraY = cameraY - (document.getElementById("cameraIncrement").value)
      
      // document.getElementById("cameraYValue").innerText = cameraY
      
      updateCamera()
      
          console.log("YCHANGE", cameraY);
    break;
    
    
    case event.code == "KeyA":
    cameraY = cameraY - (document.getElementById("cameraIncrement").value*-1)
    // document.getElementById("cameraYValue").innerText = cameraY
    
    updateCamera()
    
        console.log("YCHANGE", cameraY);
    break;
    
    
    case event.code == "KeyC":
    if(debug && debugDelayPassed == false){
      GenerateFlowers()
      debugDelayPassed = true
    }
    break;
    
    case event.code == "KeyS":
    cameraZ = cameraZ  - (document.getElementById("cameraIncrement").value*-1)
    updateCamera()
    break;
    
    
    case event.code == "KeyW":
    cameraZ = cameraZ - document.getElementById("cameraIncrement").value
    updateCamera()
    console.log("ZCHANGE", cameraZ);
    break;
    
    
    
    case event.code == "KeyZ":
        if(document.getElementById("threeJsCanvas")){

       
    document.getElementById("controls").classList.toggle("invisible")
    document.getElementById("threeJsCanvas").classList.toggle("activeThreeJsCanvas")

    console.log("TOGGLED")
}
    break;
    
    // case event.code == "KeyR":
    // totalUniqueFlowerChoice.reducedReduction = "zero";
    // totalUniqueFlowerChoice.reducedReduction = 0.00000000000000001;
    
//     // updateRes()

//     // console.log(totalUniqueFlowerChoice.highResChange)
// if(totalUniqueFlowerChoice.highResChange == false){
//     totalUniqueFlowerChoice.highResChange = true;
//     document.getElementById('hrFlowers').checked = true
//     console.log("set true")
// } else {
//     totalUniqueFlowerChoice.highResChange = false;
//     document.getElementById('hrFlowers').checked = false
//     console.log("set false")
// }

 
    
    
    // break;
    
    // case event.code == "Digit0":
    // // totalUniqueFlowerChoice.reducedReduction = "zero";
    // totalUniqueFlowerChoice.reducedReduction = 0.00000000000000001;
    // updateRes()
    // break;
    // case event.code == "Digit1":
    // totalUniqueFlowerChoice.reducedReduction = 0.1;
    // updateRes()
    // break;
    // case event.code == "Digit2":
    // totalUniqueFlowerChoice.reducedReduction = 0.2;
    // updateRes()
    // break;
    // case event.code == "Digit3":
    // totalUniqueFlowerChoice.reducedReduction = 0.3;
    // updateRes()
    // break;
    // case event.code == "Digit4":
    // totalUniqueFlowerChoice.reducedReduction = 0.4;
    // updateRes()
    // break;
    // case event.code == "Digit5":
    // totalUniqueFlowerChoice.reducedReduction = 0.5;
    // updateRes()
    // break;
    // case event.code == "Digit6":
    // totalUniqueFlowerChoice.reducedReduction = 0.6;
    // updateRes()
    // break;
    // case event.code == "Digit7":
    // totalUniqueFlowerChoice.reducedReduction = 0.7;
    // updateRes()
    // break;
    // case event.code == "Digit8":
    // totalUniqueFlowerChoice.reducedReduction = 0.8;
    // updateRes()
    // break;
    // case event.code == "Digit9":
    // totalUniqueFlowerChoice.reducedReduction = 0.9;
    // updateRes()
    // break;

    // case event.code == "KeyO":
    // // totalUniqueFlowerChoice.reducedReduction = "zero";
    // document.getElementsByClassName("reductionRadio")[0].checked = true
    // totalUniqueFlowerChoice.reducedReduction = 0.00000000000000001;
    // updateRes()
    // break;

    //     case event.code == "KeyP":
    //         document.getElementsByClassName("reductionRadio")[9].checked = true
    // totalUniqueFlowerChoice.reducedReduction = 0.9;
    // updateRes()
    // break;
    
        }
        
    
        });
    


        document.body.addEventListener("click", function(e) {


            let elements = document.elementsFromPoint(e.clientX, e.clientY);
            elements.forEach((elt, i) => {

                // console.log(elt)

switch(true){

case elt.id == "custom1Layer":
if(elt.checked){
    console.log("custom value!")

    totalUniqueFlowerChoice.reducedReduction = document.getElementById("inputText").value

    if(document.getElementById("inputText").value == ""){
    totalUniqueFlowerChoice.reducedReduction = 0.85
    }

    updateRes()
} else {
console.log("default value!")
window.highRes = false
// if(window.highRes){
  reducedReductionCase = false
  trueReduction = false;
  totalUniqueFlowerChoice.reducedReduction = 0.85
}
// } else {
//     totalUniqueFlowerChoice.reducedReduction = elt.value
//     console.log(elt.value)
//     updateRes()
// }

break;

case elt.id=="hrDots":
    console.log(document.getElementById('hrDots').checked)
    highResDots = document.getElementById('hrDots').checked
break;

case elt.id=="hrStamen":
    console.log(document.getElementById('hrStamen').checked)
    highResStamen = document.getElementById('hrStamen').checked;
break;

case elt.id=="hrFlowers":
    console.log(document.getElementById('hrFlowers').checked)
    totalUniqueFlowerChoice.highResChange = document.getElementById('hrFlowers').checked
break;

case elt.id=="hrFlowers":
    console.log(document.getElementById('hrFlowers').checked)
    totalUniqueFlowerChoice.highResChange = document.getElementById('hrFlowers').checked
break;



case elt.id=="overwriteSpherical":
    window.sphericalReudctionOverWite = document.getElementById("overwriteSpherical").checked
break;

case elt.id=="overwriteSpire":
window.spireReductionOverWrite = document.getElementById("overwriteSpire").checked

break;

case elt.id=="nonsphericalCheck":
    window.customNonsphericalChecked = e.target.checked
break;

case elt.id=="sphericalCheck":
    window.customSphericalChecked = e.target.checked
break;

case elt.id=="zinniaCheck":
    window.customZinniaChecked = e.target.checked
break;


case elt.id=="transparentBG":
    // document.gextElementById("glitchyThings").classList.toggle("invisible")
    transparentBG = document.getElementById("transparentBG").checked
   
   if(!transparentBG){
    document.getElementById("keepBGTransparent").checked = transparentBG
    keepBGTransparent = transparentBG
    document.getElementById("bigPNGKeepBG").checked = transparentBG
    bigPNGKeepBG = document.getElementById("bigPNGKeepBG").checked
   }
    

break;

case elt.id=="savePngAuto":
    savePngAuto = document.getElementById("savePngAuto").checked

    if(document.getElementById("maxSamplerefresh").value == ""){
        document.getElementById("maxSamplerefresh").value = 200
        maxSamplerefresh = 200
    } else {
        maxSamplerefresh = document.getElementById("maxSamplerefresh").value
    }
    
break;

case elt.id=="depthOfField":
    depthOfField = document.getElementById("depthOfField").checked
break;

// case elt.id=="transparentBG":
//     transparentBG = document.getElementById("transparentBG").checked
// break;

case elt.id=="keepBGTransparent":
    keepBGTransparent = document.getElementById("keepBGTransparent").checked

    if(document.getElementById("bigPNGKeepBG").checked){
        document.getElementById("transparentBG").checked = true
        transparentBG =  true
    }else{
        document.getElementById("transparentBG").checked = keepBGTransparent
        transparentBG =  document.getElementById("transparentBG").checked
    }
   


break;

case elt.id=="bigPNGKeepBG":
    bigPNGKeepBG = document.getElementById("bigPNGKeepBG").checked

    if(document.getElementById("keepBGTransparent").checked){
        document.getElementById("transparentBG").checked = true
        transparentBG =  true
    }else{
        document.getElementById("transparentBG").checked = bigPNGKeepBG
        transparentBG =  document.getElementById("transparentBG").checked
    }


break;





}









            });


            }, false);



            document.getElementById("nonsphericalRows").addEventListener("input", function(e) { 



document.getElementById("nonsphericalCheck").checked=true
window.customNonsphericalChecked = true


            })

            document.getElementById("nonsphericalCols").addEventListener("input", function(e) { 


                document.getElementById("nonsphericalCheck").checked=true
                window.customNonsphericalChecked = true

            })


            document.getElementById("sphericalRows").addEventListener("input", function(e) { 


                document.getElementById("sphericalCheck").checked=true
                window.customSphericalChecked = true
            })

            document.getElementById("sphericalCols").addEventListener("input", function(e) { 

                document.getElementById("sphericalCheck").checked=true
                window.customSphericalChecked = true
            })


            document.getElementById("zinniaRows").addEventListener("input", function(e) { 

                document.getElementById("zinniaCheck").checked=true
                window.customZinniaChecked = true
            })

            document.getElementById("zinniaCols").addEventListener("input", function(e) { 

                document.getElementById("zinniaCheck").checked=true
                window.customZinniaChecked = true

            })





document.getElementById("sphericalReductionNumber").addEventListener("input", function(e) { 

//     window.sphericalReudctionOverWite = false
// window.sphericalReudctionNumber = 0

    document.getElementById("overwriteSpherical").checked = true
    window.sphericalReudctionOverWite = true
    if(e.target.value > 0 && e.target.value< 0.985){
        window.sphericalReudctionNumber = e.target.value
        // updateRes()
    } else {
    
    if(e.target.value < 0){
        e.target.value = 0
        window.sphericalReudctionNumber = 0.00000000000000001;
        // updateRes()
    } else if(e.target.value > 0.985){
        e.target.value = 0.985
        window.sphericalReudctionNumber = 0.985;
        // updateRes()
    }
    
    }

    if(e.target.value == ""){
        document.getElementById("overwriteSpherical").checked = false
    }

})

document.getElementById("spireReductionNumber").addEventListener("input", function(e) { 
    // window.spireReductionOverWrite = false
    // window.spireReductionNumber = 0

    document.getElementById("overwriteSpire").checked = true
    window.spireReductionOverWrite = true
    if(e.target.value > 0 && e.target.value< 0.985){
        window.spireReductionNumber = e.target.value
        // updateRes()
    } else {
    
    if(e.target.value < 0){
        e.target.value = 0
        window.spireReductionNumber = 0.00000000000000001;
        // updateRes()
    } else if(e.target.value > 0.985){
        e.target.value = 0.985
        window.spireReductionNumber = 0.985;
        // updateRes()
    }
    
    }

    if(e.target.value == ""){
        document.getElementById("overwriteSpire").checked = false
    }

})



            document.getElementById("inputText").addEventListener("input", function(e) {
                document.getElementById("custom1Layer").checked = true
if(e.target.value > 0 && e.target.value< 0.985){
    totalUniqueFlowerChoice.reducedReduction = e.target.value
    updateRes()
} else {

if(e.target.value < 0){
    e.target.value = 0
    totalUniqueFlowerChoice.reducedReduction = 0.00000000000000001;
    updateRes()
} else if(e.target.value > 0.985){
    e.target.value = 0.985
    totalUniqueFlowerChoice.reducedReduction = 0.985;
    updateRes()
}

if(e.target.value == ""){
    document.getElementById("custom1Layer").checked = false
}

}


            })


            document.getElementById("dotResolution").addEventListener("input", function(e) {

                document.getElementById("hrDots").checked = true
                if(e.target.value > 2 && e.target.value< 200){


                } else {
                
                if(e.target.value < 2){
                    if(e.target.value == ""){
                        document.getElementById("hrDots").checked = false
                    } else {
                        e.target.value = 2
                    }
                   

                    // updateRes()
                } else if(e.target.value > 200){
                    e.target.value = 200

                    // updateRes()
                }
                
                }

            })

            document.getElementById("antherResolution").addEventListener("input", function(e) {

                document.getElementById("hrStamen").checked = true
                if(e.target.value > 2 && e.target.value< 200){

                    highResStamen = true;
                } else {
                
                if(e.target.value < 2){
                    if(e.target.value == ""){
                        document.getElementById("hrStamen").checked = false
                        highResStamen = false
                    } else {
                        e.target.value = 2
                        highResStamen = true;
                    }

                    // updateRes()
                } else if(e.target.value > 200){
                    e.target.value = 200
                    highResStamen = true;

                    // updateRes()
                }
                
                }

            })



            document.getElementById("rendererRes").addEventListener("input", function(e) {

                // document.getElementById("hrStamen").checked = true
                if(e.target.value >= 1){

                    // highResStamen = true;
                } else {
                
                if(e.target.value < 1){
                    if(e.target.value == ""){
                        // e.target.value = 2000
                        // document.getElementById("rendererRes").checked = false
                        // highResStamen = false
                    } else {
                        e.target.value = 1
                        // highResStamen = true;
                    }

                    // updateRes()
                } 
                
                }

            })


            document.getElementById("maxSamplerefresh").addEventListener("input", function(e) {

                // document.getElementById("hrStamen").checked = true
                if(e.target.value >= 200){
                    maxSamplerefresh = e.target.value
                    // highResStamen = true;
                } else {
                
                if(e.target.value < 200){
                    if(e.target.value == "200"){
                        maxSamplerefresh = e.target.value
                        // e.target.value = 2000
                        // document.getElementById("maxSamplerefresh").checked = false
                        // highResStamen = false
                    } else {
                        e.target.value = 200
                        // highResStamen = true;
                    }

                    // updateRes()
                } 
                
                }

            })
    


            document.getElementById("widthValue").addEventListener("input", function(e) {

                // document.getElementById("hrStamen").checked = true
                if(e.target.value < 500){
                    e.target.value = 500
                //     // maxSamplerefresh = e.target.value
                //     // highResStamen = true;
                } else {
                
                if(e.target.value % 500 !== 0){

                    e.target.value = e.target.value - (e.target.value % 500)
                
                } else {

                }
            }

            })
    

            // widthValue