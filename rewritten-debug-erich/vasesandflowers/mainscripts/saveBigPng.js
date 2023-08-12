 // import * as dekapng from './dekapng.js'
    // import {Renderer3D} from './renderer3d.js'
  
    // console.log(dekapng)
  
    window.addEventListener( 'resize', onWindowResize, false );
  
    //   console.log("added resize!")
      
    
    function resetCamera(){
    
        document.getElementById("loading").style.display = "none"
    
        renderer.setSize( originalWidth, originalHeight );
      
      camera.aspect = originalWidth / originalHeight;
      camera.setViewOffset( originalWidth, originalHeight, 0, 0, originalWidth, originalHeight );
      camera.updateProjectionMatrix();
    
    //   const radius = 100;
    //   camera.lookAt( 0, 0, 12 );
    camera.lookAt( 0, 0, cameraZ );
      camera.updateMatrixWorld();
    
      // renderer.render( scene, camera );
    
      if(window.raytrace){
    
    ptRenderer.reset()
    
    if(!bigPNGKeepBG){
    renderer.clear()
    }
      } else {
        renderer.clear()
      }
    
    // requestAnimationFrame( animate );
    
    // camera.updateMatrixWorld();
    
    // // if ( window.raytrace ) {
    
    // camera.focusDistance = camera.position.distanceTo( focusPoint ) - camera.near;
    
    // // }
    
    // ptRenderer.material.materials.updateFrom( sceneInfo.materials, sceneInfo.textures );
    // ptRenderer.material.physicalCamera.updateFrom( camera );
    // }
    }
    
    
    
      function onWindowResize(){
      
      
      if(fullscreen){
      
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
      
          renderer.setSize( window.innerWidth*windowIncrement,  window.innerHeight*windowIncrement );
      
        //   console.log("set size!")
      
          setStyle(window.innerWidth*windowIncrement, window.innerHeight*windowIncrement, fullscreen)
      
      
          if(window.raytrace){
        if(!keepBGTransparent){
            renderer.clear()
          }
      
      
      
          ptRenderer.reset();
      } else {
        renderer.clear()
      }
      
        } else {
      
      
      
      
          // camera.aspect = window.innerWidth / window.innerHeight;
          // camera.updateProjectionMatrix();
      
          // renderer.setSize( window.innerWidth, window.innerHeight );
      
          // if(fullscreen){
            // setStyle(window.innerWidth*windowIncrement, window.innerHeight*windowIncrement, true)
          // } else {
            setStyle(originalWidth, originalHeight, fullscreen)
          }
          // }
      
          
      
      
      
      
      }
      
    //   console.log("after resize")
      
      
      // import { createElem as el } from './elem.js';
      
      const saveData = (function() {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.style.display = "none";
        return function saveData(blob, fileName) {
           const url = window.URL.createObjectURL(blob);
           a.href = url;
           a.download = fileName;
           a.click();
        };
      }());
      
      function wait() {
        return new Promise((resolve) => {
          setTimeout(resolve);
        });
      }
      
      // example of writing an RGBA png
      async function makeBigPng( width, height, exportSamples) {
        const pngRGBAWriter = new dekapng.PNGRGBAWriter(width, height);
      
    
        // console.log("WIDTH-HEIGHT", width)
    
        let chunkWidth
        let chunkHeight
    
        // if(multiple4096){
        //     chunkWidth = 4096
        //     chunkHeight = 4096
    
        //     width = width * 4096
        //     height = height * 4096
    // 
        // } else {
            chunkWidth = 500;
            chunkHeight = 500;
        // }
    
        window.totalTileNumber = (width / chunkWidth) * (width / chunkWidth)
    
    
      
        const progress = document.querySelector("#progress");
        function setProgress(p) {
          // progress.textContent = `${p * 100 | 0}%`;
          console.log("PNG PROGRESS", `${p * 100 | 0}%`)
          let percentPNG = `${p * 100 | 0}%`
          canvasworker1.postMessage({ update: "update", message: "Building PNG: " + percentPNG })
        }
      
        setProgress(0);
      
      window.ctxNumber = 1;
      window.renderNumber = 1;
      
      //LOOP THROUGH THE IMAGE AND DRAW PORTIONS OF THE IMAGE, THEN WRITE THEM IN
      
    
    
        for (let chunkY = 0; chunkY < height; chunkY += chunkHeight) {
          const rowChunks = [];
          const localHeight = Math.min(chunkHeight, height - chunkY);
        //   console.log("localHeight", localHeight)
      const promises = []
      
          function awaitAll(drawArea, width, localHeight, exportSamples){
      
      
          for (let chunkX = 0; chunkX < width; chunkX += chunkWidth) {
            const localWidth = Math.min(chunkWidth, width - chunkX);
      
            promises.push(new Promise((resolve, reject)=>drawArea(width, height, chunkX, chunkY, localWidth, localHeight, resolve, localWidth, exportSamples)))
            //basically I need to await this function to return the proper value, but the loops do not wait!
      
      
            // if (!data) {
            //   return;
            // }
            
          }
      
          return Promise.all(promises)
      
        }
      
      
    //     function awaitAll(list, asyncFn) {
    //   const promises = [];
    
    //   list.forEach(x => {
    //     promises.push(asyncFn(x));
    //   });
    
    //   return Promise.all(promises);
    // }
    
      
    
      console.log("localHeight", localHeight)
      awaitAll(drawArea, width, localHeight, exportSamples)
        .then(results => {
    
        //   console.log("RESULTS", results)
        //   rowChunks.push(data)
    
    
    
    
    results.forEach(result=>{
    
    
        let pixels = []
    for (var i=0; i<result.data.length; i+=4){
    pixels.push([
        result.data[i],
        result.data[i+1],
        result.data[i+2],
        result.data[i+3]
    ]
    )
    }
    
    // result.data.length = 0;
    
    
    
    
    let newPixels = []
    
    // console.log("newPixels", newPixels)
    
    let imageWidth = result.width;
    for (let i = 0; i < pixels.length; i++) {
        newPixels[i] = pixels[i - 2 * (i % imageWidth) + imageWidth - 1];
    }
    
    pixels.length = 0;
    //flip image vertically ^
    
    
    let newNewPixels = []
    for(var i=newPixels.length; i>0; i--){
    
        newNewPixels.push(newPixels[i-1][0])
        newNewPixels.push(newPixels[i-1][1])
        newNewPixels.push(newPixels[i-1][2])
        newNewPixels.push(newPixels[i-1][3])
    }
    
    newPixels.length = 0;
    
    //flip image horizontally ^
    
    
    
        rowChunks.push({
            width: result.width,
            height: height,
            // data: result.data
            data: newNewPixels
        })
    
        // newNewPixels.length = 0;
    })
    
    results.length = 0;
    
        // rowChunks = results
    
        // rowChunks.push({width: width, height:height, data: result})
    
      
                for (let row = 0; row < localHeight; ++row) {
                    rowChunks.forEach((chunk) => {
                    const rowSize = chunk.width * 4;
                    const chunkOffset= rowSize * row;
                    //   console.log("ADDPIXELS", chunk.data, chunkOffset, chunk.width)
                    pngRGBAWriter.addPixels(chunk.data, chunkOffset, chunk.width);
    
                    // chunk.data.length = 0;
    
                    });
    
                    // rowChunks.length = 0;
            
            
                    // console.log(row, localHeight)
            // console.log("ROWHEIGHT", (row), localHeight)
                    if((row+1) == localHeight){
                        // console.log("UPDATING PROGRESS")
                        setProgress(Math.min(1, (chunkY + chunkHeight) / height));
                        // console.log(Math.min(1, (chunkY + chunkHeight) / height))
                        // console.log(typeof Math.min(1, (chunkY + chunkHeight) / height))
    
                            if(Math.min(1, (chunkY + chunkHeight) / height) == 1){
                                console.log("SAVING")
                                                        let blob = pngRGBAWriter.finishAndGetBlob();
                                                
                                                
                                                    if (blob) {
                                                        const url = URL.createObjectURL(blob);
                                                        saveData(blob, `generated-${width}x${height}.png`);
                                                    }
    
                                                    resetCamera();
    
    
                            }
    
                        // await wait();
                    }
            
                }
    
                rowChunks.length = 0;
    
        }
      
        )
        .catch(e => console.error(e));
      
      
      
      
      
      
         
        }
      
      //END LOOP THROUGH THE IMAGE AND DRAW PORTIONS OF THE IMAGE, THEN WRITE THEM IN
      
      
      
      
      
      
                        
                            //  let blob = pngRGBAWriter.finishAndGetBlob();
                        
                        
                            //  if (blob) {
                            //     const url = URL.createObjectURL(blob);
                            //     saveData(blob, `generated-${width}x${height}.png`);
                            //   }
    
                            //FINSIH AND SAVE DATA
      
      }
      
      // const sizeElem = document.querySelector('#size');
      // const formElem = document.querySelector('#generate');
      // const infoElem = document.querySelector('#info');
      // const radioElem = document.querySelector('.radio');
      // const settingsElem = document.querySelector('#settings');
      
      // const renderers = {
      //   '2d': { Renderer: Renderer2D },
      //   'three.js': { Renderer: Renderer3D },
      //   'shadertoy': { Renderer: RendererShaderToy}, 
      // };
      
      // function showSettings(settingsElem) {
      //   for (const {elem} of Object.values(renderers)) {
      //     elem.style.display = elem === settingsElem ? '' : 'none';
      //   }
      // }
      
      // Object.entries(renderers).forEach(([name, info], ndx) => {
      //   info.elem = document.createElement('div');
      //   settingsElem.appendChild(info.elem);
      //   info.renderer = new info.Renderer(info.elem);
      //   const id = `t${ndx}`;
      //   radioElem.appendChild(el('div', {}, [
      //     el('input', {type: 'radio', value: name, id, name: 'type', onChange: _ => {
      //       showSettings(info.elem);
      //     }}),
      //     el('label', {for: id, textContent: name})
      //   ]));
      // });
      // showSettings(renderers['2d'].elem);
      
      const DEG2RAD = Math.PI / 180;
      
      function degToRad( degrees ) {
      
      return degrees * DEG2RAD;
      
      }
      
      
      
        async function drawArea(width, height, chunkX, chunkY, chunkWidth, chunkHeight, resolve, localWidth, exportSamples) {
          // const { renderer, camera, scene } = this;
          
          renderer.setSize( chunkWidth, chunkHeight );
      
          camera.aspect = chunkWidth / chunkHeight;
          camera.setViewOffset( width, height, chunkX, chunkY, chunkWidth, chunkHeight );
          camera.updateProjectionMatrix();
      
          const radius = 100;
        //   camera.lookAt( 0, 0, 12 );
        camera.lookAt( 0, 0, cameraZ );
          camera.updateMatrixWorld();
      
          // renderer.render( scene, camera );
      
          if(window.raytrace){
        
      ptRenderer.reset()
    
      if(!bigPNGKeepBG){
        renderer.clear()
      }
      
        // requestAnimationFrame( animate );
      
      camera.updateMatrixWorld();
      
      // if ( window.raytrace ) {
      
      camera.focusDistance = camera.position.distanceTo( focusPoint ) - camera.near;
      
      // }
      
      ptRenderer.material.materials.updateFrom( sceneInfo.materials, sceneInfo.textures );
      ptRenderer.material.physicalCamera.updateFrom( camera );
      
      for(var i=0; i<exportSamples; i++){
      
      
      ptRenderer.update();
      
      if ( ptRenderer.samples < 1 ) {
      
      renderer.render( scene, camera );
      
      }
      
      
      
      renderer.autoClear = false;
      // renderer.setPixelRatio( window.devicePixelRatio );
      
      fsQuad.material.map = ptRenderer.target.texture;  
      fsQuad.render( renderer );
      renderer.autoClear = true;
      }
      // console.log(ptRenderer.samples)
      
      
      
      
      
              } else {
      
                console.log(scene)
                //render the scene in normal threejs.
                for(var i=0; i<20; i++){
      renderer.render(scene, camera);
                }
      }
      
    //   let data
      
      if(window.raytrace){
      
        // data = new Float32Array(chunkWidth * chunkHeight * 4);
          // const gl = renderer;
      
          // console.log(renderer)
          // console.log(renderer.getRenderTarget())
      
          // console.log(ptRenderer)
          // console.log(document.getElementById("threeJsCanvas"))
      
          // let gl = document.getElementById("threeJsCanvas").context;
          // console.log(gl)
        //   console.log(renderer)
    
        console.log("rendering", (window.renderNumber / window.totalTileNumber)*100 + "%" )
        canvasworker1.postMessage({ update: "update", message: "Rendering scene: " + Math.ceil((window.renderNumber / window.totalTileNumber)*1000)/10 + "%", percent:Math.ceil((window.renderNumber / window.totalTileNumber)*1000)/10, type:"renderScene" })
        window.renderNumber++
    
          // gl.readPixels(0, 0, chunkWidth, chunkHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);
      
          // gl.readRenderTargetPixels(ptRenderer.target,0, 0, chunkWidth, chunkHeight, data);
      
      
          let canvas = document.getElementById('threeJsCanvas');
        // var context = canvas.getContext("experimental-webgl", {preserveDrawingBuffer: true});
    
    
    
    
        let dataURL = canvas.toDataURL('image/png');
      
      
      
      
        var base64Data = dataURL.slice(22) // removes the preamble ("data:image/png;base64,")
          var pngBytes = atob(base64Data)
          var reader = new PNGReader(pngBytes)
      
      
      
      let data1
      
          
      
      
      
      
      
      
        // return new Promise(resolve => {
          // setTimeout(() => {
    
    
    
            const dataPromise = reader.parse(function(err, png) {
            // console.log(err, '---', png)
            if(err) {
              console.error(err)
              return
            }
            // console.log(png.pixels)
            let data = png.pixels
          
            // console.log('Color at left top most pixel: ', png.pixels.slice(0, 4))
            console.log("loading pixels", (window.ctxNumber / window.totalTileNumber )*100 + "%")
            canvasworker1.postMessage({ update: "update", message: "Loading pixels: " + Math.ceil((window.ctxNumber / window.totalTileNumber )*1000)/10 + "%", type:"loadingPixels" })

            // update: "update", message: "Rendering scene: " + Math.ceil((window.renderNumber / window.totalTileNumber)*1000)/10 + "%", percent:Math.ceil((window.renderNumber / window.totalTileNumber)*1000)/10, type:"renderScene"

            window.ctxNumber++
      
      
    //   console.log(data)
      
      
      
          const lineSize = chunkWidth * 4;
          const line = new Uint8Array(lineSize);
          const numLines = chunkHeight / 2 | 0;
          for (let i = 0; i < numLines; ++i) {
            const topOffset = lineSize * i;
            const bottomOffset = lineSize * (chunkHeight - i - 1);
            line.set(data.slice(topOffset, topOffset + lineSize), 0);
            data.set(data.slice(bottomOffset, bottomOffset + lineSize), topOffset);
            data.set(line, bottomOffset);
          }
      
        //   console.log(data)
      
    // console.log("RESOLVING")
    
    resolve( {data: data, width: localWidth})
      
      
        })
    
    
        return dataPromise;
    
          // }, 2000);
        // });
      
      
      // console.log(data1)
      
      // const promise1 = 
      
      // setTimeout(()=>{
      
    //   console.log(data1)
      
      
      
      
      
      
      
      
      
        // },200)
      
      
      
      
      // img.src = dataURL;
      
        // let url = dataURL.replace(/^data:image\/png/,'data:application/octet-stream');
      
          
      
      
          
         
      
      
      } else {
      
          data = new Uint8Array(chunkWidth * chunkHeight * 4);
          const gl = renderer;
      
          // console.log(renderer)
          // console.log(renderer.getRenderTarget())
      
          // console.log(ptRenderer)
          // console.log(document.getElementById("threeJsCanvas"))
      
          // let gl = document.getElementById("threeJsCanvas").context;
          // console.log(gl)
          console.log(renderer)
          // gl.readPixels(0, 0, chunkWidth, chunkHeight, gl.RGBA, gl.UNSIGNED_BYTE, data);
          gl.readRenderTargetPixels(renderer.domElement,0, 0, chunkWidth, chunkHeight, data);
      
          
          const lineSize = chunkWidth * 4;
          const line = new Uint8Array(lineSize);
          const numLines = chunkHeight / 2 | 0;
          for (let i = 0; i < numLines; ++i) {
            const topOffset = lineSize * i;
            const bottomOffset = lineSize * (chunkHeight - i - 1);
            line.set(data.slice(topOffset, topOffset + lineSize), 0);
            data.set(data.slice(bottomOffset, bottomOffset + lineSize), topOffset);
            data.set(line, bottomOffset);
          }
          return {
            width: chunkWidth,
            height: chunkHeight,
            data: data,
          };
      
          // 
      }
      
      
      
      
      
          // gl.getImageData(0, 0, chunkWidth, chunkHeight).data;
      
          // swap lines (should probably just fix code in makeBigPng to read backward
      
        }
      
      
      
      
    
      
      
      async function savePng(){

        document.getElementById("controls").classList.toggle("invisible")
    
        document.getElementById("loading").style.display = ""
    setTimeout(async ()=>{
    
    
      
        console.log("savePng")
      
      let imgwidth = document.getElementById("widthValue").value
      let imgheight = document.getElementById("widthValue").value
      let exportSamples = document.getElementById("exportSamples").value
    //   let multiple4096 = document.getElementById("multiple4096").checked
    //    console.log("multiple4096", multiple4096)
    
      renderer.setSize(imgwidth, imgheight)
      
      
       await makeBigPng(imgwidth, imgheight, exportSamples)
        
    
    },1000)
        // .then((blob) => {
          // infoElem.style.display = 'none';
          // formElem.disabled = false;
          // if (blob) {
          //   const url = URL.createObjectURL(blob);
          //   saveData(blob, `generated-${imgwidth}x${imgheight}.png`);
          // }
        // }
        
        // );
      
      
      
      
      
      
      }
      
      
    //   console.log("ahhahah")
      
        // window.addEventListener('DOMContentLoaded', function () {
        // init();
      
        // console.log("domcontentloaded!")