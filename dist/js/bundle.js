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
  /*		/$$$$$$                                      /$$$$$$$                                      /$$$$$$$$ /$$           /$$
  		/$$__  $$                                    | $$__  $$                                    | $$_____/| $$          | $$
  		| $$  \__/ /$$   /$$  /$$$$$$   /$$$$$$       | $$  \ $$ /$$   /$$  /$$$$$$   /$$$$$$       | $$      | $$ /$$   /$$| $$
  		|  $$$$$$ | $$  | $$ /$$__  $$ |____  $$      | $$  | $$| $$  | $$ /$$__  $$ |____  $$      | $$$$$   | $$| $$  | $$| $$
  		\____  $$| $$  | $$| $$  \ $$  /$$$$$$$      | $$  | $$| $$  | $$| $$  \ $$  /$$$$$$$      | $$__/   | $$| $$  | $$|__/
  		/$$  \ $$| $$  | $$| $$  | $$ /$$__  $$      | $$  | $$| $$  | $$| $$  | $$ /$$__  $$      | $$      | $$| $$  | $$
  		|  $$$$$$/|  $$$$$$/| $$$$$$$/|  $$$$$$$      | $$$$$$$/|  $$$$$$/| $$$$$$$/|  $$$$$$$      | $$      | $$|  $$$$$$$ /$$
  		\______/  \______/ | $$____/  \_______/      |_______/  \______/ | $$____/  \_______/      |__/      |__/ \____  $$|__/
  									| $$                                          | $$                                     /$$  | $$
  									| $$                                          | $$                                    |  $$$$$$/
  									|__/                                          |__/                                     \______/     */
  ///////////////////////
  // UTILITY FUNCTIONS //
  ///////////////////////
  //some utility functions

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  } //I'll leave this here just in case anyone wants to play with the particles rgb channels
  //(P-P-PROTIP: setting the blue and red channels with this function makes for a cool palette)


  function randomIntInRange(min, max) {
    return ~~(Math.random() * (max - min) + min);
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
      } else {
        target[prop] = object[prop];
      }
    }

    return target;
  }

  function chooseRandomFrom(array) {
    return array[~~(Math.random() * array.length)];
  }

  function createSupaDupaGradient(context) {
    var canvas = context.canvas,
        gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, canvas.width / 5, canvas.width / 2, canvas.height / 2, canvas.width * 0.7);
    gradient.addColorStop(0, '#550e8f');
    gradient.addColorStop(1, '#101010');
    return gradient;
  } //create a canvas with the same size of a given one and return its context


  function createCanvasFrom(canvas) {
    var referenceCanvas = document.createElement('canvas');
    var $referenceCanvas = referenceCanvas.getContext('2d');
    $referenceCanvas.canvas.width = referenceCanvas.width = canvas.width;
    $referenceCanvas.canvas.height = referenceCanvas.height = canvas.height;
    return $referenceCanvas;
  } //create a new canvas fitting it inside a parent container specified by the user


  function createFitCanvas(element) {
    var canvas = document.createElement('canvas');
    var $canvas = canvas.getContext('2d');
    $canvas.canvas.width = canvas.width = element.offsetWidth;
    $canvas.canvas.height = canvas.height = element.offsetHeight;
    canvas.style.position = 'absolute'; //so it fits snuggly in its container

    element.append(canvas);
    return canvas;
  } //get active pixels from the canvas we are rendering the text to


  function getAlphaPixelsFromImage(imageData) {
    var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
    var alphaPixels = [];

    for (var i = 0, counter = 0; i < imageData.data.length; i++) {
      if (imageData.data[i]) {
        counter++;

        if ((i - 3) % 4 === 0 && counter % step === 0 && Math.random() > 0.5) {
          alphaPixels.push({
            r: imageData.data[i - 3],
            g: imageData.data[i - 2],
            b: imageData.data[i - 1],
            alpha: imageData.data[i],
            pixelIndex: (i - 3) / 4
          });
        }
      }
    }

    return alphaPixels;
  } //get an array of Floats containing the particle data we are etracting from our render text


  function getParticlesFromImage(imageData, _ref) {
    var particleProps = _ref.particleProps,
        particleMaxRadius = _ref.particleMaxRadius,
        pointSpacing = _ref.pointSpacing,
        palette = _ref.palette;
    var alphaPixels = getAlphaPixelsFromImage(imageData, pointSpacing);
    var particlesArray = new Float32Array(alphaPixels.length * particleProps);

    for (var i = 0, particlePointer = 0, x = undefined, y = undefined, color = undefined; i < alphaPixels.length; i++) {
      if (palette) {
        color = chooseRandomFrom(palette);
      }

      x = alphaPixels[i].pixelIndex % imageData.width;
      y = alphaPixels[i].pixelIndex / imageData.width;
      particlePointer = i * particleProps;
      particlesArray[particlePointer++] = x; //position.x ========= +0 (aka particlePointer's current value, aka a particle's address in memory)

      particlesArray[particlePointer++] = y; //position.y ========= +1

      particlesArray[particlePointer++] = x; //targetPosition.x === +2

      particlesArray[particlePointer++] = y; //targetPosition.y === +3

      particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.x ====== +4

      particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.y ====== +5

      particlesArray[particlePointer++] = randomInRange(-1, 1); //particle.direction.x ============= +6

      particlesArray[particlePointer++] = randomInRange(-1, 1); //particle.direction.y ============= +7

      particlesArray[particlePointer++] = randomInRange(0.5, particleMaxRadius); //particle.radius === +8
      //colorRGBA values for each particle

      particlesArray[particlePointer++] = palette ? color["r"] : alphaPixels[i].r; //particles's color's "red" channel ===== +9

      particlesArray[particlePointer++] = palette ? color["g"] : alphaPixels[i].g; //particles's color's "green" channel === +10

      particlesArray[particlePointer++] = palette ? color["b"] : alphaPixels[i].b; //particles's color's "blue" channel ==== +11

      particlesArray[particlePointer] = alphaPixels[i].alpha; //particles's color's "alpha" channel ====================== +12
    }

    return particlesArray;
  } /////////////
  // CLASSES //
  /////////////


  var ParticleText = /*#__PURE__*/function () {
    function ParticleText(string, element) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _classCallCheck(this, ParticleText);

      _defineProperty(this, "animate", function () {
        _this.renderParticles(_this.settings.particles);

        _this.frameID = window.requestAnimationFrame(_this.animate);
      });

      var _particleProps = 13; //<----- you shouldn't touch this guy right here, but I ain't your dad, so if you really want to, go ahead and change it
      //setting up the canvases needed for ParticleText

      var canvas = createFitCanvas(element);
      var $referenceCanvas = createCanvasFrom(canvas);
      var _defaults = {
        particles: {
          //canvas background color
          background: undefined,
          //particle shape
          pointSpacing: 5,
          particleMaxRadius: 2,
          palette: undefined,
          //particle motion
          revolutionRadius: 2,
          revolutionSlowness: 5,
          //only update half of the particles each cycle, repaint every other cycle
          enhancedRendering: true
        },
        //text default settings
        text: {
          fontSize: 150,
          fontFamily: 'serif',
          padding: 50,
          lineHeight: undefined
        }
      }; //deep merge user supplied arguments and the defaults

      this.settings = mergeObjects(_defaults, options, true); //I am adding this property later simply because I don't want the user to change it easily
      //(If you are a professional reading this, how would you go about doing this in a cleaner way?? Comment below to let me know, it would be greatly appreciated!)

      this.settings.particles.particleProps = _particleProps; //reference to the parent element of the rendering canvas

      this.parent = element; //the actual canvas element we are using to display the animation on the page

      this.canvas = canvas; //get the rendering context for our super dupa fly particles!

      this.context = canvas.getContext('2d'); //create a new instance of Text passing all of the text properties

      this.text = new Text(string, $referenceCanvas, this.settings.text).initialise(); //extract our particles from the canvas stored in memory that we are using to draw our text reference

      this.particles = getParticlesFromImage(this.text.image, this.settings.particles); //create the pointer that will let us navigate through the particle array (which is a Float32Array)

      this.particlePointer = null; //I am admittedly being a bit cheeky here... With enhancedRendering we are only updating half of the particles each cycle and rendering all of them at once every other cycle

      this.enhancedRendering = this.settings.particles.enhancedRendering ? {
        lastUpdated: 0,
        half: Math.floor(this.particles.length / 2),
        ready: false
      } : false; //log wether we are using the enhancedRendering utility

      if (this.enhancedRendering) console.log('enhancedRendering is active'); //will hold the ID frame

      this.frameID = undefined;
    } //change the text's object string and refresh the particle array


    _createClass(ParticleText, [{
      key: "updateText",
      value: function updateText(string) {
        this.text.update(string);
        this.particles = getParticlesFromImage(this.text.image, this.settings.particles);
      } //update a single particle

    }, {
      key: "updateCurrentParticle",
      value: function updateCurrentParticle(_ref2) {
        var revolutionSlowness = _ref2.revolutionSlowness,
            revolutionRadius = _ref2.revolutionRadius;
        this.particles[this.particlePointer + 4] += this.particles[this.particlePointer + 6]; //add the direction.x value of the particle to its movement's progression x value

        this.particles[this.particlePointer + 5] += this.particles[this.particlePointer + 7]; //add the direction.y value of the particle to its movement's progression y value

        this.particles[this.particlePointer] = this.particles[this.particlePointer + 2] + COS(this.particles[this.particlePointer + 4] / revolutionSlowness) * revolutionRadius; // if you are wondering what this is I recommend checking this resource ---> https://en.wikipedia.org/wiki/Lissajous_orbit

        this.particles[this.particlePointer + 1] = this.particles[this.particlePointer + 3] + SIN(this.particles[this.particlePointer + 5] / revolutionSlowness) * revolutionRadius; // basically it's a clever way of achieveing pseudo random trajectories using 2d particles
      } //draw a single particle

    }, {
      key: "drawCurrentParticle",
      value: function drawCurrentParticle() {
        this.context.fillStyle = "rgba(".concat(this.particles[this.particlePointer + 9], ", ").concat(this.particles[this.particlePointer + 10], ", ").concat(this.particles[this.particlePointer + 11], ", ").concat(this.particles[this.particlePointer + 12], ")");
        this.context.beginPath();
        this.context.arc(this.particles[this.particlePointer], this.particles[this.particlePointer + 1], this.particles[this.particlePointer + 8], 0, PI2);
        this.context.fill();
      } //get canvas ready for a repaint by either clearing it or drawing a background on top of it, up to you

    }, {
      key: "prepareCanvas",
      value: function prepareCanvas(_ref3) {
        var background = _ref3.background;

        if (background) {
          this.context.fillStyle = background;
          this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        } else {
          this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        }
      }
    }, {
      key: "setBackground",
      value: function setBackground(background) {
        this.settings.particles.background = background;
      } //the heart of the rendering process

    }, {
      key: "renderParticles",
      value: function renderParticles(particleSettings) {
        if (this.enchancedRendering) {
          if (this.enchancedRendering.ready) {
            this.prepareCanvas(particleSettings);

            for (this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += particleSettings.particleProps) {
              this.drawCurrentParticle();
            }

            this.enchancedRendering.ready = false;
            this.enchancedRendering.lastUpdated = 0;
          } else {
            for (this.particlePointer = this.enchancedRendering.lastUpdated; this.particlePointer < (this.particlePointer === 0 ? this.enchancedRendering.half : this.particles.length); this.enchancedRendering.lastUpdated += particleSettings.particleProps, this.particlePointer += particleSettings.particleProps) {
              this.updateCurrentParticle(particleSettings);
            }

            if (this.enchancedRendering.lastUpdated === this.particles.length) {
              this.enchancedRendering.ready = true;
              this.enchancedRendering.lastUpdated = 0;
            }
          }
        } else {
          this.prepareCanvas(particleSettings);

          for (this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += particleSettings.particleProps) {
            this.updateCurrentParticle(particleSettings);
            this.drawCurrentParticle();
          }
        }
      }
    }, {
      key: "resize",
      value: function resize() {
        this.context.canvas.width = this.canvas.width = this.parent.offsetWidth;
        this.context.canvas.height = this.canvas.height = this.parent.offsetHeight;
        this.text.resize(this.canvas);
        this.particles = getParticlesFromImage(this.text.image, this.settings.particles);
      } //function to kick off the animation

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
      this.image = undefined;
      this.lineHeight = options.lineHeight || options.fontSize;
      this.optionsReference = options; //set default baseline and text horizontal alignment in our reference canvas

      this.context.textBaseline = this.optionsReference.textBaseline = 'top';
      this.context.textAlign = this.optionsReference.textAlign = 'center';
    } //format the string to make it look a little nicer and well centered


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
          this.context.fillText(finalText[i], this.padding + this.context.canvas.width / 2, this.context.canvas.height / 2 - totalTextHeight / 2 + this.lineHeight * i);
        }

        this.image = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);
      } //initilise this Text instance

    }, {
      key: "initialise",
      value: function initialise() {
        this.renderFormattedString();
        return this;
      } //change string and update the imageData property

    }, {
      key: "update",
      value: function update(string) {
        this.string = string;
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
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
    }, {
      key: "resize",
      value: function resize(mainCanvas) {
        this.context.canvas.width = mainCanvas.width;
        this.context.canvas.height = mainCanvas.height; //reset last context

        this.fontFamily = this.optionsReference.fontFamily;
        this.fontSize = this.optionsReference.fontSize;
        this.font = this.context.font = "".concat(this.fontSize, "px ").concat(this.fontFamily);
        this.lineHeight = this.optionsReference.lineHeight || this.optionsReference.fontSize;
        this.context.textBaseline = this.optionsReference.textBaseline;
        this.context.textAlign = this.optionsReference.textAlign;
        this.renderFormattedString();
      }
    }]);

    return Text;
  }(); //////////////////
  // ALL THE REST //
  //////////////////
  //this will be the container for our particle animation


  var textContainer = document.getElementById('text-container'); //SUPER DUPA FLY!

  var STRING = "Supa Dupa Fly!"; //create the particle text (play around with the settings if you have a minute, it's quite fun!)
  //I'll throw this on GitHub too, if anyone wants to fork it. Cheers!

  var T = new ParticleText(STRING, textContainer, {
    particles: {
      enhancedRendering: true,
      pointSpacing: 5,
      particleMaxRadius: 2.5,
      revolutionRadius: 3,
      palette: [{
        r: 250,
        g: 0,
        b: 0
      }, {
        r: 245,
        g: 232,
        b: 47
      }, {
        r: 166,
        g: 230,
        b: 48
      }, {
        r: 76,
        g: 184,
        b: 245
      }] // <---- these colors are defo SUPA DUPA FLY!

    },
    text: {
      fontFamily: 'Rock Salt',
      padding: 20,
      fontSize: 130,
      lineHeight: 150
    }
  });
  var SUPADUPAGRADIENT = createSupaDupaGradient(T.context);
  T.setBackground(SUPADUPAGRADIENT); //do the thing

  T.animate(); //resize literally everything & adapt gradient background

  window.addEventListener('resize', function () {
    T.resize();
    SUPADUPAGRADIENT = createSupaDupaGradient(T.context);
    T.setBackground(SUPADUPAGRADIENT);
  }); //log how many particles are buzzing around

  console.log("Particles rendering: ".concat(T.particles.length / T.settings.particles.particleProps));
};

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map