/**
 * Script de testes da API.
 * As funções de chamadas do calls.js são executadas aqui.
 * Ao executar o npm test, são solicitados:
 * 
 * Usuário e senha: credenciais;
 * ID da planta referência, número serial de um dispositivo da planta e do datalog: para serem usados nos requests;
 * Tipo do dispositivo;
 * Se a planta possui armazenamento (responder com true/y/s/sim/yes, sem distinção de tamanho de letra);
 * Se positivo na resposta anterior, colocar o número serial do dispositivo de armazenamento.
 * 
 * Os testes serão executados como se fossem chamadas de um script comum.
 */


const sessao = require('../api/sessao.js')
const calls = require('../api/calls.js')
const assert = require('assert').strict
const prompt = require('prompt-sync')()

const usuario = prompt("Usuário: ")
const senha = prompt.hide("Senha: ")
const sessaoAberta = new sessao.Sessao(usuario, senha)
const plantaRef = prompt("ID da planta referência: ");
const numeroSerialRef = prompt("Número serial do dispositivo referência: ");
const numeroDatalogRef = prompt("Número serial do datalog do dispositivo referência: ");
const tipoRef = prompt("Tipo do dispositivo referência: ");

let possuiArmazenamentoS = prompt('Esta planta possui dispositivo de armazenamento? (true/y/s/sim/yes): ');

const possuiArmazenamento = possuiArmazenamentoS.match(/true|y|s|sim|yes/gi) ? true : false;

const numeroSerialArmazenamento = possuiArmazenamento ? prompt("Número serial do dispositivo de armazenamento referência: ") : '';

describe("Verificar resultados das chamadas ao servidor", function()
{
    before(async function()
    {
        this.timeout(30000)
        await sessaoAberta.realizarLogin().then(res => {});
        this.chamadas = new calls.Calls(sessaoAberta)        
    });

    after(async function()
    {
        await sessaoAberta.realizarLogout();
    });

    it("Deve obter a lista de plantas do servidor", async function()
    {
        await this.chamadas.obterListaPlanta()
            .then(listaPlantas =>
            {
                assert.strictEqual(listaPlantas instanceof Array, true)

                for (let i = 0 ; i < listaPlantas.length ; i++)
                {
                    assert.strictEqual(listaPlantas[i].hasOwnProperty('id') &&
                            listaPlantas[i].hasOwnProperty('timezone') &&
                            listaPlantas[i].hasOwnProperty('plantName'), true
                    );
                }

                console.log(listaPlantas)
            })        
    });

    it("Deve obter os dispositivos da planta", async function()
    {
        await this.chamadas.obterDispositivosPlanta(plantaRef)
            .then(listaDispositivos =>
            {
                assert.strictEqual(listaDispositivos instanceof Array, true);

                for (let i = 0 ; i < listaDispositivos.length ; i++)
                {
                    assert.strictEqual(listaDispositivos[i] instanceof Object, true);
                    assert.strictEqual(Object.keys(listaDispositivos[i]).length, 22);
                }

                console.log(listaDispositivos)
            })        
    });

    it("Deve obter informações de armazenamento/datalog do dispositivo", async function()
    {
        await this.chamadas.obterInfoDispositivo(plantaRef, numeroDatalogRef, 'datalog')
            .then(infoDatalog =>
            {
                assert.strictEqual(infoDatalog instanceof Object, true);
                assert.strictEqual(Object.keys(infoDatalog).length, 7);
                console.log(infoDatalog)
            })

        if (possuiArmazenamento)
        {
            await this.chamadas.obterInfoDispositivo(plantaRef, numeroSerialArmazenamento, 'storage')
                .then(infoArmazenamento =>
                {
                    assert.strictEqual(infoArmazenamento instanceof Object, true);
                    assert.strictEqual(Object.keys(infoArmazenamento).length, 7);
                    console.log(infoArmazenamento)
                })
        }
    });

    it("Deve obter condições do tempo da planta", async function()
    {
        await this.chamadas.obterCondicaoTempoPlanta(plantaRef)
            .then(condicaoTempo =>
            {
                assert.strictEqual(condicaoTempo instanceof Object, true);
                assert.strictEqual(Object.keys(condicaoTempo).length, 3);
                assert.strictEqual(condicaoTempo['data']['HeWeather6'] instanceof Array, true);
                console.log(condicaoTempo)
            })
    });

    it("Deve obter dados da planta", async function()
    {
        await this.chamadas.obterDadosPlanta(plantaRef)
            .then(dadosPlanta =>
            {
                assert.strictEqual(dadosPlanta instanceof Object, true);
                assert.strictEqual(Object.keys(dadosPlanta).length, 29);
                console.log(dadosPlanta)
            })
    });

    describe("Obter dados de energia do inversor", async function()
    {
        it("Deve obter os dados de energia do inversor no dia", async function()
        {
            await this.chamadas.obterDadosEnergiaInversor(plantaRef, new Date(), 'dia')
            .then(dadosInversor =>
            {
                assert.strictEqual(dadosInversor instanceof Object, true);
                assert.strictEqual(Object.keys(dadosInversor)[0], 'pac');
                console.log(dadosInversor)
            })
        });

        it("Deve obter os dados de energia do inversor no mês", async function()
        {
            await this.chamadas.obterDadosEnergiaInversor(plantaRef, new Date(), 'mes')
            .then(dadosInversor =>
            {
                assert.strictEqual(dadosInversor instanceof Object, true);
                assert.strictEqual(Object.keys(dadosInversor)[0], 'energy');
                console.log(dadosInversor)
            })
        });

        it("Deve obter os dados de energia do inversor no ano", async function()
        {
            await this.chamadas.obterDadosEnergiaInversor(plantaRef, new Date(), 'ano')
            .then(dadosInversor =>
            {
                assert.strictEqual(dadosInversor instanceof Object, true);
                assert.strictEqual(Object.keys(dadosInversor)[0], 'energy');
                console.log(dadosInversor)
            })
        });

        it("Deve obter os dados de energia do inversor em todo seu período", async function()
        {
            await this.chamadas.obterDadosEnergiaInversor(plantaRef, new Date(), 'total')
            .then(dadosInversor =>
            {
                assert.strictEqual(dadosInversor instanceof Object, true);
                assert.strictEqual(Object.keys(dadosInversor)[0], 'energy');
                console.log(dadosInversor)
            })
        });
    });

    let tipo, sn;

    if (numeroSerialRef === '')
    {
        tipo = 'plant';
        sn = plantaRef;
    }

    else
    {
        tipo = tipoRef;
        sn = numeroSerialRef;
    }

    describe("Obter dados de energia de um dispositivo", async function()
    {
        it("Deve obter os dados de energia do dispositivo no dia", async function()
        {
            await this.chamadas.obterDadosEnergiaDispositivo(plantaRef, new Date(), sn, 'pac', tipo, 'dia')
            .then(dadosDispositivo =>
            {
                assert.strictEqual(dadosDispositivo instanceof Object, true);
                assert.strictEqual(Object.keys(dadosDispositivo)[0], 'pac');
                console.log(dadosDispositivo)
            })
        });

        it("Deve obter os dados de energia do dispositivo no mês", async function()
        {
            await this.chamadas.obterDadosEnergiaDispositivo(plantaRef, new Date(), sn, 'pac', tipo, 'mes')
            .then(dadosDispositivo =>
            {
                assert.strictEqual(dadosDispositivo instanceof Object, true);
                assert.strictEqual(Object.keys(dadosDispositivo)[0], 'energy');
                console.log(dadosDispositivo)
            })
        });

        it("Deve obter os dados de energia do dispositivo no ano", async function()
        {
            await this.chamadas.obterDadosEnergiaDispositivo(plantaRef, new Date(), sn, 'pac', tipo, 'ano')
            .then(dadosDispositivo =>
            {
                assert.strictEqual(dadosDispositivo instanceof Object, true);
                assert.strictEqual(Object.keys(dadosDispositivo)[0], 'energy');
                console.log(dadosDispositivo)
            })
        });

        it("Deve obter os dados de energia do dispositivo em todo seu período", async function()
        {
            await this.chamadas.obterDadosEnergiaDispositivo(plantaRef, new Date(), sn, 'pac', tipo, 'total')
            .then(dadosDispositivo =>
            {
                assert.strictEqual(dadosDispositivo instanceof Object, true);
                assert.strictEqual(Object.keys(dadosDispositivo)[0], 'energy');
                console.log(dadosDispositivo);
            });
        });
    });

    if (possuiArmazenamento)
    {
        it("Deve obter informação total do armazenamento", async function()
        {
            await this.chamadas.obterInformacaoTotalArmazenamentoPlanta(plantaRef, numeroSerialArmazenamento)
            .then(infoArmazenamento =>
            {
                assert.strictEqual(infoArmazenamento instanceof Object, true);
                assert.strictEqual(infoArmazenamento.hasOwnProperty('chargeTotal'), true);
                console.log(infoArmazenamento);
            })
        })

        it("Deve obter informação de status do armazenamento", async function()
        {
            await this.chamadas.obterInformacaoStatusArmazenamentoPlanta(plantaRef, numeroSerialArmazenamento)
            .then(statusArmazenamento =>
            {
                assert.strictEqual(statusArmazenamento instanceof Object, true);
                assert.strictEqual(statusArmazenamento.hasOwnProperty('vBat'), true);
                console.log(statusArmazenamento);
            });
        })

        it("Deve obter informação da bateria do armazenamento", async function()
        {
            await this.chamadas.obterInformacaoBateriaArmazenamentoPlanta(plantaRef, numeroSerialArmazenamento)
            .then(bateriaArmazenamento =>
            {
                assert.strictEqual(bateriaArmazenamento instanceof Object, true);
                assert.strictEqual(bateriaArmazenamento.hasOwnProperty('cdsTitle'), true);
                console.log(bateriaArmazenamento);
            });
        })

        it("Deve obter informação da energia do dia do armazenamento", async function()
        {
            await this.chamadas.obterInformacaoEnergiaDiaArmazenamentoPlanta(plantaRef, numeroSerialArmazenamento, new Date())
            .then(energiaArmazenamento =>
            {
                assert.strictEqual(energiaArmazenamento instanceof Object, true);
                assert.strictEqual(energiaArmazenamento.hasOwnProperty('eChargeTotal'), true);
                console.log(energiaArmazenamento);
            });
        })
    }
});
