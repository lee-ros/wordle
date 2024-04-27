import axios from "axios";

const API_URL = "http://localhost:8000/api/v1";

export async function createGame(guess_limit, word_length) {
  const game_create = { guess_limit, word_length };
  try {
    const response = await axios.post(`${API_URL}/game`, game_create);
    return await response.data;
  } catch {
    return null;
  }
}

export async function fetchGame(game_id) {
  try {
    const response = await axios.get(`${API_URL}/game/${game_id}`);
    return await response.data;
  } catch {
    return null;
  }
}

export async function fetchGames() {
  try {
    const response = await axios.get(`${API_URL}/game`);
    return await response.data;
  } catch {
    return null;
  }
}

export async function createGuess(value, game_id) {
  const guess_create = { value };
  try {
    const response = await axios.patch(
      `${API_URL}/game/${game_id}`,
      guess_create
    );
    return await response.data;
  } catch {
    return null;
  }
}
