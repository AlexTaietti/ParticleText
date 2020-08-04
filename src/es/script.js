window.onload = function () {

	const PARTICLES_PROPS      = 11;
	const POINTS_SPACING       = 4;
	const ROTATION_RADIUS      = 3;
	const ROTATION_SLOWNESS    = 17;
	const PARTICLES_MAX_RADIUS = 2;
	const FONT_SIZE            = 150; //in 'px'
	const MOUSE_RADIUS         = 10;

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

		for(let i = 0, x = undefined, y = undefined; i < activePixels.length; i++){

			x = activePixels[i] % imageData.width;
			y = activePixels[i] / imageData.width;

			particlesArray[i * PARTICLES_PROPS]      = x;    //position.x
			particlesArray[i * PARTICLES_PROPS + 1]  = y;    //position.y
			particlesArray[i * PARTICLES_PROPS + 2]  = randomInRange(0.5, PARTICLES_MAX_RADIUS);  //particle.radius
			particlesArray[i * PARTICLES_PROPS + 3]  = 0;    //velocity.x
			particlesArray[i * PARTICLES_PROPS + 4]  = 0;    //velocity.y
			particlesArray[i * PARTICLES_PROPS + 5]  = 0;    //acceleration.x
			particlesArray[i * PARTICLES_PROPS + 6]  = 0;    //acceleration.y
			particlesArray[i * PARTICLES_PROPS + 7]  = x;    //targetPosition.x
			particlesArray[i * PARTICLES_PROPS + 8]  = y;    //targetPosition.y
			particlesArray[i * PARTICLES_PROPS + 9]  = randomInRange(0, 1000); //particle.rotationProgress
			particlesArray[i * PARTICLES_PROPS + 10] = randomInRange(-1, 1);   //particle.direction

		}

		return particlesArray;

	}



	function updateParticles (particlesArray) {

		for(let i = 0, particlePointer = null; i < particlesArray.length / PARTICLES_PROPS; i++){

			particlePointer = i * PARTICLES_PROPS;

			particlesArray[particlePointer + 9] += particlesArray[particlePointer + 10]; //add the direction value of the particle to its movement's progression value
			particlesArray[particlePointer] = particlesArray[particlePointer + 7] + Math.cos(particlesArray[particlePointer + 9] / ROTATION_SLOWNESS) * ROTATION_RADIUS;
			particlesArray[particlePointer + 1] = particlesArray[particlePointer + 8] + Math.sin(particlesArray[particlePointer + 9] / ROTATION_SLOWNESS) * ROTATION_RADIUS;

		
		}

	}

	function renderParticles (particlesArray, context) {

		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		for(let i = 0; i < (particlesArray.length / PARTICLES_PROPS); i++){
			context.beginPath();
			context.arc(particlesArray[i * PARTICLES_PROPS], particlesArray[i * PARTICLES_PROPS + 1], particlesArray[i * PARTICLES_PROPS + 2], 0, Math.PI * 2);
			context.fill();
		}


	}

	function animate (particlesArray, context) {

		updateParticles(particlesArray);
		renderParticles(particlesArray, context);
		window.requestAnimationFrame(animate.bind(this, particlesArray, context));

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




	animate(particles, $app);


	//resize canvases on window resize
	window.addEventListener('resize', resizeCanvas.bind(this, app, _app));

	console.log(`Particles rendering: ${particles.length / PARTICLES_PROPS}`);

};