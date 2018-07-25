$(document).ready(function() {
  
  
                      /*  Variables  */
  var top;
  var ox;
  var oy;
  var r0;
  var borderWidth;
  var x3;
  var x4;
  var y3;
  var r3;
  var arrShapes=[];
  var arrShades=[];
  var arrShadesPressed=[];
  var arrBorders=[];
  var arrColors=['red', 'blue', 'rgb(250, 224, 60)', 'green', 'indigo', 'orange', 'purple'];
  var arrShadeColors=['rgb(128, 0 , 0)', 'rgb(0, 0, 128)', 'rgb(128, 128, 0)', 'rgb(0, 64, 0)', 'rgb(35, 0, 65)', 'rgb(128, 83, 0)', 'rgb(51, 0, 51)'];
  var arrColorsLight=['rgb(255, 128, 128)', 'rgb(128, 128, 255)', 'rgb(255, 255, 179)', 'rgb(128, 255, 128)', 'rgb(149, 0, 255)', 'rgb(255, 210, 128)', 'rgb(255, 0, 255)'];
  var arrPianoNotes=['pianoA.wav', 'pianoB.wav', 'pianoC.wav', 'pianoD.wav', 'pianoE.wav', 'pianoF.wav', 'pianoG.wav'];
  var mode='normal';
  var switchMode='inactive';
  var arrRandom=[];
  var arrRandomCopy=[];
  var arrPlayer=[];
  var arrCountdown=['ready', 'steady', 'go'];
  var level=4;
  var colorClicked=0;
  var repeatRandom;
  var randomRecursion;
  var randomBtnColors;
  var randomBtnColors;
  var power='off';
  var flashingDisplayInterval;
  var flashingDisplayTimeout;
  var music=new Audio();
  var wrongMoveSound=new Audio(); 
  var countdownSound=new Audio();


                      /*  Functions Declaration  */
  function rulesAnimation() {
    top=$('header').height();
    if (window.innerWidth<768) {
      top=$('header').height()+$('.menu ul li').height();
    }
    var rulesHeight=$('.rules').height();
    if ($('.rules').is(':hidden')) {
      $('.rules').css('top', top-rulesHeight);
      $('.rules').show();
      $('.rules').animate({
        top: top
      }, 300);
    } else if ($('.rules').is(':visible')) {
      $('.rules').animate({
        top: top-rulesHeight
      }, 300);
      setTimeout(function() {
        $('.rules').hide();
        $('#btnRules').css({
          'background-color': 'rgb(0, 204, 255)',
          'color': 'white'
        });
      }, 300);
    }
  }
  
  
  function pressedOrNotSettings() {
    if ($('.menu ul li ul').is(':visible')) {
      $('#btnSettings').css({
        'background-color': 'white',
        'color': 'rgb(0, 204, 255)'
      });
    } else if ($('.menu ul li ul').is(':hidden')) {
      $('#btnSettings').css({
        'background-color': 'rgb(0, 204, 255)',
        'color': 'white'
      });
    }
  }
  
  
  function pressedOrNotRules() {
    if ($('.rules').is(':visible')) {
      $('#btnRules').css({
        'background-color': 'white',
        'color': 'rgb(0, 204, 255)'
      });
    } else if ($('.rules').is(':hidden')) {
      $('#btnRules').css({
        'background-color': 'rgb(0, 204, 255)',
        'color': 'white'
      });
    }
  }
  
  
  function createSVG(level) {
    var side = Math.min($('.game').width(), $('.game').height())-5;
    console.log('text', side);
    var bigCircleSVG = $('#bigCircleSVG');
    bigCircleSVG.attr('width', side).attr('height', side);
    ox=bigCircleSVG.width()/2;
    oy=bigCircleSVG.height()/2;
    var r;
    if (window.innerWidth<768) {
      borderWidth=1.5*10;
      r = Math.min(ox, oy) * 0.9;
      r0=r*0.65;
    } else if (window.innerWidth<1025) {
      borderWidth=1.5*12;
      r = Math.min(ox, oy) * 0.8;
      r0=r*0.5;
    } else if (window.innerWidth>=1025) {
      borderWidth=1.5*16;
      r = Math.min(ox, oy) * 0.8;
      r0=r*0.5;
    }
    var rSmall=r0-borderWidth/2;
    var angle=Math.PI/180*360/level;
    var arrAngles=[];
    for (var i=1; i<=level; i++) {
      arrAngles.push(angle*i);
    }
    var arrX=[];
    var arrY=[];
    var arrX0=[];
    var arrY0=[];
    var angleDeltaSmall=Math.atan(borderWidth/2/(r0+borderWidth/2));
    var angleDeltaBig=Math.atan(borderWidth/2/(r-borderWidth/2));
    var arrXS0=[];
    var arrYS0=[];
    var arrXS1=[];
    var arrYS1=[];
    var arrXS2=[];
    var arrYS2=[];
    var arrXS3=[];
    var arrYS3=[];
    arrShapes=[];
    arrShades=[];
    arrShadesPressed=[];
    arrBorders=[];
    arrX0[0]=ox;
    arrY0[0]=oy-r0;
    arrX[0]=ox;
    arrY[0]=oy-r;
    for (var j=0; j<arrAngles.length; j++) {
      if (arrAngles[j]>0 && arrAngles[j]<=Math.PI/2) {
        arrX0[j+1]=ox+r0*Math.sin(arrAngles[j]);
        arrY0[j+1]=oy-r0*Math.cos(arrAngles[j]);
        arrX[j+1]=ox+r*Math.sin(arrAngles[j]);
        arrY[j+1]=oy-r*Math.cos(arrAngles[j]);
      } else if (arrAngles[j]>Math.PI/2 && arrAngles[j]<=Math.PI) {
        arrX0[j+1]=ox+r0*Math.cos(arrAngles[j]-Math.PI/2);
        arrY0[j+1]=oy+r0*Math.sin(arrAngles[j]-Math.PI/2);
        arrX[j+1]=ox+r*Math.cos(arrAngles[j]-Math.PI/2);
        arrY[j+1]=oy+r*Math.sin(arrAngles[j]-Math.PI/2);
      } else if (arrAngles[j]>Math.PI && arrAngles[j]<=3*Math.PI/2) {
        arrX0[j+1]=ox-r0*Math.sin(arrAngles[j]-Math.PI);
        arrY0[j+1]=oy+r0*Math.cos(arrAngles[j]-Math.PI);
        arrX[j+1]=ox-r*Math.sin(arrAngles[j]-Math.PI);
        arrY[j+1]=oy+r*Math.cos(arrAngles[j]-Math.PI);
      } else if (arrAngles[j]>3*Math.PI/2 && arrAngles[j]<=2*Math.PI) {
        arrX0[j+1]=ox-r0*Math.cos(arrAngles[j]-3*Math.PI/2);
        arrY0[j+1]=oy-r0*Math.sin(arrAngles[j]-3*Math.PI/2);
        arrX[j+1]=ox-r*Math.cos(arrAngles[j]-3*Math.PI/2);
        arrY[j+1]=oy-r*Math.sin(arrAngles[j]-3*Math.PI/2);
      }
      arrXS0[j]=ox+(r0+borderWidth/2)*Math.sin(angle*j+angleDeltaSmall);
      arrYS0[j]=oy-(r0+borderWidth/2)*Math.cos(angle*j+angleDeltaSmall);
      arrXS1[j]=ox+(r0+borderWidth/2)*Math.sin(angle*(j+1)-angleDeltaSmall);
      arrYS1[j]=oy-(r0+borderWidth/2)*Math.cos(angle*(j+1)-angleDeltaSmall);
      arrXS2[j]=ox+(r-borderWidth/2)*Math.sin(angle*(j+1)-angleDeltaBig);
      arrYS2[j]=oy-(r-borderWidth/2)*Math.cos(angle*(j+1)-angleDeltaBig);
      arrXS3[j]=ox+(r-borderWidth/2)*Math.sin(angle*j+angleDeltaBig);
      arrYS3[j]=oy-(r-borderWidth/2)*Math.cos(angle*j+angleDeltaBig);
    }
    for (var k=1; k<arrX.length; k++) {
      arrShapes.push(' M '+arrX0[k-1]+' '+arrY0[k-1]+' A '+r0+' '+r0+' 0 0 1 '+arrX0[k]+' '+arrY0[k]+' L '+arrX[k]+' '+arrY[k]+' A '+r+' '+r+' 0 0 0 '+arrX[k-1]+' '+arrY[k-1]+' Z');
      $('#bigCircleSVG').append('<svg><a href="#" class="colors" id="color'+k+'"><path id="bigCircleShape'+k+'"/></a></svg>');
      $('#bigCircleShape'+k+'').attr({
        d: arrShapes[arrShapes.length-1]
      });
      $('#bigCircleShape'+k+'').css({
        'position': 'relative',
        'z-index': '1',
        'fill': arrColors[k-1]
      });
      $('.colors').css('cursor', 'pointer');
      arrShades.push(' M '+arrXS0[k-1]+' '+arrYS0[k-1]+' A '+(r0+borderWidth/2)+' '+(r0+borderWidth/2)+' 0 0 1 '+arrXS1[k-1]+' '+arrYS1[k-1]+' L '+arrXS2[k-1]+' '+arrYS2[k-1]+' M '+arrXS3[k-1]+' '+arrYS3[k-1]+' L '+arrXS0[k-1]+' '+arrYS0[k-1]);
      arrShadesPressed.push(' M '+arrXS3[k-1]+' '+arrYS3[k-1]+' A '+(r-borderWidth/2)+' '+(r-borderWidth/2)+' 0 0 1 '+arrXS2[k-1]+' '+arrYS2[k-1]);
      $('#bigCircleSVG').append('<svg><a href="#" class="shades" id="shade'+k+'"><path id="bigCircleShade'+k+'"/><path id="bigCircleShadePressed'+k+'" /></a></svg>');
      $('#bigCircleShade'+k+'').attr({
        d: arrShades[arrShades.length-1]
      });
      $('#bigCircleShadePressed'+k+'').attr({
        d: arrShadesPressed[arrShadesPressed.length-1]
      });
      $('#bigCircleShade'+k+'').css({
        'position': 'relative',
        'z-index': '1',
        'fill': 'none',
        'stroke': arrShadeColors[k-1],
        'stroke-width': '0.9rem',
        'stroke-linecap': 'square',
        'cursor': 'pointer'
      });
      $('#bigCircleShadePressed'+k+'').css({
        'position': 'relative',
        'z-index': '1',
        'fill': 'none',
        'stroke': 'black',
        'stroke-width': '1rem',
        'stroke-linecap': 'square',
        'cursor': 'pointer'
      });
      $('#bigCircleShadePressed'+k+'').hide();
      arrBorders.push(' M '+arrX0[k-1]+' '+arrY0[k-1]+' A '+r0+' '+r0+' 0 0 1 '+arrX0[k]+' '+arrY0[k]+' L '+arrX[k]+' '+arrY[k]+' A '+r+' '+r+' 0 0 0 '+arrX[k-1]+' '+arrY[k-1]+' Z');
      $('#bigCircleSVG').append('<svg><path id="bigCircleBorder'+k+'"/></svg>');
      $('#bigCircleBorder'+k+'').attr({
        d: arrBorders[arrBorders.length-1]
      });
      $('#bigCircleBorder'+k+'').css({
        'position': 'relative',
        'z-index': '2',
        'fill': 'none',
        'stroke': 'black',
        'stroke-width': '1.5rem'
      });
    }
    pressBtn(level);
    createSmallSVG(ox, oy, r0-borderWidth/2);
  }
  
  
  function pressMouse(i) {
    $('#bigCircleShape'+i+'').css('fill', arrColorsLight[i-1]);
    $('#bigCircleShade'+i+'').hide();
    $('#bigCircleShadePressed'+i+'').show();
    music.src=arrPianoNotes[i-1];
    music.play();
  }
  
  
  function releaseMouse(i) {
    $('#bigCircleShape'+i+'').css('fill', arrColors[i-1]);
    $('#bigCircleShade'+i+'').show();
    $('#bigCircleShadePressed'+i+'').hide();
    music.pause();
    arrPlayer.push(arrColors[i-1]);
    colorClicked=1;
    compare();
  }
  
  
  function pressBtn(btnsCount) {
    for (let i=1; i<=btnsCount; i++) {
      var btn=$('#color'+i+'');
      btn.bind('touchstart', function() {
        pressMouse(i);
      });
      btn.bind('touchend', function() {
        releaseMouse(i);
      });
      btn.mousedown(function() {
        pressMouse(i);
      });
      btn.mouseup(function() {
        releaseMouse(i);
      });
    }
  }
  
  
  function createSmallSVG(circleOX, circleOY, circleRadius) {
    var y0=circleOY-circleRadius/3;
    var x1=circleOX-circleRadius*0.7;
    var y1=circleOY-circleRadius*0.07;
    var x2=circleOX+circleRadius*0.13;
    var y2=y1+circleRadius/10;
    var x2T1=circleOX;
    var y2T1=circleOY;
    var x2T2=circleOX+circleRadius*0.55;
    var y3T;
    if (window.innerWidth<768) {
      r3=circleRadius*0.2;
      x3=circleOX-circleRadius*0.35;
      y3=circleOY+circleRadius*0.68;
      x4=circleOX+circleRadius*0.35;
      y3T=circleOY+circleRadius*0.45;
    } else if (window.innerWidth>=768) {
      r3=circleRadius*0.13;
      x3=circleOX-circleRadius*0.35;
      y3=circleOY+circleRadius*0.6;
      x4=circleOX+circleRadius*0.35;
      y3T=circleOY+circleRadius*0.45;
    }
    $('#bigCircleSVG').append('<svg><circle id="smallCircleBackground" cx="'+circleOX+'" cy="'+circleOY+'" r="'+circleRadius+'" fill="rgb(200, 200, 205)"/></svg>');
    $('#bigCircleSVG').append('<svg><text id="smallCircleTitle" x="'+circleOX+'" y="'+y0+'" text-anchor="middle">simon</text></svg>');
    $('#smallCircleTitle').css('font-size', circleRadius/2.3);
    $('#bigCircleSVG').append('<svg><rect id="display" x="'+x1+'" y="'+y1+'" rx="7" ry="7" width="'+circleRadius/1.8+'" height="'+circleRadius/3+'" fill="black"/><text id="displayText" x="'+(x1+circleRadius/3.6)+'" y="'+(y1+circleRadius/4.5)+'" font-size="'+circleRadius/6.5+'" font-family="Electrolize" fill="rgb(217, 217, 217)" text-anchor="middle" ></text></svg>');
    $('#bigCircleSVG').append('<svg><text id="normalText" x="'+x2T1+'" y="'+y2T1+'" >normal</text></svg>');
    $('#bigCircleSVG').append('<svg><text id="strictText" x="'+x2T2+'" y="'+y2T1+'" >strict</text></svg>');
    $('#bigCircleSVG').append('<svg><rect id="modeStrict" x="'+x2+'" y="'+y2+'" rx="3" ry="3" width="'+circleRadius/1.8+'" height="'+circleRadius/5+'" fill="rgb(255, 102, 102)" stroke="black" stroke-width="1.5" /></svg>');
    $('#bigCircleSVG').append('<svg><rect id="modeNormal" x="'+x2+'" y="'+y2+'" rx="3" ry="3" width="'+circleRadius/1.8+'" height="'+circleRadius/5+'" fill="rgb(165, 218, 139)" stroke="black" stroke-width="1.5" /></svg>');
    $('#bigCircleSVG').append('<svg><rect id="switchShade" x="'+(x2+0.75)+'" y="'+(y2+0.75)+'" rx="2" ry="2" width="'+(circleRadius/8-0.5)+'" height="'+(circleRadius/5-1.25)+'" fill="rgb(115, 115, 115)" /></svg>');
    $('#bigCircleSVG').append('<svg><a href="#"><rect id="switch" x="'+(x2+3)+'" y="'+(y2+3)+'" rx="2" ry="2" width="'+(circleRadius/8-3)+'" height="'+(circleRadius/5-3)+'" fill="rgb(230, 230, 230)" /></a></svg>')
    $('#bigCircleSVG').append('<svg><text id="startText" x="'+x3+'" y="'+y3T+'" text-anchor="middle">start</text></svg>');
    $('#bigCircleSVG').append('<svg><circle id="startBtnBackground" cx="'+x3+'" cy="'+y3+'" r="'+r3+'" /></svg>');
    $('#bigCircleSVG').append('<svg><circle id="startBtnShade" cx="'+x3+'" cy="'+y3+'" r="'+r3*0.8+'" fill="rgb(128, 128, 0)" /></svg>');
    $('#bigCircleSVG').append('<svg><a href="#"><circle class="smallCircleBtns" id="startBtn" cx="'+(x3-r3*0.03)+'" cy="'+(y3+r3*0.13)+'" r="'+r3*0.7+'" fill="yellow" /><a/></svg>');
    $('#bigCircleSVG').append('<svg><text id="onOffText" x="'+x4+'" y="'+y3T+'" text-anchor="middle">on/off</text></svg>');
    $('#bigCircleSVG').append('<svg><circle id="onOffBtnBackground" cx="'+x4+'" cy="'+y3+'" r="'+r3+'" /></svg>');
    $('#bigCircleSVG').append('<svg><circle id="onOffBtnShade" cx="'+x4+'" cy="'+y3+'" r="'+r3*0.8+'" fill="rgb(64, 114, 128)" /></svg>');
    $('#bigCircleSVG').append('<svg><a href="#"><circle class="smallCircleBtns" id="onOffBtn" cx="'+(x4+r3*0.03)+'" cy="'+(y3+r3*0.13)+'" r="'+r3*0.7+'" fill="rgb(128, 229, 255)" /><a/></svg>');
    pressSmallBtn();
    pressSwitch(x2+3, x2+circleRadius*0.43+2.5, circleRadius);
    $('.colors').css('pointer-events', 'none');
    $('.shades').css('pointer-events', 'none');
    $('#startBtnShade').css('pointer-events', 'none');
    $('#startBtn').css('pointer-events', 'none');
    $('#switch').css('pointer-events', 'none');
  }


  function pressStart() {
    if (power==='on') {
      $('#startBtnShade').hide();
      $('#startBtn').attr({
        'cx': x3,
        'cy': y3
      });
    }
  }


  function releaseStart() {
    if (power==='on') {
      $('#startBtnShade').show();
      $('#startBtn').attr({
        'cx': x3-r3*0.03,
        'cy': y3+r3*0.13
      });
      clearInterval(flashingDisplayInterval);
      clearTimeout(flashingDisplayTimeout);
      $('#displayText').text(arrCountdown[0]);
      $('#startBtnShade').css('pointer-events', 'none');
      $('#startBtn').css('pointer-events', 'none');
      countdownSound.src='countdown.wav';
      countdownSound.loop=true;
      countdownSound.play();
      countdown(1);
    }
  }


  function pressOnOff() {
    $('#onOffBtnShade').hide();
    $('#onOffBtn').attr({
      'cx': x4,
      'cy': y3
    });
  }


  function releaseOnOff() {
    $('#onOffBtnShade').show();
    $('#onOffBtn').attr({
      'cx': x4+r3*0.03,
      'cy': y3+r3*0.13
    });
    if (power==='off') {
      $('#startBtnShade').css('pointer-events', 'auto');
      $('#startBtn').css('pointer-events', 'auto');
      $('#switch').css('pointer-events', 'auto');
      flashingDisplayFunc();
      switchMode='active';
      power='on';
    } else if (power==='on') {
      $('#startBtnShade').css('pointer-events', 'none');
      $('#startBtn').css('pointer-events', 'none');
      $('.colors').css('pointer-events', 'none');
      $('.shades').css('pointer-events', 'none');
      $('#switch').css('pointer-events', 'none');
      $('#displayText').text('');
      clearInterval(flashingDisplayInterval);
      clearTimeout(flashingDisplayTimeout);
      clearTimeout(repeatRandom);
      switchMode='inactive';
      power='off';
    }
  }


  function pressSmallBtn() {
    $('#startBtn').bind('touchstart', function() {
      pressStart();
    });
    $('#startBtn').bind('touchend', function() {
      releaseStart();
    });
    $('#startBtn').mousedown(function() {
      pressStart();
    });
    $('#startBtn').mouseup(function() {
      releaseStart();
    });
    $('#onOfftBtn').bind('touchstart', function() {
      pressOnOff();
    });
    $('#onOffBtn').bind('touchend', function() {
      releaseOnOff();
    });
    $('#onOffBtn').mousedown(function() {
      pressOnOff();
    });
    $('#onOffBtn').mouseup(function() {
      releaseOnOff();
    });
  }


  function changeNormalToStrict(xNormal, xStrict, radius) {
    if (power==='on' && switchMode==='active') {
      clearTimeout(repeatRandom);
      clearInterval(flashingDisplayInterval);
      clearTimeout(flashingDisplayTimeout);
      $('#startBtnShade').css('pointer-events', 'auto');
      $('#startBtn').css('pointer-events', 'auto');
      $('.colors').css('pointer-events', 'none');
      $('.shades').css('pointer-events', 'none');
      var position=xNormal;
      var switchWidth=$('#switch').width();
      var normalInterval=setInterval(function() {
        if (position>=xStrict) {
          clearInterval(normalInterval);
          clearTimeout(randomRecursion);
          mode='strict';
          flashingDisplayFunc();
        } else {
          position++;
          $('#switch').attr('x', position);
          $('#switchShade').attr('x', position-3.25);
          $('#modeNormal').attr('x', position).attr('width', xStrict+switchWidth-position);
        }
      }, 5);
    }
  }


  function changeStrictToNormal(xNormal, xStrict, radius) {
    if (power==='on' && switchMode==='active') {
      clearTimeout(repeatRandom);
      clearInterval(flashingDisplayInterval);
      clearTimeout(flashingDisplayTimeout);
      $('#startBtnShade').css('pointer-events', 'auto');
      $('#startBtn').css('pointer-events', 'auto');
      $('.colors').css('pointer-events', 'none');
      $('.shades').css('pointer-events', 'none');
      var position=xStrict;
      var switchWidth=$('#switch').width();
      var strictInterval=setInterval(function() {
        if (position<=xNormal) {
          clearInterval(strictInterval);
          clearTimeout(randomRecursion);
          mode='normal';
          flashingDisplayFunc();
        } else {
          position--;
          $('#switch').attr('x', position);
          $('#switchShade').attr('x', position-2.2);
          $('#modeNormal').attr('x', position).attr('width', xStrict+switchWidth-position);
        }
      }, 5);
    }
  }


  function pressSwitch(xNormal, xStrict, radius) {
    music.pause();
    countdownSound.pause();
    //clearInterval(flashingDisplayInterval);
    //clearTimeout(flashingDisplayTimeout);
    $('#switch').bind('touchend', function() {
      if (mode==='normal') {
        changeNormalToStrict(xNormal, xStrict, radius);
      } else if (mode==='strict') {
        changeStrictToNormal(xNormal, xStrict, radius);
      }
    });
    $('#switch').mouseup(function() {
      if (mode==='normal') {
        changeNormalToStrict(xNormal, xStrict, radius);
      } else if (mode==='strict') {
        changeStrictToNormal(xNormal, xStrict, radius);
      }
    });
  }


  function random(level) {
    if (power==='on') {
      var arrTemp=[];
      for (var i=0; i<=level; i++) {
        arrTemp.push(i*1/level);
      }
      var tempRandom=Math.random();
      for (var j=0; j<arrTemp.length; j++) {
        if (tempRandom>=arrTemp[j] && tempRandom<arrTemp[j+1]) {
          arrRandom.push(arrColors[j]);
        }
      }
      arrRandomCopy=arrRandom.slice();
      $('#displayText').text(arrRandom.length);
      randomBtn(arrRandomCopy);
    }
  }



  function randomBtn(arr) {
    if (arr.length>=1 && power==='on') {
      $('.colors').css('pointer-events', 'none');
      $('.shades').css('pointer-events', 'none');
      var value=arr.shift();
      var randomBtnIndex=arrColors.indexOf(value)+1;
      $('#bigCircleShape'+randomBtnIndex+'').css('fill', arrColorsLight[randomBtnIndex-1]);
      music.src=arrPianoNotes[randomBtnIndex-1];
      music.play();
      randomBtnColors=setTimeout (function() {
        $('#bigCircleShape'+randomBtnIndex+'').css('fill', arrColors[randomBtnIndex-1]);
        randomRecursion=setTimeout (function() {
          randomBtn(arr);
        }, 500);
      }, 500);
    } else if (arr.length===0 && power==='on') {
      $('.colors').css('pointer-events', 'auto');
      $('.shades').css('pointer-events', 'auto');
      startRepeatRandom();
    }
  }


  function countdown(i) {
    switchMode='inactive';
    arrRandom=[];
    if (i<=3) {
      setTimeout (function() {
        $('#displayText').text(arrCountdown[i]);
        countdown(i+1);
      }, 1000);
    }
    if (i>3) {
      countdownSound.pause();
      $('#displayText').text('');
      random(level);
      switchMode='active';
    }
  }


  function compare() {
    clearTimeout(repeatRandom);
    if(arrPlayer[arrPlayer.length-1]!==arrRandom[arrPlayer.length-1]) {
      $('.colors').css('pointer-events', 'none');
      $('.shades').css('pointer-events', 'none');
      wrongMoveAnimation();
      setTimeout (function() {
        arrPlayer=[];
        colorClicked=0;
        if (mode==='normal') {
          arrRandomCopy=arrRandom.slice();
          randomBtn(arrRandomCopy);
        } else if (mode==='strict') {
          arrRandom=[];
          random(level);
        }
      }, 1500);
    } else if (arrPlayer[arrPlayer.length-1]===arrRandom[arrPlayer.length-1]) {
      if (arrPlayer.length===arrRandom.length) {
        $('.colors').css('pointer-events', 'none');
        $('.shades').css('pointer-events', 'none');
        if (arrPlayer.length===20) {
          hasThePlayerWon();
        } else if (arrPlayer.length<20) {
          setTimeout (function() {
            arrPlayer=[];
            colorClicked=0;
            random(level);
          }, 1000);
        }
      } else if (arrPlayer.length<arrRandom.length) {
        colorClicked=0;
        startRepeatRandom();
      }
    }
  }


  function startRepeatRandom() {
    repeatRandom=setTimeout (function() {
      if (colorClicked===0) {
        arrRandomCopy=arrRandom.slice();
        arrPlayer=[];
        randomBtn(arrRandomCopy);
      }
    }, 5000);
  }


  function wrongMoveAnimation() {
    $('#wrongMove').show();
    music.pause();
    wrongMoveSound.src='alert.wav';
    wrongMoveSound.play();
    var i=1;
    var wrongMoveAnimation=setInterval(function() {
      $('#wrongMove').css({
        'background': 'radial-gradient(circle, rgba(255, 0, 0, 0), rgba(255, 0, 0, '+i+'))'
      });
      i=i-0.01;
    }, 10);
    setTimeout(function() {
      clearInterval(wrongMoveAnimation);
      $('#wrongMove').hide();
    }, 1000);
  }


  function flashingDisplayFunc() {
    $('#displayText').text(' |');
    setTimeout(function() {
      $('#displayText').text(' ');
    }, 500);
    flashingDisplayInterval=setInterval(function() {
      $('#displayText').text(' |');
      flashingDisplayTimeout=setTimeout(function() {
        $('#displayText').text(' ');
      }, 500);
    }, 1000);
  }


  function setInitialData() {
    music.pause();
    countdownSound.pause();
    wrongMoveSound.pause();
    mode='normal';
    switchMode='inactive';
    arrRandom=[];
    arrRandomCopy=[];
    arrPlayer=[];
    colorClicked=0;
    clearInterval(repeatRandom);
    clearTimeout(randomRecursion);
    power='off';
    clearInterval(flashingDisplayInterval);
    clearTimeout(flashingDisplayTimeout);
  }


  function hasThePlayerWon() {
    if (level===4) {
      $('#winNotificationText p').text('You are the winner of the classic Simon Game');
    } else if (level>4 && level<7) {
      $('#winNotificationText p').text('You are the winner of the '+level+' colors Simon Game');
    } else if (level===7) {
      $('#winNotificationText p').text('You are the real RAINBOW MASTER');
    }
    $('#playerWins').show();
  }
  
  
                      /*  Code  */  
  $('.rules').hide();
  $('.menu ul li ul').hide();
  $('#wrongMove').hide();
  $('#playerWins').hide();
  createSVG(level);
  
  
  $('#btnSettings').click(function(){
    $('.menu ul li ul').toggle();
    $('.menu ul li ul li ul').hide();
    $('.rules').hide();
    pressedOrNotSettings();
    pressedOrNotRules();
  });
  
  
  $('#btnAdvanced').click(function(){
    $('.menu ul li ul li ul').toggle();
  });
  
  
  $('#btnClassic').click(function() {
    $('#bigCircleSVG svg').remove();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    level=4;
    setInitialData();
    createSVG(level);
  });
  
  
  $('#btn5Colors').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    level=5;
    setInitialData();
    createSVG(level);
  });
  
  
  $('#btn6Colors').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    level=6;
    setInitialData();
    createSVG(level);
  });
  
  
  $('#btnRainbowMaster').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    level=7;
    setInitialData();
    createSVG(level);
  });
  
  
  $(document).click(function(){
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
  });
  
  
  $('.menu').click(function(event) {
    event.stopPropagation();
  });
  
  
  $('#btnRules').click(function() {
    $('.menu ul li ul').hide();
    rulesAnimation();
    pressedOrNotSettings();
    pressedOrNotRules();
  });
  
  
  $('#btnCloseRules').click(function() {
    $('.rules').hide();
    pressedOrNotRules();
  });
  
  
  $('#btnHighScores').click(function() {
    $('.rules').hide();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    pressedOrNotRules();
  });


  $('#btnPlayMore').click(function() {
    level+=1;
    if (level>7) {
      level=7;
    }
    $('#playerWins').hide();
    $('#bigCircleSVG').empty();
    setInitialData();
    createSVG(level);
  });


});