const jsonfile = require('jsonfile')

const funcionesColor =  require('./colorTransforma')

let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let familias = jsonfile.readFileSync('./familias.json')
let variantes = jsonfile.readFileSync('./variantes.json')

const familiasColor = {
  algica: 'E6AA30',
  yutonahua: 'F45C92',
  cochimiyumana: 'D31A27',
  seri: '7D8796',
  otomangue: '5EA279',
  maya: '6D6DB3',
  totonacotepehua: '4B84FA',
  tarasca: '48CBFF',
  mixezoque: '877477',
  chontaldeoaxaca: 'F46E7E',
  huave: '986293',
}

familias.forEach(f => {
  f.color = familiasColor[f.id]
  const agrColores = funcionesColor.generarPaleta(
      familiasColor[f.id],
      familiasColor[familias[(i+1)%familias.length].id],
      f.agrupaciones.length
  )
  f.agrupaciones.forEach((aId, i) => {
    let agr = agrupaciones.find(a => a.id == aId )
    agr.color = agrColores[i]
    const varColores = funcionesColor.generarPaleta(
        agrColores[i],
        agrColores[(i+1)%agrColores.length],
        agr.variantes.length
    )
    agr.variantes.forEach((vId, k) => {
      let vari = variantes.find(v => v.id == vId )
      vari.color = varColores[i]
    })
  })
})
jsonfile.writeFileSync('./familias.json', familias)
// jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)
// jsonfile.writeFileSync('./variantes.json', variantes)