const jsonfile = require('jsonfile')

// consultar tree.json
let variantes = jsonfile.readFileSync('./variantes.json')
let tree = jsonfile.readFileSync('./tree.json')
// tree.json tiene directorios y files
// por cada directorio 
let agrupacionesDirectorio = tree[0].contents
  .filter(c => c.type === 'directory')
  .map(c => {
    return c.name
  })

// por cada directorio 
variantes = variantes.map(vari => {
  let agrFolder = agrupacionesDirectorio.find(a => a.includes(vari.CLAVE_AGRU))
  let variPoligonoFile = tree[0].contents
    .find(c => c.name === agrFolder).contents
    .find(c => c.name.includes('Poligono.json') && c.name.includes(vari.CLAVE_VAR)).name
  let variPoligono = jsonfile.readFileSync(`./${agrFolder}/${variPoligonoFile}`)
  vari.geojson = variPoligono
  return vari
})

jsonfile.writeFileSync('./variantes.json', variantes)


