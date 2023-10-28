from typing import Any
import logging

from fastapi import HTTPException, status

from database import db, ObjectId

from . import schemas
import _tests as tests


table = db['guides']
logger = logging.getLogger(__name__)


async def get_one(id: str):
    item = await table.find_one({"_id": ObjectId(id)})
    return item


async def get_all():
    return await table.find().to_list(100)


async def create(data: dict[str, Any]):
    """
    При создании можно указать существующие тесты,
    они прикрепяться к новому учебному материали.
    """
    res = await table.insert_one(data)
    item = await get_one(res.inserted_id)
    for test_id in data['tests']:
        test = await tests.service.get_one(test_id)
        test['guide_id'] = res.inserted_id
        test.pop('_id')
        await tests.service.update(test_id, test)
    return item


async def update(id: str, data: dict[str, Any]):
    res = await table.update_one({'_id': ObjectId(id)}, {'$set': data})
    if res.modified_count != 1:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)
    return await get_one(id)


async def delete(id: str):
    res = await table.delete_one({'_id': ObjectId(id)})
    return res.deleted_count == 1


async def add_tests(id: str, _tests: list[tests.schemas.TestCreate]):
    """
    Можно добавить новые тесты к уже существующему учебному материалу.
    """
    print(1)
    # Вытаскиваю учебный материал.
    guide = await get_one(id)
    print(2)
    # Создаю новые тесты и ставлю в них id учебного матераила.
    for test in _tests:
        test.guide_id = guide['_id']
        test = await tests.service.create(test.model_dump())
        guide['tests'].append(test['_id'])
    print(3)
    guide.pop('_id')
    return await update(id, guide)


async def get_tests(id: str):
    return await tests.service.get_all(guide_id=id)