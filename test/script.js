let ballH={
  posX : 30,
  posY : 30,
  speedX : 5,
  width : 50,
  height: 50,

  update : function() {
      const ballElem=
          document.getElementById('IBall');
      ballElem.style.left=this.posX+"px";
      ballElem.style.top=this.posY+"px";
  }
}

let areaH={
  width : 400,
  height : 300
}

function start() {
  // плавное движение - от 25 кадр/сек,
  // 1000мс/25к=40мс
  setInterval(tick,40);
}

function tick() {
  ballH.posX+=ballH.speedX;
  // вылетел ли мяч правее стены?
  if ( ballH.posX+ballH.width>areaH.width ) {
      ballH.speedX=-ballH.speedX;
      ballH.posX=areaH.width-ballH.width;
  }
  // вылетел ли мяч левее стены?
  if ( ballH.posX<0 ) {
      ballH.speedX=-ballH.speedX;
      ballH.posX=0;
  }

  ballH.update();
}

ballH.update();








