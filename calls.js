const Url = require('url');
const parametros = require('./parametros.js')
const excecoes = require('./excecoes.js')

class Calls
{
    constructor(sessao)
    {
        if (sessao === undefined || !sessao.estaConectado)
            throw new excecoes.ExcecaoSessaoNaoIniciada("É necessária uma sessão para realizar chamadas!")
        this.sessao = sessao
    }

    async realizarGet(func, url)
    {
        await this.sessao.checarValidadeCookie()

        return new Promise((resolve, reject) => 
        {
            this.sessao.axios
              .get(this.sessao.obterUrl(url), { headers: this.sessao.headers })
              .then(res => 
                {
                    func(res, reject)
                    resolve(res)
                })
              .catch(res => this.verificaCodigoInvalidoHTTP(res, reject));
        });
    }

    async realizarPost(func, url, paramsObj, paramsUrl = '')
    {    
        await this.sessao.checarValidadeCookie()

        return new Promise((resolve, reject) => 
        {
            let params = null

            if (paramsObj !== undefined)
                params = new Url.URLSearchParams(paramsObj).toString();
                
            this.sessao.axios
              .post(this.sessao.obterUrl(url) + paramsUrl, params, { headers: this.sessao.headers })
              .then(res => 
                {
                    func(res, reject)
                    resolve(res)
                })
              .catch(res => this.verificaCodigoInvalidoHTTP(res, reject));
        });
    }
    
    verificaCodigoInvalidoHTTP(res, reject)
    {
        if (res.response.status < 200 || res.response.status > 300)
            throw new excecoes.ExcecaoRequisicaoHTTP(res.response.status, "Erro na requisição HTTP")

        reject(res)
    }

    trataProblemaRequisicao(res, reject)
    {
        if (res.request.path.match('errorMess'))
            reject(new excecoes.ExcecaoRespostaServidor(res.data, `Ocorreu um erro durante a requisição: ${res.request.path}`));

        else
            reject(new excecoes.ExcecaoRespostaServidor(res.data));
    }

    async obterListaPlanta()
    {
        let func = function(res, reject)
        {
            if (Array.isArray(res.data))
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarGet(func, 'plantList')
    }

    async obterDispositivosPlanta(idPlanta)
    {
        const params = 
        {
            plantId: idPlanta,
            currPage: '1'
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data.obj.datas)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'devicesByPlantList', params)
    }

    async obterInfoDispositivo(idPlanta, numeroSerial, tipo = 'storage')
    {
        const params = 
        {
            plantId: idPlanta,
            deviceTypeName: tipo,
            sn: numeroSerial
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data.obj)

            else if (res.status < 200 && res.status > 300)
                throw new Error("Teste")

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'deviceInfo', params)
    }

    async obterCondicaoTempoPlanta(idPlanta)
    {

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data.obj)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)

        }

        return await this.realizarPost(func, 'weather', undefined, `?plantId=${idPlanta}`)
    }

    async obterDadosPlanta(idPlanta)
    {

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data.obj)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)

        }

        return await this.realizarPost(func, 'plantData', undefined, `?plantId=${idPlanta}`)
    }

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

    async obterDadosEnergiaInversor(idPlanta, data, tempo = 'dia')
    {
        let [params, dir] = [...this.retornaParametrosData(tempo, data, 'inverterEnergyDataDayUrl')]

        params.plantId = idPlanta;

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, dir, params)
    }

    async obterDadosEnergiaDispositivo(idPlanta, data, sn = '', param = parametros.parametrosInversor.potencia.pac, tipo = 'max', tempo = 'dia')
    {
        let jsonData = {params: param}

        let [params, dir] = [...this.retornaParametrosData(tempo, data, 'deviceEnergyDataDayUrl')]
        
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

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data.obj[0].datas)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, dir, params)
    }

    async obterInformacaoTotalArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'storageTotalData', params, `?plantId=${idPlanta}`)
    }

    async obterInformacaoStatusArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'storageStatusData', params, `?plantId=${idPlanta}`)
    }

    async obterInformacaoBateriaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)
    {
        const params = 
        {
            storageSn : numeroSerialArmazenamento
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'storageBatteryData', params, `?plantId=${idPlanta}`)
    }    

    async obterInformacaoEnergiaDiaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento, data)
    {
        const params = 
        {
            plantId : idPlanta,
            storageSn : numeroSerialArmazenamento,
            data: data.toISOString().substr(0, 10)
        }

        let func = function(res, reject)
        {
            if (res.data && res.data.result == 1)
                console.log(res.data)

            else 
                Calls.prototype.trataProblemaRequisicao(res, reject)
        }

        return await this.realizarPost(func, 'storageBatteryData', params)
    }    
}
module.exports = {Calls}