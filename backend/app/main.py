from contextlib import asynccontextmanager
import os

from dotenv import find_dotenv, load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import main
from app.core.init_db import init_db


load_dotenv(find_dotenv())
if os.getenv("ENV") == "dev":
    import debugpy

    debugpy.listen(("0.0.0.0", 5678))


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield


app = FastAPI(title="Wordle", description="Wordle game API", lifespan=lifespan)
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(main.router, prefix="/api/v1")
