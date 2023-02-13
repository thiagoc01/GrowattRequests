/**
 * Esse script controla as informações de sessão.
 * A classe Sessao guarda as credenciais e as opções de acesso para o servidor, bem como cookies e cabeçalhos HTTP.
 * Os métodos fazem o login e logout no servidor. Para cada chamada feita, existe um método que valida os cookies.
 */

const links = require('../util/links.js')

const Axios = require('axios');
const Url = require('url');
const https = require('https');
const excecoes = require('../excecoes/excecoes.js')
const calls = require('./calls.js')

const userAgentDefault = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)';

class Sessao
{
    /**
     * 
     * @param {string} usuario usuário da conta admin
     * @param {string} senha senha da conta admin
     * @param {string} servidor endereço do servidor Growatt
     * @param {Object} headers opções para um cabeçalho HTTP
     */
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

    /**
     * Concatena o endereço do servidor com o recurso dado por caminho
     * 
     * O parâmetro é passado para o objeto links, já que todos são predeterminados.
     * 
     * @param {string} caminho recurso no servidor
     * @returns {String} URL completa (servidor/caminho)
     */

    obterUrl(caminho)
    {
        return this.servidor + links.links[caminho]
    }

    /**
     * Realiza o login no servidor com base nas credenciais passadas
     * 
     * @throws {ExcecaoAutenticacaoSessao} se ocorreu uma falha no login
     * @throws {ExcecaoRespostaServidor} se ocorreu problema com acesso ao recurso ou no protocolo HTTP
     * @returns {Object} Objeto dos dados da resposta
     */

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
                    if (res.data && res.data.result && res.data.result === 1) // Request correto
                    {
                        this.cookie = res.headers['set-cookie'].toString();
                        this.headers.cookie = this.cookie
                        const cookies = this.cookie.split(';');

                        // Obtém o JSESSONID dos cookies para uso posterior

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

                        // Obtém a data de expiração
                        
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
                        resolve({result : 1, login : 'Login realizado'});
                    } 
                    
                    else if (res.data && res.data.result) 
                        throw new excecoes.ExcecaoAutenticacaoSessao(res.data)

                    else 
                        calls.Calls.prototype.trataProblemaRequisicao(res)
                })
              .catch(res => {reject(res); throw new excecoes.ExcecaoAutenticacaoSessao(res);});
        });
    }

    /**
     * Realiza o logout no servidor
     * @returns {Object} Objeto com resultado da resposta e mensagem de logout realizado
     */

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
                    this.expiracaoCookie = null;
                    this.headers.cookie = '';
                    
                    resolve({result : 1, logout: 'Logout realizado'});
                })
              .catch(res => reject(res));
        });
    }

    /**
     * Verifica se a sessão está aberta ou se o cookie expirou
     */

    async checarValidadeCookie()
    {
        if (!this.estaConectado || new Date(this.expiracaoCookie).getTime() < new Date().getTime())
        {
            console.log("Sessão encerrada ou cookie expirado. Novo login será efetuado...")
            await this.realizarLogin()
        }
    }

}

module.exports = {Sessao}