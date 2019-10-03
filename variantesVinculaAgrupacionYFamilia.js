const jsonfile = require('jsonfile')

let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let familias = jsonfile.readFileSync('./familias.json')
let variantes = jsonfile.readFileSync('./variantes.json')

variantes = variantes.map(v => {
  let agrupacion = agrupaciones.find(a => {
    return v.ID_AGRUP === a.ID_AGRUP
  })
  v.familiaId = agrupacion.familiaId
  v.agrupacionId = agrupacion.id
  return v
})

jsonfile.writeFileSync('./variantes.json', variantes)