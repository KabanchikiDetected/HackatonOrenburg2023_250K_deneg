from pydantic import BaseModel, Field, field_serializer

import database


class QuestionCreate(BaseModel):
    question: str
    variants: list[str]
    is_multianswer: bool
    answers: list[str]


class QuestionUpdate(BaseModel):
    question: str
    variants: list[str]
    is_multianswer: bool
    answers: list[str]


class QuestionrRead(BaseModel):
    model_config = {
        'extra': 'allow'
    }

    question: str
    variants: list[str]
    is_multianswer: bool


class QuestionReadAdmin(QuestionrRead):
    answers: str


class TestRead(BaseModel):
    model_config = {
        'extra': 'allow'
    }

    id: database.PyObjectId = Field(default_factory=database.ObjectId, alias="_id")
    title: str
    max_result: int
    total: int  # Кол-во вопросов в тесте.
    questions: list[QuestionrRead]

    @field_serializer('id')
    def serializer_id(self, id: database.PyObjectId, _info):
        return str(id)


class TestReadAdmin(TestRead):
    questions: list[QuestionReadAdmin]


class TestCreate(BaseModel):
    title: str
    questions: list[QuestionCreate]
    max_result: int
    total: int  # Кол-во вопросов в тесте.


class TestUpdate(BaseModel):
    title: str
    questions: list[QuestionUpdate]
    max_result: int
    total: int  # Кол-во вопросов в тесте.



class TestResultOtput(BaseModel):
    test_id: database.PyObjectId = Field(default_factory=database.ObjectId, alias="test_id")
    correct: int
    total: int

    @field_serializer('test_id')
    def serializer_id(self, test_id: database.PyObjectId, _info):
        return str(test_id)
