from contextlib import asynccontextmanager

from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import Field, field_serializer

from config import settings

client = AsyncIOMotorClient(settings.MONGO_URL)
db = client[settings.MONGO_NAME]

@asynccontextmanager
async def lifespan(app):
    """Закрывает соединение с MongoDB"""
    # global client, db
    # client = AsyncIOMotorClient(settings.MONGO_URL)
    # db = client[settings.MONGO_NAME]
    yield
    client.close()


class PyObjectId(ObjectId):
    def a(self):
        self.__dict__

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, a):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, core_schema, handler):
        return {'type': 'string'}


class IdMixin:
    id: PyObjectId = Field(default_factory=ObjectId, alias="_id")

    @field_serializer('id')
    def serializer_id(self, id: PyObjectId, _info):
        return str(id)