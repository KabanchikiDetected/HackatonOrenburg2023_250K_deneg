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
        'extra': 'ignore'
    }

    question: str
    variants: list[str]
    is_multianswer: bool


class QuestionReadAdmin(QuestionrRead):
    answers: list[str]


class TestRead(database.IdMixin, BaseModel):
    model_config = {
        'extra': 'ignore'
    }

    title: str
    guide_id: database.PyObjectId | None = None
    max_result: int
    total: int  # Кол-во вопросов в тесте.
    questions: list[QuestionrRead]

    @field_serializer('guide_id')
    def serializer_guide_id(self, guide_id: database.PyObjectId, _info):
        return str(guide_id)


class TestReadAdmin(TestRead):
    questions: list[QuestionReadAdmin]


class TestCreate(BaseModel):
    title: str
    guide_id: database.PyObjectId | None = None
    questions: list[QuestionCreate]
    max_result: int
    total: int  # Кол-во вопросов в тесте.


class TestUpdate(BaseModel):
    title: str
    guide_id: str | None = None
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
