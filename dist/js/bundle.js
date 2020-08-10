/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tmp/js/script.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tmp/js/script.js":
/*!**************************!*\
  !*** ./tmp/js/script.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

window.onload = function () {
  var PI2 = Math.PI * 2;
  var SIN = Math.sin;
  var COS = Math.cos;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function distanceBetweenPoints(p1x, p1y, p2x, p2y) {
    return Math.sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
  }

  function mergeObjects(target, object) {
    var deep = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    for (var prop in object) {
      if (target.hasOwnProperty(prop)) {
        if (_typeof(object[prop]) === 'object' && deep) {
          target[prop] = mergeObjects(target[prop], object[prop], true);
        } else {
          target[prop] = object[prop];
        }
      }
    }

    return target;
  }

  var ParticleText = /*#__PURE__*/function () {
    function ParticleText(string, element) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, ParticleText);

      _defineProperty(this, "animate", function () {
        _this.renderParticles(_this.defaults.particles);

        _this.frameID = window.requestAnimationFrame(_this.animate);
      });

      //setting up the canvases needed for ParticleText
      var canvas = createFitCanvas(element);
      var $referenceCanvas = createCanvasFrom(canvas);
      var _defaults = {
        particles: {
          //general
          particleProps: 9,
          //should not be changed!!!
          //particle shape
          pointSpacing: 5,
          particleMaxRadius: 2,
          //particle motion
          revolutionRadius: 2,
          revolutionSlowness: 5
        },
        text: {
          fontSize: 150,
          fontFamily: 'serif',
          padding: 50
        }
      };
      this.defaults = mergeObjects(_defaults, options, true);
      this.context = canvas.getContext('2d');
      this.text = new Text(string, $referenceCanvas, this.defaults.text).initialise();
      this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);
      this.particlePointer = null; //will hold the ID frame (used to toggle the play-state of the animation)

      this.frameID = undefined;
    }

    _createClass(ParticleText, [{
      key: "updateText",
      value: function updateText(string) {
        this.text.update(string);
        this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);
      }
    }, {
      key: "updateCurrentParticle",
      value: function updateCurrentParticle(_ref) {
        var revolutionSlowness = _ref.revolutionSlowness,
            revolutionRadius = _ref.revolutionRadius;
        this.particles[this.particlePointer + 4] += this.particles[this.particlePointer + 6]; //add the direction.x value of the particle to its movement's progression x value

        this.particles[this.particlePointer + 5] += this.particles[this.particlePointer + 7]; //add the direction.y value of the particle to its movement's progression y value

        this.particles[this.particlePointer] = this.particles[this.particlePointer + 2] + COS(this.particles[this.particlePointer + 4] / revolutionSlowness) * revolutionRadius;
        this.particles[this.particlePointer + 1] = this.particles[this.particlePointer + 3] + SIN(this.particles[this.particlePointer + 5] / revolutionSlowness) * revolutionRadius;
      }
    }, {
      key: "drawCurrentParticle",
      value: function drawCurrentParticle() {
        this.context.beginPath();
        this.context.arc(this.particles[this.particlePointer], this.particles[this.particlePointer + 1], this.particles[this.particlePointer + 8], 0, PI2);
        this.context.fill();
      }
    }, {
      key: "renderParticles",
      value: function renderParticles(particlesOptions) {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

        for (this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += particlesOptions.particleProps) {
          this.updateCurrentParticle(particlesOptions);
          this.drawCurrentParticle();
        }
      }
    }]);

    return ParticleText;
  }();

  var Text = /*#__PURE__*/function () {
    function Text(string, context, options) {
      _classCallCheck(this, Text);

      this.string = string;
      this.context = context;
      this.fontFamily = options.fontFamily;
      this.fontSize = options.fontSize;
      this.font = this.context.font = "".concat(this.fontSize, "px ").concat(this.fontFamily);
      this.padding = options.padding;
      this.image = undefined; //set default baseline in canvas

      this.context.textBaseline = 'top';
      this.context.textAlign = 'center';
    }

    _createClass(Text, [{
      key: "renderFormattedString",
      value: function renderFormattedString() {
        var words = this.string.split(" "),
            finalText = [];
        var line = "",
            x,
            y,
            i;

        for (i = 0; i < words.length; i++) {
          if (this.context.measureText(line + words[i] + " ").width >= this.context.canvas.width - this.padding * 2) {
            finalText.push(line);
            line = "";
          }

          line += words[i] + " ";
        }

        finalText.push(line);
        var totalTextHeight = this.fontSize * finalText.length;

        for (i = 0; i < finalText.length; i++) {
          this.context.fillText(finalText[i], this.context.canvas.width / 2, this.context.canvas.height / 2 - totalTextHeight / 2 + this.fontSize * i);
        }

        this.image = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
      }
    }, {
      key: "initialise",
      value: function initialise() {
        this.renderFormattedString();
        return this;
      }
    }, {
      key: "update",
      value: function update(string) {
        this.string = string;
        this.renderFormattedString();
        return this;
      }
    }, {
      key: "setFontSize",
      value: function setFontSize(fontSize) {
        this.fontSize = fontSize;
        this.font = this.context.font = "".concat(this.fontSize, "px ").concat(this.fontFamily);
        return this;
      }
    }, {
      key: "setFontFamily",
      value: function setFontFamily(fontFamily) {
        this.fontFamily = fontFamily;
        this.font = this.context.font = "".concat(this.fontSize, "px ").concat(this.fontFamily);
        return this;
      }
    }]);

    return Text;
  }();

  function createCanvasFrom(canvas) {
    var referenceCanvas = document.createElement('canvas');
    var $referenceCanvas = referenceCanvas.getContext('2d');
    $referenceCanvas.canvas.width = referenceCanvas.width = canvas.width;
    $referenceCanvas.canvas.height = referenceCanvas.height = canvas.height;
    return $referenceCanvas;
  }

  function createFitCanvas(element) {
    var canvas = document.createElement('canvas');
    var $canvas = canvas.getContext('2d');
    $canvas.canvas.width = canvas.width = element.offsetWidth;
    $canvas.canvas.height = canvas.height = element.offsetHeight;
    canvas.style.position = 'absolute'; //so it fits snuggly in its container

    element.append(canvas);
    return canvas;
  }

  function getAlphaPixelsFromImage(imageData) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var alphaPixels = [];

    for (var i = 0, counter = 0; i < imageData.data.length; i++) {
      if (imageData.data[i]) {
        counter++;

        if (counter % step === 0 && Math.random() > 0.5) {
          alphaPixels.push((i - 3) / 4);
        }
      }
    }

    return alphaPixels;
  }

  function getParticlesFromImage(imageData, _ref2) {
    var particleProps = _ref2.particleProps,
        particleMaxRadius = _ref2.particleMaxRadius,
        pointSpacing = _ref2.pointSpacing;
    var alphaPixels = getAlphaPixelsFromImage(imageData, pointSpacing);
    var particlesArray = new Float32Array(alphaPixels.length * particleProps);

    for (var i = 0, particlePointer = 0, x = undefined, y = undefined; i < alphaPixels.length; i++) {
      x = alphaPixels[i] % imageData.width;
      y = alphaPixels[i] / imageData.width;
      particlePointer = i * particleProps;
      particlesArray[particlePointer++] = x; //position.x ========= +0 (aka particlePointer's current value)

      particlesArray[particlePointer++] = y; //position.y ========= +1

      particlesArray[particlePointer++] = x; //targetPosition.x === +2

      particlesArray[particlePointer++] = y; //targetPosition.y === +3

      particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.x ========= +4

      particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.y ========= +5

      particlesArray[particlePointer++] = randomInRange(-1, 1); //particle.direction.x ================ +6

      particlesArray[particlePointer++] = randomInRange(-1, 1); //particle.direction.y ================ +7

      particlesArray[particlePointer] = randomInRange(0.5, particleMaxRadius); //particle.radius === +8
    }

    return particlesArray;
  }

  var textContainer = document.getElementById('text-container');
  var STRING = "Hello, Codepen! ❤︎";
  var T = new ParticleText(STRING, textContainer, {
    particles: {
      pointSpacing: 5,
      particleMaxRadius: 2,
      revolutionRadius: 2,
      revolutionSlowness: 5
    },
    text: {
      fontSize: 150,
      fontFamily: 'serif'
    }
  });
  T.animate();
  console.log("Particles rendering: ".concat(T.particles.length / T.defaults.particles.particleProps));
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map