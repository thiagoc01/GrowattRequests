const wData = require('./weather_data.js')

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