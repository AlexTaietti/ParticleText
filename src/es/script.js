window.onload = function () {

	const PARTICLES_PROPS      = 13;
	const POINTS_SPACING       = 7;
	const ROTATION_RADIUS      = 2;
	const ROTATION_SLOWNESS    = 5;
	const PARTICLES_MAX_RADIUS = 2;
	const FONT_SIZE            = 150; //in 'px'
	const MOUSE_RADIUS         = 10;
	const PI2                  = Math.PI * 2;
	const SIN                  = Math.sin;
	const COS                  = Math.cos;
	const MAX_PS_PER_RENDER    = 1000;

	let PARTICLE_POINTER = null;

	function randomInRange(min, max) {
    	return Math.random() * (max - min) + min;
  	}


  	function distanceBetweenPoints (p1x, p1y, p2x, p2y) {

		return Math.sqrt( ( (p1x - p2x) * (p1x - p2x) ) + (p1y - p2y) * (p1y - p2y) );

	}

	//get the document's height cross browser reliably
	function getDocumentHeight() {

	    return Math.max(

	        document.documentElement.clientHeight,
	        document.body.scrollHeight,
	        document.documentElement.scrollHeight,
	        document.body.offsetHeight,
	        document.documentElement.offsetHeight

	    );

	}

	//get the document's width cross browser reliably
	function getDocumentWidth() {

	    return Math.max(

	        document.documentElement.clientWidth,
	        document.body.scrollWidth,
	        document.documentElement.scrollWidth,
	        document.body.offsetWidth,
	        document.documentElement.offsetWidth

	    );

	}

	function resizeCanvas (canvas1, canvas2, canvasn){

		for(let i = 0; i < arguments.length; i++){
			arguments[i].width  = getDocumentWidth();
			arguments[i].height = getDocumentHeight();
		}

	}


	//with step decide how dense the animation wll be (the bigger the step the less particles in the final product)
	function getParticleArrayFromImageData (imageData, step) {

		const activePixels = [];

		for(let i = 0, counter = 0; i < imageData.data.length; i++){

			if(imageData.data[i]) {

				counter++;

				if(counter % step === 0 && Math.random() > 0.5) {

					activePixels.push( (i - 3) / 4 );

				}

			}

		}

		const particlesArray = new Float32Array(activePixels.length * PARTICLES_PROPS);

		for(let i = 0, particlePointer = 0, x = undefined, y = undefined; i < activePixels.length; i++){

			x = activePixels[i] % imageData.width;
			y = activePixels[i] / imageData.width;

			particlePointer = i * PARTICLES_PROPS;

			particlesArray[particlePointer]      = x; //position.x
			particlesArray[particlePointer + 1]  = y; //position.y
			particlesArray[particlePointer + 2]  = randomInRange(0.5, PARTICLES_MAX_RADIUS); //particle.radius
			particlesArray[particlePointer + 3]  = 0; //velocity.x
			particlesArray[particlePointer + 4]  = 0; //velocity.y
			particlesArray[particlePointer + 5]  = 0; //acceleration.x
			particlesArray[particlePointer + 6]  = 0; //acceleration.y
			particlesArray[particlePointer + 7]  = x; //targetPosition.x
			particlesArray[particlePointer + 8]  = y; //targetPosition.y
			particlesArray[particlePointer + 9]  = randomInRange(0, 1000); //particle.rotationProgress.x
			particlesArray[particlePointer + 10] = randomInRange(0, 1000); //particle.rotationProgress.y
			particlesArray[particlePointer + 11] = randomInRange(-1, 1);   //particle.direction.x
			particlesArray[particlePointer + 12] = randomInRange(-1, 1);   //particle.direction.y

		}

		return particlesArray;

	}



	function updateParticle () {

		particles[PARTICLE_POINTER + 9]  += particles[PARTICLE_POINTER + 11]; //add the direction.x value of the particle to its movement's progression x value
		particles[PARTICLE_POINTER + 10] += particles[PARTICLE_POINTER + 12]; //add the direction.y value of the particle to its movement's progression y value

		particles[PARTICLE_POINTER]      = particles[PARTICLE_POINTER + 7] + COS(particles[PARTICLE_POINTER + 9] / ROTATION_SLOWNESS) * ROTATION_RADIUS;
		particles[PARTICLE_POINTER + 1]  = particles[PARTICLE_POINTER + 8] + SIN(particles[PARTICLE_POINTER + 10] / ROTATION_SLOWNESS) * ROTATION_RADIUS;

	}

	function drawParticle () {

		$app.beginPath();
		$app.arc(particles[PARTICLE_POINTER], particles[PARTICLE_POINTER + 1], particles[PARTICLE_POINTER + 2], 0, PI2);
		$app.fill();


	}

	function renderParticles () {

		$app.clearRect(0, 0, $app.canvas.width, $app.canvas.height);

		for(PARTICLE_POINTER = 0; PARTICLE_POINTER < particles.length; PARTICLE_POINTER += PARTICLES_PROPS){

			updateParticle();
			drawParticle();

		}


	}

	function animate () {

		renderParticles();
		window.requestAnimationFrame(animate.bind(this));

	}


	const $  = document.querySelector.bind(document);
	const $$ = document.querySelectorAll.bind(document);

	const app  = $('#app');
	const $app = app.getContext('2d');

	const _app = document.createElement("canvas");
	const $_app = _app.getContext('2d');

	const topo = {

		x: undefined,
		y: undefined,
		radius: MOUSE_RADIUS

	};

	resizeCanvas(app, _app);

	$_app.font = `${FONT_SIZE}px serif`;
	$_app.textAlign = "center";
	$_app.textBaseline = "middle";


	//begin drawing
	$_app.beginPath();

	$_app.fillText("Hello, I'm Alex!", $app.canvas.width/2, $app.canvas.height/2);

	$_app.closePath();

	let imageData = $_app.getImageData(0, 0, $_app.canvas.width, $_app.canvas.height);

	const particles = getParticleArrayFromImageData(imageData, POINTS_SPACING);

	app.addEventListener('mousemove', function(e){

		topo.x = e.clientX;
		topo.y = e.clientY;

	});

	animate();

	//resize canvases on window resize
	window.addEventListener('resize', resizeCanvas.bind(this, app, _app));

	console.log(`Particles rendering: ${particles.length / PARTICLES_PROPS}`);

};
