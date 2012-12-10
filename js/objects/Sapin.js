Sapin = ( function() {

	function Sapin()
	{
		THREE.Object3D.call( this );

		this.construct();
	}
	Sapin.prototype = new THREE.Object3D();
	Sapin.prototype.constructor = Sapin;

	Sapin.prototype.construct = function construct()
	{
		this.partTop = new SapinPart();
		this.add( this.partTop );
	}

	return Sapin;

})();