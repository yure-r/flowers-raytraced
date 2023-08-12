


  document.getElementById("cameraXPlus").addEventListener("click", function() {

    cameraX = cameraX - (document.getElementById("cameraIncrement").value*-1)
    

    updateCamera()

    console.log("XCHANGE",cameraX);
}, false);


document.getElementById("cameraXMinus").addEventListener("click", function() {

  cameraX = cameraX - document.getElementById("cameraIncrement").value

  

  updateCamera()

  console.log("XCHANGE", cameraX);
}, false);

document.getElementById("cameraXZero").addEventListener("click", function() {
  cameraX = 0
  
  // document.getElementById("cameraYValue").innerText = cameraY
  
  updateCamera()
  
      console.log("XCHANGE", cameraX);
  }, false);


document.getElementById("cameraYPlus").addEventListener("click", function() {
cameraY = cameraY - (document.getElementById("cameraIncrement").value*-1)
// document.getElementById("cameraYValue").innerText = cameraY

updateCamera()

    console.log("YCHANGE", cameraY);
}, false);

document.getElementById("cameraYMinus").addEventListener("click", function() {
  cameraY = cameraY - (document.getElementById("cameraIncrement").value)
  
  // document.getElementById("cameraYValue").innerText = cameraY
  
  updateCamera()
  
      console.log("YCHANGE", cameraY);
  }, false);

  document.getElementById("cameraYZero").addEventListener("click", function() {
    cameraY = 0
    
    // document.getElementById("cameraYValue").innerText = cameraY
    
    updateCamera()
    
        console.log("YCHANGE", cameraY);
    }, false);

document.getElementById("cameraZPlus").addEventListener("click", function() {
cameraZ = cameraZ  - (document.getElementById("cameraIncrement").value*-1)


    updateCamera()
    
    console.log("ZCHANGE", cameraZ);
}, false);

document.getElementById("cameraZMinus").addEventListener("click", function() {
  cameraZ = cameraZ - document.getElementById("cameraIncrement").value
  
  
      updateCamera()
      
      console.log("ZCHANGE", cameraZ);
  }, false);


  document.getElementById("cameraZZero").addEventListener("click", function() {
    cameraZ = 0
    
    
        updateCamera()
        
        console.log("ZCHANGE", cameraZ);
    }, false);

    document.getElementById("cameraZDefReal").addEventListener("click", function() {
      cameraZ = centerStalkZ
      
      
          updateCamera()
          
          console.log("ZCHANGE", cameraZ);
      }, false);


    

      document.getElementById("envRotation").addEventListener("change", function(e) {


        // ptRenderer.material.environmentRotation.makeRotationX(document.getElementById("envRotationHoriz2").value)
        // ptRenderer.material.environmentRotation.makeRotationY(document.getElementById("envRotationVert").value)
        ptRenderer.material.environmentRotation.makeRotationZ(document.getElementById("envRotation").value)
        updateCamera()
        // 0, 2 * Math.PI
        

        }, false);


        document.getElementById("envRotationVert").addEventListener("change", function(e) {


          // ptRenderer.material.environmentRotation.makeRotationX(document.getElementById("envRotationHoriz2").value)
          ptRenderer.material.environmentRotation.makeRotationY(document.getElementById("envRotationVert").value)
          // ptRenderer.material.environmentRotation.makeRotationZ(document.getElementById("envRotation").value)
          updateCamera()
          // 0, 2 * Math.PI
          
  
          }, false);

          document.getElementById("envRotationHoriz2").addEventListener("change", function(e) {


            ptRenderer.material.environmentRotation.makeRotationX(document.getElementById("envRotationHoriz2").value)
            // ptRenderer.material.environmentRotation.makeRotationY(document.getElementById("envRotationVert").value)
            // ptRenderer.material.environmentRotation.makeRotationZ(document.getElementById("envRotation").value)
            updateCamera()
            // 0, 2 * Math.PI
            
    
            }, false);


            document.getElementById("resetEnvRotation").addEventListener("click", function() {


              ptRenderer.material.environmentRotation.makeRotationX(0)
              ptRenderer.material.environmentRotation.makeRotationY(0)
              ptRenderer.material.environmentRotation.makeRotationZ(0)

              document.getElementById("envRotation").value = 0
              document.getElementById("envRotationVert").value = 0
              document.getElementById("envRotationHoriz2").value = 0

              updateCamera()
              // 0, 2 * Math.PI
              
      
              }, false);


            





document.getElementById("resettoDef").addEventListener("click", 
   resettoDef
  )







document.getElementById("resettoDefReal").addEventListener("click", 
 resettoDefReal
)

  document.getElementById("savepngbutton").addEventListener("click", 

    await savePng, false
  )


  document.getElementById("savecanvaspng").addEventListener("click", 
    savePngOld, false
  )
// });