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
  let agrPuntos = {
    type: 'FeatureCollection',
    features: []
  }
  fs.readdir(agr, (err, files) => {
    files.forEach(file => {
      if (file.includes('Puntos.json')) {
        let variante = file.split('Puntos.')[0]
        let variantePuntos = jsonfile.readFileSync(`./${agr}/${variante}Puntos.json`)
        // console.log(' --- ' + variante + ' ' + variantePuntos.features.length)
        agrPuntos.features = [...agrPuntos.features, ...variantePuntos.features]
      }
    })
    console.log(`Creando ./${agr}/${agr}PuntosAgr.json con ${agrPuntos.features.length} puntos`)
    jsonfile.writeFileSync(`./${agr}/${agr}PuntosAgr.json`, agrPuntos)
  })
})

