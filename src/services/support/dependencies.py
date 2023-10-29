from typing import Annotated

import aiohttp
from fastapi import Depends, Header, status, HTTPException
from fastapi.security import HTTPBearer


async def get_user_from_token(authorization: Annotated[str, Header()]):
    async with aiohttp.ClientSession(headers={"Authorization": authorization}) as session:
        # print(session.headers)
        response = await session.get("http://django:8000/api/auth/users/me", ssl=False)
        user = await response.json()
        print(user)
        return {"id": user["id"], "is_admin": user["role"] in ('hr', 'company_admin', 'administrator')}


async def get_admin_from_token(
    user: Annotated[dict, Depends(get_user_from_token)]):
    if not user['is_admin']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    return user


GetUser = Annotated[dict, Depends(get_user_from_token)]
GetAdmin = Annotated[dict, Depends(get_admin_from_token)]
