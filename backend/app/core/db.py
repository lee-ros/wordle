import os

from dotenv import load_dotenv, find_dotenv
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

load_dotenv(find_dotenv())

engine = create_async_engine(os.getenv("DB_URI"))
# SessionLocal = async_sessionmaker(autocommit=False, autoflush=False, bind=engine)

# async def get_db():
#     async with SessionLocal() as db:
#             yield db
