from random import choice
from typing import Sequence
from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession

from app import models, schemes
from app.game_utils.color_scheme import generate_coloring_scheme
from app.game_utils.game_state import GameState, calculate_game_state


# TODO: add rollback on failure


async def get_words(
    session: AsyncSession, skip: int = 0, limit: int = 100
) -> Sequence[models.Word]:
    results = await session.execute(select(models.Word).offset(skip).limit(limit))
    return results.scalars().all()


async def get_random_word_by_length(
    session: AsyncSession, word_length: int
) -> models.Word:
    results = await session.execute(
        select(models.Word).filter(models.Word.length == word_length)
    )
    words = results.scalars().all()

    try:
        random_word = choice(words)
    except IndexError:
        random_word = None

    return random_word


async def create_word(
    session: AsyncSession, word_create: schemes.WordCreate
) -> models.Word:
    word = models.Word(value=word_create.value, length=len(word_create.value))
    session.add(word)
    await session.commit()
    await session.refresh(word)
    return word


async def create_guess(
    session: AsyncSession,
    guess_create: schemes.GuessCreate,
    game_id: int,
    word_to_guess: str,
) -> models.Guess:
    coloring_scheme = generate_coloring_scheme(guess_create.value, word_to_guess)
    is_correct = word_to_guess == guess_create.value

    guess = models.Guess(
        value=guess_create.value,
        game_id=game_id,
        coloring_scheme=coloring_scheme,
        is_correct=is_correct,
    )

    session.add(guess)
    await session.commit()
    await session.refresh(guess)
    return guess


async def get_games(
    session: AsyncSession, skip: int = 0, limit: int = 100
) -> Sequence[models.Game]:
    # TODO: order the list by id
    results = await session.execute(select(models.Game).offset(skip).limit(limit))
    return results.scalars().all()


async def get_game(session: AsyncSession, game_id: int) -> models.Game:
    results = await session.execute(
        select(models.Game).filter(models.Game.id == game_id)
    )
    return results.scalars().one_or_none()


async def create_game(
    session: AsyncSession, game_create: schemes.GameCreate
) -> models.Game:
    word = await get_random_word_by_length(session, game_create.word_length)
    if word is None:
        raise ValueError("Could not find a word with current configuration")

    game = models.Game(
        word_to_guess=word.value,
        guess_limit=game_create.guess_limit,
    )

    session.add(game)
    await session.commit()
    await session.refresh(game)

    return game


async def delete_game(session: AsyncSession, game_id: int):
    await session.execute(delete(models.Game).where(models.Game.id == game_id))
    await session.commit()


async def create_guess_for_game(
    session: AsyncSession, guess_create: schemes.GuessCreate, game_id: int
) -> models.Game:
    game = await get_game(session, game_id)

    if game is None:
        raise ValueError(f"No game was found for {game_id}")

    if game.state != GameState.RUNNING.value:
        raise ValueError("Game is alreay over, can't create new guess")

    guess = await create_guess(session, guess_create, game_id, game.word_to_guess)

    game.state = calculate_game_state(
        game.guess_limit, len(game.guesses), guess.is_correct
    )

    session.add(game)
    await session.commit()
    await session.refresh(game)

    return game
