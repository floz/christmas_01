// bind

Function.prototype.bind = function( scope )
{
	var _function = this;
	return function()
	{
		return _function.apply( scope, arguments );
	}
}

// dom ready

$( document ).ready( function()	{

	if( Detector.webgl === false )
	{
		Detector.addGetWebGLMessage();
		return;
	}
	var app = new Application();
	app.load();
});

// Main Application

var Application = ( function()
{
	function Application()
	{
		this.domContainer = $( "#container" );

		this.skyColor = 0xff00ff;
	}
	Application.prototype.constructor = Application;

	Application.prototype.load = function load()
	{
		this.projectLoader = new ProjectLoader();
		this.projectLoader.signalLoaded.addOnce( this.onProjectLoaded, this );
	}

	Application.prototype.onProjectLoaded = function onProjectLoaded()
	{
		this.init();
	}

	Application.prototype.init = function init()
	{
		this.timeOnPath = 0;
		this.speed = 0.0125;
		this.acc = 0.00005;
		this.speedMax = 0.06;//0.06;
		this.part = 1;

		// Renderer
		this.renderer = new THREE.WebGLRenderer({
			  antialias: true
			, preserveDrawingBuffer: true
			, clearColor: this.skyColor
			, clearAlpha: 1
		});
		this.renderer.setFaceCulling( 0 );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColorHex(0x000000, 0);
		this.renderer.clear();
		this.domContainer.append( this.renderer.domElement );

		// Scene
		this.scene = new THREE.Scene();

		// Camera
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 25000 );
		this.camera.position.z = -60;
		this.camera.position.y = 30;
		//this.camera.rotation.x = -Math.PI * .1;
		//this.scene.add( this.camera );

		this.createLights();
		this.createExperiment();

		// Stats
		this.stats = new Stats();
		this.stats.domElement.style.position = "absolute";
		this.stats.domElement.style.top = "0px";
		container.appendChild( this.stats.domElement );

		this.animate();
	}

	Application.prototype.createLights = function createLights()
	{
		this.pointLight = new THREE.PointLight( 0xffffff, 1.0 );
		this.pointLight.position.z = 30;
		this.scene.add( this.pointLight );

		var light = new THREE.DirectionalLight( 0xff00ff, 1.3 );
		light.position.set( -100, 1, -100 );
		this.scene.add( light );

		light = new THREE.DirectionalLight( 0x0000ff, 0.1 );
		light.position.set( 100, 50, -100 );
		this.scene.add( light );
	}

	Application.prototype.createExperiment = function createExperiment()
	{
		this.svgReader = new SVGReader();
		this.svgReader.parse();

		this.createFloor();
		this.createObjects();
		this.createPaths();
	}

	Application.prototype.createFloor = function createFloor()
	{
		this.floor = new Floor( this.svgReader.data[ "zone" ] );
		this.scene.add( this.floor );
	}

	Application.prototype.createObjects = function createObjects()
	{
		this.decors = new Decors( this.svgReader.data[ "decors" ] );
		this.scene.add( this.decors );

		this.star = new Star();
		this.scene.add( this.star );
		this.star.add( this.camera );
		this.camera.lookAt( this.star.position );
		//this.camera.position.y = 200;
		//this.camera.rotation.x = -Math.PI * .5;

		this.ribbons = new Ribbons( this.star );
		this.scene.add( this.ribbons );

		this.messageEnd = new MessageEnd( this.svgReader.data[ "message" ] );
		this.messageEnd.create();
	}

	Application.prototype.createPaths = function createPaths()
	{
		this.path = new THREE.Path();
		U3D.createPath( this.path, this.svgReader.data[ "path" ], this.star );

		this.pathEnd = new THREE.Path();
		U3D.createPath( this.pathEnd, this.svgReader.data[ "pathend" ], null, Globals.sapinBig.position.x - 23.5 );
	}

	Application.prototype.animate = function animate()
	{
		this.render();
		requestAnimationFrame( this.animate.bind( this ) );
	}

	Application.prototype.render = function render()
	{
		this.renderer.render( this.scene, this.camera );
		
		if( this.speed < this.speedMax )
		{
			this.speed += this.acc;
		}

		/*this.star.position.x = Globals.sapinBig.position.x - 23.5;
		this.star.position.y = Globals.sapinBig.position.y + 420;
		this.star.position.z = Globals.sapinBig.position.z;
		this.star.rotation.x = -Math.PI * .2;*/

		/*this.star.position.x = Globals.sapinBig.position.x - 23.5 + 210;
		this.star.position.y = Globals.sapinBig.position.y + 120;
		this.star.position.z = Globals.sapinBig.position.z;
		this.star.rotation.y = -Math.PI * .05;*/

		if( this.part == 1 || this.part == 2 )
		{
			this.timeOnPath += this.speed * Globals.clock.getDelta();

			var p
			  , yStar;
			if( this.part == 1 )
			{
				if( this.timeOnPath > 1 )
				{
					this.part = 2;
					this.timeOnPath = 0;
					this.speed *= 3;
					this.speedMax *= 3;
					this.currentStarY = this.star.position.y;
					this.scene.add( this.messageEnd );
					return;
				}

				p = this.path.getPointAt( this.timeOnPath );
			}
			else if ( this.part == 2 )
			{
				if( this.timeOnPath > 1 )
				{
					this.part = 3;
					this.timeOnPath = 0;
					return;
				}
				
				p = this.pathEnd.getPointAt( this.timeOnPath );
				yStar = this.currentStarY + ( this.timeOnPath * this.timeOnPath ) * ( Globals.sapinBig.position.y + 415 );
			}
			this.star.render( p, yStar );
			this.ribbons.render( p );
		}
		else if ( this.part == 3 )
		{
			// debug message end
			p = this.pathEnd.getPointAt( 1 )
			this.ribbons.render( p );
			this.star.position.x = p.x;
			this.star.position.z = p.y;
			this.star.position.y = ( Globals.sapinBig.position.y + 415 );
			this.star.rotation.x = -0.7;
			this.star.rotation.y = Math.PI;
		}

		//this.star.rotation.y += .01;

		/*var offset = this.star.matrixWorld.multiplyVector3( new THREE.Vector3(0,50,100) );
		console.log( offset );
		
		this.camera.position.x = offset.x;
		this.camera.position.y = offset.y;
		this.camera.position.z = offset.y;

		this.camera.position.x = this.star.position.x;
		this.camera.position.y = this.star.position.y + 30;
		this.camera.position.z = this.star.position.z - 100;
		this.camera.lookAt( this.star.position );*/

		this.stats.update();
	}

	Application.prototype.preparePart2 = function preparePart2()
	{
		var p = this.path.getPointAt( 1 );
		this.star.position.x = p.x;
		this.star.position.z = p.y;
	}

	return Application;

} )();