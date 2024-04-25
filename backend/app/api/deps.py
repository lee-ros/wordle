from typing import Annotated
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import engine

async def get_db():
    async with AsyncSession(engine) as session:
        yield session
        
SessionDep = Annotated[AsyncSession, Depends(get_db)]