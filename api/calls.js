/**
 * Script que contém a classe e os métodos que fazem os requests a um servidor Growatt.
 */

const Url = require('url');
const parametros = require('../util/parametros.js')
const excecoes = require('../excecoes/excecoes.js');

/**
 * @class
 * @classdesc Classe que contém os métodos que fazem requests ao servidor
 * 
 * A classe possui uma sessão como objeto no padrão Composite.
 * Ela segue um padrão básico: cada método retorna o resultado de um métdo GET e POST,
 * onde cada resposta foi analisada por um callback func.
 * Os parâmetros são passados aos métodos e convertidos em parâmetros de requisição HTTP.
 */

class Calls
{
    /**
     * Inicializa a classe com uma sessão que deve estar definida e iniciada
     * 
     * @throws {ExcecaoSessaoNaoIniciada} se a sessão fornecida está indefinida ou não foi iniciada
     * @param {Sessao} sessao objeto da classe Sessao
     */
    constructor(sessao)
    {
        if (sessao === undefined || !sessao.estaConectado)
            throw new excecoes.ExcecaoSessaoNaoIniciada("É necessária uma sessão para realizar chamadas!")
        this.sessao = sessao
    }

    /**
     * @callback func função callback para analisar a resposta
     * 
     * @param res resposta obtida no request
     */

    /**
     * Faz um request do tipo GET ao servidor no recurso dado por url, onde a resposta é analisada pelo callback func
     *
     * @param {func} func função callback
     * @param {string} url recurso a ser acessado no servidor
     * @returns {Promise} promessa baseada na resposta obtida
     */

    async realizarGet(func, url)
    {
        await this.sessao.checarValidadeCookie()

        return new Promise((resolve, reject) => 
        {
            this.sessao.axios
              .get(this.sessao.obterUrl(url), { headers: this.sessao.headers })
              .then(res => 
                {
                    if (!func(res))
                        reject(res)

                    else
                        resolve(res)
                })
              .catch(res => {reject(res); this.verificaCodigoInvalidoHTTP(res);});
        });
    }

    /**
     * Faz um request do tipo POST ao servidor no recurso dado por url, onde a resposta é analisada pelo callback func
     *
     * @param {function} func função callback para analisar a resposta
     * @param {string} url recurso a ser acessado no servidor
     * @param {Object} paramsObj parâmetros a serem fornecidos para o request
     * @param {string} paramsUrl parâmetros que são passados via URL
     * @returns {Promise} promessa baseada na resposta obtida
     */

    async realizarPost(func, url, paramsObj, paramsUrl = '')
    {    
        await this.sessao.checarValidadeCookie()

        return new Promise((resolve, reject) => 
        {
            let params = null // Assume-se que não são passados parâmetros

            if (paramsObj !== undefined)
                params = new Url.URLSearchParams(paramsObj).toString();
                
            this.sessao.axios
              .post(this.sessao.obterUrl(url) + paramsUrl, params, { headers: this.sessao.headers })
              .then(res => 
                {
                    if (!func(res))
                        reject(res)

                    else
                        resolve(res)
                })
              .catch(res => {reject(res); this.verificaCodigoInvalidoHTTP(res, reject);});
        });
    }

    /**
     * Verifica se o código da resposta HTTP está entre o padrão de normalidade (200 ~ 300)
     * @throws {ExcecaoRequisicaoHTTP} Código fora do intervalo 200 ~ 300
     * @param {any} res Resposta HTTP
     */
    
    verificaCodigoInvalidoHTTP(res)
    {
        if (res.response.status < 200 || res.response.status > 300)
            throw new excecoes.ExcecaoRequisicaoHTTP(res.response.status, "Erro na requisição HTTP")
    }

    /**
     * Verifica o tipo de problema na requisição
     * 
     * @param {any} res Resposta HTTP
     */

    trataProblemaRequisicao(res)
    {
        if (res.request.path.match('errorMess'))
            new excecoes.ExcecaoRespostaServidor(res.data, `Ocorreu um erro durante a requisição: ${res.request.path}`);

        else
            new excecoes.ExcecaoRespostaServidor(res.data);
    }

    /**
     * Obtém a lista de plantas sob controle da conta logada
     * 
     * @returns {Promise<Array<Object>>} lista contendo objetos JSON das plantas
     */

    async obterListaPlanta()
    {
        let func = function(res)
        {
            if (!Array.isArray(res.data))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
                
        }

        return (await this.realizarGet(func, 'plantList')).data
    }

    /**
     * Obtém os dispositivos na planta fornecida
     * 
     * @param {string} idPlanta ID da planta a ser verificada 
     * @returns {Promise<Array<Object>>} lista contendo objetos JSON com informações dos dispositivos
     */

    async obterDispositivosPlanta(idPlanta)
    {
        const params = 
        {
            plantId: idPlanta,
            currPage: '1'
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'devicesByPlantList', params)).data.obj.datas
    }

    /**
     * Obtém as informações do dispositivo fornecido em uma planta específica
     * 
     * @param {string} idPlanta ID da planta
     * @param {string} numeroSerial número serial do dispositivo na planta
     * @param {string} tipo tipo da informação (storage/datalog)
     * @returns {Promise<Object>} informações de armazenameto ou datalog do dispositivo
     */

    async obterInfoDispositivo(idPlanta, numeroSerial, tipo = 'storage')
    {
        const params = 
        {
            plantId: idPlanta,
            deviceTypeName: tipo,
            sn: numeroSerial
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;                
        }

        return (await this.realizarPost(func, 'deviceInfo', params)).data.obj
    }

    /**
     * Obtém as informações do tempo (weather) na planta
     * 
     * @param {string} idPlanta ID da planta
     * @returns {Promise<Object>} informações do tempo da planta
     */

    async obterCondicaoTempoPlanta(idPlanta)
    {
        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'weather', undefined, `?plantId=${idPlanta}`)).data.obj
    }
    
    /**
     * Obtém as especificações técnicas da planta
     * 
     * @param {string} idPlanta ID da planta
     * @returns {Promise<Object>} informações técnicas da planta
     */

    async obterDadosPlanta(idPlanta)
    {
        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'plantData', undefined, `?plantId=${idPlanta}`)).data.obj
    }

    /**
     * Método auxiliar para generalizar o request de info de energia com base no tipo de período de tempo
     * 
     * @description O parâmetro tempo dita o formato da data e o recurso que será analisado no servidor
     * 
     * @param {string} tempo período de tempo a ser analisado (dia/mes/ano)
     * @param {Date} data objeto inicializado da classe Date
     * @param {string} dir recurso a ser solicitado no servidor
     * @returns {Array<string>} array de dois itens, um sendo objeto contendo a data ajustada e o outro o diretório para o servidor
     */

    retornaParametrosData(tempo, data, dir)
    {
        let params = {}
        switch (tempo)
        {
            case 'dia':
                params.date = data.toISOString().substr(0, 10)
                break;

            case 'mes':
                params.date = data.toISOString().substr(0, 7)
                dir = dir.replace('Day', 'Month')
                break;

            case 'ano':
            case 'total':
                params.year = data.toISOString().substr(0, 4)
                dir = dir.replace('Day', 'Year')

            case 'total':
                dir = dir.replace('Day', 'Total')
        }

        return [params, dir] 
    }

    /**
     * Obter os dados de energia de um inversor
     * 
     * @param {string} idPlanta ID da planta
     * @param {Date} data data em que se deseja obter informações
     * @param {string} tempo período de tempo (dia/mes/ano)
     * @returns {Promise<Object>} objeto com a propriedade 'pac'
     */
    
    async obterDadosEnergiaInversor(idPlanta, data, tempo = 'dia')
    {
        let [params, dir] = [...this.retornaParametrosData(tempo, data, 'inverterEnergyDataDayUrl')]

        params.plantId = idPlanta;

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, dir, params)).data.obj
    }

    /**
     * Obtém dados de energia de um dispositivo qualquer
     * 
     * @description Se fornecido o parâmetro dia para tempo, obtém-se os dados dos parâmetros de param para cada 5 minutos do dia
     * 
     * @param {string} idPlanta ID da planta
     * @param {Date} data data em que se deseja obter as informações
     * @param {string} sn número serial do dispositivo
     * @param {string} param parâmetros que se deseja obter informações. É uma string concatenada com ',', onde os parâmetros podem ser obtidos pelo arquivo parametros.js
     * @param {string} tipo tipo do dispositivo
     * @param {string} tempo período das informações (dia/mes/ano)
     * @returns {Promise<Object>} objeto com propriedades dadas pelos parâmetros em 'param'
     */

    async obterDadosEnergiaDispositivo(idPlanta, data, sn = '', param = parametros.parametrosInversor.potencia.pac,
                                        tipo = 'max', tempo = 'dia')
    {
        let jsonData = {params: param}

        let [params, dir] = [...this.retornaParametrosData(tempo, data, 'deviceEnergyDataDayUrl')]
        
        /* Se o número serial é vazio, iremos obter informação da planta */

        if (sn === '')
        {
            jsonData.type = "plant"
            jsonData.sn = idPlanta
        }
        
        else
        {
            jsonData.type = tipo
            jsonData.sn = sn
        }

        params.plantId = idPlanta;
        params.jsonData = JSON.stringify([jsonData])

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, dir, params)).data.obj[0].datas
    }

    /**
     * Obtém informação do armazenamento da planta no período inteiro
     * 
     * @param {string} idPlanta ID da planta
     * @param {string} numeroSerialArmazenamento número serial do dispositivo de armazenamento
     * @returns {Promise<Object>} objeto contendo as informações
     */

    async obterInformacaoTotalArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'storageTotalData', params, `?plantId=${idPlanta}`)).data.obj.datas
    }

    /**
     * Obtém informação de status atual do armazenamento da planta
     * 
     * @param {string} idPlanta ID da planta
     * @param {string} numeroSerialArmazenamento número serial do dispositivo de armazenamento
     * @returns {Promise<Object>} objeto contendo as informações
     */

    async obterInformacaoStatusArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'storageStatusData', params, `?plantId=${idPlanta}`)).data.obj
    }

    /**
     * Obtém informação da bateria do armazenamento da planta
     * 
     * @param {string} idPlanta ID da planta
     * @param {string} numeroSerialArmazenamento número serial do dispositivo de armazenamento
     * @returns {Promise<Object>} objeto contendo as informações
     */

    async obterInformacaoBateriaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'storageBatteryData', params, `?plantId=${idPlanta}`)).data.obj
    }
    
    /**
     * Obtém informação de energia do armazenamento da planta em certo dia
     * 
     * @param {string} idPlanta ID da planta
     * @param {string} numeroSerialArmazenamento número serial do dispositivo de armazenamento
     * @param {Date} data a data em que se deseja as informações
     * @returns {Promise<Object>} objeto contendo as informações
     */

    async obterInformacaoEnergiaDiaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento, data)
    {
        const params = 
        {
            plantId : idPlanta,
            storageSn : numeroSerialArmazenamento,
            data: data.toISOString().substr(0, 10)
        }

        let func = function(res)
        {
            if (!(res.data && res.data.result == 1))
            {
                Calls.prototype.trataProblemaRequisicao(res);
                return false;
            }

            return true;
        }

        return (await this.realizarPost(func, 'storageBatteryData', params)).data.obj
    }    
}

module.exports = {Calls}