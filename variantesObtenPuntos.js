const fs = require('fs')
const jsonfile = require('jsonfile')
const fromShpToGeoJson = require('./from-shp-to-geojson')
const fromPointsToPolygon = require('./from-points-to-polygon')
const fromPolygonToSvg = require('./from-polygon-to-svg')

// consultar tree.json
let tree = jsonfile.readFileSync('./tree.json')
// tree.json tiene directorios y files

// cada directorio representa una agrupación y tiene la información de sus variantes
let agrupacionesDirectorio = tree[0].contents
  .filter(c => c.type === 'directory')
  .map(c => {
    return c.name
  })

// por cada directorio 
agrupacionesDirectorio.forEach(async agr => {
  // imprime en consola: agrupacion
  console.log('* ' + agr)  
  // recorre agrupaciones
  fs.readdir(agr, (err, files) => {
    // recorre archivos 
    files.forEach(async file => {
      // por cada archivo.shp
      if ( file.includes('.shp') ) {
        let variante = file.split('.')[0]
        // imprime en consola: variante
        console.log(' ---' + variante + 'Puntos.json')
        // crear variante_puntos.json
        fromShpToGeoJson(agr, variante)
      }
    })
  })
        
})
