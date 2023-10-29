import datetime

from pydantic import BaseModel, Field

import database
import utils


class BaseReview(BaseModel):
    _table = ''

    @classmethod
    def table(cls):
        return database.db[cls._table.default]


class QuestionRead(database.IdMixin, BaseReview):
    _table = 'question'

    user_id: int
    time: datetime.datetime = Field(default_factory=datetime.datetime.now)
    text: str
    is_active: bool

    @classmethod
    async def get_one(cls, id):
        item = await cls.table().find_one({"_id": database.ObjectId(id)})
        if item is None:
            raise utils.NotFound
        return item

    @classmethod
    async def get_all(cls, query):
        return await cls.table().find(query).to_list(100)


class QuestionCreate(BaseReview):
    _table = 'question'

    text: str

    async def create(self, user_id):
        question = self.model_dump()
        time = datetime.datetime.now()
        question['user_id'] = user_id
        question['time'] = time
        question['is_active'] = True
        question = await self.__class__.table().insert_one(question)
        return question.inserted_id


class AnswerRead(database.IdMixin, BaseReview):
    _table = 'answer'

    qustion_id: int
    time: datetime.datetime = Field(default_factory=datetime.datetime.now)
    text: str

    @classmethod
    async def get_one(cls, id):
        item = await cls.table().find_one({"_id": database.ObjectId(id)})
        if item is None:
            raise utils.NotFound
        return item

    @classmethod
    async def get_all(cls):
        return await cls.table().find({}).to_list(100)


class AnswerCreate(BaseReview):
    _table = 'answer'

    question_id: database.PyObjectId
    text: str

    async def create(self):
        answer = self.model_dump()
        await database.db['question'].update_one({'_id': database.ObjectId(self.question_id)}, {'&set': {"is_active": False}})
        answer['time'] = datetime.datetime.now()
        answer = await self.__class__.table().insert_one(answer)
        return answer.inserted_id
