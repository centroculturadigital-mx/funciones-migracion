const fs = require('fs')
const jsonfile = require('jsonfile')
const geojson2svg = require('geojson2svg');
// const fromPolygonToSvg = require('./from-polygon-to-svg')

const options = {
  mapExtent: {
    left: -180,
    bottom: -90,
    right: 180,
    top: 90
  }
}

var converter = geojson2svg(options);

let geojsonPolygon = jsonfile.readFileSync('./mexicoGeo.json')

fs.writeFileSync(
  `./mexico.svg`,
  converter.convert(geojsonPolygon, options)
)
        
