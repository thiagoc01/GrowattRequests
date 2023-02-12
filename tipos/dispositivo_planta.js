function obterObjDispositivo(dados)
{
    const obj =
    {
        pac : dados['pac'],
        numeroSerial : dados['sn'],
        nomePlanta : dados['plantName'],
        localizacao : dados['location'],
        apelido : dados['alias'],
        status : dados['status'],
        energiaHoje : dados['eDay'],
        ultimaAtualizacao : dados['lastUpdateDateTime'],
        numeroSerialDatalog : dados['datalogSn'],
        tipoTesteDatalog : dados['datalogTypeTest'],
        modelo : dados['deviceModel'],
        bdcStatus : dados['bdcStatus'],
        nomeTipoDispositivo : dados['deviceTypeName'],
        energiaTotal : dados['eTotal'],
        energiaMes : dados['eMonth'],
        potenciaNominal : dados['nominalPower'],
        nomeConta : dados['accountName'],
        zonaHoraria : dados['timezone'],
        horaServidor : dados['timeServer'],
        idPlanta : dados['idPlanta'],
        tipoDispositivo : dados['deviceType']
    }

    return obj
}

module.exports = {obterObjDispositivo}