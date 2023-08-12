import * as Fit from './binPacking/src/index.js'

// (function () { "use strict";

// to suit your point format, run search/replace for '.x' and '.y';
// for 3D version, see 3d branch (configurability would draw significant performance overhead)

// square distance between 2 points




// function cleanUp(){
//     points = undefined
//     width  = undefined
//     height = undefined
//     threeJSShapes  = undefined
//     // flowerPlacementIndex  = undefined
//     spacing = undefined
//     randoms = undefined
//     packer = undefined
//     bin = undefined
//     bins = undefined
//     parts  = undefined
//     last = undefined
//     newBin = undefined
// }

function getSqDist(p1, p2) {

    var dx = p1.x - p2.x,
        dy = p1.y - p2.y;

    return dx * dx + dy * dy;
}

// square distance from a point to a segment
function getSqSegDist(p, p1, p2) {

    var x = p1.x,
        y = p1.y,
        dx = p2.x - x,
        dy = p2.y - y;

    if (dx !== 0 || dy !== 0) {

        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

        if (t > 1) {
            x = p2.x;
            y = p2.y;

        } else if (t > 0) {
            x += dx * t;
            y += dy * t;
        }
    }

    dx = p.x - x;
    dy = p.y - y;

    return dx * dx + dy * dy;
}
// rest of the code doesn't care about point format

// basic distance-based simplification
function simplifyRadialDist(points, sqTolerance) {

    var prevPoint = points[0],
        newPoints = [prevPoint],
        point;

    for (var i = 1, len = points.length; i < len; i++) {
        point = points[i];

        if (getSqDist(point, prevPoint) > sqTolerance) {
            newPoints.push(point);
            prevPoint = point;
        }
    }

    if (prevPoint !== point) {
        newPoints.push(point);
    }

    return newPoints;
}

// simplification using optimized Douglas-Peucker algorithm with recursion elimination
function simplifyDouglasPeucker(points, sqTolerance) {

    var len = points.length,
        MarkerArray = typeof Uint8Array !== 'undefined' ? Uint8Array : Array,
        markers = new MarkerArray(len),
        first = 0,
        last = len - 1,
        stack = [],
        newPoints = [],
        i, maxSqDist, sqDist, index;

    markers[first] = markers[last] = 1;

    while (last) {

        maxSqDist = 0;

        for (i = first + 1; i < last; i++) {
            sqDist = getSqSegDist(points[i], points[first], points[last]);

            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }

        if (maxSqDist > sqTolerance) {
            markers[index] = 1;
            stack.push(first, index, index, last);
        }

        last = stack.pop();
        first = stack.pop();
    }

    for (i = 0; i < len; i++) {
        if (markers[i]) {
            newPoints.push(points[i]);
        }
    }

    return newPoints;
}

// both algorithms combined for awesome performance
function simplify(points, tolerance, highestQuality) {

    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
    points = simplifyDouglasPeucker(points, sqTolerance);

    return points;
}

// export as AMD module / Node module / browser variable
// if (typeof define === 'function' && define.amd) {
//     define(function() {
//         return simplify;
//     });
// } else if (typeof module !== 'undefined') {
//     // module.exports = simplify;
// } else {
//     // window.simplify = simplify;
// }

// })();


function createTHREEJSShapePart(id, vertices, options = {}, flowerPlacementIndex, reductionNumber) {
        
    // console.log("PUSH SHAPES")
    flowerPlacementIndex[id].id = id
let points = []
let verticesSimplified 

                                //the higher the number, the more simplification
                                //default 0.1
verticesSimplified = simplify(vertices, reductionNumber, true) //SIMPLIFY COVEX HULL //REDUCE POINTS


    for (let i = 0; i < verticesSimplified.length; i++) {
    //   let r = (i / vertices) * Math.PI * 2
      let x = verticesSimplified[i].x*100
      let y = verticesSimplified[i].y*100
      points.push(new Fit.Vector(x, y))
    }

    return new Fit.Part(id, points, options)
  }


addEventListener('message', onMessage);


function onMessage(e) { 

    if(e.data[0]=="closeWorker"){

        console.log("DELETED packingworker, CLOSED")

        postMessage(["closed",
        ]
        )
        close()
    }

    if(e.data[0]=="makePack"){


//         let points = []
// let width 
// let height
// let threeJSShapes 
// let flowerPlacementIndex 
// let spacing
// let randoms
// let packer
// let bin
// let bins = []
// let parts = []
// let last
// let newBin
let reductionNumber = e.data[1].reductionNumber
let width = e.data[1].width
let height = e.data[1].height
let threeJSShapes = e.data[1].threeJSShapes
let flowerPlacementIndex = e.data[1].flowerPlacementIndex
let spacing = e.data[1].spacing
let randoms = e.data[1].randoms
let packer = new Fit.Packer(randoms)


let bin = new Fit.Bin(0, width, height, { strokeColor: '#aaa', strokeWidth: 2 })
let bins = [ bin ]

let parts = []

for (var i=0; i<threeJSShapes.length;i++){

// console.log("PUSH SHAPES", parts.length)

//returns simplified 2D shape! 
parts.push(createTHREEJSShapePart(parts.length, threeJSShapes[i].shape, { strokeColor: '#ff0000', fill: '#ff88aa', strokeWidth: 2 }, flowerPlacementIndex, reductionNumber))

}

// for (let i = 0; i < 5; i++) {
//   parts.push(createDebugPart(parts.length, Math.floor(fxrand() * 5 + 3), 30, 120, 100, 100, { strokeColor: '#ff0000', fill: '#ff88aa', strokeWidth: 2 }))
// }
// for (let i = 0; i < 40; i++) {
//   parts.push(createDebugPart(parts.length, Math.floor(fxrand() * 4 + 3), 10, 40, 100, 100, { strokeColor: '#0000ff', fill: '#bbccff', strokeWidth: 2 }))
// }
/*
for (let i = 0; i < 3; i++) {
  parts.push(createDebugRect(parts.length, 100, { strokeColor: '#ff0000', fill: '#ff88aa', strokeWidth: 2 }))
}
*/

let config = { 
  spacing: spacing || 0,  // space between parts
  rotationSteps: 10,       // # of angles for available rotation (ex. 4 means [0, 90, 180, 270] angles from 360 / 4 )
  population: 10,         // # of population in GA
  generations: 0,        // # of generations in GA
  mutationRate: 0.15      // mutation rate in GA
}



packer.start(bins, parts, config, {
  onStart: (e) => {

  },
  onEvaluation: (e) => {
    // console.log("evaluation" + fxrand())
    if(config.generations > 0){

    //   canvasworker1.postMessage({ update: "update", message: "Packing "+(e.generation+1)+ "/" + (config.generations+1)+": " + Math.round(Math.floor(e.progress*1000))/10 + "%"})
    
      postMessage([
        "progress",
        "Packing "+(e.generation+1)+ "/" + (config.generations+1)+": " + Math.round(Math.floor(e.progress*1000))/10 + "%",
        Math.round(Math.floor(e.progress*1000))/10
      ])
    
    } else {

        postMessage([
            "progress",
            "Packing: " + Math.round(Math.floor(e.progress*1000))/10 + "%",
            Math.round(Math.floor(e.progress*1000))/10
          ])

    //   canvasworker1.postMessage({ update: "update", message: "Packing: " + Math.round(Math.floor(e.progress*1000))/10 + "%"})
    }

    // indicator(e)

    e = undefined
  },
  onPacking: (e) => {

    if (e.unplaced.length > 0) {
      let last = e.bins[e.bins.length - 1]
      let newBin = new Fit.Bin(last.id + 1, last.width, last.height, { strokeColor: '#aaa', strokeWidth: 2 })
      packer.addBin(newBin)
    }

    e = undefined
  },
  onPackingCompleted: (e) => {


// cleanUp()


//REMOVE OTHER WORKERS HERE?



    packer = undefined



     width = undefined 
 height = undefined 
 threeJSShapes = undefined 
//  flowerPlacementIndex = undefined 
 spacing = undefined 
 randoms = undefined 
 packer = undefined 


 bin = undefined 
 bins = undefined 

 parts = undefined 


 postMessage(["completed",
 e,
 flowerPlacementIndex
     
 ]
 )
 flowerPlacementIndex  = undefined
//postMessage for packing completed!
e = undefined

// close()
  }
})




    }
}


