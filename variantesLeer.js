const shapefile = require('shapefile')
const jsonfile = require('jsonfile')

let variantes = []

const creaArchivoVariantes = () => {
  jsonfile.writeFileSync('./variantes.json', variantes)
}

shapefile.openDbf("cat_vari.dbf")
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) {
        creaArchivoVariantes()
        return
      }
      console.log(result.value)
      result.value.id = 
        result.value.NOM_VAR.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-'\s]/g, '')
        .toLowerCase()
      variantes.push(result.value)
      return source.read().then(log)
    }))
  .catch(error => console.error(error.stack))