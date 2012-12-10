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
	app.init();

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

	Application.prototype.init = function init()
	{
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
		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.z = 300;
		this.camera.position.y = 1;
		this.scene.add( this.camera );

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
		var floor = new Floor();
		this.scene.add( floor );
		var sapin = new Sapin();
		sapin.position.z = 200;
		this.scene.add( sapin );
		console.log( "toto" );
	}

	Application.prototype.animate = function animate()
	{
		this.render();
		requestAnimationFrame( this.animate.bind( this ) );
	}

	Application.prototype.render = function render()
	{
		this.renderer.render( this.scene, this.camera );
		//this.camera.position.z += 1;

		this.stats.update();
	}

	return Application;

} )();