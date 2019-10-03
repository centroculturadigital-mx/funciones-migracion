const jsonfile = require('jsonfile')
const fs = require('fs')
const geojson2svg = require('geojson2svg');

const options = {
  mapExtent: {
    left: -180,
    bottom: -90,
    right: 180,
    top: 90
  }
}

var converter = geojson2svg(options);
// TODO: Necesitamos normalizar a recibir como params (origen, dest)
const fromPolygonToSvg = async (agrupacionFolder, variante) => {
  let geojsonPolygon = jsonfile.readFileSync(
    `./${agrupacionFolder}/${variante}Polygon.json`
  )

  fs.writeFileSync(
    `./${agrupacionFolder}/${variante}.svg`,
    converter.convert(geojsonPolygon, options)
  )
  console.log(`SVG generado para ${variante}`)
}

module.exports = fromPolygonToSvg