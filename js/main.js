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

		this.skyColor = 0x131422;
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
		this.renderer.clear();
		this.renderer.autoClear = false;
		this.domContainer.append( this.renderer.domElement );

		// Scene
		this.scene = new THREE.Scene();
		this.scene.fog = new THREE.Fog( this.skyColor, 160, 500 );//new THREE.FogExp2( 0xffffff, .003 );//( 0xffffff, 300, 800 );

		// Camera
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 25000 );
		this.camera.position.z = -60;
		this.camera.position.y = 30;
		//this.camera.rotation.x = -Math.PI * .1;
		//this.scene.add( this.camera );

		this.createLights();
		this.createExperiment();

		// Composer

		var renderTargetParameters = { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false };
		var renderTarget = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight, renderTargetParameters );
		this.composer = new THREE.EffectComposer( this.renderer, renderTarget );

		var renderPass = new THREE.RenderPass( this.scene, this.camera );
		renderPass.renderToScreen = true;
		var bloomPass = new THREE.BloomPass( .6 );

		this.composer.addPass( renderPass );
		//this.composer.addPass( bloomPass );

		// Stats
		this.stats = new Stats();
		this.stats.domElement.style.position = "absolute";
		this.stats.domElement.style.top = "0px";
		container.appendChild( this.stats.domElement );

		this.animate();
	}

	Application.prototype.createLights = function createLights()
	{
		var map = $( "#heightmap" );
		
		this.mainLight = new THREE.PointLight( 0xffffff, 1.2, 2000 );
		this.mainLight.position.set( map.width() * 5, 950, -map.height() * 5 );
		this.scene.add( this.mainLight );

		/*this.secondLight = new THREE.PointLight( 0xffffff, .75, 2000 );
		this.secondLight.position.set( map.width() * 5, 950, -map.height() * 2.5 );
		this.scene.add( this.secondLight );*/

		this.saumonLight = new THREE.PointLight( 0xd8aed6, .4 );
		this.saumonLight.position.set( map.width() * .75 * 10, 200, 0 );
		this.scene.add( this.saumonLight );

		this.blueLight = new THREE.PointLight( 0x9698ea, .4 );
		this.blueLight.position.set( map.width() * .25 * 10, 200, -map.height() * 10 );
		this.scene.add( this.blueLight );

		var whiteLightStar = new THREE.PointLight( 0xffffff, .17, 1000 );
		whiteLightStar.position.x = -100;
		whiteLightStar.position.y = 100;
		whiteLightStar.position.z = -map.height() * 5;
		this.scene.add( whiteLightStar );

		this.scene.add( new THREE.AmbientLight( 0x10111f ) );
		//this.scene.add( new THREE.AmbientLight( 0xffffff ) );
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
		//this.scene.add( this.camera );
		this.camera.lookAt( this.star.position );
		//this.camera.lookAt( new THREE.Vector3( 400, 20, -250) );
		//this.camera.position.y = 100;
		//this.camera.position.z = 300;
		//this.camera.rotation.y = -Math.PI * .5;
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
		//this.renderer.setClearColor( this.skyColor, 1 );
		//this.renderer.render( this.scene, this.camera );
		
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
		//return;
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
					this.scene.fog = new THREE.Fog( this.skyColor, 500, 700 );//new THREE.FogExp2( 0xffffff, .003 );//( 0xffffff, 300, 800 );
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

		this.composer.render( 0.1 );

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