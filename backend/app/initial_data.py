import asyncio
import logging

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app import crud, models, schemes
from app.core.db import engine


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def add_words_to_db(session: AsyncSession):
    with open("app/words_alpha.txt", "r") as words_file:
        while word := words_file.readline():
            if 4 <= len(word) <= 7:
                await crud.create_word(session, schemes.WordCreate(value=word))


async def db_words_count(session: AsyncSession):
    return await session.scalar(select(func.count()).select_from(models.Word))


async def init_db():
    async with AsyncSession(engine) as session:
        words_count = await db_words_count(session)
        if words_count == 0:
            await add_words_to_db(session)


def main():
    logger.info("Initializing DB with words")
    asyncio.run(init_db())
    logger.info("Done initializing DB")


if __name__ == "__main__":
    main()
