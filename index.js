"use strict"

/*
    Exemplo de uso da API.
    Esse script obtém os dados de energia do dia com os parâmetros PAC e POWER 1 a 4.
    Salva em um arquivo .tsv cujo nome é o dia em questão.
    Os arquivos ficam numa pasta com nome dados.
    O ID da planta e o número serial do dispositivo são conhecidos.
*/

const sessaoModulo = require('./api/sessao.js')
const callsModulo = require('./api/calls.js')
const parametrosModulo = require('./util/parametros.js');
const prompt = require('prompt-sync')()
const fsModulo = require('fs');
const usuario = prompt("Usuário: ");
const senha = prompt.hide("Senha: ");

const QUANTIDADE_INTERVALOS_CINCO_MINUTOS_DIA = 288

function criarDiretorio(dir = 'dados')
{
    if (!fsModulo.existsSync(dir))
    {
        try
        {
            fsModulo.mkdirSync(dir);

            console.log('Pasta ' + dir + ' foi criada com sucesso.');
        }

        catch (e)
        {
            throw new Error("Erro ao criar o diretório " + dir);
        } 
    }
}

function criaArquivoTSV(dir, params, nome = new Date().toISOString().substr(0, 10))
{
    /* Altera o formato da data para dd-MM-aaaa */

    const dataDiaMesAno = `${nome.substr(8, 2) + "-" + nome.substr(5, 2) + "-" + nome.substr(0, 4)}`;
    const dadosTSV = 'Data\t' + params.split(',').join('\t') + '\n';

    try
    {
        fsModulo.writeFileSync(dir + '/' + dataDiaMesAno + '.tsv', dadosTSV);
        console.log('Arquivo ' + dataDiaMesAno + '.tsv' + ' criado com sucesso.');
    }

    catch (e)
    {
        throw new Error("Erro ao criar o arquivo .tsv.");
    }
}

function escreveNoArquivoTSV(caminho, dados)
{
    try
    {
        fsModulo.appendFileSync(caminho + '.tsv', dados);

    }

    catch (e)
    {
        throw new Error("Erro ao escrever o conteúdo " + dados);
    }
}

function removeValoresNulos(dados, parametros)
{
    /* Troca valores null por 0.0 */

    const dadosAjustados = JSON.parse(JSON.stringify(dados));

    for (let i = 0 ; i < parametros.length ; i++)
    {
        dadosAjustados[parametros[i]] = 
                                    dadosAjustados[parametros[i]]
                                    .map(param => 
                                    {
                                        if (param == null)
                                            param = 0.0
                                            
                                        return param.toString()
                                    });        
    }

    return dadosAjustados
}

/*
    Salva as listas de cada parâmetro num arquivo .tsv
*/

function salvaDadosDiaArquivo(dadosEnergiaDispositivo, listaParams, caminho)
{
    const primeiraHora = new Date((new Date()).toISOString().substring(0, 10) + "T" + "00:00:00Z")

    for (let j = 0 ; j < QUANTIDADE_INTERVALOS_CINCO_MINUTOS_DIA ; j++)
    {
        let hora = new Date(primeiraHora.getTime() + 60000 * j * 5).toISOString();
        hora = `${hora.substr(8, 2) + "/" + hora.substr(5, 2) + "/" + hora.substr(0, 4) + " " + hora.substr(11, 5)}\t`;

        escreveNoArquivoTSV(caminho, hora);

        for (let i = 0 ; i < listaParams.length ; i++)
        {
            let dados = dadosEnergiaDispositivo[listaParams[i]];

            if (i == listaParams.length - 1)
                escreveNoArquivoTSV(caminho, dados[j].replace('.', ',') + '\n')
            
            else
                escreveNoArquivoTSV(caminho, dados[j].replace('.', ',') + '\t')
        }
    }
}

async function main()
{
    let sessao = new sessaoModulo.Sessao(usuario, senha)

    const dir = 'dados';

    let nomeArquivo = new Date().toISOString().substr(0, 10);

    nomeArquivo = `${nomeArquivo.substr(8, 2) + "-" + nomeArquivo.substr(5, 2) + "-" + nomeArquivo.substr(0, 4)}`

    const caminho = dir + '/' + nomeArquivo;

    const params = parametrosModulo.parametros.potencia.pac +
                    ',' +
                    parametrosModulo.parametros.potencia.potencia1 +
                    ',' +
                    parametrosModulo.parametros.potencia.potencia2 +
                    ',' +
                    parametrosModulo.parametros.potencia.potencia3 +
                    ',' +
                    parametrosModulo.parametros.potencia.potencia4;

    const listaParams = params.split(',');

    await sessao.realizarLogin()

    let calls = new callsModulo.Calls(sessao)

    criarDiretorio(dir);
    criaArquivoTSV(dir, params)

    let dadosEnergiaDispositivo = await calls.obterDadosEnergiaDispositivo('1661322', new Date(), 'QAJ9CH6029', params, 'max', 'dia');
    
    dadosEnergiaDispositivo = removeValoresNulos(dadosEnergiaDispositivo, listaParams);

    salvaDadosDiaArquivo(dadosEnergiaDispositivo, listaParams, caminho);

    await sessao.realizarLogout()
}

main()
