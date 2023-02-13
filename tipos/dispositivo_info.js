/**
 * Obtém objeto traduzido do objeto que contém informações do datalog de um dispositivo
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjInfoDatalogDispositivo(dados)
{
    const obj =
    {
        sinalSim : dados['simSignal'],
        endIPPorta : dados['ipAndPort'],
        intervalo : dados['interval'],
        tipoDispositivo : dados['deviceType'],
        versaoFirmware : dados['firmwareVersion'],
        indicadorTipoDispositivo : dados['deviceTypeIndicate']
    }

    return obj
}

/**
 * Obtém objeto traduzido do objeto que contém informações do armazenamento de um dispositivo
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjInfoArmazenamentoDispositivo(dados)
{
    const obj =
    {
        strModelo : dados['modelText'],
        versaoFirmware : dados['fwVersion'],
        numeroSerial : dados['sn'],
        modeloDispositivo : dados['deviceModel'],
        versaoInterna : dados['innerVersion'],
        tipoArmazenamento : dados['storagedeviceType']
    }

    return obj
}

module.exports = {obterObjInfoDatalogDispositivo, obterObjInfoArmazenamentoDispositivo}