var SapinPart = ( function() {

	function SapinPart()
	{
		THREE.Object3D.call( this );

		this.createGeometry();
		this.createObject();

		requestAnimationFrame( this.test.bind( this ) );
	}
	SapinPart.prototype = new THREE.Object3D();
	SapinPart.prototype.constructor = SapinPart;

	SapinPart.prototype.createGeometry = function createGeometry()
	{
		var normal = new THREE.Vector3( 0, 0, 1 );

		this.geometry = new THREE.Geometry();
		this.geometry.vertices.push( new THREE.Vector3( 0, 0, 0 ) );
		this.geometry.vertices.push( new THREE.Vector3( 10, 0, 0 ) );
		this.geometry.vertices.push( new THREE.Vector3( 10, 10, 0 ) );
		this.geometry.vertices.push( new THREE.Vector3( 5, 5, 10 ) );
		
		this.geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
		this.geometry.faces.push( new THREE.Face3( 1, 3, 2 ) );
		this.geometry.faces.push( new THREE.Face3( 3, 0, 2 ) );

		var face,
		normal = new THREE.Vector3( 0, 0, 1 );
		n = this.geometry.faces.length;
		for( var i = 0; i < n; i++ )
		{
			face = this.geometry.faces[ i ];
			face.centroid.addSelf( this.geometry.vertices[ face.a ] );
			face.centroid.addSelf( this.geometry.vertices[ face.b ] );
			face.centroid.addSelf( this.geometry.vertices[ face.c ] );
			face.normal = face.centroid.clone().normalize();
		}

		this.geometry.computeBoundingSphere();
		this.geometry.computeCentroids();
		this.geometry.computeVertexNormals();
		this.geometry.mergeVertices();
	}

	SapinPart.prototype.createObject = function createObject()
	{
		var material = new THREE.MeshLambertMaterial( { color: 0xffffff, vertexColors: THREE.FaceColors, shading: THREE.FlatShading } );

		this.mesh = new THREE.Mesh( this.geometry, material );
		this.mesh.rotation.y = Math.PI * .25;
		this.mesh.rotation.x = Math.PI * .25;
		this.add( this.mesh );
	}

	SapinPart.prototype.test = function test()
	{
		this.mesh.rotation.x += Math.PI / 200;
		this.mesh.rotation.y += Math.PI / 200;
		requestAnimationFrame( this.test.bind( this ) );
	}

	return SapinPart;

})();