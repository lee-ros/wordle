from enum import Enum


class ColoringOptions(Enum):
    PLACE_MATCH = "in_place"
    CHAR_MATCH = "wrong_place"
    NO_MATCH = "no_match"


def generate_coloring_scheme(guess_word: str, match_word: str):
    guess_word = guess_word.lower()
    match_word = match_word.lower()
    remaining_letters = list(match_word)

    coloring_scheme = [ColoringOptions.NO_MATCH.value] * len(guess_word)
    for i in range(len(guess_word)):
        if guess_word[i] == match_word[i]:
            coloring_scheme[i] = ColoringOptions.PLACE_MATCH.value
            remaining_letters.remove(guess_word[i])

    for i, guess_char in enumerate(guess_word):
        if guess_char in remaining_letters:
            coloring_scheme[i] = ColoringOptions.CHAR_MATCH.value
            remaining_letters.remove(guess_char)

    return coloring_scheme


def is_full_match(coloring_scheme: list[ColoringOptions]):
    return all(
        [
            coloring_option == ColoringOptions.PLACE_MATCH.value
            for coloring_option in coloring_scheme
        ]
    )
