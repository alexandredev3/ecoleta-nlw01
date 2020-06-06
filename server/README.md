# Api Next Level Week

# NLW#1 Booster

  > yarn add typescript -D
    - Precisamos instalar o typescript.

 - Quando nos estamos usando o Typescript em nossa aplicação, ela precisa vim
 com a definição de tipos. (Algumas bibliotecas ja vem junto, e outras não)

 - definição de tipos: e tudo aquilo que tem a ver com a tipagem do typescript,
 se ela e uma string que variavel ela retorna etc...

> yarn add @types/express -D
  - Instalar a definição de tipos do express.

> yarn add ts-node -D
  - Para que o node entenda typescript.

- Toda vez que nos estivermos usando typescript em um projeto, nos precisamos
ter um arquivo de configurações para falar quais fucionabilidades do typescript
que nos queremos utilizar.


> yarn tsc --init
  - Ele vai criar um arquivo de configurações automaticamente.

  - Nos não vamos precisar mexer nesse arquivo.

> yarn ts-node src/server.ts
  - Ele vai rodar nosso servidor.

**Request**: Serve para obter informações.
**Response**: Serve para devolver uma responsa pro cliente.

- No JSON nos podemos retornar uma lista de objetos, colocar uma array

  response.json([]);

- Ou se nos quisermos retorna apenas uma informação e so colocar chaves por volta.

> yarn add ts-node-dev -D
  - Ele sempre vai ficar monitorando nosso codigo, e se tiver alguma alteração
  ele vai reiniciar o servidor automaticamente.(Igual o NODEMON)

# NLW#1 Booster

- Rota e recurso 

    localhost:3333/users

  - Rota: e toda a url
  - Recurso: e o recurso que nos queremos entrar. (users)

## Métodos HTTP

GET: (Quando o navegador acessa uma requisição ele sempre vai receber o GET, porque
      o navegador não sabe fazer outras requisições.) Buscar uma ou mais informações do BackEnd
POST: Criar uma nova informação.
PUT: Atualizar uma informação no BackEnd.
DELETE: Remover uma informação do BaclEnd.

Obs: Não tem problema nenhum ter uma rota igual a outra, se o metodo for diferente.

- Toda vez que nos formos devolver uma responsa para o nosso cliente, e bom colocar um return antes.

Request Param: Parâmetros que vem na propria rota que identificam um recurso.
  - Toda vez que nos queremos editar um usuario ou deletar um usuario, nos vamos usar O Request Param

Query Param: Parametros que vem na propria rota geralmente não opcional para filtros paginação.

Request Body: E o corpo da requisição.

- O express não entende JSON por padrão então precisamos adcionar um "plugin" nele`

  ````js
  app.use(express.json());
  ````
  - O *use* e como se fosso para ele usar um plugin.


> yarn add knex
  - E para nos escrevemos codigo sql em js.

> yarn add sqlite3
  - Instalar o pacote do sql que nos vamos usar.

- Sempre que for um ponto no mapa nos sempre vamos usar latitude e longitude

Migration: Historico do seu banco de dados.

> yarn knex migrate:latest --knexfile knexfile.ts migrate:latest
  - para roda a nossa migration

- Para ver o arquivo que ele criou nos precisamos baixar uma extensão no nosso 
vs code, 

- knex_migrations: para ele não criar tabelas repetidas

  Como esse comando para rodar uma migration e muito grande podemos colocar ele 
  no scripts do package.json

  ````json
  "scripts": {
    "dev:server": "ts-node-dev src/server.ts",
    "knex:migrate": "knex migrate:latest --knexfile knexfile.ts migrate:latest"
  },

Comando para executar os arquivos de seeds

> knex --knexfile knexfile.ts seed:run

"knex:seed": "knex --knexfile knexfile.ts seed:run"
  - Podemos colocar esse comando no package.json tambem


- Seed: Os seed server para nos popular alguns dados, deixando eles padrões.


"dev:server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts",

- --ignore node_modules: Ele vai para de verificar se alguma coisa alterou la no node_modules, por isso ele estava demorando tanta para reiniciar o servidor...

### Insomnia
  {
    "name": "Mercado imperatriz",
    "email": "contado@imperatriz.com.br",
    "whatsapp": "0692487232",
    "latitude": -46.3272,
    "longitude": -67.34212,
    "city": "Luziânia",
    "uf": "GO",
    "items": [
      **Como um ponto de coleta pode pegar varios items então precisamos colocar
      uma array por volta.**
      1,
      2,
      6
      *Esses numero são os id's dos items*
    ]
  }


Metodo Show: Mostra apenas um item.

````js
const items = await knex('items')
  .join('point_items', 'items.id', '=', 'point_items.item_id')
  .where('point_items.point_id', id)
````

### Ele vai gerar uma query assim

````sql
SELECT * FROM items
  JOIN point_items ON items.id = point_items.item_id
WHERE point_items.point_id = { id }
````
> yarn add cors

CORS: Define quais urls vão ter acesso a nossa API.

> yarn add @types/cors -D
 - Definição de tipos do cors.

https://images.unsplash.com/photo-1565061828011-282424b9ab40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80

Esse =80 no final e a qualidade e o "w" e o width

> yarn add multer
  - Upload de imagens
  > yarn add @types/multer -D
    - Tipagem.

- fileFilter: permiti vc escolher qual tipo de imagem o tamanho e permitido na sua
aplicação.

- Serialização.
- API transform
  - E uma forma de transforma uma informação...

> yarn add celebrate
  - Validação no backend
  - Com ele nos podemos validar o Body, Params, Cookies, etc...
    @hapi/joi intalando a tipagem do hapi eu esta dentro do celebrate
  > yarn add @types/hapi__joi -D
    - eu não posso ter dois @'s quando tem dois @'s eu tiro ele e a barra se transforma
    em dois "_"
    - Com isso nos ja vamos ter o interlecense.


