const wHeData = require('./weather_hedata.js')

/**
 * Obtém objeto traduzido do objeto 'data' que contém as informações de tempo (weather) de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function retornaListaTempo(lista)
{
    let ret = []

    for (let i = 0 ; i < lista.length ; i++)
        ret.push(wHeData.retornaObjHeWeather(lista[i]))

    return ret
}

module.exports = {retornaListaTempo}