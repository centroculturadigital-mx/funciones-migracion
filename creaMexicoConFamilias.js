const fs = require('fs')
const jsonfile = require('jsonfile')

let familias = jsonfile.readFileSync('./familias.json')

let mexicoPath = fs.readFileSync('./mexico.svg', 'utf8')

let paths = []
let colores = [
  'red',
  'yellow',
  'blue',
  'green',
  'orange',
  'pink',
  'purple',
  'teal',
  'magenta',
  'lime',
  'darkred',
]

familias.forEach((fam, i) => {
  console.log(fam.id, colores[i])
  
  let famPath = fs.readFileSync(`./${fam.id}.svg`, 'utf8')
  famPath = famPath.split('path ')
  famPath = `
    ${famPath[0]}path
    fill="${colores[i]}"
    stroke="${colores[i]}"
    stroke-linejoin="round"
    opacity="0.7"
    stroke-width="0.2"
    ${famPath[1]}`
  paths.push(famPath)
})



let templateHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body style="margin: 0">
  <div style="height: 99vh">
    <svg width="100%" height="100%" viewBox="45 40 20 20">
      ${mexicoPath}
      ${paths}
    </svg>
  </div>
</body>
</html>
`

fs.writeFileSync(
  `./mexicoConFamilias.html`,
  templateHTML
)