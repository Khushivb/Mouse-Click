var emitter = document.getElementById("emitter"),
    container = document.createElement("div"), 
    emitterSize = 100,
    dotQuantity = 40,
    dotSizeMax = 40,
    dotSizeMin = 20,
    speed = 1,
    gravity = 1;

container.style.cssText = "position:absolute; left:0; top:0; overflow:visible; z-index:5000; pointer-events:none;";
document.body.appendChild(container);

TweenLite.set(emitter, {width:emitterSize, height:emitterSize, xPercent:-50, yPercent:-50});

var explosion = createExplosion(container);

function createExplosion(container) {
  var tl = new TimelineLite(),
      angle, length, dot, i, size;
  //create all the dots
  for (i = 0; i < dotQuantity; i++) {
    dot = document.createElement("div");
    dot.className = "dot";
    size = getRandom(dotSizeMin, dotSizeMax);
    container.appendChild(dot);
    angle = Math.random() * Math.PI * 2; 
    
    length = Math.random() * (emitterSize / 2 - size / 2); 
 
    TweenLite.set(dot, {
      x:Math.cos(angle) * length, 
      y:Math.sin(angle) * length, 
      width:size, 
      height:size, 
      xPercent:-50, 
      yPercent:-50,
      force3D:true
    });

//Animation starts from here
    tl.to(dot, 1 + Math.random(), {
      opacity:0,
      
    //   physics2D:{
    //     angle:angle * 180 / Math.PI, 
    //     velocity:(100 + Math.random() * 250) * speed, 
    //     gravity:500 * gravity 
    //   }
      
      //if you'd rather not do physics, you could just animate out directly by using the following 2 lines instead of the physics2D:
      x:Math.cos(angle) * length * 6, 
      y:Math.sin(angle) * length * 6
    }, 0);
  }
  return tl;
}

 
function explode(element) {
  var bounds = element.getBoundingClientRect();
  TweenLite.set(container, {x:bounds.left + bounds.width / 2, y:bounds.top + bounds.height / 2});
  explosion.restart();
}

function getRandom(min, max) {
  return min + Math.random() * (max - min);
}
 
explode(emitter);
emitter.onmousedown = emitter.ontouchstart = function() {
  explode(emitter);
}

Draggable.create("#emitter", {throwProps:true, bounds:window, edgeResistance:0.7});