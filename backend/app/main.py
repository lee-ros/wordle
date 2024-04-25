import os
from dotenv import find_dotenv, load_dotenv
from fastapi import FastAPI

from app.api import main

load_dotenv(find_dotenv())


if os.getenv("ENV") == "dev":
    import debugpy

    debugpy.listen(("0.0.0.0", 5678))


app = FastAPI(title="Wordle", description="Wordle game API")

app.include_router(main.router, prefix="/api/v1")
