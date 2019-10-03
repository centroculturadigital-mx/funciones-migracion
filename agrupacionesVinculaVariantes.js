const jsonfile = require('jsonfile')

let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let variantes = jsonfile.readFileSync('./variantes.json')

agrupaciones = agrupaciones.map(a => {
  let variantesDeAgrupacion = variantes.filter(v => {
    return a.ID_AGRUP === v.ID_AGRUP
  }).map(v => v.id)
  a.variantes = variantesDeAgrupacion
  return a
})
jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)