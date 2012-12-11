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
		var version = 4;
		if( version == 0 )
		{
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
			var o1 = new THREE.Mesh( new THREE.TetrahedronGeometry( 20, 0 ), material );
			o1.rotation.x = Math.PI * 1.25;
			o1.rotation.z = Math.PI * .25;
			this.add( o1 );
			var o2 = new THREE.Mesh( new THREE.TetrahedronGeometry( 25, 0 ), material );
			o2.rotation.x = Math.PI * 1.25;
			o2.rotation.z = Math.PI * .25;
			o2.position.y = -10;
			this.add( o2 );

			console.log( o1 );
			console.log( o2 );
		}
		else if ( version == 1 )
		{
			var cube1 = new THREE.Mesh( new THREE.CubeGeometry( 20, 20, 20 ), material );
			var cube2 = new THREE.Mesh( new THREE.CubeGeometry( 25, 25, 25 ), material );
			cube2.rotation.y = 20;
			cube2.position.y = -10;
			this.add( cube1 );
			this.add( cube2 );
		}
		else if ( version == 2 )
		{
			this.geometry = new THREE.Geometry();

			this.partTop = new SapinPart();

			this.partMid = new SapinPart( 7, 30 );
			this.partMid.position.y = -10;
			this.merge( this.partMid.geometry, new THREE.Vector3( 0, -20, 0 ) );
			this.merge( this.partTop.geometry );

			console.log( this.geometry );

			this.geometry.mergeVertices();
			this.geometry.computeBoundingSphere();
			this.geometry.computeCentroids();
			this.geometry.computeVertexNormals();

			this.mesh = new THREE.Mesh( this.geometry, new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } ) );
			this.add( this.mesh );
		}
		else if ( version == 3 )
		{
			var sp1 = new SapinPart();
			this.add( sp1 );

			var sp2 = new SapinPart( 12, 30 );
			sp2.position.y = -5;
			this.add( sp2 );
		}
		else if ( version == 4 )
		{
			var material = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );
			var o1 = new THREE.Mesh( new THREE.SapinGeomTest( 20, 0 ), material );
			o1.rotation.x = Math.PI * 1.25;
			o1.rotation.z = Math.PI * .25;
			this.add( o1 );
			var o2 = new THREE.Mesh( new THREE.SapinGeomTest( 25, 0 ), material );
			o2.rotation.x = Math.PI * 1.25;
			o2.rotation.z = Math.PI * .25;
			o2.position.y = -10;
			this.add( o2 );
		}
	}

	Sapin.prototype.merge = function merge( geom, translate )
	{
		translate = translate || new THREE.Vector3( 0, 0, 0 );

		var face
		, vertice
		, baseVerticesCount = this.geometry.vertices.length
		, i = 0
		, n = geom.vertices.length;
		for( ; i < n; i++ )
		{
			vertice = geom.vertices[ i ];
			vertice.addSelf( translate );
			this.geometry.vertices.push( vertice );
		}

		n = geom.faces.length;
		for( i = 0; i < n; i++ )
		{
			face = geom.faces[ i ];
			face.a += baseVerticesCount;
			face.b += baseVerticesCount;
			face.c += baseVerticesCount;
			this.geometry.faces.push( face );
		}
	}

	Sapin.prototype.render = function render()
	{
		this.rotation.y += .01;
	}

	return Sapin;

})();