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