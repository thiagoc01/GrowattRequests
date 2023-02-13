/**
 * Obtém objeto traduzido do objeto 'charts' que contém informação da energia de um dispositivo de armazenamento
 * @param {Object} dados objeto original
 * @returns {Object} objeto com os campos traduzidos
 */

function obterObjArmazenamentoEnergiaDiaGrafico(dados)
{
    const obj =
    {
        pac : dados['pacToUser'],
        saidaSys : dados['sysOut'],
        cargaUsuario : dados['userLoad'],
        ppv : dados['ppv']
    }

    return obj
}

module.exports = {obterObjArmazenamentoEnergiaDiaGrafico}