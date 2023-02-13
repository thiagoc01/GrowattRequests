/**
 * @constant {Object}
 * 
 * Contém os parâmetros que podem ser passados para obter os dados da energia de um dispositivo
 */

const parametrosInversor =
{
    potencia :
    {
        pac : 'pac',
        potenciaMppt : 'ppv',
        potenciaR : 'pacr',
        potenciaS : 'pacs',
        potenciaT : 'pact',
        potencia1 : 'ppv1',
        potencia2 : 'ppv2',
        potencia3 : 'ppv3'
    },

    voltagem :
    {
        mppt1 : "VPV1",
        mppt2 : "VPV2",
        mppt3 : "VPV3",
        string1 : "vString1",
        string2 : "vString2",
        string3 : "vString3",
        string4 : "vString4",
        string5 : "vString5",
        string6 : "vString6",
        string7 : "vString7",
        string8 : "vString8"
    },

    corrente :
    {
        mppt1 : "VPV1",
        mppt2 : "VPV2",
        mppt3 : "VPV3",
        string1 : "vString1",
        string2 : "vString2",
        string3 : "vString3",
        string4 : "vString4",
        string5 : "vString5",
        string6 : "vString6",
        string7 : "vString7",
        string8 : "vString8"
    }
}

module.exports = {parametrosInversor}