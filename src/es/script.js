window.onload = function () {

	//here are some untouchable things
	const PARTICLE_PROPS = 13; // <---- especially this guy
	const PI2            = Math.PI * 2;
	const SIN            = Math.sin;
	const COS            = Math.cos;

	//some utility functions
	function randomInRange(min, max) { return Math.random() * (max - min) + min; }

	function randomIntInRange(min, max) { return ~~( Math.random() * (max - min) + min ); }

  function distanceBetweenPoints (p1x, p1y, p2x, p2y) { return Math.sqrt( ( (p1x - p2x) * (p1x - p2x) ) + (p1y - p2y) * (p1y - p2y) ); }

	function mergeObjects(target, object, deep = false) {

		for(let prop in object){
			if(target.hasOwnProperty(prop)){
				if(typeof object[prop] === 'object' && deep){
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

	function chooseRandomFrom (array) { return array[~~(Math.random() * array.length)]; }


	class ParticleText {


		constructor (string, element, options = {}) {

			//setting up the canvases needed for ParticleText
			const canvas = createFitCanvas(element);
			const $referenceCanvas = createCanvasFrom(canvas);

			const _defaults = {

				particles: {

					//canvas background color
					background: undefined,

					//particle shape
					pointSpacing     : 5,
					particleMaxRadius: 2,
					palette: [],

					//particle motion
					revolutionRadius:   2,
					revolutionSlowness: 5,

					//only update half of the particles each cycle, repaint every other cycle
					enhancedRendering: true

				},

				text: {

					fontSize: 150,
					fontFamily: 'serif',
					padding: 50,
					lineHeight: undefined

				}

			};

			//deep merge user supplied arguments and the defaults
			this.defaults = mergeObjects(_defaults, options, true);

			//reference to the parent element of the rendering canvas
			this.parent = element;

			//the actual canvas element we are using to display the animation on the pahe
			this.canvas = canvas;

			//get the rendering context for our super dupa fly particles!
			this.context = canvas.getContext('2d');

			//create a new instance of Text passing all of the text properties
			this.text = new Text(string, $referenceCanvas, this.defaults.text).initialise();

			//extract our particles from the canvas stored in memory that we are using to draw our text reference
			this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);

			//create the pointer that will let us navigate through the particle array (which is a Float32Array)
			this.particlePointer = null;

			//I am admittedly being a bit cheeky here... With enhancedRendering we are only updating half of the particles each cycle and rendering all of them at once every other cycle
			this.enhancedRendering = this.defaults.particles.enhancedRendering ? {

				lastUpdated: 0,
				half: Math.floor(this.particles.length / 2),
				ready: false

			} : false;

			//log wether we are using the enhancedRendering utility
			if(this.enhancedRendering) console.log('enhancedRendering is active');

			//will hold the ID frame
			this.frameID = undefined;

		}


		//change the text's object string and refresh th particle array
		updateText (string) {
			this.text.update(string);
			this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);
		}


		//update a single particle
		updateCurrentParticle ({ revolutionSlowness, revolutionRadius }) {

			this.particles[this.particlePointer + 4] += this.particles[this.particlePointer + 6]; //add the direction.x value of the particle to its movement's progression x value
			this.particles[this.particlePointer + 5] += this.particles[this.particlePointer + 7]; //add the direction.y value of the particle to its movement's progression y value

			this.particles[this.particlePointer]      = this.particles[this.particlePointer + 2] + COS(this.particles[this.particlePointer + 4] / revolutionSlowness) * revolutionRadius; // if you are wondering what this is I recommend checking this resource ---> https://en.wikipedia.org/wiki/Lissajous_orbit
			this.particles[this.particlePointer + 1]  = this.particles[this.particlePointer + 3] + SIN(this.particles[this.particlePointer + 5] / revolutionSlowness) * revolutionRadius; // basically it's a clever way of achieveing pseudo random trajectories using 2d particles

		}


		//draw a single particle
		drawCurrentParticle () {
			this.context.fillStyle = `rgba(${this.particles[this.particlePointer + 9]}, ${this.particles[this.particlePointer + 10]}, ${this.particles[this.particlePointer + 11]}, ${this.particles[this.particlePointer + 12]})`;
			this.context.beginPath();
			this.context.arc(this.particles[this.particlePointer], this.particles[this.particlePointer + 1], this.particles[this.particlePointer + 8], 0, PI2);
			this.context.fill();
		}


		//get canvas ready for a repaintby either clearing it or drawing a background on top of it, up to you
		prepareCanvas ({background}) {

			if(background){

				this.context.fillStyle = background;
				this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);

			} else {

				this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

			}

		}


		//the heart of the rendering process
		renderParticles (particlesOptions) {

			if(this.enchancedRendering){

				if(this.enchancedRendering.ready){

					this.prepareCanvas(particlesOptions);

					for(this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += PARTICLE_PROPS){
						this.drawCurrentParticle();
					}

					this.enchancedRendering.ready = false;
					this.enchancedRendering.lastUpdated = 0;

				} else {

					for(this.particlePointer = this.enchancedRendering.lastUpdated; this.particlePointer < ((this.particlePointer === 0) ? this.enchancedRendering.half : this.particles.length) ; this.enchancedRendering.lastUpdated+= PARTICLE_PROPS, this.particlePointer += PARTICLE_PROPS){
						this.updateCurrentParticle(particlesOptions);
					}

					if(this.enchancedRendering.lastUpdated === this.particles.length) {
						this.enchancedRendering.ready = true;
						this.enchancedRendering.lastUpdated = 0;
					}

				}

			} else {

				this.prepareCanvas(particlesOptions);

				for(this.particlePointer = 0; this.particlePointer < this.particles.length; this.particlePointer += PARTICLE_PROPS){
					this.updateCurrentParticle(particlesOptions);
					this.drawCurrentParticle();
				}

			}

		}


		resize () {

			this.context.canvas.width  = this.canvas.width  = this.parent.offsetWidth;
			this.context.canvas.height = this.canvas.height = this.parent.offsetHeight;
			this.text.resize(this.canvas);
			this.particles = getParticlesFromImage(this.text.image, this.defaults.particles);

		}


		//function to kick the animation off
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
			this.font       = this.context.font = `${this.fontSize}px ${this.fontFamily}`;
			this.padding    = options.padding;
			this.image      = undefined;
			this.lineHeight = options.lineHeight || options.fontSize;

			this.optionsReference = options;

			//set default baseline and text horizontal alignment in our reference canvas
			this.context.textBaseline = this.optionsReference.textBaseline = 'top';
			this.context.textAlign    = this.optionsReference.textAlign    = 'center';

		}


		//format the string to make it look a little nicer and well centered
		renderFormattedString () {

			const words = this.string.split(" "), finalText = [];

			let line = "", x, y, i;

	    for (i = 0; i < words.length; i++) {

				if (this.context.measureText(line + words[i] + " ").width >= this.context.canvas.width - this.padding * 2) {
	        finalText.push(line);
	        line = "";
	      }

				line += words[i] + " ";

			}

			finalText.push(line);

			const totalTextHeight = this.fontSize * finalText.length;

	    for (i = 0; i < finalText.length; i++) {
	      this.context.fillText(finalText[i], this.padding + this.context.canvas.width / 2, (this.context.canvas.height / 2 - totalTextHeight / 2) + this.lineHeight * i);
	    }

			this.image = this.context.getImageData(0, 0, this.context.canvas.width, this.context.canvas.height);

	  }


		//initilise this Text instance
		initialise () {
			this.renderFormattedString();
			return this;
		}


		//change string and update the imageData property
		update (string) {

			this.string = string;

			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

			this.renderFormattedString();

			return this;

		}


		setFontSize (fontSize) {
			this.fontSize = fontSize;
			this.font = this.context.font = `${ this.fontSize }px ${ this.fontFamily }`
			return this;
		}


		setFontFamily (fontFamily) {
			this.fontFamily = fontFamily;
			this.font = this.context.font = `${ this.fontSize }px ${ this.fontFamily }`
			return this;
		}


		resize (mainCanvas) {

			this.context.canvas.width  = mainCanvas.width;
			this.context.canvas.height = mainCanvas.height;

			//reset last context
			this.fontFamily   = this.optionsReference.fontFamily;
			this.fontSize     = this.optionsReference.fontSize;
			this.font         = this.context.font = `${this.fontSize}px ${this.fontFamily}`;
			this.lineHeight   = this.optionsReference.lineHeight || this.optionsReference.fontSize;

			this.context.textBaseline = this.optionsReference.textBaseline;
			this.context.textAlign    = this.optionsReference.textAlign;

			this.renderFormattedString();

		}

	}



	//create a canvas with the same size of a given one and return its context
	function createCanvasFrom (canvas) {

		const referenceCanvas = document.createElement('canvas');

		const $referenceCanvas = referenceCanvas.getContext('2d');

		$referenceCanvas.canvas.width  = referenceCanvas.width  = canvas.width;
		$referenceCanvas.canvas.height = referenceCanvas.height = canvas.height;

		return $referenceCanvas;

	}


	//create a new canvas fitting it inside a parent container specified by the user
	function createFitCanvas(element) {

		const canvas = document.createElement('canvas');
		const $canvas = canvas.getContext('2d');

		$canvas.canvas.width  = canvas.width  = element.offsetWidth;
		$canvas.canvas.height = canvas.height = element.offsetHeight;

		canvas.style.position = 'absolute'; //so it fits snuggly in its container

		element.append(canvas);

		return canvas;

	}


	//get active pixels from the canvas we are rendering the text to
	function getAlphaPixelsFromImage (imageData, step = 2) {

		const alphaPixels = [];

		for(let i = 0, counter = 0; i < imageData.data.length; i++){

			if(imageData.data[i]) {

				counter++;

				if( (i - 3) % 4 === 0 && counter % step === 0 && Math.random() > 0.5) {

					alphaPixels.push({
							r:     		   imageData.data[i - 3],
							g:           imageData.data[i - 2],
							b:           imageData.data[i - 1],
							alpha:       imageData.data[i],
							pixelIndex: (i - 3) / 4
					});

				}

			}

		}

		return alphaPixels;

	}


	//get an array of Floats containing the particle data we are etracting from our render text
	function getParticlesFromImage (imageData, { particleMaxRadius, pointSpacing, palette }) {

		const alphaPixels = getAlphaPixelsFromImage(imageData, pointSpacing);

		const particlesArray = new Float32Array(alphaPixels.length * PARTICLE_PROPS);

		for(let i = 0, particlePointer = 0, x = undefined, y = undefined, color = undefined; i < alphaPixels.length; i++){

			if(palette) { color = chooseRandomFrom(palette); }

			x = alphaPixels[i].pixelIndex % imageData.width;
			y = alphaPixels[i].pixelIndex / imageData.width;

			particlePointer = i * PARTICLE_PROPS;

			particlesArray[particlePointer++] = x; //position.x ========= +0 (aka particlePointer's current value, aka a particle's address in memory)
			particlesArray[particlePointer++] = y; //position.y ========= +1
			particlesArray[particlePointer++] = x; //targetPosition.x === +2
			particlesArray[particlePointer++] = y; //targetPosition.y === +3
			particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.x ====== +4
			particlesArray[particlePointer++] = randomInRange(0, 1000); //particle.rotationProgress.y ====== +5
			particlesArray[particlePointer++] = randomInRange(-1, 1);   //particle.direction.x ============= +6
			particlesArray[particlePointer++] = randomInRange(-1, 1);   //particle.direction.y ============= +7
			particlesArray[particlePointer++] = randomInRange(0.5, particleMaxRadius); //particle.radius === +8

			//colorRGBA values for each particle
			particlesArray[particlePointer++] = palette ? color["r"] : alphaPixels[i].r; //particles's color's "red" channel ===== +9
			particlesArray[particlePointer++] = palette ? color["g"] : alphaPixels[i].g; //particles's color's "green" channel === +10
			particlesArray[particlePointer++] = palette ? color["b"] : alphaPixels[i].b; //particles's color's "blue" channel ==== +11
			particlesArray[particlePointer]   = alphaPixels[i].alpha; //particles's color's "alpha" channel ====================== +12

		}

		return particlesArray;

	}


	//this will be the container for out particle animation
	const textContainer = document.getElementById('text-container');


	//SUPER DUPA FLY!
	const STRING = "Supa Dupa Fly!";


	//create the thingy (play around with the settings if you have a minute, it's quite fun!)
	const T = new ParticleText(STRING, textContainer, {

		particles: {
			enhancedRendering: true,
			pointSpacing: 3,
			background: '#1e0052',
			particleMaxRadius: 2,
			revolutionRadius: 2,
			palette: [{r: 250, g: 0, b: 0}, { r: 245, g: 232, b: 47 }, { r: 166, g: 230, b: 48 }, { r: 76, g: 184, b: 245 }] // <---- these colors are defo SUPA DUPA FLY!
		},

		text: {
			fontFamily: 'Rock Salt',
			padding: 20,
			fontSize: 100,
			lineHeight: 120
		}

	});


	//do the thing
	T.animate();

	//resize literally everything
	window.addEventListener('resize', function () { T.resize(); });

	//log how many particles are buzzing around
	console.log(`Particles rendering: ${ T.particles.length / PARTICLE_PROPS }`);

};
