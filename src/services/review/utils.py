from fastapi import HTTPException, status

import aiohttp

NotFound = HTTPException(status_code=status.HTTP_404_NOT_FOUND)


async def get_company_info(id: int):
    async with aiohttp.ClientSession() as session:
        async with session.get('http://django:8000/api/company/') as resp:
            # print(await resp.content.read())
            json: list[dict] = await resp.json()
            company, *_ = [c for c in json if c['id'] == id]
            return company