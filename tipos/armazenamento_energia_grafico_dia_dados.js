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