document.addEventListener('DOMContentLoaded',function(){
var path = 1;
var grass = 0;

var plant = 2;
// var stone = 2;

//obiekty do mapy
var heart = 3; // on take ----> 1 and +1 to life counter

var snake = 5; // on kill ----> 1 and -1 from life
var evil = 6; // on kill ----> 1 and die

var apple = 4; // on take ----> 0 and +1 to item counter
var fish = 8; // on take ----> 0 and +1 to item counter
var book = 9; // on take ----> 0 and +1 to item counter

//avatar gracza
var panda = 7; //moze byc hv, wv

// //stworzenie mapy
// var canvas = null;
// var context = null;
//
// setup function(){
//   canvas = document.getElementById("my_canvas");
//   context = canvas.getContext(2d);
//   canvas.width = 1400px; //window.innerWidth;
//   canvas.height = 800px; //window.innerHeight;
// };
// setup();

var mapArray = [
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0, 0, 1, 1, 2, 2, 0, 0, 4, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0],
    [2, 2, 2, 2, 2, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 2, 2, 2, 2, 1, 1, 1, 2, 0, 0, 0, 1, 2, 2, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 2, 2, 2, 1, 2, 2, 0],
    [2, 2, 2, 2, 1, 1, 2, 2, 2, 0, 0, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 2, 2, 0, 0, 8, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 1, 9, 2, 0],
    [2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 5, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 1, 1, 2, 2, 0, 0, 2, 2, 2, 1, 1, 0, 0],
    [2, 2, 2, 9, 1, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 0, 0, 0, 1, 2, 2, 2, 0, 1, 1, 1, 2, 0, 1, 1, 0],
    [2, 2, 2, 2, 2, 4, 1, 1, 2, 1, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 1, 2, 0, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 2, 2, 1, 2],
    [0, 0, 0, 0, 2, 2, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 4, 1, 0, 2, 1, 5, 1, 1, 1, 2, 2, 1, 2, 1, 1, 2],
    [2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 2, 2, 0, 0, 2, 1, 1, 1, 1, 2, 2, 0, 2, 2, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 1, 1, 2, 2, 2, 1, 2, 1, 0, 2, 8, 1, 2, 1, 2, 2],
    [2, 0, 0, 2, 2, 2, 2, 2, 0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 8, 1, 1, 1, 1, 1, 1, 1, 9, 2, 2, 2, 2, 1, 1, 2, 2, 2, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 2, 2],
    [2, 2, 0, 0, 2, 1, 1, 1, 8, 1, 1, 1, 1, 1, 0, 0, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 1, 1, 1, 0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 1, 0, 0, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 1, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 0, 0, 0, 2, 2, 1, 1, 1, 1, 2, 0, 2, 2, 2],
    [2, 2, 2, 1, 0, 2, 2, 0, 1, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 0, 2, 2, 2],
    [2, 1, 1, 1, 0, 2, 2, 1, 1, 0, 0, 0, 0, 1, 1, 1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0, 2, 2],
    [2, 1, 2, 1, 0, 2, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 1, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 2],
    [2, 2, 2, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [2, 2, 2, 1, 1, 1, 2, 0, 0, 1, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 1, 1, 1, 4, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 0],
    [2, 2, 2, 9, 1, 2, 2, 1, 1, 1, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 4, 1, 1, 1, 2, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 2, 0, 1, 2, 2, 2, 0, 0, 1, 1, 1, 1, 8, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 2, 0],
    [0, 0, 0, 2, 2, 0, 0, 1, 2, 2, 0, 0, 1, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 9, 2, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 2, 2, 2, 0, 2, 2, 1, 1, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 0, 1, 1, 2, 2, 2, 4, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 0, 1, 2, 2, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 1, 2, 0],
    [0, 0, 2, 2, 1, 2, 2, 2, 2, 0, 0, 1, 1, 1, 1, 2, 0, 0, 0, 2, 1, 0, 0, 2, 1, 1, 0, 0, 2, 2, 1, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 1, 1, 2, 0],
    [0, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2, 1, 1, 2, 0, 2, 2, 1, 2, 0, 0, 0, 1, 2, 2, 2, 2, 0, 2, 2, 1, 1, 1, 1, 1, 9, 1, 1, 1, 2, 2, 0],
    [2, 2, 4, 1, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 1, 2, 0, 2, 2, 1, 6, 1, 1, 2, 0, 2, 1, 1, 2, 2, 0, 1, 1, 1, 2, 2, 2, 2, 0],
    [0, 2, 1, 1, 2, 2, 2, 2, 2, 0, 5, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 0, 2, 1, 1, 2, 2, 1, 2, 0, 1, 1, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0],
    [0, 0, 2, 1, 1, 1, 1, 1, 0, 0, 1, 0, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 2, 1, 2, 2, 1, 1, 2, 0, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0],
    [0, 0, 2, 2, 2, 2, 2, 1, 0, 1, 1, 0, 0, 2, 2, 2, 8, 1, 2, 2, 1, 0, 2, 2, 2, 0, 0, 0, 1, 1, 2, 2, 1, 2, 2, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0],
    [0, 0, 0, 2, 2, 2, 2, 1, 1, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 1, 0, 2, 2, 0, 0, 0, 1, 1, 2, 2, 1, 1, 0, 0, 1, 0, 0, 2, 2, 1, 1, 1, 2, 2, 1, 1, 1, 2, 2],
    [2, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 9, 2, 1, 1, 0, 0, 0, 1, 0, 0, 2, 2, 1, 4, 1, 1, 1, 1, 9, 1, 1, 2],
    [2, 2, 0, 2, 2, 2, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 2, 2, 2, 0, 0, 2, 2, 0, 1, 2, 2, 2, 2, 0, 0, 1, 1, 0, 0, 2, 1, 1, 2, 2, 2, 1, 2, 2, 0, 1, 2],
    [0, 1, 1, 2, 2, 0, 0, 1, 1, 0, 2, 1, 0, 0, 1, 9, 1, 1, 1, 2, 0, 0, 0, 0, 2, 1, 1, 1, 2, 2, 0, 0, 0, 1, 1, 0, 2, 2, 1, 1, 2, 2, 2, 2, 1, 2, 2, 0, 1, 2],
    [0, 0, 1, 2, 2, 0, 1, 1, 2, 0, 2, 1, 0, 2, 1, 1, 1, 0, 3, 1, 0, 0, 1, 1, 1, 1, 0, 1, 2, 2, 2, 0, 0, 1, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 0, 1, 0],
    [0, 0, 1, 1, 2, 2, 1, 2, 2, 2, 1, 1, 0, 2, 2, 2, 0, 0, 2, 1, 1, 1, 1, 4, 0, 0, 0, 1, 1, 2, 2, 2, 0, 1, 2, 1, 6, 1, 2, 2, 2, 2, 0, 2, 1, 2, 2, 0, 1, 0],
    [0, 2, 9, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 2, 0, 0, 0, 2, 0, 0, 1, 2, 2, 2, 0, 1, 1, 1, 2, 1, 1, 2, 0, 0, 0, 2, 1, 2, 1, 1, 1, 0],
    [2, 2, 2, 2, 2, 2, 2, 2, 0, 4, 1, 1, 0, 1, 2, 2, 2, 0, 0, 2, 2, 1, 1, 0, 2, 2, 0, 0, 1, 2, 2, 2, 0, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 0, 0],
    [0, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 8, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 1, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2],
 ];

 function drawMap() {
for(var i=0; i<mapArray.length; i++){
  for(var j=0; j<mapArray[i].length; j++){
    if(mapArray[i][j]==0){
      $('#container').append('<div class="grass"></div>');
    }

    if(mapArray[i][j]==1){
      $('#container').append('<div class="path"></div>');
    }

    if(mapArray[i][j]==2){
      $('#container').append('<div class="plants"></div>');
    }

    if(mapArray[i][j]==3){
      $('#container').append('<div class="hearts"></div>');
    }

    if(mapArray[i][j]==4){
      $('#container').append('<div class="apples"></div>');
    }

    if(mapArray[i][j]==5){
      $('#container').append('<div class="snakes"></div>');
    }

    if(mapArray[i][j]==6){
      $('#container').append('<div class="evil"></div>');
    }

    if(mapArray[i][j]==8){
      $('#container').append('<div class="fish"></div>');
    }

    if(mapArray[i][j]==9){
      $('#container').append('<div class="books"></div>');
    }
  }
}
 }

window.onload=function(){
  drawMap();
}
});

//----------------- show hide the clouds code ----------------------
function toggle(element , direction) {

    if (direction == true) {
        element.style.display = "none";
    }
    else {
        element.style.display = "block";
    }
 }

 var cont_1 = document.getElementById("slides_container1");
 var cont_2 = document.getElementById("slides_container2");
 var next_btn = document.getElementById("futher_btn");
 var game_map = document.getElementById("container");


 window.setTimeout( function(){
   toggle(cont_1 , false);
},
    2000);


 next_btn.addEventListener('click',function(){

   toggle(cont_1 , true);
   toggle(cont_2 , false);
  //  window.setTimeout(toggle(cont_2 , true), 3000);
window.setTimeout( function(){
  toggle(cont_2 , true);
  toggle(game_map,false)},
   2000);
 });






//randomized licznik dla wyswietlenia ilosci przedmiotow dla zapamietania
 var it_counter1 = document.getElementById('it_count1');
 var help1 = Math.floor((Math.random() * 10) + 1)
 it_counter1.innerText = help1;

 var it_counter2 = document.getElementById('it_count2');
 var help2 = Math.floor((Math.random() * 10) + 1)
 it_counter2.innerText = help2;

 var it_counter3 = document.getElementById('it_count3');
 var help3 = Math.floor((Math.random() * 10) + 1)
 it_counter3.innerText = help3;


//pojawienie sie pandy
var pandaAv = document.getElementById("panda");
var avatarContainer = document.getElementById("container");

var pandaLeft = 0;
var pandaUp = 0;


function animPnd(e){
  if(e.keyCode == "37"){ //left arrow
     pandaLeft -= 20;
     pandaAv.style.left = pandaLeft + "px";
     if(pandaLeft <= 0){
       pandaLeft += 20;
     }
  }
  if(e.keyCode == "38"){ //up arrow
    pandaUp -= 20;
    pandaAv.style.left = pandaUp + "px";
    if(pandaUp <= 0){
      pandaUp += 20;
    }
  }
  if(e.keyCode == "39"){ //right arrow
    pandaLeft += 20;
    pandaAv.style.left = pandaLeft + "px";
    if(pandaLeft >= 1000){
      pandaLeft -= 20;
    }
  }
  if(e.keyCode == "40"){ //down arrow
    pandaUp += 20;
    pandaAv.style.left = pandaUp + "px";
    if(pandaUp >= 800){
      pandaUp -= 20;
    }
  }
}
document.onkeydown = animPnd();
