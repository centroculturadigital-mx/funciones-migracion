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
let familias = jsonfile.readFileSync('./familias.json')

// por cada directorio 
familias.forEach(async fam => {
  
  // imprime en consola: famupacion
  console.log(`Creando SVG para ${fam.NOM_FAM}`)  
  // recorre famupaciones
  let geojsonPolygon = jsonfile.readFileSync(
    `./${fam.id}Union.json`
  )

  fs.writeFileSync(
    `./${fam.id}.svg`,
    converter.convert(geojsonPolygon, options)
  )
        
})
