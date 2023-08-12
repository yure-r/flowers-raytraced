let segmentss = 360


var VaseMesh = function VaseMesh(geom, isWireframe) {
	// _classCallCheck(this, VaseMesh);

	this.isWireframe = isWireframe;
	this.geom = geom;
	// this.geom = this.geom.toNonIndexed()
	console.log(this.geom)
	this.geom.computeVertexNormals(true)
	// THREE.BufferGeometryUtils.mergeVertices(this.geom)
	
	// this.geom.computeFaceNormals();
	this.geom.computeVertexNormals()

	let dimension = 16384;


	let canvas = document.createElement("canvas")
	canvas.height = dimension
	canvas. width = dimension
	canvas.id = "myCanvas"
	document.body.appendChild(canvas)
	var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  
  // Create gradient
  var grd = ctx.createLinearGradient(0, 0, 0, dimension);
  
  
  
  
  
  // if(params.color1.value.r == params.color2.value.r && params.color1.value.g == params.color2.value.g && params.color1.value.b == params.color2.value.b){
  
  //   if (params.color1.value.r != params.color3.value.r || params.color1.value.g != params.color3.value.g || params.color1.value.b != params.color3.value.b){
  //   console.log("color 1 and 3 are different colors!")
  //   grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  //   grd.addColorStop(1, `rgb(${params.color3.value.r * 255}, ${params.color3.value.g * 255}, ${params.color3.value.b * 255})`);
  //   } else {
  //     console.log("all colors are the same")
  //   }
  
  
  // } else if (params.color1.value.r == params.color3.value.r && params.color1.value.g == params.color3.value.g && params.color1.value.b == params.color3.value.b){
  //   // console.log("color 1 and 3 are the same colors!")
  //   if (params.color1.value.r != params.color2.value.r || params.color1.value.g != params.color2.value.g || params.color1.value.b != params.color2.value.b){
  //     console.log("color 1 and 2 are different colors!")
  //   grd.addColorStop(0, `rgb(${params.color1.value.r * 255}, ${params.color1.value.g * 255}, ${params.color1.value.b * 255})`);
  // grd.addColorStop(1, `rgb(${params.color2.value.r * 255}, ${params.color2.value.g * 255}, ${params.color2.value.b * 255})`);
  //   }
  // } else {
  
  
  
  // }
  

	grd.addColorStop(0, `rgba(${fxrand() * 255}, ${fxrand() * 255}, ${fxrand() * 255}, 1.0)`);
	grd.addColorStop(1, `rgba(${fxrand() * 255}, ${fxrand() * 255}, ${fxrand() * 255}, 1.0)`);

	// grd.addColorStop(0, `rgba(${fxrand() * 255}, ${fxrand() * 255}, ${fxrand() * 255}, 1.0)`);
	// grd.addColorStop(1, `rgba(${fxrand() * 255}, ${fxrand() * 255}, ${fxrand() * 255}, 1.0)`);

  
	// grd.addColorStop(0, `rgba(${255}, ${255}, ${255}, 0.5)`);
	// grd.addColorStop(1, `rgba(${255}, ${255}, ${255}, 0.5)`);

	// grd.addColorStop(0, `rgba(${255}, ${255}, ${255}, 0.5)`);
	// grd.addColorStop(1, `rgba(${255}, ${255}, ${255}, 0.5)`);
  
  // Fill with gradient



  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, dimension, dimension); /////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!
/////ADD GRADIENT BACKGROUND!!!!!




//   for (var i = 0; i <=10; i++) {
// 	let radius = fxrand()*2000 
// 	ctx.beginPath();
// 	var rand_x = Math.random(i) * dimension;
// 	var rand_y = Math.random(i) * dimension;
// 	ctx.arc(rand_x, rand_y, radius, 1, 2*Math.PI);
// 	ctx.fillStyle ="white";
// 	ctx.fill();
// 	ctx.closePath();   
// 	}

							//BEGIN VERT LINES
							// 	for (var i = 1; i <=dimension; i+=(dimension/10)) {
							// ctx.beginPath(); // Start a new path
							// ctx.moveTo(0, 60+i); // Move the pen to (30, 50)
							// ctx.lineTo(dimension, 60+i); // Draw a line to (150, 100)
							// ctx.lineWidth = 100;
							// ctx.strokeStyle = "white";
							// ctx.stroke(); // Render the path
							// 	}


		// for (var i = 1; i <=dimension; i+=(dimension/((fxrand()*100)+20))) {
		// ctx.beginPath(); // Start a new path
		// ctx.moveTo(60+i, 0); // Move the pen to (30, 50)
		// ctx.lineTo(60+i, dimension); // Draw a line to (150, 100)
		// ctx.lineWidth = 10;
		// ctx.strokeStyle = "white";
		// ctx.stroke(); // Render the path
		// 	}

						//BEGIN HORIZ LINES
							// for (var i = 1; i <=dimension; i+=(dimension/10)) {
							// 	ctx.beginPath(); // Start a new path) {
							// ctx.beginPath(); // Start a new path
							// ctx.moveTo(60+i, 0); // Move the pen to (30, 50)
							// ctx.lineTo(60+i, dimension); // Draw a line to (150, 100)
							// ctx.lineWidth = 100;
							// ctx.strokeStyle = "white";
							// ctx.stroke(); // Render the path
							// 	}


//BEGIN DOTS

// for (var i = 0; i <=100; i++) {
// 	let radius = fxrand()*2000 
//   let x = fxrand()*dimension
//   let y = fxrand()*dimension

//   let color = fxrand() * 255
//   let color2 = fxrand() * 255
//   let color3 = fxrand() * 255

//   var radgrad = ctx.createRadialGradient(x,y,0,x,y,radius);
//   radgrad.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
//   radgrad.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
//   radgrad.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
  
//   // draw shape
//   ctx.fillStyle = radgrad;
//   ctx.fillRect(0,0,dimension,dimension);

// if(x < radius){
//   var radgrad2 = ctx.createRadialGradient(x+dimension,y,0,x+dimension,y,radius);
//   radgrad2.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
//   radgrad2.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
//   radgrad2.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
  
//   // draw shape
//   ctx.fillStyle = radgrad2;
//   ctx.fillRect(0,0,dimension,dimension);
// }

// if(x-dimension < radius){


//   var radgrad3 = ctx.createRadialGradient(x-dimension,y,0,x-dimension,y,radius);
//   radgrad3.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
//   radgrad3.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
//   radgrad3.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
  
//   // draw shape
//   ctx.fillStyle = radgrad3;
//   ctx.fillRect(0,0,dimension,dimension);
// }


// 	}

//END RANDOM COLOR DOTS


		
				//BEGIN WHITE DOTS
				for (var i = 0; i <=100; i++) {
					let radius = fxrand()*2000 
				let x = fxrand()*dimension
				let y = fxrand()*dimension

				let color = 255
				let color2 = 255
				let color3 = 255

            // let color = fxrand()*255
				// let color2 = fxrand()*255
				// let color3 = fxrand()*255

				var radgrad = ctx.createRadialGradient(x,y,0,x,y,radius);
				radgrad.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
				radgrad.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
				radgrad.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
				
				// draw shape
				ctx.fillStyle = radgrad;
				ctx.fillRect(0,0,dimension,dimension);

				if(x < radius){
				var radgrad2 = ctx.createRadialGradient(x+dimension,y,0,x+dimension,y,radius);
				radgrad2.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
				radgrad2.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
				radgrad2.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
				
				// draw shape
				ctx.fillStyle = radgrad2;
				ctx.fillRect(0,0,dimension,dimension);
				}

				if(x-dimension < radius){


				var radgrad3 = ctx.createRadialGradient(x-dimension,y,0,x-dimension,y,radius);
				radgrad3.addColorStop(0, `rgba(${color},${color2},${color3},1)`);
				radgrad3.addColorStop(0.5, `rgba(${color},${color2},${color3},.5)`);
				radgrad3.addColorStop(1, `rgba(${color},${color2},${color3},0)`);
				
				// draw shape
				ctx.fillStyle = radgrad3;
				ctx.fillRect(0,0,dimension,dimension);
				}


					}
				//END WHITE DOTS



//DEBUG TEXTURE CONNECTING
	// ctx.beginPath(); // Start a new path
	// ctx.moveTo(dimension, 0); // Move the pen to (30, 50)
	// ctx.lineTo(dimension, dimension); // Draw a line to (150, 100)
	// ctx.lineWidth = 10;
	// ctx.strokeStyle = "red";
	// ctx.stroke(); // Render the path
//DEBUG TEXTURE CONNECTING
	



  
  var texture = new THREE.CanvasTexture(c) 
	  texture.needsUpdate = true;
  
  
  // return new THREE.MeshBasicMaterial({
  //   // color: new THREE.Color("red"),
  //   // vertexColors: THREE.VertexColors,
  //   // wireframe: true
  //   map: texture,
  //   side: THREE.DoubleSide
  // });
  

  let material

  if(window.lgltrace){
   material = new THREE.MeshPhysicalMaterial( {
      color: 0xffffff,
      metalness: 0,
      roughness: 1.0,
      // alphaMap: texture,
      map: texture,
      alphaTest: 0.9,
      // blending: THREE.AdditiveBlending,
      envMap: window.mapping,
      envMapIntensity: 1.0,
      // depthTest: false,
      opacity: 0.01, //SET TRANSPARENCY
      // transparency: 0.001, //SET TRANSPARENCY
      transparent: true,
      side: THREE.DoubleSide
   } );

  } else {
   material = new THREE.MeshPhysicalMaterial( {
      color: 0xffffff,
      metalness: 0,
      roughness: 1.0,
      // alphaMap: texture,
      map: texture,
      alphaTest: 0.29,
      // blending: THREE.AdditiveBlending,
      envMap: window.mapping,
      envMapIntensity: 1.0,
      // depthTest: false,
      opacity: 0.9, //SET TRANSPARENCY
      // transparency: 0.001, //SET TRANSPARENCY
      transparent: true,
      side: THREE.DoubleSide
   } );
  }





// material = 

document.body.removeChild(canvas)
	// this.meshMaterial = new THREE.MeshPhysicalMaterial({
	// 	// color: 0xffffff,
	// 	roughness: 0.1,   
	// 	transparency: 1,  
	// 	thickness: 1,
	// 	// emissive: 3355443,
	// 	shininess: 20,
	// 	// roughness: 1,
	// 	// side: THREE.DoubleSide,
	// 	// shading: THREE.SmoothShading,
	// 	flatShading: false,
	// 	// map: texture,
	// 	// shading: THREE.SmoothShading,
	// 	side: THREE.DoubleSide
	// });

	this.meshMaterial = material

	this.meshMaterial.flatShading = false;
	this.meshMaterial.smoothShading = true;

   this.meshMaterial.name = "vaseMaterial" + fxrand()

	this.wireFrameMat = new THREE.MeshPhysicalMaterial({
		color: 1118481
	});

	if (isWireframe) {
		this.wireFrameMat.wireframe = true;
		this.mesh = THREE.SceneUtils.createMultiMaterialObject(this.geom, [this.meshMaterial, this.wireFrameMat]);
	} else {
		this.mesh = new THREE.Mesh(this.geom, this.meshMaterial);
	}

	return this.mesh;
};



 

// class VaseGeometry1 {

// 	constructor (count, segments, heightVar, sinVar, cosVar) {

//     this.segments = segments;
//     this.vasePoints = new VasePoints();
//     this.count = count;
//     this.heightVar = heightVar;
//     this.sinVar = sinVar;
//     this.cosVar = cosVar;
//     this.phiStart = 0;
//     this.phiLength = 2*Math.PI;
//     this.geometryOuter = {};
//     this.geometryInner = {};

//     this.vasePoints.setPoints(this.count, this.sinVar, this.cosVar, this.heightVar);
//     this.geometryOuter = new THREE.LatheGeometry(this.vasePoints.getPointsOuter(), this.segments, this.phiStart, this.phiLength);
//     this.geometryInner = new THREE.LatheGeometry(this.vasePoints.getPointsInner(), this.segments, this.phiStart, this.phiLength);
//     this.geometryOuter.merge(this.geometryInner);

//     return this.geometryOuter;
// 	}

// }

