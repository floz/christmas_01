Decors = ( function Decors(){

	function Decors( data )
	{
		THREE.Object3D.call( this );

		var sapin
		  , sapIds = [ "saps1", "saps2","saps3", "sapb" ]
		  , n = data.length;
		for( var i = 0; i < n; i++ )
		{
			sapin = new Sapin( Globals.objs[ sapIds[ Math.random() * sapIds.length >> 0 ] ].children[ 0 ], data[ i ] );
			this.add( sapin );
		}
	}
	Decors.prototype = new THREE.Object3D();
	Decors.prototype.constructor = Decors;

	return Decors;
	
})();