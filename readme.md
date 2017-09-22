# Watson Developer Cloud - APIs demo

Este repositório contém um server em NodeJS que consulta serviços disponibilizados pela API do [IBM Watson](https://www.ibm.com/watson/) para tradução de textos e identificação de idiomas, identificação de tons.


## Como Usar?

Você poderá clonar ou baixar esse repositório em seu ambiente local. Para instalar todas as dependências do projeto, utilize o seguinte comando em um terminal:

`npm install`

Você poderá iniciar o servidor de 2 maneiras:

#### Com a interface gráfica
Nesse formato, você utilizará uma interface em HTML para inserir os textos que o Watson irá traduzir. Para essa opção, utilize o comando:

`npm start`  
*o servidor será iniciado na porta **8081***

#### Apenas com o *hello world* disponibilizado pela [Node SDK](https://github.com/watson-developer-cloud/node-sdk)
Nesse formato, os dados que o Watson irá interpretar serão estáticos. Para utilizar essa forma no terminal, utilize os comandos:

`npm run translation` para API Language Translator e Identificator  
`npm run tone` para API Tone Analyzer  
`npm run nlu` para API Natural Language Understanding  

## Considerações

Este é apenas um trabalho prático utilizando as APIs fornecidas pelo Watson e pela SDK em Node.

## Referências  
[Language Translator Demo](https://console.bluemix.net/docs/services/language-translator/index.html)  
[Tone Analyzer Demo](https://console.bluemix.net/docs/services/tone-analyzer/index.html)  
[Natural Language Understanding Demo](https://console.bluemix.net/docs/services/natural-language-understanding/index.html)  
[Watson Node SDK](https://github.com/watson-developer-cloud/node-sdk)