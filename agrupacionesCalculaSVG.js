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

// consultar tree.json
let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let tree = jsonfile.readFileSync('./tree.json')
// tree.json tiene directorios y files
// por cada directorio 
let agrupacionesDirectorio = tree[0].contents
  .filter(c => c.type === 'directory')
  .map(c => {
    return c.name
  })

// por cada directorio 
agrupaciones.forEach(agr => {

  let agrFolder = agrupacionesDirectorio.find(a => a.includes(agr.CLAVE_AGRU))
  console.log(`Creando SVGs`)

  let geojsonPolygon = jsonfile.readFileSync(
    `./${agrFolder}/${agrFolder}Union.json`
  )

  fs.writeFileSync(
    `./${agrFolder}/${agrFolder}.svg`,
    converter.convert(geojsonPolygon, options)
  )

})
