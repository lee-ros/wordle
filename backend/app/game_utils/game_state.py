from enum import Enum

from .. import models

class GameState(Enum):
    WON = "won"
    LOST = "lost"
    RUNNING = "running"
    

def calculate_game_state(guess_limit: int, guess_count: int, is_correct: bool):
    state = GameState.RUNNING
    
    if is_correct:
        state = GameState.WON
    elif guess_limit - guess_count <= 0:
        state = GameState.LOST
        
    return state.value
        