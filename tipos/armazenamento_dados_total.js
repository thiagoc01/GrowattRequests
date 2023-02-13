/**
 * Obtém objeto traduzido do objeto que contém informação do total do armazenamento de armazenamento
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function retornaObjDadosTotaisArmazenamento(dados)
{
    const obj =
    {
        tipoDispositivo : dados['deviceType'],
        usoTotalEnergia : dados['useEnergyTotal'],
        cargaTotal : dados['chargeTotal'],
        cargaDia : dados['chargeToday'],
        energiaAoUsuarioHoje : dados['eToUserToday'],
        energiaDescarregadaHoje : dados['eDischargeToday'],
        energiaDescarregadaTotal : dados['eDischargeTotal'],
        usoEnergiaHoje : dados['useEnergyToday'],
        energiaAoUsuarioTotal : dados['eToUserTotal'],
        epvTotal : dados['epvTotal'],
        epvHoje : dados['epvToday']
    }

    return obj
}

module.exports = {retornaObjDadosTotaisArmazenamento}