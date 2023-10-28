from typing import Annotated
from fastapi import APIRouter, Body, HTTPException, Path, Request, Response, status

from . import schemas, service


router = APIRouter(
    prefix='/tests'
)


@router.get(
    '/',
    response_model=list[schemas.TestReadAdmin])
async def get_all(request: Request):
    return await service.get_all()


@router.get(
    '/{id}',
    response_model=schemas.TestReadAdmin)
async def get_one(
    request: Request,
    id: Annotated[str, Path()]
    ):
    item = await service.get_one(id)
    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND
            )
    return item


@router.post(
    '/',
    response_model=schemas.TestReadAdmin
    )
async def create(item: schemas.TestCreate):
    new_item = await service.create(item.model_dump())
    return new_item


@router.put(
    '/{id}',
    response_model=schemas.TestReadAdmin)
async def update(
    item: schemas.TestUpdate,
    id: Annotated[str, Path()]
    ):
    return await service.update(id, item.model_dump())


@router.delete(
    '/{id}'
    )
async def delete(
    request: Request,
    id: Annotated[str, Path()]):
    if await service.delete(id):
        return Response(status_code=status.HTTP_200_OK)
    return Response(status_code=status.HTTP_404_NOT_FOUND)


@router.post(
    '/{id}/check',
    response_model=schemas.TestResultOtput)
async def check_test(
    id: Annotated[str, Path()],
    answers: Annotated[list[list[str]], Body()]
    ):
    # ! Юзера вытаскивай из токена.
    results = await service.check_test(id, answers, 0)
    return results