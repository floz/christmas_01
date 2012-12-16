Star = ( function Star() {

	function Star()
	{
		THREE.Object3D.call( this );

		this.mesh = Globals.objs.star;
		this.mesh.rotation.x = -1.3;
		this.mesh.scale.x =
		this.mesh.scale.y =
		this.mesh.scale.z = .7;
		this.add( this.mesh );

		var geoX = new THREE.Geometry();
		geoX.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 15, 0, 0 ) );
		var geoY = new THREE.Geometry();
		geoY.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 15, 0 ) );
		var geoZ = new THREE.Geometry();
		geoZ.vertices.push( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, 15 ) );

		var matX = new THREE.LineBasicMaterial( { color: 0x0000ff, opacity: 1, linewidth: 2 } );
		var matY = new THREE.LineBasicMaterial( { color: 0x00ff00, opacity: 1, linewidth: 2 } );
		var matZ = new THREE.LineBasicMaterial( { color: 0xff0000, opacity: 1, linewidth: 2 } );

		this.add( new THREE.Line( geoX, matX ) );
		this.add( new THREE.Line( geoY, matY ) );
		this.add( new THREE.Line( geoZ, matZ ) );

		this.rotation.y = Math.PI;
	}
	Star.prototype = new THREE.Object3D();
	Star.prototype.constructor = new THREE.Object3D();

	Star.prototype.render = function render( p, py )
	{
		if( this.mesh == null )
			return;

		var dx = p.x - this.position.x;
		var dy = p.y - this.position.z ;
		var rad = Math.atan2( dy, dx );

		var nry = -rad + Math.PI * .5;
		//this.mesh.rotation.z += ( nry - this.mesh.rotation.z ) * .1;		
		this.rotation.y += ( nry - this.rotation.y ) * .1;
		console.log( this.rotation.y );
		
		this.position.x = p.x;
		this.position.z = p.y;
		py = py || this.position.y + ( ( U3D.getY( this.position ) + 5 ) - this.position.y ) * .1;
		this.position.y = py;
	}

	return Star;

} )();