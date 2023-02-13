/**
 * Obtém objeto traduzido do objeto 'cdsData' que contém informação do armazenamento de uma bateria
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjArmazenamentoBateriaCds(dados)
{
    const obj =
    {
        cdCargaLista : dados['cd_charge'],
        CcdDescargaLista : dados['cd_disCharge']
    }

    return obj
}

module.exports = {obterObjArmazenamentoBateriaCds}