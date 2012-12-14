SVGReader = ( function() {

	function SVGReader()
	{
		this.data = {};
	}
	SVGReader.prototype.constructor = SVGReader;

	SVGReader.prototype.parse = function parse()
	{
		var nodeSVG = $( "#svg" );
		var childNodes = nodeSVG[ 0 ].childNodes[ 1 ].childNodes;
		this._parseNodes( childNodes );
	}

	SVGReader.prototype._parseNodes = function _parseNodes( nodes )
	{
		var node;
		var i = 0, n = nodes.length;
		for( ; i < n; i++ )
		{
			node = nodes[ i ];
			if ( node.nodeName != "#text" && node.nodeName != "#comment" )
			{
				switch( node.nodeName )
				{
					case "g": this.data[ node.attributes[ 0 ].nodeValue ] = this._parseGraphicNode( node ); break;
					default: console.log( "No default behavior for " + node.nodeName + " !" ); break;
				}
			}
		}
	}

	SVGReader.prototype._parseGraphicNode = function _parseGraphicNode( nodeG )
	{
		var j, m, node, cmd, ref, chara, idxEnd
		  ,	aPath = []
		  , idxStart = 0
		  , i = 0
		  , n = nodeG.childNodes.length;
		for( ; i < n; i++ )
		{
			node = nodeG.childNodes[ i ];
			if( node.nodeName == "#text" )
				continue;

			var path = node.attributes[ 3 ].nodeValue;
			path = path.replace(/,/gm,' '); // get rid of all commas
            path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
            path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
            path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); // separate commands from points
            path = path.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from points
            path = path.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits when no comma
            path = path.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when no comma
            path = path.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
            
            j = 1, m = path.length;
            for( ; j < m; j++ )
            {
            	if( j < m - 1 )
            	{
            		chara = path[ j ];
            		idxEnd = j - 1;
            	}
            	else
            	{
            		chara = path[ idxStart ];
            		idxEnd = j + 1;
            	}
            	if( chara.match( /([MmZzLlHhVvCcSsQqTtAa])/gm ) )
            	{
            		cmd = path.substr( idxStart, idxEnd - idxStart );
            		cmd = cmd.split( " " );
            		switch( cmd[ 0 ] )
            		{
            			case "M": cmd = { cmd: "M"
            							, p: { x: 0, y: 0 } };//p: { x: parseFloat( cmd[ 1 ] ), y: parseFloat( cmd[ 2 ] ) } };
            					break;
            			case "C":
            			case "c": 
            					  cmd = { cmd: "c"
            					  		, cp0: { x: parseFloat( cmd[ 1 ] ), y: parseFloat( cmd[ 2 ] ) }
            					  		, cp1: { x: parseFloat( cmd[ 3 ] ), y: parseFloat( cmd[ 4 ] ) }
            					  		, p: { x: parseFloat( cmd[ 5 ] ), y: parseFloat( cmd[ 6 ] ) } };

            					ref = aPath[ aPath.length - 1 ];
            					cmd.cp0.x = ref.p.x + cmd.cp0.x;
            					cmd.cp0.y = ref.p.y + cmd.cp0.y;
            					cmd.cp1.x = ref.p.x + cmd.cp1.x;
            					cmd.cp1.y = ref.p.y + cmd.cp1.y;
            					cmd.p.x = ref.p.x + cmd.p.x;
            					cmd.p.y = ref.p.y + cmd.p.y;

            					break;
            		}
            		aPath.push( cmd );
            		idxStart = j;
            	} 	
            }
            console.log( aPath );
		}
		return aPath;
		/*path = "M191.667,381.667C191.667,381.667,198.667,362.33399999999995,187.334,358.667C187.334,358.667,159.001,347.33399999999995,134.667,397.33399999999995C134.667,397.33399999999995,118.667,428.99999999999994,140,436.99999999999994C140,436.99999999999994,161.667,442.33299999999997,202,431.99999999999994";
		path = path.replace(/,/gm,' '); // get rid of all commas
        path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
        path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from commands
        path = path.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,'$1 $2'); // separate commands from points
        path = path.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,'$1 $2'); // separate commands from points
        path = path.replace(/([0-9])([+\-])/gm,'$1 $2'); // separate digits when no comma
        path = path.replace(/(\.[0-9]*)(\.)/gm,'$1 $2'); // separate digits when no comma
        path = path.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,'$1 $3 $4 '); // shorthand elliptical arc path syntax
		console.log( "path", path );*/
	}

	return SVGReader;
	
})();