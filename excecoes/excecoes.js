/**
 * @class
 * 
 * @classdesc Imprime uma mensagem de erro HTTP e o código dele
 * @extends Error
 */

class ExcecaoRequisicaoHTTP extends Error
{
    constructor(codigo, msg = "Erro na requisição HTTP")
    {
        super(msg)
        console.log("Código HTTP: " + codigo)
        this.name = "ExcecaoRequisicaoHTTP"
    }
}

/**
 * @class
 * 
 * @classdesc Imprime uma mensagem de erro ao realizar login e uma informação ao usuário
 * @extends Error
 */

class ExcecaoAutenticacaoSessao extends Error
{
    constructor(info, msg = "Falha ao realizar login")
    {
        super(msg)
        console.log("Resposta: " + info)
        this.name = "ExcecaoAutenticacaoSessao"
    }
}

/**
 * @class
 * 
 * @classdesc Imprime uma mensagem de erro na requisição e uma informação ao usuário
 * @extends Error
 */

class ExcecaoRespostaServidor extends Error
{
    constructor(info, msg = "Ocorreu um erro durante a requisição")
    {
        super(msg)
        this.name = "ExcecaoRespostaServidor"        
        console.log(info)
    }
}

/**
 * @class
 * 
 * @classdesc Imprime uma mensagem de erro informando que a requisição não foi iniciada e uma informação ao usuário
 * @extends Error
 */

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