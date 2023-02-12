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