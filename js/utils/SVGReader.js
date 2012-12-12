SVGReader = ( function() {

	function SVGReader()
	{
		var nodeSVG = $( "#svg" );
		var childNodes = nodeSVG[ 0 ].childNodes[ 1 ].childNodes;
		this._parseNodes( childNodes );
	}
	SVGReader.prototype.constructor = SVGReader;

	SVGReader.prototype._parseNodes = function _parseNodes( nodes )
	{
		var node;
		var i = 0, n = nodes.length;
		for( ; i < n; i++ )
		{
			node = nodes[ i ];
			if ( node.nodeName != "#text" )
			{
				switch( node.nodeName )
				{
					case "g": this._parseGraphicNode( node ); break;
					default: console.log( "No default behavior for " + node.nodeName + " !" ); break;
				}
			}
		}
	}

	SVGReader.prototype._parseGraphicNode = function _parseGraphicNode( nodeG )
	{
		console.log( nodeG.attributes[ "id" ].nodeValue );
		
		var node;
		var i = 0, n = nodeG.childNodes.length;
		for( ; i < n; i++ )
		{
			node = nodeG.childNodes[ i ];
			if( node.nodeName == "#text" )
				continue;

			console.log( node );
		}
	}

	return SVGReader;
	
})();