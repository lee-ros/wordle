from typing import List
from sqlalchemy import ARRAY, String, ForeignKey
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Word(Base):
    __tablename__ = "word"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[str] = mapped_column(unique=True)
    length: Mapped[int]


class Guess(Base):
    __tablename__ = "guess"

    id: Mapped[int] = mapped_column(primary_key=True)
    value: Mapped[str]
    coloring_scheme: Mapped[List[str]] = mapped_column(ARRAY(String))
    is_correct: Mapped[bool]
    game_id: Mapped[int] = mapped_column(ForeignKey("game.id"))
    game: Mapped["Game"] = relationship(back_populates="guesses", lazy="selectin")


class Game(Base):
    __tablename__ = "game"

    id: Mapped[int] = mapped_column(primary_key=True)
    word_to_guess: Mapped[str]  # = mapped_column(ForeignKey("words.id"))
    state: Mapped[str] = mapped_column(default="running")
    guess_limit: Mapped[int]
    guesses: Mapped[List["Guess"]] = relationship(
        back_populates="game", cascade="all, delete", lazy="selectin"
    )
