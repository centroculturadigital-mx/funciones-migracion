const fs = require('fs')
const jsonfile = require('jsonfile')

// consultar tree.json
let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let tree = jsonfile.readFileSync('./tree.json')
// tree.json tiene directorios y files
// por cada directorio 
let agrupacionesDirectorio = tree[0].contents
  .filter(c => c.type === 'directory')
  .map(c => {
    return c.name
  })

// por cada directorio 
agrupaciones = agrupaciones.map(agr => {
  
  let agrFolder = agrupacionesDirectorio.find(a => a.includes(agr.CLAVE_AGRU))
  
  let agrPath = fs.readFileSync(`./${agrFolder}/${agrFolder}.svg`, 'utf8')
  agr.path = agrPath
  return agr
})

jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)


