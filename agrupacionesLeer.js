const shapefile = require('shapefile')
const jsonfile = require('jsonfile')

let agrupaciones = []

const creaArchivoAgrupaciones = () => {
  jsonfile.writeFileSync('./agrupaciones.json', agrupaciones)
}

shapefile.openDbf("cat_agru.dbf")
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) {
        creaArchivoAgrupaciones()
        return
      }
      result.value.id = 
        result.value.NOM_AGRUP.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-'\s]/g, '')
        .toLowerCase()
      
      agrupaciones.push(result.value)
      return source.read().then(log)
    }))
  .catch(error => console.error(error.stack))