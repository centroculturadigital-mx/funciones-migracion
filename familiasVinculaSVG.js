const fs = require('fs')
const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./familias.json')

familias = familias.map(f => {
  let familiaPath = fs.readFileSync(`./${f.id}.svg`, 'utf8')
  f.path = familiaPath
  return f
})

jsonfile.writeFileSync('./familias.json', familias)