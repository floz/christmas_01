Sapin = ( function() {

	function Sapin()
	{
		THREE.Object3D.call( this );

		
	}
	Sapin.prototype = new THREE.Object3D();
	Sapin.prototype.constructor = Sapin;

	return Sapin;

});