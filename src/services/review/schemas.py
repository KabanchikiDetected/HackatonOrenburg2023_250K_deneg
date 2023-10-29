import datetime

from pydantic import BaseModel, Field, field_serializer

import database
from utils import NotFound, get_company_info


class BaseReview(BaseModel):
    _table = ''

    @classmethod
    def table(cls):
        return database.db[cls._table.default]

    user_id: int
    time: datetime.datetime = Field(default_factory=datetime.datetime.now)


class ReviewRead(database.IdMixin, BaseReview):
    @classmethod
    async def get_one(cls, id):
        item = await cls.table().find_one({"_id": database.ObjectId(id)})
        if item is None:
            raise NotFound
        return item

    @classmethod
    async def get_all(cls):
        return await cls.table().find({}).to_list(100)


class ReviewCreate(BaseReview):
    user_id: int
    time: datetime.datetime = Field(default_factory=datetime.datetime.now)

    async def create(self):
        res = await self.__class__.table().insert_one(self.model_dump())
        return res.inserted_id


class ReviewUpdate(BaseReview):
    user_id: int
    time: datetime.datetime = Field(default_factory=datetime.datetime.now)

    async def update(self, id):
        await self.__class__.table().update_one(
            {'_id': database.ObjectId(id)},
            {'$set': self.model_dump()})


class BaseVideo:
    _table = 'video'
    link: str


class BaseText:
    _table = 'text'
    text: str


class BaseLogo:
    _table = 'logo'

    company_id: int | None = None
    text: str


class VideoRead(BaseVideo, ReviewRead):
    pass


class VideoCreate(BaseVideo, ReviewCreate):
    pass


class VideoUpdate(BaseVideo, ReviewUpdate):
    pass


class TextRead(BaseText, ReviewRead):
    pass


class TextCreate(BaseText, ReviewCreate):
    pass


class TextUpdate(BaseText, ReviewUpdate):
    pass

class LogoRead(BaseLogo, ReviewRead):
    logo_link: str  # Ссыль на статику.
    company_title: str

    # @field_serializer('company_title')
    # async def serializer_company_title(self, company_title, _info):
    #     return await get_company_info(self.company_id)


class LogoCreate(BaseLogo, ReviewCreate):
    async def create(self):
        company = await get_company_info(self.company_id)
        review = self.model_dump()
        review['company_title'] = company['title']
        review['logo_link'] = company['image']
        # print(review)
        res = await self.table().insert_one(review)
        return res.inserted_id


class LogoUpdate(BaseLogo, ReviewUpdate):
    pass


async def _delete(table, id):
    res = await database.db[table].delete_one({'_id': database.ObjectId(id)})
    if res.deleted_count != 1:
        raise NotFound


async def delete_video(id):
    return await _delete('video', id)


async def delete_text(id):
    return await _delete('text', id)


async def delete_logo(id):
    return await _delete('logo', id)
