const shapefile = require('shapefile')
const jsonfile = require('jsonfile')

let familias = []

const creaArchivoFamilias = () => {
  jsonfile.writeFileSync('./familias.json', familias)
}

shapefile.openDbf("cat_fam.dbf")
  .then(source => source.read()
    .then(function log(result) {
      if (result.done) {
        creaArchivoFamilias()
        return
      }
      result.value.id = 
        result.value.NOM_FAM.normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[-'\s]/g, '')
        .toLowerCase()
      familias.push(result.value)
      return source.read().then(log)
    }))
  .catch(error => console.error(error.stack))