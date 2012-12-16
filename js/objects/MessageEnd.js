MessageEnd = ( function MessageEnd() {

	function MessageEnd( data )
	{
		THREE.Object3D.call( this );

		this.position.y = 20;
		//this.position.z = -500;

		this.data = data;
	}
	MessageEnd.prototype = new THREE.Object3D();
	MessageEnd.prototype.constructor = MessageEnd;

	MessageEnd.prototype.create = function create()
	{
		var mat = new THREE.LineBasicMaterial( { color: 0xff0000, lineWidth: 25 } );

		var letter;
		var n = this.data.a.length;
		for( var i = 0; i < n; i++ )
		{
			path = new THREE.Path();
			U3D.createPath( path, this.data.a[ i ] );

			letter = new Letter( path.getPoints(), mat );
			this.add( letter );
		}
	}

	return MessageEnd;

})();

Letter = ( function Letter() {

	function Letter( data, mat )
	{
		THREE.Object3D.call( this );

		var line, geo, v2, v3
		  , n = data.length;
		
		for( var i = 1; i < n; i++ )
		{
			geo = new THREE.Geometry();
			v2 = data[ i - 1 ];
			v3 = new THREE.Vector3( v2.x, 0, v2.y );
			geo.vertices.push( v3 );
			v2 = data[ i ];
			v3 = new THREE.Vector3( v2.x, 0, v2.y );
			geo.vertices.push( v3 );

			line = new THREE.Line( geo, mat );
			this.add( line );
		}
	}
	Letter.prototype = new THREE.Object3D();
	Letter.prototype.constructor = Letter;

	return Letter;

})();