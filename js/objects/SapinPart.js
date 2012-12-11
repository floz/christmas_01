var SapinPart = ( function() {

	function SapinPart( radius, height, steps )
	{
		THREE.Object3D.call( this );

		this.radius = radius || 10;
		this.height = height || 25;
		this.steps = steps || 6;

		this.createGeometry();
		this.createObject();
	}
	SapinPart.prototype = new THREE.Object3D();
	SapinPart.prototype.constructor = SapinPart;

	SapinPart.prototype.createGeometry = function createGeometry()
	{
		var prev, current, face,
		i = 1,
		n = this.steps + 1,
		rad = 0,
		stepRad = 2 * Math.PI / this.steps,
		origin = new THREE.Vector3( 0, 0, 0 );

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push( origin );
		for( ; i < n; i++ )
		{
			last = current;
			current = new THREE.Vector3( this.radius * Math.cos( rad ), -this.height, this.radius * Math.sin( rad ) );
			this.geometry.vertices.push( current );
			rad += stepRad;

			if( last != null )
			{
				console.log( i );
				if( i < n - 1 )
				{
					var v2 = this.geometry.vertices[ i - 1 ];
					var v3 = this.geometry.vertices[ i ];
					this.addFace( new THREE.Face3( 0, i - 1, i ), [ origin.clone(), v2.clone(), v3.clone() ] );
				}
				else
				{
					this.addFace( new THREE.Face3( 0, i - 1, i ) );
					this.addFace( new THREE.Face3( 0, i, 1 ) );
				}				
			}
		}
		this.geometry.computeBoundingSphere();
		this.geometry.computeCentroids();
		this.geometry.computeVertexNormals();
		this.geometry.mergeVertices();

		this.geometry.boundingSphere = { radius: this.radius };
	}

	SapinPart.prototype.addFace = function addFace( face )
	{
		face.centroid.addSelf( this.geometry.vertices[ face.a ] );
		face.centroid.addSelf( this.geometry.vertices[ face.b ] );
		face.centroid.addSelf( this.geometry.vertices[ face.c ] );
		//face.centroid.divideScalar( 3 );
		face.normal = face.centroid.clone().normalize();
		this.geometry.faces.push( face );
	}

	SapinPart.prototype.createObject = function createObject()
	{
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );

		this.mesh = new THREE.Mesh( this.geometry, material );
		this.add( this.mesh );
	}

	return SapinPart;

})();