from fastapi import FastAPI, APIRouter, Request

import database

import router

api_router = APIRouter(
    prefix='/api'
)

api_router.include_router(router.router)

app = FastAPI(
    lifespan=database.lifespan
)
app.include_router(api_router)


@app.get('/version')
async def version(r: Request):
    return (await database.client.server_info())['version']
