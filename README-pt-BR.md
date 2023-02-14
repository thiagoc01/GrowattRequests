# <img src="https://indykoning.nl/wp-content/uploads/2020/01/Growatt-G.png" alt= “” width="100" height="100">rowattRequests

<br>

## API desenvolvida para obter dados de um servidor Growatt para plantas, dispositivos, inversores etc.

---

<p style="text-align:center;"><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" width = 500></p>

<br>

### <p style="text-align:center;">Implementação baseada em NodeJS com utilização de Promises</p>


<br>

# Dependências do projeto

-   ## Axios
-   ## Url
-   ## Https
-   ## Assert
-   ## Prompt-sync


<br>

# Como obter?

Em um diretório qualquer, digite:

``` bash
$ git clone https://github.com/thiagoc01/GrowattRequests
```

Modifique o arquivo index.js para um conteúdo de sua escolha.

Dentro do diretório, digite:

```bash
$ npm install
```

As dependências serão instaladas e você estará pronto para utilizar a API.

<br>

# Utilizando a biblioteca

Os dois principais arquivos são o calls.js e sessao.js, presentes na pasta api.

Para utilizar a classe Calls em calls.js, você deve inicializar um objeto da classe Sessao em sessao.js.

Veja o index.js para exemplo.

**Nota: Você deve executar todas os métodos da classe Calls dentro de uma função async!**

<br>

# Arquivo sessao.js

## Classe Sessao

```JS
class Sessao
```

Contém métodos para realizar login e logout, bem como armazenar cookies e informações de cabeçalho para os requests.

## `constructor`
---
<br>

### Construtor da classe

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| usuario   | `string` | Deve ser inserido | Usuário da credencial de acesso |
| senha   | `string` | Deve ser inserido | Senha da credencial de acesso |
| servidor   | `string` | `"https://server.growatt.com"` | Servidor que receberá as requisições |
| headers   | `Object` | `{'User-Agent' : userAgentDefault, Connection: 'keep-alive'}` | Cabeçalho que fará parte das requisições. Este cabeçalho é um conjunto de parâmetros e valores de um cabeçalho HTTP. |

Exemplo de uso:

```JS
let sessao = new sessaoModulo.Sessao('usuario', 'senha')
```

<br>

`async realizarLogin()`
---
<br>

### Realiza o login no servidor com base nos atributos configurados nesse objeto.

<br>

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com resultado da resposta e uma mensagem de sucesso |

Exemplo de uso:

```JS
await sessao.realizarLogin();
```

<br>

## `async realizarLogout()`
---
<br>

### Realiza o logout no servidor.

<br>

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com resultado da resposta e uma mensagem de sucesso |

Exemplo de uso:

```JS
await sessao.realizarLogout();
```

**Nota: Após o logout, qualquer nova requisição em um objeto da classe Calls que possua esta sessão irá falhar e realizará uma nova autenticação.**

<br>

# Arquivo calls.js

## Classe Calls

```JS
class Calls
```

Contém métodos para realizar as requisições ao servidor e obter os dados desejados de todas as plantas e dispositivos.

## `constructor`
---
<br>

### Construtor da classe

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| sessao   | `Sessao` | Deve ser inserido | Objeto da classe `Sessao` que contém uma sessão iniciada e disponível para uso |

Exemplo de uso:

```JS
let calls = new callsModulo.Calls(sessao)
```

**Nota: Se a sessão não tiver sido inicializada, a criação do objeto irá jogar uma exceção e encerrar a execução.**

<br>

## `async obterListaPlanta()`
---

Utilize para obter a lista de objetos que contém todas as plantas administradas por sua conta.

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Array<Object>>` | Array contendo objetos com os dados de todas as plantas administradas |

Exemplo de uso:

```JS
let listaPlantas = await calls.obterListaPlanta();
```

<br>

## `async obterDispositivosPlanta(idPlanta)`
---

Utilize para obter a lista de dispositivo que estão na planta fornecida via argumento

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Array<Object>>` | Array contendo objetos com os dados de todas os dispositivos na planta fornecida |

Exemplo de uso:

```JS
let listaDispositivos = await calls.obterDispositivosPlanta('1111111');
```

<br>

## `async obterInfoDispositivo(idPlanta, numeroSerial, tipo = 'storage')`
---

Utilize para obter informação do dispositivo.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| numeroSerial | `string`| Deve ser inserido | String com o ID do dispositivo a ser verificado
| tipo | `string` | `'storage'` | Tipo de informação (datalog ou storage)

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações do dispositivo |

Exemplo de uso:

```JS
let infoDispositivo = await calls.obterInfoDispositivo('1111111', 'W2E4Q9202', 'datalog');
```

<br>

## `async obterCondicaoTempoPlanta(idPlanta)`
---

Utilize para obter informação do tempo na planta fornecida por argumento.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações do tempo na planta |

Exemplo de uso:

```JS
let infoTempoDispositivo = await calls.obterCondicaoTempoPlanta('1111111');
```

<br>

## `async obterDadosPlanta(idPlanta)`
---

Utilize para obter dados mais específicos da planta dada pelo argumento.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com dados da planta |

Exemplo de uso:

```JS
let dadosPlanta = await calls.obterDadosPlanta('1111111');
```

<br>

## `async obterDadosEnergiaInversor(idPlanta, data, tempo = 'dia')`
---

Utilize para obter dados de energia (pac) do inversor.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| data  | `Date` | Deve ser inserido | Instância de Date contendo a data para se obter as informações |
| tempo   | `string` | `'dia'` | Período a ser verificado (pode ser dia, mes, ano ou total) |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com parâmetro pac contendo uma lista vazia ou com valores |

Exemplo de uso:

```JS
let dadosEnergiaInversor = await calls.obterDadosEnergiaInversor('1111111', new Date(), 'mes');
```

<br>

## `async obterDadosEnergiaDispositivo(idPlanta, data, sn = '', param = parametros.parametrosInversor.potencia.pac, tipo = 'max', tempo = 'dia')`
---

Utilize para obter dados de um dispositivo, onde os dados escolhidos são dados pelo argumento param.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| data  | `Date` | Deve ser inserido | Instância de Date contendo a data para se obter as informações |
| sn   | `string` | `''` | Número de série do dispositivo |
| param   | `string` | `'pac'` | Parâmetros a serem buscados (é uma string com os parâmetros unidos por ,). Você pode utilizar o arquivo parametros.js para referência |
| tipo   | `string` | `'max'` | Tipo do dispositivo |
| tempo   | `string` | `'dia'` | Período a ser verificado (pode ser dia, mes, ano ou total) |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com os parâmetros solicitados na lista de param |

Exemplo de uso:

```JS
let dadosEnergiaDispositivo = await calls.obterDadosEnergiaDispositivo('1111111', new Date(), 'E2A33Q2004', 'pac, ppv', 'max', 'dia');
```

**Nota: Se o parâmetro for 'dia', será obtido um array contendo os valores a cada 5 minutos do dia.**

<br>

## :warning: A seção abaixo vale somente se você possui um dispositivo de armazenamento

<br>

## `async infoTotalArmazenamento(idPlanta, numeroSerialArmazenamento)`
---

Utilize para obter a informação de armazenamento da planta em todo o período.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| numeroSerialArmazenamento  | `string` | Deve ser inserido | Contém o número serial do dispositivo de armazenamento |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações do armazenamento da planta |

Exemplo de uso:

```JS
let infoTotalArmazenamento = await calls.obterInformacaoTotalArmazenamentoPlanta('1111111', 'E2A33Q2004');
```
<br>

## `async obterInformacaoStatusArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)`
---

Utilize para obter a informação atual de armazenamento da planta.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| numeroSerialArmazenamento  | `string` | Deve ser inserido | Contém o número serial do dispositivo de armazenamento |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações do armazenamento da planta |

Exemplo de uso:

```JS
let infoAtualArmazenamento = await calls.obterInformacaoStatusArmazenamentoPlanta('1111111', 'E2A33Q2004');
```

<br>

## `async obterInformacaoBateriaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)`
---

Utilize para obter a informação atual da bateria do armazenamento da planta.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| numeroSerialArmazenamento  | `string` | Deve ser inserido | Contém o número serial do dispositivo de armazenamento |

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações da bateria do armazenamento da planta |

Exemplo de uso:

```JS
let infoBateriaArmazenamento = await calls.obterInformacaoBateriaArmazenamentoPlanta('1111111', 'E2A33Q2004');
```

<br>

## `async obterInformacaoEnergiaDiaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento, data)`
---

Utilize para obter a informação da bateria do armazenamento da planta em uma certa data.

| Parâmetro | Tipo   | Padrão    | Descrição               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Deve ser inserido | String com o ID da planta a ser verificada |
| numeroSerialArmazenamento  | `string` | Deve ser inserido | Contém o número serial do dispositivo de armazenamento |
| data | `Date` | Deve ser inserido | Data em que se deseja obter informações

**Retorno**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Objeto com as informações da bateria do armazenamento da planta na respectiva data |

Exemplo de uso:

```JS
let infoDataBateriaArmazenamento = await calls.obterInformacaoEnergiaDiaArmazenamentoPlanta('1111111', 'E2A33Q2004', new Date());
```

# Arquivo parametros.js

Esse arquivo contém os parâmetros que podem ser usados no método obterDadosEnergiaDispositivo.

Você pode concatenar os parâmetros desejados utilizando vírgulas.

Exemplo de uso:

```JS
const parametrosModulo = require('./util/parametros.js');

let param = parametrosModulo.parametros.potencia.pac + ',' + parametrosModulo.parametros.voltagem.mppt1;

let dadosEnergiaDispositivo = await calls.obterDadosEnergiaDispositivo('1111111', new Date(), 'E2A33Q2004', param, 'max', 'dia');
```

# Arquivos na pasta tipos

Os arquivos planta.js, weather.js, armazenamento_dados_total.js, armazenamento_dados_status.js, armazenamento_bateria_dados.js, dados_planta.js, dispositivo_info.js, dispositivo_planta.js e armazenamento_energia_grafico_dia.js podem ser utilizados para obter os objetos com os campos traduzidos. Basta importar o módulo e utilizar a função passando o objeto obtido do servidor.

Exemplo de uso:

```JS

const plantaTradutor = require('./tipos/planta.js');

let listaPlantas = await calls.obterListaPlanta();
let listaTraduzida = []

for (let i = 0 ; i < listaPlantas.length ; i++)
    listaTraduzida.push(plantaTradutor.obterObjPlanta(listaPlantas[i]))
```

# Testes

O repositório contém um diretório de testes (testes). Basta rodar:

```bash
$ npm test
```

Serão solicitados os dados necessários para conectar-se ao servidor.

<br>

# Inicializando a API

Importe ambos os módulos:

```JS
const sessaoModulo = require("./api/sessao.js");
const callsModulo = require("./api/calls.js");
```

Inicialize um objeto da classe Sessao dessa forma:

```JS
let sessao = new sessaoModulo.Sessao('login', 'senha');
```

Onde login e senha são suas credenciais. Após isso, chame o método realizarLogin para autenticar-se no servidor. Se tudo ocorrer corretamente, esse objeto está disponível para ser repassado à classe Calls.

```JS
await sessao.realizarLogin();

let calls = new callsModulo.Calls(sessao);
```

A partir daí, você pode chamar todos métodos da classe Calls, com base nos parâmetros documentados.

## Exemplo:

```JS
let listaPlantas = calls.obterListaPlanta();
```

Será retornado um Array contendo objetos que possuem os dados de identificação das plantas.

# Bugs e inconsistências

Os métodos e funções que envolvem obtenção de informação de armazenamento e tempo não foram testadas devido à limitação da conta em minha posse. Qualquer problema detectado por você, por favor reporte como uma <i>issue</i>.










