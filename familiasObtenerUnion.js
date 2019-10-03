const jsonfile = require('jsonfile')
const turf = require('@turf/turf')

// consultar tree.json
let agrupaciones = jsonfile.readFileSync('./agrupaciones.json')
let familias = jsonfile.readFileSync('./familias.json')
let tree = jsonfile.readFileSync('./tree.json')
// tree.json tiene directorios y files
// por cada directorio 
familias.forEach(fam => {
  let familiaNombre = fam.id
  let familiaUnion
  // console.log(`Creando ./${familiaNombre}Union.json`)
  fam.agrupaciones.forEach(agrId => {
    let agrClave = agrupaciones.find(a => a.id === agrId).CLAVE_AGRU
    let agrFolder = tree[0].contents.find(c => c.type === 'directory' && c.name.includes(agrClave)).name
    let agrUnion = jsonfile.readFileSync(`./${agrFolder}/${agrFolder}Union.json`)
    if ( !familiaUnion ) {
      familiaUnion = agrUnion
    } else {
      familiaUnion = turf.union(familiaUnion, agrUnion)
    }
  })
  let areaKm2 = Math.floor(turf.area(familiaUnion)/1000000)
  console.log('Creando area', familiaNombre, areaKm2 + ' km²')
  if (areaKm2 < 1000) {
    console.log('--- calculando circulo por area muy pequeña: ', areaKm2)
    
    let center = turf.centerOfMass(familiaUnion)
    let circle = turf.circle(center, 75, {steps: 10, units: 'kilometers'})
    familiaUnion = circle
  } else if (areaKm2 < 2000) {
    console.log('--- escalando por area mediana: ', areaKm2)
    
    familiaUnion = turf.transformScale(familiaUnion, 3)
  } else {
    console.log('--- simplificando')
    familiaUnion = turf.simplify(familiaUnion, {tolerance: 0.1, highQuality: false, mutate: true})
  }
  jsonfile.writeFileSync(`./${familiaNombre}Union.json`, familiaUnion)
  
})

