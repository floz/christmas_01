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
		this.camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 1000 );
		this.camera.position.z = 300;
		this.camera.position.y = 1;
		//this.camera.lookAt( new THREE.Vector3( 0, 0, 200 ) );
		//camera.position.set( 0, 0, 250 );
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
		this.pointLight.y = 500;
		this.pointLight.z = -200;
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
		floor.position.y = -50;
		floor.position.z = -500;
		this.scene.add( floor );

		this.sapin = new Sapin();
		this.sapin.position.z = -100;
		this.sapin.position.y = 50;
		this.scene.add( this.sapin );
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
		//this.scene.rotation.y += 0.01;

		/*var timer = Date.now() * 0.0005;
		this.camera.position.x = Math.cos( timer ) * 50;
		this.camera.position.y = 2;
		this.camera.position.z = Math.sin( timer ) * 50;
		this.camera.lookAt( this.sapin.position );*/

		this.sapin.render();

		this.stats.update();
	}

	return Application;

} )();