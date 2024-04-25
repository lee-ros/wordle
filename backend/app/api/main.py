from fastapi import APIRouter

from app.api.routes import game

router = APIRouter()

router.include_router(game.router, prefix="/game", tags=["game"])