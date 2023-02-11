class ExcecaoRequisicaoHTTP extends Error
{
    constructor(codigo, msg = "Erro na requisição HTTP")
    {
        super(msg)
        console.log("Código HTTP: " + codigo)
        this.name = "ExcecaoRequisicaoHTTP"
    }
}

class ExcecaoAutenticacaoSessao extends Error
{
    constructor(info, msg = "Falha ao realizar login")
    {
        super(msg)
        console.log("Resposta: " + info)
        this.name = "ExcecaoAutenticacaoSessao"
    }
}

class ExcecaoRespostaServidor extends Error
{
    constructor(info, msg = "Ocorreu um erro durante a requisição")
    {
        super(msg)
        this.name = "ExcecaoRespostaServidor"        
        console.log(info)
    }
}

class ExcecaoSessaoNaoIniciada extends Error
{
    constructor(info, msg = "É necessária uma sessão aberta para realizar chamadas!")
    {
        super(msg)
        this.name = "ExcecaoSessaoNaoIniciada"        
        console.log(info)
    }
}

module.exports = {ExcecaoRequisicaoHTTP, ExcecaoAutenticacaoSessao, ExcecaoRespostaServidor, ExcecaoSessaoNaoIniciada}