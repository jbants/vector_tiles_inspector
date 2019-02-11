// based on Andrew Harvey's answer here: https://gis.stackexchange.com/questions/287610/how-to-find-layer-names-within-vector-tiles-without-tilejson-or-the-mbtiles-fi
const request = require('request');
const VectorTile = require('@mapbox/vector-tile').VectorTile;
const Pbf = require('pbf');
const zlib = require('zlib');


void request({
    url: 'https://storage.googleapis.com/carbonsource_data/climate_explorer/vector_tiles/clim_grid_raisg_test/0/0/0.pbf',
    encoding: null
}, (err, response, body) => {
    try {
         body = zlib.gunzipSync(body);
    } catch (e) {

    }
    const tile = new VectorTile(new Pbf(body));
    console.log('Vector source layers found: ');
    Object.keys(tile.layers).forEach(layerName =>
       console.log(layerName + ': ' + "\n " + tile.layers[layerName]._keys.join('\n ')));
       
})