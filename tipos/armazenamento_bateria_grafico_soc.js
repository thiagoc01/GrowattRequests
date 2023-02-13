/**
 * Obtém objeto traduzido do objeto 'socChart' que contém informação do armazenamento de uma bateria
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjArmazenamentoBateriaGraficoSoc(dados)
{
    const obj =
    {
        capacidade : dados['capacity']
    }

    return obj
}

module.exports = {obterObjArmazenamentoBateriaGraficoSoc}