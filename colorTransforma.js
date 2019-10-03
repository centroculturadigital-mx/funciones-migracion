
const hexToRGB = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex = (c) => {
  return componentToHex(c.r) + componentToHex(c.g) + componentToHex(c.b);
}

const generarPaleta = (colorInicial, colorFinal, numGrados) => {

  /*
  > recibe
  colorInicial: color HEX
  colorFinal: color HEX
  numGrados: Int
  < devuelve
  Arreglo de colores HEX 
  ["#fa0",...]
  
  
  */

  if( typeof colorInicial == "string" && typeof colorFinal == "string" ) {
      colorInicial = hexToRGB(colorInicial)
      colorFinal = hexToRGB(colorFinal)

          
      let rangos = {
          r: colorFinal.r-colorInicial.r,
          g: colorFinal.g-colorInicial.g,
          b: colorFinal.b-colorInicial.b
      }
      
      
      let nuevoColor = {
          r: colorInicial.r,
          g: colorInicial.g,
          b: colorInicial.b,
      }
      
      let nuevosColores = []

      for( let i=0; i<numGrados; i++){
          nuevoColor.r += Math.ceil(rangos.r / numGrados)
          nuevoColor.g += Math.ceil(rangos.g / numGrados)
          nuevoColor.b += Math.ceil(rangos.b / numGrados)

          nuevoColor.r = Math.max(Math.min(nuevoColor.r,255),0)
          nuevoColor.g = Math.max(Math.min(nuevoColor.g,255),0)
          nuevoColor.b = Math.max(Math.min(nuevoColor.b,255),0)

          nuevosColores.push(rgbToHex(nuevoColor))
      }

      // const coloresHex = nuevosColores.map(c=>`rgba(${c.r},${c.g},${c.b})`)
      // return coloresHex

      return nuevosColores

  } else {
      console.warn("Colores deben ser HEX", colorInicial, colorFinal)
  }
  
  return []

}

module.exports = {
  generarPaleta,
  hexToRGB, 
  componentToHex, 
  rgbToHex, 
}