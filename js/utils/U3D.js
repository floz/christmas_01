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
	}
}