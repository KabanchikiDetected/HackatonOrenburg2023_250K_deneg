from typing import Annotated
from fastapi import APIRouter, Body, HTTPException, Path, Query, Request, Response, status, Header

from . import schemas, service, dependencies


router = APIRouter(
    prefix='/tests'
)


@router.get(
    '/admin',
    response_model=list[schemas.TestReadAdmin])
async def get_all(
    request: Request,
    admin: dependencies.GetAdmin,
    depatment_id: Annotated[int, Query()] = None):
    query = {'department_id': depatment_id} if depatment_id else {}
    return await service.get_all(query)


@router.get(
    '/admin/{id}',
    response_model=schemas.TestReadAdmin)
async def get_one(
    request: Request,
    id: Annotated[str, Path()],
    admin: dependencies.GetAdmin
    ):
    item = await service.get_one(id)
    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND
            )
    return item


@router.get(
    '/',
    response_model=list[schemas.TestRead])
async def get_all(request: Request):
    return await service.get_all()


@router.get(
    '/{id}',
    response_model=schemas.TestRead)
async def get_one(
    request: Request,
    id: Annotated[str, Path()],
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
async def create(
    item: schemas.TestCreate,
    admin: dependencies.GetAdmin):
    new_item = await service.create(item.model_dump())
    return new_item


@router.put(
    '/{id}',
    response_model=schemas.TestReadAdmin)
async def update(
    item: schemas.TestUpdate,
    id: Annotated[str, Path()],
    admin: dependencies.GetAdmin
    ):
    return await service.update(id, item.model_dump())


@router.delete(
    '/{id}'
    )
async def delete(
    request: Request,
    id: Annotated[str, Path()],
    admin: dependencies.GetAdmin
    ):
    if await service.delete(id):
        return Response(status_code=status.HTTP_200_OK)
    return Response(status_code=status.HTTP_404_NOT_FOUND)


@router.post(
    '/{id}/check',
    response_model=schemas.TestResultOtput)
async def check_test(
    id: Annotated[str, Path()],
    answers: Annotated[list[list[str]], Body()],
    Authorization: Annotated[str, Header()]
    ):
    user = await service.get_user_from_token(Authorization)
    if user['is_admin']:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN)
    results = await service.check_test(id, answers, user['id'])
    return results
