Floor = ( function() {

	function Floor()
	{
		THREE.Object3D.call( this );

		this.mesh = new THREE.Mesh( new THREE.PlaneGeomery( 30, 30, 30, 30 ), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ) );
		this.add( this.mesh );
	}
	Floor.prototype = new THREE.Object3D();
	Floor.prototype.constructor = Floor;

	return Floor;

});