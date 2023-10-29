from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
import logging

import database
import _tests, guides

logging.basicConfig()

api_router = APIRouter(prefix='/api')

api_router.include_router(_tests.router.router)
api_router.include_router(guides.router.router)

app = FastAPI(
    lifespan=database.lifespan
    )
app.include_router(api_router)


origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/version')
async def version(r: Request):
    return (await database.client.server_info())['version']