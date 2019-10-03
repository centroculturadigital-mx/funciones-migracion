const fs = require('fs')
const jsonfile = require('jsonfile')

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
  let agrArchipielago = {
    type: 'FeatureCollection',
    features: [

    ]
  }
  fs.readdir(agr, (err, files) => {
    files.forEach(file => {
      if (file.includes('Poligono.json')) {
        let variante = file.split('Poligono.')[0]
        let variantePolygon = jsonfile.readFileSync(
          `./${agr}/${variante}Poligono.json`
        )
        variantePolygon.properties = {variante}
        agrArchipielago.features.push(variantePolygon)
      }
    })
    console.log(`Creando ./${agr}/${agr}Archipielago.json con ${agrArchipielago.features.length} Poligonos`)
    jsonfile.writeFileSync(`./${agr}/${agr}Archipielago.json`, agrArchipielago)
  })
})

