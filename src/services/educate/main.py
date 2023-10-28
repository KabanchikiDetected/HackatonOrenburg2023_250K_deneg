from fastapi import FastAPI, APIRouter
import logging

import database
import _tests, guides

logging.basicConfig()

api_router = APIRouter(prefix='/api')

api_router.include_router(_tests.router.router)
api_router.include_router(guides.router.router)

app = FastAPI(lifespan=database.lifespan)
app.include_router(api_router)