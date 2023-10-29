from typing import Annotated
from fastapi import APIRouter, Request, Path

import schemas


router = APIRouter(
    prefix='/review',
    tags=['review']
)


@router.get(
    '/video/',
    response_model=list[schemas.VideoRead]
    )
async def get_all_video(
    r: Request
    ):
    return await schemas.VideoRead.get_all()


@router.get(
    '/video/{id}',
    response_model=schemas.VideoRead
    )
async def get_one_video(
    r: Request,
    id: Annotated[str, Path()]
    ):
    return await schemas.VideoRead.get_one(id)


@router.post(
    '/video',
    response_model=schemas.VideoRead
    )
async def create_video(
    item: schemas.VideoCreate
    ):
    _id = await item.create()
    return await schemas.VideoRead.get_one(_id)


@router.put(
    '/video/{id}',
    response_model=schemas.VideoRead
    )
async def update_video(
    r: Request,
    id: Annotated[str, Path()],
    item: schemas.VideoUpdate
    ):
    await item.update(id)
    return await schemas.VideoRead.get_one(id)


@router.delete(
    '/video/{id}'
    )
async def delete_video(
    r: Request,
    id: Annotated[str, Path()]
    ):
    await schemas.delete_video(id)


@router.get(
    '/text/',
    response_model=list[schemas.TextRead]
    )
async def get_all_text(
    r: Request
    ):
    return await schemas.TextRead.get_all()


@router.get(
    '/text/{id}',
    response_model=schemas.TextRead
    )
async def get_one_text(
    r: Request,
    id: Annotated[str, Path()]
    ):
    return await schemas.TextRead.get_one(id)


@router.post(
    '/text',
    response_model=schemas.TextRead
    )
async def create_text(
    item: schemas.TextCreate
    ):
    _id = await item.create()
    return await schemas.TextRead.get_one(_id)


@router.put(
    '/text/{id}',
    response_model=schemas.TextRead
    )
async def update_text(
    r: Request,
    id: Annotated[str, Path()],
    item: schemas.TextUpdate
    ):
    await item.update(id)
    return await schemas.TextRead.get_one(id)


@router.delete(
    '/text/{id}'
    )
async def delete_text(
    r: Request,
    id: Annotated[str, Path()]
    ):
    await schemas.delete_text(id)


@router.get(
    '/logo/',
    response_model=list[schemas.LogoRead]
    )
async def get_all_logo(
    r: Request
    ):
    return await schemas.LogoRead.get_all()


@router.get(
    '/logo/{id}',
    response_model=schemas.LogoRead
    )
async def get_one_logo(
    r: Request,
    id: Annotated[str, Path()]
    ):
    return await schemas.LogoRead.get_one(id)


@router.post(
    '/logo',
    response_model=schemas.LogoRead
    )
async def create_logo(
    item: schemas.LogoCreate
    ):
    _id = await item.create()
    return await schemas.LogoRead.get_one(_id)


@router.put(
    '/logo/{id}',
    response_model=schemas.LogoRead
    )
async def update_logo(
    r: Request,
    id: Annotated[str, Path()],
    item: schemas.LogoUpdate
    ):
    await item.update(id)
    return await schemas.LogoRead.get_one(id)


@router.delete(
    '/logo/{id}'
    )
async def delete_logo(
    r: Request,
    id: Annotated[str, Path()]
    ):
    await schemas.delete_logo(id)