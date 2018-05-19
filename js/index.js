$(document).ready(function() {
  
  
                      /*  Variables  */
  var top;
  var ox;
  var oy;
  var r0;
  var borderWidth;
  var x3;
  var X4;
  var y3;
  var r3;
  var arrShapes=[];
  var arrShades=[];
  var arrShadesPressed=[];
  var arrBorders=[];
  var arrColors=['red', 'blue', 'yellow', 'green', 'indigo', 'orange', 'violet'];
  var arrShadeColors=['rgb(128, 0 , 0)', 'rgb(0, 0, 128)', 'rgb(128, 128, 0)', 'rgb(0, 64, 0)', 'rgb(35, 0, 65)', 'rgb(128, 83, 0)', 'rgb(119, 65, 119)'];
  var arrColorsLight=['rgb(255, 204, 204)', 'rgb(204, 204, 255)', 'rgb(255, 255, 204)', 'rgb(204, 255, 204)', 'rgb(234, 204, 255)', 'rgb(255, 237, 204)', 'rgb(249, 210, 249)'];
  var mode=0;
  var step=0;
  var arrRandom=[];


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
    var side = Math.min($('.game').width(), $('.game').height());
    var bigCircleSVG = $('#bigCircleSVG');
    bigCircleSVG.attr('width', side).attr('height', side);
    ox=bigCircleSVG.width()/2;
    oy=bigCircleSVG.height()/2;
    var r = Math.min(ox, oy) * 0.8;
    r0=r*0.5;
    if (window.innerWidth<768) {
      borderWidth=1.5*10;
    } else if (window.innerWidth<1025) {
      borderWidth=1.5*12;
    } else if (window.innerWidth>=1025) {
      borderWidth=1.5*16;
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
      $('#bigCircleSVG').append('<svg><defs><radialGradient id="radGradient'+k+'"><stop offset="0%" style="stop-color:'+arrColorsLight[k-1]+'" /><stop offset="100%" style="stop-color:'+arrColors[k-1]+'" /></radialGradient></defs><a href="#" class="colors" id="color'+k+'"><path id="bigCircleShape'+k+'"/></a></svg>');
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
    $('#bigCircleShape'+i+'').css('fill', 'url(#radGradient'+i+')');
    $('#bigCircleShade'+i+'').hide();
    $('#bigCircleShadePressed'+i+'').show();
  }
  
  
  function releaseMouse(i) {
    $('#bigCircleShape'+i+'').css('fill', arrColors[i-1]);
    $('#bigCircleShade'+i+'').show();
    $('#bigCircleShadePressed'+i+'').hide();
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
    x3=circleOX-circleRadius*0.35;
    y3=circleOY+circleRadius*0.6;
    var y3T=circleOY+circleRadius*0.45;
    r3=circleRadius*0.13;
    x4=circleOX+circleRadius*0.35;
    $('#bigCircleSVG').append('<svg><circle id="smallCircleBackground" cx="'+circleOX+'" cy="'+circleOY+'" r="'+circleRadius+'" fill="rgb(200, 200, 205)"/></svg>');
    $('#bigCircleSVG').append('<svg><text id="smallCircleTitle" x="'+circleOX+'" y="'+y0+'" text-anchor="middle">simon</text></svg>');
    $('#smallCircleTitle').css('font-size', circleRadius/2.3);
    $('#bigCircleSVG').append('<svg><rect id="display" x="'+x1+'" y="'+y1+'" rx="7" ry="7" width="'+circleRadius/1.8+'" height="'+circleRadius/3+'" fill="black"/><text></text></svg>');
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
    //$('#modeStrict').hide();
    pressSwitch(x2+3, x2+circleRadius*0.43+2.5, circleRadius);
  }


  function pressStart() {
    $('#startBtnShade').hide();
    $('#startBtn').attr({
      'cx': x3,
      'cy': y3
    });
  }


  function releaseStart() {
    $('#startBtnShade').show();
    $('#startBtn').attr({
      'cx': x3-r3*0.03,
      'cy': y3+r3*0.13
    });
    random(4);
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
    var position=xNormal;
    var switchWidth=$('#switch').width();
    var normalInterval=setInterval(function() {
      if (position>=xStrict) {
        clearInterval(normalInterval);
        mode=1;
      } else {
        position++;
        $('#switch').attr('x', position);
        $('#switchShade').attr('x', position-3.25);
        $('#modeNormal').attr('x', position).attr('width', xStrict+switchWidth-position);
      }
    }, 5);
  }


  function changeStrictToNormal(xNormal, xStrict, radius) {
    var position=xStrict;
    var switchWidth=$('#switch').width();
    var strictInterval=setInterval(function() {
      if (position<=xNormal) {
        clearInterval(strictInterval);
        mode=0;
      } else {
        position--;
        $('#switch').attr('x', position);
        $('#switchShade').attr('x', position-1.75);
        $('#modeNormal').attr('x', position).attr('width', xStrict+switchWidth-position);
      }
    }, 5);
  }


  function pressSwitch(xNormal, xStrict, radius) {
    $('#switch').bind('touchend', function() {
      if (mode===0) {
        changeNormalToStrict(xNormal, xStrict, radius);
      } else if (mode===1) {
        changeStrictToNormal(xNormal, xStrict, radius);
      }
    });
    $('#switch').mouseup(function() {
      if (mode===0) {
        changeNormalToStrict(xNormal, xStrict, radius);
      } else if (mode===1) {
        changeStrictToNormal(xNormal, xStrict, radius);
      }
    });
  }


  function random(level) {
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
    var arrRandomCopy=arrRandom.slice();
    randomBtn(arrRandomCopy);
  }



  function randomBtn(arr) {
    if (arr.length>=1) {
      var value=arr.shift();
      var randomBtnIndex=arrColors.indexOf(value)+1;
      $('#bigCircleShape'+randomBtnIndex+'').css('fill', 'url(#radGradient'+randomBtnIndex+')');
      setTimeout (function() {
        $('#bigCircleShape'+randomBtnIndex+'').css('fill', arrColors[randomBtnIndex-1]);
        setTimeout (function() {
          randomBtn(arr);
        }, 500);
      }, 1000);
    }
  }
  
  
                      /*  Code  */  
  $('.rules').hide();
  $('.menu ul li ul').hide();
  createSVG(4);
  
  
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
    createSVG(4);
  });
  
  
  $('#btn5Colors').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    createSVG(5);
  });
  
  
  $('#btn6Colors').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    createSVG(6);
  });
  
  
  $('#btnRainbowMaster').click(function() {
    $('#bigCircleSVG').empty();
    $('.menu ul li ul').hide();
    pressedOrNotSettings();
    createSVG(7);
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
  
  
});