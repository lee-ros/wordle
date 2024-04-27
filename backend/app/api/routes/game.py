from typing import List
from fastapi import APIRouter, HTTPException

from app import schemes, crud
from app.api.deps import SessionDep

router = APIRouter()


@router.get("/", response_model=List[schemes.Game])
async def get_games(session: SessionDep):
    return await crud.get_games(session)

@router.post("/", response_model=schemes.Game)
async def create_game(session: SessionDep, game: schemes.GameCreate):
    try:
        return await crud.create_game(session, game)
    except ValueError as e:
        raise HTTPException(
            status_code=422, detail=str(e)
        )
    except:
        raise HTTPException(status_code=500, detail="Game could not be created")


@router.get("/{game_id}", response_model=schemes.Game)
async def get_game(
    session: SessionDep,
    game_id: int,
):
    return await crud.get_game(session, game_id)


@router.patch("/{game_id}", response_model=schemes.Game)
async def create_guess_for_game(
    session: SessionDep, guess: schemes.GuessCreate, game_id: int
):
    try:
        return await crud.create_guess_for_game(session, guess, game_id)
    except ValueError as e:
        raise HTTPException(status_code=422, detail=str(e))
    

@router.delete("/{game_id}", status_code=204)
async def delete_game(session: SessionDep, game_id: int):
    await crud.delete_game(session, game_id)
