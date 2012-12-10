Floor = ( function() {

	function Floor()
	{
		THREE.Object3D.call( this );

		this.mesh = new THREE.Mesh( new THREE.PlaneGeometry( 1000, 600, 30, 30 ), new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } ) );
		this.add( this.mesh );

		this.rotation.x = -Math.PI * 0.45;
	}
	Floor.prototype = new THREE.Object3D();
	Floor.prototype.constructor = Floor;

	return Floor;

})();