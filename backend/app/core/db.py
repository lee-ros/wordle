import os

from dotenv import load_dotenv, find_dotenv
from sqlalchemy.ext.asyncio import create_async_engine

load_dotenv(find_dotenv())

engine = create_async_engine(os.getenv("DB_URI"))
