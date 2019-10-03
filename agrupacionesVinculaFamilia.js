const jsonfile = require('jsonfile')

let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let familias = jsonfile.readFileSync('./familias.json')

agrupaciones = agrupaciones.map(a => {
  let familia = familias.find(f => {
    return a.ID_FAM === f.ID_FAM
  })
  a.familiaId = familia.id
  return a
})

jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)