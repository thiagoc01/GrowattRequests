const armazenamentoEnergiaGraficoDados = require('./armazenamento_energia_grafico_dia_dados.js')

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