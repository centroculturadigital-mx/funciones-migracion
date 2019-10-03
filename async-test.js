let x = 0 
    setInterval( () => {
      console.log(x)
      x ++
    }, 1000)
    start()
    async function asincrona () {
      return new Promise(resolve => setTimeout(() => {
        resolve('hola')
      }, 2000))
    }
    async function asincrona2 () {
      return new Promise(resolve => setTimeout(() => {
        resolve('hola2')
      }, 3000))
    }
    async function asincrona3 () {
      return new Promise(resolve => setTimeout(() => {
        resolve('hola3')
      }, 4000))
    }
    async function asincrona4 () {
      return new Promise(resolve => setTimeout(() => {
        resolve('hola4')
      }, 1000))
    }
    async function start () {
      // empieza una por una e imprime el resultado cuando termina cada una
      let a1 = await asincrona()
      console.log('a1', a1)
      let a2 = await asincrona2()
      console.log('a2', a2)
      let a3 = await asincrona3()
      console.log('a3', a3)
      let a4 = await asincrona4()
      console.log('a4', a4)
    }