function obterObjTempoAgora(dados)
{
    const obj =
    {
        codigoCondicao : dados['cond_code'],
        textoCondicao : dados['cond_txt'],
        umidade : dados['hum'],
        fl : dados['fl'],
        pcpn : dados['pcpn'],
        velocidadeVento : dados['wind_spd'],
        nuvens : dados['cloud'],
        temperatura : dados['tmp'],
        direcaoVento : dados['wind_dir'],
        scVento : dados['wind_sc'],
        grausVento : dados['wind_deg'],
        pressao : dados['pres'],
        visibilidade : dados['vis']        
    }

    return obj
}

module.exports = {obterObjTempoAgora}