const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Simulando um banco de dados em memória
const teams = {};

//inicialização do contador da id única
let idCounter = 1;

app.use(express.json());

// Rota para listar todos os times registrados
app.get('/api/teams', (req, res) => {
  res.json(teams);
});

// Rota para buscar um time por usuário pesquisando pela id única gerada quando o usuário cadastrou o time
app.get('/api/teams/:id', (req, res) => {
  const id = req.params.id;
  const team = teams[id];

  if (!team) {
    return res.status(404).json({ error: 'Time não encontrado.' });
  }

  res.json(team);
});

// Rota para criar um time
app.post('/api/teams', async (req, res) => {
  const { user, team } = req.body;

  // Verifica se todos os Pokémon na lista são válidos
  const pokemonDataPromises = team.map(async (pokemonName) => {
    try {
      // Obtém dados do Pokémon da pokeAPI utilizando o axios
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const { id, name, weight, height } = response.data;
      return { id, name, weight, height };
    } catch (error) {
      // Lança um erro se o Pokémon não for encontrado
      throw new Error(`Pokémon inválido: ${pokemonName}`);
    }
  });

  try {
    // Aguarda todas as requisições da pokeAPI serem concluídas
    const pokemonData = await Promise.all(pokemonDataPromises);

    // Salva o time com o id único
    const id = idCounter++;
    teams[id] = { owner: user, pokemons: pokemonData };

    // Retorna uma mensagem de sucesso junto com o id do time
    res.json({ message: 'Time registrado com sucesso!', id });
  } catch (error) {
    // Retorna um erro caso haja problemas na validação dos Pokémon
    res.status(400).json({ error: error.message });
  }
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
