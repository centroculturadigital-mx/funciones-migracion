const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./familias.json')
let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')

familias = familias.map(f => {
  let agrupacionesDeFamilia = agrupaciones.filter(a => {
    return a.ID_FAM === f.ID_FAM
  }).map(a => a.id)
  console.log(f.id, agrupacionesDeFamilia)
  f.agrupaciones = agrupacionesDeFamilia
  return f
})
console.log(familias)
jsonfile.writeFileSync('./familias.json', familias)