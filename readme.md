# Watson Developer Cloud - Tradutor e Identificador
## Tutorial passo a passo

Este repositório contém um server em NodeJS que consulta serviços disponibilizados pela API do [IBM Watson](https://www.ibm.com/watson/) para tradução de textos e identificação de idiomas.  
Esta branch contém um tutorial de como criar esse servidor, seguindo um passo a passo intuitivo e simples de seguir.


## Requisitos

- Criar conta no [IBM Bluemix](https://www.ibm.com/cloud-computing/bluemix/pt)  
- Criar o serviço de [Language Translator do Watson](https://www.ibm.com/watson/services/language-translator/)  
- Instalar [NodeJS](https://nodejs.org/en/)  

*dica: iremos utilizar bastante o terminal. Se você utiliza Windows, baixe e instale o [Git](https://git-scm.com/), eu prefiro utilizar o Git Bash em comparação com o Windows PowerShell*

Você pode utilizar qualquer IDE ou editor de texto para criar os códigos. Eu gosto muito do [Sublime Text](https://www.sublimetext.com/3) e da [WebStorm](https://www.jetbrains.com/webstorm/), mas você pode criar tudo até mesmo com o notepad.

## Passo 1 - Iniciando o projeto em Node e instalando dependências

Após você ter criado sua conta no IBM Bluemix, ter criado o serviço de Language Translator utilizando a API do Watson e ter instalado o NodeJS no seu computador, crie uma pasta qualquer e inicie um terminal dentro dela.

Com o terminal aberto, digite:

`npm init`

Isso irá indicar que iremos começar um projeto utilizando Node.  
Esse comando irá gerar um arquivo muito importante, o *package.json*. Dentro dele estão todas as informações sobre seu projeto - nome, descrição, versão, autor, repositório Git (se utilizar), scripts (tarefas que serão executadas) e todas as dependências/bibliotecas que você utiliza.  

*nunca remova esse arquivo do projeto!*  

Feito isso, iremos instalar algumas bibliotecas que vão nos ajudar durante o desenvolvimento desse projeto. Entre elas, estão:

- [express](http://expressjs.com/pt-br/) - gerenciador da aplicação, controlador de rotas
- [nodemon](https://nodemon.io/) - nosso "live server", que irá monitorar as alterações 
- [body-parser](https://github.com/expressjs/body-parser) - middleware para parsear o body das requests
- [morgan](https://github.com/expressjs/morgan) - middleware para logs
- [config](http://lorenwest.github.io/node-config/) - módulo para configurações
- [Watson Developer Cloud](https://github.com/watson-developer-cloud/node-sdk) - SDK em node para utilizarmos as APs do Watson

O Node trabalha com o conceito de pacotes - onde você pode instalar e gerenciar os pacotes que serão utilizados por sua aplicação. Todo o gerenciamento desses pacotes é feito pelo [NPM](https://www.npmjs.com/) (Node Package Management), e o NPM utiliza o *package.json* para manter um registro das bibliotecas que são utilizadas na sua aplicação.

*o NPM é instalado junto com o Node.*

Para instalarmos todas essas bibliotecas que citamos, iremos inserir o seguinte comando no terminal, dentro da pasta do nosso projeto:

`npm install nome_do_pacote --save`

No lugar de *nome_do_pacote*, você irá digitar o nome das bibliotecas acima.  
  
*--save* indica que você irá salvar o registro dela em seu *package.json*
  
Você pode instalar cada biblioteca individualmente, ou todas juntas. O comando ficará mais ou menos assim:

`npm install express nodemon body-parser morgan config watson-developer-cloud --save`