function obterObjAtualizacaoTempo(dados)
{
    return {utc : dados['utc'], loc : dados['loc']}
}

module.exports = {obterObjAtualizacaoTempo}