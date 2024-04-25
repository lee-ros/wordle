from typing import List
from pydantic import  BaseModel


class WordBase(BaseModel):
    value: str
    

class WordCreate(WordBase):
    pass


class Word(WordBase):
    id: int
    length: int
    
    class Config:
        orm_mode = True


class GuessBase(BaseModel):
    value: str
    

class GuessCreate(GuessBase):
    pass


class Guess(GuessBase):
    id: int
    game_id: int
    coloring_scheme: list[str]
    is_correct: bool
    
    class Config:
        orm_mode = True


class GameBase(BaseModel):
    guess_limit: int
    

class GameCreate(GameBase):
    word_length: int
    pass
    

class Game(GameBase):
    id: int
    word_to_guess: str
    state: str = "running"
    guesses: List[Guess] = []

    class Config:
        orm_mode = True