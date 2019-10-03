const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./familias.json')

familias = familias.map(f => {
  let geojsonUnion = jsonfile.readFileSync(`./${f.id}Union.json`)
  f.geojson = geojsonUnion
  return f
})

jsonfile.writeFileSync('./familias.json', familias)