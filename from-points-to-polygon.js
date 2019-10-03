const jsonfile = require('jsonfile')
const concaveman = require('concaveman')

const turf = require('@turf/turf')



const fromPointsToPolygon = (origin, dest) => {
  let geojsonPoints = jsonfile.readFileSync(origin)
  let points = geojsonPoints.features.map(f => {
    return f.geometry.coordinates
  })
  if (points.length < 4) {
    let bbox = turf.bbox(turf.points(points))

    while ( bbox[0] === bbox[2] || bbox[1] === bbox [3] ){
      bbox[2] += 0.001
      bbox[3] += 0.001
    }
    points = [
      [bbox[0], bbox[1]],
      [bbox[0], bbox[3]],
      [bbox[2], bbox[1]],
      [bbox[2], bbox[3]]
    ]
  }
  let concaveHux = concaveman(points, 1, points.length < 4 ? 1 : 0.1)
  if (concaveHux.length < 4) {
    console.log('dest', dest, points )
  }
  let polygon = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      properties: {},
      coordinates: [concaveHux]
    }
  }
  jsonfile.writeFileSync(dest, polygon)
}
module.exports = fromPointsToPolygon
  
