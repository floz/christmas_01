ObjLoader = ( function() {

	function ObjLoader( url )
	{
		this.url = url;
		
		this.signalLoaded = new signals.Signal();

		this.loader = new THREE.OBJLoader();
		this.loader.addEventListener( "load", this.onSapinLoad.bind( this ) );
	}
	ObjLoader.prototype.constructor = ObjLoader;

	ObjLoader.prototype.load = function load()
	{
		this.loader.load( this.url );
	}

	ObjLoader.prototype.onSapinLoad = function onSapinLoad( event )
	{
		console.log( "loading terminé !" );
		this.signalLoaded.dispatch( event.content );
	}

	return ObjLoader;

} )();