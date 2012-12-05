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

		this.scene = new THREE.Scene();

		this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		this.camera.position.y = 1;
		//this.camera.position.z = 300;
		this.camera.position.z = 200;
		this.camera.lookAt( new THREE.Vector3( 0, 4, -20 ) );
		this.scene.add( this.camera );

		this.createLights();
		this.createExperiment();

		this.animate();
	}

	Application.prototype.createLights = function createLights()
	{
		this.pointLight = new THREE.PointLight( 0xffffff, 1.0 );
		this.scene.add( this.pointLight );
		/*var light1 = new THREE.DirectionalLight(0xffffff, 0.6); // color, intens. 
		light1.position.set(-1, -1, 0.3); // SW directional light
		var light2 = new THREE.PointLight(0xffffff, 0.6); // color, intens. 
		light2.position.set(200, 200, 300); // NE point light
		var light3 = new THREE.DirectionalLight(0xffffff, 0.5); // color, intens. 
		light3.position.set(0, 0, 1); // frontal light
		this.scene.add(light1); this.scene.add(light2); this.scene.add(light3); // add them all*/
	}

	Application.prototype.createExperiment = function createExperiment()
	{
		this.scene.add( new Floor() );

		var sphere = new THREE.Mesh( new THREE.SphereGeometry(50, 20, 20), new THREE.MeshBasicMaterial( { color: 0x0000ff } ) );
		this.scene.add( sphere );
	}

	Application.prototype.animate = function animate()
	{
		this.render();
		requestAnimationFrame( this.animate.bind( this ) );
	}

	Application.prototype.render = function render()
	{
		this.renderer.render( this.scene, this.camera );
	}

	return Application;

} )();