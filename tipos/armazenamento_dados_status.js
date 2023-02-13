/**
 * Obtém objeto traduzido do objeto que contém informação do status de um dispositivo de armazenamento
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjDadosStatusArmazenamento(dados)
{
    const obj =
    {
        fAcEntrada : dados['fAcInput'],
        status : dados['status'],
        vAcEntrada : dados['vAcInput'],
        potenciaGrid : dados['gridPower'],
        potenciaBateria : dados['batPower'],
        iPv2 : dados['iPv2'],
        iPv1 : dados['iPv1'],
        taxaVA : dados['rateVA'],
        voltagemBateria : dados['vBat'],
        percentualCarga : dados['loadPercent'],
        iTotal : dados['iTotal'],
        tipoDispositivo : dados['deviceType'],
        potenciaPainel : dados['panelPower'],
        capacidade : dados['capacity'],
        vAcSaida : dados['vAcOutput'],
        statusInversor : dados['invStatus'],
        potenciaCarga : dados['loadPower'],
        ppv2 : dados['ppv2'],
        ppv1 : dados['ppv1'],
        vPv2 : dados['vPv2'],
        fAcSaida : dados['fAcOutput'],
        vPv1 : dados['vPv1']
    }

    return obj
}

module.exports = {obterObjDadosStatusArmazenamento}