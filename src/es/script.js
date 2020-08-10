window.onload = function () {

	const PI2                  = Math.PI * 2;
	const SIN                  = Math.sin;
	const COS                  = Math.cos;
	const STRING               = "Hello, Codepen! ❤︎";


	function randomInRange(min, max) { return Math.random() * (max - min) + min; }

  function distanceBetweenPoints (p1x, p1y, p2x, p2y) { return Math.sqrt( ( (p1x - p2x) * (p1x - p2x) ) + (p1y - p2y) * (p1y - p2y) ); }

	function mergeObjects(target, object, deep = false) {

		for(let prop in object){
			if(target.hasOwnProperty(prop)){
				if(typeof object[prop] === 'object' && deep){
					target[prop] = mergeObjects(target[prop], object[prop], true);
				} else {
					target[prop] = object[prop];
				}
			}
		}

  	return target;

	}


	class ParticleText {

		constructor (string, element, options = {}) {

			//setting up the canvases needed for ParticleText
			const canvas = createFitCanvas(element);
			const $referenceCanvas = createCanvasFrom(canvas);

			const _defaults = {

					particles: {

						//general
						particleProps: 9, //should not be changed!!!

						//particle shape
						pointSpacing      : 7,
						particleMaxRadius:  2,

						//particle motion
						revolutionRadius  : 2,
						revolutionSlowness: 5

					},

					text: {

						fontSize: 100,
						fontFamily: 'serif',
						position: { x: $referenceCanvas.canvas.width / 2, y: $referenceCanvas.canvas.height / 2 }

					}

			};

			this.defaults = mergeObjects(_defaults, options, true);

			this.context = canvas.getContext('2d');

			this.text = new Text(string, $referenceCanvas, this.defaults.text).initialise();

			this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);
			this.particlePointer = null;

			this.frameID = undefined;

		}

		updateText (string) {
			this.text.update(string);
			this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);
		}

		updateCurrentParticle ({ revolutionSlowness, revolutionRadius }) {

			this.particles[this.particlePointer + 4] += this.particles[this.particlePointer + 6]; //add the direction.x value of the particle to its movement's progression x value
			this.particles[this.particlePointer + 5] += this.particles[this.particlePointer + 7]; //add the direction.y value of the particle to its movement's progression y value

			this.particles[this.particlePointer]      = this.particles[this.particlePointer + 2] + COS(this.particles[this.particlePointer + 4] / revolutionSlowness) * revolutionRadius;
			this.particles[this.particlePointer + 1]  = this.particles[this.particlePointer + 3] + SIN(this.particles[this.particlePointer + 5] / revolutionSlowness) * revolutionRadius;

		}

		drawCurrentParticle () {
			this.context.beginPath();
			this.context.arc(this.particles[this.particlePointer], this.particles[this.particlePointer + 1], this.particles[this.particlePointer + 8], 0, PI2);
			this.context.fill();
		}

		renderParticles (particlesOptions) {

			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

			for(this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += particlesOptions.particleProps){
				this.updateCurrentParticle(particlesOptions);
				this.drawCurrentParticle();
			}

		}

		animate = () => {
			this.renderParticles(this.defaults.particles);
			this.frameID = window.requestAnimationFrame(this.animate);
		}


	}



	class Text {

		constructor (string, context, options) {

			this.string     = string;
			this.context    = context;
			this.fontFamily = options.fontFamily;
			this.fontSize   = options.fontSize;
			this.font       = `${this.fontSize}px ${this.fontFamily}`;
			this.position   = options.position;
			this.image      = undefined;

		}

		initialise () {
			this.render();
			return this;
		}

		update (string) {
			this.string = string;
			this.render();
			return this;
		}

		setFontSize (fontSize) {
			this.fontSize = fontSize;
			this.font = `${ this.fontSize }px ${ this.fontFamily }`
			return this;
		}

		setFontFamily (fontFamily) {
			this.fontFamily = fontFamily;
			this.font = `${ this.fontSize }px ${ this.fontFamily }`
			return this;
		}

		setTextProps () {
			this.context.font = `${this.fontSize}px ${this.fontFamily}`
			this.context.textAlign = "center";
			this.context.textBaseline = "middle";
		}

		render () {

			this.setTextProps();
			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
			this.context.beginPath();
			this.context.fillText(this.string, this.position.x, this.position.y);

			this.image = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

		}

	}


	function createCanvasFrom (canvas) {

		const referenceCanvas = document.createElement('canvas');

		const $referenceCanvas = referenceCanvas.getContext('2d');

		$referenceCanvas.canvas.width  = referenceCanvas.width  = canvas.width;
		$referenceCanvas.canvas.height = referenceCanvas.height = canvas.height;

		return $referenceCanvas;

	}


	function createFitCanvas(element) {

		const canvas = document.createElement('canvas');
		const $canvas = canvas.getContext('2d');

		$canvas.canvas.width  = canvas.width  = element.offsetWidth;
		$canvas.canvas.height = canvas.height = element.offsetHeight;

		canvas.style.position = 'absolute'; //so it fits snuggly in its container

		element.append(canvas);

		return canvas;

	}


	function getAlphaPixelsFromImage (imageData, step = 2) {

		const alphaPixels = [];

		for(let i = 0, counter = 0; i < imageData.data.length; i++){

			if(imageData.data[i]) {

				counter++;

				if(counter % step === 0 && Math.random() > 0.5) {

					alphaPixels.push( (i - 3) / 4 );

				}

			}

		}

		return alphaPixels;

	}

	function getParticlesFromImage (imageData, { particleProps, particleMaxRadius, pointSpacing }) {

		const alphaPixels = getAlphaPixelsFromImage(imageData, pointSpacing);

		const particlesArray = new Float32Array(alphaPixels.length * particleProps);

		for(let i = 0, particlePointer = 0, x = undefined, y = undefined; i < alphaPixels.length; i++){

			x = alphaPixels[i] % imageData.width;
			y = alphaPixels[i] / imageData.width;

			particlePointer = i * particleProps;

			particlesArray[particlePointer++] = x; //position.x ========= +0 (aka particlePointer's current value)
			particlesArray[particlePointer++] = y; //position.y ========= +1
			particlesArray[particlePointer++] = x; //targetPosition.x === +2
			particlesArray[particlePointer++] = y; //targetPosition.y === +3
			particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.x ========= +4
			particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.y ========= +5
			particlesArray[particlePointer++] = randomInRange(-1, 1);   //particle.direction.x ================ +6
			particlesArray[particlePointer++] = randomInRange(-1, 1);   //particle.direction.y ================ +7
			particlesArray[particlePointer]   = randomInRange(0.5, particleMaxRadius); //particle.radius === +8

		}

		return particlesArray;

	}

	const textContainer = document.getElementById('text-container');

	const T = new ParticleText(STRING, textContainer, {

		particles: {
			pointSpacing: 4,
			particleMaxRadius: 1.5,
			revolutionRadius: 1.5,
			revolutionSlowness: 6
		},

		text:{
			fontSize: 90,
			fontFamily: 'serif',
			position: { x:500, y: 300 }
		}

	});

	T.animate();

	console.log(`Particles rendering: ${ T.particles.length / T.defaults.particles.particleProps }`);

};
