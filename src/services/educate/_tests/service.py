from typing import Any
import logging

from fastapi import HTTPException, status
import aiohttp

from database import db, ObjectId
from . import schemas


async def get_user_from_token(token: str):
    async with aiohttp.ClientSession(headers={"Authorization": token}) as session:
        # print(session.headers)
        response = await session.get("http://django:8000/api/auth/users/me", ssl=False)
        user = await response.json()
        # print(user)
        return {"id": user["id"], "is_admin": user["role"] in ('hr', 'company_admin', 'administrator')}


table = db['tests']
logger = logging.getLogger(__name__)

async def get_one(id: str):
    item = await table.find_one({"_id": ObjectId(id)})
    return item


async def get_all(**filters):
    return await table.find(filters).to_list(100)


async def create(data: dict[str, Any]):
    res = await table.insert_one(data)
    item = await get_one(res.inserted_id)
    return item


async def update(id: int, data: dict[str, Any]):
    res = await table.update_one({'_id': ObjectId(id)}, {'$set': data})
    if res.modified_count != 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return await get_one(id)


async def delete(id: int):
    res = await table.delete_one({'_id': ObjectId(id)})
    return res.deleted_count == 1


async def check_test(test_id: str, answers: list[list[str]], user_id: int):
    test = await get_one(test_id)
    correct = 0
    for question, user_answer in zip(test['questions'], answers):
        correct += question['answers'] == user_answer
    return schemas.TestResultOtput(
        test_id=test_id,
        title=test['title'],
        user_id=user_id,
        correct=correct,
        total=test['total'])

