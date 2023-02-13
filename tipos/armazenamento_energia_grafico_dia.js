const armazenamentoEnergiaGraficoDados = require('./armazenamento_energia_grafico_dia_dados.js')

/**
 * Obtém objeto traduzido do objeto que contém informação da energia de um dispositivo de armazenamento
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjArmazenamentoEnergiaDia(dados)
{
    const obj =
    {
        eCargaTotal : dados['eChargeTotal'],
        eDescarga : dados['eDisCharge'],
        eCarga : dados['eCharge'],
        eAcCarga : dados['eAcCharge'],
        eDescargaTotal : dados['eDisChargeTotal'],
        eAcDescarga : dados['eAcDisCharge'],
        graficos : armazenamentoEnergiaGraficoDados.obterObjArmazenamentoEnergiaDiaGrafico(dados['charts'])
    }

    return obj
}

module.exports = {obterObjArmazenamentoEnergiaDia}