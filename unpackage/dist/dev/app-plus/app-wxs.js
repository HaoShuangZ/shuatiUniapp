var __wxsModules={};

__wxsModules.b6a9b97a = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var mode = "";
      var rotate = 0;
      var image = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      var frame = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
      var touches = [];
      var touchType = "";
      var start = {
        frame: {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        },
        image: {
          left: 0,
          top: 0,
          width: 0,
          height: 0
        }
      };
      function changeMode(value) {
        mode = value;
      }
      function changeRotate(value, old, oi, instance) {
        rotate = value;
        delayUpdateStyle(oi);
      }
      function changeImage(value, old, oi, instance) {
        image = value;
        delayUpdateStyle(oi);
      }
      function changeFrame(value, old, oi, instance) {
        frame = value;
        delayUpdateStyle(oi);
      }
      function delayUpdateStyle(oi) {
        setTimeout(() => {
          updateStyle(oi);
        });
      }
      function touchstart(event, oi) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (event.stopPropagation) {
          event.stopPropagation();
        }
        touches = event.touches;
        var instance = event.instance;
        if (instance.hasClass("body")) {
          touchType = "body";
        } else if (instance.hasClass("frame-left-top")) {
          touchType = "left-top";
        } else if (instance.hasClass("frame-left-bottom")) {
          touchType = "left-bottom";
        } else if (instance.hasClass("frame-right-top")) {
          touchType = "right-top";
        } else if (instance.hasClass("frame-right-bottom")) {
          touchType = "right-bottom";
        }
        start.frame.left = frame.left;
        start.frame.top = frame.top;
        start.frame.width = frame.width;
        start.frame.height = frame.height;
        start.image.left = image.left;
        start.image.top = image.top;
        start.image.width = image.width;
        start.image.height = image.height;
        return false;
      }
      function touchmove(event, oi) {
        var instance = event.instance;
        if (touches.length == 1) {
          if (touchType == "body") {
            moveImage(touches[0], event.touches[0], oi);
          } else {
            scaleFrame(touches[0], event.touches[0], oi);
          }
        } else if (touches.length == 2 && event.touches.length == 2) {
          var ta = touches[0];
          var tb = touches[1];
          var tc = event.touches[0];
          var td = event.touches[1];
          if (ta.identifier != tc.identifier) {
            var temp = tc;
            tc = td;
            td = temp;
          }
          scaleImage(ta, tb, tc, td, oi);
        }
      }
      function touchend(event, oi) {
        touches = [];
        oi.callMethod("updateData", {
          frame,
          image
        });
      }
      function touchcancel(event, oi) {
        touches = [];
        oi.callMethod("updateData", {
          frame,
          image
        });
      }
      function moveImage(ta, tb, oi) {
        var ax = tb.clientX - ta.clientX;
        var ay = tb.clientY - ta.clientY;
        image.left = start.image.left + ax;
        image.top = start.image.top + ay;
        var left = frame.left;
        var top = frame.top;
        var width = frame.width;
        var height = frame.height;
        if (image.left > left) {
          image.left = left;
        }
        if (image.top > top) {
          image.top = top;
        }
        if (image.left + image.width < left + width) {
          image.left = left + width - image.width;
        }
        if (image.top + image.height < top + height) {
          image.top = top + height - image.height;
        }
        updateStyle(oi);
      }
      function scaleImage(ta, tb, tc, td, oi) {
        var x1 = ta.clientX;
        var y1 = ta.clientY;
        var x2 = tb.clientX;
        var y2 = tb.clientY;
        var x3 = tc.clientX;
        var y3 = tc.clientY;
        var x4 = td.clientX;
        var y4 = td.clientY;
        var ol = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var el = Math.sqrt((x3 - x4) * (x3 - x4) + (y3 - y4) * (y3 - y4));
        var ocx = (x1 + x2) / 2;
        var ocy = (y1 + y2) / 2;
        var ecx = (x3 + x4) / 2;
        var ecy = (y3 + y4) / 2;
        var ax = ecx - ocx;
        var ay = ecy - ocy;
        var scale = el / ol;
        if (start.image.width * scale < frame.width) {
          scale = frame.width / start.image.width;
        }
        if (start.image.height * scale < frame.height) {
          scale = frame.height / start.image.height;
        }
        if (start.image.width * scale < frame.width) {
          scale = frame.width / start.image.width;
        }
        image.left = start.image.left + ax - (ocx - start.image.left) * (scale - 1);
        image.top = start.image.top + ay - (ocy - start.image.top) * (scale - 1);
        image.width = start.image.width * scale;
        image.height = start.image.height * scale;
        if (image.left > frame.left) {
          image.left = frame.left;
        }
        if (image.top > frame.top) {
          image.top = frame.top;
        }
        if (image.left + image.width < frame.left + frame.width) {
          image.left = frame.left + frame.width - image.width;
        }
        if (image.top + image.height < frame.top + frame.height) {
          image.top = frame.top + frame.height - image.height;
        }
        updateStyle(oi);
      }
      function scaleFrame(ta, tb, oi) {
        var ax = tb.clientX - ta.clientX;
        var ay = tb.clientY - ta.clientY;
        var x1 = start.frame.left;
        var y1 = start.frame.top;
        var x2 = start.frame.left + start.frame.width;
        var y2 = start.frame.top + start.frame.height;
        var cx1 = false;
        var cy1 = false;
        var cx2 = false;
        var cy2 = false;
        var mix = 30;
        var rate = frame.width / frame.height;
        if (touchType == "left-top") {
          x1 += ax;
          y1 += ay;
          cx1 = true;
          cy1 = true;
        } else if (touchType == "left-bottom") {
          x1 += ax;
          y2 += ay;
          cx1 = true;
          cy2 = true;
        } else if (touchType == "right-top") {
          x2 += ax;
          y1 += ay;
          cx2 = true;
          cy1 = true;
        } else if (touchType == "right-bottom") {
          x2 += ax;
          y2 += ay;
          cx2 = true;
          cy2 = true;
        }
        if (x1 < image.left) {
          x1 = image.left;
        }
        if (y1 < image.top) {
          y1 = image.top;
        }
        if (x2 > image.left + image.width) {
          x2 = image.left + image.width;
        }
        if (y2 > image.top + image.height) {
          y2 = image.top + image.height;
        }
        if (cx1) {
          if (x1 > x2 - mix) {
            x1 = x2 - mix;
          }
        }
        if (cy1) {
          if (y1 > y2 - mix) {
            y1 = y2 - mix;
          }
        }
        if (cx2) {
          if (x2 < x1 + mix) {
            x2 = x1 + mix;
          }
        }
        if (cy2) {
          if (y2 < y1 + mix) {
            y2 = y1 + mix;
          }
        }
        if (cx1) {
          if (mode != "free") {
            var val = x2 - rate * (y2 - y1);
            if (x1 < val) {
              x1 = val;
            }
          }
        }
        if (cy1) {
          if (mode != "free") {
            var val = y2 - (x2 - x1) / rate;
            if (y1 < val) {
              y1 = val;
            }
          }
        }
        if (cx2) {
          if (mode != "free") {
            var val = rate * (y2 - y1) + x1;
            if (x2 > val) {
              x2 = val;
            }
          }
        }
        if (cy2) {
          if (mode != "free") {
            var val = (x2 - x1) / rate + y1;
            if (y2 > val) {
              y2 = val;
            }
          }
        }
        frame.left = x1;
        frame.top = y1;
        frame.width = x2 - x1;
        frame.height = y2 - y1;
        updateStyle(oi);
      }
      function updateStyle(oi) {
        oi.selectComponent(".frame").setStyle({
          "left": frame.left + "px",
          "top": frame.top + "px",
          "width": frame.width + "px",
          "height": frame.height + "px"
        });
        oi.selectComponent(".image-wrap").setStyle({
          "left": image.left + "px",
          "top": image.top + "px",
          "width": image.width + "px",
          "height": image.height + "px"
        });
        oi.selectComponent(".image-rect").setStyle({
          "left": image.left - frame.left + "px",
          "top": image.top - frame.top + "px",
          "width": image.width + "px",
          "height": image.height + "px"
        });
        var left = 0;
        var top = 0;
        var width = image.width;
        var height = image.height;
        if (rotate % 180 != 0) {
          width = image.height;
          height = image.width;
          top = width / 2 - height / 2;
          left = height / 2 - width / 2;
        }
        oi.selectComponent(".image-wrap .image").setStyle({
          "left": left + "px",
          "top": top + "px",
          "width": width + "px",
          "height": height + "px",
          "transform": "rotate(" + rotate + "deg)"
        });
        oi.selectComponent(".image-rect .image").setStyle({
          "left": left + "px",
          "top": top + "px",
          "width": width + "px",
          "height": height + "px",
          "transform": "rotate(" + rotate + "deg)"
        });
      }
      module.exports = {
        changeMode,
        changeRotate,
        changeImage,
        changeFrame,
        touchstart,
        touchmove,
        touchend,
        touchcancel
      };
    }
  });
  return require_stdin();
})();
