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


## Passo 2 - Utilizando o hello world do Watson

Com todas as dependências instaladas, podemos agora começar a criar a estrutura do nosso projeto.  

A primeira pasta que iremos criar no nosso projeto será chamada *config*, e dentro dela teremos um arquivo, *default.json*. Dentro dele iremos armazenar as nossas credenciais geradas pelo console do Bluemix, durante a criação do serviço de tradução de idiomas.

Feito isso, iremos agora entrar na [documentação oficial do Github do Watson Developer Cloud para Node, na sessão do Language Translator](https://github.com/watson-developer-cloud/node-sdk#language-translator), e pegaremos de exemplo o código hello world oferecido.
Com o código em mãos, iremos criar um arquivo em nosso projeto, *watson.js*.

Dentro do *watson.js*, iremos chamar o *config* para podermos utilizar as nossas credenciais dentro do serviço.  
Note que, no lugar de `<username>` e `<password>`, iremos mudar para `config.get('username')` e `config.get('password')`, pegando de forma dinâmica as nossas credenciais.

Você poderá executar esse código utilizando o runtime do Node. Para isso, no terminal, insira o comando:

`node watson.js`

Se tudo ocorreu bem, no terminal você verá o resultado da operação do código de hello world - meus parabéns!


## Passo 3 - Botando a mão na massa de verdade

Já aprendemos o básico de Node, já fizemos um hello world bacana - agora tá na hora de botar pra quebrar!  

### Passo 3.1 - app.js
Vamos criar um nodo arquivo, *app.js*, que será o coração da nossa aplicação. Dentro dele iremos definir as rotas, uma pasta pública para arquivos estáticos (CSS e JS utilizados pelas views da aplicação), qual será o template engine utilizado pelas views, enfim, tudo praticamente.

Ele é arquivo relativamente pequeno, mas, sem ele tudo será um **caos**.

### Passo 3.2 - rotas
Também vamos criar um novo diretório, *routes* - dentro dele, iremos dividir as rotas em 2 grandes setores, 1 para a API e outro para a view.  
Nesse diretório, teremos outras 2 pastas - *api* e *views*, além de um arquivo *index.js* que irá fazer o gerenciamento da chamada das rotas para a API e para as views.

Por hora, vamos fazer toda a lógica do serviço do Watson na própria rota - como é um projeto simples, não há a necessidade de abstrair para uma controller ou algo do tipo, mas se você quiser, pode tentar - e digo que não é difícil!

Dentro das nossas rotas de API, criaremos 2 arquivos - *identify.js* e *translate.js*, que irão fazer a comunicação com os serviços de identificação e tradução dos idiomas, respectivamente.  
Os códigos utilizados nesses arquivos são similares aos do hello world, com algumas mudanças - os dados agora serão passados de forma dinâmica, dando a liberdade para o usuário escolher o texto e os idiomas de entrada/saída para as traduções.  

*spoiler - na view, vamos utilizar requests Ajax para chegar nas rotas*


## Passo 4 - Views

Vou passar bem rápido por esse passo, mas apenas para explicar o que eu fiz:  

Criei uma interface na unha (viva o front-end!) utilizando o template engine do [EJS](http://ejs.co/) (inclusive configuramos isso no app.js - você poderá escolher outro de acordo com a vontade do seu coração, se quiser), e também o [GulpJS](https://gulpjs.com/), que é um automador de tarefas.

De maneira simples - com o EJS (ou qualquer outro template engine) construímos o markup utilizado e com o Gulp (ou qualquer outro automador) vamos minificar todos os arquivos CSS e JS que utilizamos na view para otimização de performance.

O Gulp é uma plataforma, e dentro dela você pode usar vários módulos - eu utiilzei o *gulp-sass* (traduzir e compliar [sass](http://sass-lang.com/) para css), *gulp-concat* (concatenar todos os arquivos js) e *gulp-uglify* (minificar todos os arquivos js).

Além dessas dependências, também adicionei o [jQuery](https://jquery.com/) (manipulação de DOM e requisições Ajax), [FontAwesome](http://fontawesome.io/) (framework para ícones) e o [toastr](http://codeseven.github.io/toastr/) (alertas bonitinhos).

Nesse ponto é também importante ressaltar a classificação entre dependências que temos no NPM - as *dependencies* e as *devDependencies*:

- dependencies: todas as dependências que serão utilizadas **em produção** pela sua aplicação (ex.: express, jquery, nodemon, sdk do Watson);
- devDependencies: todas as dependências que serão utilizadas **apenas em desenvolvimento** da sua aplicação (ex.: gulp, não precisamos dele em produção).

Você faz essa diferenciação de dependências no NPM durante a instalação delas no seu projeto, utilizando

`npm install --save` e `npm install --save-dev` 

Enfim, indepentendemente se você usar a minha interface ou quiser criar/utilizar qualquer outra, é importante ressaltar que nesse passo você precisa:

- criar/utilizar uma inteface para que o usuário possa inserir um texto para a tradução ou identificação do idioma;
- passar essas informações para a rota correspondente (identify ou translate);
- mostrar o resultado para o usuário.


## Passo 5 - bin/www e npm scripts

Vamos criamos um novo diretório no nosso projetto, *bin*, contendo um arquivo chamado *www* sem extensão. Esse arquivo será chamado pela linha de comando do node para dar ínicio ao nosos serviço - dentro do arquivo *www* estará o listener do nosso servidor HTTP. Todo esse comportamento deve sempre ficar isolado do restante da configuração do Express.  

Para automatizar algumas tarefas vamos utilizar os scripts do NPM. Dentro do *package.json*, vamos configurar os seguintes scripts:

- watson - quando quisermos que o node execute o arquivo *watson.js* em runtime;
- start - o script que será chamado para iniciar nosso servidor;
- gulp - se você está utilizando o gulp, esse script irá chamar a task default definida no seu *gulpfile.js*, para fazer a automação das tarefas definidas.

Agora, sempre que você quiser chamar o arquivo *watson.js* no terminal irá inserir o comando:

`npm run watson`

E, para startar o servidor:

`npm start`

Utilizando os scripts do NPM conseguimos aumentar a nossa produtividade e não precisamos ficar fazend esforço para lembrar de cabeça esses scripts -  o Node faz isso pela gente!  
Você também pode criar scripts para testar toda sua aplicação, desde rotas, métodos e tudo mais. Para isso, indico 2 super dependências de fácil uso e grande alcance:

- [istanbul](https://github.com/gotwarlost/istanbul)
- [mocha](https://mochajs.org/)


## Algumas considerações

Sempre que você utilizar o NPM como gerenciador de pacotes/dependências da sua aplicação - seja ela em Node ou em qualquer outra linguagem - será gerada uma pasta absurdamente grande no seu projeto, a *node_modules*.  

Dentro dela estão todos os arquivos utilizados pelas dependências que você instala, então é importante que você não mexa em nada lá - até porque parece um labirinto!  

É sempre bom ignorar essa pasta em projetos que utilizam git (através do arquivo *.gitignore*). Se você precisa fazer alguma modificação em um módulo que fica lá dentro, tente fazer isso sobrescrevendo esse módulo fora da *node_modules*, ou entre em contato com o(s) desenvolvedor(es) desse módulo.