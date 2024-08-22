const fs = require('fs');
const path = require('path');

const PUBLIC_INDEX = 'build/index.html';

const envFunctions = {
	TIMESTAMP: () => new Date(),
};

let fileData = fs.readFileSync( 'index.html' ).toString();

let replacedFileData = fileData.replace( /%(\w+)%/g, ( all, key ) => {
	if ( envFunctions.hasOwnProperty( key ) ) {
		return envFunctions[ key ]();
	} else if ( process.env.hasOwnProperty( key ) ) {
		return process.env[ key ];
	}

	return '';
} );

fs.mkdirSync( path.parse( PUBLIC_INDEX ).dir, { recursive: true } );
fs.writeFileSync( PUBLIC_INDEX, replacedFileData );