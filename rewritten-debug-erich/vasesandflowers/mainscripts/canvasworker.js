let canvasB = null;
let ctxWorker = null;
let message = ""
let posX = 0
let posY = 0
let degrees = 0 
let width = 2000
let height = 2000
let offset = width/2
let k = 1
let m = 0
let a = 0
let asdf = 901234798123
let rotate = 0

let totalPercent = 2

let color = 0
let bgColor = `hsl(100, 0%, 100%)`
let increment = 0

let includesDots = false

let randoms = []
let preRender = true
let preRenderDelay = 30
let type = ""

// var debug = document.querySelector("#debug"),
    // canvas = document.querySelector('#mycanvas'),
  //  var ctx = canvas.getContext('2d'),
    var red = 255,
    blue = 0,
    green = 179,
    inc = 2,
    tm = 901234798123
    

// Waiting to receive the OffScreenCanvas
self.onmessage = (event) => {
  if (event.data === "slowDown") {
    fibonacci(42);
  } else {

    if(event.data.start){
      randoms = event.data.randoms
        canvasB = event.data.canvas;
        ctxWorker = canvasB.getContext("2d");
        message = "Loading..."
        // redrawCanvasB("Loading...");
        // console.log("got message!", "loading...")
    }

    if(event.data.update == "update"){


      // type
      //choosingColors 1/7

      // buildingFlowers 2/7
      // placedot 3/7
      // packing 4/7
      // delWorker1 5/7
      // delWorker2 6/7
      // buildBVH 7/7


      if(event.data.type){

switch(event.data.type){
  case "buildingFlowers":
    totalPercent = ((event.data.percent/100)*(100/7))
  break;
  case "placedot":
    totalPercent = (100/7)*1 + ((event.data.percent/100)*(100/7))
  break;
  case "packing":
    totalPercent = (100/7)*2 + ((event.data.percent/100)*(100/7)*4.5)
  break;
  // case "delWorker1":
  //   totalPercent = (100/7)*4.5
  // break;
  // case "delWorker2":
  //   totalPercent = (100/7)*5.5
  // break;
  case "buildBVH":
    totalPercent = (100/7)*6.5 + ((event.data.percent/100)*(100/7)*0.5)
  break;

  case "rendering":
    console.log("RENDERING! STOPPING DRAWING")
    preRender= false
    preRenderDelay = 1000
    // totalPercent = (100/7)*6.5 + ((event.data.percent/100)*(100/7)*0.5)

    case "renderScene":
      totalPercent = (event.data.percent)
      preRender= false
      preRenderDelay = 30
    break;

    case "loadingPixels":
      preRender = false
      preRenderDelay = 1000
      break;

  break;


}

      }




      message = event.data.message

      redrawCanvasA(message)
        // redrawCanvasB(message);
        // console.log("got message!", event.data.message)
    } else if (event.data.update == "updateColors"){

      // totalPercent = (100/7)

      color = event.data.message[0]
      increment = event.data.message[1]
    }
    else if (event.data.update == "updateBGColors"){
      bgColor = event.data.message[0]
      // increment = event.data.message[1]
    } else if (event.data.update == "includesDots"){
      includesDots = true
    }


    // startCounting();
  }

};

// Fibonacci function to add some delay to the thread
function fibonacci(num) {
  if (num <= 1) {
    return 1;
  }
  return fibonacci(num - 1) + fibonacci(num - 2);
}

// Start the counter for Canvas B
// let counter = 0;
// function startCounting() {
//   setInterval(() => {
//     redrawCanvasB();
//     counter++;
//   }, 100);
// }


function lerp(a, b, n) {
  return (b - a) * n + a;
}
  
// function animate() {

  
  // window.requestAnimationFrame(animate);
// }

              function drawCircleOriginal(){

                ctxWorker.save();
                ctxWorker.translate(offset, offset);
                ctxWorker.rotate(m/2);
                // Draw half open circle
                ctxWorker.beginPath();
                ctxWorker.lineWidth = 2;
                ctxWorker.arc(8-(offset/2) , 8-(offset/2), 60, 0, 2 * Math.PI);

                ctxWorker.stroke();
                // Draw arrowhead
                ctxWorker.rotate(degrees);
                ctxWorker.lineWidth = 2;
                ctxWorker.moveTo(13-offset , 1-offset);

                // ctxWorker.lineTo(9-offset , 5-offset);
                // ctxWorker.lineTo(13-offset , 5-offset);
                // ctxWorker.lineTo(13-offset , 1-offset);
                ctxWorker.stroke();
                ctxWorker.restore();



              }


              function drawCircles(){
              
let drawCirclesVal = false
                
                // drawCircle()

if(preRender){
  drawCircleRev()
}




                // drawCircleNew()
                          // drawCircleNew2()
                // drawCircleNew3()
                    // drawCircelNew4()
 if(drawCirclesVal){

 
                randoms[0] < 0.5 ? drawCircle() : false;
                randoms[1] < 0.5 ? drawCircle2() : false;
                randoms[2] < 0.5 ? drawCircle3() : false;

                randoms[0] > 0.5 && randoms[1] > 0.5 && randoms[2] > 0.5 ? (drawCircle(),drawCircle2(), drawCircle3()) : false;
 }



// ctxWorker.filter = "blur(0px)";
ctxWorker.globalCompositeOperation = "darken";
              }


              function drawCircleNew3(){
                // const canvas = document.querySelector('canvas');
const ctx = ctxWorker
const radius = 50;
const sides = 6;
const points = [];
for(let i = 0; i < sides; i++) {
  const x = radius * Math.cos(2 * Math.PI * i / sides);
  const y = radius * Math.sin(2 * Math.PI * i / sides);
  points.push({x, y});
}

ctx.beginPath();
ctx.moveTo(points[0].x, points[0].y);

for(let i = 1; i < points.length; i++) {
  const xc = (points[i].x + points[i-1].x) / 2;
  const yc = (points[i].y + points[i-1].y) / 2;
  ctx.quadraticCurveTo(points[i-1].x, points[i-1].y, xc, yc);
}

const xc = (points[0].x + points[sides-1].x) / 2;
const yc = (points[0].y + points[sides-1].y) / 2;
ctx.quadraticCurveTo(points[sides-1].x, points[sides-1].y, xc, yc);

ctx.stroke();
              }


              function drawCircelNew4(){
                let ctx = ctxWorker
                let radius = 50;
                let angle = 0;
                // let m = 0.5;
                let centerX = 1000
                let centerY = 1000
                
                // function draw() {
                  ctx.clearRect(0, 0, 2000, 2000);
                  ctx.beginPath();
                  ctx.moveTo(centerX + radius * Math.cos(angle), centerY + radius * Math.sin(angle));
                
                  for (let i = 0; i < 10; i++) {
                    angle += Math.PI / 5;
                    let x = centerX + (radius + m * radius * Math.sin(angle)) * Math.cos(angle);
                    let y = centerY + (radius + m * radius * Math.sin(angle)) * Math.sin(angle);
                    ctx.lineTo(x, y);
                  }
                
                  ctx.bezierCurveTo(
                    centerX + (radius + m * radius * Math.sin(angle)) * Math.cos(angle),
                    centerY + (radius + m * radius * Math.sin(angle)) * Math.sin(angle),
                    centerX + (radius + m * radius * Math.sin(angle + Math.PI / 4)) * Math.cos(angle + Math.PI / 4),
                    centerY + (radius + m * radius * Math.sin(angle + Math.PI / 4)) * Math.sin(angle + Math.PI / 4),
                    centerX + (radius + m * radius * Math.sin(angle + Math.PI / 2)) * Math.cos(angle + Math.PI / 2),
                    centerY + (radius + m * radius * Math.sin(angle + Math.PI / 2)) * Math.sin(angle + Math.PI / 2)
                  );
                
                  ctx.stroke();
                // }
              }


              function drawCircleNew2(){
                let r=0, b=0, o="difference", f="rgba(255,0,0,.9)", sw=100, st=20, amp=200, x, y, d, px, py, qx, qy, cx, cy, i, inc=Math.PI/32;

r = (randoms[5]*300 + 700)/2;
let oa=Math.ceil(randoms[8]*7), ia=Math.ceil(randoms[9]*7);
ctxWorker.beginPath();

ctxWorker.globalCompositeOperation = o;
if (color) { f = "hsl("+(color+180)%360+",100%,50%,.9)"; }
ctxWorker.fillStyle = f;

ctxWorker.moveTo(x=r+Math.cos(0)*(r+sw/2), y=r+Math.sin(0)*(r+sw/2));
for (i=0; i<64; i++) {
    d = Math.cos((i*inc+m)*oa)*amp;
    px = r+Math.cos(i*inc)*(r+sw/2);
    py = r+Math.sin(i*inc)*(r+sw/2);
    qx = r+Math.cos((i+1)*inc)*(r+sw/2);
    qy = r+Math.sin((i+1)*inc)*(r+sw/2);
    cx = r+Math.cos(i*inc)*(r+sw/2-st/2+d);
    cy = r+Math.sin(i*inc)*(r+sw/2-st/2+d);
    ctxWorker.bezierCurveTo(px, py, cx, cy, qx, qy);
}
for (i=64; i>=0; i--) {
    d = Math.sin((i*inc-m)*ia)*amp;
    px = r+Math.cos(i*inc)*(r-sw/2);
    py = r+Math.sin(i*inc)*(r-sw/2);
    qx = r+Math.cos((i-1)*inc)*(r-sw/2);
    qy = r+Math.sin((i-1)*inc)*(r-sw/2);
    cx = r+Math.cos(i*inc)*(r-sw/2+st/2+d);
    cy = r+Math.sin(i*inc)*(r-sw/2+st/2+d);
    ctxWorker.bezierCurveTo(px, py, cx, cy, qx, qy);
}
ctxWorker.closePath();
ctxWorker.fill();
ctxWorker.fillStyle = "black";
              }

              function drawCircleNew(){


// // width = 400; height = 400;
// const centerX = width / 2, centerY = height / 2, radius = 100;
// const zigzagWidth = 10, zigzagSpacing = 5, maxDisplacement = 15;

// ctxWorker.beginPath();
// ctxWorker.moveTo(centerX + radius, centerY);
// drawZigzagPath(128);
// ctxWorker.moveTo(centerX + radius - zigzagWidth, centerY);
// drawZigzagPath(128);

// // Set line style
// ctxWorker.lineWidth = 5;
// ctxWorker.strokeStyle = '#FF0000';

// // Draw the line
// ctxWorker.stroke();

// function drawZigzagPath(numPoints) {
//   const points = getZigzagPoints(numPoints);
//   ctxWorker.bezierCurveTo(...getControlPoints(points[0], points[1], points[2]), ...points[1]);
//   for (let i = 1; i < numPoints; i++) {
//     const prevPoint = points[i - 1], currPoint = points[i], nextPoint = points[(i + 1) % numPoints];
//     ctxWorker.bezierCurveTo(...getControlPoints(prevPoint, currPoint, nextPoint), ...currPoint);
//   }
//   const lastPoint = points[numPoints - 1], firstPoint = points[0], nextPoint = points[1];
//   ctxWorker.bezierCurveTo(...getControlPoints(lastPoint, firstPoint, nextPoint), ...firstPoint);
// }

// function getZigzagPoints(numPoints) {
//   return Array.from({ length: numPoints }, (_, i) => {
//     const angle = (i * Math.PI) / (numPoints / 2);
//     const displacement = Math.cos((angle+(m*2)) * 10) * maxDisplacement;
//     const x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//     const y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//     return [x, y];
//   });
// }

// function getControlPoints(prevPoint, currPoint, nextPoint) {
//   const tangent1 = [(currPoint[0] - prevPoint[0]) / 2, (currPoint[1] - prevPoint[1]) / 2];
//   const tangent2 = [(nextPoint[0] - currPoint[0]) / 2, (nextPoint[1] - currPoint[1]) / 2];
//   const length1 = Math.sqrt(tangent1[0] ** 2 + tangent1[1] ** 2);
//   const length2 = Math.sqrt(tangent2[0] ** 2 + tangent2[1] ** 2);
//   const maxLength = Math.min(length1, length2);
//   const control1 = [currPoint[0] - maxLength * (tangent1[0] / length1), currPoint[1] - maxLength * (tangent1[1] / length1)];
//   const control2 = [currPoint[0] + maxLength * (tangent2[0] / length2), currPoint[1] + maxLength * (tangent2[1] / length2)];
//   return [control1[0], control1[1], control2[0], control2[1], currPoint[0], currPoint[1]];
// }



              }


              function drawCircleRev() {
                const centerX = width / 2, centerY = height / 2;
                const radius = (randoms[5] * 300 + 700) / 2, 
                zigzagWidth = 100, 
                zigzagSpacing = 40, 
                maxDisplacement = 120;
                const outerAmpNumber = Math.ceil(randoms[8] * 7)+1, innerAmpNumber = Math.ceil(randoms[9] * 7)+1;
                let incrementNumber = 256+16 //128 WORKS AND 512 WORKS // AND 64 WORKS //increments of 64 always work, increments of 16 work
                const increment = Math.PI / incrementNumber;
                
                const points = [];
                
                // add points for outer zigzag path
                for (let angle = 0; angle < Math.PI * 2; angle += increment) {
                  // const x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2);
                  // const y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2);
                  points.push({x: 0, y: 0});
                  // points.push({x, y});
                
                  const displacement = Math.cos((angle + (Math.sin(m*5) * 2)) * outerAmpNumber) * maxDisplacement;
                  const zigzagX = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
                  const zigzagY = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
                  // points.push({x: 0, y: 0});
                  points.push({x: zigzagX, y: zigzagY});
                  // points.push({x: 0, y: 0});
                
                  // const zigzagX2 = centerX + Math.cos(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
                  // const zigzagY2 = centerY + Math.sin(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
                  // points.push({x: zigzagX2, y: zigzagY2});
                  points.push({x: 0, y: 0});
                }
                
                // add points for inner zigzag path
                for (let angle = Math.PI * 2; angle > 0; angle -= increment) {
                  const displacement = Math.sin((angle - (Math.cos(m*5))) * innerAmpNumber) * maxDisplacement;
                  const zigzagX = centerX + Math.cos(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
                  const zigzagY = centerY + Math.sin(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
                  points.push({x: zigzagX, y: zigzagY});
                  // points.push({x: 0, y: 0});
                
                  // const zigzagX2 = centerX + Math.cos(angle - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
                  // const zigzagY2 = centerY + Math.sin(angle - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
                  points.push({x: 0, y: 0});
                  // points.push({x: zigzagX2, y: zigzagY2});
                }
                
                // draw Bezier path that follows the contour of the points
                // points
                // const firstPoint = points.shift();
                // points.push(points[1], points[1], points[1])
                // points.push(points[1], points[2], points[3], points[4], points[5], points[6])
                // points.push(points[7], points[8], points[9], points[10], points[11], points[12])
                // const firstPoint = points[];
                ctxWorker.beginPath();
                ctxWorker.moveTo(points[points.length-2].x, points[points.length-2].y);

                // ctxWorker.bezierCurveTo(firstPoint.x, firstPoint.y, points[0].x, points[0].y, firstPoint.x, firstPoint.y);
                
                // console.log("POINTS", points)

                for (let i = 1; i < points.length; i += 6) {
                  const cp1 = points[i];
                  const cp2 = points[i + 1];
                  const end = points[i + 2];
                  ctxWorker.bezierCurveTo(cp1.x, cp1.y, cp1.x, cp1.y, cp1.x, cp1.y);
                  // ctxWorker.bezierCurveTo(cp2.x, cp2.y, cp2.x, cp2.y, cp2.x, cp2.y);
                  // ctxWorker.bezierCurveTo(end.x, end.y, end.x, end.y, end.x, end.y);
                }

                // ctxWorker.bezierCurveTo(points[points.length-1].x, points[points.length-1].y, points[points.length-1].x, points[points.length-1].y, points[points.length-1].x, points[points.length-1].y);


                          // ctxWorker.strokeStyle = "rgba(255, 0, 0, 0.9)"
                        
                          // ctxWorker.ellipse(points[points.length-1].x, points[points.length-1].y, 5, 5, 0, 0, 2 * Math.PI); //end point

                                      ctxWorker.lineTo(points[points.length-2].x, points[points.length-2].y);

                          // ctxWorker.ellipse(points[1].x, points[1].y, 5, 5, 0, 0, 2 * Math.PI); //end point
         
                                      ctxWorker.lineTo(points[1].x, points[1].y);

                          // ctxWorker.ellipse(points[(6*incrementNumber)+1].x, points[(6*incrementNumber)+1].y, 5, 5, 0, 0, 2 * Math.PI);
                                      ctxWorker.lineTo(points[(6*incrementNumber)+1].x, points[(6*incrementNumber)+1].y);

                          // ctxWorker.ellipse(points[(6*(incrementNumber+1))+1].x, points[(6*(incrementNumber+1))+1].y, 5, 5, 0, 0, 2 * Math.PI);
                                      ctxWorker.lineTo(points[(6*(incrementNumber+1))+1].x, points[(6*(incrementNumber+1))+1].y);

                          // ctxWorker.ellipse(points[(6*(incrementNumber-1))+1].x, points[(6*(incrementNumber-1))+1].y, 5, 5, 0, 0, 2 * Math.PI);


                          ctxWorker.closePath();
                          ctxWorker.fillStyle = color == 0 ? "rgba(255, 0, 0, 0.9)": "hsl( "+(color)%360 +", 100%, 40%, 0.9)";
                          ctxWorker.fill()


                          // ctxWorker.ellipse(points[points.length-1].x, points[points.length-1].y, 5, 5, 0, 0, 2 * Math.PI); //end point
                          // ctxWorker.ellipse(points[points.length-3].x, points[points.length-3].y, 3, 3, 0, 0, 2 * Math.PI); //end point

                          // ctxWorker.stroke()


              }

              function drawCircle(){

                let blur = 0
                ctxWorker.globalCompositeOperation = "difference";

                if(color == 0){
                  ctxWorker.fillStyle = "rgba(255, 0, 0, 0.9)";
                } else {
                  ctxWorker.fillStyle = "hsl( "+(color+180)%360 +", 80%, 80%, 0.9)";
                }

                


                const centerX = width / 2;
                const centerY = height / 2;
                let radius = (randoms[5]*300) + 700
                radius = radius/2
                const zigzagWidth = 100; //changes the.... inner radius?
                const zigzagSpacing = 20; //line thickness all around
                const maxDisplacement = 200; //amplitude
                
                let outerAmpNumber = Math.ceil(randoms[8]*7)
                let innerAmpNumber = Math.ceil(randoms[9]*7)





let increment = Math.PI / 256 //RESOLUTION


ctxWorker.beginPath();

// draw outer zigzag path
for (let angle = 0; angle <= Math.PI * 2; angle += increment) {
  let x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2);
  let y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2);
    ctxWorker.lineTo(x, y);

  const displacement = Math.cos((angle+(m*2)) * outerAmpNumber) * maxDisplacement;
  const zigzagX = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  const zigzagY = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX, zigzagY);
  const zigzagX2 = centerX + Math.cos(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  const zigzagY2 = centerY + Math.sin(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX2, zigzagY2);
}

for (let angle = Math.PI * 2; angle >= 0; angle -= increment) {
  const displacement = Math.sin((angle-m) * innerAmpNumber) * maxDisplacement;
  const zigzagX = centerX + Math.cos(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  const zigzagY = centerY + Math.sin(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX, zigzagY);
  const zigzagX2 = centerX + Math.cos((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  const zigzagY2 = centerY + Math.sin((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX2, zigzagY2);


}

// close path and fill
ctxWorker.closePath(); 
ctxWorker.fill();
ctxWorker.fillStyle = "black";

            }




            function drawCircle2(){
              let blur = 40*randoms[4]
              ctxWorker.globalCompositeOperation = "difference";
              ctxWorker.fillStyle = "rgba(0, 0, 255, 0.9)";

              // set canvas dimensions
        //  let width = 4000;
        //  let height = 4000;
         
         // define circle parameters
         const centerX = width / 2;
         const centerY = height / 2;
        //  const radius = 1000;
        let radius = (randoms[6]*300) + 700
        radius = radius/2
         
         // set zigzag properties
         const zigzagWidth = 100; //changes the.... inner radius?
         const zigzagSpacing = 20; //line thickness all around
         const maxDisplacement = 100; //amplitude
         
         let outerAmpNumber = Math.ceil(randoms[10]*7)
         let innerAmpNumber = Math.ceil(randoms[11]*7)
         
         let increment = Math.PI / 512 //RESOLUTION
         
         // start path
         ctxWorker.beginPath();
         
         // draw outer zigzag path
         for (let angle = 0; angle <= Math.PI * 2; angle += increment) {
           let x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2);
           let y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2);
           if (angle === 0) {
             // angle =  0.01
             //  x = centerX + Math.cos(angle + 5) * (radius + zigzagWidth / 2);
             // x = 5
             //  y = 5
             // ctxWorker.moveTo(x, y);
         
             
         
           } else {
         
         
             
             ctxWorker.lineTo(x, y);
           }
           const displacement = Math.cos((angle-(m*2)) * outerAmpNumber) * maxDisplacement;
           const zigzagX = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
           const zigzagY = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
           ctxWorker.lineTo(zigzagX, zigzagY);
           const zigzagX2 = centerX + Math.cos(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
           const zigzagY2 = centerY + Math.sin(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
           ctxWorker.lineTo(zigzagX2, zigzagY2);
         }
         
         // draw inner zigzag path
         for (let angle = Math.PI * 2; angle >= 0; angle -= increment) {
         
           
           const x = centerX + Math.cos(angle) * (radius - zigzagWidth / 2);
           const y = centerY + Math.sin(angle) * (radius - zigzagWidth / 2);
           // ctxWorker.lineTo(x, y);
           const displacement = Math.sin((angle+m) * innerAmpNumber) * maxDisplacement;
           const zigzagX = centerX + Math.cos(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
           const zigzagY = centerY + Math.sin(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
           ctxWorker.lineTo(zigzagX, zigzagY);
           const zigzagX2 = centerX + Math.cos((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
           const zigzagY2 = centerY + Math.sin((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
           ctxWorker.lineTo(zigzagX2, zigzagY2);
         
         
         }
         
         // close path and fill
         ctxWorker.closePath(); 
        //  ctxWorker.fillStyle = "black";
        ctxWorker.filter = "blur(" +blur+ "px)";
         ctxWorker.fill();
         
         ctxWorker.fillStyle = "black";
         
                     }




              function drawCircle3(){
                let blur = 40*randoms[4]
                ctxWorker.globalCompositeOperation = "difference";
                ctxWorker.fillStyle = "rgba(0, 255, 0, 0.9)";


                // let width = 4000;
                // let height = 4000;
                
                // define circle parameters
                const centerX = width / 2;
                const centerY = height / 2;
                // const radius = 1000;
                let radius = (randoms[7]*300) + 700
                radius = radius/2
                
                // set zigzag properties
                const zigzagWidth = 100; //changes the.... inner radius?
                const zigzagSpacing = 20; //line thickness all around
                const maxDisplacement = 100; //amplitude
                
                let outerAmpNumber = Math.ceil(randoms[12]*7)
                let innerAmpNumber = Math.ceil(randoms[13]*7)




                              //     // set canvas dimensions
                              // let width = 4000;
                              // let height = 4000;

                              // // define circle parameters
                              // const centerX = width / 2;
                              // const centerY = height / 2;
                              // const radius = 1000;

                              // // set zigzag properties
                              // const zigzagWidth = 10; //changes the.... inner radius?
                              // const zigzagSpacing = 20; //line thickness all around
                              // const maxDisplacement = 100; //amplitude

                              // let outerAmpNumber = 1
                              // let innerAmpNumber = 1

let increment = Math.PI / 512 //RESOLUTION

// start path
ctxWorker.beginPath();

// draw outer zigzag path
for (let angle = 0; angle <= Math.PI * 2; angle += increment) {
  let x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2);
  let y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2);
  if (angle === 0) {
    // angle =  0.01
    //  x = centerX + Math.cos(angle + 5) * (radius + zigzagWidth / 2);
    // x = 5
    //  y = 5
    // ctxWorker.moveTo(x, y);

    

  } else {


    
    ctxWorker.lineTo(x, y);
  }
  const displacement = Math.cos((angle+(m*2)) * outerAmpNumber) * maxDisplacement;
  const zigzagX = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  const zigzagY = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX, zigzagY);
  const zigzagX2 = centerX + Math.cos(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  const zigzagY2 = centerY + Math.sin(angle + increment) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX2, zigzagY2);
}

// draw inner zigzag path
for (let angle = Math.PI * 2; angle >= 0; angle -= increment) {

  
  const x = centerX + Math.cos(angle) * (radius - zigzagWidth / 2);
  const y = centerY + Math.sin(angle) * (radius - zigzagWidth / 2);
  // ctxWorker.lineTo(x, y);
  const displacement = Math.sin((angle-m) * innerAmpNumber) * maxDisplacement;
  const zigzagX = centerX + Math.cos(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  const zigzagY = centerY + Math.sin(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX, zigzagY);
  const zigzagX2 = centerX + Math.cos((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  const zigzagY2 = centerY + Math.sin((angle) - increment) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
  ctxWorker.lineTo(zigzagX2, zigzagY2);


}

// close path and fill
ctxWorker.closePath(); 
// ctxWorker.fillStyle = "black";
ctxWorker.filter = "blur(" +blur+ "px)";
ctxWorker.fill();

ctxWorker.fillStyle = "black";

            }


function redrawCanvasA(message) {
  ctxWorker.clearRect(0, 0, canvasB.width, canvasB.height);

  ctxWorker.fillStyle = bgColor;
  ctxWorker.fillRect(0, 0, width, height);

                  //DRAW PROGRESS BAR
                  // ctxWorker.fillStyle = "red";
                  // ctxWorker.fillRect(0, 0, width, height*(totalPercent/100));
                  drawProgress(totalPercent)



  ctxWorker.fillStyle = "black";

// degrees += 0.4; //uncomment for sporadic circle movement 
drawCircles()

ctxWorker.fillStyle = color == 0 ? "rgba(255, 0, 0, 0.9)": "hsl( "+(color)%360 +", 100%, 40%, 0.9)";
// m+=0.01; //uncomment for sporadic circle movement 
  

  ctxWorker.font = "24px Helvetica";
  ctxWorker.textAlign = "center";



  if(typeof message == "number"){
    ctxWorker.fillText(`${ message }`, canvasB.width / 2, canvasB.height / 2);
  } else {
    ctxWorker.fillText(`${ message }`, canvasB.width / 2, canvasB.height / 2);
  }
}








function drawProgress(progress) {

  const radius = 900;
  const lineWidth = 2;
  let context = ctxWorker
  let  centerX = 1000
  let centerY = 1000



        // context.lineWidth = lineWidth;

        // context.stroke();

        // const angle = (progress / 100) * Math.PI;
        // context.translate(1000, 1000);
        // context.rotate(-Math.PI / 2 + (((rotate%100) / 100) * Math.PI));
        // context.beginPath();
      
        // context.beginPath();
        
        // context.stroke();

       





  ctxWorker.lineWidth = lineWidth;


  const angle = (progress / 100) * Math.PI;
  ctxWorker.translate(1000, 1000);
  ctxWorker.rotate(-Math.PI / 2 + (((rotate) / 100) * Math.PI));
  ctxWorker.beginPath();
   ctxWorker.strokeStyle = color == 0 ? "rgba(255, 0, 0, 0.9)": "hsl( "+(color)%360 +", 100%, 40%, 0.9)";

  ctxWorker.arc(0, 0, radius, 0, angle*2);
// context.arc(1000, 1000, radius, -Math.PI / 2, angle);

  ctxWorker.stroke();

 ctxWorker.setTransform(1, 0, 0, 1, 0, 0);

}



// Redraw Canvas B text
function redrawCanvasB(message) {
  ctxWorker.clearRect(0, 0, canvasB.width, canvasB.height);

  ctxWorker.fillStyle = bgColor;
  ctxWorker.fillRect(0, 0, width, height);


                  //DRAW PROGRESS BAR
                  // ctxWorker.fillStyle = "red";
                  // ctxWorker.fillRect(0, 0, width, height*(totalPercent/100));
                  drawProgress(totalPercent)



  ctxWorker.fillStyle = "black";
// ctx.fillRect(0, 0, canvas.width, canvas.height);


  // tm = tm + 12*Math.sin(degrees)
  // asdf = asdf + 12*Math.cos(degrees)

  // var n = (asdf - tm) * 0.001;
  // n = Math.max(0, Math.min(1, n));
  
  // red = lerp(255, 36, n) | 0;
  // green = lerp(179, 182, n) | 0;
  // blue = lerp(0, 255, n) | 0;
  
  // // debug.innerText = `${red} ${green} ${blue}`;
  
  // ctxWorker.clearRect(0, 0, 4000, 4000);
  // ctxWorker.beginPath();
  // ctxWorker.rect(100, 100, 100, 100);
  // ctxWorker.fillStyle = `rgb(${255*Math.sin(degrees)}, ${255*Math.cos(degrees)}, ${blue})`;
  // ctxWorker.fill();    
  // ctxWorker.closePath();





  degrees += 0.04;
drawCircles()
  m+=0.001;
  // background(220);
  // noStroke()
  // translate(width/2,height/2)
  // for(a=0;a<(Math.PI*2)*10;a+=0.03){
   







  ctxWorker.font = "24px Helvetica";
  ctxWorker.textAlign = "center";



  if(typeof message == "number"){
    ctxWorker.fillText(`${ message }`, canvasB.width / 2, canvasB.height / 2);
  } else {
    ctxWorker.fillText(`${ message }`, canvasB.width / 2, canvasB.height / 2);
  }


  // requestAnimationFrame(redrawCanvasB(message));
  }

  


//   ctxWorker.fillText(`Building BVH: ${ message }%`, canvasB.width / 2, canvasB.height / 2);
// }



setInterval(()=>{
if(preRender){
  redrawCanvasB(message);
}

rotate+=0.6
}, preRenderDelay)










//CHATGPT MADE THIS ZIG ZAG CODE



      // <!DOCTYPE html>
      // <html>
      //   <head>
      //     <meta charset="utf-8">
      //     <title>Animated Sine Wave in Circle</title>
      //   </head>
      //   <body>
      //     <canvas id="canvas" width="500" height="500"></canvas>
      //     <script>
// set canvas dimensions
// canvas.width = 400;
// canvas.height = 400;

// // define circle parameters
// const centerX = canvas.width / 2;
// const centerY = canvas.height / 2;
// const radius = 100;

// // set zigzag properties
// const zigzagWidth = 10;
// const zigzagSpacing = 5;
// const maxDisplacement = 10;

// // start path
// ctx.beginPath();

// // draw outer zigzag path
// for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 16) {
//   const x = centerX + Math.cos(angle) * (radius + zigzagWidth / 2);
//   const y = centerY + Math.sin(angle) * (radius + zigzagWidth / 2);
//   if (angle === 0) {
//     ctx.moveTo(x, y);
//   } else {
//     ctx.lineTo(x, y);
//   }
//   const displacement = Math.cos(angle * 3) * maxDisplacement;
//   const zigzagX = centerX + Math.cos(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//   const zigzagY = centerY + Math.sin(angle) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//   ctx.lineTo(zigzagX, zigzagY);
//   const zigzagX2 = centerX + Math.cos(angle + Math.PI / 16) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//   const zigzagY2 = centerY + Math.sin(angle + Math.PI / 16) * (radius + zigzagWidth / 2 - zigzagSpacing / 2 + displacement);
//   ctx.lineTo(zigzagX2, zigzagY2);
// }

// // draw inner zigzag path
// for (let angle = Math.PI * 2; angle > 0; angle -= Math.PI / 16) {
//   const x = centerX + Math.cos(angle) * (radius - zigzagWidth / 2);
//   const y = centerY + Math.sin(angle) * (radius - zigzagWidth / 2);
//   ctx.lineTo(x, y);
//   const displacement = Math.sin(angle * 3) * maxDisplacement;
//   const zigzagX = centerX + Math.cos(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
//   const zigzagY = centerY + Math.sin(angle) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
//   ctx.lineTo(zigzagX, zigzagY);
//   const zigzagX2 = centerX + Math.cos(angle - Math.PI / 16) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
//   const zigzagY2 = centerY + Math.sin(angle - Math.PI / 16) * (radius - zigzagWidth / 2 + zigzagSpacing / 2 + displacement);
//   ctx.lineTo(zigzagX2, zigzagY2);
// }

// // close path and fill
// ctx.closePath();
// ctx.fillStyle = "blue";
// ctx.fill();