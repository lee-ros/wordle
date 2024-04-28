import logging
import os
import pathlib

from alembic import command, config
from sqlalchemy import create_engine, func, select
from sqlalchemy.orm import Session

from app import models


DB_URL = os.getenv("DB_ALEMBIC_URI")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init_db():
    engine = create_engine(DB_URL)

    with Session(engine) as session:
        logger.info("Running Migrations")
        alembic_migrate_and_upgrade(session)
        logger.info("Done Migrations")
        
        logger.info("Initializing DB with words")
        try_load_words(session)
        logger.info("Done initializing DB")



def alembic_migrate_and_upgrade(session: Session):
    alembic_cfg = get_alembic_config()
    alembic_cfg.set_main_option("sqlalchemy.url", DB_URL)
    alembic_cfg.attributes["connection"] = session

    command.revision(alembic_cfg, autogenerate=True, message="Startup migration")
    command.upgrade(alembic_cfg, "head")


def get_alembic_config():
    ini_path = pathlib.Path(__file__).parent.parent.parent / "alembic.ini"
    alembic_cfg = config.Config(ini_path.resolve())
    return alembic_cfg


def try_load_words(session: Session):
    words_count = db_words_count(session)
    if words_count == 0:
        add_words_to_db(session)


def db_words_count(session: Session) -> int:
    return session.scalar(select(func.count()).select_from(models.Word))


def add_words_to_db(session: Session):
    with open("app/words_alpha.txt", "r") as words_file:
        while word := words_file.readline():
            s_word = word.strip()
            if 4 <= len(s_word) <= 7:
                word = models.Word(value=s_word, length=len(s_word))
                session.add(word)
    session.commit()


if __name__ == "__main__":
    init_db()
