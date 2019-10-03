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
  
  let agrUnion = jsonfile.readFileSync(`./${agrFolder}/${agrFolder}Union.json`)
  agr.geojson = agrUnion
  return agr
})

jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)


