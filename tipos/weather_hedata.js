const wBasic = require('./weather_basic.js')
const wNow = require('./weather_now.js')
const wUpdate = require('./weather_update.js')

/**
 * Obtém objeto traduzido do objeto 'HeWeather6' que contém as informações de tempo (weather) de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */


function retornaObjHeWeather(dados)
{
    const obj = 
    {
        status : dados.status,
        atualizacao : wUpdate.obterObjAtualizacaoTempo(dados['update']),
        basico : wBasic.obterObjTempoBasico(dados['basic']),
        agora : wNow.obterObjTempoAgora(dados['now'])
    }

    return obj
}

module.exports = {retornaObjHeWeather}