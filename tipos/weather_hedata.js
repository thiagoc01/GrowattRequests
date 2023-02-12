const wBasic = require('./weather_basic.js')
const wNow = require('./weather_now.js')
const wUpdate = require('./weather_update.js')


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