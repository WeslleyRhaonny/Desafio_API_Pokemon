# Desafio_API_Pokemon
 
Esta é uma API para criar e listar times de Pokémon utilizando a pokeAPI.

## Tecnologias utilizadas

- NodeJS
- Express
- Axios
- Docker

## Pré-requisitos

- Node.js instalado
- npm (gerenciador de pacotes para Node.js)
- Docker e Docker Compose

## Como Rodar

Com o Docker instalado na máquina, abra um terminal na pasta onde está o projeto e execute os seguintes comandos:

- docker-compose build

- docker-compose up

## Como acessar
Na aplicação foi utilizada a porta 3000, então:

Acesse o endereço: localhost:3000/

Escolha uma das rotas GET criadas, como, por exemplo: localhost:3000/api/teams

## Rotas

- GET /api/teams
Retorna todos os times registrados.

- GET /api/teams/:id
Retorna um time específico com base no ID único criado quando ele foi cadastrado através do POST.

- POST /api/teams
Cria um novo time com base no JSON fornecido, retornando que o time foi criado com sucesso e uma ID única para utilizar posteriormente na Rota GET /api/teams/:id, se houver algum erro no seu json, ele retornará o erro.

## Exemplo de uso do POST

Envie esse json para a rota POST, para isso você pode utilizar aplicativos como o Postman para realizar testes

{
  "user": "Weslley",
  "team": ["blastoise", "pikachu", "charizard", "venusaur", "lapras", "dragonite"]
}
