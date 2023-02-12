const wHeData = require('./weather_hedata.js')

function retornaListaTempo(lista)
{
    let ret = []

    for (let i = 0 ; i < lista.length ; i++)
        ret.push(wHeData.retornaObjHeWeather(lista[i]))

    return ret
}

module.exports = {retornaListaTempo}