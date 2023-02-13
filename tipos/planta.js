/**
 * Obtém objeto traduzido do objeto que contém os dados base de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjPlanta(dados)
{
    return {id : dados['id'], zonaHoraria : dados['timezone'], nomePlanta : dados['plantName']}
}

module.exports = {obterObjPlanta}