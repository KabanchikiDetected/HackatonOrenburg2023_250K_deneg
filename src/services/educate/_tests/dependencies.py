from typing import Annotated

from fastapi import Depends, Header, HTTPException, status

from . import service

async def get_user_from_token(
    Authorization: Annotated[str, Header()]):
    user = await service.get_user_from_token(Authorization)
    return user


async def get_admin_from_token(
    user: Annotated[dict, Depends(get_user_from_token)]):
    if not user['is_admin']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user


GetUser = Annotated[dict, Depends(get_user_from_token)]
GetAdmin = Annotated[dict, Depends(get_admin_from_token)]
