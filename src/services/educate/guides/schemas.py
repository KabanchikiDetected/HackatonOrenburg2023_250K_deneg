from pydantic import BaseModel, field_serializer

import database


class GuideRead(database.IdMixin, BaseModel):
    content: str  # HTML в сыром виде.
    tests: list[database.PyObjectId]  # Id тестов.

    @field_serializer('tests')
    def serializer_tests_id(self, tests: list[database.PyObjectId], _info):
        return [str(id) for id in tests]

class GuideCreate(BaseModel):
    content: str  # HTML в сыром виде.
    tests: list[database.PyObjectId] = []  # Id тестов.


class GuideUpdate(BaseModel):
    content: str  # HTML в сыром виде.
    tests: list[database.PyObjectId]  # Id тестов.
