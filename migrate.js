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
  // console.log('procesando: ' + agr)  

  // TODO: insertar/buscar agrupacion en base de datos
  // let agrSinCodigos = agr.split('_')[1]
  // console.log(agrSinCodigos)

  // buscar archivos.shp
  fs.readdir(agr, (err, files) => {
    files.forEach(async file => {
      // por cada archivo.shp
      if ( file.includes('.shp') ) {
        let variante = file.split('.')[0]
        // imprime en consola: variante
        console.log('procesando: ' + variante)
        // TODO: agregar variante a agrupación
        // TODO: crear variante en base de datos
        // crear variante_puntos.json
        // fromShpToGeoJson(agr, variante)
        // imprime en consola puntos listo
        // console.log('listos puntos de ' + variante + 'en archivo' + variante + 'Puntos.json' )
        // crear variante_shape.json
        // setTimeout(async () => {
          // fromPointsToPolygon(agr, variante)
        //   console.log('listo poligono de ' + variante + 'en archivo' + variante + 'Poligono.json' )
        // }, 3000)
        // imprime en consola poligono listo
        // crear variante_shape.svg
        // setTimeout(async () => {
          // fromPolygonToSvg(agr, variante)
        //   console.log('listo svg de ' + variante + 'en archivo' + variante + '.svg' )
        // }, 6000)
// imprime en consola svg listo
      }
    })
    // TODO: juntar shapes.json
      // TODO: imprime conjunto de poligonos, listos
  })
        
})
