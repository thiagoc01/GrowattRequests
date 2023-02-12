function obterObjPlanta(dados)
{
    return {id : dados['id'], zonaHoraria : dados['timezone'], nomePlanta : dados['plantName']}
}

module.exports = {obterObjPlanta}