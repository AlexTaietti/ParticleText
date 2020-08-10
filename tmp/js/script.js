"use strict";

window.onload = function () {
  var PARTICLES_PROPS = 13;
  var POINTS_SPACING = 7;
  var ROTATION_RADIUS = 2;
  var ROTATION_SLOWNESS = 5;
  var PARTICLES_MAX_RADIUS = 2;
  var FONT_SIZE = 100; //in 'px'

  var MOUSE_RADIUS = 10;
  var PI2 = Math.PI * 2;
  var SIN = Math.sin;
  var COS = Math.cos;
  var MAX_PS_PER_RENDER = 1000;
  var STRING = "Hello, Codepen! ❤︎";
  var PARTICLE_POINTER = null;

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  function distanceBetweenPoints(p1x, p1y, p2x, p2y) {
    return Math.sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
  } //get the document's height cross browser reliably


  function getDocumentHeight() {
    return Math.max(document.documentElement.clientHeight, document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight);
  } //get the document's width cross browser reliably


  function getDocumentWidth() {
    return Math.max(document.documentElement.clientWidth, document.body.scrollWidth, document.documentElement.scrollWidth, document.body.offsetWidth, document.documentElement.offsetWidth);
  }

  function resizeCanvas(canvas1, canvas2, canvasN) {
    for (var i = 0; i < arguments.length; i++) {
      arguments[i].width = getDocumentWidth();
      arguments[i].height = getDocumentHeight();
    }
  } //with step decide how dense the animation wll be (the bigger the step the less particles in the final product)


  function getParticleArrayFromImageData(imageData, step) {
    var activePixels = [];

    for (var i = 0, counter = 0; i < imageData.data.length; i++) {
      if (imageData.data[i]) {
        counter++;

        if (counter % step === 0 && Math.random() > 0.5) {
          activePixels.push((i - 3) / 4);
        }
      }
    }

    var particlesArray = new Float32Array(activePixels.length * PARTICLES_PROPS);

    for (var _i = 0, particlePointer = 0, x = undefined, y = undefined; _i < activePixels.length; _i++) {
      x = activePixels[_i] % imageData.width;
      y = activePixels[_i] / imageData.width;
      particlePointer = _i * PARTICLES_PROPS;
      particlesArray[particlePointer] = x; //position.x

      particlesArray[particlePointer + 1] = y; //position.y

      particlesArray[particlePointer + 2] = randomInRange(0.5, PARTICLES_MAX_RADIUS); //particle.radius

      particlesArray[particlePointer + 3] = 0; //velocity.x

      particlesArray[particlePointer + 4] = 0; //velocity.y

      particlesArray[particlePointer + 5] = 0; //acceleration.x

      particlesArray[particlePointer + 6] = 0; //acceleration.y

      particlesArray[particlePointer + 7] = x; //targetPosition.x

      particlesArray[particlePointer + 8] = y; //targetPosition.y

      particlesArray[particlePointer + 9] = randomInRange(0, 1000); //particle.rotationProgress.x

      particlesArray[particlePointer + 10] = randomInRange(0, 1000); //particle.rotationProgress.y

      particlesArray[particlePointer + 11] = randomInRange(-1, 1); //particle.direction.x

      particlesArray[particlePointer + 12] = randomInRange(-1, 1); //particle.direction.y
    }

    return particlesArray;
  }

  function updateParticle() {
    particles[PARTICLE_POINTER + 9] += particles[PARTICLE_POINTER + 11]; //add the direction.x value of the particle to its movement's progression x value

    particles[PARTICLE_POINTER + 10] += particles[PARTICLE_POINTER + 12]; //add the direction.y value of the particle to its movement's progression y value

    particles[PARTICLE_POINTER] = particles[PARTICLE_POINTER + 7] + COS(particles[PARTICLE_POINTER + 9] / ROTATION_SLOWNESS) * ROTATION_RADIUS;
    particles[PARTICLE_POINTER + 1] = particles[PARTICLE_POINTER + 8] + SIN(particles[PARTICLE_POINTER + 10] / ROTATION_SLOWNESS) * ROTATION_RADIUS;
  }

  function drawParticle() {
    $app.beginPath();
    $app.arc(particles[PARTICLE_POINTER], particles[PARTICLE_POINTER + 1], particles[PARTICLE_POINTER + 2], 0, PI2);
    $app.fill();
  }

  function renderParticles() {
    $app.clearRect(0, 0, $app.canvas.width, $app.canvas.height);

    for (PARTICLE_POINTER = 0; PARTICLE_POINTER < particles.length; PARTICLE_POINTER += PARTICLES_PROPS) {
      updateParticle();
      drawParticle();
    }
  }

  function animate() {
    renderParticles();
    window.requestAnimationFrame(animate.bind(this));
  }

  var $ = document.querySelector.bind(document);
  var $$ = document.querySelectorAll.bind(document);
  var app = $('#app');
  var $app = app.getContext('2d');

  var _app = document.createElement("canvas");

  var $_app = _app.getContext('2d');

  var topo = {
    x: undefined,
    y: undefined,
    radius: MOUSE_RADIUS
  };
  resizeCanvas(app, _app);
  $_app.font = "".concat(FONT_SIZE, "px serif");
  $_app.textAlign = "center";
  $_app.textBaseline = "middle"; //begin drawing

  $_app.beginPath();
  $_app.fillText(STRING, $app.canvas.width / 2, $app.canvas.height / 2);
  $_app.closePath();
  var imageData = $_app.getImageData(0, 0, $_app.canvas.width, $_app.canvas.height);
  var particles = getParticleArrayFromImageData(imageData, POINTS_SPACING);
  app.addEventListener('mousemove', function (e) {
    topo.x = e.clientX;
    topo.y = e.clientY;
  });
  animate(); //resize canvases on window resize

  window.addEventListener('resize', resizeCanvas.bind(this, app, _app));
  console.log("Particles rendering: ".concat(particles.length / PARTICLES_PROPS));
};