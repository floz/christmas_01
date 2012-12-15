U3D = 
{
	scale: function scale( s, geo )
	{

		var vert = geo.vertices
		  , i = 0
		  , n = vert.length;
		for( ; i < n; i++ )
		{
			vert[ i ].multiplyScalar( s );
		}
	},

	vHeighMapSize: null,
	vZoneTranslate: null,

	getY: function getY( v )
	{
		var newV = new THREE.Vector2( Math.round( v.x * .1 ), Math.round( v.z * .1 ) );
		newV.addSelf( U3D.vZoneTranslate );
		var y = Globals.dataHeightMap[ newV.x + newV.y * U3D.vHeighMapSize.x >> 0 ];
		return y || 0;
	}
}