LoaderSapin = ( function() {

	function LoaderSapin()
	{
		this.signalLoaded = new signals.Signal();

		this.loader = new THREE.OBJLoader();
		this.loader.addEventListener( "load", this.onSapinLoad.bind( this ) );
	}
	LoaderSapin.prototype.constructor = LoaderSapin;

	LoaderSapin.prototype.load = function load()
	{
		this.loader.load( "obj/sap.obj" );
	}

	LoaderSapin.prototype.onSapinLoad = function onSapinLoad( event )
	{
		console.log( "onSapinload ok !" );
		this.signalLoaded.dispatch( event.content );
	}

	return LoaderSapin;

} )();