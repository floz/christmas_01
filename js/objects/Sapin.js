Sapin = ( function Sapin() {

	function Sapin( objData, data )
	{	
		THREE.Object3D.call( this );

		var s = data.r * .1;
		this.mesh = objData.clone();
		this.position.x = data.x;
		this.position.z = data.y;
		if( data.c != "#FF00FF")
		{
			this.scale.x = s;
			this.scale.y = s;
			this.scale.z = s;
		}
		this.add( this.mesh );
	}
	Sapin.prototype = new THREE.Object3D();
	Sapin.prototype.construtor = Sapin;

	return Sapin;

})();