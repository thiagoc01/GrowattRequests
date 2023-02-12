const armazenamentoBatDadosCds = require('./armazenamento_bateria_dados_cds.js')
const armazenamentoBatGraficoSoc = require('./armazenamento_bateria_grafico_soc.js')

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