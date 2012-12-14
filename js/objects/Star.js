Star = ( function Star() {

	function Star()
	{
		THREE.Object3D.call( this );

		var loaderStar = new ObjLoader( "./obj/star.obj" );
		loaderStar.signalLoaded.add( this.onStarLoaded, this );
		loaderStar.load();
	}
	Star.prototype = new THREE.Object3D();
	Star.prototype.constructor = new THREE.Object3D();

	Star.prototype.onStarLoaded = function onStarLoaded( obj )
	{
		this.mesh = obj.children[ 0 ];
		this.mesh.rotation.x = Math.PI * 1.5;
		this.add( this.mesh );
	}

	Star.prototype.render = function render( p )
	{
		if( this.mesh == null )
			return;

		this.position.x = p.x;
		this.position.z = p.y;
	}

	return Star;

} )();