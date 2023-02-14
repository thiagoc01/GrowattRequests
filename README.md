# <img src="https://indykoning.nl/wp-content/uploads/2020/01/Growatt-G.png" alt= “” width="100" height="100">rowattRequests

<br>

## [README em português](README-pt-BR.md)
---

<br>

## API developed in order to get data from a Growatt Server for plants, devices, inverters etc.

---

<p style="text-align:center;"><img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2560px-Node.js_logo.svg.png" width = 500></p>

<br>

### <p style="text-align:center;">Implementation based on NodeJS using Promises</p>


<br>

# Project dependencies

-   ## Axios
-   ## Url
-   ## Https
-   ## Assert
-   ## Prompt-sync


<br>

# How to get it?

In any directory, type on terminal:

``` bash
$ git clone https://github.com/thiagoc01/GrowattRequests
```

Change the index.js file to some content desired by you.

Inside the created directory, type:

```bash
$ npm install
```

All the dependecies will be installed and you'll be ready to use the API.

<br>

# Using the library

The two main files are calls.js and sessao.js, which are in api folder.

To use the Calls class, you must initialize a Sessao class' object from sessao.js.

See the index.js for example.

**Notice: You should execute all methods from Calls class inside a async function!**

<br>

# File sessao.js

## Sessao class

```JS
class Sessao
```

Contains methods to login and logout, as well as storage of cookies and headers' information to the requests.

## `constructor`
---
<br>

### Class's constructor

| Parameter | Type   | Default    | Description             |
| --------- | ------ | --------- | ----------------------- |
| usuario   | `string` | Must be given | Access credential user |
| senha   | `string` | Must be given | Access credential password |
| servidor   | `string` | `"https://server.growatt.com"` | Server that will receive all the requests |
| headers   | `Object` | `{'User-Agent' : userAgentDefault, Connection: 'keep-alive'}` | Header that will be part of requests. This header is a set of parameters and values from a standard HTTP header. |

Usage example:

```JS
let session = new sessionModule.Sessao('usuario', 'senha')
```

<br>

`async realizarLogin()`
---
<br>

### Login in the server with settings based on attributes from this object.

<br>

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the result of the response and a success message |

Usage example:

```JS
await session.realizarLogin();
```

<br>

## `async realizarLogout()`
---
<br>

### Logout from the server.

<br>

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the result of the response and a success message |

Usage example:

```JS
await session.realizarLogout();
```

**Notice: After logout, any new request in a Calls object containing the session that logged out will fail and a new login will be done automatically.**

<br>

# File calls.js

## Calls class

```JS
class Calls
```

Contains methods to make the requests to the server and get data from all plants and devices.

## `constructor`
---
<br>

### Class's constructor

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| sessao   | `Sessao` | Must be given | Object of type `Sessao` that contains an initialized session and available to use |

Usage example:

```JS
let calls = new callsModule.Calls(sessao)
```

**Notice: If a session has not been initialized, the object initialization will throw a exception and finish the script execution.**

<br>

## `async obterListaPlanta()`
---

Use to get the list of objects that contain all plants managed by your account. 

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Array<Object>>` | Array containing objects with data from all managed plants |

Usage example:

```JS
let plantList = await calls.obterListaPlanta();
```

<br>

## `async obterDispositivosPlanta(idPlanta)`
---

Use to get the list of devices in the given plant by arguments.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |

**Return**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Array<Object>>` | Array containing objects with data from all devices in the given plant by arguments. |

Usage example:

```JS
let deviceList = await calls.obterDispositivosPlanta('1111111');
```

<br>

## `async obterInfoDispositivo(idPlanta, numeroSerial, tipo = 'storage')`
---

Use to get information from a device. 

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| numeroSerial | `string`| Must be given | String containing the device ID to be verified
| tipo | `string` | `'storage'` | Information type (datalog or storage)

**Return**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Object with device's information |

Usage example:

```JS
let deviceInfo = await calls.obterInfoDispositivo('1111111', 'W2E4Q9202', 'datalog');
```

<br>

## `async obterCondicaoTempoPlanta(idPlanta)`
---

Use to get information about weather on the given plant by arguments.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |

**Return**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing weather information on the given plant |

Usage example:

```JS
let weatherInfoDevice = await calls.obterCondicaoTempoPlanta('1111111');
```

<br>

## `async obterDadosPlanta(idPlanta)`
---

Use to get more specific data from the given plant by arguments.

| Parameter | Tipo   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |

**Return**:

 Tipo     | Descrição               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing plant data |

Usage example:

```JS
let plantData = await calls.obterDadosPlanta('1111111');
```

<br>

## `async obterDadosEnergiaInversor(idPlanta, data, tempo = 'dia')`
---

Use to get energy data (pac) from inverter in a certain date.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| data  | `Date` | Must be given | Date instance containing timestamp to get information |
| tempo   | `string` | `'dia'` | Time range to be verified (can be dia (day), mes (month), ano (year) or total) |

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the pac parameter with a empty list or list with values |

Usage example:

```JS
let energyDataInverter = await calls.obterDadosEnergiaInversor('1111111', new Date(), 'mes');
```

<br>

## `async obterDadosEnergiaDispositivo(idPlanta, data, sn = '', param = parametros.parametrosInversor.potencia.pac, tipo = 'max', tempo = 'dia')`
---

Use to get data from a device, where the data is given by the param argument.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| data  | `Date` | Must be given | Date instance containing timestamp to get information |
| sn   | `string` | `''` | Device's serial number |
| param   | `string` | `'pac'` | Parameters that will be used to get data (it's a string with parameters splitted by ,). You can use the parametros.js file to reference.|
| tipo   | `string` | `'max'` | Device type |
| tempo   | `string` | `'dia'` | Time range to be verified (it can be dia (day), mes (month), ano (year) or total) |

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the requested parameters on the list given by param |

Usage example:

```JS
let energyDataDevice = await calls.obterDadosEnergiaDispositivo('1111111', new Date(), 'E2A33Q2004', 'pac, ppv', 'max', 'dia');
```

**Notice: If the tempo parameter is 'dia', an array will be given containing the values every 5 minutes of the day.**

<br>

## :warning: The section below only applies if you have a storage device.

<br>

## `async infoTotalArmazenamento(idPlanta, numeroSerialArmazenamento)`
---

Use to get storage information from a plant in the whole period.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| numeroSerialArmazenamento  | `string` | Must be given | Contains the storage device's serial number |

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the storage's plant information |

Usage example:

```JS
let totalInfoStorage = await calls.obterInformacaoTotalArmazenamentoPlanta('1111111', 'E2A33Q2004');
```
<br>

## `async obterInformacaoStatusArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)`
---

Use to get current storage information from a plant.

| Parameter | Type   | Default    | Descrption               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| numeroSerialArmazenamento  | `string` | Must be given | Contains the storage's device serial number |

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the storage's plant information |

Usage example:

```JS
let currentInfoStorage = await calls.obterInformacaoStatusArmazenamentoPlanta('1111111', 'E2A33Q2004');
```

<br>

## `async obterInformacaoBateriaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento)`
---

Use to get current information of a storage battery of a plant.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| numeroSerialArmazenamento  | `string` | Must be given | Contains the storage device's serial number |

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing the information of a plant's storage battery |

Usage example:

```JS
let batteryInfoStorage = await calls.obterInformacaoBateriaArmazenamentoPlanta('1111111', 'E2A33Q2004');
```

<br>

## `async obterInformacaoEnergiaDiaArmazenamentoPlanta(idPlanta, numeroSerialArmazenamento, data)`
---

Use to get information of a storage's battery of a plant in a certain date.

| Parameter | Type   | Default    | Description               |
| --------- | ------ | --------- | ----------------------- |
| idPlanta   | `string` | Must be given | String containing the plant ID to be verified |
| numeroSerialArmazenamento  | `string` | Must be given | Contains the storage device's serial number |
| data | `Date` | Must be given | Date to use as reference to get information

**Return**:

 Type     | Description               
 -------- |  -------------------------------|
 `Promise<Object>` | Object containing information of a storage's battery of a plant in a certain date |

Usage example:

```JS
let infoBatteryDateStorage = await calls.obterInformacaoEnergiaDiaArmazenamentoPlanta('1111111', 'E2A33Q2004', new Date());
```

# File parametros.js

This file contains parameters which can be used in the obterDadosEnergiaDispositivo method.

You can concatenate any parameter that you want to use, separating then with comma.

Usage example:

```JS
const parametrosModule = require('./util/parametros.js');

let param = parametrosModulo.parametros.potencia.pac + ',' + parametrosModulo.parametros.voltagem.mppt1;

let energyDataDevice = await calls.obterDadosEnergiaDispositivo('1111111', new Date(), 'E2A33Q2004', param, 'max', 'dia');
```

# Files in tipos folder

The files planta.js, weather.js, armazenamento_dados_total.js, armazenamento_dados_status.js, armazenamento_bateria_dados.js, dados_planta.js, dispositivo_info.js, dispositivo_planta.js e armazenamento_energia_grafico_dia.js can be used to get the object with their respective fields translated to pt-BR. Import the module and use the function passing the object that you receive from the server.

Usage example:

```JS

const plantTranslater = require('./tipos/planta.js');

let plantList = await calls.obterListaPlanta();
let translatedList = []

for (let i = 0 ; i < plantList.length ; i++)
    translatedList.push(plantTranslater.obterObjPlanta(plantList[i]))
```

# Tests

This repository contains a directory of tests (testes).
Run:

```bash
$ npm test
```

The necessary data will be requested in order to connect to the server.

<br>

# Initializing the API

Import both modules:

```JS
const sessionModule = require("./api/sessao.js");
const callsModule = require("./api/calls.js");
```

Initialize an object of Sessao class like this:

```JS
let session = new sessionModule.Sessao('login', 'senha');
```

Where login and senha are your credentials (username and password). Then, call the realizarLogin method to authenticate on the server. If everything is right, the object will be available to be used in a object of Calls class.

```JS
await session.realizarLogin();

let calls = new callsModule.Calls(session);
```

After that, you can call all methods in the Calls class, based on the parameters documented above.

## Example:

```JS
let plantList = calls.obterListaPlanta();
```

An array containing objects that have identification data of plants will be returned.

# Bugs and inconsistencies

The methods and functions envolving storage and time's information gathering have not been test due to account's limitation on my possession. Any problem seen by you, please report as an <i>issue</i>.










