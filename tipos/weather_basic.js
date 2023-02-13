/**
 * Obtém objeto traduzido do objeto 'basic' do objeto 'HeWeather6' que contém as informações de tempo (weather) de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjTempoBasico(dados)
{
    const obj =
    {
        areaAdmin : dados['admin_area'],
        longitude : dados['lon'],
        cidadePai : dados['parent_city'],
        zonaHoraria : dados['tz'],
        hoje : dados['toDay'],
        localizacao: dados['location'],
        nascerDoSol : dados['sr'],
        pais : dados['cnty'],
        porDoSol : dados['ss'],
        idCidade : dados['cid'],
        latitude : dados['lat']
    }

    return obj
}

module.exports = {obterObjTempoBasico}