/**
 * Obtém objeto traduzido do objeto que contém dados de uma planta
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjDadosPlanta(dados)
{
    const obj =
    {
        precoPeriodoVale : dados['valleyPeriodPrice'],
        arvoreFormula : dados['formulaTree'],
        precoPeriodoPlano : dados['flatPeriodPrice'],
        gasCarbonico : dados['co2'],
        longitude : dados['lng'],
        unidadeMonetaria : dados['moneyUnit'],
        precoPeriodoPico : dados['peakPeriodPrice'],
        formulaCarvao : dados['formulaCoal'],
        cidade : dados['city'],
        potenciaNominal : dados['nominalPower'],
        id : dados['id'],
        zonaHoraria : dados['timezone'],
        arvore : dados['tree'],
        carvao : dados['coal'],
        imgLocalizacao : dados['locationImg'],
        precoPotenciaFixa : dados['fixedPowerPrice'],
        unidadeMonitariaTexto : dados['moneyUnitText'],
        latitude : dados['lat'],
        imgPlanta : dados['plantImg'],
        nomePlanta : dados['plantName'],
        dataCriacao : dados['creatDate'],
        energiaTotal : dados['eTotal'],
        formulaCO2 : dados['formulaCo2'],
        tipoPlanta : dados['plantType'],
        pais : dados['country'],
        nomeConta : dados['accountName'],
        formulaMonetaria : dados['formulaMoney'],
        eCompartilhada : dados['isShare']
    }

    return obj
}

module.exports = {obterObjDadosPlanta}