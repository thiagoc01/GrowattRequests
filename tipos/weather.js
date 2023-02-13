const wData = require('./weather_data.js')

/**
 * Obtém objeto traduzido do objeto que contém as informações de tempo (weather) de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjTemperatura(dados)
{
    const obj = 
    {
        cidade : dados['city'],
        semana : dados['week'],
        textoDados : dados['dataStr'],
        radiacao : dados['radiant'],
        infoTempo : wData.retornaListaTempo(dados['data']['HeWeather6'])
    }

    return obj
}

module.exports = {obterObjTemperatura}