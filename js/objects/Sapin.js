Sapin = ( function Sapin() {

	function Sapin( objData, data )
	{	
		THREE.Object3D.call( this );

		console.log( objData, data );
		this.mesh = objData.clone();
		this.position.x = data.x;
		this.position.z = data.y;
		this.add( this.mesh );
	}
	Sapin.prototype = new THREE.Object3D();
	Sapin.prototype.construtor = Sapin;

	return Sapin;

})();