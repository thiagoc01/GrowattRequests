function obterObjTempoBasico(dados)
{
    const obj =
    {
        areaAdmin : dados['admin_area'],
        longitude : dados['lon'],
        cidadePai : dados['parent_city'],
        zonaHoraria : dados['tz'],
        hoje : dados['toDay'],
        localizacao: dados['location'],
        nascerDoSol : dados['sr'],
        pais : dados['cnty'],
        porDoSol : dados['ss'],
        idCidade : dados['cid'],
        latitude : dados['lat']
    }

    return obj
}

module.exports = {obterObjTempoBasico}