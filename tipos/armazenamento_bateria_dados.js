const armazenamentoBatDadosCds = require('./armazenamento_bateria_dados_cds.js')
const armazenamentoBatGraficoSoc = require('./armazenamento_bateria_grafico_soc.js')

/**
 * Obtém objeto traduzido do objeto que contém informação do armazenamento de uma bateria
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjArmazenamentoBateria(dados)
{
    const obj =
    {
        data : dados['date'],
        cdsTitulo : dados['cdsTitle'],
        cdsDados : armazenamentoBatDadosCds.obterObjArmazenamentoBateriaCds(dados['cdsData']),
        graficoSoc : armazenamentoBatGraficoSoc.obterObjArmazenamentoBateriaGraficoSoc(dados['socChart'])
    }

    return obj
}

module.exports = {obterObjArmazenamentoBateria}