const fs = require('fs')
const jsonfile = require('jsonfile')
const fromPointsToPolygon = require('./from-points-to-polygon')

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
agrupacionesDirectorio.forEach(agr => {
  // imprime en consola: agrupacion
  console.log('* ' + agr)  
  // recorre agrupaciones
  fs.readdir(agr, (err, files) => {
    // recorre archivos 
    files.forEach(file => {
      // por cada archivo.shp
      if ( file.includes('.shp') ) {
        let variante = file.split('.')[0]
        // imprime en consola: variante
        console.log(' ---' + variante + 'Poligono.json')
        // crear variante_poligono.json
        let puntosOrigin = `./${agr}/${variante}Puntos.json`
        let poligonoDest = `./${agr}/${variante}Poligono.json`
        fromPointsToPolygon(puntosOrigin, poligonoDest )
      }
    })
  })
        
})
