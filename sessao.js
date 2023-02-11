const links = require('./links.js')

const Axios = require('axios');
const Url = require('url');
const https = require('https');
const excecoes = require('./excecoes.js')

const userAgentDefault = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

class Sessao
{
    constructor(usuario, senha, servidor = "https://server.growatt.com/", headers)
    {
        this.usuario = usuario;
        this.senha = senha;
        this.estaConectado = false
        this.servidor = servidor

        if (headers == undefined)
            this.headers = {'User-Agent' : userAgentDefault, Connection: 'keep-alive'}

        else
            this.headers = headers

        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        this.axios = Axios.create({
            baseURL: servidor,
            timeout: 30000,
            headers: headers,
            httpsAgent,
        });
    }

    obterUrl(caminho)
    {
        return this.servidor + links.links[caminho]
    }

    async realizarLogin()
    {
        return new Promise((resolve, reject) => 
        {
            delete this.headers.cookie;
            delete this.cookie;
            const params = new Url.URLSearchParams({ account: this.usuario, password: this.senha, validateCode: '' });

            this.axios
              .post(this.obterUrl('login'), params.toString(), { headers: this.headers })
              .then(res => 
                {
                    if (res.data && res.data.result && res.data.result === 1) 
                    {
                        this.cookie = res.headers['set-cookie'].toString();
                        this.headers.cookie = this.cookie
                        const cookies = this.cookie.split(';');

                        const JSESSONID = (() =>
                        {
                            let session;
                            const cookies = this.cookie.split(';');
                            cookies.forEach(e => 
                                {
                                    if (e.startsWith('JSESSIONID')) 
                                        [, session] = e.split('=');

                                });

                            return session;
                        })()

                        for (let i = 0 ; i < cookies.length ; i++)
                        {
                            if (cookies[i].startsWith(" Expires"))
                            {
                                this.expiracaoCookie = cookies[i].split("=")[1]
                                break;
                            }
                        }

                        this.headers.Referer = `${this.servidor}index;jsessionid=${JSESSONID}`;
                        
                        this.estaConectado = true;
                        resolve(res.data);
                    } 
                    
                    else if (res.data && res.data.result) 
                        throw new excecoes.ExcecaoAutenticacaoSessao(res.data)

                    else 
                    {
                        if (res.request.path.match('errorMess'))
                            reject(new Error(`The server sent an unexpected response: ${res.request.path}`));
                        else 
                            reject(new Error('The server sent an unexpected response, a fatal error has occurred'));
                    }
                })
              .catch(res => {throw new excecoes.ExcecaoAutenticacaoSessao(res)});
        });
    }

    async realizarLogout()
    {
        return new Promise((resolve, reject) => 
        {
            this.axios
              .get(this.obterUrl('logout'), { headers: this.headers })
              .then(res => 
                {
                    this.cookie = ''
                    this.estaConectado = false;
                    
                    resolve({result : 1, logout: 'Logout realizado'});
                })
              .catch(e => reject(e));
        });
    }

    async checarValidadeCookie()
    {
        if (!this.estaConectado || new Date(this.expiracaoCookie).getTime() < new Date().getTime())
            await this.realizarLogin()
    }

}

module.exports = {Sessao}