  
    function setStyle(styleHeight, styleWidth, resizeFullscreen=false){
  
        if(resizeFullscreen){
    originalWidth = window.innerWidth*windowIncrement
    originalHeight = window.innerHeight*windowIncrement
        }
    
      var canvas = document.getElementById('threeJsCanvas');
    // var context = canvas.getContext('webgl');
    
    
      function calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight, resizeFullscreen) {
    
        let ratio
        if(resizeFullscreen){
          ratio = Math.min(maxWidth*1 / srcWidth, maxHeight*1 / srcHeight);
        } else {
          ratio = Math.min(maxWidth*staticSizeRatio / srcWidth, maxHeight*staticSizeRatio / srcHeight);
        }
       
    
        return {
          width: srcWidth * ratio,
          height: srcHeight * ratio
        };
      }
    
      // var canvas = document
      var container = document.getElementById("container");
      var body = document.querySelector('body');
        var size = calculateAspectRatioFit(originalWidth, originalHeight, window.innerWidth, window.innerHeight, resizeFullscreen);
    
        container.style.height = size.height
        container.style.width = size.width

        var loading = document.getElementById("loading")
        loading.style.height = size.height
        loading.style.width = size.width
    
    }

    setStyle(originalWidth, originalHeight, fullscreen)

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

function savePngOld(){
  
  
  let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', `${document.getElementById("hash").innerText}.png`);
    let canvas = document.getElementById('threeJsCanvas');
    // var context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }