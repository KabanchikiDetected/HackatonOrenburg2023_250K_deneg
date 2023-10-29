from typing import Annotated
from fastapi import APIRouter, Query, Request, Path

import schemas, dependencies


router = APIRouter(
    prefix='/support',
    tags=['support']
)

@router.get(
    '/question',
    response_model=list[schemas.QuestionRead]
    )
async def get_all_question(
    r: Request,
    is_active: Annotated[bool, Query()] = True
    ):
    return await schemas.QuestionRead.get_all({'is_active': is_active})


@router.get(
    '/question/{id}',
    response_model=list[schemas.QuestionRead]
    )
async def get_question(
    r: Request,
    id: Annotated[str, Path()]
    ):
    return await schemas.QuestionRead.get_one(id)


@router.post(
    '/question',
    response_model=schemas.QuestionRead
    )
async def create_question(
    user: dependencies.GetUser,
    item: schemas.QuestionCreate
    ):
    _id = item.create(user['id'])
    return await schemas.QuestionRead.get_one(_id)


@router.get(
    '/answer',
    response_model=list[schemas.AnswerRead]
    )
async def get_all_answers(
    r: Request,
    ):
    return await schemas.AnswerRead.get_all()


@router.get(
    '/answer/{id}',
    response_model=list[schemas.AnswerRead]
    )
async def get_answer(
    r: Request,
    id: Annotated[str, Path()]
    ):
    return await schemas.AnswerRead.get_one(id)


@router.post(
    '/answer',
    response_model=schemas.AnswerRead
    )
async def create_answer(
    admin: dependencies.GetAdmin,
    item: schemas.AnswerCreate
    ):
    _id = item.create()
    return await schemas.AnswerRead.get_one(_id)
