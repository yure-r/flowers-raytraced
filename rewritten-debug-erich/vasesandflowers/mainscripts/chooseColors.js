


if(StartColorNumber == "random"){
    console.log("INCCHOICE", "random")
    StartColorNumber =  fxrand()*360
    // StartColorNumber = 142


function avoidGreen(color, increment){

let index = 0
//   if(){

// }


// let result = '';
// let i = 0;
if(increment !== 180 && increment !== 120 && increment !== 90){
console.log("INCCHOICE", "not canonical")



do {
// i = i + 1;
// result = result + i;

let escape = false
let colorRange = []



console.log(index)

canvasworker1.postMessage({ update: "update", message: "Choosing colors: "+index + ""})

index++
color = fxrand()*360

for (var i=0; i<totalUniqueFlowers; i++){
  colorRange.push(color+(increment*(i+1))%360)
}


// var sal=[30,150,42,81,20,21,35,23]

let tc = x => (x > 70 && x < 190)

console.log("INCCHOICE", colorRange)

console.log("INCCHOICE", "CONTAINS", colorRange.every(tc))

// if(colorRange.every(tc) == true){
//   escape = true
// }



// var array = [-10, -0.20, 0.30, -40, -50];

// Method (return element > 0).
var found = colorRange.find(function (element) {
    return (element%306) > 70 && (element%360) < 190;
});

// Printing desired values.
console.log("INCCHOICE", found);



} while ( found // ||
// ((color+(increment*2))%360 > 80 && (color+(increment*2))%360<190) ||
// ((color+(increment*3))%360 > 80 && (color+(increment*3))%360<190) ||
// ((color+(increment*4))%360 > 80 && (color+(increment*4))%360<190) 

);

} else {
console.log("INCCHOICE", "yes canonical")

do {


// i = i + 1;
// result = result + i;
console.log(index)
canvasworker1.postMessage({ update: "update", message: "Choosing colors: "+index + ""})
index++
color = fxrand()*360



} while ( (color > 64 && color < 180) || 
(((color+increment))%360 > 64 && ((color+increment))%360<180)  ||
((color+(increment*2))%360 > 64 && (color+(increment*2))%360<180) //||
// ((color+(increment*3))%360 > 80 && (color+(increment*3))%360<190) ||
// ((color+(increment*4))%360 > 80 && (color+(increment*4))%360<190) 

);



// totalUniqueFlowers
}

// console.log(result);

return color

}




    if(excludeGreen){



      switch (colorIncrementChoice){
case "compliment":
colorIncrement = 180

StartColorNumber = avoidGreen(StartColorNumber, 180)
console.log("INCCHOICE", "COMPLIMENT", (StartColorNumber+180)%360)

break;
case "triadic":
colorIncrement = 120

StartColorNumber = avoidGreen(StartColorNumber, 120)
console.log("INCCHOICE", "TRIAD", (StartColorNumber+120)%360,  (StartColorNumber+240)%360)

break;
case "quadratic":
colorIncrement = 90

StartColorNumber = avoidGreen(StartColorNumber, 90)
console.log("INCCHOICE", "QUAD", (StartColorNumber+90)%360,  (StartColorNumber+180)%360, (StartColorNumber+270)%360, (StartColorNumber+360)%360)


break;
case "4":
colorIncrement = 4

StartColorNumber = avoidGreen(StartColorNumber, 4)

break;

case "-4":
colorIncrement = -4

StartColorNumber = avoidGreen(StartColorNumber, -4)

break;

case "2":
colorIncrement = 2

StartColorNumber = avoidGreen(StartColorNumber, 2)

break;

case "10":
colorIncrement = 10

StartColorNumber = avoidGreen(StartColorNumber, 10)

break;
case "20":
colorIncrement = 20

StartColorNumber = avoidGreen(StartColorNumber, 20)

break;

}







    }

console.log("COLORS CHOSEN", StartColorNumber)
canvasworker1.postMessage({ update: "updateColors", message: [StartColorNumber, colorIncrement]})
document.querySelector(':root').style.setProperty('--color-a', "hsl("+(StartColorNumber)%360+",80%,50%,.9)");
document.querySelector(':root').style.setProperty('--color-b', "hsl("+(StartColorNumber)%360+",80%,30%,.9)");


  } else {
    console.log("INCCHOICE", "ELSE")
      StartColorNumber = StartColorNumber
  }

  console.log("INCCHOICE", "lowhight", 70, 190)
  console.log("INCCHOICE", StartColorNumber)
  
  let loading = document.getElementById("loading")
  
  // console.log(fxhash)
  
  
  

  
  window.flowersArray = []
  window.collidable = []
  
  
  
  
  
  let GENERATORSTALK 
  
  if(flowerGrid || PACK2D){
  GENERATORSTALK = false
  } else {
  GENERATORSTALK = true
  }
  
  
  