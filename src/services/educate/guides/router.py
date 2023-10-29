from typing import Annotated
from fastapi import APIRouter, HTTPException, Path, Request, Response, status

from . import schemas, service
import _tests


router = APIRouter(
    prefix='/guides')

@router.get(
    '/',
    response_model=list[schemas.GuideRead])
async def get_all(request: Request):
    return await service.get_all()


@router.get(
    '/{id}',
    response_model=schemas.GuideRead)
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
    response_model=schemas.GuideRead
    )
async def create(item: schemas.GuideCreate):
    new_item = await service.create(item.model_dump())
    return new_item


@router.put(
    '/{id}',
    response_model=schemas.GuideRead)
async def update(
    item: schemas.GuideUpdate,
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


@router.post('/{id}/add_tests')
async def add_tests(
    id: Annotated[str, Path()],
    items: list[_tests.schemas.TestCreate]
    ):
    await service.add_tests(id, items)