const fs = require('fs')
const jsonfile = require('jsonfile')
const turf = require('@turf/turf')

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

let mexico = jsonfile.readFileSync(`./mexicoGeo.json`)
// por cada directorio 
agrupacionesDirectorio.forEach(agr => {
  let agrUnion 
  fs.readdir(agr, (err, files) => {
    console.log(`Creando ./${agr}/${agr}Union.json`)
    files.forEach(file => {
      if (file.includes('Poligono.json')) {
        let variante = file.split('Poligono.')[0]
        let variantePolygon = jsonfile.readFileSync(`./${agr}/${variante}Poligono.json`)
        let intersecVarianteMexico = turf.intersect(variantePolygon, mexico.features[0].geometry)
        intersecVarianteMexico.properties = {variante}
        if (!agrUnion) {
          agrUnion = intersecVarianteMexico
        } else {
          console.log('uniendo', variante)
          
          agrUnion = turf.union(
            agrUnion, 
            intersecVarianteMexico
          )
        }
      }
    })
    jsonfile.writeFileSync(`./${agr}/${agr}Union.json`, agrUnion)
  })
})

