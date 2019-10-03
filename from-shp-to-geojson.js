const shapefile = require('shapefile')
const jsonfile = require('jsonfile')


const fromShpToGeoJson = async (agrupacionFolder, variante) => {
  const file = `./${agrupacionFolder}/${variante}Puntos.json`
  shapefile.read(`./${agrupacionFolder}/${variante}.shp`)
    .then(res => {
      res.features = res.features.map(f => {
        // console.log(f)
        f.geometry.coordinates = [f.properties.LONGITUD, f.properties.LATITUD]
        return f
      })
      jsonfile.writeFile(file, res, { spaces: 2 }, function (err, obj) {
        if (err) console.error(err)
      })
    })
    .catch(error => console.error(error.stack))
}

module.exports = fromShpToGeoJson

