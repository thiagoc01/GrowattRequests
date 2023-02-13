/**
 * Obtém objeto traduzido do objeto 'update' do objeto 'HeWeather6' que contém as informações de tempo (weather) de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjAtualizacaoTempo(dados)
{
    return {utc : dados['utc'], loc : dados['loc']}
}

module.exports = {obterObjAtualizacaoTempo}