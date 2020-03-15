# Introdução

Esse projeto é uma API construída em Node.JS utilizando o framework Adonis. Resolvi escolher esse framework pois ele te permite se concentrar mais no que precisa ser feito ao invés de como implementar rotas, testes, migrations entre outras funcionalidades. É um framework muito prático e poderoso. Resolvi trazer também a arquitetura DDD pois é a que utilizo em meu dia a dia e por achar que é excelente prática. Todos os serviços da aplicação possuem validação de input e tratativa de possíveis erros.

## Setup

- Clone o projeto.
- Rode o `npm install`.
- Faça as configurações para o .env... No projeto há um example.
- Crie um arquivo .env.testing usando o seguinte template
`
  DB_CONNECTION=
  DB_HOST=
  DB_PORT=
  DB_USER=
  DB_PASSWORD=
  DB_DATABASE=
`
- Ah, vale lembrar também que o projeto foi feito e testado utilizando MySQL. Então recomendo usarem o mesmo para testar.
- Rode `adonis migration:run`.
- Pronto :)

## API Reference

###### /locations/ -> GET
- Retorna todas as locations disponíveis.

###### /locations/:id -> GET
- Retorna location correspondente ao ID fornecido.

###### /locations/ -> POST
- Cria a location baseada nos dados fornecidos.
`
    "name": string -> obrigatório,
    "opening_time": "HH:mm" -> opcional,
    "closing_time": "HH:mm" -> opcional,
    "coord_x": integer -> opcional,
    "coord_y": integer -> opcional
`

###### /locations/id -> PUT
- Edita a location existente baseada nos dados fornecidos.
`
    "name": string -> obrigatório,
    "opening_time": "HH:mm" -> opcional,
    "closing_time": "HH:mm" -> opcional,
    "coord_x": integer -> opcional,
    "coord_y": integer -> opcional
`

###### /locations/id -> DELETE
- Delete a location existente.

###### /locations/check -> POST
- Checa as localizações próximas baseado nas posiçõess x e y fornecidas e no horário.
`
    "hours": "HH:mm" -> obrigatório,
    "mts": integer -> obrigatório,
    "x": integer -> obrigatório,
    "y": integer -> obrigatório
`


## Teste

Para testar a aplicação é muito simples, basta configurar o env de teste (instruções no Setup) e rodar o comando `adonis test`.







