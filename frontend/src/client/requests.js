import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

export async function createGame(guessLimit, wordLength) {
  const game_create = { guess_limit: guessLimit, word_length: wordLength };
  const response = await axios.post(`${API_URL}/game`, game_create);
  return await response.data;
}

export async function fetchGame(gameId) {
  const response = await axios.get(`${API_URL}/game/${gameId}`);
  return await response.data;
}

export async function deleteGame(gameId) {
  await axios.delete(`${API_URL}/game/${gameId}`)
}

export async function fetchGames() {
  const response = await axios.get(`${API_URL}/game`);
  return await response.data;
}

export async function createGuess(value, gameId) {
  const guess_create = { value };
  const response = await axios.patch(
    `${API_URL}/game/${gameId}`,
    guess_create
  );
  return await response.data;
}
